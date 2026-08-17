---
title: Settings
parent: User Guide
sidebar_position: 7
---

# Settings

The Settings tab lets you configure the app and your connected Meshtastic radio.

## App Settings

General app preferences including map style, notification behavior, and theme. These affect only the app — not the radio.

### Data Management

- **Erase All App Data** — clears the local database, translation cache, and all stored settings, then immediately reloads the bundled device hardware catalog. Use this as a last resort.
- **NodeDB Reset** — resets the node database on your connected radio. When prompted, you can choose to **Preserve Favorites** so your starred nodes are retained after the reset.
- **Reset App Settings** — restores default app preferences without affecting your node database.

## Radio Configuration

Radio configuration requires a connected node. Select your node from the **Configure** section if you have multiple nodes.

### Node selection

The Configure picker lists live nodes from the current node database, with favorites first. If the node database is reset or the selected node disappears, Settings clears that selection instead of opening configuration for a stale node. Reconnect to a radio or choose a currently listed node to continue configuring it.

### LoRa

LoRa settings control how your radio communicates on the mesh:

| Setting | Description |
|---------|-------------|
| Region | Your geographical region. **Must be set correctly** — using the wrong region is illegal and prevents communication with local nodes. The standard regions are always available; the amateur (ham) 2m / 70cm / 1.25m bands and the EU 866 / narrow bands require firmware **2.8.0 or later** and only appear when your connected radio supports them. |
| Modem Preset | Speed/range trade-off. Most users should use Long Fast or Long Slow. On firmware 2.8+, the preset list is filtered to those that are legal for the selected region (see below). |
| Hop Limit | The number of times a message is repeated by other nodes. Higher values increase range but also mesh traffic. |
| Frequency Slot | Fine-tune the exact frequency within your region. |

On firmware **2.8.0 or later**, the radio tells the app which modem presets are legal in each region. When you pick a region, the Presets list narrows to the compatible set, and if your current preset isn't allowed there the app switches you to that region's default. Setting the region to **US** on a newly flashed node defaults the preset to **Long Turbo**. Amateur (ham) bands such as the Tiny and Narrow presets are marked **licensed** — the app shows a warning, and you should enable **Licensed Operator** (and set your call sign) in **User** config before transmitting. On older firmware the full preset list is shown unchanged.

### Channels

Manage up to 8 channels (0–7). Channel 0 is the primary broadcast channel. Additional channels create isolated messaging groups with their own encryption keys.

When sharing channels, the share screen shows a QR code and link, and — on iPhones with NFC hardware (iOS 18 or later) — a **Write to NFC Tag** button. Hold a writable NFC tag near the top of your iPhone to save the channel link to it, replacing any content the tag already held; tapping that tag on another phone opens the same add-or-replace channels flow the QR code does.

### Security

Configure PKI (Public Key Infrastructure) encryption for direct messages. Requires firmware 2.5+.

#### Packet Authenticity

Firmware that reports XEdDSA support can authenticate the sender of a mesh packet. **Protection Level** controls what the radio does with traffic it cannot authenticate:

| Level | Behavior |
|-------|----------|
| Compatible — Accept unsigned | Authenticates packets when possible, but accepts unsigned traffic for maximum compatibility. This is the default. |
| Balanced — Prefer authenticated | Recommended. Rejects unsigned broadcasts from nodes already known to sign, while still accepting traffic from nodes that never sign. |
| Strict — Require authentication | Accepts a remote packet only when it carries a verified XEdDSA signature or was successfully authenticated through PKI decryption. |

Strict applies to every remote mesh packet, including positions, messages, telemetry, node info, and routing traffic. Traffic from older firmware, from licensed (ham) nodes without PKI keys, and packets too large to carry a signature will disappear. PKI-authenticated direct messages remain available. The app asks you to confirm before enabling Strict.

The selector is disabled when the connected radio does not report XEdDSA support, or has not reported its capability yet — update that radio's firmware to configure the policy. Note that a verified signature proves which key sent a packet; it does not prove that a reported position or sensor reading is true or current.

This setting matches the Meshtastic app for Android, and the policy is enforced by the radio rather than the app.

On hardened lockdown-firmware radios, this page also shows a **Lockdown** section with the session status, a **Lock Now** button, and a **Forget Stored Passphrase** button. See [Lockdown Mode](lockdown.md).

### User

Set your Long Name (display name) and Short Name (4-character/emoji identifier shown in the node circle).

### Bluetooth

BLE radio settings including PIN mode and power saving. Changes apply on next radio restart.

### Device

Device role, serial output, debug log streaming, and node info broadcast interval.

### Display

Screen timeout, auto-carousel of screens, flip screen for alternate mounting orientations, and OLED contrast.

#### Compass Orientation

Controls which direction the on-device compass points when the screen is at rest. Use this when your radio is mounted at an angle or upside-down.

| Option | Description |
|--------|-------------|
| 0° | Default orientation — north at the top. |
| 90° | Rotated 90° clockwise. |
| 180° | Rotated 180° (upside-down). |
| 270° | Rotated 270° clockwise (90° counter-clockwise). |
| 0° Inverted | Default orientation with the display flipped (mirrored). |
| 90° Inverted | 90° clockwise with the display flipped. |
| 180° Inverted | 180° with the display flipped. |
| 270° Inverted | 270° clockwise with the display flipped. |

### Network

WiFi SSID/password for TCP connection, NTP server, and Ethernet (supported hardware only).

### Position

GPS update interval, position precision, and smart position broadcasting. Enable **Broadcast Position** to share your location with the mesh.

