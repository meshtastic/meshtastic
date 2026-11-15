---
title: Translate the App
sidebar_position: 17
last_updated: 2026-10-21
description: How the app and its documentation are translated via Crowdin, and guidelines for contributing translations.
parent: User Guide
---

# Translate the App

The app and its in-app docs are translated on Crowdin — this page shows how to contribute. The app uses [Crowdin](https://crowdin.com/) to manage community translations for both the user interface and in-app documentation.

## What Gets Translated

| Resource | Source Location | Notes |
|---|---|---|
| UI strings | `core/resources/src/commonMain/composeResources/values/strings.xml` | Buttons, labels, messages, and all user-visible text |
| Setting names | `core/resources/src/commonMain/composeResources/values/schema_strings.xml` | Names and descriptions of the node's settings, generated from the Meshtastic protobufs |
| User Guide pages | `docs/en/user/*.md` | In-app documentation shown in Help & Documentation |
| Fastlane metadata | `fastlane/metadata/android/en-US/` | Google Play listing title, description, and changelogs |

> ℹ️ **Note:** Developer Guide pages are English-only. Code-focused documentation targeting contributors is not translated.

## How to Contribute

1. **Visit the Crowdin project.** Open the [Meshtastic Android Crowdin project](https://crowdin.com/project/meshtastic-android) and sign in or create a free account.
2. **Choose your language.** Select an existing language or request a new one by opening a [GitHub issue](https://github.com/meshtastic/Meshtastic-Android/issues/new).
3. **Translate strings.** Crowdin shows the English source on the left and your translation on the right. Translate each string and save.
4. **Review context.** Many strings include screenshots or context comments — check these to understand where the text appears in the app. A scheduled job pulls translations from Crowdin and opens a pull request; they ship once a maintainer merges it and a new build goes out.

> 💡 **Tip:** Keep translations short. UI strings often appear in buttons, chips, or narrow columns. If a translation is significantly longer than the English original, consider abbreviating where the meaning stays clear.

## Adding a New Language

If your language is not listed on Crowdin:

1. Open an issue on [GitHub](https://github.com/meshtastic/Meshtastic-Android/issues/new) requesting the new locale.
2. A maintainer adds the language to the Crowdin project.
3. Once added, you can begin translating. The app offers every language that has a strings folder, so the first sync that brings yours in adds it to the app.

## How Translations Are Organized

The Android app uses **Compose Multiplatform resources** for all user-visible strings:

```text
core/resources/src/commonMain/composeResources/
├── values/              ← English (default)
│   └── strings.xml
├── values-de/           ← German
│   └── strings.xml
├── values-fr/           ← French
│   └── strings.xml
└── ...
```

In-app documentation follows a similar pattern under `docs/`:

```text
docs/
├── en/user/             ← English source (default)
│   ├── onboarding.md
│   └── ...
├── fr/user/             ← French
│   ├── onboarding.md
│   └── ...
├── de/user/             ← German
│   └── ...
└── ...
```

App strings and doc pages use the same locale names, so `values-de` and `docs/de` hold the same language. Most are a bare language code, which covers every region of that language. A few name a region or script where the language needs it: `pt-rBR` (Portuguese, Brazil), `fr-rCA` (French, Canada), `zh-rCN` and `zh-rTW` (Chinese), and `b+sr+Latn` for Serbian in Latin script, where plain `sr` is Cyrillic. Norwegian Bokmål is `nb`.

The app follows your phone's language unless you pick one under **Language** in the app's settings.

A page that came from Crowdin is labeled **Community translated** under its title in the app. If a page has no Crowdin translation for your language, the Google-flavor Android build machine-translates the English source on the fly and labels it **Auto-translated** instead; F-Droid and desktop builds show the English page. Your Crowdin translation replaces the machine one as soon as it lands.

## Translation Guidelines

- **Do not translate** technical terms like "LoRa", "MQTT", "BLE", "TAK", "SNR", or "RSSI" — these are universal.
- **Keep placeholders intact.** Strings like `%1$s` or `%d` are filled in at runtime. Do not remove or reorder them unless the grammar of your language requires it.
- **Match tone.** The app uses a friendly, direct voice. Avoid overly formal language.
- **Test if possible.** Switch your phone's language and open the app to see how translations look in context.

## Questions?

If you have questions about a specific string's context or need help getting started, open a discussion on the [Meshtastic GitHub Discussions](https://github.com/orgs/meshtastic/discussions) page.

Thank you for helping expand the reach of Meshtastic.

## Related Topics

- [Units & Locale](units-and-locale.md) — how the app picks number, date, and unit formats for your region
- [Help & Documentation](help-and-docs.md) — the in-app docs browser these pages are published to
- [Onboarding](onboarding.md) — where a new user first meets the translated strings
