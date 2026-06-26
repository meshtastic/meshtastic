---
title: Settings — Modules & Admin
sidebar_position: 8
last_updated: 2026-05-20
description: Configure optional feature modules (MQTT, telemetry, canned messages, TAK, and more) and perform device administration.
parent: User Guide
---

# Settings — Modules & Admin

Configure optional feature modules and perform device administration. Modules extend Meshtastic with specialized capabilities — each can be independently enabled or disabled.

> 💡 **Tip:** You only need to enable the modules you actually use. Disabling unused modules reduces airtime, saves battery, and simplifies your configuration.

Module settings use a card-based layout with toggle switches, dropdowns, text fields, and sliders:

![Toggle switch](/img/android/docs/settings_switch.webp)

![Dropdown selector](/img/android/docs/settings_dropdown.webp)

![Text field](/img/android/docs/settings_text_field.webp)

![Settings card layout](/img/android/docs/settings_titled_card.webp)

## Module Configuration

### MQTT Module

Bridges mesh messages to and from an MQTT broker for internet connectivity. This is how you extend your mesh beyond radio range or integrate with home automation systems.

| Setting | Description |
|---------|-------------|
| Enabled | Toggle MQTT bridge |
| Server | MQTT broker address |
| Username | Authentication username |
| Password | Authentication password |
| Encryption | Encrypt MQTT payloads |
| ~~JSON Output~~ | ⚠️ **Deprecated** — JSON support removed from firmware; field is ignored |
| TLS | Use secure connection |
| Root Topic | Base MQTT topic path |
| Map Report | Publish position for public map |

See [MQTT](mqtt.md) for a detailed usage guide including encryption, privacy, and broker setup.

### Serial Module

Enables serial port communication for external device integrations (GPS modules, sensors, or custom hardware). When enabled, the node's serial port can send and receive protobuf or text data, allowing external microcontrollers or computers to interact with the mesh.

| Setting | Description |
|---------|-------------|
| Enabled | Activate serial communication |
| Echo | Echo received serial data back |
| Mode | Text, Protobuf, or NMEA output |
| RX/TX Pins | GPIO pins for serial connection |
| Baud Rate | Serial communication speed |

### External Notification Module

Controls buzzer, LED, or vibration alerts on your radio hardware. Useful for devices that need to physically signal when a message arrives — particularly helpful for unattended or outdoor installations.

| Setting | Description |
|---------|-------------|
| Enabled | Activate notifications |
| Alert Message | Notify on incoming messages |
| Alert Message Buzzer | Use buzzer for messages |
| Alert Message Vibra | Use vibration for messages |
| Alert Bell | Notify on bell character |
| Output (GPIO) | Pin for notification output |
| Active | High or Low active |
| Duration (ms) | Notification length |
| Use I2S as Buzzer | Use I2S audio output |

### Store & Forward Module

Buffers messages for nodes that were temporarily offline, then replays them when those nodes reconnect. Essential for meshes where nodes go in and out of range regularly — ensures messages aren't lost during brief disconnections.

| Setting | Description |
|---------|-------------|
| Enabled | Activate store and forward |
| Heartbeat (s) | Announcement interval |
| Records | Maximum stored messages |
| History Return (max) | Max messages to replay |
| History Return (window) | Time window for replay |

> 💡 **Tip:** Store and Forward works best on nodes with ample memory (ESP32 with PSRAM). Router nodes are ideal candidates since they're typically always-on.

### Range Test Module

Automated range testing tool for evaluating link quality between nodes. When enabled, the node periodically transmits test messages with incrementing counters. A receiver node logs these messages, allowing you to walk or drive away and later analyze at what distance messages stopped arriving.

| Setting | Description |
|---------|-------------|
| Enabled | Activate range testing |
| Sender Interval (s) | Time between test transmissions |
| Save CSV | Log received test data to SD card |

### Telemetry Module

Controls what telemetry data your node shares with the mesh. Telemetry includes device health (battery, uptime) and environmental sensor data (temperature, humidity, pressure).

| Setting | Description |
|---------|-------------|
| Device Metrics Interval | How often to report device metrics |
| Environment Metrics Interval | How often to report environment sensors |
| Air Quality Enabled | Report particulate sensor data |
| Power Metrics Enabled | Report power usage |

See [Telemetry & Sensors](telemetry-and-sensors.md) for supported sensors and configuration recommendations.

### Canned Message Module

Pre-configured messages accessible from the device's physical buttons (for radios with rotary encoders, keypads, or similar input hardware). Define a list of quick-send messages that can be transmitted without a phone connected — ideal for field use.

