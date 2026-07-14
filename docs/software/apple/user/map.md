---
title: Map & Waypoints
parent: User Guide
sidebar_position: 6
---

# Map & Waypoints

The Map tab shows all nodes that have shared a position, overlaid on an Apple Maps base layer.

## Node Pins

Each node that has reported a GPS position appears as a coloured circle pin on the map. The **green solid line** shows a directly connected node; **orange dashed lines** show nodes reached via the mesh. A purple star marks a waypoint. Tap a pin to see the node name, last heard time, signal info, and a shortcut to send a direct message.

Pins update automatically when a new position packet is received from the mesh.

## Filtering Nodes on the Map

Tap the **filter button** (funnel icon, `line.3.horizontal.decrease.circle`) in the bottom-right toolbar to open the Map Filters sheet. When any filter is active, the icon appears **filled** to indicate filtering is in effect.

| Filter | Description |
|--------|-------------|
| Via LoRa | Show only nodes heard directly over LoRa radio |
| Via MQTT | Show only nodes bridged through MQTT |
| Online | Show only nodes heard within the last 2 hours |
| Encrypted | Show only nodes using PKI encryption |
| Favorites | Show only nodes you have starred as favourites |
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

## Node Trail

When a node has reported multiple positions over time, a trail line connects the historical positions on the map, showing the node's path.

## Your Location

Your current GPS position appears as a blue dot (standard iOS location indicator). Enable position broadcasting in **Settings → Position** to share your location with the mesh.
