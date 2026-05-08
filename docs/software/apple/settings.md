---
title: Settings
parent: User Guide
nav_order: 7
---

# Settings

The Settings tab lets you configure the app and your connected Meshtastic radio.

## App Settings

General app preferences including map style, notification behaviour, and theme. These affect only the app — not the radio.

## Radio Configuration

Radio configuration requires a connected node. Select your node from the **Configure** section if you have multiple nodes.

### LoRa

LoRa settings control how your radio communicates on the mesh:

| Setting | Description |
|---------|-------------|
| Region | Your geographical region. **Must be set correctly** — using the wrong region is illegal and prevents communication with local nodes. |
| Modem Preset | Speed/range trade-off. Most users should use Long Fast or Long Slow. |
| Hop Limit | The number of times a message is repeated by other nodes. Higher values increase range but also mesh traffic. |
| Frequency Slot | Fine-tune the exact frequency within your region. |

### Channels

Manage up to 8 channels (0–7). Channel 0 is the primary broadcast channel. Additional channels create isolated messaging groups with their own encryption keys.

### Security

Configure PKI (Public Key Infrastructure) encryption for direct messages. Requires firmware 2.5+.

### User

Set your Long Name (display name) and Short Name (4-character/emoji identifier shown in the node circle).

### Bluetooth

BLE radio settings including PIN mode and power saving. Changes apply on next radio restart.

### Device

Device role, serial output, debug log streaming, and node info broadcast interval.

### Display

Screen timeout, auto-carousel of screens, flip screen for alternate mounting orientations, and OLED contrast.

### Network

Wi-Fi SSID/password for TCP connection, NTP server, and Ethernet (supported hardware only).

### Position

GPS update interval, position precision, and smart position broadcasting. Enable **Broadcast Position** to share your location with the mesh.

### Power

Battery saving profiles, sleep modes, and minimum wake time. Critical for solar-powered router nodes.

## Module Configuration

Optional feature modules. Only available when your connected node supports the module.

| Module | Description |
|--------|-------------|
| Ambient Lighting | Control NeoPixel/LED lighting on supported hardware. |
| Canned Messages | Pre-programmed message shortcuts accessible from the device buttons. |
| Detection Sensor | Configure PIR motion or contact sensors. |
| External Notification | Buzzer or LED alerts for incoming messages. |
| MQTT | Uplink/downlink messages to an MQTT broker for internet bridging. |
| Range Test | Automated range testing with position logging. |
| Pax Counter | Anonymised foot-traffic counting via Bluetooth/Wi-Fi probe detection. |
| Ringtone | Custom RTTTL melodies for notification tones. |
| Store & Forward | Store packets for nodes that are temporarily offline. |
| Serial | UART serial output for integration with other hardware. |
| Telemetry | Device, environment, and air-quality sensor reporting. |

## Firmware Updates

Check for and apply OTA firmware updates to your connected radio directly from the app. See [Firmware Updates](firmware.md) for full details.
