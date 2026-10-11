---
title: Firmware Updates
sidebar_position: 13
last_updated: 2026-09-06
description: Update your radio firmware over Bluetooth or USB — OTA process, version channels, pre-flight checks, and recovery.
parent: User Guide
---

# Firmware Updates

Keep your Meshtastic radio up to date with the latest firmware for new features, bug fixes, and security improvements.

## Checking for Updates

1. Open the connected radio's configuration and, under **Advanced**, tap **Firmware Update**. The entry appears only for OTA-capable radios.
2. The app checks for available firmware versions.
3. Available updates show the version number and changelog summary.

## Update Methods

### OTA (Over-The-Air) via Bluetooth

The most common update method for Android users:

> ⚠️ **Warning:** Interrupting a firmware update can leave the radio unable to boot. Keep the phone nearby and both devices powered until the update completes.

1. Ensure your radio is connected via Bluetooth.
2. Navigate to the Firmware Update screen.
3. Select the desired firmware version.
4. Tap **Update**. An **Update Warning** dialog lists the pre-flight checks — read it, then tap **I know what I'm doing.** to start. This dialog appears for every update method, including Wi-Fi OTA, USB, and a local firmware file.
5. Wait for the update to complete — **do not disconnect** during the update.

![Firmware checking for updates](/img/android/docs/firmware_checking.webp)

#### Erase device during update

Where the app offers it, an **Erase device during update** checkbox appears next to the update button. It is a per-update opt-in and is never remembered.

| Method | What erasing does |
|---|---|
| BLE / Wi-Fi OTA | Factory-resets the device once the update is verified. All settings and Bluetooth pairing are removed. |
| USB | Wipes the device's flash completely, then installs the selected firmware from scratch. |

It is not offered for a local firmware file, during a recovery update, on USB devices whose board does not support the erase step, or over USB in the desktop app — the USB erase runs the Android-only maintenance sequence below. Afterwards the device needs setting up — and pairing — again.

### OTA via Wi-Fi (network-connected ESP32)

When an ESP32 radio is connected over the network rather than Bluetooth, the app offers **Wi-Fi OTA**, which pushes the same update over TCP:

1. Connect to the radio over the network (see [Connections](connections.md)).
2. Open the Firmware Update screen and pick a version.
3. Tap **Update**. Keep the radio and phone on the same network for the whole transfer.

Wi-Fi OTA takes the ESP32 `-update.bin` image rather than the `.uf2` a USB update uses; the app selects the right artifact for you.

### In-App USB Update

When your radio is connected over **USB/serial** (rather than Bluetooth), the Firmware Update screen offers **USB File Transfer**. The app reboots the device into DFU mode, then prompts you to save the `.uf2` file to the device's DFU drive using the system file picker. This option appears only on a USB/serial connection — it is not available over Bluetooth.

> ℹ️ **Note:** A vendor nRF bootloader supplied as a `.zip` (e.g. RAK WisBlock RAK4631) has to be flashed with a serial DFU tool such as `adafruit-nrfutil` — copying that `.zip` to the drive won't work. A bootloader supplied as an `update-....uf2` **can** be installed by copying it to the drive; that is how the app's own bootloader upgrade works. The app surfaces a hint when the serial-only route applies.

### Factory Erase and Bootloader Upgrade

On a **USB/serial** connection, nRF52 and RP2040 devices can be wiped as part of an update — that is the **Erase device during update** opt-in described earlier on this page. nRF52 devices additionally offer **Upgrade bootloader** where an upgraded bootloader is published for the board; RP2040 devices run no Adafruit bootloader, so they never see it.

Both are Android-only. They depend on Android's update-drive checks, so the desktop app does not show them — use the [Web Flasher](https://flasher.meshtastic.org) there instead.

Select a firmware version before either one: the app hides both until a release is chosen, because the firmware is reinstalled after the device is wiped or the new bootloader is written.

Both a USB erase and a bootloader upgrade write two files in turn, so you are asked to select the device's update drive twice: once for the erase or bootloader image, then again for the firmware.

The app reads `INFO_UF2.TXT` from the drive you select to confirm it really is the device's update drive and to identify the board before writing anything.

