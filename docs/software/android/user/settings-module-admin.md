---
title: Settings — Modules & Admin
sidebar_position: 8
last_updated: 2026-09-19
description: Configure optional feature modules (MQTT, telemetry, canned messages, TAK, and more) and perform device administration.
parent: User Guide
---

# Settings — Modules & Admin

Configure optional feature modules and perform device administration. Modules extend Meshtastic with specialized capabilities — each can be independently enabled or disabled.

> 💡 **Tip:** You only need to enable the modules you actually use. Disabling unused modules reduces airtime, saves battery, and simplifies your configuration. A module you expect can be missing for three reasons: your node's role doesn't enable it, your firmware is older than the release that added it, or the firmware build excludes it for this hardware.

Module settings use a card-based layout with toggle switches, dropdowns, text fields, and sliders:

![A toggle setting in the on position](/img/android/docs/settings_switch.webp)

![A dropdown setting, expanded to show its list of options](/img/android/docs/settings_dropdown.webp)

![A text field setting with a value entered](/img/android/docs/settings_text_field.webp)

![A module settings card with its title and grouped controls](/img/android/docs/settings_titled_card.webp)

## Module configuration

Every module lives under **Settings → Module configuration**.

> ⚠️ **Important:** Saving a module screen restarts the node — the button reads **Save & restart**, and the node is unreachable for a few seconds afterwards. External Notification and Mesh Beacon are the exceptions: their button reads **Save**, and the node may still restart for some changes.

### MQTT module

Bridges mesh messages to and from an MQTT broker for internet connectivity. This is how you extend your mesh beyond LoRa range or integrate with home automation systems.

| Setting | Description |
|---------|-------------|
| MQTT enabled | Toggle MQTT bridge |
| Address | MQTT broker address |
| Username | Authentication username |
| Password | Authentication password |
| Encryption enabled | Encrypt MQTT payloads |
| JSON output enabled | Publish and consume MQTT messages as JSON. Marked deprecated in the protobuf schema, but it is still the only toggle for this behavior and the firmware still honors it |
| TLS enabled | Use secure connection |
| Root topic | Base MQTT topic path |
| Proxy to client enabled | Let a connected phone carry the node's MQTT traffic, instead of the node reaching the broker itself |
| MQTT proxy on this phone | The phone-side half of **Proxy to client enabled**: whether this phone acts as that relay. See [MQTT](mqtt.md) |
| Map reporting | Publish position to the public map — see the Map reporting group that follows |

Turning **Map reporting** on reveals a consent card headed *Consent to Share Unencrypted Node Data
via MQTT*, with an **I agree.** switch under it. The rest of the card doesn't exist on screen
until you agree:

| Setting | Description |
|---------|-------------|
| I agree. | Explicit consent to transmit your node data, including an approximate position, unencrypted. Map reporting doesn't start without it |
| Precision slider | The slider has no label of its own. It sets how coarsely your position is published, from 12 to 15; the line beneath reads *±* the resulting distance, in your own units |
| Map Publish Interval | How often to report. A dropdown of fixed intervals from 1 hour to 72 hours — nothing shorter is offered |

See [MQTT](mqtt.md) for a detailed usage guide including encryption, privacy, and broker setup.

### Serial module

Enables serial port communication for external device integrations (GPS modules, sensors, or custom hardware). When enabled, the node's serial port can send and receive protobuf or text data, allowing external microcontrollers or computers to interact with the mesh.

| Setting | Description |
|---------|-------------|
| Serial enabled | Activate serial communication |
| Echo enabled | Echo received serial data back |
| Serial mode | Which protocol the port speaks — Default, Simple, Proto, Text message, NMEA, CalTopo, WS85 weather station, VE.Direct, MeshSolar config, Log, or Log (text only) |
| RX / TX | GPIO pins for the serial connection |
| Serial baud rate | Port speed |
| Timeout | How long to wait before considering an incoming message complete |
| Override console serial port | Take over the port the debug console normally uses |

### External Notification module

Controls buzzer, LED, or vibration alerts on your node hardware. Useful for devices that need to physically signal when a message arrives — particularly helpful for unattended or outdoor installations.

There are two independent triggers — an incoming **message**, and a received **bell** character —
and each can drive the LED, the buzzer and the vibration motor separately, giving six toggles.

