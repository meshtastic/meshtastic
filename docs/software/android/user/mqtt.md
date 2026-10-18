---
title: MQTT
sidebar_position: 11
last_updated: 2026-09-19
description: Bridge your mesh to the internet — MQTT broker setup, encryption layers, and map reporting.
parent: User Guide
---

# MQTT

MQTT bridges your Meshtastic mesh network to the internet, enabling long-range communication beyond radio range.

## Overview

The MQTT module connects your node to an MQTT broker, allowing:
- Messages to reach nodes on different physical meshes via the internet
- Integration with home automation and monitoring systems
- Publishing node positions to the public Meshtastic map
- Custom data pipelines for logging and alerting

## How It Works

```text
[Your Node] → Radio → [Gateway Node with Wi-Fi] → MQTT Broker → [Remote Gateway] → Radio → [Remote Node]
```

A gateway node with internet access (Wi-Fi or Ethernet) publishes mesh messages to an MQTT topic. Remote gateways subscribed to the same topic inject those messages into their local mesh.

## Configuration

### Enabling MQTT

1. Navigate to **Settings → Module configuration → MQTT**.
2. Enable the MQTT module.
3. Configure the broker connection:

| Setting | Description | Default |
|---------|-------------|---------|
| **Address** | MQTT broker hostname | mqtt.meshtastic.org |
| **Username** | Broker authentication | meshdev |
| **Password** | Broker authentication | large4cats |
| **Root topic** | Base topic for messages | `msh`, which the radio rewrites to `msh/<REGION>` once you set a region |
| **Encryption enabled** | Encrypt MQTT payload | Enabled |
| **JSON output enabled** | Also publish and consume the `/2/json/` topic. Deprecated in the protobuf schema, but still the only toggle for this behavior — and the app's own proxy honors it | Disabled |
| **TLS enabled** | Secure connection to broker | Disabled |
| **Map reporting** | Report position to public map | Disabled |
| **Proxy to client enabled** | Relay MQTT through the connected phone | Disabled |

### Connection Status and Test Connection

The top of the MQTT settings screen shows the status of the relay this phone runs —
**Connected**, **Connecting**, **Reconnecting**, **Disconnected**, or **Inactive**. It reads
**Inactive** whenever the phone is not relaying, which includes the normal case of a radio
reaching the broker over its own Wi-Fi or Ethernet. The radio's own connection to the broker is
not reported here.

**Test connection** probes the broker before you commit the settings to the radio, and
distinguishes the failure modes: the hostname not resolving, the TCP connection being refused,
TLS failing, the attempt timing out, or the broker rejecting your credentials with a reason.

### MQTT Proxy on This Phone

If your radio has no internet access of its own, it can use the connected phone as its MQTT gateway: enable **MQTT** and **Proxy to client enabled** in the module config, and the app relays MQTT traffic between the radio and the broker over your phone's internet connection.

> ℹ️ **Note:** The proxy relay is mobile-only. On the Desktop app the MQTT settings are present, but no relay runs behind them.

The **MQTT proxy on this phone** toggle at the top of the MQTT settings screen shows whether this relay is running and lets you cut it off (or restart it) immediately — without editing and re-saving the radio's MQTT configuration.

### Default Meshtastic Broker

The community maintains a public broker at `mqtt.meshtastic.org`. This is intended for general use and testing.

When this phone relays MQTT for the radio, connections to that broker always use TLS on port 8883 even if **TLS enabled** is off — that upgrade is the app's own, and the switch says so. A radio that reaches the broker over its own Wi-Fi or Ethernet forces nothing: it uses **TLS enabled** as stored, so turn it on yourself or the radio connects in the clear on port 1883. For any other broker the toggle decides in both cases (port 8883 with TLS, 1883 without).

> 🔒 **Privacy:** Messages on the public broker are readable by anyone subscribed. Always use channel encryption for private communications.

### Private Broker

For better privacy and control, you can run your own MQTT broker:
- Mosquitto (lightweight, open-source)
- HiveMQ
- EMQX

Configure your node to point to your private broker with appropriate credentials.

## Map Reporting

When **Map reporting** is on, your node periodically publishes a map report to the broker. The report goes out unencrypted, whatever keys your channels use, and carries your node id, long and short name, approximate location, hardware model, role, firmware version, LoRa region, modem preset, and primary channel name.

Turning it on opens a consent card. Turn on **I agree.** and choose a **Map Publish Interval** of one hour or more — the screen will not save until you do. A slider sets the position precision, and the app shows the resulting accuracy as a ± distance, so you can publish an approximate location rather than an exact one.

