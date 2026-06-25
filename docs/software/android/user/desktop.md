---
title: Desktop App
sidebar_position: 14
last_updated: 2026-05-20
description: Install and use the Meshtastic Desktop app on Linux, macOS, and Windows — connections, feature parity, and keyboard shortcuts.
parent: User Guide
---

# Desktop App

The Meshtastic Desktop application shares its core codebase with Android via Kotlin Multiplatform. Most features work identically on Linux, macOS, and Windows.

## Installation

### Linux

- Download the `.deb` or `.AppImage` package from the releases page
- Or build from source using `./gradlew :desktopApp:run`

### macOS

- Download the `.dmg` package from releases
- Or build from source

### Windows

- Download the `.msi` installer from releases
- Or build from source

## Connecting Your Radio

### USB Serial (Primary)

The most reliable connection method on Desktop:

1. Connect your Meshtastic radio via USB cable.
2. The app should detect the serial port automatically.
3. If not detected, select the correct serial port from the Connect menu.

### TCP/IP

For network-connected radios:

1. Enter the radio's IP address and port (default: 4403).
2. Click **Connect**.

### Bluetooth (BLE)

Bluetooth Low Energy is supported on Desktop via the [Kable](https://github.com/JuulLabs/kable) library:

1. Ensure your system has a Bluetooth adapter.
2. The app scans for nearby Meshtastic radios automatically.
3. Select your device from the Connect screen.

## Feature Parity

| Feature | Android | Desktop | Notes |
|---------|---------|---------|-------|
| Messaging | ✓ | ✓ | Full parity |
| Node List | ✓ | ✓ | Full parity |
| Map | ✓ | ✓ | Full parity |
| Settings | ✓ | ✓ | Full parity |
| Bluetooth (BLE) | ✓ | ✓ | Via Kable on desktop |
| Firmware Update OTA | ✓ | ✗ | Use web flasher |
| Notifications | ✓ | ✓ | Native OS notifications |
| Widgets | ✓ | ✗ | Android-only |
| AI Assistant (Chirpy) | ✓* | ✗ | Google flavor Android only |

*Chirpy AI requires Android 14+ on Google flavor builds with supported hardware.

## UI Differences

The Desktop app uses the same Compose Multiplatform UI with adaptations for larger screens and desktop interaction.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **⌘Q** / **Ctrl+Q** | Quit the application |
| **⌘,** / **Ctrl+,** | Open Settings |
| **⌘1** / **Ctrl+1** | Switch to Messages tab |
| **⌘2** / **Ctrl+2** | Switch to Nodes tab |
| **⌘3** / **Ctrl+3** | Switch to Map tab |
| **⌘4** / **Ctrl+4** | Switch to Connect tab |

### Window & System Tray

- **Window resizing** — responsive layout adapts to window dimensions
- **System tray** — minimize to system tray for background mesh operation
- **Tray menu** — right-click the tray icon to show window or quit
- **Mouse interaction** — hover states and standard desktop navigation

### Notification Preferences

The Desktop app provides in-app toggles for controlling which notifications are shown — messages, new nodes, and low battery alerts. Access these from **Settings → Notifications** within the app.

## Built-in Documentation Browser

The Desktop app includes a built-in documentation browser for quick access to help content without leaving the application.

![Docs browser with table of contents](/img/android/docs/docs-browser_toc.webp)

The browser supports full-text search across all documentation:

![Searching the docs browser](/img/android/docs/docs-browser_search.webp)

Individual doc pages render with full formatting:

![A documentation page](/img/android/docs/docs-browser_page.webp)

## Building from Source

```bash
git clone https://github.com/meshtastic/Meshtastic-Android.git
cd Meshtastic-Android
git submodule update --init
./gradlew :desktopApp:run
```

Requirements:
- JDK 21
- No Android SDK required for desktop-only builds

## Known Limitations

- No OTA firmware updates (use web flasher)
- Some Android-specific features (widgets, specific notification channels) are unavailable
- Performance may vary on low-spec hardware running Compose Desktop
- BLE bonding is not yet supported on desktop (pairing works without bonding)

## Related Topics

- [Connections](connections.md) — connection methods overview
- [Firmware Updates](firmware.md) — use the [Web Flasher](https://flasher.meshtastic.org) for desktop firmware updates

---

