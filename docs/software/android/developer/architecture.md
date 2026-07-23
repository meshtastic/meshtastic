---
title: Architecture
sidebar_position: 1
last_updated: 2026-05-13
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
| `core:proto` | Protobuf definitions |
| `core:testing` | Test utilities |

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

## Navigation

Navigation uses **Navigation 3** with typed routes:
- All routes defined in `core/navigation/Routes.kt`
- Routes are `@Serializable` data classes/objects
- Deep links resolved through `DeepLinkRouter`
- Each feature registers its own navigation entries

See [Navigation & Deep Links](navigation-and-deep-links.md) for details.

---

