---
title: Map & Waypoints
parent: User Guide
sidebar_position: 6
---

# Map & Waypoints

The Map tab shows all nodes that have shared a position, overlaid on an Apple Maps base layer.

## Node Pins

Each node that has reported a GPS position appears as a colored circle pin on the map. The **green solid line** shows a directly connected node; **orange dashed lines** show nodes reached via the mesh. A purple star marks a waypoint. Tap a pin to see the node name, last heard time, signal info, and a shortcut to send a direct message.

Pins update automatically when a new position packet is received from the mesh.

## Filtering Nodes on the Map

Tap the **filter button** (funnel icon, `line.3.horizontal.decrease.circle`) in the bottom-right toolbar to open the Map Filters sheet. When any filter is active, the icon appears **filled** to indicate filtering is in effect.

| Filter | Description |
|--------|-------------|
| Via LoRa | Show only nodes heard directly over LoRa radio |
| Via MQTT | Show only nodes bridged through MQTT |
| Online | Show only nodes heard within the last 2 hours |
| Encrypted | Show only nodes using PKI encryption |
| Favorites | Show only nodes you have starred as favorites |
| Distance | Limit to nodes within a chosen radius of your current location |
| Hops Away | Slider from **All** to **7** — restricts by hop count (0 = direct only) |
| Roles | Filter by one or more device roles (e.g. Router, Client, Repeater) |

> **Tip — Checking LoRa range**
> Enable the **Via LoRa** filter and disable **Via MQTT** to see only nodes reachable directly over radio, which is useful for assessing whether a direct LoRa link is feasible.

## Map Layers

Tap the layer icon (top-right) to switch between:

| Layer | Description |
|-------|-------------|
| Standard | Default Apple Maps street/satellite hybrid |
| Satellite | Aerial imagery |
| GeoJSON Overlays | Custom map layers loaded from `.geojson` files in the app's file storage |

## Map Options

Tap the **info button** (`info.circle`) in the bottom-right toolbar to open the Map Options sheet. Alongside the base layer picker it offers:

| Option | Description |
|--------|-------------|
| Waypoints | Show or hide waypoint markers on the map |
| Precise Locations Only | Hide nodes that broadcast an approximate (reduced-precision) location. Imprecise nodes are normally drawn with a translucent circle showing how large the possible area is; turn this on to show only nodes reporting an exact position. Both the imprecise pins and their precision circles are hidden. |
| Convex Hull | Draw an outline around the outermost LoRa nodes to visualize mesh coverage |
| Traffic | Show Apple Maps live traffic |
| Points of Interest | Show Apple Maps points of interest |

## Waypoints

Waypoints are named points of interest you can share across the mesh.

### Creating a Waypoint

1. Long press anywhere on the map.
2. Enter a name, optional description, and lock icon (to limit editing to the creator).
3. Tap **Save** — the waypoint broadcasts to all nodes on the primary channel.

### Editing a Waypoint

Tap an existing waypoint pin, then tap **Edit**. Changes broadcast to the mesh immediately.

### Deleting a Waypoint

Tap the waypoint, then tap **Delete**. The deletion broadcasts to all nodes.

### Geofences

A geofence turns a waypoint into a watched area: when a node's reported position crosses into or out of it, your device raises a local notification. Open a waypoint, tap **Edit**, and use the **Geofence** section.

| Control | Description |
|---------|-------------|
| Radius | A circular geofence centered on the waypoint, from 0.1 to 10 miles. Choose **Off** for no circle. |
| Bounding Box | A rectangular geofence. Tap **Set Bounding Box** to draw one on the map, **Edit Bounding Box** to adjust it, or **Remove Bounding Box** to clear it. |

You can use a radius, a bounding box, or both — a node counts as inside if it falls within *either* shape.

Once a radius or bounding box is set, notification options appear:

| Option | Description |
|--------|-------------|
| Notify on Enter | Alert when a node moves into the geofence. |
| Notify on Exit | Alert when a node leaves the geofence. |
| Favorites Only | Shown when Enter or Exit is on. Limits alerts to nodes you have starred as favorites. |

> **Note**
> Geofences are evaluated on your own device as position packets arrive from the mesh, so alerts reflect what your radio has heard rather than live tracking. Tapping an alert opens the waypoint on the map. **Favorites Only** uses the favorite status set on *this* device, so each receiver decides which nodes are worth an alert.

## Trace Routes on the Map

A trace route can be drawn on the map to show the path a packet took through the mesh. Open **Settings → Logging → Trace Routes** (or a node's Trace Route log), select a route, and tap **Show on Map**.

### Reading the Route

- **Colored legs** — each hop is colored by its signal quality (SNR), using the same scale as the LoRa signal meter: **green** (good), **yellow** (fair), **orange** (bad), **red** (none).
- **Solid vs. dashed** — the **solid** line is the outbound path toward the target; the **dashed** line is the return path back to the originator.
- **Arrows** — chevrons along each line point in the direction of travel.
- **Endpoints** — a **green** marker is the originator; a **red** marker is the target.

### 3D Flyover

Tap **▶** in the route banner for a guided 3D flythrough over satellite imagery: it flies the outbound path, lands at the target, then flies the return path and eases back to the map. Tap the **speed control** to cycle the pace from 1× up to 5× (1×, 1.5×, 2×, 2.5×, 3×, 4×, 5×) — adjustable mid-flight — and **■** to stop.

Tap the **legend** button (map icon, bottom-right) for a key to the colors and markers.

## Node Trail

When a node has reported multiple positions over time, a trail line connects the historical positions on the map, showing the node's path.

## Your Location

Your current GPS position appears as a blue dot (standard iOS location indicator). Enable position broadcasting in **Settings → Position** to share your location with the mesh.
