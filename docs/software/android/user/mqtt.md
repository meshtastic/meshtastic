---
title: MQTT
sidebar_position: 11
last_updated: 2026-05-13
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

```
[Your Node] → Radio → [Gateway Node with WiFi] → MQTT Broker → [Remote Gateway] → Radio → [Remote Node]
```

A gateway node with internet access (WiFi or Ethernet) publishes mesh messages to an MQTT topic. Remote gateways subscribed to the same topic inject those messages into their local mesh.

## Configuration

### Enabling MQTT

1. Navigate to **Settings → Module Config → MQTT**.
2. Enable the MQTT module.
3. Configure the broker connection:

![MQTT toggle switch](/img/android/docs/settings_switch.webp)

| Setting | Description | Default |
|---------|-------------|---------|
| Server Address | MQTT broker hostname | mqtt.meshtastic.org |
| Username | Broker authentication | meshdev |
| Password | Broker authentication | large4cats |
| Root Topic | Base topic for messages | msh |
| Encryption | Encrypt MQTT payload | Enabled |
| ~~JSON Output~~ | ⚠️ **Deprecated** — JSON packet support has been removed from firmware; this field is ignored | Disabled |
| TLS | Secure connection to broker | Disabled |
| Map Reporting | Report position to public map | Disabled |

### Default Meshtastic Broker

The community maintains a public broker at `mqtt.meshtastic.org`. This is intended for general use and testing.

> 🔒 **Privacy:** Messages on the public broker are readable by anyone subscribed. Always use channel encryption for private communications.

### Private Broker

For better privacy and control, you can run your own MQTT broker:
- Mosquitto (lightweight, open-source)
- HiveMQ
- EMQX

Configure your node to point to your private broker with appropriate credentials.

## Map Reporting

When Map Reporting is enabled, your node publishes its position to the Meshtastic community map:
- Visible at [meshmap.net](https://meshmap.net) and similar community map services
- Only position and node info are shared
- Disable this if you don't want your location publicly visible

## Uplink vs Downlink

| Direction | Description |
|-----------|-------------|
| **Uplink** | Messages from mesh → MQTT broker |
| **Downlink** | Messages from MQTT broker → mesh |

Configure per-channel which directions are active to control message flow and airtime usage.

## Message Formats

MQTT uses protobuf message format:

| Format | Description | Use case |
|--------|-------------|----------|
| **Protobuf** | Binary Meshtastic protobuf encoding | Node-to-node mesh bridging |

> ⚠️ **Note:** JSON output support was removed from firmware. The `json_enabled` setting is still visible in the app for legacy compatibility but has no effect on current firmware versions.

## Encryption & Privacy

Understanding the layered encryption model:

1. **Channel encryption** happens on the mesh *before* MQTT. If your channel has a PSK, the MQTT payload is already encrypted — the broker and any subscribers see only the ciphertext.
2. **MQTT encryption** (the module setting) adds an additional encryption layer for transit to the broker. This protects metadata and routing information.
3. **TLS** encrypts the TCP connection to the broker itself, preventing network-level eavesdropping.

> 🔒 **Important:** The default public channel has a well-known key. Messages on the default channel sent via MQTT are effectively **unencrypted** — anyone can decode them. Always use a custom PSK for private communications.

## Best Practices

- Use channel-level encryption (PSK) on channels that bridge to MQTT
- Don't enable MQTT on nodes without internet access (it will buffer and waste memory)
- Use a private broker for sensitive deployments
- Be mindful of airtime when downlinking messages from busy MQTT topics — every downlinked message consumes radio airtime on your local mesh
- Consider enabling uplink-only if you only need to monitor your mesh remotely without injecting messages back

## Troubleshooting

### MQTT Not Connecting

- **Check WiFi** — the gateway node must have an active internet connection (WiFi or Ethernet). MQTT does not work over the LoRa radio link itself.
- **Verify credentials** — incorrect username or password will silently fail on most brokers. Double-check for trailing spaces.
- **Firewall** — port 1883 (MQTT) or 8883 (MQTT+TLS) must be open. Some networks block non-standard ports.
- **DNS resolution** — if using a custom broker hostname, verify the node can resolve it. Try the broker's IP address directly.

### Messages Not Bridging

- **Check uplink/downlink settings** — if only uplink is enabled, messages flow from mesh to MQTT but not back. Enable downlink on the receiving gateway.
- **Channel mismatch** — both gateways must share the same channel with the same PSK. A mismatch means messages are encrypted with different keys and appear as garbage.
- **Topic mismatch** — ensure both gateways use the same root topic. The default `msh` works for the public broker.

## Related Topics

- [Settings — Modules & Admin](settings-module-admin.md) — MQTT module configuration reference
- [Messages & Channels](messages-and-channels.md) — channel encryption and PSK setup
- [MQTT integration guide](https://meshtastic.org/docs/software/integrations/mqtt) — detailed MQTT documentation on meshtastic.org

---

