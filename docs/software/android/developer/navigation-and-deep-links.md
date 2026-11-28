---
title: Navigation & Deep Links
sidebar_position: 4
last_updated: 2026-10-21
description: How typed Navigation 3 routes and DeepLinkRouter work together, the supported deep link URIs, and how to add a new one.
parent: Developer Guide
---

# Navigation & Deep Links

The app uses **Navigation 3** with typed, serializable routes and centralized deep link resolution.

## Route architecture

All routes are defined in `core/navigation/src/commonMain/kotlin/org/meshtastic/core/navigation/Routes.kt`.

### Route hierarchy

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
- Register each sealed interface in `MeshtasticNavSavedStateConfig` (`NavigationConfig.kt`); `NavigationConfigTest` round-trips an instance of every route through saved state

## Deep link router

`DeepLinkRouter` in `core/navigation` maps URI deep links to typed backstack lists. Each supported link is a
Navigation 3 `UriDeepLinkMatcher` pattern whose placeholders decode into the target route's fields, wrapped in
`withBackStack` to synthesize the parents.

Patterns are anchored, so a path no pattern models returns null: `/firmware/anything-else` doesn't open the
firmware screen. Where a family has a fallback, it is a pattern of its own: an unknown node metric opens the
node detail, a non-numeric node or waypoint ID opens the node list or the map, and an unknown settings page
opens the settings root. Path literals match case-insensitively.

### URI format

Every form resolves through the same `DeepLinkRouter`, so any deep link path works with any of them:

```text
meshtastic://meshtastic/{path}
https://meshtastic.org/{path}       # App Link, android:autoVerify — also opens in-app on a real device/adb
http://meshtastic.org/{path}        # declared in the same intent filter
```

`adb shell am start -a android.intent.action.VIEW -d "meshtastic://meshtastic/{path}"` is the fastest way to
trigger any route in the Supported Deep Links table from a shell or automation script without touching the UI.

For the `https` form to open in-app, each top-level path segment must also be declared as an
`android:pathPrefix` in the `android:autoVerify` intent-filter in `androidApp/src/main/AndroidManifest.xml` —
otherwise the link opens in the browser. Adding a new top-level route therefore takes three steps: add the
segment to `DeepLinkRouter.topLevelPathSegments` (the router refuses to dispatch segments outside that set),
add its matcher to `DeepLinkRouter.matchers`, and add the matching `pathPrefix` to the manifest.
`DeepLinkManifestConsistencyTest` (androidApp unit tests) checks the manifest against the set, so a missing
manifest entry fails CI.

The channel-set and contact import links (`/e/` and `/v/`) aren't routes. `DeepLinkRouter.route` returns
null for them, and the caller hands them to its import fallback.

**Source of truth:**

