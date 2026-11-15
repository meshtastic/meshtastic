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

**Nov 2026** — [TAK](tak.md#certificates) — The TAK server issues its own certificates for each install instead of a set shared by every copy of the app, so only the client you set up from this phone's data package can connect. Export and import the data package again; remove the old Meshtastic connection in ATAK or iTAK first.

**Nov 2026** — [Bluetooth](bluetooth.md#troubleshooting) — On Apple Vision Pro, when a radio asks for a Bluetooth PIN while pairing, the Connect screen says the headset can't enter one and to set the radio's pairing mode to No PIN (Just Works) from another device.

**Nov 2026** — [Local Mesh Discovery](discovery.md#running-a-scan) — A finished scan stays on screen until **New Scan**, which starts the next setup with the beacons the scan just heard and the popular presets already selected.

**Nov 2026** — [Cinema](cinema.md#fire-lookout) — On Apple Vision Pro, a node's card out the fire lookout's windows opens beside its marker as you see it from where you are, and sits on a bar you can pinch to move it.

**Nov 2026** — [Cinema](cinema.md#radio-models) — On Apple Vision Pro, the connected radio's model on the cinema's stand shows its screen live, the card beside it has the radio's buttons and a size slider up to five times real size, and the stand and card turn to face you.

**Nov 2026** — [Getting Started](getting-started.md#step-3-set-up-your-radio) — A radio that connects with no LoRa region opens a short setup for its region, preset and name, and **Set Up Radio** on the Connect screen and in Settings opens it any time.

**Nov 2026** — [Getting Started](getting-started.md#first-launch-setup) — First-launch setup opens with a welcome page about off-grid messaging and location privacy, and the permission pages are restyled with plain icons and larger text.

**Nov 2026** — [Cinema](cinema.md#fire-lookout) — On Apple Vision Pro, nodes out the fire lookout's windows are small chips on stems, standing at different heights where they're close together, and tapping one opens a card beside it with the node's details and buttons to show it on the 3D map or the screen.

**Nov 2026** — [Cinema](cinema.md#fire-lookout) — On Apple Vision Pro, the fire lookout's shutters are all open, so the view shows round the screen and boards, the awnings are propped up out of the windows, and the cab stands 6 m (20 ft) lower.

**Nov 2026** — [Cinema](cinema.md#fire-lookout) — On Apple Vision Pro, the **Turn Lookout** dial in the Cinema panel turns the fire lookout a sixteenth of a turn at a time, so the screen can face whichever part of the view you want.

**Nov 2026** — [Map & Waypoints](map.md#map-options) — Hillshade has a Shade Valleys option that also darkens valley floors and gorges by how much of the sky they see, and hillshade now fades out past the zoom the downloaded terrain reaches instead of drawing made-up detail.

**Oct 2026** — [Cinema](cinema.md#fire-lookout) — On Apple Vision Pro, the 3D map shows the fire lookout, cab and tower, on the summit you picked for it in the Cinema.

**Oct 2026** — [Cinema](cinema.md#fire-lookout) — On Apple Vision Pro, a fire lookout to sit in: a glass cab on a summit at sunset. With terrain downloaded for the 3D map, it stands on one of the highest mountains in it, with the real terrain out the windows and every node marked where it is by bearing and distance.

**Oct 2026** — [Cinema](cinema.md#boards) — On Apple Vision Pro, the tent has a second whiteboard: the status messages of your radio and of the latest nodes heard with one.

**Oct 2026** — [Cinema](cinema.md) — On Apple Vision Pro, the Cinema has a second place to sit: a ham shack, with the app on the wall over an operating desk of radios, a window out to the antenna tower, and your team, the latest trace route and the net's check-ins on the same boards as in the tent.

**Oct 2026** — [Bluetooth Device Connection](bluetooth.md#widgets-and-controls) — The Connect screen's Live Activity row is now **Widgets**: one sheet to start or switch the Live Activity and to see which widgets and controls are on your screens, with how to add the rest.

**Oct 2026** — [Cinema](cinema.md) — On Apple Vision Pro, a search and rescue tent with the app on a big screen, the 3D map in front of you, your team on the whiteboard and the latest trace route on the wall.

**Oct 2026** — [Hardware Showcase](showcase.md) — On Apple Vision Pro, a room with real-size models of Meshtastic radios on display tables, grouped by maker: pick one up and turn it over in your hand. The radios on your mesh are on the wall rack. Open it from the spatial map.

**Oct 2026** — [Bluetooth Device Connection](bluetooth.md#live-activity) — The Live Activity now shows what you choose: a mesh status glance from the Connect screen, or one node from its detail screen with its battery, signal, last heard and distance. It survives a dropped link and appears on the Apple Watch Smart Stack and, on iOS 26, the CarPlay Dashboard.

**Oct 2026** — [Map & Waypoints](map.md) — On Apple Vision Pro, the spatial map now keeps a full offline map of the mesh, streets and terrain, and grows it whenever the app is open, not only while the spatial map is showing.

**Sep 2026** — [Firmware Updates](firmware.md) — Factory Erase now uses the OTAFIX bootloader's own erase when the radio's bootloader supports it: one file for every board, and the installed firmware is kept, so the radio boots factory-fresh instead of needing firmware reinstalled. Older bootloaders are unchanged.

**Sep 2026** — [Firmware Updates](firmware.md) — The bootloader board list and erase files are now fetched from meshtastic.org in the background rather than being fixed at each app release, so newly supported boards work without an app update. The app still ships with a copy and falls back to it when offline. Five more boards are supported as a result.

**Aug 2026** — [Settings](settings.md) — New Waypoints notification setting: received-waypoint alerts can be switched off on their own. Reaction alerts follow the existing message notification settings.

**Jul 2026** — [Settings](settings.md) — Packet Authenticity: on firmware that reports XEdDSA support, Security settings gains a Protection Level of Compatible, Balanced, or Strict, controlling whether your radio accepts mesh packets it cannot cryptographically authenticate; Strict asks for confirmation first, and the setting matches the Meshtastic app for Android.

**Jul 2026** — [Bluetooth Device Connection](bluetooth.md) — Connect now shows an inline "Bluetooth is off" row in Available Radios when Bluetooth is disabled, with a tap-to-open-Settings shortcut — previously there was no in-app signal once the system Bluetooth power alert was suppressed.

**Jul 2026** — [Messages](messages.md) — Received tapback reactions now notify (e.g. "Alice reacted 👍 to …"), matching iMessage and Meshtastic-Android; muted conversations are respected, the unread-badge behavior is unchanged, and reactions to messages your radio never saw are stored silently.

**Jul 2026** — [Local Mesh Discovery](discovery.md) — Mesh beacons: scans capture beacons advertising a mesh (message, channel, region, preset) and show them in the results. Public-channel presets are auto-added to the scan and pre-selected next time; custom-channel beacons are tuned into directly (name + key) so even private meshes are found. Each beaconed channel gets a Switch to this channel button to join it.

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

**May 2026** — [Settings](settings.md) — Pax Counter: added Wi-Fi and BLE RSSI threshold fields for device counting sensitivity.

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
