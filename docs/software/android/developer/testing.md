---
title: Testing
sidebar_position: 7
last_updated: 2026-05-13
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

Uses Android Gradle Plugin's native screenshot testing framework:

```bash
./gradlew :screenshot-tests:updateDebugScreenshotTest    # Record golden images
./gradlew :screenshot-tests:validateDebugScreenshotTest  # Compare against goldens
./gradlew :screenshot-tests:copyDocsScreenshots          # Copy reference images to docs pipeline
```

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

