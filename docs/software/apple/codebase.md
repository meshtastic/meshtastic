---
title: Codebase Guide
parent: Developer Guide
nav_order: 2
---

# Codebase Guide

## Top-Level Structure

```
Meshtastic/
├── MeshtasticApp.swift         # @main App struct
├── MeshtasticAppDelegate.swift # UIApplicationDelegate (SiriKit)
├── AppState.swift              # @EnvironmentObject root state
├── Accessory/                  # BLE/TCP/serial connectivity
├── API/                        # REST API helpers
├── AppIntents/                 # Siri / Shortcuts intents
├── CarPlay/                    # CarPlay scene
├── Enums/                      # Shared enumerations
├── Extensions/                 # Swift extensions (Logger, Date, String…)
├── Helpers/                    # Utility types (no UI)
├── Intents/                    # INIntent handlers
├── Measurement/                # Unit/measurement formatting
├── Model/                      # @Model SwiftData types
├── Persistence/                # PersistenceController, MeshPackets actor
├── Resources/                  # Assets, docs bundle, Info.plist
├── Router/                     # Router + NavigationState
├── Tips/                       # TipKit tips
└── Views/                      # SwiftUI views
    ├── Bluetooth/              # BLE connect view
    ├── Map/                    # Map + overlay views
    ├── Messages/               # Channel + DM views
    ├── Nodes/                  # Node list + detail
    └── Settings/               # All settings views
MeshtasticProtobufs/            # Swift Package wrapping generated protobufs
MeshtasticTests/                # Test target (Swift Testing)
scripts/                        # Build and utility scripts
specs/                          # Feature specs (speckit workflow)
```

## Key Files

| File | Purpose |
|------|---------|
| `Router/Router.swift` | Central navigation controller (`@MainActor`) |
| `Router/NavigationState.swift` | Per-tab navigation state enums |
| `Extensions/Logger.swift` | Typed OSLog loggers for all subsystems |
| `Persistence/PersistenceController.swift` | SwiftData `ModelContainer` setup |
| `Model/MeshtasticSchema.swift` | `VersionedSchema` + `SchemaMigrationPlan` |
| `Accessory/Accessory Manager/AccessoryManager.swift` | BLE/TCP manager root class |

## Extension File Pattern

Large manager classes are split into `+Extension` files grouped by concern:

```swift
// AccessoryManager.swift — properties and init only
// AccessoryManager+Connect.swift — connection lifecycle
// AccessoryManager+ToRadio.swift — outbound packet methods
// AccessoryManager+FromRadio.swift — inbound packet handling
```

Follow the same pattern when adding new subsystems to `AccessoryManager` or other large classes.

## Logging

All logging uses typed `Logger` instances from `Meshtastic/Extensions/Logger.swift`. Never use `print()`.

```swift
Logger.mesh.debug("Packet received: \(packet.id)")
Logger.transport.error("BLE write failed: \(error)")
```

Available categories: `.admin`, `.data`, `.docs`, `.mesh`, `.mqtt`, `.radio`, `.services`, `.statistics`, `.transport`, `.tak`

## View Hierarchy

Views are in `Meshtastic/Views/`. Each major feature has its own subdirectory. The root `ContentView` hosts a `TabView` keyed on `NavigationState`.

Views that need connectivity inject `@EnvironmentObject var bleManager: BLEManager` (legacy name; newer code uses `AccessoryManager`). Views that need navigation inject `@EnvironmentObject var router: Router`.

## Localization

All user-visible strings must use `String(localized:)` or `LocalizedStringKey`. The source strings file is `Localizable.xcstrings` in the project root.
