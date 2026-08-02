---
title: What's New
parent: User Guide
sidebar_position: 0
---

# What's New

Recent user-facing changes from roughly the last 12 months. Newest at the top.

<!-- INDEX_WHATS_NEW_START -->
<!-- Add new entries at the top. Format:
**Month YYYY** — [Page title](../relative/path.md) — One sentence describing what changed or why it matters.
Show roughly the last 12 months of changes; archive entries older than a year by removing them.
-->

**Jul 2026** — [Map & Waypoints](map.md) — Precise locations only: a new Map Options toggle hides nodes that broadcast an approximate (reduced-precision) location — the ones drawn with a translucent precision circle — so the mesh map shows only nodes reporting an exact position.

**Jul 2026** — [Lockdown Mode](lockdown.md) — Support for hardened lockdown-firmware radios: set or enter the device passphrase in a full-screen prompt, with per-radio Keychain passphrase storage and silent re-unlock, optional session limits (boots, hours, per-boot cap), and Lock Now / Forget Stored Passphrase in Security settings.

**Jun 2026** — [Map & Waypoints](map.md) — Waypoint geofences: give a waypoint a circular radius and/or a bounding box and get a local alert when nodes enter or leave it, optionally limited to your favorites.

**Jun 2026** — [Nodes](nodes.md) — Local display names: give any node a local nickname shown in place of its long name across the node list, node detail, and messages. Set it from the long-press menu or the Name row in Node Detail — local-only, never sent over the mesh.

**Jun 2026** — [Map & Waypoints](map.md) — Trace routes on the map: signal-colored, directional outbound/return lines (green→red by hop SNR) with a guided 3D satellite flyover and speed control, opened with Show on Map.

**Jun 2026** — [Messages](messages.md) — Packet signing (firmware 2.8+): verified, signed broadcast messages now show a green shield, and Message Details reveals "Signed · verified". The encryption lock (private DMs) is unchanged; unsigned traffic is never flagged.

**Jun 2026** — [Nodes](nodes.md) — Signed node: nodes that sign their broadcasts show a green shield "Signed node — Verified automatically" row in the detail view (firmware 2.8+), reflecting automatic, radio-observed trust.

**Jun 2026** — [Settings](settings.md) — LoRa region/preset compatibility (firmware 2.8+): the Presets picker is filtered to those legal for the selected region, switches to the region default when needed, and warns on licensed amateur (ham) bands. The new 2.8 ham/narrow regions and presets are hidden on 2.7.x and earlier radios.

**Jun 2026** — [Settings](settings.md) — Traffic Management updated for the 2.8 firmware schema: features are now enabled implicitly by a non-zero value; the precision-bits and hop-management options were removed.

**Jun 2026** — [Nodes](nodes.md) — Persistent node filters: online, favorites, distance, hops, roles, and connection-type filters are now remembered between launches and shared across the Nodes list, Messages contacts, and map. Search text still clears on relaunch.

**Jun 2026** — [Getting Started](getting-started.md) — Redesigned first-launch setup: a clearer guided flow for Bluetooth, Local Network, Notifications, Location, and Siri permissions with colored icons and per-notification toggles.

**Jun 2026** — [MQTT](mqtt.md) — MQTT client proxy improvements: per-channel downlink subscriptions, zero-hop injection to prevent RF re-broadcast, password masking, and removal of the deprecated JSON mode toggle.

**Jun 2026** — [Settings](settings.md) — Packet Stream: watch mesh packets cross the network live in the Debug Logs view, paced for readability, with collapsible Categories and Log Levels filters.

**May 2026** — [Settings](settings.md) — Audio Module Config: Codec2 voice communication settings, only available on 2.4 GHz radios (LORA_24 region).

**May 2026** — [Settings](settings.md) — Neighbor Info Module Config: neighbor info broadcasting with configurable update interval (4–72 hours).

**May 2026** — [Settings](settings.md) — Pax Counter: added WiFi and BLE RSSI threshold fields for device counting sensitivity.

**May 2026** — [Settings](settings.md) — Compass Orientation: new 8-option picker in Display config for radios mounted at non-standard angles.

**May 2026** — [Translate](translate.md) — Docs Translation Pipeline: community-sourced translations shared via CDN so future users get instant localized docs.

**May 2026** — [Translate](translate.md) — Automatic Documentation Translation: on iOS 26+, in-app docs are translated into your device language using the Apple Translation framework.

**May 2026** — [Documentation](meshtastic:///settings/helpDocs) — Ask Chirpy: on iOS 26+, tap the sparkle icon in the docs to ask an on-device AI assistant grounded in this documentation; with internet it may also reference meshtastic.org sources.

**May 2026** — [Messages](messages.md) — Message Formatting Toolbar (iOS 18+/macOS 15+): bold, italic, strikethrough, code, and link formatting with live preview.

**May 2026** — [Nodes](nodes.md) — Node List Layout: switchable Complete and Compact density modes; Compact reduces row height for large meshes.

**May 2026** — [Units, Measurement & Locale](units-and-locale.md) — New page explaining how the app automatically adapts temperatures, distances, speeds, and times to your device's regional settings.

**May 2026** — [Messages](messages.md) — Channel conversations now load the most recent 50 messages with a Load More button for older history.

**May 2026** — [CarPlay](carplay.md) — Direct message list is now capped at 200 users sorted by most recent, improving performance on large meshes.

**May 2026** — [Translate](translate.md) — New page explaining how to contribute app translations via Xcode string catalogs.

**May 2026** — [Signal Meter](signal-meter.md) — New deep-dive page explaining how the LoRa signal quality meter works, why negative SNR values are normal, and how to interpret RSSI vs. SNR.

**May 2026** — [Apple Watch App](watch.md) — New page covering the companion watch app: node list, fox hunt compass, and how it syncs with your iPhone.

**Apr 2026** — [CarPlay](carplay.md) — New page documenting CarPlay support: channels, direct messages, Siri voice commands, and Live Activity.

**Apr 2026** — [Discovery](discovery.md) — New page covering the local mesh discovery scanner for mapping nearby nodes.
<!-- INDEX_WHATS_NEW_END -->
