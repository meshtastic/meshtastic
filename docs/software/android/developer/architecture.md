---
title: Architecture
sidebar_position: 1
last_updated: 2026-06-11
parent: Developer Guide
---

# Architecture

The Meshtastic Android/Desktop/iOS application follows a modular Kotlin Multiplatform (KMP) architecture with clear layer boundaries.

## Layer Overview

```
┌─────────────────────────────────────────────┐
│          androidApp / desktopApp            │  Platform entry points
├─────────────────────────────────────────────┤
│              feature/* modules               │  UI + Business Logic
├─────────────────────────────────────────────┤
│                core/* modules                │  Shared infrastructure
├─────────────────────────────────────────────┤
│           Platform (Android/JVM/iOS)         │  OS-specific bindings
└─────────────────────────────────────────────┘
```

## Module Categories

### `androidApp/` — Android Application

The Android application entry point:
- Activity, Application, and Manifest definitions
- Koin DI module composition (`AppKoinModule`)
- Flavor-specific bindings (`google/`, `fdroid/`)
- Android-only integrations (widgets, services)

### `desktopApp/` — Desktop JVM Application

The Desktop (Linux/macOS/Windows) entry point:
- Compose Desktop window management
- Desktop-specific DI (`DesktopKoinModule`)
- Platform stubs for Android-only capabilities
- BLE (Kable), Serial, and TCP transport implementations

### `feature/*` — Feature Modules

Each `feature/` module owns a vertical slice of functionality:

| Module | Responsibility |
|--------|---------------|
| `feature:intro` | Onboarding/welcome flow |
| `feature:messaging` | Messages, channels, contacts, quick chat |
| `feature:connections` | Bluetooth/USB/TCP connection management |
| `feature:map` | Map display, waypoints |
| `feature:node` | Node list, node detail, metrics |
| `feature:settings` | All configuration screens |
| `feature:firmware` | Firmware update flow |
| `feature:docs` | In-app documentation browser |
| `feature:wifi-provision` | WiFi provisioning |
| `feature:widget` | Android home screen widgets |
| `feature:discovery` | Mesh network discovery |
| `feature:car` | Android Auto / Car App Library — google flavor only, conditionally registered in the google `FlavorModule` |

Feature modules:
- Use the `meshtastic.kmp.feature` convention plugin
- Depend on `core` modules, never on other `feature` modules
- Own their navigation entries and DI registrations
- Contain platform-specific implementations in `androidMain`/`jvmMain`/`iosMain`

### `core/*` — Core Modules

Shared infrastructure used by all features:

| Module | Responsibility |
|--------|---------------|
| `core:common` | Utilities, extensions, build config |
| `core:navigation` | Routes, deep links, Navigation 3 |
| `core:ui` | Shared Compose components, icons, theme |
| `core:resources` | Shared string resources |
| `core:model` | Domain models |
| `core:data` | Data layer abstractions |
| `core:database` | Room KMP database |
| `core:datastore` | DataStore preferences |
| `core:prefs` | App preferences |
| `core:repository` | Repository interfaces |
| `core:service` | Mesh service layer |
| `core:di` | DI utilities |
| `core:network` | HTTP/serial/transport |
| `core:ble` | Bluetooth LE abstractions |
| `core:testing` | Test utilities |

Protobuf models are no longer a local module — they come from the external `org.meshtastic:protobufs` Maven artifact (pinned in `gradle/libs.versions.toml`).

## KMP Source Sets

Each module uses the standard KMP source set hierarchy:

```
src/
├── commonMain/     ← Shared code (all platforms)
├── commonTest/     ← Shared tests
├── androidMain/    ← Android-specific
├── jvmMain/        ← Desktop JVM-specific
├── iosMain/        ← iOS-specific
└── jvmTest/        ← Desktop test host
```

**Golden Rules:**
- No `android.*` imports in `commonMain`
- Platform-specific code goes in appropriate source set
- Prefer interfaces + DI over `expect`/`actual` for complex behaviors
- Use `expect`/`actual` only for simple declarations

## Dependency Injection

The project uses **Koin** with annotation processing:
- `@Module`, `@Single`, `@Factory` annotations
- `@ComponentScan` for automatic registration
- Feature modules export their own `Feature*Module` class
- App/Desktop compose all modules in their root DI configuration

## Radio Control

Features issue radio commands through `RadioController` (`core:repository`), a composite of four
focused sub-interfaces so callers can depend on just the slice they need:

| Sub-interface | Responsibility |
|---------------|---------------|
| `AdminController` | Config, channels, owner, device lifecycle, `editSettings { }` transactions |
| `MessagingController` | Send packets, reactions, shared contacts |
| `NodeController` | Favorite, ignore, mute, remove nodes |
| `QueryController` | Telemetry, traceroute, position/user-info queries |

`RadioControllerImpl` (`core:service`) is the in-process composition root for all targets
(Desktop, iOS, single-process Android). It assembles the four sub-controllers via Kotlin interface
delegation and adds the cross-cutting concerns (connection state, packet-id, location,
device-address switching). Commands are direct suspend calls; admin writes are fire-and-forget
because the device is the source of truth (local persistence is an optimistic cache). The layered
shape mirrors the [meshtastic-sdk](https://github.com/meshtastic/meshtastic-sdk)
`AdminApi`/`TelemetryApi` design to ease a future SDK migration.

## Service Repository

`ServiceRepository` is the reactive bridge between the mesh service and all feature/UI layers.
It is decomposed into focused provider interfaces following the Interface Segregation Principle:

| Interface | Responsibility |
|-----------|---------------|
| `ConnectionStateProvider` | Read-only `connectionState: StateFlow<ConnectionState>` |
| `TracerouteResponseProvider` | Traceroute response state + clear |
| `NeighborInfoResponseProvider` | Neighbor info response state + clear |
| `ServiceStateWriter` | Write-side for handlers (set*, emit*, clear*) |

`ServiceRepository` extends all four interfaces — consumers inject the narrowest interface
they actually need. For example, `ContactsViewModel` injects only `ConnectionStateProvider`
rather than the entire `ServiceRepository`, preventing accidental access to write operations
from UI code. `RadioController` also extends `ConnectionStateProvider` so VMs that already
inject a controller sub-interface can read connection state without a separate dependency.

## Navigation

Navigation uses **Navigation 3** with typed routes:
- All routes defined in `core/navigation/Routes.kt`
- Routes are `@Serializable` data classes/objects
- Deep links resolved through `DeepLinkRouter`
- Each feature registers its own navigation entries

See [Navigation & Deep Links](navigation-and-deep-links.md) for details.

---

