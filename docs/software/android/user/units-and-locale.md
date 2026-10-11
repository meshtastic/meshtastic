---
title: Units, Measurement & Locale
sidebar_position: 16
last_updated: 2026-08-30
description: How the app formats temperature, distance, speed, and other measurements based on your device locale.
parent: User Guide
---

# Units, Measurement & Locale

The Meshtastic app automatically displays temperatures, distances, speeds, and times in the units your device is configured to use. If your device's settings can't express the units you want, an in-app **Units** setting overrides them.

## How It Works

Meshtastic radios always transmit data in **metric units** (meters, °C, m/s, hPa, etc.). When the app receives this data, it converts and displays values in whatever unit system your device's locale specifies.

On Android, your measurement preferences are determined by your system **Language & Region** settings. On Desktop (JVM), the app uses the JVM's default `Locale`.

Units follow your device's **region**, not the display language. Plain languages — like **English** in the app's own Language setting or Android's per-app language — keep the region your device is set to. A choice that names a region of its own, like **English (Canada)**, overrides it and brings that region's units with it. On Android 16+, the system-wide **Measurement system** preference overrides the region for distance, speed, and the other measurements — but not for temperature, which keeps following the region.

> 💡 **Tip:** By default there is nothing to configure — change your system measurement preferences and every screen in Meshtastic updates automatically. If your device offers no working region or measurement setting (some manufacturer builds don't), set **Settings → Units** in the app instead.

## The Radio's Own Screen Is Separate

**Settings → Device configuration → Display → Display units** configures the screen on the radio, not the app. The **Use 12h clock format** and **Always point north** settings do too — all three apply to the radio's display only. Temperature on that screen has its own setting, **Environment metrics use Fahrenheit**, on the radio's Telemetry module — see the [Telemetry module reference](https://meshtastic.org/docs/configuration/module/telemetry#display-fahrenheit) on meshtastic.org.

If your node list shows miles while the radio's screen shows kilometers, this is why: the two are set in different places. Changing the radio's setting never alters what the app displays. See the [Display Config](https://meshtastic.org/docs/configuration/radio/display) guide on meshtastic.org for the device-side options.

## Temperature

Temperature values from environment sensors are transmitted as **°C** and displayed based on your device's temperature unit preference.

![Environment metrics with temperature](/img/android/docs/nodes_environment_metrics.webp)

| Your Setting | You See |
|---|---|
| Celsius | 22°C |
| Fahrenheit | 72°F |

This affects all temperature displays throughout the app: node environment telemetry, soil temperature, dew point, and telemetry chart axes.

Temperature follows your locale's **temperature preference**, independent of the distance system. Locales that mix systems work correctly — a UK phone shows miles for distance but **°C** for temperature. On Android 14+, the **Temperature** regional preference (Settings → System → Languages → Regional preferences) overrides the locale default.

## Distance & Altitude

Distances between nodes and GPS altitudes are transmitted as **meters** and automatically scaled and converted.

![Distance info display](/img/android/docs/nodes_distance_info.webp)

| Your Setting | Small Distance | Large Distance | Altitude |
|---|---|---|---|
| Metric | 350 m | 2.5 km | 1,200 m |
| Imperial (US) | 1,148 ft | 1.6 mi | 3,937 ft |

The app uses natural scaling — short distances stay in meters or feet, while longer distances switch to kilometers or miles automatically.

### Where these appear

- **Node list** — distance and bearing to each node
- **Node detail** — altitude, distance from your position
- **Map** — waypoint distances, traceroute hop distances
- **Compass** — distance to selected node

## Speed

GPS ground speed is displayed in your locale's preferred speed unit.

| Your Setting | You See |
|---|---|
| Metric | 12 km/h |
| Imperial (US) | 7 mph |

## Wind

Wind speed, gust and lull are transmitted by the sensor as **m/s** and converted for display — the app shows the unit weather forecasts use in your region, not the raw sensor unit.

| Your Setting | You See |
|---|---|
| Metric | 18.0 km/h |
| Imperial (US) | 11.2 mph |

All three read in the same unit wherever they appear: the Node Detail environment section, the Environment Telemetry log, and the charts.

## Weight

Readings from a connected scale are transmitted in **kg** and converted for display.

| Your Setting | You See |
|---|---|
| Metric | 1.50 kg |
| Imperial (US) | 3.31 lb |

## Rainfall

Rainfall measurements (1-hour and 24-hour totals) are transmitted as **mm** and converted for display.

| Your Setting | You See |
|---|---|
| Metric | 12.0 mm |
| Imperial (US) | 0.47 in |

## Units That Never Change

Some units are international standards and are displayed the same way regardless of your locale:

| Measurement | Unit | Why |
|---|---|---|
| Barometric pressure | hPa | International meteorological standard |
| Heading / bearing | ° (degrees) | Universal navigation convention |
| Radiation | µR/h | Standard dosimetry unit |
| GPS coordinates | decimal degrees | Universal geographic standard |
| Humidity, battery, soil moisture | % | Universal |

## Date & Time

All timestamps throughout the app — last heard, message times, telemetry logs, chart axes — follow your device's date and time preferences.

| Setting | What It Controls | Example |
|---|---|---|
| **24-Hour Time** | Clock format | 14:30 vs 2:30 PM |
| **Date Format** | Date ordering | 09/05/2026 vs 05/09/2026 |

The app also uses **relative time** where it makes sense — for example, "5 min ago" or "2 hours ago" in the node list — which is automatically localized into your device language.

## Changing Your Measurement System

By default the app follows your device, and your measurement system (metric vs imperial) is tied to your region setting:

1. Open **Android Settings → System → Language & Region**
2. Change your **Region**
3. Return to Meshtastic — values update immediately

On Android 16+, the system-wide **Measurement system** preference overrides the region for distance, speed, and the other measurements — but not for temperature. Temperature is resolved separately, and on Android 14+ you override it on its own under **Regional preferences → Temperature**.

Not every English region is fully metric. **English (United Kingdom)** uses miles and feet for distance, so the node list shows miles and altitude in feet. For metric distances, set the app's **Units** setting to Metric (see [Overriding the Units in the App](#overriding-the-units-in-the-app)), or choose a fully metric region such as English (Canada), English (Ireland), or English (New Zealand).

Some phones do not offer the **Regional preferences** menu at all and list only English (United States). On those devices, use the app's **Units** setting (see [Overriding the Units in the App](#overriding-the-units-in-the-app)).

### Overriding the units in the app

Not every device can express every preference — some manufacturer builds ship no regional preferences at all, some
offer only one English variant, and UK regions are imperial for distance even if you'd rather read altitude in
meters. For those cases the app has its own switch:

1. Open **Meshtastic Settings → Units**
2. Choose **System default**, **Metric**, or **Imperial**
3. Every screen updates immediately — no restart needed

**System default** follows your phone's or computer's region and measurement settings. Forcing **Metric** or **Imperial** applies to
everything, temperature included (metric → °C, imperial → °F), even where the system's own regional preferences say
otherwise. The setting exists on Android and Desktop alike.

## Related Topics

- [Node Metrics](node-metrics.md) — where temperature, distance, and sensor values are displayed
- [Telemetry & Sensors](telemetry-and-sensors.md) — the sensors that produce these measurements
- [Measurement & Formatting](../developer/measurement.md) — developer reference for the formatting utilities
- [Settings — Radio & User](settings-radio-user.md) — region setting that drives unit selection
- [Display Config](https://meshtastic.org/docs/configuration/radio/display) — units, clock, and compass settings for the radio's own screen, on meshtastic.org
