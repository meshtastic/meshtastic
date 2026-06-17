---
title: Developer Guide
sidebar_position: 2
---

# Developer Guide

Technical documentation for contributing to the Meshtastic Apple app.

See [What's New](whats-new) for recent architectural and procedural changes from the last 12 months, or browse the pages in the sidebar.

---

## Before You Open a PR

Things that trip up first-time contributors — check these before requesting review:

- **SwiftLint passes** — run `bash scripts/setup-hooks.sh` once to install the pre-commit hook, then verify no new warnings with `swiftlint lint`
- **Snapshot tests pass** — if you touched any SwiftUI view, run `MeshtasticTests/SwiftUIViewSnapshotTests` and commit updated reference PNGs
- **Protos regenerated** — if the `protobufs/` submodule changed, run `./scripts/gen_protos.sh` and commit the generated Swift sources
- **SwiftData migration** — if you added or changed any `@Model` type, add a new `VersionedSchema` and `MigrationStage` in `MeshtasticSchema.swift`
- **Docs updated** — if you changed user-visible UI, update the corresponding page under `docs/user/`. The `docs-staleness` CI check will flag the PR if you didn't. Add the `skip-docs-check` label if it genuinely isn't needed.
- **Commit message** — imperative mood subject line, explain *what* and *why* in the body
