---
title: Translate the App
sidebar_position: 17
last_updated: 2026-05-13
parent: User Guide
---

# Translate the App

Contributing translations helps make Meshtastic accessible to a wider audience. The app uses [Crowdin](https://crowdin.com/) to manage community translations for both the user interface and in-app documentation.

---

## What Gets Translated

| Resource | Source Location | Notes |
|---|---|---|
| UI strings | `composeResources/values/strings.xml` | Buttons, labels, messages, and all user-visible text |
| User Guide pages | `docs/user/*.md` | In-app documentation shown in Help & Documentation |
| Fastlane metadata | `fastlane/metadata/android/en-US/` | App Store listing title, description, and changelogs |

:::note
Developer Guide pages are English-only. Code-focused documentation targeting contributors is not translated.
:::

---

## How to Contribute

1. **Visit the Crowdin project.** Open the [Meshtastic Android Crowdin project](https://crowdin.com/project/meshtastic-android) and sign in or create a free account.
2. **Choose your language.** Select an existing language or request a new one by opening a [GitHub issue](https://github.com/meshtastic/Meshtastic-Android/issues/new).
3. **Translate strings.** Crowdin shows the English source on the left and your translation on the right. Translate each string and save.
4. **Review context.** Many strings include screenshots or context comments — check these to understand where the text appears in the app.
5. **Submit.** Approved translations are automatically merged into the next release.

:::tip
Keep translations short. UI strings often appear in buttons, chips, or narrow columns. If a translation is significantly longer than the English original, consider abbreviating where the meaning stays clear.
:::

---

## Adding a New Language

If your language is not yet listed on Crowdin:

1. Open an issue on [GitHub](https://github.com/meshtastic/Meshtastic-Android/issues/new) requesting the new locale.
2. A maintainer will add the language to Crowdin and configure `crowdin.yml`.
3. Once added, you can begin translating immediately.

---

## How Translations Are Organized

The Android app uses **Compose Multiplatform resources** for all user-visible strings:

```
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

```
docs/
├── user/                ← English source (default)
│   ├── onboarding.md
│   └── ...
├── fr/user/             ← French translations
│   ├── onboarding.md
│   └── ...
└── ...
```

The app automatically selects the correct locale based on your device's **Language & Region** settings.

---

## Translation Guidelines

- **Do not translate** technical terms like "LoRa", "MQTT", "BLE", "TAK", "SNR", or "RSSI" — these are universal.
- **Keep placeholders intact.** Strings like `%1$s` or `%d` are filled in at runtime. Do not remove or reorder them unless the grammar of your language requires it.
- **Match tone.** The app uses a friendly, direct voice. Avoid overly formal language.
- **Test if possible.** Switch your device language and open the app to see how translations look in context.

---

## Questions?

If you have questions about a specific string's context or need help getting started, open a discussion on the [Meshtastic GitHub Discussions](https://github.com/meshtastic/Meshtastic-Android/discussions) page.

Thank you for helping expand the reach of Meshtastic!
