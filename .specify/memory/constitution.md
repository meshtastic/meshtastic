<!--
## Sync Impact Report

**Version change**: (none) → 1.0.0 (initial ratification)

### Modified Principles
N/A — initial constitution; no prior principles exist.

### Added Sections
- Core Principles (I–VIII): all new
- Technology Stack & Tooling: new
- Development Workflow & Quality Gates: new
- Governance: new

### Removed Sections
N/A

### Templates requiring updates
- ✅ `.specify/templates/plan-template.md` — Constitution Check gates reviewed; no structural changes
  required. Technical Context fields align with Docusaurus/TypeScript/Playwright stack.
- ✅ `.specify/templates/spec-template.md` — Functional Requirements and Success Criteria sections
  align with accessibility, i18n, and performance principles; no structural edits needed.
- ✅ `.specify/templates/tasks-template.md` — Task phases and parallel markers align with
  Playwright e2e and MDX lint quality gates; no structural edits needed.

### Follow-up TODOs
- None. All governance fields resolved from project context.
-->

# Meshtastic Documentation Constitution

## Core Principles

### I. Documentation Clarity & MDX Integrity

All documentation content MUST be authored in clean, valid MDX. Every `.mdx` file MUST pass
the `eslint-plugin-mdx` rules enforced by `eslint.config.mjs` (run via `pnpm lint:mdx`). MDX
MUST NOT contain raw HTML that breaks the remark/rehype pipeline, undefined component
references, or unclosed JSX elements. Prose MUST be accurate, concise, and free of jargon
inaccessible to a community-level newcomer.

**Rationale**: The Meshtastic community is broad and beginner-oriented. Broken or ambiguous MDX
silently corrupts rendered pages and degrades the reader experience for all audiences.

### II. Strict TypeScript for All Custom React Components

Every custom React component added to `src/` MUST be written in strict TypeScript (`.tsx`).
The `tsconfig.json` `strict` flag MUST remain `true`. Explicit prop types or interfaces MUST
be declared for every component; `any` is forbidden without a documented suppression comment
explaining why it cannot be avoided. JavaScript (`.js`, `.jsx`) MUST NOT be introduced for new
source files under `src/`.

**Rationale**: Type safety prevents whole classes of runtime errors in interactive docs
components. Docusaurus's own `@tsconfig/docusaurus` baseline already enforces this — new code
MUST never loosen it.

### III. Tailwind CSS for All Styling (NON-NEGOTIABLE)

All visual styling of custom components MUST use Tailwind CSS utility classes. Inline `style`
attributes, CSS Modules, or plain CSS files MUST NOT be introduced for new UI work. The
`tailwind.config.ts`, `tailwindcss-animate`, and `@tailwindcss/typography` packages are the
sanctioned styling primitives. Class composition MUST use `clsx` and `tailwind-merge` (`cn`
helper) to avoid conditional class conflicts.

**Rationale**: A single styling paradigm keeps the component surface auditable, consistent,
and co-located with markup. Tailwind's purge step also directly benefits static-site bundle
size.

### IV. Accessibility & Mobile-First UX

Every new UI component MUST meet WCAG 2.1 AA contrast and keyboard-navigation requirements.
Interactive elements MUST have descriptive `aria-label` or associated visible labels. Layouts
MUST be tested at mobile viewport widths (≤ 390 px) before merge. Radix UI primitives
(`@radix-ui/react-popover`, `@radix-ui/react-tooltip`, `@radix-ui/react-slot`) MUST be
preferred for modal/overlay interactions because they ship accessible defaults. Community
jargon (e.g., "node", "mesh") MUST be explained or linked on first use in any given document.

**Rationale**: A significant portion of Meshtastic users are newcomers accessing docs on
mobile. Inaccessible or desktop-only UI excludes them and contradicts the project's
open-hardware, community-first ethos.

### V. Static-Site Performance

Pages MUST remain statically renderable by Docusaurus's build pipeline (`pnpm build`). Dynamic
data fetching inside components MUST use SWR with a static fallback so pages are never blocked
on runtime API calls. Images MUST be served as static assets under `static/` or via Docusaurus
asset handling; no third-party image CDN URLs MUST be hard-coded in component source. The
Docusaurus faster build plugin (`@docusaurus/faster`) MUST remain enabled.

**Rationale**: `meshtastic.org` is deployed on Vercel as a static site. Any server-side
runtime dependency breaks the deployment model and increases load time for global users on
constrained connectivity.

### VI. Internationalization (i18n) — No Hardcoded UI Strings

All user-visible strings inside custom React components MUST be externalized via the
Docusaurus `useDocusaurusContext` i18n API or the `Translate` component from
`@docusaurus/Translate`. Plain English string literals MUST NOT appear in component JSX/TSX
render output. Translation source files MUST be placed under `i18n/en/` and synced to CrowdIn
via `pnpm crowdin:sync`. The `crowdin.yml` `preserve_hierarchy: true` setting MUST be
maintained so translation paths remain stable across renames.

**Rationale**: Meshtastic is used globally. CrowdIn contributors translate the docs into
dozens of languages; hardcoded strings silently exclude non-English communities and break
CrowdIn's diff-based workflow.

