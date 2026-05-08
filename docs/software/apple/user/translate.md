---
title: Translate the App
parent: User Guide
sidebar_position: 14
---

# Translate the App

Contributing translations to the Meshtastic Apple app helps make the project accessible to a wider audience. The app uses [string catalogs](https://developer.apple.com/documentation/xcode/localizing-and-varying-text-with-a-string-catalog) in Xcode to manage translations.

## How to Contribute

If you would like to update the translations for an existing locale or add a new language, follow these steps:

1. Fork the [Meshtastic-Apple repository](https://github.com/meshtastic/Meshtastic-Apple/tree/main) to your GitHub account.
2. Clone the project and open `Meshtastic.xcworkspace` in Xcode.
3. Select the `Localizable.xcstrings` file in the project navigator.
4. Follow the [steps for adding or updating translations](https://developer.apple.com/documentation/xcode/localizing-and-varying-text-with-a-string-catalog) in Apple's documentation.
5. Create a pull request on the project with your changes.

Your contribution will be reviewed, and upon approval, your translation will be included in the next release of the Meshtastic Apple app.

> **Tip — New language?** If you are adding a language not yet present in the project, open the Xcode project settings, go to **Info → Localizations**, and add the new locale before editing `Localizable.xcstrings`.

Thank you for helping expand the reach of Meshtastic!
