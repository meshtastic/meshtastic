---
title: Architecture Overview
parent: Developer Guide
sidebar_position: 1
---

# Architecture Overview

The Meshtastic Apple app targets iOS, iPadOS, and macOS (via Mac Catalyst). It communicates with Meshtastic radios over BLE, TCP/IP, and (on macOS) serial.

## App Entry Point

`Meshtastic/MeshtasticApp.swift` is the `@main` `App` struct. On launch it:

1. Creates `PersistenceController.shared` (SwiftData `ModelContainer`)
2. Instantiates `AppState` (wraps `Router`)
3. Instantiates `AccessoryManager` (BLE/TCP/serial connectivity)
4. Instantiates `AccessoryManager.shared` as an `@EnvironmentObject` for the view hierarchy

`MeshtasticAppDelegate.swift` handles `UIApplicationDelegate` hooks for SiriKit CarPlay messaging intents.

## Router & Navigation

`Router` (`Meshtastic/Router/Router.swift`) is a `@MainActor` `ObservableObject` that owns a `NavigationState` struct. It drives tab selection and deep-link routing.

```
Router
└── NavigationState
    ├── MessagesNavigationState   (tab 0)
    ├── MapNavigationState        (tab 1)
    ├── NodesNavigationState      (tab 2)
    └── SettingsNavigationState   (tab 3)
```

Deep links use the `meshtastic:///` URL scheme. `Router.route(url:)` parses the path and sets the appropriate navigation state. See [Deep Links](./deep-links.md) for the full URL reference.

## AppState

`AppState` wraps `Router` and is injected as an `@EnvironmentObject` at the root of the SwiftUI view hierarchy. Views that need to navigate programmatically read `@EnvironmentObject var router: Router` directly — or more commonly `@EnvironmentObject var appState: AppState` and access `appState.router`.

## AccessoryManager

`AccessoryManager` is the central connectivity manager split across extension files:

| File | Responsibility |
|------|---------------|
| `AccessoryManager+Discovery.swift` | BLE scanning, device discovery |
| `AccessoryManager+Connect.swift` | Connection lifecycle, reconnect logic |
| `AccessoryManager+ToRadio.swift` | Packets sent to the radio |
| `AccessoryManager+FromRadio.swift` | Packets received from the radio |
| `AccessoryManager+Position.swift` | GPS position sharing |
| `AccessoryManager+MQTT.swift` | MQTT proxy |
| `AccessoryManager+TAK.swift` | TAK/CoT integration |

Transport protocols are in `Meshtastic/Accessory/Transports/`.

## Persistence

SwiftData is the sole persistence layer. `PersistenceController.shared` owns the `ModelContainer`. Views use `@Environment(\.modelContext)` or `@Query`. Background writes use the `MeshPackets` `@ModelActor`.

Model types are defined with `@Model` in `Meshtastic/Model/`. Schema evolution uses `VersionedSchema` and `SchemaMigrationPlan` in `MeshtasticSchema.swift`.

## Services

Application services that are not tied to radio connectivity live in `Meshtastic/Services/`.

| File | Responsibility |
|------|---------------|
| `DocTranslationService.swift` | On-device documentation translation using the Apple Translation framework (primary) with FoundationModels fallback. Translates bundled English markdown source files, caches translated `.md`, converts to HTML via `MarkdownConverter`, and triggers auto-upload after prefetch. iOS 26+. |
| `TranslationCache.swift` | File-based cache for translated `.md` content stored in Application Support. Tracks content hashes for staleness detection and enforces a 50 MB per-language LRU eviction policy. |
| `MarkdownConverter.swift` | GFM-compatible markdown→HTML converter. Supports headings, paragraphs, lists, code fences, inline code, tables, links, images, HTML passthrough (`<picture>`, `<img>`), blockquote callouts (tip/warning), bold, italic, strikethrough, horizontal rules, and `.md` → `.html` link rewriting. Strips YAML front matter and Jekyll inline attributes. |
| `DocsTranslationUploader.swift` | Automatically commits translated `.md` files to `meshtastic/translations` repo after background prefetch completes. Performs read-only checks against `meshtastic/meshtastic` and `meshtastic/translations` (no auth), then commits via GitHub Contents API using a fine-grained PAT from `Secrets.json`. Per-file tracking enables retry of failed uploads. |
| `CommunityTranslationFetcher.swift` | Downloads existing community translations from the GitHub Pages CDN feed (`index.json`) before falling back to on-device translation. Fetches `nav-labels.json` and `search-index.json` for translated UI strings and search keywords. Builds a pre-rendered translated folder so `DocBundle` can load translated pages directly. |

## Protobufs

The `MeshtasticProtobufs` Swift Package (`MeshtasticProtobufs/Package.swift`) wraps protobuf-generated Swift sources. Regenerate with `./scripts/gen_protos.sh` after updating the `protobufs/` submodule.
