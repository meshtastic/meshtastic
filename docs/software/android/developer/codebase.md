---
title: Codebase
sidebar_position: 2
last_updated: 2026-10-21
description: Repository layout, package namespacing, and the Gradle build system — convention plugins, build variants, and key tasks.
parent: Developer Guide
---

# Codebase

Repository layout, namespacing conventions, and build system overview.

## Repository Structure

```text
Meshtastic-Android/
├── androidApp/             # Android application module
│   ├── src/main/           # Shared Android code
│   ├── src/google/         # Google Play flavor (proprietary Google integrations — Gemini, Maps, Play services)
│   └── src/fdroid/         # F-Droid flavor (FOSS-only)
├── desktopApp/             # Desktop JVM application
├── feature/                # Feature modules (KMP, except widget)
│   ├── intro/
│   ├── messaging/
│   ├── connections/
│   ├── map/
│   ├── map-maplibre/
│   ├── map-terrain/
│   ├── coverage/
│   ├── node/
│   ├── settings/
│   ├── firmware/
│   ├── docs/
│   ├── wifi-provision/
│   ├── widget/             # Android library
│   └── discovery/
├── core/                   # Core infrastructure modules (KMP, except barcode and nfc)
│   ├── barcode/            # Android library
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
│   ├── nfc/                # Android library
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
├── store-screenshots/      # Store-listing screenshots captured from the real apps (instrumented)
├── schema-strings/         # JVM generator for schema_strings.xml from the protobufs field metadata
├── build-logic/            # Convention plugins and build helpers
│   ├── convention/
│   └── settings-plugin/    # meshtastic.develocity settings plugin
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
```text
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

Located in `build-logic/convention/src/main/kotlin/`. The full set is registered in
`build-logic/convention/build.gradle.kts`; these are the ones a module build applies most often:

| Plugin | Purpose |
|--------|---------|
| `meshtastic.kmp.feature` | Feature module setup: applies `meshtastic.kmp.library`, `meshtastic.kmp.library.compose` and `meshtastic.koin`, and adds the Compose, Navigation 3, Lifecycle and Koin dependencies every feature needs |
| `meshtastic.kmp.library` | Shared KMP library module |
| `meshtastic.kmp.library.compose` | KMP library that also ships Compose UI |
| `meshtastic.kmp.jvm.android` | Adds the `jvmAndroidMain` source set shared by the Android and desktop JVM targets |
| `meshtastic.koin` | Koin Annotations + K2 compiler plugin |
| `meshtastic.kotlinx.serialization` | Serialization plugin setup |
| `meshtastic.android.room` | Room KMP setup and schema location |
| `meshtastic.android.screenshot` | Compose Preview screenshot testing |

The rest cover the application and library variants, lint, detekt, spotless, Dokka, Kover,
AboutLibraries, analytics, secrets, the docs tasks and the root aggregate — read the `register(…)`
block rather than assuming a plugin does or does not exist.

### Build Variants (Android)

| Flavor | Description |
|--------|-------------|
| `google` | Google Play distribution; includes proprietary APIs |
| `fdroid` | F-Droid distribution; FOSS-only dependencies |

### Key Gradle Tasks

```shell
# Compile every KMP module's commonMain metadata, JVM main, and iosSimulatorArm64 main and test sources (excludes :desktopApp), and assemble the device-test APKs
./gradlew kmpSmokeCompile

# Run all tests: allTests covers KMP modules, test covers Android/JVM-only modules; run both
./gradlew test allTests

# Code quality
./gradlew spotlessCheck detekt detektTypeResolved

# Android build
./gradlew assembleGoogleDebug assembleFdroidDebug

# Desktop run
./gradlew :desktopApp:run

# Desktop native installers for the current OS (DMG / MSI+EXE / DEB+RPM+AppImage)
./gradlew :desktopApp:packageReleaseDistributionForCurrentOS

# API reference (Dokka HTML → build/dokka/html)
./gradlew :dokkaGeneratePublicationHtml
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
| BLE | Kable |
| Serial | usb-serial-for-android (Android), jSerialComm (Desktop) |
| Testing | kotlin-test, Kotest, Mokkery, Turbine, Compose Multiplatform UI test |
