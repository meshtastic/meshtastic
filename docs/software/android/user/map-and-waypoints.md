---
title: Map & Waypoints
sidebar_position: 6
last_updated: 2026-09-11
description: View node positions on the map, create and share waypoints, manage map layers and Site Planner, and control position sharing and privacy.
parent: User Guide
---

# Map & Waypoints

The Map screen shows the geographic positions of nodes on your mesh, along with shared waypoints.

## Map View

The map displays:
- **Node positions** — colored markers for each node reporting location
- **Waypoints** — shared points of interest
- **Your position** — your current GPS location

### Node Markers

Each node that reports a position is shown as a **node chip** marker displaying the node's short name. The chip is colored by the node's own identity color (a stable color derived from its node number) — the same chip used in the node list, so a node looks the same everywhere. Marker color does **not** encode online/offline status. When a node's position updates live, its marker briefly pulses. Nearby markers are clustered as you zoom out.

### Map Controls

- **Zoom** — pinch or use +/- buttons
- **Pan** — drag to explore
- **Center** — tap the location button to center on your position
- **Node tap** — tap a node marker to view details

The floating toolbar provides quick access to the compass, the map type and layers pickers, node filters, Site Planner, and location tracking. Tap the compass to reorient north-up, or tap the location button to center on your current position. On **Google Play** builds a refresh button joins them while a network layer is showing; on **F-Droid** and **Desktop**, refresh a network layer from its own row in the layers sheet instead.

![Map floating toolbar with compass, filter, refresh, and location controls](/img/android/docs/map_controls_overlay.webp)

### Filtering the Map

Tap the filter button in the floating toolbar to open **Filter map**. **Display** controls what is drawn: **Only Favorites**, **Show Waypoints**, **Show Precision Circles**, and a slider that hides nodes not heard from recently. **Node roles** is a chip per device role, plus **All** to show every role; a selected chip means that role is shown. **Nodes** narrows the set further with **Hide offline nodes**, **Only show direct nodes**, **Signed only**, **Encrypted only**, **Exclude MQTT**, **Show ignored nodes**, and **Include unknown** — the same rules as the node list's [filter toggles](nodes.md).

A dot on the filter button means at least one filter is hiding something — check it before concluding the mesh is quiet. Turning **Show Waypoints** off hides every waypoint, including your own. **Show ignored nodes** adds them to the map rather than showing only them — unlike the node list's **Only show ignored Nodes**.

## Waypoints

Waypoints are shared points of interest, visible to everyone on your mesh.

### Creating a Waypoint

Your radio must be connected — the map ignores a touch & hold while it is not, because saving a waypoint means broadcasting it.

1. Touch & hold the map at the desired location.
2. Enter a name and optional description.
3. Choose an icon/emoji for the waypoint.
4. Tap **Send** to share with the mesh.

Waypoints always broadcast to the whole mesh on the primary channel. Unlike a message, a waypoint cannot be addressed to one channel or sent as a direct message.

### Waypoint Properties

