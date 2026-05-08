---
title: Bluetooth Device Connection
parent: User Guide
nav_order: 2
---

# Bluetooth Device Connection

The Meshtastic app connects to your radio over Bluetooth Low Energy (BLE). You can manage multiple radios and switch between them without re-pairing.

## Connecting a Radio

1. Power on your Meshtastic radio.
2. Open the app and tap the **Connect** tab.
3. The app scans for nearby devices automatically when you are not connected.
4. Tap your device name in the list to connect.

The app remembers your preferred device and reconnects automatically when the radio is in range.

## Disconnecting a Radio

Swipe left on a connected radio in the Connect view and tap **Disconnect**. The radio continues operating on the mesh — it just stops syncing with the app.

## Live Activity

Long press a connected radio row to start a Live Activity (iOS 16.2+). The Live Activity shows mesh status on your Lock Screen and in Dynamic Island.

## Managing Multiple Radios

You can pair multiple radios but only one is active at a time. Switch between them by tapping a different device in the Connect view.

## Connection Status Icons

| Icon | Meaning |
|------|---------|
| ![BLE connected](/img/apple/btConnected.png) | Connected via BLE |
| ![Reconnecting](/img/apple/btReconnecting.png) | Reconnecting / retrying |
| ![TCP connected](/img/apple/tcpConnected.png) | Connected via TCP/IP |
| ![Serial connected](/img/apple/serialConnected.png) | Connected via serial (macOS) |

## Troubleshooting

**Radio not appearing in the list**
- Ensure Bluetooth is enabled in iOS Settings → Bluetooth.
- Move within 10 metres of the radio.
- Restart the radio.

**Connection drops repeatedly**
- Check battery level on the radio.
- Try forgetting the device in iOS Settings → Bluetooth and reconnecting.

**App asks for Bluetooth permission**
- Grant permission in iOS Settings → Privacy & Security → Bluetooth → Meshtastic.

---

{: .tip }
> **Tip — Connected Radio**
> Swipe left to disconnect. Long press to start the Live Activity.