Reports appear at [meshmap.net](https://meshmap.net) and similar community map services.

> 🔒 **Privacy:** A map report is readable by anyone subscribed to the broker. Leave **Map reporting** off if you do not want your approximate location published.

## Uplink vs Downlink

| Direction | Description |
|-----------|-------------|
| **Uplink** | Messages from mesh → MQTT broker |
| **Downlink** | Messages from MQTT broker → mesh |

Uplink and downlink are per-channel settings, not MQTT module settings. Open **Settings → Channels**, tap the channel, and use **MQTT Uplink Enabled** and **MQTT Downlink Enabled**. Every channel you want bridged out needs uplink on, and every channel you want MQTT traffic injected into needs downlink on.

## Message Formats

MQTT carries two payload formats:

| Format | Description | Use case |
|--------|-------------|----------|
| **Protobuf** | Binary Meshtastic protobuf encoding | Node-to-node mesh bridging |
| **JSON** | Human-readable JSON on the `/2/json/` topic | Consumers outside the mesh (dashboards, home automation) |

> ℹ️ **Note:** `json_enabled` is marked deprecated in the protobuf schema, but it has not been
> replaced and it is not ignored. When it is on, the app's own MQTT proxy subscribes to the
> `/2/json/` topic and decodes those payloads.

## Encryption & Privacy

Understanding the layered encryption model:

1. **Channel encryption** happens on the mesh *before* MQTT. If your channel has a PSK, the MQTT payload is already encrypted — the broker and any subscribers see only the ciphertext.
2. **Encryption enabled** (the module setting) decides which copy of the packet the gateway publishes — it is not an extra layer. Leave it on and the broker receives the packet still encrypted with your channel key. Turn it off and the gateway publishes the decrypted packet, so anyone subscribed to the topic reads your messages in the clear. Turn it off only when you own the broker and want plain payloads for a dashboard.
3. **TLS** encrypts the TCP connection to the broker itself, preventing network-level eavesdropping.

> 🔒 **Security:** The default public channel has a well-known key. Messages on the default channel sent via MQTT are effectively **unencrypted** — anyone can decode them. Always use a custom PSK for private communications.

## Best Practices

- Use channel-level encryption (PSK) on channels that bridge to MQTT
- Don't enable MQTT on nodes without internet access (the radio buffers unsendable messages and wastes memory)
- Use a private broker for sensitive deployments
- Be mindful of airtime when downlinking messages from busy MQTT topics — every downlinked message consumes radio airtime on your local mesh
- Consider enabling uplink-only if you only need to monitor your mesh remotely without injecting messages back

## Troubleshooting

### MQTT Not Connecting

- **Check Wi-Fi** — the gateway node must have an active internet connection (Wi-Fi or Ethernet). MQTT does not work over the LoRa radio link itself.
- **Verify credentials** — with incorrect credentials, most brokers fail silently — double-check for trailing spaces.
- **Firewall** — port 1883 (MQTT) or 8883 (MQTT over TLS) must be reachable. Some networks allow only web traffic (ports 80 and 443).
- **DNS resolution** — if using a custom broker hostname, verify the node can resolve it. Try the broker's IP address directly.

### Messages Not Bridging

- **Check uplink/downlink settings** — if only uplink is enabled, messages flow from mesh to MQTT but not back. Enable downlink on the receiving gateway.
- **Channel mismatch** — both gateways must share the same channel with the same PSK. A mismatch means messages are encrypted with different keys and appear as garbage.
- **Topic mismatch** — both gateways must use exactly the same root topic. Setting a region rewrites a default root to `msh/<REGION>` (for example `msh/US`), so gateways in different regions do not meet until you give both the same explicit root.
- **Ignore MQTT is on** — in a region with a duty-cycle limit, the radio turns on **Ignore MQTT** (LoRa config, **Advanced**) when you set the region, and then drops every packet that reached it via MQTT. Turn it off on the receiving nodes, not only on the gateway.
- **Ok to MQTT is off** — on a public broker a gateway uplinks other nodes' packets only when the sending node has **Ok to MQTT** (LoRa config, **Advanced**) on. Your own traffic bridges either way; your neighbors' does not until they opt in.

## Related Topics

- [Settings — Modules & Admin](settings-module-admin.md) — MQTT module configuration reference
- [Messages & Channels](messages-and-channels.md) — channel encryption and PSK setup
- [MQTT integration guide](https://meshtastic.org/docs/software/integrations/mqtt) — detailed MQTT documentation on meshtastic.org