| Setting | Description |
|---------|-------------|
| ~~Enabled~~ | ⚠️ **Deprecated** — current firmware may ignore this toggle |
| Messages | Newline-separated list of messages |
| Send Bell | Play bell sound on send |
| Rotary Encoder | Enable rotary encoder input |
| Up/Down/Press Pins | GPIO pin assignments for input |

### Audio Module

Codec2 audio support for low-bandwidth voice communication over the mesh. This is an **experimental** feature that encodes voice into very small data packets using the Codec2 codec.

| Setting | Description |
|---------|-------------|
| Enabled | Activate audio module |
| Codec2 Rate | Audio quality/bandwidth tradeoff |
| I2S Word Select | GPIO pin for I2S WS |
| I2S Data In | GPIO pin for I2S DIN |
| I2S Data Out | GPIO pin for I2S DOUT |

> ⚠️ **Note:** Audio requires specific hardware (I2S microphone and speaker). Voice quality is very low-bandwidth — think "understandable radio voice," not phone-call quality.

### Remote Hardware Module

GPIO control over the mesh network. Allows a remote node to read or write GPIO pins on another node — useful for activating relays, reading switches, or controlling external hardware from a distance.

| Setting | Description |
|---------|-------------|
| Enabled | Activate remote GPIO access |
| Allow Undefined Pins | Allow access to any GPIO pin (security risk) |

> ⚠️ **Warning:** Enabling "Allow Undefined Pins" gives remote nodes access to all GPIO pins, which could interfere with the radio's own hardware. Only enable on dedicated GPIO nodes.

### Neighbor Info Module

Broadcasts information about directly heard neighbors, enabling mesh topology mapping. Each enabled node periodically shares a list of the other nodes it can hear and their signal quality.

| Setting | Description |
|---------|-------------|
| Enabled | Activate neighbor broadcasting |
| Update Interval (s) | How often to broadcast neighbor list |

See [Discovery](discovery.md) for how to use neighbor data for mesh topology exploration.

### Ambient Lighting Module

Controls onboard NeoPixel or other addressable RGB LEDs on supported hardware. Can be used for visual status indicators, notification lights, or decorative effects.

| Setting | Description |
|---------|-------------|
| Enabled | Activate LED control |
| LED State | On, Off, or set specific color |
| Red / Green / Blue | Individual color channel values (0–255) |

### Detection Sensor Module

Turns your node into a motion or door sensor alert system. When a GPIO pin detects a state change (motion detected, door opened), the node broadcasts an alert message over the mesh.

| Setting | Description |
|---------|-------------|
| Enabled | Activate detection sensor |
| Monitor Pin | GPIO pin connected to sensor |
| Detection Triggered High | Trigger when pin goes high (vs. low) |
| Minimum Broadcast (s) | Minimum time between alert broadcasts |
| State Broadcast (s) | Periodic state broadcast interval |
| Send Bell | Include bell character in alerts |
| Friendly Name | Custom name for this sensor |

### Paxcounter Module

People counter using WiFi and BLE probe requests. Counts nearby devices by passively listening for probe requests that phones and laptops emit when scanning for networks. Available only on ESP32 devices.

| Setting | Description |
|---------|-------------|
| Enabled | Activate people counting |
| Update Interval (s) | How often to report counts |

> 💡 **Tip:** Paxcounter is useful for estimating foot traffic at trailheads, event venues, or other locations. Counts are approximate — one person may carry multiple devices.

### TAK Module

Team Awareness Kit integration for interoperability with ATAK and WinTAK. See [TAK Integration](tak.md) for detailed setup and usage.

## Administration

### Remote Administration

Remotely configure nodes that share your admin key:

1. Select the target node in the node list.
2. Navigate to **Settings** for that node.
3. Modify configuration.
4. Tap **Save** — changes are sent over the mesh.

> ⚠️ **Requires:** Admin key configured on both your node and the target node.

### Clean Node Database

Removes stale nodes from your local database that haven't been heard in a configurable time window.

### Factory Reset

Resets all settings to factory defaults. **This cannot be undone.**

### Reboot

Remotely reboot a connected or administered node.

### Debug Panel

View detailed diagnostic information:
- Protocol buffers debug output
- Mesh packet log
- Connection state details

### Troubleshooting Remote Admin

- **"No response from target node"** — the target may be out of range, offline, or have a mismatched admin key. Verify the admin key matches on both nodes.
- **Changes not applying** — some settings require a reboot to take effect. Try the Reboot action after saving.
- **Can't see remote settings** — ensure your node has the admin key for the target node. The admin channel is configured automatically when an admin key is set.

## Related Topics

- [Settings — Radio & User](settings-radio-user.md) — core radio and user profile settings
- [Module configuration reference](https://meshtastic.org/docs/configuration/module) — detailed module docs on meshtastic.org
- [FAQ](https://meshtastic.org/docs/about/faq) — common questions on meshtastic.org

---

