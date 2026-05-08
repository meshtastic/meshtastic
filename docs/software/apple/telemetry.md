---
title: Telemetry & Sensors
parent: User Guide
nav_order: 8
---

# Telemetry & Sensors

Meshtastic nodes can report sensor data across the mesh, giving you visibility into the physical environment at remote locations.

## Telemetry Types

| Type | Data |
|------|------|
| Device Metrics | Battery level, battery voltage, channel utilisation, airtime fraction |
| Environment | Temperature (°C/°F), relative humidity (%), barometric pressure (hPa) |
| Air Quality | PM1.0, PM2.5, PM10 particulate counts (µg/m³) |
| Power | Voltage and current readings from power monitoring sensors |

### Device Metrics

| Icon | State | Description |
|------|-------|-------------|
| ![Battery full](/img/apple/batteryFull.png) | Full | Battery is well charged (≥80%). |
| ![Battery low](/img/apple/batteryLow.png) | Low | Battery is low (≤20%) — charge the node soon. |
| ![Battery charging](/img/apple/batteryCharging.png) | Charging | Node is plugged in and fully charged. |
| ![Battery unknown](/img/apple/batteryNil.png) | Unknown | Battery level not reported by this node. |

### Air Quality

![IAQ Scale](/img/apple/iaqScale.png)

The Indoor Air Quality scale shows category bands from Excellent (green) through Hazardous (maroon). The app supports multiple display modes for air quality readings:

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/screenshots/aqi_all_modes_dark.png">
  <img src="/img/apple/aqi_all_modes_light.png" alt="Air Quality Index — all display modes">
</picture>

### Environment

| Icon | Reading | Description |
|------|---------|-------------|
| ![Humidity with dew point](/img/apple/humidityWithDew.png) | Humidity (with dew point) | Relative humidity percentage and calculated dew point temperature. |
| ![Humidity without dew point](/img/apple/humidityNoDew.png) | Humidity | Relative humidity percentage only. |
| ![Pressure high](/img/apple/pressureHigh.png) | High pressure | Barometric pressure above normal (≥1013 hPa). |
| ![Pressure low](/img/apple/pressureLow.png) | Low pressure | Barometric pressure below normal (<1013 hPa). |

## Viewing Telemetry

Telemetry is visible in two places:

1. **Node Detail** — tap any node in the Nodes tab. The Logs section shows the most recent device metrics and environment readings.
2. **Telemetry Charts** — tap the chart icon in a node detail to see historical graphs for any telemetry type the node has reported.

## Configuring Telemetry

Go to **Settings → Telemetry** to enable telemetry modules and set reporting intervals:

| Setting | Description |
|---------|-------------|
| Device Metrics Interval | How often (seconds) the node broadcasts battery and utilisation data. |
| Environment Interval | How often environment sensor data is broadcast. |
| Air Quality Interval | How often air quality sensor data is broadcast. |
| Environment Screen | Show environment data on the device screen. |
| Telemetry on Admin Channel | Restrict telemetry to the admin channel instead of broadcast. |

## Supported Sensors

The app displays data from any sensor supported by Meshtastic firmware. Common sensors:

- **BME280 / BME680** — temperature, humidity, pressure
- **SHT31** — temperature, humidity
- **MCP9808** — precision temperature
- **INA219 / INA260** — power monitoring
- **PMSA003** — air quality (PM2.5)

Sensor availability depends on your hardware. Check the [Meshtastic hardware guide](https://meshtastic.org/docs/hardware/) for compatibility.

## Detection Sensor

The Detection Sensor module alerts the mesh when a connected PIR motion sensor or contact switch is triggered. Configure it in **Settings → Detection Sensor**. Alerts appear as messages on the primary channel and as node log entries.
