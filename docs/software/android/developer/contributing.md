---
title: Contributing
sidebar_position: 8
last_updated: 2026-05-13
parent: Developer Guide
---

# Contributing

Guidelines for contributing to the Meshtastic Android/Desktop/iOS project.

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

Numeric spec prefixes (e.g., `003-app-docs-markdown`) are also valid for spec-driven work.

Examples:
- `feat/desktop-ble-transport`
- `fix/bluetooth-reconnect`
- `003-app-docs-markdown`

## Development Workflow

1. **Fork** the repository (external contributors) or create a branch (maintainers).
2. **Implement** your changes following the architecture guidelines.
3. **Test** locally: `./gradlew spotlessCheck detekt kmpSmokeCompile test allTests`
4. **Commit** with clear, descriptive messages.
5. **Push** and open a Pull Request.

## Commit Messages

Follow conventional commit style:
```
feat(docs): add in-app documentation browser
fix(ble): handle reconnection timeout
refactor(navigation): migrate to typed routes
test(search): add keyword ranking tests
```

## Pull Request Checklist

Before submitting:
- [ ] Code compiles on all targets: `./gradlew kmpSmokeCompile`
- [ ] All tests pass: `./gradlew allTests`
- [ ] Code style passes: `./gradlew spotlessCheck`
- [ ] Static analysis passes: `./gradlew detekt`
- [ ] New code has appropriate test coverage
- [ ] No `android.*` imports in `commonMain`
- [ ] Koin modules registered if new DI is added
- [ ] Routes added to `Routes.kt` if new navigation is introduced
- [ ] Documentation updated if user-facing behavior changes

## Code Style

- **Formatting:** Enforced by Spotless (KtLint rules)
- **Static analysis:** Detekt with project-specific configuration
- **Imports:** No wildcard imports; organized automatically by Spotless
- **Line length:** 120 characters maximum

Run formatting:
```bash
./gradlew spotlessApply
```

## Architecture Rules

- Feature modules must not depend on other feature modules
- `commonMain` must not contain `android.*`, `java.io.*`, or platform-specific imports
- Prefer interface + DI over `expect`/`actual` for complex platform behaviors
- All navigation routes must be `@Serializable` and defined in `Routes.kt`
- Use Koin annotations (`@Single`, `@Factory`, `@Module`) for dependency injection

## Verification

Full pre-merge verification:
```bash
./gradlew spotlessCheck detekt kmpSmokeCompile test allTests
```

For docs-specific changes, also run:
```bash
./gradlew generateDocsBundle validateDocsBundle
```

## Getting Help

- [Meshtastic Discord](https://discord.gg/meshtastic) — `#app-development` channel
- GitHub Issues — for bug reports and feature requests
- GitHub Discussions — for questions and ideas

---