On nRF52 the app must already know which Bluetooth stack your device uses before it starts, because it can't read the bootloader until the device has rebooted. If it can't confirm the stack, it refuses to erase and points you at the [Web Flasher](https://flasher.meshtastic.org) instead. In the Web Flasher, choosing the wrong Bluetooth stack can leave the radio recoverable only with a hardware programmer.

Once the drive is readable, how an nRF52 device is erased depends on its bootloader:

- **Newer bootloaders erase themselves.** A bootloader that advertises factory-erase support in `INFO_UF2.TXT` (newer OTAFIX bootloaders) takes a single, board-agnostic erase file. The bootloader wipes your settings, channels, keys and the stored node list itself, leaves the installed firmware in place, and comes back as an update drive a second or two later for the firmware file. There is no Bluetooth-stack choice to get wrong on this path.
- **Older bootloaders need a Bluetooth-stack-specific erase.** On these the app writes a small erase program matched to your device's Bluetooth stack, then starts it over the serial port. If the drive reports a different stack than expected, the app refuses rather than guessing.

The app picks the path from what the drive reports; you don't choose it.

### Other Flashing Options

For recovery or when neither OTA nor in-app USB is available:
- Use the [Meshtastic Web Flasher](https://flasher.meshtastic.org)
- Or the [Meshtastic CLI tool](https://meshtastic.org/docs/getting-started/flashing-firmware) on desktop

## Version Channels

| Channel | Description |
|---------|-------------|
| Stable | Recommended for most users; tested releases |
| Alpha | Preview releases; may contain bugs |
| Local File | Flash a firmware file you select yourself, instead of a downloaded release |

## Pre-Update Checklist

Before updating:
- [ ] Battery > 50%
- [ ] Stable Bluetooth connection
- [ ] Note your current settings (they may reset on major version changes)
- [ ] Check the release notes for breaking changes
- [ ] Update the Meshtastic app itself, before or alongside firmware updates, to ensure compatibility

## Post-Update

After the firmware is written, the app verifies the update and waits for the device to come back online:

![Verifying update and waiting for the device to reconnect](/img/android/docs/firmware_verifying.webp)

Once the update succeeds:
- The radio reboots automatically
- The Bluetooth connection re-establishes
- Verify your settings are intact
- Confirm the new version under **Currently Installed** on the Firmware Update screen — it's also shown on the node's detail page and the Connections screen

![Firmware update success](/img/android/docs/firmware_success.webp)

## Troubleshooting

### Update Stuck

If the update appears frozen:
- Give it a minute. After writing the image the app waits up to **60 seconds** for the radio to come back and report its new version, so a pause at the verify step is expected.
- If it is still stuck after that, power-cycle the radio.
- Attempt the update again.

The message **Verification timed out. Device did not reconnect in time.** means the image was written but the radio did not come back within that window — power-cycle it and check the version under **Currently Installed** before re-running the update.

![Firmware update error](/img/android/docs/firmware_error.webp)

### Radio Won't Boot After Update

If the app told you the Bluetooth update could not be finished, follow the instruction it gave: connect the radio to a computer over USB and re-flash it with the vendor's serial DFU tool, such as `adafruit-nrfutil`. A stock nRF bootloader cannot reliably complete an interrupted over-the-air update.

Otherwise, if your radio fails to boot:
1. Try connecting via USB to a computer
2. Use the web flasher in recovery/DFU mode
3. Flash a known-good firmware version
4. Check the Meshtastic Discord for device-specific recovery steps

### Compatibility Warnings

On connecting, the app compares the radio's firmware against two thresholds and reacts differently to each:

| Firmware version | What you see | What happens |
|---|---|---|
| Below **2.3.15** | **Firmware update required.** | The app disconnects from the radio. It does not operate against firmware this old. |
| **2.3.15** up to, but not including, **2.5.14** | **Firmware Update Recommended.** | Advisory only — dismiss it and carry on. The dialog names the latest stable release. |
| **2.5.14** or newer | Nothing | — |

A version string the app cannot parse is ignored rather than treated as too old, so a transient read never disconnects a working radio.

## Related Topics

- [Connections](connections.md) — reconnecting after a firmware update
- [Flashing firmware guide](https://meshtastic.org/docs/getting-started/flashing-firmware) — full firmware flashing walkthrough on meshtastic.org
- [Supported devices](https://meshtastic.org/docs/hardware/devices) — check firmware compatibility by device
- [FAQ](https://meshtastic.org/docs/faq/) — common questions on meshtastic.org
