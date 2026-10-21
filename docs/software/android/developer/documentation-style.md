---
title: Documentation Style
sidebar_position: 11
last_updated: 2026-09-14
description: How this repository's docs work, and the one prose rule the Meshtastic design standards leave to us.
parent: Developer Guide
---

# Documentation Style

Section 11 of the [Meshtastic Client Design Standards](https://github.com/meshtastic/design/tree/master/standards) is the style guide for everything under `docs/en/`. Read it first. It decides voice, plain language, terminology, page structure, instructions, cross-platform coverage, code and CLI examples, media, accessibility, admonition use, units, translation, versioning, and in-product text, and it closes with a checklist of the rules a reviewer can check without judgment.

This page carries what Section 11 doesn't: how documentation works in this repository, two forms that differ here, and the one prose rule the standards leave open. Where the two ever disagree on something not listed here, Section 11 wins and this page is wrong.

Pages under `docs/en/` ship to three places — the in-app docs browser, the GitHub Pages site, and meshtastic.org — so one page has to read well in all of them, and its English source is the translation base for 40+ locales on Crowdin. Section 11.1 describes the sync: user pages land in `docs/software/android/` on the documentation site weekly, taken from the latest release, and pull requests against those paths there are reverted.

Rules keep the IDs they had so review feedback and audit findings can still cite them. Rules that Section 11 now covers are retired, and their IDs aren't reused.

## In transition

Two rules changed when Section 11 landed. Neither is a sweep.

- **Headings are sentence case** (11.5, and a quick check in 11.16). Existing Title Case headings stay until the page is edited for another reason. Re-casing a heading invalidates its translation memory across 40+ locales, so it happens as pages are touched and never as a pass of its own. Frontmatter `title` values are the nav labels the in-app browser and the site share, so they change with the rest of the nav rather than one page at a time.
- **The hardware is a node** (11.4). This repo used *radio* to disambiguate the hardware from the phone, and roughly 300 uses of it remain. Prefer *node* in new writing and drop *radio* when you edit a page. *Phone* still means the Android handset the app runs on, which Section 11 has no word for.

## Repository mechanics

- **STRUCT-1** — Complete frontmatter on every page, user *and* developer: `title`, `parent`, `nav_order`, `last_updated` (bump it whenever content changes — CI checks freshness), `description` (one sentence, ~160 characters, used by search and link previews), and `aliases` (search terms the in-app browser resolves).
- **HEAD-2** — One `#` H1 per page, and it matches the frontmatter `title` exactly. The in-app index is built from the frontmatter, so a mismatch shows the reader two different titles for one page.
- **STRUCT-3** — User pages end with a `## Related Topics` section: bulleted links, each with an em-dash clause saying why you'd go there. The heading is a fixed section name shared by 22 pages, so like a frontmatter `title` it stays Title Case until they all change together.
- **STRUCT-4** — No horizontal rules (`---`) in page bodies, and especially not at the end of the file — the site layout adds its own footer rule, so a trailing `---` renders as a doubled line.
- **STRUCT-5** — New pages must be registered in `DocBundleLoader.kt` (the in-app index) — CI fails in both directions if the page and the index disagree.
- **STRUCT-6** — Notable page changes get a *What's New* entry at the top of `user.md` or `developer.md`, in the format the HTML comment there specifies.
- **IMG-1** — Reference screenshots by relative path from `docs/assets/screenshots/`: `../../assets/screenshots/<page>_<subject>.png`. Both the Docusaurus sync and the in-app renderer anchor on the `assets/` segment, so this one form works in all three consumers.
- **LINK-2** — Sibling pages link by bare slug (`connections`), cross-section by relative path (`../developer/testing`). `scripts/validate-doc-links.js` enforces resolvability.
- **LINK-3** — Node-side concepts (LoRa presets, firmware regions, MQTT topics) link out to the [meshtastic.org docs](https://meshtastic.org/docs/) rather than being re-explained here. One source drifts less than two.
- **CODE-1** — Code font for module paths (`core:ble`), Gradle tasks, class and function names, and setting keys, alongside the cases 11.8 covers.
- **DEV-1** — Developer pages assume Kotlin, Gradle, and Android fluency and skip the reassurance, but every rule on this page and in Section 11 still applies. Terse is good; cryptic is not.
- **DEV-3** — Structural or procedural changes get a *What's New for Developers* entry in `developer.md`.

## Local forms

Two forms differ from Section 11. The first is a renderer requirement. The second is the entrenched house form, kept because changing it would touch every page for no reader benefit.

- **ADMON-1** — Admonitions are a blockquote starting with an emoji and a bold label, from this closed set. The in-app renderer has no admonition component, so `:::note` would reach the reader as literal text. Section 11.11 exempts synced client documentation for exactly this reason and leaves the form to this guide; its rules on *when* to use one still apply in full, including at most one per H2 section.

  | Admonition | Use for |
  |---|---|
  | `> 💡 **Tip:**` | An optional shortcut or non-obvious alternative. The reader loses nothing by skipping it. |
  | `> ℹ️ **Note:**` | Supplementary information worth knowing but not required for the task. |
  | `> ⚠️ **Important:**` | Information essential to completing the task correctly, without danger of loss. |
  | `> ⚠️ **Warning:**` | Risk of data loss, lockout, or hardware damage. Must come *before* the action it applies to. |
  | `> 🔒 **Privacy:**` | What data leaves the phone, who on the mesh can see it, and how to limit it. |
  | `> 🔒 **Security:**` | Cryptographic caveats — key handling, unencrypted channels, admin access. |

  Privacy and Security are house labels with no equivalent upstream. They exist because the app's constitution makes privacy a core principle, and they shouldn't be flattened into Note.

- **PROC-2** — Menu paths use a spaced arrow between bold labels: **Settings → Permissions**. Never `>` or `›`. Section 11.6 writes the separator as `>` in its example; the arrow is this corpus's established form, unambiguous in Markdown, and it reads naturally in the in-app renderer.

## Prose rules Section 11 leaves open

One rule. [design#154](https://github.com/meshtastic/design/pull/154) moved the rest into Section 11, where they read the same, so nothing about how you write changes — the rules have one home rather than two that can drift apart.

- **LANG-7** — Em dashes are spaced — like this — matching the entire existing corpus. Section 11 doesn't mention them.

These are retired, with the section that owns each. Their IDs aren't reused.

| Retired rule | Section |
|---|---|
| VOICE-2 — contractions, and *do not* in warnings | 11.2 |
| LANG-3 — requirement words | 11.3 |
| LANG-4 — *e.g.* and *i.e.* | 11.3 |
| LANG-6 — inclusive, literal language | 11.3 |
| LANG-7 — the Oxford comma half; the em dash stays | 11.3 |
| LANG-1 — American spelling | 11.4 |
| LANG-9 — *above* and *below* | 11.5 |
| LANG-8 — number style | 11.12 |

## Word list

Terms this repository needs that the Section 11 tables don't cover. Section 11.4 decides the rest.

| Term | Rule |
|---|---|
| email | No hyphen. |
| internet | Lowercase. |
| phone | The Android handset the app runs on. Use *phone* even when a tablet also works, unless the distinction matters. |
| set up / setup | Verb two words, noun/adjective one word. |
| sign in | Verb; *sign-in* as adjective. Not *log in* or *login*. |
| tap | The interaction verb for the app's touch UI. These pages are mobile-specific, so *tap* stands where 11.7 would prefer *select*. Never *tap on*. |
| touch & hold | Exactly this form (Google's Android convention). Not *long press*, not *tap and hold*. |

## New page checklist

1. Create `docs/en/user/<slug>.md` or `docs/en/developer/<slug>.md` with complete frontmatter (STRUCT-1).
2. Register the page in `feature/docs/.../data/DocBundleLoader.kt` with keywords and aliases.
3. Put screenshots in `docs/assets/screenshots/`, referenced per IMG-1.
4. Add a *What's New* entry (STRUCT-6).
5. Validate locally: `node scripts/validate-doc-links.js docs/en`, `node scripts/check-doc-coverage.js .`, `node scripts/check-doc-aliases.js .` (every alias in step 1's frontmatter must also be in step 2's loader entry — only the loader's list reaches in-app search), and the docs bundle Gradle checks in [Contributing](contributing.md).
6. Run the Section 11.16 quick checks over the page before you open the pull request.

## Related Topics

- [Contributing](contributing.md) — branch naming, PR workflow, and the verification gates docs changes run through
- [Test Builds & Obtainium](test-builds.md) — where prerelease docs snapshots are published