| Property | Description |
|----------|-------------|
| Name | Short identifier (max 29 characters) |
| Description | Optional longer description |
| Icon | Visual marker emoji on the map |
| Locked | If locked, only the creator can edit or delete |
| Expiration | Optional auto-remove date and time |
| Geofence | Optional enter/exit alert area — see [Waypoint Geofences](#waypoint-geofences) |

### Waypoint Expiration

Waypoints can be set to expire automatically:
- **Never** (default) — waypoint remains until manually deleted
- **Timed** — pick a specific date and time; the waypoint is automatically removed once that time passes. Useful for temporary markers like rally points, hazards, or meeting locations.

Expired waypoints are automatically hidden from the map so they don't clutter the display. The expiration countdown is based on the absolute time you picked, not a duration from when the waypoint was created or received.

### Waypoint Geofences

Any waypoint can also define a **geofence** — an alert area — so you or others get notified when a node enters or leaves it:

1. Set a **geofence radius** from the preset chips (or **Off** to disable), or tap **Set area on map** to draw a custom rectangular area instead.
2. Once a region is set, toggle **Notify on enter** and/or **Notify on exit**.
3. Optionally enable **Favorites only** to limit alerts to your favorited nodes.

Since waypoints (and their geofences) are broadcast to the whole mesh, only the **creator** is alerted by default. If someone else shares a geofenced waypoint with you, its detail view offers a **Notify me of crossings** opt-in so you can also receive enter/exit alerts for it.

### Managing Waypoints

- Tap a waypoint to see its name, description, and geofence radius. On **Google Play** builds the first tap opens the marker's info bubble — tap the bubble to open the waypoint itself
- **Locked waypoints** can only be changed on the mesh by the node that locked them
- Unlocked waypoints can be edited by any mesh member while connected to a radio — saving re-broadcasts the waypoint
- Confirming a delete removes your own copy. To remove it from everyone else's map too, select **Delete for everyone** in the delete dialog; that box appears only for a waypoint you may change (unlocked, or locked by you) and only while you are connected

## Map Layers

Tap the layers icon on the map to open **Manage Map Layers**. It imports your own overlays in `.kml`, `.kmz`, or GeoJSON format — including KMZ ground overlays (georeferenced images, such as exported topo or aerial tiles), which drape at their stated bounds. Add one by picking a file with **Add Layer**, opening a file with Meshtastic, or sharing it into the app from another app. **Add Network Layer** instead takes a name and an `http://` or `https://` URL pointing at a KML or GeoJSON file; that layer then carries its own refresh button in the sheet. On **Google Play** builds the toolbar's refresh button re-fetches every visible network layer at once.

Imported layers are listed with a toggle to show/hide each one and an option to remove it. Each layer — imported or built-in overlay — carries its own opacity slider while it is switched on, so an overlay can be faded back rather than only switched off. This works on the Google Play build, the F-Droid build, and **Desktop**, which shares the same layer store and file picker.

### Site Planner

**Site Planner** estimates RF coverage for a transmitter and draws it on the map as a color-coded overlay. Open it from a map control, or from a node's detail page via **Estimate coverage** (shown only for nodes with a known position). Configure the transmitter (location, frequency, TX power, antenna gain and height), the receiver (sensitivity, height), and simulation options (max range, high-resolution terrain, color palette), then run the estimate. Like map layers, Site Planner works on both the Google Play and F-Droid builds, where the finished estimate is drawn on the map as a coverage overlay. On **Desktop** the same form is shown but the planner opens in your browser; to bring the estimate onto the map, click the transmitter pin in the browser, choose the planner's GeoJSON export, then add the downloaded file under **Manage Map Layers** with **Add Layer**. Use the GeoJSON export, not the KML one — the KML is a ground-overlay image this map cannot draw.

## Position Sharing

### Enabling Position Sharing

Your node shares its GPS position based on:
- **Broadcast Interval** — share the position on a fixed timer
- **Smart Position** — share only once you have moved far enough; **Smart Interval** sets the shortest gap between broadcasts and **Smart Distance** how far you must move
- **Fixed Position** — publish a latitude, longitude, and altitude you enter by hand instead of the GPS reading
- **GPS Mode (Physical Hardware)** — GPS enabled, disabled, or not present on this hardware; offered only while **Fixed Position** is off

Configure position behavior in **Settings → Device configuration → Position**. The screen is only reachable while your radio is connected, and saving it reboots the radio. For the full field list, see [Settings — Radio & User](settings-radio-user.md).

### Privacy Considerations

> 🔒 **Privacy:** Position data is broadcast to all nodes on your channel. If you don't want your location shared, disable GPS position in settings or use a fixed/fake position. To keep sharing a position without pinpointing yourself, edit the channel in **Settings → Channels**, turn **Precise location** off, and set the slider beneath it — the channel then publishes an approximate area, shown as ± a distance, instead of an exact point.

## Map Sources

Every build offers a base map picker from the map toolbar. **Google Play** builds open on Google's own
map types; **F-Droid** and **Desktop** builds open on MapLibre's vector styles. Further down the base map
picker, all three offer the same raster base maps:

| Base map | Notes |
| --- | --- |
| Normal / Satellite / Terrain / Hybrid | Google Play only — Google's own map types |
| Liberty | Default on F-Droid and Desktop. Vector street map |
| Positron | F-Droid and Desktop only. Low-contrast vector map; keeps node markers legible over it |
| Dark | F-Droid and Desktop only. Vector map suited to dark themes |
| OpenStreetMap | Classic raster street tiles |
| OpenTopoMap | Raster topographic |
| USGS Topo / USGS Imagery | US coverage only |
| Esri Topo / Esri Imagery | Topographic and satellite imagery |

Overlays can be toggled on top of any base map, from the layers sheet:

- **Weather radar** — NOAA NEXRAD reflectivity (US coverage)
- **Hillshade** — terrain relief from an online tile source, on **F-Droid** and **Desktop** only; Google
  Play draws hillshade from downloaded offline terrain instead. Useful for understanding why a link
  fails, since LoRa range is limited by terrain

### Adding your own tile source

Any XYZ tile endpoint can be added as a base map, on every flavor and on desktop. Open **Manage Custom
Tile Sources** at the foot of the base map picker and paste a URL template using `{z}`, `{x}` and `{y}`
— plus `{s}` if the provider uses rotating subdomains. A national mapping service, for example:

```text
https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg
```

Tiles are cached on disk, so panning does not re-download what you were just looking at.

On **Android**, the same screen also imports a local `.mbtiles` archive for fully offline use.

On **F-Droid**, select a vector base map first — Liberty, Positron, or Dark — since a download is defined
against a vector style and **Start Download** stays disabled over a raster one. Frame the area you want on
screen, then tap **Start Download** in the layers sheet: that creates a paused pack covering the current zoom
plus two levels deeper. Press play on the pack's row to actually download it.

On **Google Play**, the layers sheet's **Offline Manager** section downloads its own offline regions instead
— water, roads and administrative boundaries extracted from the public Protomaps basemap dataset, drawn
directly as map shapes rather than raster tiles. Frame the area you want, tap **Start Download**, and once
it finishes flip **Show on map** to draw it (it's off by default so it never surprises you by covering up the
live map). You can still import a pre-made `.mbtiles` archive here too, as before. **Desktop** has neither, though
the offline terrain described next does work there.

### Offline terrain

Hillshade and elevation contours can be downloaded for offline use as well, so a downloaded area still
shows why a link fails when there is no network. The terrain data comes from Mapterhorn and is credited on
the map. On **Google Play**, each downloaded region in the **Offline Manager** list has a **Download Terrain**
button and **Hillshade** and **Contours** switches; terrain attaches to that region and shares its storage limit, and an area
too large for terrain asks you to zoom in or pick a smaller region. On **F-Droid** and **Desktop**, the
layers sheet has an **Offline Terrain** section of its own: frame the area, tap **Start Download**, and the
hillshade and contours draw from the downloaded tiles from then on.

### Going offline

An **Offline** pill appears over the map whenever the device has no network connection. On **Google Play**
builds, if you've imported a local `.mbtiles` archive, the map switches to it automatically the moment the
network drops — no toggle to remember — and switches back once you're reconnected, as long as you haven't
picked a different base map yourself in between. On **F-Droid**, a downloaded offline area keeps rendering on
its own; the pill is purely informational there. **Desktop** downloads offline terrain but no base-map
packs, so the pill is informational there too.

## Related Topics

- [Nodes](nodes.md) — view and filter your node list
- [Node Metrics](node-metrics.md) — signal quality and position history for individual nodes
- [Local Mesh Discovery](discovery.md) — traceroute and neighbor info for understanding mesh topology
- [Units & Locale](units-and-locale.md) — distance and coordinate display formats
