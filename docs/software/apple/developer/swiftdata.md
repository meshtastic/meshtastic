---
title: SwiftData
parent: Developer Guide
sidebar_position: 5
---

# SwiftData

The app uses SwiftData exclusively for persistence. Do not introduce SQLite, Realm, Core Data, or any other persistence library.

## ModelContainer Setup

`PersistenceController.shared` (in `Meshtastic/Persistence/PersistenceController.swift`) creates and owns the `ModelContainer`. It is initialised once at app launch in `MeshtasticApp.swift` and injected via `.modelContainer(PersistenceController.shared.container)`.

Autosave is **disabled** in production (`container.mainContext.autosaveEnabled = false`). All persistence is driven by explicit `modelContext.save()` calls so the app controls exactly when SQLite writes occur.

## Save Strategy

The app uses two save patterns depending on packet frequency:

### Immediate Saves

Config changes, messages, waypoints, and other low-frequency mutations call `savePendingChanges()` directly after updating the model graph. This helper is a thin wrapper around `modelContext.save()` with error logging.

### Debounced Saves

High-frequency packets — positions and telemetry — use `scheduleDebouncedSave()` to coalesce writes. The debouncer waits **2 seconds** of inactivity before flushing, with a hard ceiling of **5 seconds** from the first dirty change. This prevents dozens of SQLite writes per second when the mesh is busy.

```
Position packet 1 → dirty flag set, 2s timer starts
Position packet 2 (200ms later) → timer resets to 2s
Position packet 3 (200ms later) → timer resets to 2s
...
No packets for 2s → save() fires
— OR —
5s since first dirty change → save() fires regardless
```

Debounced saves are flushed explicitly on disconnect so no data is lost.

## Indexes

Frequently queried fields use `@Attribute(.unique)` to create a UNIQUE INDEX in the underlying SQLite store. This eliminates full table scans on the hottest lookup paths:

| Field | Entity | Why |
|-------|--------|-----|
| `num` | `NodeInfoEntity` | Looked up on every incoming packet |
| `num` | `UserEntity` | Looked up on every message |
| `messageId` | `MessageEntity` | ACK lookups, deduplication |
| `hwModel` | `DeviceHardwareEntity` | Hardware image lookups |

> **Note** — `@Attribute(.indexed)` requires iOS 18+. The app targets iOS 17.5, so `@Attribute(.unique)` is used instead (it creates a UNIQUE INDEX which also serves as a regular index).

## Using the ModelContext in Views

```swift
struct MyView: View {
    @Environment(\.modelContext) private var context
    @Query private var nodes: [NodeInfoEntity]

    var body: some View { ... }
}
```

Use `@Query` for data that drives the view. Use `context.insert(_:)` / `context.delete(_:)` for mutations. Mutations on the main context are safe on the main actor.

## Background Writes

For writes triggered by incoming radio packets (off the main thread), use the `MeshPackets` `@ModelActor`:

```swift
let actor = MeshPackets(modelContainer: PersistenceController.shared.container)
await actor.savePacket(packet)
```

Never write to the main `ModelContext` from a background thread.

## Model Types

All model types live in `Meshtastic/Model/`. Each type is decorated with `@Model`:

```swift
@Model
final class NodeInfoEntity {
    var num: Int64
    var longName: String?
    // ...
}
```

Key model types:

| Type | Description |
|------|-------------|
| `NodeInfoEntity` | A node heard on the mesh |
| `MessageEntity` | A channel or direct message |
| `PositionEntity` | A GPS position update |
| `TelemetryEntity` | Device/environment sensor data |
| `TraceRouteEntity` | A recorded trace route |
| `WaypointEntity` | A shared map waypoint |

## Schema Migrations

When you add, rename, or remove properties on a `@Model` type, you must provide a migration. Schema files live in `Meshtastic/Model/Schema/`.

### Adding a New Schema Version

1. Create `Meshtastic/Model/Schema/MeshtasticSchemaV2.swift` with the updated models:

```swift
enum MeshtasticSchemaV2: VersionedSchema {
    static var versionIdentifier = Schema.Version(2, 0, 0)
    static var models: [any PersistentModel.Type] { ... }
}
```

2. Append `MeshtasticSchemaV2.self` to `MeshtasticMigrationPlan.schemas` (newest last).
3. Add a migration stage to `MeshtasticMigrationPlan.stages`:

```swift
// Lightweight — SwiftData infers additive changes automatically (new optional properties)
static let migrateV1toV2 = MigrationStage.lightweight(
    fromVersion: MeshtasticSchemaV1.self,
    toVersion: MeshtasticSchemaV2.self
)

// Custom — when you need to transform or backfill data
static let migrateV1toV2 = MigrationStage.custom(
    fromVersion: MeshtasticSchemaV1.self,
    toVersion: MeshtasticSchemaV2.self,
    willMigrate: { context in },
    didMigrate: { context in
        // Transform data, populate new fields, etc.
        try context.save()
    }
)
```

4. Update `MeshtasticSchema.current` to point to the new version.

> **Warning — Never delete a `VersionedSchema`.** Migration history must be preserved or the migration plan will fail on devices that skipped intermediate versions.

## Query Helpers

`QuerySwiftData.swift` contains helper functions for common fetches:

```swift
let node = getNodeInfo(id: nodeNum, context: context)
```

`UpdateSwiftData.swift` contains helpers for upsert patterns:

```swift
upsertNode(packet: packet, context: context)
```

Prefer these helpers over direct queries to keep logic consistent.

## Data Caps

To prevent unbounded database growth, the app enforces per-node caps when inserting new records. Older rows beyond the cap are deleted in the same transaction:

| Relationship | Cap | Behaviour |
|-------------|-----|-----------|
| `NodeInfoEntity.positions` | 5 000 | Oldest positions deleted when exceeded |
| `NodeInfoEntity.telemetries` | 5 000 per metrics type | Oldest telemetry of that type deleted |
| `MessageEntity` (per channel) | 50 000 | Oldest messages in the channel deleted |

These caps are enforced in `UpdateSwiftData.swift` during the upsert path, so they run on every incoming packet without requiring a separate maintenance task.