| Setting | Description |
|---------|-------------|
| External notification enabled | Master toggle for the module |
| Alert message LED / buzzer / vibra | Which outputs fire on an incoming message |
| Alert bell LED / buzzer / vibra | Which outputs fire on a received bell character |
| Output LED (GPIO) | Pin the LED is wired to |
| Output LED active high | Whether the LED pin is active high or low |
| Output buzzer (GPIO) | Pin the buzzer is wired to |
| Output vibra (GPIO) | Pin the vibration motor is wired to |
| Use PWM buzzer | Drive the buzzer with PWM, which allows tones rather than a single pitch |
| Use I2S as buzzer | Send the alert through an I2S audio output instead |
| GPIO Output Duration | How long a single alert lasts |
| Nag Timeout | Keep repeating the alert for this long until it is acknowledged. 0 disables nagging |
| Ringtone | The tone played on a PWM buzzer, in RTTTL. Can be imported from a file |

### Store & Forward module

Buffers messages for nodes that were temporarily offline, then replays them when those nodes reconnect. Essential for meshes where nodes go in and out of range regularly — ensures messages aren't lost during brief disconnections.

| Setting | Description |
|---------|-------------|
| Store & Forward enabled | Activate store and forward |
| Heartbeat | Periodically announce this node's store-and-forward capability |
| Number of records | Maximum stored messages |
| History return max | Max messages to replay |
| History return window | Time window for replay |
| Server | Act as a store-and-forward server for the mesh (requires ample memory, e.g. ESP32 with PSRAM) |

> 💡 **Tip:** Store and Forward works best on nodes with ample memory (ESP32 with PSRAM). Router nodes are ideal candidates since they're typically always-on.

### Range Test module

> ⚠️ **Warning:** Range Test only works on a secured primary channel. As long as your primary channel
> still uses the default channel key, the interval and CSV controls stay disabled — you can still
> switch an already-enabled module off — and saving force-disables the module if the channel has
> reverted to public.

Automated range testing tool for evaluating link quality between nodes. When enabled, the node periodically transmits test messages with incrementing counters. A receiver node logs these messages, allowing you to walk or drive away and later analyze at what distance messages stopped arriving.

| Setting | Description |
|---------|-------------|
| Range test enabled | Activate range testing |
| Sender Interval | Time between test transmissions, chosen from a dropdown of fixed intervals |
| Save .CSV in storage (ESP32 only) | Log received test data to the node's own filesystem. ESP32 hardware only |

### Telemetry module

Controls what telemetry data your node shares with the mesh. Telemetry includes device health (battery, uptime) and environmental sensor data (temperature, humidity, pressure).

Each of the four metric groups has its own enable toggle and its own interval, so you can report
battery health often and sensors rarely.

| Setting | Description |
|---------|-------------|
| Send Device Telemetry | Master toggle for device metrics. Only shown on firmware 2.7.12 and newer |
| Device metrics update interval | How often to report battery, uptime and channel utilization |
| Environment metrics module enabled | Report the attached environment sensors |
| Environment metrics update interval | How often to report them |
| Environment metrics on-screen enabled | Also show these readings on the device's own display |
| Environment metrics use Fahrenheit | Use °F on the device's display. This is the node's screen only — the app follows your phone's locale, see [Units & Locale](units-and-locale.md) |
| Air quality metrics module enabled | Report particulate and CO₂ sensor data |
| Air quality metrics update interval | How often to report them |
| Power metrics module enabled | Report the per-channel voltage and current readings |
| Power metrics update interval | How often to report them |
| Power metrics on-screen enabled | Also show power readings on the device's display |

See [Telemetry & Sensors](telemetry-and-sensors.md) for supported sensors and configuration recommendations.

### Canned Message module

Pre-configured messages accessible from the node's physical buttons (for nodes with rotary encoders, keypads, or similar input hardware). Define a list of quick-send messages that can be transmitted without a phone connected — ideal for field use.

| Setting | Description |
|---------|-------------|
| ~~Canned message enabled~~ | ⚠️ **Deprecated** in the protobuf schema |
| Messages | Newline-separated list of messages |
| Send bell | Send a bell character alongside the message, so a receiving node's External Notification module can sound |
| Rotary encoder #1 enabled | Use a rotary encoder as the input device |
| GPIO pin for rotary encoder A / B / Press port | The three pins the encoder is wired to |
| Generate input event on Press / CW / CCW | Which key event each encoder action produces |
| Up/Down/Select input enabled | A separate, simpler input scheme using up/down/select buttons rather than an encoder |
| ~~Allow input source~~ | ⚠️ **Deprecated** in the protobuf schema |

### Audio module

Codec2 audio support for low-bandwidth voice communication over the mesh. This is an **experimental** feature that encodes voice into very small data packets using the Codec2 codec.

