---
title: Codebase
sidebar_position: 2
last_updated: 2026-07-08
parent: Developer Guide
---

# Codebase

Repository layout, namespacing conventions, and build system overview.

## Repository Structure

```
Meshtastic-Android/
├── androidApp/                 # Android application module
│   ├── src/main/           # Shared Android code
│   ├── src/google/         # Google Play flavor (Gemini, proprietary)
│   └── src/fdroid/         # F-Droid flavor (FOSS-only)
├── desktopApp/                # Desktop JVM application
├── feature/                # Feature modules (KMP)
│   ├── intro/
│   ├── messaging/
│   ├── connections/
│   ├── map/
│   ├── node/
│   ├── settings/
│   ├── firmware/
│   ├── docs/
│   ├── wifi-provision/
│   ├── widget/
│   ├── discovery/
│   └── car/
├── core/                   # Core infrastructure modules (KMP)
│   ├── barcode/
│   ├── ble/
│   ├── common/
│   ├── data/
│   ├── database/
│   ├── datastore/
│   ├── di/
│   ├── domain/
│   ├── konsist/
│   ├── model/
│   ├── navigation/
│   ├── network/
│   ├── nfc/
│   ├── prefs/
│   ├── repository/
│   ├── resources/
│   ├── service/
│   ├── takserver/
│   ├── testing/
│   └── ui/
├── baselineprofile/        # Baseline Profile generation for :androidApp
├── screenshot-tests/       # Compose Preview screenshot tests (visual-regression gate)
├── docs-screenshots/       # Doc-framed composition screenshots (generate-only, not CI-gated)
├── build-logic/            # Convention plugins and build helpers
│   └── convention/
├── docs/                   # Documentation source (markdown)
│   └── en/                 # English source; other locales live under docs/<locale>/user/
│       ├── user/
│       └── developer/
├── gradle/                 # Gradle wrapper and version catalog
│   └── libs.versions.toml
├── specs/                  # Feature specifications
└── .github/workflows/      # CI/CD workflows
```

## Namespacing Convention

All Kotlin packages follow the pattern:
```
org.meshtastic.{layer}.{module}.{subpackage}
```

Examples:
- `org.meshtastic.core.navigation` — core navigation module
- `org.meshtastic.feature.docs.ui` — docs feature UI package
- `org.meshtastic.app.di` — app DI configuration

## Build System

### Gradle Kotlin DSL

All build files use Kotlin DSL (`.gradle.kts`). Configuration:

- **Version catalog:** `gradle/libs.versions.toml`
- **Convention plugins:** `build-logic/convention/`
- **Settings:** `settings.gradle.kts`

### Convention Plugins

Located in `build-logic/convention/src/main/kotlin/`:

| Plugin | Purpose |
|--------|---------|
| `meshtastic.kmp.feature` | Standard feature module setup |
| `meshtastic.kmp.jvm.android` | JVM + Android target configuration |
| `meshtastic.kotlinx.serialization` | Serialization plugin setup |

### Build Variants (Android)

| Flavor | Description |
|--------|-------------|
| `google` | Google Play distribution; includes proprietary APIs |
| `fdroid` | F-Droid distribution; FOSS-only dependencies |

### Key Gradle Tasks

```bash
# Compile check across all KMP targets
./gradlew kmpSmokeCompile

# Run all tests
./gradlew allTests

# Code quality
./gradlew spotlessCheck detekt

# Android build
./gradlew assembleGoogleDebug assembleFdroidDebug

# Desktop run
./gradlew :desktopApp:run

# Desktop native installers for the current OS (DMG / MSI+EXE / DEB+RPM+AppImage)
./gradlew :desktopApp:packageReleaseDistributionForCurrentOS

# API reference (Dokka HTML → build/dokka/html)
./gradlew dokkaGeneratePublicationHtml
```

## Version Catalog Highlights

Key dependencies in `gradle/libs.versions.toml`:

| Category | Library |
|----------|---------|
| Compose | Compose Multiplatform (JetBrains) |
| Navigation | Navigation 3 |
| DI | Koin (annotations) |
| Serialization | kotlinx.serialization |
| Database | Room KMP |
| Networking | Ktor |
| Markdown | multiplatform-markdown-renderer |
| Testing | kotlin-test, compose-ui-test |

---

