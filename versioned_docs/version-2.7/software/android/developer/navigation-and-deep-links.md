---
title: Navigation & Deep Links
sidebar_position: 4
last_updated: 2026-07-08
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

Both forms resolve through the same `DeepLinkRouter`, so any path below works with either scheme:

```text
meshtastic://meshtastic/{path}
https://meshtastic.org/{path}       # App Link, android:autoVerify — also opens in-app on a real device/adb
```

`adb shell am start -a android.intent.action.VIEW -d "meshtastic://meshtastic/{path}"` is the fastest way to
trigger any route below from a shell or automation script without touching the UI.

For the `https` form to open in-app, each top-level path segment must also be declared as an
`android:pathPrefix` in the `android:autoVerify` intent-filter in `androidApp/src/main/AndroidManifest.xml` —
otherwise the link opens in the browser. Adding a new top-level route therefore takes three steps: add the
segment to `DeepLinkRouter.topLevelPathSegments` (the router refuses to dispatch segments outside that set),
add its `when` branch in `DeepLinkRouter.route()`, and add the matching `pathPrefix` to the manifest.
`DeepLinkManifestConsistencyTest` (androidApp unit tests) checks the manifest against the set, so a missing
manifest entry fails CI.

**Source of truth:** the always-current list of top-level segments is `topLevelPathSegments` in
[`DeepLinkRouter`](https://github.com/meshtastic/Meshtastic-Android/blob/main/core/navigation/src/commonMain/kotlin/org/meshtastic/core/navigation/DeepLinkRouter.kt)
— sub-paths live in the `route()` `when` block plus its helper maps (`settingsSubRoutes`, `nodeDetailSubRoutes`);
the class-level KDoc is illustrative, not exhaustive. It also exists as executable spec in
[`DeepLinkRouterTest.kt`](https://github.com/meshtastic/Meshtastic-Android/blob/main/core/navigation/src/commonTest/kotlin/org/meshtastic/core/navigation/DeepLinkRouterTest.kt).
The table below is a snapshot for quick reference — check those two files if it looks out of date.

### Supported Deep Links

| URI Path | Route | Notes |
|----------|-------|-------|
| `/connections` | `ConnectionsRoute.Connections(null)` | Connections screen |
| `/connections?address={prefixedAddress}` | `ConnectionsRoute.Connections(address)` | Auto-connects to a device without manual selection — the address uses the app's internal transport-prefixed format: `t192.168.1.1:4403` (TCP), `xAA:BB:CC:DD:EE:FF` (BLE), `s/dev/ttyUSB0` (serial). Intended for scripts/AI tooling driving the app. |
| `/connections?address=n` | `ConnectionsRoute.Connections("n")` | Disconnects the current device instead of connecting (`n` = the internal "no device selected" sentinel). |
| `/wifi-provision` | `WifiProvisionRoute.WifiProvision(null)` | WiFi provisioning screen |
| `/wifi-provision?address={mac}` | `WifiProvisionRoute.WifiProvision(mac)` | Provisioning targeting a specific device MAC |
| `/settings` | `SettingsRoute.Settings(null)` | Settings root |
| `/settings/helpDocs` | `SettingsRoute.HelpDocs` | Docs browser |
| `/settings/helpDocs/{pageId}` | `SettingsRoute.HelpDocPage(pageId)` | Specific doc page |
| `/settings/help-docs` | `SettingsRoute.HelpDocs` | Compatibility alias |
| `/discovery` | `DiscoveryRoute.DiscoveryGraph` | Local Mesh Discovery entry point |
| `/settings/local-mesh-discovery/session/{sessionId}` | `DiscoveryRoute.DiscoverySummary(sessionId)` | Discovery session result |
| `/nodes` | `NodesRoute.Nodes` | Node list |
| `/nodes/{destNum}` | `NodesRoute.NodeDetail(destNum)` | Node detail |
| `/nodes/{destNum}/{metric}` | e.g. `NodeDetailRoute.DeviceMetrics(destNum)` | Specific node metric tab (`device-metrics`, `signal`, `power`, `traceroute`, `pax`, `neighbors`, ...) |
| `/messages` | `ContactsRoute.Contacts` | Conversation list |
| `/messages/{contactKey}` | `ContactsRoute.Messages(contactKey)` | Specific conversation |
| `/share?message={text}` | `ContactsRoute.Share(message)` | Share-to-contact composer |
| `/quickchat` | `ContactsRoute.QuickChat` | Quick chat picker |
| `/map` | `MapRoute.Map(null)` | Map view |
| `/map/{waypointId}` | `MapRoute.Map(waypointId)` | Map centered on a waypoint |
| `/channels` | `ChannelsRoute.Channels` | Channel list |
| `/firmware` | `FirmwareRoute.FirmwareGraph` | Firmware screen |
| `/firmware/update` | `FirmwareRoute.FirmwareUpdate` | Firmware update flow |

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
5. Update the KDoc list on `DeepLinkRouter.route()` and the table above — they're the two places tooling/agents look to discover what deep links exist.

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

