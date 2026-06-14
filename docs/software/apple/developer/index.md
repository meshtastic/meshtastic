---
title: Developer Guide
sidebar_position: 2
---

# Developer Guide

Technical documentation for contributing to the Meshtastic Apple app.

---

## Before You Open a PR

Things that trip up first-time contributors — check these before requesting review:

- **SwiftLint passes** — run `bash scripts/setup-hooks.sh` once to install the pre-commit hook, then verify no new warnings with `swiftlint lint`
- **Snapshot tests pass** — if you touched any SwiftUI view, run `MeshtasticTests/SwiftUIViewSnapshotTests` and commit updated reference PNGs
- **Protos regenerated** — if the `protobufs/` submodule changed, run `./scripts/gen_protos.sh` and commit the generated Swift sources
- **SwiftData migration** — if you added or changed any `@Model` type, add a new `VersionedSchema` and `MigrationStage` in `MeshtasticSchema.swift`
- **Docs updated** — if you changed user-visible UI, update the corresponding page under `docs/user/`. The `docs-staleness` CI check will flag the PR if you didn't. Add the `skip-docs-check` label if it genuinely isn't needed.
- **Commit message** — imperative mood subject line, explain *what* and *why* in the body

---

## What's New for Developers

<!-- DEV_WHATS_NEW_START -->
<!-- Add new entries at the top. Format:
**Month YYYY** — [Page or area](relative/path) — One sentence on what changed architecturally or procedurally.
Keep the last 5–8 entries and trim older ones from the bottom.
-->

**May 2026** — [SwiftData](swiftdata) — Documented save strategy (autosave disabled, debounced saves), `@Attribute(.unique)` indexes, and data caps for positions/telemetry/messages. Fixed stale `QueryCoreData`/`UpdateCoreData` references.

**May 2026** — [CarPlay](carplay) — Documented fetch limits and predicates on CarPlay data queries.

**May 2026** — [Deep Links](deep-links) — Added `coreDataBrowser` deep link for the SwiftData database browser.

**May 2026** — [Testing](testing) — Snapshot test conventions established: consolidated multi-state views into single combined images (light + dark pairs), use `assertViewSnapshot` helper with explicit `width`/`height` and `transparent: true` for icon snapshots.

**May 2026** — [Architecture](architecture) — In-app documentation system added (`003-app-docs-markdown`): markdown source under `docs/user/` and `docs/developer/` is converted to HTML by `scripts/build-docs.sh` and bundled at `Meshtastic/Resources/docs/`.

**Apr 2026** — [Transport](transport) — Documented AccessoryManager transport extensions and connection lifecycle.

**Mar 2026** — [SwiftData](swiftdata) — Initial SwiftData developer guide: ModelContainer setup, `@Query` usage, `MeshPackets` actor, schema migrations.

<!-- DEV_WHATS_NEW_END -->
