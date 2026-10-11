---
title: Persistence
sidebar_position: 6
last_updated: 2026-08-29
description: The app's three persistence layers — Room, DataStore, and core:prefs — and when a contributor should use each.
parent: Developer Guide
---

# Persistence

The app's three persistence layers — Room, DataStore, and `core:prefs` — and when a contributor should use each.

## Room KMP Database

**Module:** `core:database`

The primary structured data store:
- Node information and history
- Message history
- Waypoints
- Telemetry data
- Channel set configuration (channel names and LoRa config)

### Key Points

- Uses Room KMP for cross-platform compatibility
- Migrations managed through Room's built-in migration system
- DAO interfaces live in `core:database`
- Repository layer in `core:repository` provides the public API
- Full-text message search is backed by an FTS5 content table (`PacketFts`) over `Packet`, kept in sync by Room-managed triggers

### What's Stored in Room

| Entity | Description |
|--------|-------------|
| `NodeEntity` | All known mesh nodes and their metadata |
| `MyNodeEntity` | The local node's own info |
| `Packet` | Message history (channel and direct), waypoints, and telemetry data |
| `PacketFts` | FTS5 virtual table mirroring `Packet.messageText` for full-text message search (Room-managed INSERT/UPDATE/DELETE triggers keep it in sync) |
| `ContactSettings` | Per-contact mute and read-state |
| `ReactionEntity` | Emoji reactions on messages |
| `MeshLog` | Raw mesh protocol logs |
| `MetadataEntity` | Device metadata (firmware version, hardware model) |
| `ChannelSetEntity` | The connected radio's channel set — channel names and LoRa config — one row per device |
| `QuickChatAction` | User-configured quick-chat messages |
| `DeviceHardwareEntity` | Cached device hardware catalog |
| `FirmwareReleaseEntity` | Cached firmware release info |
| `TracerouteNodePositionEntity` | Traceroute hop position data |
| `DiscoverySessionEntity` | A Local Mesh Discovery scan session (timestamp, presets scanned, home preset) |
| `DiscoveryPresetResultEntity` | Per-preset result within a discovery session |
| `DiscoveredNodeEntity` | Nodes found during a discovery preset scan |
| `DeviceLinkEntity` | Cached `msh.to` device links from the Meshtastic API |

> ℹ️ **Note:** Waypoints and telemetry are stored within the `Packet` entity (the `port_num` field distinguishes packet types), alongside a `channel` index recording which channel each packet used. Channel *configuration* — names and LoRa settings — lives separately, in `ChannelSetEntity`.

## DataStore Preferences

**Module:** `core:datastore`

For lightweight key-value preferences:
- Local radio configuration (`LocalConfig`)
- Module configuration (`ModuleConfig`)
- Local statistics
- Recently connected radio addresses

## Core Prefs

**Module:** `core:prefs`

Higher-level preferences abstraction:
- User-facing settings
- App behavior configuration
- Feature toggles

## What Docs Intentionally Skip

The `feature:docs` module uses **no** Room or persistent database. Documentation ships as build-time assets versioned with the app binary, so it stays fully offline, is replaced on each update, and needs no migration story. Optional UX state (e.g. last viewed page) could live in `core:prefs` but isn't part of the docs data model.

## Best Practices

- Use Room for structured, queryable data that changes at runtime
- Use DataStore for simple preferences and state
- Use bundled resources/assets for static content
- Never store sensitive data (keys, passwords) in plain Room tables
- Always provide migrations for schema changes
