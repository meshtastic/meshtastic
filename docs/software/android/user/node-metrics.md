---
title: Node Metrics
sidebar_position: 5
last_updated: 2026-09-09
description: Telemetry dashboards for each mesh node — device health, environment sensors, air quality, signal quality, power, traceroute, and position history.
parent: User Guide
---

# Node Metrics

The node detail screen provides comprehensive telemetry and metrics for each node on your mesh.

## Viewing Metrics

1. Navigate to **Nodes**.
2. Tap the node you want to inspect.
3. Scroll to the **Telemetry** section and find the category you want — **Signal Quality**, **Device Metrics**, **Environment Metrics**, **Air-Quality Metrics**, **Power Metrics**, **Position**, and the rest.
4. Tap the refresh button on a row to ask the node for a fresh reading. The chart button beside it opens that category's history, and appears once the node has reported that kind of telemetry.

![Node detail — local device](/img/android/docs/nodes_detail_local.webp)

The **Position** row expands to show location data for nodes that share GPS:

![Position inline content](/img/android/docs/nodes_position.webp)

> ℹ️ **Note:** Metrics are only available when they have been reported by the remote node. Metrics update at intervals configured on each node's telemetry settings.

## Device Metrics

Basic operating information reported by each node:

| Metric | Description |
|--------|-------------|
| Battery Level | Current battery percentage |
| Voltage | Battery voltage reading |
| ChUtil | Percentage of local airtime in use |
| AirUtil | Percentage of the last hour this node spent transmitting |
| Uptime | Time since last reboot |

Device Metrics has no cards on the node detail screen. Use the chart button on its row to open the Device Metrics screen, where battery level, voltage, ChUtil, and AirUtil are plotted over time and every reading — uptime included — is listed with its timestamp underneath. Pick a time frame at the top of the screen, and use the save icon in the app bar to export the visible history as CSV.

> 💡 **Tip:** Where a category does show cards — Environment, Air Quality, and Power — touch & hold a card to copy its value to the clipboard. On a chart screen, pinch to zoom the time axis.

## Environment Metrics

Environmental sensor data (requires compatible hardware):

| Metric | Sensor Examples |
|--------|-----------------|
| Temperature | BME280, BME680, SHT31 |
| Humidity | BME280, BME680, SHT31 |
| Barometric Pressure | BME280, BMP280 |
| Gas Resistance | BME680 |
| IAQ (Air Quality) | BME680 |

Environment metrics are charted over time — temperature, humidity, and pressure each get their own line chart with the measurement unit displayed on the Y axis.

The BME680 **IAQ (Indoor Air Quality)** index is a single 0–500+ value derived from gas resistance, shown against a color-coded scale from *Excellent* to *Dangerously Polluted*:

![IAQ index scale from Excellent to Dangerously Polluted](/img/android/docs/node-metrics_iaq_scale.webp)

> 💡 **Tip:** Environment metrics require a sensor connected to the remote node. Not all nodes report environmental data. See [Telemetry & Sensors](telemetry-and-sensors.md) for a full list of supported sensors.

## Air Quality Metrics

Air Quality is a dedicated metrics view for nodes equipped with a particulate-matter and/or CO₂ sensor. It is **separate from the BME680 IAQ reading** listed under Environment Metrics — IAQ is a single gas-resistance-derived index, while the Air Quality view charts the underlying particulate and CO₂ measurements.

| Metric | Unit | Description |
|--------|------|-------------|
| PM1.0 | µg/m³ | Particulate matter up to 1.0 micron |
| PM2.5 | µg/m³ | Particulate matter up to 2.5 microns |
| PM10 | µg/m³ | Particulate matter up to 10 microns |
| AQI | EPA index | EPA **NowCast** AQI computed from the node's recent PM2.5 history, with a color-coded severity label. Shown next to PM2.5 once enough readings have accumulated. |
| CO₂ | ppm | Carbon dioxide concentration |
| CO₂ temperature | °C / °F | Temperature reported by the CO₂ sensor itself (e.g. SCD4x) |
| CO₂ humidity | % | Relative humidity reported by the CO₂ sensor |

CO₂ readings are color-coded by severity so you can read air quality at a glance:

| Band | CO₂ Range (ppm) | Color |
|------|-----------------|-------|
| Good | < 1000 | Green |
| Stuffy | < 2000 | Amber |
| Poor | < 5000 | Orange |
| Unsafe | < 30000 | Red |
| Evacuate | ≥ 30000 | Dark red |

![Air quality readings with color-coded CO₂ severity](/img/android/docs/node-metrics_air_quality.webp)

An air-quality log/metrics button appears on the node detail screen **only when the node has reported air-quality telemetry**. From the Air Quality view you can:

- Select a **time frame** for the charts.
- Filter with **metric chips** — only metrics that have data are shown.
- **Refresh / request** the latest air-quality telemetry.
- **Export to CSV** for analysis in a spreadsheet.

> 💡 **Tip:** Air Quality metrics require a compatible air-quality sensor on the remote node. See [Telemetry & Sensors](telemetry-and-sensors.md) for supported hardware.

## Signal Quality

Radio signal quality information:

| Metric | Description |
|--------|-------------|
| SNR | Signal-to-Noise Ratio (higher is better) |
| RSSI | Received Signal Strength Indicator (closer to 0 is better) |
| Noise Floor | Local background RF noise in dBm (more negative is quieter) |
| Hop Count | Number of mesh hops for last message |

### Signal Quality Reference

Signal quality is rated from **SNR relative to the active LoRa modem preset's demodulation floor**, not from fixed thresholds — a given SNR means different things on different presets (e.g. −15 dB is fine on LongSlow but unusable on ShortFast). When RSSI and a noise-floor reading are both available, the app also rates their difference against the preset limit and uses the worse rating. Otherwise, RSSI is display-only. In the table, *limit* is the preset's SNR limit.

| Quality | Criteria |
|---------|----------|
| Good | SNR above the preset's limit |
| Fair | less than 5.5 dB below the limit |
| Bad | 5.5 dB to 7.5 dB below the limit |
| None | more than 7.5 dB below the limit |

See [Understanding the Signal Meter](signal-meter.md) for the full explanation.

Local Stats from your connected radio are also shown in Signal Quality when available. These logs include noise floor, traffic counters, relay counters, online node counts, and radio uptime. The noise floor chart uses a dashed reference line at -85 dBm to help identify a busy RF environment.

- **Request** — ask the connected radio for a fresh Local Stats telemetry report
- **Clear** — remove Local Stats logs for that node
- **Save** — export the visible Local Stats history as CSV

## Power Metrics

Power management telemetry (requires INA sensor or compatible hardware):

| Metric | Description |
|--------|-------------|
| Voltage | Per-channel voltage reading |
| Current | Per-channel draw, in milliamps |

The node detail screen shows cards for channels 1 to 3. Use the chart button on the **Power Metrics** row to open the chart screen, which lists a chip for every channel that reported data — up to eight — and charts the one you select. Use the label field under the chips to give a channel a name of your own, such as Solar or Battery. The app does not derive a wattage figure from voltage and current.

## Traceroute

Traceroute shows the path a message takes through the mesh:

1. From the node detail screen's **Telemetry** section, tap the refresh button on the **Traceroute** row. You cannot traceroute your own node, and the button accepts one request every 30 seconds.
2. The app sends a traceroute request to the target node.
3. Results show each hop with its SNR.

### Reading Traceroute Results

A traceroute is a round trip, so each saved result carries a hop count in each direction — **Forward Hops** and **Return Hops** — and the **Round Trip** time in seconds. A result marked **Direct** reached the target with no relay in between. Tap a result to read the route traced toward the destination and the route traced back to you, with the SNR of every hop. On Android that view offers **View on map**, which draws the same path, as long as the start and destination nodes have both shared a position.

A result marked **No Response** means the target never answered. It may be out of range, asleep, or configured not to reply. Wait for the 30-second cooldown to clear and try again; if it keeps failing, send a direct message first to confirm the node is reachable at all.

## Position Log

Historical position data for nodes that share their location:
- GPS coordinates
- Altitude
- Speed (if moving)
- Timestamp for each position report

## Neighbor Info

Shows which nodes a given node can directly hear, useful for understanding mesh topology.

## Host Metrics

Nodes that run Meshtastic on a Linux host, such as a Raspberry Pi, report the host's own health — free memory, free disk space, one-, five-, and fifteen-minute load averages, and how long the host has been up. The **Host Metrics** row is always listed; its chart button appears once a node has reported them.

## PAX Metrics

A node running the PAX counter module reports how many Wi-Fi and Bluetooth devices it saw nearby, as a crowd-size estimate, and charts the two counts alongside their total. The **PAX Metrics** row is always listed; its chart button appears once a node has reported them. The counts are of devices, not people.

## Related Topics

- [Nodes](nodes.md) — node list, filtering, and sorting
- [Telemetry & Sensors](telemetry-and-sensors.md) — supported sensors and configuration
- [Signal Meter](signal-meter.md) — how signal quality is calculated from SNR and RSSI
- [Local Mesh Discovery](discovery.md) — traceroute details and neighbor info
- [Units & Locale](units-and-locale.md) — temperature, distance, and speed display formats
