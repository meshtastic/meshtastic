---
title: Map & Waypoints
parent: User Guide
sidebar_position: 6
---

# Map & Waypoints

The Map tab shows all nodes that have shared a position, overlaid on an Apple Maps base layer.

The map **reopens where you last left it** — your last-viewed area and zoom are remembered between launches, so you don't have to pan back after every relaunch. On a fresh install (before you've moved the map) it frames your current location, then your connected radio, then the center of your nodes.

## Node Pins

Each node that has reported a GPS position appears as a colored circle pin on the map. The **green solid line** shows a directly connected node; **orange dashed lines** show nodes reached via the mesh. A purple star marks a waypoint. Tap a pin to see the node name, last heard time, signal info, and a shortcut to send a direct message.

Pins update automatically when a new position packet is received from the mesh.

### Overlapping nodes at the same spot

When several nodes report the *same* (or nearly the same) location — for example radios sitting on one desk, or nodes broadcasting a reduced-precision position — their pins stack on top of each other and can't be pulled apart by zooming. Tapping the stack (or the numbered count badge, when node clustering is on) opens a **Select a Node** list of every node at that spot. Pick one to open its detail view. This works whether or not clustering is enabled, so an occluded node is always reachable.

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
| Cluster Nodes | Group nearby nodes into one numbered pin; tap it to zoom in. Turn off to always show every node individually. |
| My Location | Show or hide your own position (the blue dot) on the map |
| Direct Links | Draw a line between nodes that hear each other directly, colored by signal quality like the signal meter, with the SNR in a small pill near the node that measured it when you zoom in. Lines from your connected radio come from nodes it heard directly (no hops, not over MQTT) in the last 12 hours. Lines between other nodes come from their Neighbor Info reports from the last day; these only arrive when your radio's Neighbor Info module is on, and reports that came over MQTT are left out. A line is solid when both directions are known and dashed when only one is, and it fades as it gets older. Both ends need a position, and node filters apply. Hidden while a trace route is shown. |
| Convex Hull | Draw an outline around the outermost LoRa nodes to visualize mesh coverage |
| Traffic | Show Apple Maps live traffic |
| Points of Interest | Show Apple Maps points of interest |

### Opening the spatial map (Apple Vision Pro)

On Apple Vision Pro, the round glass menu under the app's tab bar, at the window's left edge, opens the 3D spatial map from any tab, and the [Hardware Showcase](showcase.md). The map wheel button on the 2D map opens it too.

### Direct links on the spatial map (Apple Vision Pro)

On the 3D spatial map, the **link** button in the toolbar draws the same direct links as the 2D map, between the tops of the pins. It is off by default and has its own setting. Lines use the signal quality colors, are dashed when only one direction is known, and fade as they get older. To keep the volume smooth, at most 12 SNR pills are shown: the selected node's links when a node is selected, otherwise the newest links, your radio's first. Links are hidden while a trace route is shown.

### Offline Maps

A dedicated section of the sheet for working without a connection: a link opens the list of downloaded map regions to manage them or download new ones, and the **Offline Tiles** toggle overlays a downloaded region on the base map so it keeps rendering with no internet connection.

### Offline map for the spatial map (Apple Vision Pro)

