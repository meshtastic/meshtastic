---
title: Translate the App
parent: User Guide
sidebar_position: 14
---

# Translate the App

## Automatic documentation translation

On devices running iOS 26 or later, the in-app documentation is automatically translated into your device language when you open **Help & Documentation**.

**Here's how it works:** The very first person to use a particular language + app version combination translates all pages on-device and automatically contributes their translations back to the community. Every user after them gets those translations instantly — no waiting for on-device translation.

1. You open **Help & Documentation** in a non-English language.
2. If community translations already exist for your language and app version, they're downloaded instantly.
3. If not, Apple's Translation framework translates every page on-device (~10 seconds per page).
4. Your translations are anonymously uploaded to the [meshtastic/translations](https://github.com/meshtastic/translations) repository.
5. The next user in your language gets instant translated docs from the community cache.

No sign-up, no manual work — it just happens in the background while you use the app. You can disable this by toggling off **Participate in Distributed Translations** in App Settings.

> **Tip — English users**
> If your device language is English, no translation occurs and the bundled English documentation is displayed directly.

---

## Contributing app translations

Contributing translations helps make Meshtastic accessible to a wider audience. Native speakers can review machine-translated strings for their language directly in Xcode — look for strings marked **Needs Review** and improve anything that sounds unnatural. If you have a Mac with Apple Silicon, you can also run a script that uses on-device Apple Intelligence to generate any missing translations for your language and automatically open a pull request.

### Review machine translations

All on-device translations are uploaded to the [meshtastic/translations](https://github.com/meshtastic/translations) repository. They're a great starting point, but machine translations aren't perfect! If you're a native speaker and spot something that could be improved:

1. Browse to your language + app version at [apple-apps/](https://github.com/meshtastic/translations/tree/main/apple-apps)
2. Edit the `.md` file directly on GitHub
3. Submit a pull request

Your improvements will be served to every user of that language going forward — no coding required.

---

## Generate new translations with a script

### Requirements

Before you start, make sure you have:

- **macOS 26 or later** with Apple Silicon
- **Apple Intelligence enabled** — System Settings → Apple Intelligence & Siri
- **[local-localizer](https://github.com/JoshuaSullivan/local-localizer)** installed (see below)
- **GitHub CLI** installed — `brew install gh` and `gh auth login`

### Install local-localizer

```bash
git clone https://github.com/JoshuaSullivan/local-localizer.git ~/local-localizer
cd ~/local-localizer && swift build -c release
mkdir -p ~/bin && cp .build/release/local-localizer ~/bin/local-localizer
```

Make sure `~/bin` is on your PATH (add `export PATH="$HOME/bin:$PATH"` to your shell profile if needed).

### Add or complete a locale

Clone the repository, then run the translation script with your locale code:

```bash
git clone https://github.com/meshtastic/Meshtastic-Apple.git
cd Meshtastic-Apple
scripts/translate-locale.sh <locale>
```

For example:

```bash
scripts/translate-locale.sh fr          # French
scripts/translate-locale.sh de formal   # German, formal register
scripts/translate-locale.sh ja polite   # Japanese, polite register
scripts/translate-locale.sh zh-Hant-TW  # Traditional Chinese (Taiwan)
```

The script will:

1. Count how many strings are missing or need updating for the locale
2. Generate a glossary that keeps Meshtastic brand terms (LoRa, MQTT, BLE, TAK, etc.) untranslated
3. Run local-localizer using on-device Apple Intelligence — no internet or API key needed
4. Mark every new string as **Needs Review** so native speakers know to check them
5. Commit the result and open a pull request automatically

The translation step runs entirely on your device and takes roughly 10–20 minutes for a complete locale.

### Tone options

| Tone | When to use |
|---|---|
| `professional` | Default — clear and neutral, suitable for most languages |
| `formal` | Recommended for German (`de`), French (`fr`), Italian (`it`), Spanish (`es`) — selects the polite second-person form (Sie / vous / Lei / usted) |
| `polite` | Recommended for Japanese (`ja`) and Korean (`ko`) — selects polite verb forms |
| `informal` | Casual register |
| `neutral` | Plain, no register preference |

### Reviewing translated strings

Once the PR is open, any native speaker can review the translations directly in Xcode:

1. Open `Meshtastic.xcworkspace`
2. Select `Localizable.xcstrings` in the project navigator
3. Filter by your locale and set the state filter to **Needs Review**
4. Read each string in context, edit if needed, and mark it **Reviewed**
5. Push your changes to the PR branch

Thank you for helping expand the reach of Meshtastic!
