---
title: Measurement & Formatting
sidebar_position: 9
last_updated: 2026-08-19
parent: Developer Guide
---

# Measurement & Formatting

How the Meshtastic Android/KMP app formats numbers, units, and locale-sensitive values.

---

## Overview

All measurement data transmitted by Meshtastic radios uses **metric units** (meters, °C, hPa, m/s, etc.). The app converts and formats these values for display using two core utilities:

| Utility | Location | Purpose |
|---|---|---|
| `MetricFormatter` | `core/common/.../util/MetricFormatter.kt` | Converts and formats physical measurements (temperature, pressure, speed, etc.) |
| `NumberFormatter` | `core/common/.../util/NumberFormatter.kt` | Low-level fixed-point number formatting with locale-independent dot separator |

Both live in `org.meshtastic.core.common.util` and are available to all KMP targets (Android, Desktop, iOS).

---

## MetricFormatter API

`MetricFormatter` is a Kotlin `object` with pure functions for each measurement type:

```kotlin
object MetricFormatter {
    fun temperature(celsius: Float, isFahrenheit: Boolean): String
    fun voltage(volts: Float, decimalPlaces: Int = 2): String
    fun current(milliAmps: Float, decimalPlaces: Int = 1): String
    fun percent(value: Float, decimalPlaces: Int = 1): String
    fun humidity(value: Float): String
    fun pressure(hPa: Float, decimalPlaces: Int = 1): String
    fun snr(value: Float, decimalPlaces: Int = 1): String
    fun rssi(value: Int): String
    fun windSpeed(metersPerSecond: Float, isImperial: Boolean, decimalPlaces: Int = 1): String
    fun rainfall(millimeters: Float, isImperial: Boolean, decimalPlaces: Int = 1): String
}
```

### Usage

```kotlin
// Temperature — Fahrenheit conversion is handled automatically
MetricFormatter.temperature(22.5f, isFahrenheit = true)  // "72.5°F"
MetricFormatter.temperature(22.5f, isFahrenheit = false)  // "22.5°C"

// Signal metrics
MetricFormatter.snr(-5.2f)    // "-5.2 dB"
MetricFormatter.rssi(-97)     // "-97 dBm"

// Environment
MetricFormatter.pressure(1013.25f)  // "1013.3 hPa"
MetricFormatter.humidity(65.0f)     // "65%"
MetricFormatter.windSpeed(3.7f, isImperial = false)  // "3.7 m/s"
MetricFormatter.windSpeed(3.7f, isImperial = true)   // "8.3 mph"
MetricFormatter.rainfall(12.3f, isImperial = false)  // "12.3 mm"
MetricFormatter.rainfall(12.3f, isImperial = true)   // "0.5 in"

// Power
MetricFormatter.voltage(3.95f)      // "3.95 V"
MetricFormatter.current(125.0f)     // "125.0 mA"
```

---

## NumberFormatter

`NumberFormatter` provides locale-independent decimal formatting using pure arithmetic (no `String.format` or `DecimalFormat`):

```kotlin
object NumberFormatter {
    fun format(value: Double, decimalPlaces: Int): String
    fun format(value: Float, decimalPlaces: Int): String
}
```

> **Why locale-independent?** Meshtastic is a mesh networking app where consistency matters — sensor readings shared between nodes should look the same everywhere. `NumberFormatter` always uses `.` as the decimal separator.

---

## Unit Conversion

Three measurements convert away from metric for display, each gated by a boolean flag sourced from the user's device locale or preferences:

| Measurement | Flag | Source | Conversion |
|---|---|---|---|
| `temperature` | `isFahrenheit` | `getSystemTemperatureUnit()` | `°F = °C × 1.8 + 32` |
| `windSpeed` | `isImperial` | `getSystemMeasurementSystem()` | m/s × 2.23694 → mph |
| `rainfall` | `isImperial` | `getSystemMeasurementSystem()` | mm ÷ 25.4 → in |

The two source functions (in `core/common/.../util/MeasurementSystem.kt`) are deliberately separate: some locales mix systems (the UK uses miles for distance but Celsius for temperature), so temperature must never be derived from the distance unit. On Android, `getSystemTemperatureUnit()` delegates to `androidx.core.text.util.LocalePreferences`, which resolves CLDR locale data and honors the Android 14+ Regional preferences temperature override.

Everything else (voltage, current, pressure, SNR, RSSI, humidity, percent) displays in its native metric units. The user-facing [Units & Locale](../user/units-and-locale.md) page explains what end users see.

---

## Adding a New Measurement Type

To add a new measurement formatter:

1. **Add a function to `MetricFormatter`** in `core/common/src/commonMain/kotlin/org/meshtastic/core/common/util/MetricFormatter.kt`:

   ```kotlin
   fun radiation(microSieverts: Float, decimalPlaces: Int = 2): String =
       "${NumberFormatter.format(microSieverts, decimalPlaces)} μSv/h"
   ```

2. **Add tests** in `core/common/src/commonTest/`:

   ```kotlin
   @Test
   fun radiationFormatting() {
       assertEquals("0.15 μSv/h", MetricFormatter.radiation(0.15f))
       assertEquals("1.23 μSv/h", MetricFormatter.radiation(1.234f))
   }
   ```

3. **Use in UI** — call from any `commonMain` composable or ViewModel:

   ```kotlin
   Text(text = MetricFormatter.radiation(node.radiationLevel))
   ```

4. **Run verification**:
   ```bash
   ./gradlew :core:common:allTests
   ```

---

## DateFormatter

Date and time formatting uses the `DateFormatter` `expect object` with platform-specific `actual` implementations:

| Function | Output Example |
|---|---|
| `formatRelativeTime()` | "5 min ago" |
| `formatDateTime()` | "May 13, 2026 2:30 PM" |
| `formatShortDate()` | "May 13" |
| `formatTime()` | "2:30 PM" |
| `formatTimeWithSeconds()` | "2:30:45 PM" |
| `formatDate()` | "2026-05-13" |
| `formatDateTimeShort()` | "5/13/26 2:30 PM" |

Unlike `MetricFormatter`, `DateFormatter` is declared with `expect`/`actual` (an `expect object` in `commonMain`, an `actual object` per platform) because date formatting inherently depends on platform locale APIs.

---

## Design Decisions

| Decision | Rationale |
|---|---|
| Locale-independent decimal separator (`.`) | Mesh data shared between nodes must be consistent |
| Pure arithmetic formatting (no `DecimalFormat`) | Works identically on JVM, Native, and JS targets |
| Only temperature, wind speed, and rainfall convert | The remaining metric units are universally understood in their native form |
| `object` singleton pattern | Stateless utility — no instance management needed |

---

## Related

- **User-facing docs**: [Units & Locale](../user/units-and-locale.md) explains what end users see
- **Source code**: `core/common/src/commonMain/kotlin/org/meshtastic/core/common/util/MetricFormatter.kt`
- **Tests**: `core/common/src/commonTest/kotlin/org/meshtastic/core/common/util/MetricFormatterTest.kt`
