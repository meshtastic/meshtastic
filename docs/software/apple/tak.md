---
title: TAK Integration
parent: User Guide
nav_order: 9
---

# TAK Integration

The Meshtastic app supports Team Awareness Kit (TAK) integration, enabling interoperability with ATAK (Android Team Awareness Kit), iTAK, and other CoT (Cursor-on-Target) compatible systems.

## What is TAK?

TAK is a situational awareness platform widely used in tactical, emergency management, and outdoor recreation contexts. It displays the positions and status of team members on a shared map. Meshtastic bridges TAK users over LoRa mesh radio without requiring cellular or internet connectivity.

## Supported Device Roles

TAK integration works with two device roles:

| Role | Description |
|------|-------------|
| TAK | Full TAK role — sends CoT position reports and can relay TAK data packets. |
| TAK Tracker | Lightweight position-only TAK role. Lower power consumption, no packet relay. |

Set the device role in **Settings → Device**.

## TAK Server Configuration

1. Go to **Settings → TAK Server**.
2. Enter your TAK server address (IP or hostname) and port.
3. Enable **CoT Streaming** to forward received mesh position data to the TAK server.

## CoT Message Format

Meshtastic sends CoT (Cursor-on-Target) XML messages. Position packets received from the mesh are converted to CoT atoms and forwarded to the configured TAK server. The app supports:

- CoT type `a-f-G-U-C` (friendly ground unit)
- Position (latitude, longitude, altitude, speed, heading)
- Node callsign mapped from the Meshtastic long name
- PLI (Position Location Information) updates at the configured interval

## TAK Module Configuration

Go to **Settings → TAK Module** to configure:

| Setting | Description |
|---------|-------------|
| CoT PLI Broadcast Interval | How often position reports are sent to the mesh. |
| CoT Message Interval | Minimum interval between CoT forwards to the TAK server. |
| ATAK-D Rebroadcast | Forward received ATAK-D packets to the TAK server. |

## Requirements

- Firmware 2.3 or later on your radio
- A running TAK server (e.g., TAK Server, FreeTAKServer, or TAKX) on your local network
- Device configured with TAK or TAK Tracker role
