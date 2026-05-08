---
title: Deep Links
parent: Developer Guide
nav_order: 8
---

# Deep Links

The app registers the `meshtastic:///` URL scheme. Use `Router.route(url:)` to handle incoming URLs. Deep links work from Safari, Shortcuts, Siri Intents, and other apps.

## Adding a New Deep Link

1. Add a case to the appropriate `*NavigationState` enum in `Meshtastic/Router/NavigationState.swift`.
2. Update `Router`'s routing helpers in `Meshtastic/Router/Router.swift`.
3. Document the URL in the table below.

## Messages

| URL | Description |
|-----|-------------|
| `meshtastic:///messages` | Messages tab |
| `meshtastic:///messages?channelId={channelId}&messageId={messageId}` | Channel messages (`messageId` is optional) |
| `meshtastic:///messages?userNum={userNum}&messageId={messageId}` | Direct messages (`messageId` is optional) |

## Connect

| URL | Description |
|-----|-------------|
| `meshtastic:///connect` | Connect tab |

## Nodes

| URL | Description |
|-----|-------------|
| `meshtastic:///nodes` | Nodes tab |
| `meshtastic:///nodes?nodenum={nodenum}` | Selected node |

## Mesh Map

| URL | Description |
|-----|-------------|
| `meshtastic:///map` | Map tab |
| `meshtastic:///map?nodenum={nodenum}` | Node on map |
| `meshtastic:///map?waypointId={waypointId}` | Waypoint on map |

## Settings

No parameters are supported for settings URLs.

| URL | Description |
|-----|-------------|
| `meshtastic:///settings/about` | About Meshtastic |
| `meshtastic:///settings/appSettings` | App Settings |
| `meshtastic:///settings/helpDocs` | Help & Documentation |
| `meshtastic:///settings/routes` | Routes |
| `meshtastic:///settings/routeRecorder` | Route Recorder |
| **Radio Config** | |
| `meshtastic:///settings/lora` | LoRa Config |
| `meshtastic:///settings/channels` | Channels |
| `meshtastic:///settings/security` | Security Config |
| `meshtastic:///settings/shareQRCode` | Share QR Code |
| **Device Config** | |
| `meshtastic:///settings/user` | User Config |
| `meshtastic:///settings/bluetooth` | Bluetooth Config |
| `meshtastic:///settings/device` | Device Config |
| `meshtastic:///settings/display` | Display Config |
| `meshtastic:///settings/network` | Network Config |
| `meshtastic:///settings/position` | Position Config |
| `meshtastic:///settings/power` | Power Config |
| **Module Config** | |
| `meshtastic:///settings/ambientLighting` | Ambient Lighting |
| `meshtastic:///settings/cannedMessages` | Canned Messages |
| `meshtastic:///settings/detectionSensor` | Detection Sensor |
| `meshtastic:///settings/externalNotification` | External Notification |
| `meshtastic:///settings/mqtt` | MQTT |
| `meshtastic:///settings/paxCounter` | Pax Counter |
| `meshtastic:///settings/rangeTest` | Range Test |
| `meshtastic:///settings/ringtone` | Ringtone |
| `meshtastic:///settings/serial` | Serial |
| `meshtastic:///settings/storeAndForward` | Store & Forward |
| `meshtastic:///settings/telemetry` | Telemetry |
| **TAK** | |
| `meshtastic:///settings/tak` | TAK Config |
| **Logging** | |
| `meshtastic:///settings/debugLogs` | Debug Logs |
| **Developers** | |
| `meshtastic:///settings/appFiles` | App Files |
| `meshtastic:///settings/firmwareUpdates` | Firmware Updates |
