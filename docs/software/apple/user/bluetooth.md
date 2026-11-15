---
title: Bluetooth Device Connection
parent: User Guide
sidebar_position: 2
---

# Bluetooth Device Connection

The Meshtastic app connects to your radio over Bluetooth Low Energy (BLE). You can manage multiple radios and switch between them without re-pairing.

## Connecting a Radio

1. Power on your Meshtastic radio.
2. Open the app and tap the **Connect** tab.
3. The app scans for nearby devices automatically when you are not connected.
4. Tap your device name in the list to connect.

The app remembers your preferred device and reconnects automatically when the radio is in range.

A radio that connects with no LoRa region set opens the radio setup flow (region, preset and name). **Set Up Radio** on the Connect screen opens it again any time; see [Getting Started](getting-started.md#step-3-set-up-your-radio).

## Disconnecting a Radio

Swipe left on a connected radio in the Connect view and tap **Disconnect**. The radio continues operating on the mesh — it just stops syncing with the app.

## Powering Off a Radio

Long press a connected radio row and choose **Power Off** to shut the radio down completely. Unlike **Disconnect** — which only stops the app from syncing — Power Off turns the radio off entirely, and you must physically power it back on to use it again.

Because that is hard to undo on a roof, tower, or other remote node, the app asks you to confirm before sending the shutdown, so an accidental tap (or a misplaced finger) won't power the device off.

## Live Activity

A Live Activity keeps the mesh on your Lock Screen and in the Dynamic Island. It shows one of two things, chosen when you start it:

- **Mesh status** — the connection, nodes online, unread messages and the radio's battery.
- **One node** — its battery, signal, when it was last heard and how far away it is.

Tap **Widgets** on the Connect screen while a radio is connected, choose what to show (for a node, tap **Node** and pick it from the list; favorites come first), and tap **Start Live Activity**. You can also open a node and choose **Track in Live Activity**.

Only one runs at a time; starting the other kind switches it. Stop it from the same **Widgets** sheet, or from the node's detail screen.

If the radio's link drops, the Live Activity shows **Disconnected** and picks up again when the app reconnects. Disconnecting the radio yourself, or switching to a different radio, ends it. iOS stops updating a Live Activity after 8 hours, and the Connect screen shows when that will be.

On iOS 18 and later, a running Live Activity also appears in the Smart Stack on a paired Apple Watch, and on iOS 26 on the CarPlay Dashboard.

### Widgets and controls

The same **Widgets** sheet lists the Meshtastic Home Screen and Lock Screen widgets (Mesh Status, Node Tracker, Messages, Node Map and Trace Route) and the Control Center controls, and shows which ones are on your screens. iOS doesn't let an app place a widget or a control, so the sheet gives the steps. On the Home Screen, touch and hold an empty spot, tap **Edit**, then **Add Widget**, and search for Meshtastic. On the Lock Screen, touch and hold it, tap **Customize**, then **Lock Screen**, tap the widget area and choose Meshtastic.

A Node Tracker widget keeps showing the node it's set to, however long ago the node was heard. If that node is deleted, or you switch to a radio that doesn't have it, the widget keeps its name and says it's no longer in your node list; touch and hold the widget to choose another node, or it fills in again when the node is next heard. Deleting a node that's on a Node Tracker widget says so in the confirmation.

## Managing Multiple Radios

You can pair multiple radios but only one is active at a time. Switch between them by tapping a different device in the Connect view.

When you switch radios, the app restores the last saved local database for that radio if one exists, then reconnects and resumes syncing with the newly active device. After the new radio finishes its initial config handshake, the app first reapplies the bundled Meshtastic hardware catalog that ships with the app, then refreshes the same catalog from the Meshtastic API in the background so hardware names, images, and firmware-target metadata stay current.

## BLE Signal Strength

The app displays the Bluetooth signal strength of nearby devices during scanning:

![BLE Signal Strength](/img/apple/bleSignalStrength.webp)

## Connection Status Icons

| Icon | Meaning |
|------|---------|
| ![BLE connected](/img/apple/btConnected.webp) | Connected via BLE |
| ![Reconnecting](/img/apple/btReconnecting.webp) | Reconnecting / retrying |
| ![TCP connected](/img/apple/tcpConnected.webp) | Connected via TCP/IP |
| ![Serial connected](/img/apple/serialConnected.webp) | Connected via serial (macOS) |

## Troubleshooting

**Radio not appearing in the list**
- Ensure Bluetooth is enabled in iOS Settings → Bluetooth. If Bluetooth is off, the Connect tab's Available Radios section shows a "Bluetooth is off" row — tap it to jump straight to Settings.

  ![Bluetooth is off row](/img/apple/bluetoothOff.webp)
- Move within 10 meters of the radio.
- Restart the radio.
- The app continuously listens for BLE advertisements — nearby radios should appear within a few seconds. If a device disappears from the list, it will reappear automatically when next heard.

**Connection drops repeatedly**
- Check battery level on the radio.
- Try forgetting the device in iOS Settings → Bluetooth and reconnecting.

**App asks for Bluetooth permission**
- Grant permission in iOS Settings → Privacy & Security → Bluetooth → Meshtastic.

**Apple Vision Pro: pairing stops where the PIN would go**
- visionOS can't enter a Bluetooth PIN, so a radio set to a Random or Fixed PIN can't pair with the headset. The Connect screen says so when it happens.
- Set the radio's Bluetooth pairing mode to **No PIN (Just Works)** from another device (Settings → Bluetooth in the app on an iPhone, iPad or Mac), then connect again.

---

:::tip Connected Radio
Swipe left to disconnect. Long press for more options, such as powering off the radio (you'll be asked to confirm).
:::
