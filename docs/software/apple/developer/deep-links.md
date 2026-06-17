---
title: Deep Links
parent: Developer Guide
sidebar_position: 8
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
| [`meshtastic:///messages`](meshtastic:///messages) | Messages tab |
| `meshtastic:///messages?channelId={channelId}&messageId={messageId}` | Channel messages (`messageId` is optional) |
| `meshtastic:///messages?userNum={userNum}&messageId={messageId}` | Direct messages (`messageId` is optional) |

## Connect

| URL | Description |
|-----|-------------|
| [`meshtastic:///connect`](meshtastic:///connect) | Connect tab |

## Nodes

| URL | Description |
|-----|-------------|
| [`meshtastic:///nodes`](meshtastic:///nodes) | Nodes tab |
| `meshtastic:///nodes?nodenum={nodenum}` | Selected node |

## Mesh Map

| URL | Description |
|-----|-------------|
| [`meshtastic:///map`](meshtastic:///map) | Map tab |
| `meshtastic:///map?nodenum={nodenum}` | Node on map |
| `meshtastic:///map?waypointId={waypointId}` | Waypoint on map |

## Settings

No parameters are supported for settings URLs.

| URL | Description |
|-----|-------------|
| [`meshtastic:///settings/about`](meshtastic:///settings/about) | About Meshtastic |
| [`meshtastic:///settings/appSettings`](meshtastic:///settings/appSettings) | App Settings |
| [`meshtastic:///settings/helpDocs`](meshtastic:///settings/helpDocs) | Help & Documentation |
| [`meshtastic:///settings/routes`](meshtastic:///settings/routes) | Routes |
| [`meshtastic:///settings/routeRecorder`](meshtastic:///settings/routeRecorder) | Route Recorder |
| **Radio Config** | |
| [`meshtastic:///settings/lora`](meshtastic:///settings/lora) | LoRa Config |
| [`meshtastic:///settings/channels`](meshtastic:///settings/channels) | Channels |
| [`meshtastic:///settings/security`](meshtastic:///settings/security) | Security Config |
| [`meshtastic:///settings/shareQRCode`](meshtastic:///settings/shareQRCode) | Share QR Code |
| **Device Config** | |
| [`meshtastic:///settings/user`](meshtastic:///settings/user) | User Config |
| [`meshtastic:///settings/bluetooth`](meshtastic:///settings/bluetooth) | Bluetooth Config |
| [`meshtastic:///settings/device`](meshtastic:///settings/device) | Device Config |
| [`meshtastic:///settings/display`](meshtastic:///settings/display) | Display Config |
| [`meshtastic:///settings/network`](meshtastic:///settings/network) | Network Config |
| [`meshtastic:///settings/position`](meshtastic:///settings/position) | Position Config |
| [`meshtastic:///settings/power`](meshtastic:///settings/power) | Power Config |
| **Module Config** | |
| [`meshtastic:///settings/ambientLighting`](meshtastic:///settings/ambientLighting) | Ambient Lighting |
| [`meshtastic:///settings/cannedMessages`](meshtastic:///settings/cannedMessages) | Canned Messages |
| [`meshtastic:///settings/detectionSensor`](meshtastic:///settings/detectionSensor) | Detection Sensor |
| [`meshtastic:///settings/externalNotification`](meshtastic:///settings/externalNotification) | External Notification |
| [`meshtastic:///settings/mqtt`](meshtastic:///settings/mqtt) | MQTT |
| [`meshtastic:///settings/paxCounter`](meshtastic:///settings/paxCounter) | Pax Counter |
| [`meshtastic:///settings/rangeTest`](meshtastic:///settings/rangeTest) | Range Test |
| [`meshtastic:///settings/ringtone`](meshtastic:///settings/ringtone) | Ringtone |
| [`meshtastic:///settings/serial`](meshtastic:///settings/serial) | Serial |
| [`meshtastic:///settings/storeAndForward`](meshtastic:///settings/storeAndForward) | Store & Forward |
| [`meshtastic:///settings/telemetry`](meshtastic:///settings/telemetry) | Telemetry |
| **TAK** | |
| [`meshtastic:///settings/tak`](meshtastic:///settings/tak) | TAK Config |
| **Logging** | |
| [`meshtastic:///settings/debugLogs`](meshtastic:///settings/debugLogs) | Debug Logs |
| **Developers** | |
| [`meshtastic:///settings/appFiles`](meshtastic:///settings/appFiles) | App Files |
| [`meshtastic:///settings/tools`](meshtastic:///settings/tools) | Tools (iOS 18+) |
| [`meshtastic:///settings/coreDataBrowser`](meshtastic:///settings/coreDataBrowser) | Data Browser (DEBUG only) |
| [`meshtastic:///settings/firmwareUpdates`](meshtastic:///settings/firmwareUpdates) | Firmware Updates |
