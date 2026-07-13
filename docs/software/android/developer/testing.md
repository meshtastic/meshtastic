---
title: Testing
sidebar_position: 7
last_updated: 2026-06-11
parent: Developer Guide
---

# Testing

Testing strategy and practices for the Meshtastic KMP project.

## Test Categories

### KMP Unit Tests (`commonTest`)

Shared tests that run on all platforms:

```bash
./gradlew allTests
```

- Business logic tests
- Data model validation
- Search/ranking algorithm tests
- Route serialization tests

### Android Host Tests

Android-specific tests that run on JVM:

```bash
./gradlew test
```

- ViewModel tests
- Repository tests with Room fakes
- Android-specific integration tests

### Compose UI Tests

Compose Multiplatform UI test framework:

```kotlin
@Test
fun myScreenTest() = runComposeUiTest {
    setContent { MyScreen() }
    onNodeWithText("Expected").assertIsDisplayed()
}
```

Located in `commonTest` or `jvmTest` source sets.

### Screenshot Tests

Uses Android Gradle Plugin's native (layoutlib) screenshot testing framework, split across two modules:

- **`:screenshot-tests`** — the **visual-regression gate**. CI runs `validateDebugScreenshotTest` on it; reframing one of these baselines is a real diff to review. Holds atomic, dual-purpose components.
- **`:docs-screenshots`** — **generate-only**, *not* validated in CI. Holds doc-framed compositions whose framing is tuned for the docs site, so reframing a doc image never churns the regression gate.

```bash
./gradlew :screenshot-tests:updateDebugScreenshotTest    # record regression goldens
./gradlew :screenshot-tests:validateDebugScreenshotTest  # compare against goldens (CI gate)
./gradlew :docs-screenshots:updateDebugScreenshotTest    # record doc-framed composition images
./gradlew :screenshot-tests:copyDocsScreenshots          # copy doc images from BOTH modules into docs/assets
```

Rendering is host-deterministic here (layoutlib): a local `update` produces references byte-identical to CI, so locally-recorded goldens pass `validate`. See `docs/assets/screenshots/README.md` for which module a new screenshot belongs in.

### Baseline Profile / Startup Performance

The `:baselineprofile` module (#5735) generates a [Baseline Profile](https://developer.android.com/topic/performance/baselineprofiles/overview) for `:androidApp`, AOT-compiling the hot startup paths so ART doesn't pay the JIT cost on first launch. It targets the **google** flavor (the variant most users run).

The Macrobenchmark generator (`BaselineProfileGenerator`) and the before/after benchmark (`StartupBenchmark`) live in `baselineprofile/src/main/kotlin/org/meshtastic/baselineprofile/`. Both run on a device/emulator:

```bash
./gradlew :androidApp:generateGoogleReleaseBaselineProfile   # Generate the profile (commit the output)
./gradlew :androidApp:benchmarkGoogleReleaseBaselineProfile  # Quantify the cold-start win
```

The generated profile is merged into `androidApp/src/google/generated/baselineProfiles/` and packaged into release builds via `androidx.profileinstaller`.

> ⚠️ **Warning:** The journey currently covers cold start only (launch → first frame), because CI has no paired radio. Post-connection screens (node list, map, message thread) are not yet AOT-compiled; extend the journey once a fake transport or connected device is wired into the harness.

## Test Organization

```
feature/my-feature/src/
├── commonTest/kotlin/org/meshtastic/feature/myfeature/
│   ├── MyBusinessLogicTest.kt
│   └── MyModelTest.kt
└── jvmTest/kotlin/org/meshtastic/feature/myfeature/
    └── MyDesktopSpecificTest.kt
```

## Testing Guidelines

### DO

- Write tests in `commonTest` when possible (runs everywhere)
- Test business logic independently from UI
- Use fakes/stubs instead of mocks where practical
- Test edge cases: empty states, error states, boundary values
- Test deep link routing in `DeepLinkRouterTest`
- Keep tests fast — no network, no disk I/O in unit tests

### DON'T

- Don't test framework behavior (Compose internals, Room queries)
- Don't create tests that depend on other feature modules
- Don't use `Thread.sleep` — use coroutine test dispatchers
- Don't rely on test execution order

## Running Tests

```bash
# All KMP tests
./gradlew allTests

# Specific module
./gradlew :feature:docs:allTests

# Code quality
./gradlew spotlessCheck detekt

# Full verification
./gradlew spotlessCheck detekt kmpSmokeCompile test allTests
```

## CI Integration

Tests run automatically on:
- Pull request creation/update
- Push to `main`
- Pre-release validation

The CI workflow uses `ubuntu-24.04` with JDK 21 and Gradle caching.

---

