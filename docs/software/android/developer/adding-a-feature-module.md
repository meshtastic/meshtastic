---
title: Adding a Feature Module
sidebar_position: 3
last_updated: 2026-09-29
description: Step-by-step guide for creating a new KMP feature module — module directory, build script, DI, routes, navigation entries, and the checklist.
parent: Developer Guide
---

# Adding a Feature Module

Step-by-step guide for creating a new KMP feature module in the Meshtastic project.

## Create the Module Directory

```shell
mkdir -p feature/my-feature/src/{commonMain,commonTest,androidMain,jvmMain,iosMain}/kotlin/org/meshtastic/feature/myfeature
```

## Create `build.gradle.kts`

```kotlin
plugins {
    alias(libs.plugins.meshtastic.kmp.feature)
}

kotlin {
    android { withHostTest { isIncludeAndroidResources = true } }

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

## Register in `settings.gradle.kts`

Add your module to the main `include()` block:

```kotlin
include(
    // ...existing modules...
    ":feature:my-feature",
)
```

## Create the DI Module

`src/commonMain/kotlin/org/meshtastic/feature/myfeature/di/FeatureMyFeatureModule.kt`:

```kotlin
package org.meshtastic.feature.myfeature.di

import org.koin.core.annotation.ComponentScan
import org.koin.core.annotation.Module

@Module
@ComponentScan("org.meshtastic.feature.myfeature")
class FeatureMyFeatureModule
```

## Register DI in App/Desktop

Add your module to:
- `androidApp/src/main/kotlin/org/meshtastic/app/di/AppKoinModule.kt`
- `desktopApp/src/main/kotlin/org/meshtastic/desktop/di/DesktopKoinModule.kt`

## Add Navigation Routes

In `core/navigation/src/commonMain/kotlin/org/meshtastic/core/navigation/Routes.kt`:

```kotlin
@Serializable
sealed interface MyFeatureRoute : Route {
    @Serializable data object MyFeatureGraph : MyFeatureRoute, Graph
    @Serializable data object MyFeatureHome : MyFeatureRoute
}
```

## Create Navigation Entries

`src/commonMain/kotlin/org/meshtastic/feature/myfeature/navigation/MyFeatureNavigation.kt`:

```kotlin
package org.meshtastic.feature.myfeature.navigation

import androidx.navigation3.runtime.EntryProviderScope
import androidx.navigation3.runtime.NavBackStack
import androidx.navigation3.runtime.NavKey
import org.meshtastic.core.navigation.MyFeatureRoute

fun EntryProviderScope<NavKey>.myFeatureGraph(backStack: NavBackStack<NavKey>) {
    entry<MyFeatureRoute.MyFeatureGraph> {
        MyFeatureScreen(onNavigateUp = { backStack.removeLastOrNull() })
    }
    entry<MyFeatureRoute.MyFeatureHome> {
        MyFeatureScreen(onNavigateUp = { backStack.removeLastOrNull() })
    }
}
```

Both the graph sentinel (`MyFeatureRoute.MyFeatureGraph`) and the primary screen (`MyFeatureRoute.MyFeatureHome`)
navigate to the same composable, so the feature is reachable via either a top-level push or a deep-link graph
push — the same pattern `feature:wifi-provision` and `feature:firmware` use.

Then wire it up: call `myFeatureGraph(backStack)` from the shared `entryProvider<NavKey> { }` block in
`androidApp`'s `Main.kt` and `desktopApp`'s `DesktopNavigation.kt`, alongside the other features' entries
functions. See [Navigation Entry Registration](navigation-and-deep-links.md#navigation-entry-registration).

## Source Set Guidelines

| Source Set | Contains |
|-----------|----------|
| `commonMain` | Models, ViewModels, shared UI, DI module, navigation |
| `androidMain` | Android-specific implementations (e.g., platform APIs) |
| `jvmMain` | Desktop-specific implementations |
| `iosMain` | iOS-specific implementations |
| `commonTest` | Shared unit tests |

## Testing Expectations

Every feature module should have:
- Unit tests in `commonTest` for business logic
- UI tests using `compose-multiplatform-ui-test` where appropriate
- No test dependency on other feature modules

## Checklist

- [ ] Module directory created
- [ ] `build.gradle.kts` with correct plugins and dependencies
- [ ] Added to `settings.gradle.kts`
- [ ] Added to `ALL_MODULES_FULL` in `build-logic/convention/src/main/kotlin/RootConventionPlugin.kt`; `python3 scripts/check-module-list.py` fails when a non-exempt module is missing from it, when an entry is absent from the `settings.gradle.kts` includes, or when an exempt module is re-added, and a non-exempt module missing from it is absent from Dokka and Kover aggregation and `kmpSmokeCompile`
- [ ] Added to a test shard in `.github/workflows/reusable-check.yml` (`shard-feature` for a feature module): its `:feature:my-feature:allTests` task in `tasks` and its `koverXmlReport` in `kover`; `python3 scripts/check-test-shards.py` fails for a module with no test task in any shard, unless the module is listed in the script's `COVERED_ELSEWHERE` or `NO_TESTS_YET` sets
- [ ] If the module is user-facing, a page under `docs/en/user/` and a `MODULE_TO_DOCS` entry for it in `scripts/check-doc-coverage.js`; the check fails when a listed module's page is missing, and a module with no entry needs no page
- [ ] DI module created with `@ComponentScan`
- [ ] DI module registered in app and desktop roots
- [ ] Routes added to `Routes.kt`
- [ ] Navigation entries registered
- [ ] `./gradlew kmpSmokeCompile` passes
- [ ] `./gradlew :feature:my-feature:allTests` passes
