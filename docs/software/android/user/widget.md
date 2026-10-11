---
title: Home Screen Widget
sidebar_position: 20
last_updated: 2026-08-30
description: Add the Meshtastic home screen widget to glance at your connected radio's local stats without opening the app.
parent: User Guide
---

# Home Screen Widget

On Android, Meshtastic provides a home screen **widget** that shows live local statistics from your connected radio at a glance — no need to open the app.

## What It Shows

The widget displays the **connected radio's** current local stats:

- A **node chip** across the top, carrying the radio's short name in its own colors
- **Battery** — the radio's battery level, or *Powered* when running on external power
- **ChUtil** — channel utilization (how busy the LoRa channel is, as a percentage)
- **AirUtil** — airtime utilization (how much of the duty cycle your radio is transmitting)
- **Traffic** — packets transmitted / received, and duplicates seen
- **Relays** — packets relayed and relay cancellations (shown when the radio is relaying)
- **Diagnostics** — a combined line carrying **Noise** (the background noise level in dBm), **Bad** (corrupt packets received), and **Dropped** (packets the radio discarded). Bad and Dropped appear only once they are above zero, so a quiet radio may show the noise reading alone
- **Heap** — free versus total memory on the radio, drawn as a bar
- **Nodes** — how many nodes are online, out of the total known
- **Uptime** — how long the radio has been running since its last reboot, shown beside Nodes
- **Updated** — the time the stats last refreshed, along the foot of the widget

Tap the widget to open the app, or use its refresh control to request fresh stats.

> ℹ️ **Note:** The values reflect the connected radio. If the radio disconnects, the widget replaces the stats with a status line — **Disconnected**, **Connecting**, or **Device sleeping**. It does not keep the last-known numbers on screen.

## Adding the Widget

1. Touch & hold an empty area of your Android home screen.
2. Tap **Widgets**.
3. Drag the **Meshtastic** widget to your home screen. The app ships one widget, so the picker entry is just the app name.
4. Resize it as needed — the layout adapts to the available space.

> ℹ️ **Note:** The widget is Android-only. It is not available on the Desktop or iOS builds.

## Related Topics

- [Node Metrics](node-metrics.md) — the full Signal Quality and Local Stats history inside the app
- [Connections](connections.md) — connect to a radio so the widget has stats to show
- [Local Mesh Discovery](discovery.md) — channel and airtime utilization across the mesh
