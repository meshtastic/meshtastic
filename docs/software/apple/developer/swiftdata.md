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

| Relationship | Cap | Behavior |
|-------------|-----|-----------|
| `NodeInfoEntity.positions` | 5 000 | Oldest positions deleted when exceeded |
| `NodeInfoEntity.telemetries` | 5 000 per metrics type | Oldest telemetry of that type deleted |
| `MessageEntity` (per channel) | 50 000 | Oldest messages in the channel deleted |

These caps are enforced in `UpdateSwiftData.swift` during the upsert path, so they run on every incoming packet without requiring a separate maintenance task.

## Performance Testing — Large Database Seed Harness

`Meshtastic/Persistence/PerformanceSeedData.swift` provides a DEBUG-only harness for seeding thousands of synthetic nodes, telemetry rows, positions, and messages into the simulator store. It is entirely gated by launch-time flags; production builds and unlaunched DEBUG builds are unaffected.

### Triggering the harness

The harness activates when **either** of the following is present at launch:

- The `--meshtastic-perf-seed` launch argument, **or**
- The `MESHTASTIC_PERF_SEED_NODES` environment variable (any non-zero integer value)

When neither is set, `PerformanceSeedData.configuration` returns `nil` and no seed code runs.

### Environment variables

Pass variables to the simulator using the `SIMCTL_CHILD_` prefix (the prefix is stripped before the app sees them):

| Variable | Default | Description |
|----------|---------|-------------|
| `MESHTASTIC_PERF_SEED_NODES` | — | **Required to activate.** Number of nodes to seed (e.g. `5000`). |
| `MESHTASTIC_PERF_TELEMETRY_HISTORY` | `3` | Device + environment metric samples per node. |
| `MESHTASTIC_PERF_LOCAL_STATS_HISTORY` | `MESHTASTIC_PERF_TELEMETRY_HISTORY` | Local stats samples per node, including synthetic noise floor, packet counters, utilization, and node counts. |
| `MESHTASTIC_PERF_POSITION_HISTORY` | `3` | Position history entries per node. |
| `MESHTASTIC_PERF_DIRECT_MESSAGES` | `0` | Direct messages to seed between node 0 and node 1. |
| `MESHTASTIC_PERF_CHANNEL_MESSAGES` | `0` | Channel messages to seed on channel 0. |
| `MESHTASTIC_PERF_RESET_STORE` | `0` | Set to `1`/`true` to clear the store before seeding. |
| `MESHTASTIC_PERF_COMPACT_LIST` | `0` | Set to `1`/`true` to switch the node list to compact density. |
| `MESHTASTIC_PERF_ENABLE_DISCOVERY` | `0` | Set to `1`/`true` to leave BLE discovery enabled (disabled by default for perf runs). |

### Example: seed 5 000 nodes with a clean store

First, find your simulator UDID:

```bash
xcrun simctl list devices booted
```

Then launch with the seed variables:

```bash
SIMCTL_CHILD_MESHTASTIC_PERF_SEED_NODES=5000 \
SIMCTL_CHILD_MESHTASTIC_PERF_RESET_STORE=true \
SIMCTL_CHILD_MESHTASTIC_PERF_COMPACT_LIST=true \
xcrun simctl launch <UDID> gvh.MeshtasticClient
```

### Example: seed local stats for noise-floor chart work

Use a smaller node count and a larger local stats history when tuning the Local Stats Log UI. This keeps the simulator responsive while giving the chart enough variation to show quiet periods, busy periods, and occasional interference spikes.

```bash
SIMCTL_CHILD_MESHTASTIC_PERF_SEED_NODES=20 \
SIMCTL_CHILD_MESHTASTIC_PERF_LOCAL_STATS_HISTORY=168 \
SIMCTL_CHILD_MESHTASTIC_PERF_TELEMETRY_HISTORY=3 \
SIMCTL_CHILD_MESHTASTIC_PERF_POSITION_HISTORY=3 \
SIMCTL_CHILD_MESHTASTIC_PERF_RESET_STORE=true \
SIMCTL_CHILD_MESHTASTIC_PERF_ENABLE_DISCOVERY=0 \
xcrun simctl launch <UDID> gvh.MeshtasticClient \
  --meshtastic-perf-seed \
  --meshtastic-perf-start-local-stats
```

`--meshtastic-perf-start-local-stats` selects seeded node `0x0A000000` and opens its Local Stats Log directly in DEBUG simulator builds.

Add `--meshtastic-perf-local-stats-same-hour` when checking short-range noise-floor chart layout. It keeps local stats samples in the same hour at 5-minute intervals, which makes `1h` axis label clipping easy to reproduce.

On subsequent launches **without** `MESHTASTIC_PERF_RESET_STORE`, the harness detects the existing node count and skips re-seeding, so the app starts at full speed against the already-seeded store.

### What to expect

5 000 nodes (3 device/environment telemetry samples, 3 local stats samples, 3 positions/node) seed in approximately **12 seconds** on an Apple Silicon Mac. The app navigates automatically to the Nodes tab. Typical idle CPU after seeding is under 2%.

> **Tip — Checking seed progress**
> Seed log lines are emitted at `Info` level under the `🗄️ Data` OSLog category. To stream them:
> ```bash
> log stream --predicate 'process == "Meshtastic" AND eventMessage CONTAINS "[PerfSeed]"' --level info
> ```

### Skip-reseed logic

If the store already contains at least as many nodes as `MESHTASTIC_PERF_SEED_NODES` requests, seeding is skipped unless `MESHTASTIC_PERF_RESET_STORE=true` is set. This means you can kill and relaunch the app against the existing large dataset without waiting for a reseed.
