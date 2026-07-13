---
title: Navigation & Deep Links
sidebar_position: 4
last_updated: 2026-05-13
parent: Developer Guide
---

# Navigation & Deep Links

The app uses **Navigation 3** with typed, serializable routes and centralized deep link resolution.

## Route Architecture

All routes are defined in `core/navigation/src/commonMain/kotlin/org/meshtastic/core/navigation/Routes.kt`.

### Route Hierarchy

```kotlin
interface Route : NavKey           // All routes implement NavKey
interface Graph : Route            // Graph roots for navigation hierarchies

@Serializable
sealed interface SettingsRoute : Route {
    @Serializable data class Settings(val destNum: Int? = null) : SettingsRoute, Graph
    @Serializable data object DeviceConfiguration : SettingsRoute
    @Serializable data object HelpDocs : SettingsRoute
    @Serializable data class HelpDocPage(val pageId: String) : SettingsRoute
    // ...
}
```

### Conventions

- Routes are `@Serializable` for state restoration
- Use `data object` for routes without parameters
- Use `data class` for parameterized routes
- Group related routes under a `sealed interface`
- Graph entry points implement both the route interface and `Graph`

## Deep Link Router

`DeepLinkRouter` in `core/navigation` maps URI deep links to typed backstack lists.

### URI Format

```
meshtastic://meshtastic/{path}
```

### Supported Deep Links

| URI Path | Route | Notes |
|----------|-------|-------|
| `/settings` | `SettingsRoute.Settings(null)` | Settings root |
| `/settings/helpDocs` | `SettingsRoute.HelpDocs` | Docs browser |
| `/settings/helpDocs/{pageId}` | `SettingsRoute.HelpDocPage(pageId)` | Specific doc page |
| `/settings/help-docs` | `SettingsRoute.HelpDocs` | Compatibility alias |
| `/nodes` | `NodesRoute.Nodes` | Node list |
| `/nodes/{destNum}` | `NodesRoute.NodeDetail(destNum)` | Node detail |
| `/messages/{contactKey}` | `ContactsRoute.Messages(contactKey)` | Conversation |
| `/map` | `MapRoute.Map(null)` | Map view |

### Backstack Synthesis

Deep links synthesize a full backstack, not just the target screen:

```kotlin
// /settings/helpDocs/messages-and-channels produces:
listOf(
    SettingsRoute.Settings(null),
    SettingsRoute.HelpDocs,
    SettingsRoute.HelpDocPage("messages-and-channels"),
)
```

This ensures the user can navigate "up" correctly.

## Adding a Deep Link

1. Define the typed route in `Routes.kt`.
2. Add the mapping in `DeepLinkRouter.settingsSubRoutes` (or equivalent for other graphs).
3. Add a test in `DeepLinkRouterTest.kt`.
4. Register the navigation entry in the appropriate feature module.

## Navigation Entry Registration

Each feature module provides entries via an extension function:

```kotlin
fun EntryProviderScope<NavKey>.docsEntries(backStack: NavBackStack<NavKey>) {
    entry<SettingsRoute.HelpDocs> { DocsBrowserScreen(backStack) }
    entry<SettingsRoute.HelpDocPage> { route -> DocsPageRouteScreen(route.pageId, backStack) }
}
```

These are called from the settings navigation composition.

## Testing

Deep link routing is tested in:
```
core/navigation/src/commonTest/kotlin/org/meshtastic/core/navigation/DeepLinkRouterTest.kt
```

---