| Setting | Description |
|---------|-------------|
| CODEC 2 enabled | Activate audio module |
| CODEC2 sample rate | Audio quality/bandwidth tradeoff |
| PTT pin | GPIO pin for the push-to-talk button |
| I2S word select | GPIO pin for I2S WS |
| I2S data in | GPIO pin for I2S DIN |
| I2S data out | GPIO pin for I2S DOUT |
| I2S clock | GPIO pin for the I2S bit clock |

> ℹ️ **Note:** Audio requires specific hardware (I2S microphone and speaker). Voice quality is very low-bandwidth — think "understandable radio voice," not phone-call quality.

### Remote Hardware module

GPIO control over the mesh network. Allows a remote node to read or write GPIO pins on another node — useful for activating relays, reading switches, or controlling external hardware from a distance.

> ⚠️ **Warning:** Turning on **Allow undefined pin access** gives remote nodes access to all GPIO pins, which could interfere with the node's own hardware. Turn it on only on dedicated GPIO nodes.

| Setting | Description |
|---------|-------------|
| Remote Hardware enabled | Activate remote GPIO access |
| Allow undefined pin access | Allow access to any GPIO pin (security risk) |
| Available pins | Up to 4 GPIO pins this node exposes for remote read/write |

### Neighbor Info module

Broadcasts information about directly heard neighbors, enabling mesh topology mapping. Each enabled node periodically shares a list of the other nodes it can hear and their signal quality.

| Setting | Description |
|---------|-------------|
| Neighbor Info enabled | Activate neighbor broadcasting |
| Update Interval | How often to broadcast neighbor list |
| Transmit over LoRa | Also broadcast neighbor info over LoRa, not just MQTT/phone. Unavailable on a channel using the default key and name |

See [Local Mesh Discovery](discovery.md) for how to use neighbor data for mesh topology exploration.

### Ambient Lighting module

Controls onboard NeoPixel or other addressable RGB LEDs on supported hardware. Can be used for visual status indicators, notification lights, or decorative effects.

| Setting | Description |
|---------|-------------|
| LED state | Turn the LED on or off |
| Current | LED current limit (0–31) |
| Red / Green / Blue | Individual color channel values (0–255) |

### Detection Sensor module

Turns your node into a motion or door sensor alert system. When a GPIO pin detects a state change (motion detected, door opened), the node broadcasts an alert message over the mesh.

| Setting | Description |
|---------|-------------|
| Detection Sensor enabled | Activate detection sensor |
| GPIO pin to monitor | GPIO pin connected to sensor |
| Detection trigger type | How the pin's state maps to a detection event (e.g. active high/low, edge-triggered) |
| Use INPUT_PULLUP mode | Enable the pin's internal pull-up resistor |
| Minimum time between detection broadcasts | Minimum time between alert broadcasts |
| State Broadcast Interval | Periodic state broadcast interval |
| Send bell with alert message | Include bell character in alerts |
| Friendly name | Custom name for this sensor |

### Paxcounter module

People counter using Wi-Fi and BLE probe requests. Counts nearby devices by passively listening for probe requests that phones and laptops emit when scanning for networks. Available only on ESP32 devices.

| Setting | Description |
|---------|-------------|
| Paxcounter enabled | Activate people counting |
| Update Interval | How often to report counts |
| WiFi Threshold (dBm) | Ignore Wi-Fi probes weaker than this, so distant devices aren't counted (defaults to −80 dBm) |
| BLE Threshold (dBm) | The same cut-off for BLE advertisements (defaults to −80 dBm) |

> 💡 **Tip:** Paxcounter is useful for estimating foot traffic at trailheads, event venues, or other locations. Counts are approximate — one person may carry multiple devices.

### Status Message module

