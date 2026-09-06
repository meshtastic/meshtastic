---
title: Map & Waypoints
sidebar_position: 6
last_updated: 2026-07-08
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
- **Center** — select the location button to center on your position
- **Node tap** — tap a node marker to view details

The floating toolbar provides quick access to compass, layer switching, node filters, refresh, and location tracking. Tap the compass to reorient north-up, or tap the location button to center on your current position.

![Map controls overlay](/img/android/docs/map_controls_overlay.webp)

## Waypoints

Waypoints are shared geographic points of interest that all mesh members can see.

### Creating a Waypoint

1. Long-press on the map at the desired location.
2. Enter a name and optional description.
3. Choose an icon/emoji for the waypoint.
4. Tap **Send** to share with the mesh.

Waypoints are addressed like messages: by default they broadcast on the primary channel, but a waypoint can also be sent on a specific channel or as a direct message to a single node.

### Waypoint Properties

| Property | Description |
|----------|-------------|
| Name | Short identifier (max 29 characters) |
| Description | Optional longer description |
| Icon | Visual marker emoji on the map |
| Locked | If locked, only the creator can edit or delete |
| Expiration | Optional auto-remove date and time |
| Geofence | Optional enter/exit alert area — see below |

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

Since waypoints (and their geofences) are broadcast to the whole mesh, only the **creator** is alerted by default. If someone else shares a geofenced waypoint with you, its detail view offers a **"Notify me of crossings"** opt-in so you can also receive enter/exit alerts for it.

### Managing Waypoints

- Tap a waypoint on the map to view its details and coordinates
- Edit or delete waypoints you created
- **Locked waypoints** cannot be modified or deleted by other nodes — only the original creator can change them
- Unlocked waypoints can be edited by any mesh member

## Map Layers

Tap the layers icon on the map to open **Manage Map Layers**, where you can import your own overlays in `.kml`, `.kmz`, or GeoJSON format — either by opening a file with Meshtastic or sharing it into the app from another app. Imported layers are listed with a toggle to show/hide each one and an option to remove it. This is available on both the Google Play and F-Droid builds.

### Site Planner

**Site Planner** estimates RF coverage for a transmitter and draws it on the map as a color-coded overlay. Open it from a map control, or from a node's detail page via **Estimate coverage** (shown only for nodes with a known position). Configure the transmitter (location, frequency, TX power, antenna gain and height), the receiver (sensitivity, height), and simulation options (max range, high-resolution terrain, color palette), then run the estimate. Like map layers, Site Planner works on both the Google Play and F-Droid builds.

## Position Sharing

### Enabling Position Sharing

Your node shares its GPS position based on:
- **Fixed interval** — broadcast position at regular intervals
- **Smart position** — broadcast when movement exceeds a threshold
- **Manual** — only share when explicitly requested

Configure position behavior in **Settings → Position**.

### Privacy Considerations

> 🔒 **Privacy:** Position data is broadcast to all nodes on your channel. If you don't want your location shared, disable GPS position in settings or use a fixed/fake position.

## Map Sources

The base map depends on your app flavor: **Google Play** builds use Google Maps, while **F-Droid** and Desktop builds use OpenStreetMap. On top of the base map, additional tile sources are available as overlays or alternatives:
- Satellite imagery (where available)
- Offline tiles (download map areas for offline use)

## Related Topics

- [Nodes](nodes.md) — view and filter your node list
- [Node Metrics](node-metrics.md) — signal quality and position history for individual nodes
- [Discovery](discovery.md) — traceroute and neighbor info for understanding mesh topology
- [Units & Locale](units-and-locale.md) — distance and coordinate display formats

---

