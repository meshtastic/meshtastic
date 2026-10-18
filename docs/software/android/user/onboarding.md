---
title: Getting Started
sidebar_position: 1
last_updated: 2026-08-30
description: First-launch setup — permissions, onboarding flow, and next steps after connecting your radio.
parent: User Guide
---

# Getting Started

This page covers the first-launch flow of the Meshtastic Android app, what each permission is for, and how to revisit them later.

## First Launch

When you open the app for the first time, the app guides you through an introductory flow that configures essential permissions and settings. Complete each step in order or skip it — nothing here is a one-time offer. Every permission can be reviewed and granted later from the **Permissions** section of **Settings** inside the app.

### Welcome Screen

The welcome screen introduces Meshtastic with three feature rows:

| | |
|---|---|
| **Stay Connected Anywhere** | Communicate off-the-grid with your friends and community without cell service. |
| **Create Your Own Networks** | Easily set up private mesh networks for secure and reliable communication in remote areas. |
| **Track and Share Locations** | Share your location in real-time and keep your group coordinated with integrated GPS features. |

Tap **Get started** to proceed through the setup flow.

![Welcome screen](/img/android/docs/onboarding_welcome.webp)

## Permissions

The app requests several permissions during setup. Each one serves a specific purpose, and some are required for core functionality.

### Bluetooth Permission

Bluetooth is the primary connection method between your phone and Meshtastic radio. The **Bluetooth** screen shows what the permission buys you:
- **Discovery** — find and identify Meshtastic devices near you.
- **Configuration** — wirelessly manage your device settings and channels.

On Android 12 and newer, Android asks once, for **Nearby devices**, and that one grant covers both scanning and connecting. Without it, you'll need to use USB or TCP connections instead.

### Location Permission

> ℹ️ **Note:** Location is not required for Bluetooth on Android 12 and newer. **Android 11 and older** show one location step, on the Bluetooth screen, rather than two — those releases treat a Bluetooth scan as a location capability, so the app asks for Location instead of "Nearby devices". Asking twice would push you toward the point where Android stops offering the dialog at all (a second denial on Android 11; the "Don't ask again" checkbox on Android 10 and older). On **Android 12 and newer** the two are separate: "Nearby devices" is declared `neverForLocation`, and declining Location does not stop you finding or connecting to a radio.

Meshtastic also uses your location for:
- Showing your position on the mesh map
- Calculating distances to other nodes
- Sharing your GPS coordinates with other mesh members (if enabled)

Grant **"While using the app"**. The app does not request background location — `ACCESS_BACKGROUND_LOCATION` is not in its manifest — so Android will not offer an "Always" option, and position updates happen while the app is in the foreground or running its foreground service.

Declining leaves the rest of the app working: on Android 12 and newer, Bluetooth is unaffected and only the map position and position sharing are disabled. On Android 11 and older, Bluetooth scanning also stops, because that is the permission Android gates it behind — and system **Location Services** must also be switched on for a scan to return anything.

### Notifications Permission

Notifications alert you to:
- Incoming messages from channels and direct messages
- New nodes joining the mesh
- Low battery on a remote node

> 💡 **Tip:** You can fine-tune notification preferences later in Android system settings — the app creates a separate notification channel per category (plus a few internal ones, like the background service), so you can enable or silence them individually.

### Critical Alerts Permission

Critical alerts are high-priority notifications that break through Do Not Disturb — for emergency mesh alerts and urgent messages.

This step is not a runtime permission prompt. There is no grant/deny dialog: the button opens the Android system settings page for the app's **Alerts** notification channel, where you turn the breakthrough behavior on yourself. Tap **Configure Critical Alerts** to open that page, or **Skip** to move on — you can reach the same page later from Android's notification settings for Meshtastic. This step appears only if you granted notifications on the previous screen — skip or decline them and setup ends there.

### Reviewing permissions later

The **Permissions** section of **Settings** summarizes where every runtime permission stands. On Android 12 and newer it lists five: **Nearby devices permission** (Bluetooth), **Location permission**, **App Notifications**, **Camera permission** (scanning channel and contact QR codes) and **Local network permission** (finding radios over Wi-Fi by mDNS). On Android 11 and older a single **Location permission** row covers both Bluetooth and location, so there are four. The last two are never asked for during setup, only when a feature first needs them.

The section reads *All allowed* when every permission is granted, *Nothing needs your attention* when some have simply never been asked for, and names a count when one is denied — in which case it expands itself. Tap the row to expand or collapse it at any time:

| State | What tapping the row does |
|---|---|
| **Allowed** | Opens the system page, so you can review or revoke it |
| **Not asked yet** | Requests it |
| **Denied — tap to allow** | Explains what the permission is for, then asks again if you agree |
| **Blocked — tap to open system settings** | Android will no longer show its dialog, so this opens the page where you can turn it back on |
| **Not required on this version of Android** | Nothing — the permission does not exist on your device |

This matters most for notifications. If you decline them during setup, this row is the way back: Android stops showing the dialog once you have declined firmly (a second denial), at which point this row switches to **Blocked** and sends you to the system settings page instead. The notification prompt exists only on Android 13 and newer — on older versions notifications are on by default and managed from Android's own settings.

## After Setup

After you grant permissions, the app opens the main interface. Your first action should be connecting to a Meshtastic radio — see [Connections](connections.md) for detailed instructions.

> 💡 **Tip:** If you skipped any permissions during setup, open the **Permissions** section of **Settings** in the app. Every runtime permission is listed there with its current state and a way back to it — including notifications, which the system will not prompt for a second time on its own.

Features also ask in context. On the **Connect** tab, a card above the device list explains what the Bluetooth permission is for and offers **Grant permission**; once Android stops prompting, that button becomes **Open settings**.

New to Meshtastic? The [getting started guide](https://meshtastic.org/docs/getting-started) on meshtastic.org covers hardware selection, initial radio configuration, and your first mesh setup.

## Related Topics

- [Connections](connections.md) — pair your first radio
- [Messages & Channels](messages-and-channels.md) — send your first message
- [Nodes](nodes.md) — see who else is on your mesh
- [Map & Waypoints](map-and-waypoints.md) — view node positions
- [Settings — Radio & User](settings-radio-user.md) — configure your radio and user profile
