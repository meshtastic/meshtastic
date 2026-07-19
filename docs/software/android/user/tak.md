---
title: TAK Integration
sidebar_position: 10
last_updated: 2026-05-13
description: Interoperate with ATAK and WinTAK — CoT position sharing, TAK roles, and plugin setup.
parent: User Guide
---

# TAK Integration

Meshtastic integrates with the Team Awareness Kit (TAK) ecosystem, enabling interoperability between Meshtastic mesh devices and TAK applications like ATAK and WinTAK.

## Overview

The TAK module allows Meshtastic nodes to:
- Share position data in TAK-compatible CoT (Cursor on Target) format
- Appear as team members on TAK map displays
- Receive TAK PLI (Position Location Information) messages

## Setup

### Prerequisites

- ATAK (Android Team Awareness Kit) or WinTAK installed
- Meshtastic ATAK Plugin installed
- TAK module enabled on your Meshtastic radio

### Configuration

1. Navigate to **Settings → Module Config → TAK**.
2. Enable the TAK module.
3. Configure the TAK team/group settings:

![Module toggle switch](/img/android/docs/settings_switch.webp)

| Setting | Description |
|---------|-------------|
| Enabled | Activate TAK interop |
| Mode | TAK-compatible output mode |

### ATAK Plugin Setup

1. Install the Meshtastic ATAK Plugin from the plugin repository.
2. Open ATAK and enable the Meshtastic plugin.
3. The plugin bridges messages between ATAK and your mesh network.

## TAK Roles

Nodes configured with TAK-related roles behave differently from standard clients:

| Role | Description |
|------|-------------|
| **TAK** | Full TAK interoperability — sends and receives CoT data, chat messages, and PLI updates. Functions as a standard client plus TAK bridge. |
| **TAK Tracker** | Position-only TAK output — automatically broadcasts PLI at regular intervals without user interaction. Optimized for unattended position beacons (vehicles, equipment, waypoints). Does not relay chat messages. |

> 💡 **Tip:** Use **TAK Tracker** for devices that only need to report position (e.g., a radio mounted in a vehicle). Use **TAK** for devices where users actively participate in TAK operations.

### CoT (Cursor on Target) Format

TAK messages use the Cursor on Target XML format — a military standard for sharing situational awareness data. Meshtastic converts its internal protobuf messages to CoT format when bridging to TAK systems, so no manual format conversion is needed.

## TAK Identity

When using TAK roles, your node broadcasts identity information that appears on TAK maps:

| Setting | Description |
|---------|-------------|
| Team | Your team color on the TAK map (e.g., Blue, Red, Cyan, Green) |
| Role | Your operational role (Team Member, Team Lead, HQ, Medic, RTO, etc.) |
| Callsign | Your TAK callsign (defaults to your Meshtastic long name) |

These settings appear in **Settings → Module Config → TAK** when the TAK module is enabled.

> 💡 **Tip:** Team/role colors are the standard TAK affiliation colors. Coordinate with your TAK team to use consistent team assignments.

## Wire Format (V1 / V2)

Meshtastic supports two TAK wire formats:

| Format | Compatibility | Features |
|--------|--------------|----------|
| V1 (Legacy) | ATAK Plugin v1.x, older firmware | Basic CoT position sharing only |
| V2 (Current) | ATAK Plugin v2.x, firmware 2.3+ | Full CoT support including chat, routes, zstd compression |

The app automatically selects V2 when both sides support it. No manual configuration needed — the TAK module negotiates format based on firmware capabilities.

## Usage with ATAK

Once configured:
- Meshtastic nodes appear as markers on the ATAK map with callsign labels
- Chat messages can bridge between mesh and TAK networks
- Position updates flow bidirectionally between Meshtastic and TAK
- TAK Tracker nodes broadcast PLI automatically — their positions appear on ATAK maps without any ATAK-side configuration

> ⚠️ **Note:** TAK integration requires specific node roles and module configuration. Standard client nodes don't automatically participate in TAK operations.

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Node doesn't appear on ATAK map | TAK module disabled or wrong role | Verify TAK module is enabled and node role is TAK or TAK Tracker |
| Position updates are stale | GPS fix lost or interval too long | Check GPS status; reduce position broadcast interval in Position Config |
| ATAK plugin shows "disconnected" | BLE connection lost or plugin crashed | Reconnect Bluetooth in Meshtastic app, then restart ATAK plugin |
| Chat messages not bridging | V1 format doesn't support chat | Ensure both nodes run firmware 2.3+ for V2 wire format |
| CoT data not flowing | Channel mismatch | All TAK nodes must be on the same channel with matching encryption |

## Security Considerations

- TAK data shares your position and callsign information
- Ensure your channel encryption is configured when using TAK in sensitive environments
- The TAK module respects the same channel encryption as other Meshtastic messages

## Related Topics

- [Settings — Modules & Admin](settings-module-admin.md) — TAK module configuration
- [Nodes](nodes.md) — TAK and TAK Tracker roles in the node list
- [Map & Waypoints](map-and-waypoints.md) — node positions on the map
- [ATAK plugin guide](https://meshtastic.org/docs/software/integrations/atak-plugin) — detailed ATAK setup on meshtastic.org

---

