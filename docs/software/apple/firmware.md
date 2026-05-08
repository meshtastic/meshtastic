---
title: Firmware Updates
parent: User Guide
nav_order: 5
---

# Firmware Updates

The app can check for and install Meshtastic firmware updates directly on your connected radio over Bluetooth.

## Checking for Updates

1. Connect to your radio.
2. Go to **Settings → Firmware Updates**.
3. The app shows the firmware version currently running on your radio and the latest stable release available from GitHub.

## Installing an Update

1. Tap **Update Firmware** when a newer version is available.
2. The app downloads the correct firmware binary for your hardware.
3. The radio enters update mode (DFU) and the new firmware is transferred over BLE.
4. The radio reboots automatically when the update completes.

| Icon | Progress | Description |
|------|----------|-------------|
| ![0%](/img/apple/progressZero.png) | Starting | Update initiating — firmware binary downloading. |
| ![50%](/img/apple/progressHalf.png) | In Progress | Firmware transfer in progress over BLE. |
| ![Complete](/img/apple/progressComplete.png) | Complete | Transfer finished — radio is rebooting. |
| ![Error](/img/apple/progressError.png) | Error | Update failed — see Troubleshooting below. |

**Do not close the app or move out of Bluetooth range during a firmware update.**

## Update Channels

| Channel | Description |
|---------|-------------|
| Stable | Recommended for most users. Tested releases. |
| Alpha | Early access — may contain bugs. Use on secondary/test devices only. |

Select the update channel in **Settings → App Settings → Firmware Channel**.

## Troubleshooting

**Update fails mid-way**
- Keep the radio within 1–2 metres of your phone during the update.
- If the radio appears bricked after a failed update, it can usually be recovered using the [Meshtastic Flasher](https://flasher.meshtastic.org/) on a computer.

![Incompatible firmware version warning](/img/apple/invalidVersion.png)

**Radio not appearing in firmware list**
- The firmware update feature requires a connected radio (BLE or TCP).
- Some older radios do not support OTA updates. Check the [hardware compatibility list](https://meshtastic.org/docs/hardware/).

**Version shown as unknown**
- Ensure the radio has fully connected and synced (usually takes 5–10 seconds after BLE connection is established).
