---
title: Connections
sidebar_position: 2
last_updated: 2026-08-30
description: Connect your phone or desktop to a Meshtastic radio via Bluetooth, USB, or TCP/IP.
parent: User Guide
---

# Connections

Meshtastic supports multiple transport methods to communicate between your phone or desktop and a radio.

## Bluetooth (BLE)

Bluetooth Low Energy is the default and most common connection method on Android.

### Pairing a Radio

1. Power on your radio. Most radios advertise over Bluetooth as soon as they boot — there is no pairing mode to enter. Radios with a color touchscreen ship with Bluetooth switched off, so turn it on from the radio's own on-screen menu first.
2. Open the app and navigate to the **Connect** tab.
3. Tap **Scan for Bluetooth devices** — nearby Meshtastic radios will appear.
4. Select your radio from the list.
5. Android asks you to pair. If your radio has a screen, it shows a six-digit PIN — type that into the Android dialog. If your radio has no screen, the PIN is `123456`.

![Scanning for Bluetooth devices, with a discovered radio in the list](/img/android/docs/connections_bluetooth_scan.webp)

You can change the pairing method, or turn Bluetooth on for a radio that ships with it off, under **Settings → Device configuration → Bluetooth** — see [Settings — Radio & User](settings-radio-user.md). For more information, see [Bluetooth configuration](https://meshtastic.org/docs/configuration/radio/bluetooth) on meshtastic.org.

Use the transport selector — a segmented button row below the connection card — to switch between the Bluetooth, Network, and USB transports (one is active at a time):

![Connections screen with the transport selector showing Bluetooth, Network, and USB](/img/android/docs/connections_transport_filters.webp)

> 💡 **Tip:** If your radio doesn't appear, check that it isn't already connected to another phone, or out of range.

The screen names anything on the app's side that is blocking a scan, with the fix attached:

| What you see | What it means |
|---|---|
| A card asking for **Nearby devices** | The permission has not been granted. **Grant permission** requests it; once Android stops prompting, the button becomes **Open settings**. |
| **Bluetooth is off** | The adapter is disabled — the card opens Bluetooth settings. |
| **Bluetooth scanning also needs location services** | Android 11 and older only: the permission is held but the system location toggle is off. |
| No card, empty list | Nothing on this side is blocking the scan — the radio is out of range, off, or already connected elsewhere. |

The explanation lives in that card, not in the scan control: tapping **Scan for Bluetooth devices** after you have declined once asks Android again directly.

### Connection Status

| Icon | State | Description |
|------|-------|-------------|
| 🟢 | Connected | Active radio link established |
| 🟡 | Connecting | Handshake in progress |
| 🔴 | Disconnected | No active connection. The app retries automatically, with a growing delay between attempts |
| ⚪ | Device sleeping | The radio is in light sleep — the app is waiting for it to wake and reconnect, not failing |

These are the four states the app models. "Device sleeping" is normal on power-saving configurations and needs no action.

When connecting, a status indicator shows the current connection state — tap **Stop Connecting** to abandon the attempt:

![Connecting status](/img/android/docs/connections_connecting.webp)

If no devices are found, the app shows an empty state with instructions:

![No devices found](/img/android/docs/connections_empty_state.webp)

### Troubleshooting Bluetooth

- **Radio not found:** Turn Bluetooth off and back on. On Android 11 and older, also check that system location services are switched on — those releases do not return scan results without them.
- **Bluetooth scan couldn't start:** Try again, and toggle Bluetooth off and on if it repeats.
- **Connection drops:** Move closer to the radio; check for interference.
- **Pairing failed, or pairing did not complete:** Check that the **Nearby devices** permission is granted, then pair again.
- **Pairing rejected:** Forget the device in Android Bluetooth settings and retry.
- **Could not establish a stable connection after repeated attempts:** The app stopped retrying after three failed handshakes — a radio that keeps failing here is usually crashing on reconnect. Power-cycle the radio, then tap it again on the **Connect** tab to start a fresh attempt.

## USB Serial

USB connections provide a wired alternative, useful for desktop or when Bluetooth is unavailable.

### Setup

1. Connect your radio to your phone with a USB data cable. Charge-only cables carry no data lines, and a radio on one never appears in the list.
2. The app prompts for USB permission — tap **Allow**.
3. The connection is established automatically.

> ℹ️ **Note:** USB connections require OTG support on Android devices.

### Troubleshooting USB

- **USB permission denied:** Unplug the radio and plug it back in — Android asks again on reconnect.
- **No radio in the list:** Check that the cable carries data rather than only power, and that the phone supports OTG.

## TCP/IP (Network)

Some Meshtastic radios support Wi-Fi/Ethernet connectivity, allowing TCP-based connections over your local network. Get the radio onto your network first. Connect to it over Bluetooth or USB, open **Settings → Device configuration → Network**, and under **Wi-Fi Options** turn on **Wi-Fi enabled** and enter the **SSID** and **Password**. The Network screen appears only for radios whose hardware supports Wi-Fi or Ethernet. Once the radio has an address, come back and connect to it over the network.

### Connecting over the Network

1. Make sure the radio is on the same local network as your phone/desktop.
2. On the **Connect** tab, select **Network** in the transport selector.
3. Choose the radio one of two ways:
   - **Scan for network devices** — toggle this on to auto-discover radios that advertise themselves on the local network (mDNS / `_meshtastic._tcp`). Discovered devices appear in the list; tap one to connect.
   - **Add device manually…** — enter the radio's IP address (or hostname) and port (default: `4403`).
4. Previously-used network addresses are remembered under **Recent Network Devices** for quick reconnection (touch & hold to remove one).

Network discovery uses mDNS, which only works when both your phone and the radio are on the same subnet. If the phone is not on Wi-Fi at all, the app warns that a network scan may find nothing. On Android 17 and newer, the app needs the **Local network permission** to reach a radio on your own Wi-Fi at all — not only to discover it — so typing the address by hand does not work around a denied permission. Grant it from the card on the Network pane, or from the **Permissions** section of **Settings**. A radio on a public address, or one reached over a VPN, needs no permission.

### When to Use TCP

- Radio is on the same local network
- Testing with a simulated radio
- Environments where Bluetooth has interference issues

### Wi-Fi Provisioning for mPWRD-OS

**Settings → Wi-Fi Provisioning for mPWRD-OS** is a separate, narrower tool. It sends Wi-Fi credentials over Bluetooth to **mPWRD-OS** devices only, using their own protocol — it does not configure Wi-Fi on an ordinary Meshtastic radio. It is available on both Android and desktop.

1. Open the screen and wait while the app finds the device over Bluetooth.
2. Tap **Scan for Networks**, then pick a network from **Available Networks** — or turn on **Hidden network** and type the name into **Network Name (SSID)**.
3. Enter the **Password** and tap **Apply**.

If the scan reports **No networks found** or fails outright, move the phone closer to the device and scan again. If **Failed to apply Wi-Fi configuration** comes back, check the password and try again.

## After Your First Connection

Being connected is not the same as being able to transmit.

A radio leaves the factory with no LoRa region set, and it does not transmit until you set one. When you connect such a radio, the **Connect** tab shows a **Set your region** card; tap it to open the LoRa screen and choose the region you are in.

Once the region is set, the tab warns you if the radio is receive-only: a **Transmit is disabled** card, reading "This device can receive but will not send anything over LoRa." Tap it to open the same screen and turn **Transmit Enabled** back on. Only one of the two cards appears at a time — an unset region already stops the radio transmitting, so the app names that first and holds the transmit card back until you have set a region.

For more information, see [Settings — Radio & User](settings-radio-user.md#lora-config).

## Reconnection Behavior

The app reconnects to the last selected radio on startup. You can switch transports from the **Connect** tab at any time.

To disconnect, tap the disconnect button on the **Connect** tab:

![Disconnect from radio](/img/android/docs/connections_disconnect.webp)

## Desktop Connections

On Desktop (Linux/macOS/Windows), the app supports:
- **Bluetooth (BLE)** — via the Kable library; works on macOS, Linux, and Windows
- **USB Serial** — primary wired connection method
- **TCP/IP** — for network-connected radios

See [Desktop App](desktop.md) for platform-specific details and keyboard shortcuts.

## Related Topics

- [Getting Started](onboarding.md) — first-launch setup and permissions
- [Settings — Radio & User](settings-radio-user.md) — Bluetooth, region, and network configuration
- [Messages & Channels](messages-and-channels.md) — send your first message once the radio is connected
- [Nodes](nodes.md) — see who else is on your mesh
- [Desktop App](desktop.md) — desktop-specific connection details
- [Supported devices](https://meshtastic.org/docs/hardware/devices) — full list of compatible radios on meshtastic.org