- The always-current list of top-level segments is `topLevelPathSegments` in
  [`DeepLinkRouter`](https://github.com/meshtastic/Meshtastic-Android/blob/main/core/navigation/src/commonMain/kotlin/org/meshtastic/core/navigation/DeepLinkRouter.kt).
- Sub-paths live in the `matchers` list plus its helper maps (`settingsSubRoutes`, `nodeDetailSubRoutes`).
- The class-level KDoc on the `DeepLinkRouter` object lists example mappings, but it's illustrative, not
  exhaustive.
- The executable spec is
  [`DeepLinkRouterTest.kt`](https://github.com/meshtastic/Meshtastic-Android/blob/main/core/navigation/src/commonTest/kotlin/org/meshtastic/core/navigation/DeepLinkRouterTest.kt).
- The following table is a snapshot for quick reference — check those two files if it looks out of date.

### Supported deep links

| URI Path | Route | Notes |
|----------|-------|-------|
| `/connections` | `ConnectionsRoute.Connections(null)` | Connections screen |
| `/connections?address={prefixedAddress}` | `ConnectionsRoute.Connections(address)` | Connects to a node once the user confirms the "Connect to this device?" dialog — the address uses the app's internal transport-prefixed format: `t192.168.1.1:4403` (TCP), `xAA:BB:CC:DD:EE:FF` (BLE), `s/dev/ttyUSB0` (serial). Intended for scripts/AI tooling driving the app; a debug build started through its shell-only `org.meshtastic.app.AutomationLauncher` alias with the `skip_connect_confirm` intent extra, or with the `--skip-connect-confirm` argument on desktop, applies the address it was launched with without the dialog; links that arrive later still ask. |
| `/connections?address={prefixedAddress}&pin={pin}` | `ConnectionsRoute.Connections(address, pin)` | For a BLE address, `pin` is the node's 6-digit pairing PIN (`FIXED_PIN` mode). The confirmation dialog shows the PIN; on confirm, the PIN is copied to the clipboard (marked sensitive) and Android pairs first, answering the PIN request with it where the OS allows. On Android 17, `setPin` needs `BLUETOOTH_PRIVILEGED`, so the system PIN dialog asks and the user pastes the PIN. A `pin` that is not exactly six digits, or on a non-BLE address, is ignored and pairing asks as usual. Desktop shows the PIN but leaves pairing to the OS. Example QR payload: `https://meshtastic.org/connections?address=xAA:BB:CC:DD:EE:FF&pin=123456`. |
| `/connections?address=n` | `ConnectionsRoute.Connections("n")` | Disconnects the current node instead of connecting (`n` = the internal "no device selected" sentinel), after the same confirmation. |
| `/wifi-provision` | `WifiProvisionRoute.WifiProvision(null)` | Wi-Fi provisioning screen |
| `/wifi-provision?address={mac}` | `WifiProvisionRoute.WifiProvision(mac)` | Provisioning targeting a specific node MAC |
| `/settings` | `SettingsRoute.Settings(null)` | Settings root |
| `/settings/{page}` | e.g. `SettingsRoute.LoRa` | A settings screen by slug (`lora`, `mqtt`, `security`, `about`, ...); the full list is `settingsSubRoutes` |
| `/settings/{destNum}` | `SettingsRoute.Settings(destNum)` | Settings for a remote node. A settings path can take a leading `{destNum}` to target a remote node, as in `/settings/{destNum}/{page}`; without it the path opens the connected node's settings |
| `/settings/helpDocs` | `SettingsRoute.HelpDocs` | Docs browser |
| `/settings/helpDocs/{pageId}` | `SettingsRoute.HelpDocPage(pageId)` | Specific doc page |
| `/settings/help-docs` | `SettingsRoute.HelpDocs` | Compatibility alias |
| `/discovery` | `DiscoveryRoute.DiscoveryGraph` | Local Mesh Discovery entry point |
| `/settings/local-mesh-discovery` | `DiscoveryRoute.DiscoveryGraph` | Local Mesh Discovery under the settings root |
| `/settings/local-mesh-discovery/session/{sessionId}` | `DiscoveryRoute.DiscoverySummary(sessionId)` | Discovery session result |
| `/nodes` | `NodesRoute.Nodes` | Node list |
| `/nodes/{destNum}` | `NodesRoute.NodeDetail(destNum)` | Node detail; `/nodes?destNum={destNum}` also works |
| `/nodes/{destNum}/{metric}` | e.g. `NodeDetailRoute.DeviceMetrics(destNum)` | Specific node metric tab (`device-metrics`, `map` or `position`, `environment`, `signal`, `power`, `traceroute`, `host-metrics`, `pax`, `neighbors`), from `nodeDetailSubRoutes` |
| `/messages` | `ContactsRoute.Contacts` | Conversation list |
| `/messages/{contactKey}` | `ContactsRoute.Messages(contactKey)` | Specific conversation; `?message={text}` prefills the composer, and `/messages?contactKey={contactKey}` also works |
| `/share` | `ContactsRoute.Share("")` | Share-to-contact composer, empty |
| `/share?message={text}` | `ContactsRoute.Share(message)` | Share-to-contact composer |
| `/quickchat` | `ContactsRoute.QuickChat` | Quick chat picker |
| `/map` | `MapRoute.Map(null)` | Map view |
| `/map/{waypointId}` | `MapRoute.Map(waypointId)` | Map centered on a waypoint; `/map?waypointId={waypointId}` also works |
| `/channels` | `ChannelsRoute.Channels` | Channel list |
| `/firmware` | `FirmwareRoute.FirmwareGraph` | Firmware screen |
| `/firmware/update` | `FirmwareRoute.FirmwareUpdate` | Firmware update flow |

Demo Mode's addresses start with `m`. In a debug build, or in an Android release build once hidden features are unlocked, `/connections?address=m` connects to the demo mesh and `/connections?address=mshowcase` to the store-screenshot mesh, which the device picker never lists. `MockScenario` in `:core:network` holds both.

### Backstack synthesis

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

## Adding a deep link

1. Define the typed route in `Routes.kt`.
2. Add the mapping in `DeepLinkRouter.settingsSubRoutes` (or `nodeDetailSubRoutes` for a node metric), and a
   matcher in `DeepLinkRouter.matchers` if the path shape is new.
3. For a new top-level segment, add it to `topLevelPathSegments` and its `android:pathPrefix` to the manifest.
4. Add a test in `DeepLinkRouterTest.kt`.
5. Register the navigation entry in the appropriate feature module.
6. Update the illustrative KDoc list on the `DeepLinkRouter` object (the class-level doc comment, not `route()`'s own KDoc) and the preceding table — both are quick-reference snapshots, not the source of truth. See the Source of Truth list earlier in this page for the authoritative places.

## Navigation entry registration

Each feature module provides entries via an extension function, as `feature:docs` does:

```kotlin
fun EntryProviderScope<NavKey>.docsEntries(backStack: NavBackStack<NavKey>) {
    entry<SettingsRoute.HelpDocs>(metadata = { ListDetailSceneStrategy.listPane() }) {
        val hasDetailSelected = remember(backStack) { backStack.any { it is SettingsRoute.HelpDocPage } }
        val chirpy = rememberChirpyState(backStack = backStack, currentPageId = null, showFab = !hasDetailSelected)
        DocsHelpScreen(backStack = backStack, chirpy = chirpy)
    }

    entry<SettingsRoute.HelpDocPage>(metadata = { ListDetailSceneStrategy.detailPane() }) { route ->
        val chirpy = rememberChirpyState(backStack = backStack, currentPageId = route.pageId, showFab = true)
        DocsPageScreen(pageId = route.pageId, backStack = backStack, chirpy = chirpy)
    }
}
```

The apps call every feature's entries function from one place: the `entryProvider<NavKey> { }` block in
`androidApp`'s `Main.kt`, and `desktopNavGraph` in `desktopApp`'s `DesktopNavigation.kt`.

## Testing

Deep link routing is tested in:
```text
core/navigation/src/commonTest/kotlin/org/meshtastic/core/navigation/DeepLinkRouterTest.kt
```
