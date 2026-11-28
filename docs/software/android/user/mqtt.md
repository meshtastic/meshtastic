---
title: MQTT
sidebar_position: 11
last_updated: 2026-10-21
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
2. Turn on **MQTT Enabled**.
3. Configure the broker connection:

| Setting | Description | Default |
|---------|-------------|---------|
| **Address** | MQTT broker hostname. Empty means the public broker | mqtt.meshtastic.org |
| **Username** | Broker authentication | meshdev |
| **Password** | Broker authentication | large4cats |
| **Encryption Enabled** | Publish packets still encrypted with the channel key | Enabled |
| **JSON output enabled** | Shown only for a node on firmware older than 2.8, or while the setting is still on. See [Message Formats](#message-formats) | Disabled |
| **TLS Enabled** | Secure connection to broker | Disabled |
| **Root Topic** | Base topic for messages | `msh`, which the node rewrites to `msh/<REGION>` when you set a region while it uses the public broker |
| **MQTT Client Proxy** | Relay MQTT through the connected app | Disabled |
| **Map Reporting** | Report position to public map | Disabled |

### Connection Status and Test Connection

The top of the MQTT settings screen shows the status of the relay this app runs:
**Connected**, **Connecting…**, **Reconnecting…**, **Disconnected**, or **Inactive**. It reads
**Inactive** whenever the app is not relaying, which includes the normal case of a node
reaching the broker over its own Wi-Fi or Ethernet. The node's own connection to the broker is
not reported here.

When the broker accepts the connection but refuses a subscription, the status names the refused
topics and the broker's reason: *Connected, but the broker refused every topic* when nothing was
granted, or *Connected, but the broker refused* followed by the topics when only some were. A
broker's access-control list is the usual cause.

**Test connection** probes the broker before you commit the settings to the node, and
distinguishes the failure modes: the hostname not resolving, the TCP connection being refused,
TLS failing, the attempt timing out, or the broker rejecting your credentials with a reason.

### Find Topics Near You

The region topic (`msh/US`) carries every gateway in the region. **Find topics near you**, under
the root topic field, listens to the broker for one minute and lists the narrower roots in use
around you, with the number of nodes heard on each.

- **Near you** lists the region, then the country when the broker shows it in use (`msh/EU_868/DE`),
  then your state or province and city, named from the node's position or, failing that, the
  phone's location. The phone's geocoder turns the location into place names; the location itself
  never reaches the broker. Community roots whose names don't say where they are (`msh/US/DMV`)
  follow when they serve your area, from a directory the app refreshes from the Meshtastic API.
- **Active topics** lists every other root heard. Roots under your state or city come first, then
  roots in neighboring states, then the rest.
- **Custom topic** takes any root the node accepts: up to 31 ASCII characters, no leading or
  trailing slash, no `+` or `#`.

The finder only subscribes and publishes nothing. Picking a topic fills in the root topic field,
and nothing reaches the node until you save. It needs the LoRa region to be set. Without a
location, or on desktop, it still lists the region and every root it hears.

### MQTT Proxy in This App

If your node has no internet access of its own, it can use the app as its MQTT gateway. Turn on **MQTT Enabled** and **MQTT Client Proxy** in the module config. The app then relays MQTT traffic between the node and the broker over your phone's or computer's internet connection.

The **MQTT proxy in this app** toggle at the top of the MQTT settings screen shows whether this relay is running and lets you cut it off (or restart it) immediately, without editing and re-saving the node's MQTT configuration.

### Default Meshtastic Broker

The community maintains a public broker at `mqtt.meshtastic.org`. This is intended for general use and testing.

When this app relays MQTT for the node, connections to that broker always use TLS on port 8883 even if **TLS Enabled** is off. That upgrade is the app's own, and the switch says so. A node that reaches the broker over its own Wi-Fi or Ethernet forces nothing: it uses **TLS Enabled** as stored, so turn it on yourself or the node connects in the clear on port 1883. For any other broker the toggle decides in both cases. A port written in the address, as in `broker.example.com:8884`, is kept; without one, TLS uses port 8883 and plain connections use 1883.

> 🔒 **Privacy:** Messages on the public broker are readable by anyone subscribed. Always use channel encryption for private communications.

### Private Broker

For better privacy and control, you can run your own MQTT broker:
- Mosquitto (lightweight, open-source)
- HiveMQ
- EMQX

Configure your node to point to your private broker with appropriate credentials.

## Map Reporting

When **Map Reporting** is on, your node periodically publishes a map report to the broker. The report goes out unencrypted, whatever keys your channels use, and carries your node id, long and short name, approximate location, hardware model, role, firmware version, LoRa region, modem preset, and primary channel name.

Turning it on opens a consent card. Turn on **I agree.** and choose a **Map Publish Interval** of one hour or more — the screen will not save until you do. A slider sets the position precision, and the app shows the resulting accuracy as a ± distance, so you can publish an approximate location rather than an exact one.

Reports appear at [meshmap.net](https://meshmap.net) and similar community map services.

> 🔒 **Privacy:** A map report is readable by anyone subscribed to the broker. Leave **Map Reporting** off if you do not want your approximate location published.

## Uplink vs Downlink

| Direction | Description |
|-----------|-------------|
| **Uplink** | Messages from mesh → MQTT broker |
| **Downlink** | Messages from MQTT broker → mesh |

Uplink and downlink are per-channel settings, not MQTT module settings. Open **Settings → Channels**, tap the channel, and use **MQTT Uplink Enabled** and **MQTT Downlink Enabled**. Every channel you want bridged out needs uplink on, and every channel you want MQTT traffic injected into needs downlink on.

## Message Formats

Gateways publish packets as binary Meshtastic protobufs on the `/2/e/` topic, which is what node-to-node mesh bridging uses.

Firmware 2.7 and older can also publish human-readable JSON on the `/2/json/` topic for consumers outside the mesh, such as dashboards and home automation, when `json_enabled` is on. Firmware 2.8 removed JSON support and ignores the field. The app shows **JSON output enabled** only for a node on older firmware, or while the setting is still on, and while it is on the app's own MQTT proxy also subscribes to the `/2/json/` topic and decodes those payloads.

## Encryption & Privacy

Understanding the layered encryption model:

1. **Channel encryption** happens on the mesh *before* MQTT. If your channel has a PSK, the MQTT payload is already encrypted — the broker and any subscribers see only the ciphertext.
2. **Encryption Enabled** (the module setting) decides which copy of the packet the gateway publishes — it is not an extra layer. Leave it on and the broker receives the packet still encrypted with your channel key. Turn it off and the gateway publishes the decrypted packet, so anyone subscribed to the topic reads your messages in the clear. Turn it off only when you own the broker and want plain payloads for a dashboard.
3. **TLS** encrypts the TCP connection to the broker itself, preventing network-level eavesdropping.

> 🔒 **Security:** The default public channel has a well-known key. Messages on the default channel sent via MQTT are effectively **unencrypted** — anyone can decode them. Always use a custom PSK for private communications.

## Best Practices

- Use channel-level encryption (PSK) on channels that bridge to MQTT
- Don't enable MQTT on a node with no internet access of its own unless **MQTT Client Proxy** is on (the node queues messages it can't send and wastes memory)
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
- **Topic mismatch** — both gateways must use exactly the same root topic. On the public broker, setting a region rewrites a default root to `msh/<REGION>` (for example `msh/US`), so gateways in different regions do not meet until you give both the same explicit root. Firmware 2.8.0 and older also rewrite a root starting with `msh` on a private broker.
- **Ignore MQTT is on** — in a region with a duty-cycle limit, the node turns on **Ignore MQTT** (LoRa config, **Advanced**) when you set the region, and then drops every packet that reached it via MQTT. Turn it off on the receiving nodes, not only on the gateway.
- **OK to MQTT is off** — on a public broker a gateway uplinks other nodes' packets only when the sending node has **OK to MQTT** (LoRa config, **Advanced**) on. Your own traffic bridges either way; your neighbors' does not until they opt in.

## Related Topics

- [Settings — Modules & Admin](settings-module-admin.md) — MQTT module configuration reference
- [Messages & Channels](messages-and-channels.md) — channel encryption and PSK setup
- [MQTT integration guide](https://meshtastic.org/docs/software/integrations/mqtt) — detailed MQTT documentation on meshtastic.org