The 3D spatial map needs elevation data to show hills and valleys, and a street map to draw on when there is no internet connection. With **Download Terrain Automatically** on (in the spatial map's map menu, on by default), the app keeps one full offline map of its own, named **Spatial Map area** in the offline map list: the Standard detail street map plus terrain for the mesh. It works like any other offline map, so it also shows on the 2D map when offline tiles are in use. Where it overlaps one of your own maps, both are drawn. The spatial map creates it the first time you open it. After that it grows while the app is open on Vision Pro, not only while the spatial map is: the app checks the mesh's area shortly after launch, after each new connection, and every five minutes while a radio is connected. A terrain-only region from an earlier version is replaced with a full one the next time the app checks. If you delete the region in Offline Maps, it comes back only the next time you open the spatial map. The area is the one the spatial map would show, around your connected radio, with the map filters left off. Your own offline map regions are never changed, and this one never blocks them: it doesn't count toward your map count or the total storage limit for your downloads. It only grows while there is room under that limit, counting your maps too. Where your maps already have streets and terrain for the whole area, nothing more is downloaded. If the street map for the area is over the per-map limit, a smaller area around the mesh is tried. If none fits, the street map you already have is kept, terrain is downloaded for the rest, and the spatial map says so. A failed download is retried later, and a cancelled one is not retried for that area. Turn the setting off to stop automatic downloads; **Download Terrain** in the spatial map's toolbar still downloads on request.

### Map Overlays

Custom GeoJSON overlays you've uploaded are listed here, each with its own toggle and file details (format, feature count, size, upload date). Swipe a file left to delete it, or tap **Upload Map Data** to add another. The section's master toggle turns uploaded overlays on the map on or off as a group.

## Coverage Estimate (Site Planner)

Estimate the radio coverage of a transmitter site without leaving the app. The app drives the hosted [Meshtastic Site Planner](https://site.meshtastic.org) — a SPLAT!/ITM propagation simulator — and imports the resulting coverage map as a styled GeoJSON overlay.

### Starting an estimate

You can open the estimate form two ways:

- **From the map** — tap the coverage button (`cellularbars`) in the bottom-right toolbar. The form is prefilled from the connected radio and located at the current map center.
- **From a node** — open a node with a known position, scroll to the **Logs** section, and tap **Estimate Coverage**. The map recenters on that node and opens the form prefilled from it.

### The estimate form

The form mirrors the Site Planner's own panels. The **Transmitter** and **Display** sections are open by default; **Receiver** and **Simulation Options** are collapsed.

| Section | Fields |
|---------|--------|
| Site / Transmitter | Site name, latitude/longitude, transmit power (W), frequency (MHz), antenna height (m), antenna gain (dBi). Location shortcuts fill the coordinates from **My Location**, the selected **Node**, or the **Map Center**. |
| Receiver | Receiver sensitivity (dBm) — the coverage threshold. |
| Simulation Options | Maximum range (km) and a high-resolution terrain toggle (which caps the range at 70 km). |
| Display | Color palette for the coverage map (Mesh, Plasma, Viridis, CMRmap, Cool, Turbo, Jet). |

**Prefill from the connected radio:** frequency is computed from the radio's region, modem preset, and channel; transmit power is converted from the device's dBm setting; and receiver sensitivity is mapped from the modem preset (for example LongFast → −139 dBm). Antenna gain and height aren't part of the device config, so they keep the planner's defaults. You can edit any value before running.

### Running it

Tap **Estimate**. A progress indicator appears while the planner computes the coverage; you can **Cancel** at any time. When it finishes, the styled coverage map is added as a map overlay (in its dBm colors), the GeoJSON overlays layer is enabled, and the map recenters on the transmitter. The imported layer is managed like any other GeoJSON overlay in **Map Options**.

A new estimate hides older estimates for the same node, so estimates for different nodes can be shown together. Estimates run from the map center or another location replace each other.

> **Note — Requires a network connection**
> The coverage simulation runs in the hosted Site Planner, so an internet connection is needed. Estimates time out after 45 seconds; on failure the flow ends cleanly without leaving a stuck spinner.

### Coverage on the spatial map (Apple Vision Pro)

On Apple Vision Pro, estimates also show on the 3D spatial map, laid over the terrain. Inside the range the planner computed, ground with no signal is shaded dark, so a ridge or valley that blocks the signal shows as a dark hole in the colors.

- **Coverage** in the map menu chooses what is shown: **Off**, **Selected Node** (the default — the selected node's estimate), or **All Estimates** in the area.
- **Coverage Opacity** sets how see-through the colors are: **Light**, **Medium**, or **Strong**.
- While coverage is shown, the toolbar shows the colors, the dBm range, and the **No signal** shade.
- The **Coverage** menu on a node's card shows or hides that node's estimate, or opens the estimate form for it in the main window.

Showing or hiding an estimate here does the same as its switch in **Map Options**.

## Waypoints

Waypoints are named points of interest you can share across the mesh.

When a node on the mesh shares a new waypoint, your device raises a notification you can tap to open it on the map. To turn that off, switch off **New Waypoints** under **Settings → Meshtastic → Notifications** in the iOS Settings app — waypoints still arrive and still appear on the map.

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

- **Forward and return** — the forward path toward the target is a **solid orange** line (short dashes where the SNR is unknown) and the return path back to the originator is a **dashed blue** line, the same colors as the Forward route and Return route headings in the hop timeline. Both have a dark edge so they stand out on the standard, satellite, hybrid and offline maps. Where both paths use the same leg, the two lines sit side by side instead of on top of each other.
- **Arrows** — chevrons along each line, in the line's color, point in the direction of travel.
- **Endpoints** — the originator and the target show the node's short name in its colored circle. The originator has a **green** ring and the target a **white** ring.
- **Hop numbers** — each relay gets a small numbered badge in the order the packet reached it, the same order as the hop timeline. Badges on the way out are filled orange with black numbers and sit above the node; badges on the way back are outlined blue and sit below it. A relay that didn't add its number, or has no known position, gets no badge.
- **Signal labels** — each leg shows its SNR (for example "7.0 dB") in a small pill colored by signal quality, on the same scale as the LoRa signal meter: **green** (good), **yellow** (fair), **orange** (bad), **red** (none). A forward leg whose SNR wasn't reported is drawn with short dashes and has no label. Labels and badges that would overlap at the current zoom are hidden until you zoom in.

### 3D Flyover

Tap **▶** in the route banner for a guided 3D flythrough over satellite imagery: it flies the outbound path, lands at the target, then flies the return path and eases back to the map. Tap the **speed control** to cycle the pace from 1× up to 5× (1×, 1.5×, 2×, 2.5×, 3×, 4×, 5×) — adjustable mid-flight — and **■** to stop.

Tap the **legend** button (map icon, bottom-right) for a key to the colors and markers.

### On the spatial map (Apple Vision Pro)

On the 3D spatial map, tap the **trace route** button in the toolbar and pick a route. The menu lists the 20 most recent trace routes that came back with node positions, newest first. Each shows the originator and target, then the hop count, whether a return path came back, and how long ago it arrived (for example "3 Hops · 2 hours ago"). A comet flies the route, orange on the way out and blue on the way back, with a short fading tail (just the head when **Reduce Motion** is on). The route stays drawn on the terrain after it lands so you can read it. Tap **✕** in the toolbar to clear it.

- **Forward and return** — the forward path toward the target is a **solid orange** line (short dashes where the SNR is unknown) and the return path back to the originator is a **dashed blue** line, the same colors as the Forward route and Return route headings in the hop timeline. Each has a dark edge so it stands out on the terrain. Where both paths use the same leg, the two lines sit side by side.
- **Arrows** — small cones along each line, a shade lighter than the line, point in the direction of travel and drift slowly along it. They stay still when **Reduce Motion** is on.
- **Endpoints** — the originator has a **green** ring at its foot and the target a **white** ring.
- **Hop numbers** — each relay gets a numbered badge beside its pin, in the order the packet reached it: filled orange on the way out, a blue ring on the way back.
- **Signal labels** — each leg shows its SNR (for example "7.0 dB") in a small pill colored by signal quality. A forward leg whose SNR wasn't reported is drawn with short dashes and has no label. Labels that would crowd each other are hidden; zoom in to see more.
- While a route is shown, the toolbar shows a key to the two line colors.

## Node Trail

When a node has reported multiple positions over time, a trail line connects the historical positions on the map, showing the node's path.

## Your Location

Your current GPS position appears as a blue dot (standard iOS location indicator). Enable position broadcasting in **Settings → Position** to share your location with the mesh.