The **GPS Mode** selector (Enabled / Disabled / Not Present) is the single source of truth for the GPS state that the app writes to the radio. The older on/off `gpsEnabled` field it replaced is deprecated: the app no longer writes it, but still reads it from older firmware so existing devices keep working. No action is needed when upgrading — your GPS setting is preserved.

### Power

Battery saving profiles, sleep modes, and minimum wake time. Critical for solar-powered router nodes.

## Module Configuration

Optional feature modules. Only available when your connected node supports the module.

| Module | Description |
|--------|-------------|
| Ambient Lighting | Control NeoPixel/LED lighting on supported hardware. |
| Audio | Codec2 voice communication settings. Only available when LoRa region is set to **LORA_24** (2.4 GHz). Configure Codec2 encoding, bitrate, PTT pin, and I2S GPIO pins. |
| Canned Messages | Pre-programmed message shortcuts accessible from the device buttons. |
| Detection Sensor | Configure PIR motion or contact sensors. |
| External Notification | Buzzer or LED alerts for incoming messages. |
| Mesh Beacon | Advertise this node's mesh so other users' discovery scans can find and join it, and listen for beacons from nearby meshes. Requires firmware 2.8.0+. |
| MQTT | Uplink/downlink messages to an MQTT broker for internet bridging. |
| Neighbor Info | Periodically broadcasts information about directly-heard neighbors to help visualise mesh topology. Update interval ranges from 4 hours (default) to 72 hours. Enable **Transmit over LoRa** to share neighbour data over the radio in addition to MQTT and PhoneAPI. |
| Range Test | Automated range testing with position logging. |
| Pax Counter | Anonymised foot-traffic counting via Bluetooth/WiFi probe detection. Configure WiFi Threshold (dBm) and BLE Threshold (dBm) to control the RSSI sensitivity for device counting — default is −80 dBm for both. |
| Ringtone | Custom RTTTL melodies for notification tones. |
| Store & Forward | Store packets for nodes that are temporarily offline. |
| Serial | UART serial output for integration with other hardware. |
| Status Message | Set a custom status message broadcast to the mesh. |
| Telemetry | Device, environment, and air-quality sensor reporting. |
| Traffic Management | Mesh traffic optimisation — position deduplication, rate limiting, and unknown-packet filtering. Requires firmware 2.8.0+. |

### Traffic Management

The Traffic Management module helps reduce unnecessary mesh traffic and improve network efficiency. It is available on nodes running firmware **2.8.0 or later**. Each feature is enabled implicitly by a non-zero value — turning a section's toggle off (or the master **Enabled** switch) clears its values and disables that feature on the radio.

| Setting | Description |
|---------|-------------|
| Enabled | Master enable for the traffic management module. |
| **Position Deduplication** | |
| Position Dedup | Drop redundant position broadcasts from the same node. |
| Min Interval (s) | Minimum seconds between position updates from the same node. |
| **NodeInfo Direct Response** | |
| Direct Response | Respond to NodeInfo requests directly from local cache instead of flooding the mesh. |
| Max Hops | Maximum hop distance from the requestor at which direct NodeInfo responses are served from the local cache. |
| **Rate Limiting** | |
| Rate Limiting | Enable per-node rate limiting to throttle chatty nodes. |
| Window (s) | Time window in seconds for rate limiting calculations. |
| Max Packets | Maximum packets allowed per node within the rate limit window. |
| **Unknown Packet Handling** | |
| Drop Unknown | Enable dropping of unknown/undecryptable packets. |
| Threshold | Maximum unknown/undecryptable packets per rate window before the source is dropped. |

## Tools

The **Tools** entry appears only on iPhones with NFC hardware running iOS 18 or later; it is hidden on iPads, Mac Catalyst, and any device without an NFC radio.

It contains an **NFC Tags** section:

| Action | What it does |
|--------|--------------|
| **Write Contact to NFC Tag** | Saves your connected node's contact link to a writable NFC tag, replacing any content it already held. Hold the tag near the top of your iPhone. |
| **Scan NFC Tag** | Reads a Meshtastic tag and imports what it holds — a contact opens the add-contact confirmation sheet, a channel link opens the add-or-replace channels flow, exactly as scanning the equivalent QR code would. |

If a scanned tag holds something other than a Meshtastic contact or channel link, or its channel settings can't be read, the scan reports the problem rather than appearing to succeed.

Tags written by the Meshtastic app for Android are interchangeable with these — both platforms write the same contact and channel links.

## Firmware Updates

Check for and apply OTA firmware updates to your connected radio directly from the app. See [Firmware Updates](firmware.md) for full details.

## Automatic Documentation Translation

On devices running iOS 26 or later, the in-app documentation is automatically translated to your device language when it differs from English.

### How It Works

- **Language detection**: The app reads your device's primary language setting each time you open a documentation page.
- **On-device translation**: Pages are translated using Apple's on-device Translation framework (iOS 26+). If a language is not supported by the Translation framework, the app falls back to the on-device Foundation model (iOS 26+ only).
- **No network required**: After initial translation, all content is available offline.
- **Caching**: Translated pages are stored locally so they load instantly on subsequent visits.
- **Background prefetch**: After the current page is translated, remaining pages are translated in the background at low priority.

### Fallback to English

If translation is unavailable (older than iOS 26, unsupported language, or language pack not downloaded), the original English documentation is displayed. The app never shows blank or broken pages.

### Cache Management

- Translated files are stored in Application Support and persist across app launches.
- A 50 MB per-language limit is enforced using least-recently-used eviction.
- When the English source documentation is updated (new app version), stale translations are automatically regenerated.

> **Tip — Language change**
> If you change your device language while the app is open, documentation pages automatically reload in the new language.
