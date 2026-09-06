---
title: What's New
parent: Developer Guide
sidebar_position: 0
---

# What's New

Recent architectural and procedural changes from roughly the last 12 months. Newest at the top.

<!-- DEV_WHATS_NEW_START -->
<!-- Add new entries at the top. Format:
**Month YYYY** — [Page or area](../relative/path.md) — One sentence on what changed architecturally or procedurally.
Show roughly the last 12 months of changes; archive entries older than a year by removing them.
-->

**Jul 2026** — [SwiftData](swiftdata.md) — Protobufs bumped to `b6ad0e5` (protobufs#983) for the packet authenticity policy: `Config.SecurityConfig.packet_signature_policy` (field 9, `COMPATIBLE`/`BALANCED`/`STRICT`) and the read-only `DeviceMetadata.has_xeddsa` capability (field 14). Both map to additive V1 properties — `SecurityConfigEntity.packetSignaturePolicy` and `DeviceMetadataEntity.hasXeddsa` — so no new `VersionedSchema`/`MigrationStage` was required. Also additive from the same bump: `interdevice` SD-card commands, the `HM330X` telemetry sensor, the `FAB` firmware edition, and an EU_868 deprecation comment. Display accessors for the policy live in `Extensions/Protobufs/Config+PacketSignaturePolicy.swift`, the first file in that directory.

**Jul 2026** — [Codebase Guide](codebase.md) — `Meshtastic.xcodeproj` is now generated from `project.yml` via XcodeGen instead of being hand-maintained; most source directories (including `Meshtastic/Views/`) are Xcode 16 synchronized folders, so new files no longer need any project-file editing. A CI check (`xcodegen-drift.yml`) regenerates the project on every PR and fails if the committed project drifts from `project.yml`.

**Jul 2026** — [Architecture](architecture.md) — Protobufs resynced to upstream `master` (v2.7.26-97-g9d589c1): added the `MEDIUM_TURBO` 500 kHz modem preset (wired through `ModemPresets` and its bandwidth/SNR/label switches, gated to 2.8+ firmware via `requiresFirmware2_8`), the `LORA_OTA_APP` PortNum (logged in the inbound packet dispatch), the `MESHBEACON_CONFIG` admin module-config type, the `SPA06` telemetry sensor, `DeviceProfile.is_unmessagable`/`is_licensed` fields, the Heltec `RC32`/`RC52`/`RCC6` hardware models, and the `TRACKER_T1000_E_PRO` → `MESH_TRACKER_X1` hardware-model rename. Everything else is additive; no entity-mapping or migration changes were required.

**Jun 2026** — [LoRa Region Presets](lora-region-presets.md) — New page documenting the 2.8 `FromRadio.region_presets` map: decode/flatten into `RegionPresetInfo`, storage on `AccessoryManager`, the `selectable(supports2_8:)` firmware gating, and the LoRa config UI integration.

**Jun 2026** — [Architecture](architecture.md) — Protobufs synced to 2.8: new `meshBeaconApp` PortNum handled; `ModuleConfig.TrafficManagementConfig` reworked to implicit-enable integer fields (the boolean/precision/hop-management fields were removed) across the entity mapping and config view.

**May 2026** — [Deep Links](deep-links.md) — Added `audio` and `neighborInfo` deep links for new module config screens.

**May 2026** — [Architecture](architecture.md) — Audio, Neighbor Info module config screens; Pax Counter threshold fields; Compass Orientation picker; `IntervalConfiguration.neighborInfo` enum case for update interval picker.

**May 2026** — [Architecture](architecture.md) — Docs Translation Pipeline (`009`): markdown-level translation with community CDN feed, manifest-based caching, and automatic contribution back to `meshtastic/translations` repo.

**May 2026** — [Architecture](architecture.md) — Automatic Docs Translation (`008`): on-device Apple Translation framework integration for in-app docs, with file-based cache in Application Support.

**May 2026** — [Architecture](architecture.md) — Message Formatting Toolbar (`004`): pure SwiftUI markdown toolbar using `TextSelection` (iOS 18+), raw markdown storage in existing `messagePayload` field — no schema changes.

**May 2026** — [SwiftData](swiftdata.md) — Documented save strategy (autosave disabled, debounced saves), `@Attribute(.unique)` indexes, and data caps for positions/telemetry/messages. Fixed stale `QueryCoreData`/`UpdateCoreData` references.

**May 2026** — [CarPlay](carplay.md) — Documented fetch limits and predicates on CarPlay data queries.

**May 2026** — [Deep Links](deep-links.md) — Added `coreDataBrowser` deep link for the SwiftData database browser.

**May 2026** — [Testing](testing.md) — Snapshot test conventions established: consolidated multi-state views into single combined images (light + dark pairs), use `assertViewSnapshot` helper with explicit `width`/`height` and `transparent: true` for icon snapshots.

**May 2026** — [Architecture](architecture.md) — In-app documentation system added (`003-app-docs-markdown`): markdown source under `docs/user/` and `docs/developer/` is converted to HTML by `scripts/build-docs.sh` and bundled at `Meshtastic/Resources/docs/`.

**Apr 2026** — [Transport](transport.md) — Documented AccessoryManager transport extensions and connection lifecycle.

**Mar 2026** — [SwiftData](swiftdata.md) — Initial SwiftData developer guide: ModelContainer setup, `@Query` usage, `MeshPackets` actor, schema migrations.
<!-- DEV_WHATS_NEW_END -->
