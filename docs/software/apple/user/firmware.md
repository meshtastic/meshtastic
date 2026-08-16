---
title: Firmware Updates
parent: User Guide
sidebar_position: 5
---

# Firmware Updates

The app can check for and install Meshtastic firmware updates directly on your connected radio over Bluetooth.

## Checking for Updates

1. Connect to your radio.
2. Go to **Settings → Firmware Updates**.
3. The app shows the firmware version currently running on your radio and the latest stable release available from GitHub.

When you connect to a node running firmware older than the latest stable release, the app can send a firmware update notification. For hardware the app can update directly, tapping the notification opens **Firmware Updates** so you can review and start the OTA update. For hardware that needs an external updater, the notification tells you to use **Meshtastic Flasher** instead.

The app remembers each node, hardware target, and stable version it has already notified you about, so it will not keep sending the same reminder.

## Installing an Update

1. Tap **Update Firmware** when a newer version is available.
2. The app downloads the correct firmware binary for your hardware.
3. The radio enters update mode (DFU) and the new firmware is transferred over BLE.
4. The radio reboots automatically when the update completes.

For ESP32 BLE updates, the app waits for the radio's final verification response before showing success. If the radio reports an error or does not send the final success response, the app keeps the update in a failed state instead of treating the upload as complete.

| Icon | Progress | Description |
|------|----------|-------------|
| ![0%](/img/apple/progressZero.webp) | Starting | Update initiating — firmware binary downloading. |
| ![50%](/img/apple/progressHalf.webp) | In Progress | Firmware transfer in progress over BLE. |
| ![Complete](/img/apple/progressComplete.webp) | Complete | Transfer finished — radio is rebooting. |
| ![Error](/img/apple/progressError.webp) | Error | Update failed — see Troubleshooting below. |

**Do not close the app or move out of Bluetooth range during a firmware update.**

## During the Transfer

While a supported OTA transfer is active, tap **Play Chirpy Hop** to play without leaving the updater. Firmware progress remains visible above the game, and the back button returns to the normal update screen at any time. Keep the Meshtastic app in the foreground until the update finishes.

## Update Channels

| Channel | Description |
|---------|-------------|
| Stable | Recommended for most users. Tested releases. |
| Alpha | Early access — may contain bugs. Use on secondary/test devices only. |

Select the update channel in **Settings → App Settings → Firmware Channel**.

## Event Firmware

Some radios ship with special **event firmware** for gatherings like DEF CON, Open Sauce, Hamvention, or Burning Man. When you connect to a device running event firmware, the **Connect** screen shows an event badge with the event's name and a welcome message, tinted in the event's accent color.

Tap the badge to open the **event info sheet**, which shows the event's location, dates, useful links, and the event firmware build. From there you can:

- Start a **firmware update** for the connected radio.
- Toggle **Use Event Theme** to turn the ambient accent wash (and event fonts, where available) on or off. Turning it off keeps the event badge visible so you can re-enable it later.

New-node notifications are automatically muted while you're connected to event firmware (events are busy — many nodes appear at once) and restored when you return to standard firmware.

**After the event:** once an event's end date has passed, the Connect screen shows a reminder to return to standard Meshtastic firmware. Tap it to open the firmware update flow. The reminder clears automatically once the device is back on standard firmware.

Event details are fetched from Meshtastic's servers with an offline fallback, so a newly announced event can appear without an app update.

## Troubleshooting

**Update fails mid-way**
- Keep the radio within 1–2 meters of your phone during the update.
- If the radio appears bricked after a failed update, it can usually be recovered using the [Meshtastic Flasher](https://flasher.meshtastic.org/) on a computer.

![Incompatible firmware version warning](/img/apple/invalidVersion.webp)

![Security update recommended](/img/apple/securityVersionNag.webp)

**Radio not appearing in firmware list**
- The firmware update feature requires a connected radio (BLE or TCP).
- Some older radios do not support OTA updates. Check the [hardware compatibility list](https://meshtastic.org/docs/hardware/).

**Version shown as unknown**
- Ensure the radio has fully connected and synced (usually takes 5–10 seconds after BLE connection is established).
