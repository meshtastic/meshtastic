---
title: Persistence
sidebar_position: 6
last_updated: 2026-10-21
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
- `DatabaseManager` keeps one Room database per connected device, with LRU eviction
- `DatabaseBackupService` exports a device's database to a file the user picks, and stages a validated restore that replaces the database the next time it opens; a restore is never applied to an open database. `DatabaseBackup.SCHEMA_VERSION` must equal the `@Database` version, and a `jvmTest` checks that

### What's Stored in Room

| Entity | Description |
|--------|-------------|
| `NodeEntity` | All known mesh nodes and their metadata |
| `MyNodeEntity` | The local node's own info |
| `Packet` | Message history (channel and direct), alerts, waypoints, and node status, the ports in `PERSISTED_DATA_PORT_NUMBERS` |
| `PacketFts` | FTS5 virtual table mirroring `Packet.messageText` for full-text message search (Room-managed INSERT/UPDATE/DELETE triggers keep it in sync) |
| `ContactSettings` | Per-conversation settings: mute, read position, filter bypass, unsent draft, pin, and a retired channel's label |
| `ReactionEntity` | Emoji reactions on messages |
| `MeshLog` | Raw mesh protocol logs; telemetry history and other per-node logs are read back from it by port |
| `MetadataEntity` | Device metadata (firmware version, hardware model) |
| `ChannelSetEntity` | The connected node's channel set (channel names and LoRa config), one row per device |
| `QuickChatAction` | User-configured quick-chat messages |
| `DeviceHardwareEntity` | Cached device hardware catalog |
| `FirmwareReleaseEntity` | Cached firmware release info |
| `TracerouteNodePositionEntity` | Traceroute hop position data |
| `DiscoverySessionEntity` | A Local Mesh Discovery scan session (timestamp, presets scanned, home preset) |
| `DiscoveryPresetResultEntity` | Per-preset result within a discovery session |
| `DiscoveredNodeEntity` | Nodes found during a discovery preset scan |
| `DeviceLinkEntity` | Cached `msh.to` device links from the Meshtastic API |
| `EventFirmwareEditionEntity` | Event-firmware display records cached from the Meshtastic API (`/resource/eventFirmware`) |
| `BootloaderOtaQuirksCacheEntity` | Single-row cache of the nRF52 bootloader/OTA quirk catalog (`/resource/bootloaderOtaQuirks`), stored as one serialized envelope |
| `MaintenanceUf2CacheEntity` | Single-row cache of the maintenance-UF2 manifest (`/resource/maintenanceUf2`), stored as one serialized envelope |
| `MqttRootsCacheEntity` | Single-row cache of the MQTT root directory the topic finder places a user with (`/resource/mqttRoots`), stored as one serialized envelope |
| `MergeMarkerEntity` | Marks a completed `DatabaseMerger` merge so a re-run on the next connection skips it instead of duplicating rows |

> ℹ️ **Note:** Waypoints are stored within the `Packet` entity (the `port_num` field distinguishes packet types), alongside a `channel` index recording which channel each packet used. Telemetry isn't a `Packet`: `MeshLogRepository.getTelemetryFrom` reads it from `MeshLog`. Channel *configuration* (names and LoRa settings) lives separately, in `ChannelSetEntity`.

## DataStore Preferences

**Module:** `core:datastore`

For lightweight key-value preferences:
- Local node configuration (`LocalConfig`)
- Module configuration (`ModuleConfig`)
- Local statistics
- Recently connected node addresses
- Dismissed bootloader warnings, per device address
- A pending firmware recovery, for an update that may have left a device in its bootloader

## Core Prefs

**Module:** `core:prefs`

Higher-level preferences abstraction:
- User-facing settings
- App behavior configuration
- Feature toggles

## What Docs Intentionally Skip

The `feature:docs` module uses **no** Room or persistent database. Documentation ships as build-time assets versioned with the app binary, so it stays fully offline, is replaced on each update, and needs no migration story. The one thing it writes is a file cache of machine-translated pages on the `google` flavor (`DocTranslationCache`, in the app's cache directory). Each entry is keyed by page, locale, and a hash of the English source, so an edited page misses the cache, and the cache is capped at 50 MB. Optional UX state (for example, the last viewed page) could live in `core:prefs` but isn't part of the docs data model.

## Best Practices

- Use Room for structured, queryable data that changes at runtime
- Use DataStore for simple preferences and state
- Use bundled resources/assets for static content
- Never store sensitive data (keys, passwords) in plain Room tables
- Always provide migrations for schema changes