### VII. Playwright for End-to-End Testing of New UI Features

Any new interactive UI feature MUST be accompanied by at least one Playwright end-to-end test
in the `e2e/` directory before merging to `master`. Tests MUST cover the primary happy path
and at least one accessibility concern (e.g., keyboard navigation, focus management). Tests
MUST pass in the CI pipeline via `pnpm test:e2e`. Existing Playwright configuration in
`playwright.config.ts` MUST NOT be weakened (e.g., no disabling of retries or increasing
timeouts beyond documented necessity).

**Rationale**: Docusaurus swizzle and custom components interact with the build output in
subtle ways. Playwright provides the only reliable signal that new UI works in a real browser
against the built static site, not just in storybook or unit mocks.

### VIII. Dependency Minimalism

The introduction of a new `npm` dependency MUST be justified by one of: (a) no equivalent
native Docusaurus plugin or React built-in exists, (b) the dependency is already in the
project's transitive graph, or (c) the alternative would require maintaining >100 lines of
custom code. Dependencies MUST be audited against the GitHub Advisory Database before merging.
`pnpm.overrides` MUST be kept current to pin sub-dependency vulnerabilities. Prefer updating
existing libraries over adding new ones for overlapping functionality.

**Rationale**: A lean dependency tree reduces attack surface, speeds up CI, and prevents
`pnpm-lock.yaml` churn that complicates CrowdIn and Vercel build caches.

## Technology Stack & Tooling

The following tools define the canonical development environment. Deviations MUST be proposed
as constitution amendments, not ad-hoc choices.

| Concern | Canonical Choice |
|---|---|
| Static site framework | Docusaurus 3.x (`@docusaurus/core`, `@docusaurus/preset-classic`) |
| Language | TypeScript (strict mode, `@tsconfig/docusaurus` base) |
| Styling | Tailwind CSS 3.x + `tailwindcss-animate` + `@tailwindcss/typography` |
| Component primitives | Radix UI (`@radix-ui/*`) |
| Linting (TS/TSX) | oxlint (`pnpm lint`) |
| Formatting | oxfmt (`pnpm format`) |
| MDX linting | eslint-plugin-mdx (`pnpm lint:mdx`) |
| E2E testing | Playwright (`pnpm test:e2e`) |
| i18n platform | CrowdIn (synced via `pnpm crowdin:sync`) |
| CI | GitHub Actions (`.github/workflows/ci.yml`) |
| Hosting | Vercel (static export, `@docusaurus/plugin-vercel-analytics`) |
| Search | Algolia DocSearch (`@docusaurus/theme-search-algolia`) |
| Diagrams | Mermaid (`@docusaurus/theme-mermaid` + `@mermaid-js/layout-elk`) |
| Git hooks | Husky + lint-staged (oxlint + oxfmt on `*.{ts,tsx}`) |

## Development Workflow & Quality Gates

**Before opening a PR**:

1. `pnpm build` MUST succeed with zero broken-link errors (`onBrokenLinks: "throw"`).
2. `pnpm lint && pnpm format` MUST report no errors.
3. `pnpm lint:mdx` MUST produce zero warnings on changed `.mdx` files.
4. `pnpm test:e2e` MUST pass for any PR touching `src/` components.
5. New i18n strings MUST be present in `i18n/en/` and referenced via `Translate` or the i18n
   API (verified by reviewer).
6. New dependencies MUST include a GitHub Advisory Database check result in the PR description.

**Review standards**:

- PRs that introduce `any` casts, inline styles, or hardcoded English strings in components
  are blocked until resolved.
- Accessibility issues flagged by reviewers MUST be resolved before merge, not tracked as
  follow-up issues.
- The `pnpm-lock.yaml` MUST be committed with every dependency change.

**Branch strategy**:

- Feature branches: `feature/###-short-description`
- Doc-only fixes: `docs/short-description`
- Hotfixes: `fix/short-description`
- All branches target `master` via PR; direct pushes to `master` are prohibited.

## Governance

This constitution supersedes all informal conventions and ad-hoc decisions made during
Meshtastic documentation development. It is the authoritative source for what is and is not
acceptable in this repository.

**Amendment procedure**:

1. Open a GitHub Issue describing the proposed change and its rationale.
2. Reach rough consensus among active maintainers (≥ 2 approvals, no blocking objections for
   72 hours).
3. Apply a semantic version bump (MAJOR/MINOR/PATCH per header rules) and update the
   `LAST_AMENDED_DATE`.
4. Update all dependent templates and documents in the same PR as the constitution change.
5. Merge with a commit message of the form:
   `docs: amend constitution to vX.Y.Z (<summary of change>)`

**Versioning policy**:

- MAJOR: Removal or incompatible redefinition of a numbered principle.
- MINOR: Addition of a new principle or materially expanded section.
- PATCH: Clarifications, wording improvements, typo fixes.

**Compliance**:

- All PR reviewers MUST verify compliance with this constitution before approving.
- Any contributor may flag a violation; maintainers MUST respond within one week.
- The constitution is re-reviewed at each major Docusaurus version upgrade.

**Version**: 1.0.0 | **Ratified**: 2026-05-08 | **Last Amended**: 2026-05-08
