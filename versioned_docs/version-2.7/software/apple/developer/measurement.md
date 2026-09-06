---
title: Measurement & Locale
parent: Developer Guide
sidebar_position: 7
---

# Measurement & Locale

How the app converts metric device data to locale-aware display values. All rules are defined in [Meshtastic Design Standards v1.4, Section 10](https://github.com/meshtastic/design/blob/master/standards/meshtastic_design_standards_latest.md).

## Core Principle

Meshtastic devices transmit all data in **metric SI units**. The app wraps raw values in Swift `Measurement` types with the correct source unit, then lets the OS format them for the user's locale. No manual `if metric … else imperial` branching is needed for most quantities.

```
Device (protobuf, always metric)
  → Wrap in Measurement<Unit>(value:, unit: .sourceUnit)
  → Format with .formatted(.measurement(...)) or MeasurementFormatter
  → Display (auto-converted to user's locale)
```

## Protobuf Source Units

These are the canonical units the device sends. Always use these as the source unit when constructing `Measurement` values:

| Quantity | Device Unit | Swift Unit Type |
|----------|------------|-----------------|
| Altitude | meters | `UnitLength.meters` |
| Distance (sensor) | millimeters | `UnitLength.millimeters` |
| Ground Speed | km/h | `UnitSpeed.kilometersPerHour` |
| Wind Speed / Gust | m/s | `UnitSpeed.metersPerSecond` |
| Temperature | °C | `UnitTemperature.celsius` |
| Barometric Pressure | hPa | `UnitPressure.hectopascals` |
| Rainfall (1h / 24h) | mm | `UnitLength.millimeters` |
| Weight | kg | `UnitMass.kilograms` |

> **Warning — `CLLocation.speed` returns m/s, not km/h.** When wrapping GPS speed, use `UnitSpeed.metersPerSecond`. Getting the source unit wrong produces silently incorrect conversions.

## Formatting APIs

### `.formatted(.measurement(...))`

Preferred for inline text. Auto-converts to the user's locale:

```swift
let speed = Measurement(value: newLocation.speed, unit: UnitSpeed.metersPerSecond)
Text(speed.formatted(.measurement(width: .abbreviated,
    numberFormatStyle: .number.precision(.fractionLength(0)))))
// → "12 km/h" or "7 mph"
```

### `MeasurementFormatter`

Used when you need more control (e.g., natural scaling for distances):

```swift
let formatter = MeasurementFormatter()
formatter.unitOptions = .naturalScale  // 500m stays "500 m", 2500m → "2.5 km"
formatter.numberFormatter.maximumFractionDigits = 1
let distance = Measurement(value: meters, unit: UnitLength.meters)
return formatter.string(from: distance)
```

### `MKDistanceFormatter`

Used for map-related distances. Automatically picks m/km or ft/mi:

```swift
let distanceFormatter = MKDistanceFormatter()
Text(distanceFormatter.string(fromDistance: Double(meters)))
```

### Temperature

Use the `formattedTemperature()` extension on `Float` (defined in `Meshtastic/Extensions/Float.swift`):

```swift
// Auto-converts °C → °F based on locale
Text(temperature.formattedTemperature())
```

When you need the raw converted value (e.g., for chart data points), use `localeTemperature()`:

```swift
let displayValue = temperature.localeTemperature()  // Double in user's preferred unit
```

Both methods use `kCFLocaleTemperatureUnitKey` to detect the user's temperature preference.

## Locale Detection

### Temperature Unit

```swift
let locale = NSLocale.current as NSLocale
let localeUnit = locale.object(forKey: NSLocale.Key(rawValue: "kCFLocaleTemperatureUnitKey"))
if (localeUnit as? String) == "Fahrenheit" {
    // Use .fahrenheit
}
```

> **Warning — Never force-unwrap locale queries.** `localeUnit` can be `nil` on some OS versions. Always use `as? String` with a safe default (Celsius).

### Measurement System

```swift
let usesMetric = Locale.current.measurementSystem == .metric
```

Used for quantities where `Measurement` formatting doesn't fully apply (e.g., choosing decimal precision for rainfall: 0 decimals for mm, 1 for inches).

## Units That Never Convert

These are displayed as-is regardless of locale:

| Quantity | Unit | Why |
|----------|------|-----|
| Barometric Pressure | hPa | International meteorological standard |
| Heading / Bearing | ° (degrees) | Universal navigation convention |
| Radiation | µR/hr | Standard dosimetry unit |
| Coordinates | decimal degrees | Universal geographic standard |
| Percentages (humidity, battery) | % | Universal |

## Charts & Graphs

Chart axes, tooltips, and annotations must also display locale-aware units:

```swift
// Altitude chart Y-axis (PositionAltitudeChart.swift)
AxisValueLabel("""
    \(value.as(PlottableMeasurement.self)!
        .measurement
        .converted(to: Locale.current.measurementSystem == .metric
            ? .meters : .feet),
        format: .measurement(width: .wide,
            numberFormatStyle: .number.precision(.fractionLength(0))))
""")
```

## Date & Time

| Use Case | API | Example |
|----------|-----|---------|
| Recency indicators | `RelativeDateTimeFormatter()` | "5 min ago" |
| Timestamps | `Date.formatted(date: .numeric, time: .shortened)` | "5/9/26, 2:30 PM" |
| Locale-aware templates | `DateFormatter.dateFormat(fromTemplate:options:locale:)` | Respects 12/24hr, date order |
| Export (machine-readable) | `DateFormatter` with `en_US_POSIX` locale | "2026-05-09_143000" |
| TAK/CoT XML | `Date.ISO8601FormatStyle` | ISO 8601 with fractional seconds |

Never hardcode 12-hour or 24-hour format — let the OS handle it via locale-aware formatters.

## File Map

| File | What It Does |
|------|-------------|
| `Extensions/Float.swift` | `formattedTemperature()`, `localeTemperature()` |
| `Views/Settings/GPSStatus.swift` | GPS speed formatting (m/s source) |
| `Views/Helpers/Weather/LocalWeatherConditions.swift` | WeatherKit temperature & wind |
| `Views/Helpers/Weather/NodeWeatherForecast.swift` | Hourly forecast temperature conversion |
| `Views/Nodes/Helpers/Map/PositionAltitudeChart.swift` | Locale-aware altitude chart axis |
| `Views/Nodes/Helpers/NodeDetail.swift` | Weight, rainfall, wind, soil temp display |
| `Views/Nodes/Helpers/Metrics Columns/EnvironmentDefaultColumns.swift` | Telemetry table columns |
| `Views/Nodes/Helpers/Metrics Columns/EnvironmentDefaultSeries.swift` | Chart gradient temperature thresholds |
| `Views/Helpers/DistanceText.swift` | `MKDistanceFormatter` wrapper |
| `Views/Helpers/CompassView.swift` | `MeasurementFormatter` with `.naturalScale` |
| `Measurement/CustomFormatters.swift` | Shared `altitudeFormatter` |

## Checklist for New Telemetry Fields

When adding a new sensor value or telemetry display:

1. Identify the protobuf source unit from the device schema
2. Wrap in `Measurement<Unit>(value:, unit:)` with the correct source unit
3. Format with `.formatted(.measurement(...))` — do not hardcode unit strings
4. If it's a chart, ensure axis labels use the same locale-aware conversion
5. If it's a universal unit (hPa, degrees, %), display as-is
6. Test with both US and Metric measurement system settings in the Simulator
