---
title: Contributing
sidebar_position: 8
last_updated: 2026-10-21
description: Branch naming, commit style, PR workflow, and the verification gates a change must pass before merge.
parent: Developer Guide
---

# Contributing

Guidelines for contributing to the Meshtastic Android/Desktop project (a KMP codebase that also compiles for iOS).

## Branch Naming

Branches use conventional-commit style prefixes:

| Prefix | Use for |
|--------|---------|
| `feat/<scope>` | New user-visible behavior |
| `fix/<scope>` | Bug fixes |
| `refactor/<scope>` | Code structure changes |
| `chore/<scope>` | Tooling, deps, CI, cleanup |
| `docs/<scope>` | Documentation only |
| `build/<scope>` | Build system changes |
| `ci/<scope>` | CI workflow changes |
| `test/<scope>` | Test additions or fixes |
| `deps/<scope>` | Dependency updates |

Spec-driven work takes no prefix from that list: a numeric spec prefix (`005-tak-v2-protocol`) or the timestamp form `YYYYMMDD-HHMMSS-feature-name` created by `/speckit.git.feature`. `release/*` and `automation/*` are reserved for maintainers and automated workflows.

Examples:
- `feat/desktop-ble-transport`
- `fix/bluetooth-reconnect`
- `20260601-074653-air-quality-telemetry`

## Development Workflow

1. **Fork** the repository (external contributors) or create a branch (maintainers).
2. **Implement** your changes following the architecture guidelines.
3. **Test** locally: `./gradlew spotlessCheck detekt detektTypeResolved assembleDebug kmpSmokeCompile test allTests`
4. **Commit** with clear, descriptive messages.
5. **Push** and open a Pull Request.

## Commit Messages

Follow conventional commit style:
```text
feat(docs): add in-app documentation browser
fix(ble): handle reconnection timeout
refactor(navigation): migrate to typed routes
test(search): add keyword ranking tests
```

## Pull Request Checklist

Before submitting:
- [ ] Code compiles on all targets: `./gradlew assembleDebug kmpSmokeCompile`
- [ ] All tests pass: `./gradlew test allTests`
- [ ] Code style passes: `./gradlew spotlessCheck`
- [ ] Static analysis passes: `./gradlew detekt detektTypeResolved`
- [ ] New code has appropriate test coverage
- [ ] No `android.*` imports in `commonMain`
- [ ] Koin modules registered if new DI is added
- [ ] Routes added to `Routes.kt` and registered in `NavigationConfig.kt` if new navigation is introduced
- [ ] Documentation updated if user-facing behavior changes

## Code Style

- **Formatting:** Enforced by Spotless, which runs ktfmt (kotlinlang style) and then ktlint, and checks only files changed since `origin/main`
- **Static analysis:** Detekt with project-specific configuration (`config/detekt/detekt.yml`)
- **Imports:** No wildcard imports; organized automatically by Spotless
- **Line length:** 120 characters maximum

Run formatting:
```shell
./gradlew spotlessApply
```

## Architecture Rules

- Feature modules must not depend on other feature modules; `feature:map-maplibre` and `feature:coverage` building on `feature:map` and `feature:map-terrain` are the exceptions
- `commonMain` must not contain `android.*`, `java.io.*`, or platform-specific imports
- Prefer interface + DI over `expect`/`actual` for complex platform behaviors
- All navigation routes must be `@Serializable` and defined in `Routes.kt`
- Use Koin annotations (`@Single`, `@Factory`, `@Module`) for dependency injection

## Verification

Full pre-merge verification:
```shell
./gradlew spotlessCheck detekt detektTypeResolved assembleDebug kmpSmokeCompile test allTests
```

CI compiles the test shards with `-PwarningsAsErrors=true`; add it locally to catch a new Kotlin warning before CI does.

For docs-specific changes, also run the Gradle bundle checks and the scripts the `docs-quality.yml` workflow runs on every docs pull request:
```shell
./gradlew generateDocsBundle validateDocsBundle
node scripts/validate-doc-links.js docs/en
node scripts/check-doc-coverage.js .
node scripts/check-doc-aliases.js .
node scripts/check-doc-freshness.js docs/en --max-age-days=180
python3 scripts/docs/sync-locale-front-matter.py --check
```

Prose in `docs/en/` follows Section 11 of the [Meshtastic Client Design Standards](https://github.com/meshtastic/design/tree/master/standards) — see [Documentation Style](documentation-style.md) for what's specific to this repository.

## Getting Help

- [Meshtastic Discord](https://discord.gg/meshtastic) — `#app-development` channel
- GitHub Issues — for bug reports and feature requests
- [GitHub Discussions](https://github.com/orgs/meshtastic/discussions/categories/android) — for questions and ideas
