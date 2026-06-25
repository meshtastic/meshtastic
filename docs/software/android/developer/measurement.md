---
title: Measurement & Formatting
sidebar_position: 9
last_updated: 2026-05-13
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
    fun windSpeed(metersPerSecond: Float, decimalPlaces: Int = 1): String
    fun rainfall(millimeters: Float, decimalPlaces: Int = 1): String
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
MetricFormatter.windSpeed(3.7f)     // "3.7 m/s"
MetricFormatter.rainfall(12.3f)     // "12.3 mm"

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

## Temperature Conversion

Temperature is the only measurement that performs a unit conversion. The `isFahrenheit` flag is typically sourced from the user's device locale or preferences:

```
°F = °C × 1.8 + 32
```

All other measurements display in their native metric units. The user-facing `units-and-locale.md` page explains what end users see.

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

Date and time formatting uses the `DateFormatter` interface with platform-specific implementations:

| Function | Output Example |
|---|---|
| `formatRelativeTime()` | "5 min ago" |
| `formatDateTime()` | "May 13, 2026 2:30 PM" |
| `formatShortDate()` | "May 13" |
| `formatTime()` | "2:30 PM" |
| `formatTimeWithSeconds()` | "2:30:45 PM" |
| `formatDate()` | "2026-05-13" |

Unlike `MetricFormatter`, `DateFormatter` is an **interface** with platform `expect`/`actual` implementations because date formatting inherently depends on platform locale APIs.

---

## Design Decisions

| Decision | Rationale |
|---|---|
| Locale-independent decimal separator (`.`) | Mesh data shared between nodes must be consistent |
| Pure arithmetic formatting (no `DecimalFormat`) | Works identically on JVM, Native, and JS targets |
| Temperature is the only converted unit | All other metric units are universally understood in their native form |
| `object` singleton pattern | Stateless utility — no instance management needed |

---

## Related

- **User-facing docs**: `docs/user/units-and-locale.md` explains what end users see
- **Source code**: `core/common/src/commonMain/kotlin/org/meshtastic/core/common/util/MetricFormatter.kt`
- **Tests**: `core/common/src/commonTest/kotlin/org/meshtastic/core/common/util/MetricFormatterTest.kt`
