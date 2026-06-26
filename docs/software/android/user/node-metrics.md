---
title: Node Metrics
sidebar_position: 5
last_updated: 2026-06-25
description: Telemetry dashboards for each mesh node — device health, environment sensors, air quality, signal quality, power, traceroute, and position history.
parent: User Guide
---

# Node Metrics

The node detail screen provides comprehensive telemetry and metrics for each node on your mesh.

## Device Metrics

Basic operating information reported by each node:

| Metric | Description |
|--------|-------------|
| Battery Level | Current battery percentage |
| Voltage | Battery voltage reading |
| Channel Utilization | Percentage of airtime consumed |
| Airtime | Transmission time used by this node |
| Uptime | Time since last reboot |

Device metrics are displayed as individual cards with trend sparklines showing battery level, voltage, channel utilization, airtime, and uptime over time.

> 💡 **Tip:** Tap any metric card to expand it into a full chart with historical data points. Pinch to zoom the time axis.

## Environment Metrics

Environmental sensor data (requires compatible hardware):

| Metric | Sensor Examples |
|--------|-----------------|
| Temperature | BME280, BME680, SHT31 |
| Humidity | BME280, BME680, SHT31 |
| Barometric Pressure | BME280, BMP280 |
| Gas Resistance | BME680 |
| IAQ (Air Quality) | BME680 |

Environment metrics are charted over time for easy trend analysis — temperature, humidity, and pressure each get their own line chart with the measurement unit displayed on the Y axis.

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
| CO₂ | ppm | Carbon dioxide concentration |

CO₂ readings are color-coded by severity to make air quality easy to read at a glance:

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

> 💡 **Tip:** Air Quality metrics require a compatible air-quality sensor on the remote node. If a node has no particulate or CO₂ sensor, the air-quality button won't appear. See [Telemetry & Sensors](telemetry-and-sensors.md) for supported hardware.

## Signal Metrics

Radio signal quality information:

| Metric | Description |
|--------|-------------|
| SNR | Signal-to-Noise Ratio (higher is better) |
| RSSI | Received Signal Strength Indicator (closer to 0 is better) |
| Noise Floor | Local background RF noise in dBm (more negative is quieter) |
| Hop Count | Number of mesh hops for last message |

### Signal Quality Reference

Signal quality is rated from **SNR relative to the active LoRa modem preset's demodulation floor**, not from fixed thresholds — a given SNR means different things on different presets (e.g. −15 dB is fine on LongSlow but unusable on ShortFast). RSSI is shown but is not part of the rating. Letting `limit` be the preset's SNR limit:

| Quality | Criteria |
|---------|----------|
| Good | SNR above the preset's limit |
| Fair | within 5.5 dB below the limit |
| Bad | within 7.5 dB below the limit |
| None | more than 7.5 dB below the limit |

See [Understanding the Signal Meter](signal-meter.md) for the full explanation.

Local Stats from your connected radio are also shown in Signal Quality when available. These logs include noise floor, traffic counters, relay counters, online node counts, and radio uptime. The noise floor chart uses a dashed reference line at -85 dBm to help identify a busy RF environment. Use **Request** to ask the connected radio for a fresh Local Stats telemetry report, **Clear** to remove Local Stats logs for that node, and **Save** to export the visible Local Stats history as CSV.

## Power Metrics

Power management telemetry (requires INA sensor or compatible hardware):

| Metric | Description |
|--------|-------------|
| Bus Voltage | Supply voltage |
| Current | Power draw in milliamps |
| Power | Calculated wattage |

## Traceroute

Traceroute shows the path a message takes through the mesh:

1. From the node detail screen, tap **Traceroute**.
2. The app sends a traceroute request to the target node.
3. Results show each hop with SNR/RSSI values.

### Reading Traceroute Results

```
You → Node A (SNR: 8.5) → Node B (SNR: 5.2) → Target
```

Each hop represents a relay node that forwarded the message.

## Position Log

Historical position data for nodes that share their location:
- GPS coordinates
- Altitude
- Speed (if moving)
- Timestamp for each position report

## Neighbor Info

Shows which nodes a given node can directly hear, useful for understanding mesh topology.

## Viewing Metrics

1. Navigate to **Nodes**.
2. Tap the node you want to inspect.
3. Select the metric category from the detail tabs.

![Node detail — local device](/img/android/docs/nodes_detail_local.webp)

The position tab shows location data for nodes that share GPS:

![Position inline content](/img/android/docs/nodes_position.webp)

> ⚠️ **Note:** Metrics are only available when they have been reported by the remote node. Metrics update at intervals configured on each node's telemetry settings.

## Related Topics

- [Nodes](nodes.md) — node list, filtering, and sorting
- [Telemetry & Sensors](telemetry-and-sensors.md) — supported sensors and configuration
- [Signal Meter](signal-meter.md) — how signal quality is calculated from SNR and RSSI
- [Discovery](discovery.md) — traceroute details and neighbor info
- [Units & Locale](units-and-locale.md) — temperature, distance, and speed display formats

---
