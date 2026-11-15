---
title: Developer Guide
layout: default
sidebar_position: 2
has_children: true
parent: Developer Guide
---

# Developer Guide

Technical documentation for contributing to the Meshtastic Android and Desktop app.

## Before You Open a PR

Things that trip up first-time contributors — check these before requesting review:

- **Formatting passes** — run `./gradlew spotlessApply` to auto-format, then verify with `spotlessCheck`
- **Detekt passes** — run `./gradlew detekt detektTypeResolved` and fix all reported issues; the second task runs the rules that need the compile classpath
- **All tests pass** — run `./gradlew test allTests` (both are needed: `test` covers Android-only modules, `allTests` covers KMP)
- **Screenshot tests pass** — if you touched any Compose UI, run `./gradlew :screenshot-tests:validateDebugScreenshotTest` and update reference images if needed
- **Protos are an external dependency** — protobuf models come from the `org.meshtastic:protobufs` Maven artifact (pinned in `gradle/libs.versions.toml`); change protos upstream and bump the version, never edit generated code locally
- **Docs updated** — if you changed user-visible UI, update the corresponding page under `docs/en/user/`
- **Previews updated** — if you changed UI composables, update the corresponding `*Previews.kt` file and the screenshot-test baselines
- **Branch naming** — start the branch with `feat/`, `fix/`, `chore/`, `docs/`, `build/`, `ci/`, `refactor/`, `test/`, or `deps/`, or use a spec branch name; [Contributing](contributing.md) has the full rule

## What's New for Developers

<!-- DEV_WHATS_NEW_START -->
<!-- Add new entries at the top. Format:
**Month YYYY** — [Page or area](relative/path) — One sentence on what changed architecturally or procedurally.
Keep the last 5–8 entries and trim older ones from the bottom.
-->

**October 2026** — [Navigation & Deep Links](navigation-and-deep-links.md) — The route table covers every pattern the router accepts, including the fallbacks that open the nearest nodes, map, or settings route for an unknown sub-path.

**October 2026** — [Persistence](persistence.md) — Each connected node has its own database, app data backup and restore are documented, and telemetry is read from `MeshLog` rather than `Packet`.

**October 2026** — [Test Builds & Obtainium](test-builds.md) — Promotion moves one release from tag to tag, and post-release cleanup deletes the prereleases.

**September 2026** — [Navigation & Deep Links](navigation-and-deep-links.md) — Deep links route through Navigation 3's `UriDeepLinkMatcher` instead of a hand-rolled `when` block.

**September 2026** — [Measurement & Formatting](measurement.md) — `NumberFormatter.format` follows the OS locale; `formatInvariant` is the fixed-dot one for payloads another system parses.

**September 2026** — [Documentation Style](documentation-style.md) — Section 11 of the Meshtastic design standards is now the style guide for `docs/en/`; this page keeps only the repository mechanics, the in-app renderer's admonition form, and the prose rules the standards leave open.

**August 2026** — [Documentation Style](documentation-style.md) — New page: the house style guide for `docs/en/` prose, with rule IDs, a project word list, and the reasoning behind each convention.

**August 2026** — Map tile sources are one shared catalogue in `feature/map` (`MapTileCatalogue`, `RasterTileSpec`), so both flavors draw the same raster base maps and overlays from one definition.

**August 2026** — Both maps draw an imported feature's own icon and drape a KMZ `GroundOverlay` image at its `LatLonBox` (rotation included) — MapLibre via an `ImageSource` quad, Google via `GroundOverlayOptions` (#3786).

**August 2026** — Offline map-pack downloads are gated on `offlineMapsSupported`, since the MapLibre offline API compiles on Desktop but silently downloads nothing there.

**August 2026** — New module `feature/map-maplibre`: the F-Droid flavor and Desktop now render every map surface (main map, node track, traceroute, discovery, inline mini-map) through `maplibre-compose` from one multiplatform module, and `osmdroid` is gone. The shared rules both renderers must agree on live in `feature/map` policy classes.

<!-- DEV_WHATS_NEW_END -->