The status message has no module screen. It is edited with the rest of the node's identity, on
[Settings — Radio & User](settings-radio-user.md#user-profile).

### Mesh Beacon module

Broadcasts an invitation to your mesh, and receives invitations from others. The entry appears only
on nodes running firmware 2.8.0 or newer. See [Local Mesh Discovery](discovery.md) for the full
walkthrough.

### TAK module

Team Awareness Kit integration for interoperability with ATAK and WinTAK. Two things have to be
true before the entry appears in the module list: the node runs firmware 2.8.0 or newer, and its
**Device Role** on **Settings → Device configuration → Device** is set to `TAK` or `TAK_TRACKER`.
See [TAK Integration](tak.md) for detailed setup and usage.

## Administration

### Remote Administration

Remotely configure nodes that share your admin key:

1. Select the target node in the node list.
2. Navigate to **Settings** for that node.
3. Modify configuration.
4. Tap **Save** — changes are sent over the mesh.

> ⚠️ **Important:** Requires an admin key configured on both your node and the target node.

### Device Actions

**Settings → Administration** holds five one-shot actions, each behind a confirmation dialog:

| Action | What it does |
|---|---|
| Set time | Sends your phone's clock to the node |
| Reboot | Restarts the node |
| Shutdown | Powers the node down |
| Factory reset | Returns every setting to its factory default |
| NodeDB reset | Clears the node database. This dialog carries a **Preserve Favorites?** switch |

> ⚠️ **Warning:** Factory reset erases all settings, channels, and keys, and cannot be undone. Before you reset, use **Export configuration** to save the node's settings and **Backup Keys** on the Security screen to save its keys, so you can put both back afterwards.

### Backup & Restore

**Settings → Backup & Restore** writes the connected node's whole configuration to a file with
**Export configuration**, and reads a saved file back in with **Import configuration**. Export
before a factory reset, or to copy one node's setup onto another. The section is shown for your
own node only, not over remote admin.

### Advanced

**Settings → Advanced** collects the tools that read or rewrite local state, and is likewise shown
for your own node only: **Firmware Update** on OTA-capable hardware, **Clean Node Database**,
**TAK Server**, **Local Mesh Discovery**, and the **Debug Panel**.

#### Clean Node Database

Prunes nodes from your node database — from the app's copy *and* from the node's own, so this is
not a display-only cleanup. The two filters combine rather than acting separately; the screen puts
it as *Selections are additive*.

- **Clean up nodes last seen older than N days** — always applied. The slider runs from 7 days to
  365 and starts at 30; with **Clean up only unknown nodes** turned on, its floor drops to 0.
- **Clean up only unknown nodes** — narrows the same purge to nodes that never sent their user
  info. The age limit still applies on top of it.

The screen lists the nodes queued for deletion as you move the filters. **Clean Now** carries the
purge out, after one more confirmation, and it can't be undone. Favorited nodes, ignored nodes,
and nodes with a public key heard in the last seven days are never removed, whatever the filters
say — that is why the queued list can be shorter than you expect.

#### Debug Panel

Opens the **Packets** and **App logs** tabs for viewing, filtering, and exporting diagnostic output. See [Debug Logs](debug-logs.md) for the full walkthrough.

### App Settings

The **App Settings** block on the **Settings** screen configures the app rather than the node, and
appears only when your own node is selected. It is grouped rather than flat:

**Privacy**

- **Allow analytics and crash reporting** — opt in or out of diagnostics.
- **Provide phone location to mesh** — share this phone's position when the node has no GPS fix.
- **Homoglyph encoding** — how look-alike characters in names are handled.

**Appearance**

- **Units** — metric, imperial, or follow the system. This is the entry
  [Units & Locale](units-and-locale.md) sends you to.
- **Theme** and **Language**.
- **Show full message timestamps**.

**Persistence**

- A cache limit for how much history is kept.
- **Export rangetest packets**, **Export all packets** and **Export node database**.

**On their own**

- **Node Layout** — how much detail each row of the node list shows.
- **Wi-Fi Provisioning for mPWRD-OS** — see [Connections](connections.md).
- **Message Filter** — hides incoming messages that contain words you list. With no words
  configured it does nothing.
- **System AI** — appears only where app functions are available; see
  [App Functions](app-functions.md).

A **Permissions** block sits above App Settings, so a user who skipped a permission during
onboarding can get back to it, and **App Info** sits below.

### About

**Settings → About** carries the app's own identity rather than the node's:

Three sections:

- **What is Meshtastic?** — a short description of the project.
- **Apps** — opens with **Need Hardware?**, a rotating carousel of popular devices that links out
  to where to buy one. It also lists the GitHub repository, the running app version, and
  **Acknowledgements** (see the next section).
- **Project information** — links to the website, to this documentation, and to the GNU GPL v3
  license the app is released under.

The footer states the copyright and that the app is free software with no warranty, which you
may redistribute under the same license.

### Acknowledgements

Reached from **About**, this lists every open-source library the app ships, with its license,
generated at build time by AboutLibraries. It was previously called the license screen.

### Troubleshooting remote admin

- **"No response from target node"** — the target may be out of range, offline, or have a mismatched admin key. Verify the admin key matches on both nodes.
- **Changes not applying** — some settings require a reboot to take effect. Try the Reboot action after saving.
- **Can't see remote settings** — ensure your node has the admin key for the target node. The admin channel is configured automatically when an admin key is set.

## Related Topics

- [Settings — Radio & User](settings-radio-user.md) — core node and user profile settings
- [Module configuration reference](https://meshtastic.org/docs/configuration/module) — detailed module docs on meshtastic.org
- [FAQ](https://meshtastic.org/docs/faq/) — common questions on meshtastic.org
