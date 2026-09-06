---
title: Contributing
parent: Developer Guide
sidebar_position: 7
---

# Contributing

Thank you for contributing to Meshtastic Apple! Please read this guide before opening a PR.

## Prerequisites

- Xcode (latest stable)
- iOS/macOS simulators installed
- SwiftLint (`brew install swiftlint`)

Run `./scripts/setup-hooks.sh` once after cloning to install the pre-commit SwiftLint hook.

## Documentation

The app ships a built-in Help & Documentation browser, a Jekyll site on GitHub Pages, and documentation is also published to the main [meshtastic.org](https://meshtastic.org) site.

| Resource | Location |
|----------|----------|
| Meshtastic.org | [meshtastic.org/docs/category/apple-apps](https://meshtastic.org/docs/2.7/category/apple-apps/) |
| GitHub Pages | [meshtastic.github.io/Meshtastic-Apple](https://meshtastic.github.io/Meshtastic-Apple/) |
| In-app | Settings → Help & Documentation |
| Deep link | [`meshtastic:///settings/helpDocs`](meshtastic:///settings/helpDocs) |

Source markdown lives under `docs/user/` and `docs/developer/`. To rebuild the bundled HTML after editing any markdown:

```sh
bash scripts/build-docs.sh --output Meshtastic/Resources/docs
```

Commit the regenerated files under `Meshtastic/Resources/docs/` with your PR.

## Branch Naming

Branch from `main` (trunk-based development). Use descriptive names:

```
feat/bluetooth-reconnect-improvements
fix/crash-on-ble-disconnect
docs/update-mqtt-guide
chore/update-protobufs
```

## Commit Messages

Use imperative mood subject lines:

```
Fix crash when BLE device disconnects
Add TAK CoT position relay support
Update protobufs to v2.7
```

Explain *what* changed and *why* in the body. Keep subject lines under 72 characters.

## PR Checklist

- [ ] All existing tests pass (`⌘U` in Xcode)
- [ ] New tests written for new features and bug fixes
- [ ] SwiftLint reports no new errors or warnings
- [ ] UI changes include screenshots or a screen recording in the PR description
- [ ] Deep link additions are documented in `docs/developer/deep-links.md`
- [ ] SwiftData schema changes include a `VersionedSchema` and `MigrationStage`
- [ ] Protobuf changes are regenerated with `./scripts/gen_protos.sh` and built

## Code Style

- **Swift only.** No Objective-C.
- **SwiftUI** for all UI. UIKit only where unavoidable.
- **SF Symbols** for all icons — no embedded image assets for icons.
- **OSLog** for all logging — no `print()`. SwiftLint enforces this.
- Indent with **tabs**.
- Opening braces on the same line.
- `// MARK: -` to separate logical sections.
- `guard` for early exit; avoid deeply nested `if`.

## SwiftLint Limits

| Check | Warning | Error |
|-------|---------|-------|
| Line length | 400 | — |
| File length | 3500 | — |
| Type body length | 400 | — |
| Function body length | 200 | — |
| Cyclomatic complexity | 60 | — |
| Type name length | 60 | 70 |

## Platform Guards

- Guard iOS-only APIs: `#if !targetEnvironment(macCatalyst)`
- Guard canImport: `#if canImport(UIKit)`
- Guard version availability: `if #available(iOS 26, *) { ... }`

## Updating Protobufs

`./scripts/gen_protos.sh` bumps the `protobufs/` submodule and regenerates
`MeshtasticProtobufs/Sources/` in one step — no separate `git submodule update`:

```sh
./scripts/gen_protos.sh             # pull protobufs origin/master, then regenerate
./scripts/gen_protos.sh develop     # pull a different branch, tag or commit
./scripts/gen_protos.sh --no-pull   # regenerate against the currently pinned protos
```

Only `protoc` needs to be installed (`brew install protobuf`). The script builds
`protoc-gen-swift` itself, from the swift-protobuf version pinned in
`MeshtasticProtobufs/Package.resolved` — **never** generate with a Homebrew
`protoc-gen-swift`. Brew's plugin drifts older than what the project links and
silently downgrades every generated file, dropping `Sendable`,
`Swift.CaseIterable`/`allCases` and the `// swiftlint:disable all` header, which
removes concurrency conformance and makes SwiftLint lint generated code.

After regenerating:

1. Build and verify tests pass.
2. Mirror any new proto enum cases into the app-side enums that shadow them —
   `FirmwareEditions`, `RegionCodes`, and friends map by raw value, so an
   unmapped case silently falls back to a default instead of failing to compile.
3. Commit the generated changes together with the submodule pointer update.

## Release Process

See `RELEASING.md` in the repository root for the full release checklist and App Store submission process.
