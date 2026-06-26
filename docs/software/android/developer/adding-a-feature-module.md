---
title: Adding a Feature Module
sidebar_position: 3
last_updated: 2026-05-13
parent: Developer Guide
---

# Adding a Feature Module

Step-by-step guide for creating a new KMP feature module in the Meshtastic project.

## 1. Create the Module Directory

```bash
mkdir -p feature/my-feature/src/{commonMain,commonTest,androidMain,jvmMain,iosMain}/kotlin/org/meshtastic/feature/myfeature
```

## 2. Create `build.gradle.kts`

```kotlin
plugins {
    alias(libs.plugins.meshtastic.kmp.feature)
}

kotlin {
    androidLibrary { withHostTest { } }

    sourceSets {
        commonMain.dependencies {
            implementation(projects.core.common)
            implementation(projects.core.navigation)
            implementation(projects.core.resources)
            implementation(projects.core.ui)
            implementation(projects.core.di)
        }

        commonTest.dependencies {
            implementation(libs.compose.multiplatform.ui.test)
        }

        jvmTest.dependencies {
            implementation(compose.desktop.currentOs)
        }
    }
}
```

## 3. Register in `settings.gradle.kts`

Add your module to the main `include()` block:

```kotlin
include(
    // ...existing modules...
    ":feature:my-feature",
)
```

## 4. Create the DI Module

`src/commonMain/kotlin/org/meshtastic/feature/myfeature/di/FeatureMyFeatureModule.kt`:

```kotlin
package org.meshtastic.feature.myfeature.di

import org.koin.core.annotation.ComponentScan
import org.koin.core.annotation.Module

@Module
@ComponentScan("org.meshtastic.feature.myfeature")
class FeatureMyFeatureModule
```

## 5. Register DI in App/Desktop

Add your module to:
- `androidApp/src/main/kotlin/org/meshtastic/app/di/AppKoinModule.kt`
- `desktopApp/src/main/kotlin/org/meshtastic/desktop/di/DesktopKoinModule.kt`

## 6. Add Navigation Routes

In `core/navigation/src/commonMain/kotlin/org/meshtastic/core/navigation/Routes.kt`:

```kotlin
@Serializable
sealed interface MyFeatureRoute : Route {
    @Serializable data object MyFeatureGraph : MyFeatureRoute, Graph
    @Serializable data object MyFeatureHome : MyFeatureRoute
}
```

## 7. Create Navigation Entries

`src/commonMain/kotlin/org/meshtastic/feature/myfeature/navigation/MyFeatureNavigation.kt`:

```kotlin
package org.meshtastic.feature.myfeature.navigation

import androidx.navigation3.runtime.EntryProviderScope
import org.meshtastic.core.navigation.MyFeatureRoute

fun EntryProviderScope<*>.myFeatureEntries() {
    entry<MyFeatureRoute.MyFeatureHome> {
        MyFeatureScreen()
    }
}
```

## 8. Source Set Guidelines

| Source Set | Contains |
|-----------|----------|
| `commonMain` | Models, ViewModels, shared UI, DI module, navigation |
| `androidMain` | Android-specific implementations (e.g., platform APIs) |
| `jvmMain` | Desktop-specific implementations |
| `iosMain` | iOS-specific implementations |
| `commonTest` | Shared unit tests |

## 9. Testing Expectations

Every feature module should have:
- Unit tests in `commonTest` for business logic
- UI tests using `compose-multiplatform-ui-test` where appropriate
- No test dependency on other feature modules

## 10. Checklist

- [ ] Module directory created
- [ ] `build.gradle.kts` with correct plugins and dependencies
- [ ] Added to `settings.gradle.kts`
- [ ] DI module created with `@ComponentScan`
- [ ] DI module registered in app and desktop roots
- [ ] Routes added to `Routes.kt`
- [ ] Navigation entries registered
- [ ] `./gradlew kmpSmokeCompile` passes
- [ ] `./gradlew :feature:my-feature:allTests` passes

---

