---
title: Desktop App
sidebar_position: 14
last_updated: 2026-09-11
description: Install and use the Meshtastic Desktop app on Linux, macOS, and Windows — connections, feature parity, and keyboard shortcuts.
parent: User Guide
---

# Desktop App

This page covers installing the Meshtastic desktop app, connecting a radio, and how it differs from Android. The desktop app shares its core codebase with Android via Kotlin Multiplatform, so most features work identically across Linux, macOS, and Windows.

## Installation

### Linux

- Download the `.deb`, `.rpm`, or `.AppImage` package from the [releases page](https://github.com/meshtastic/Meshtastic-Android/releases)
- Or install from Flathub: `flatpak install flathub org.meshtastic.MeshtasticDesktop`
- Or build from source using `./gradlew :desktopApp:run`

### macOS

- Download the `.dmg` package from the [releases page](https://github.com/meshtastic/Meshtastic-Android/releases)
- Or build from source

### Windows

- Download the `.msi` or `.exe` installer from the [releases page](https://github.com/meshtastic/Meshtastic-Android/releases)
- Or build from source

## Connecting Your Radio

### USB Serial (Primary)

The most reliable connection method on desktop:

Connect your radio via USB. The app detects the serial port automatically; if it doesn't, select the port from the Connect menu.

### TCP/IP

For network-connected radios:

1. Enter the radio's IP address and port (default: 4403).
2. Click **Connect**.

### Bluetooth (BLE)

Bluetooth Low Energy is supported on desktop via the [Kable](https://github.com/JuulLabs/kable) library:

1. Ensure your system has a Bluetooth adapter. The app scans for nearby Meshtastic radios automatically.
2. Select your radio from the Connect screen.

## Feature Parity

| Feature | Android | Desktop | Notes |
|---------|---------|---------|-------|
| Messaging | ✓ | ✓ | Full parity |
| Node List | ✓ | ✓ | Full parity |
| Map | ✓ | ✓ | Interactive MapLibre map, with base map and overlay pickers and custom tile sources. Offline terrain (hillshade and contours) can be downloaded; offline base-map packs and local `.mbtiles` archives cannot |
| Map layers (`.kml`/`.kmz`/GeoJSON) | ✓ | ✓ | Same layer store and sheet as Android; imported files draw on the desktop map |
| Site Planner | ✓ | ✓* | *Opens in your browser on desktop; the estimate is not drawn on the desktop map |
| Settings | ✓ | ✓ | Full parity |
| Bluetooth (BLE) | ✓ | ✓ | Via Kable on desktop |
| Firmware Update | ✓ | ✓ | In-app USB, BLE, and Wi-Fi (ESP32) update work the same as Android. The USB maintenance flow — nRF52/RP2040 factory erase and bootloader upgrade — is Android-only |
| Notifications | ✓ | ✓ | Native OS notifications |
| Widgets | ✓ | ✗ | Android-only |
| AI Assistant (Chirpy) | ✓* | ✗ | Google flavor Android only |
| App Functions (system AI) | ✓† | ✗ | Google flavor Android only |

*Chirpy AI requires Android 14+ on Google flavor builds with supported hardware.

†App Functions exposes app actions to the Android system AI on Google flavor builds. See [App Functions](app-functions.md).

## UI Differences

The desktop app uses the same Compose Multiplatform UI with adaptations for larger screens and desktop interaction.

### Keyboard Shortcuts

Shortcuts use **⌘** (Command) on macOS and **Ctrl** on Windows and Linux. (The Super / Windows key is not bound.)

| Shortcut | Action |
|----------|--------|
| **⌘/Ctrl+Q** | Quit the app |
| **⌘/Ctrl+,** | Open Settings |
| **⌘/Ctrl+1** | Switch to Messages tab |
| **⌘/Ctrl+2** | Switch to Nodes tab |
| **⌘/Ctrl+3** | Switch to Map tab |
| **⌘/Ctrl+4** | Switch to Connect tab |
| **⌘/Ctrl+/** | Open About |

### Window & System Tray

- **Window resizing** — responsive layout adapts to window dimensions
- **System tray** — closing the window minimizes to the system tray for background mesh operation. On a desktop environment with no tray, there is nowhere to minimize to, so closing quits the app instead
- **Tray menu** — right-click the tray icon to show window or quit
- **Mouse interaction** — hover states and standard desktop navigation

### Notification Preferences

The desktop app provides in-app toggles for controlling which notifications are shown. Find them in the **App Notifications** section of the Settings screen: **Direct message notifications**, **New node notifications**, and **Low battery notifications**.

## Built-in Documentation Browser

The desktop app includes a built-in documentation browser for quick access to help content without leaving the app.

![Docs browser with table of contents](/img/android/docs/docs-browser_toc.webp)

The browser supports full-text search across all documentation:

![Searching the docs browser](/img/android/docs/docs-browser_search.webp)

Individual doc pages render with full formatting:

![A documentation page](/img/android/docs/docs-browser_page.webp)

## Building from Source

```shell
git clone https://github.com/meshtastic/Meshtastic-Android.git
cd Meshtastic-Android
./gradlew :desktopApp:run
```

Requirements:
- JDK 25 (Gradle can provision the toolchain itself via foojay)
- No Android SDK required for desktop-only builds

## Known Limitations

- Offline base-map downloads and local `.mbtiles` archives are not available on desktop. Offline terrain is — see [Map & Waypoints](map-and-waypoints.md).
- `.kml`/`.kmz`/GeoJSON layer import works — see
  [Map & Waypoints](map-and-waypoints.md#map-layers). Site Planner opens in your browser
  rather than in the app; to bring its coverage estimate onto the map, click the transmitter pin
  in the browser and use the planner's GeoJSON export, then add the file as a layer — not the KML
  export, which is a ground-overlay image this map cannot draw. Custom network tile sources work
  too — see [Map & Waypoints](map-and-waypoints.md#adding-your-own-tile-source)
- The USB maintenance flow — nRF52/RP2040 factory erase and bootloader upgrade — is Android-only, and the
  desktop app does not offer it. Use the [Web Flasher](https://flasher.meshtastic.org) instead
- Some Android-specific features (widgets, specific notification channels) are unavailable
- Performance may vary on low-spec hardware running Compose Desktop
- BLE bonding is not yet supported on desktop (pairing works without bonding)

## Related Topics

- [Connections](connections.md) — connection methods overview
- [Firmware Updates](firmware.md) — in-app USB, BLE, and Wi-Fi update all work the same as on Android
- [Map & Waypoints](map-and-waypoints.md) — base maps, layers, custom tile sources, and what the desktop map does not do
