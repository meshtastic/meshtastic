---
title: Help & In-App Docs
sidebar_position: 21
last_updated: 2026-09-11
description: Browse this documentation inside the app, search it, and ask Chirpy — the on-device AI assistant — questions about Meshtastic.
parent: User Guide
---

# Help & In-App Docs

This same user documentation ships **inside the app**, so you can read it offline without leaving Meshtastic. Open it from **Settings → Help & Documentation**.

## Browsing

The docs browser lists every user-guide page. Tap a page to read it; images and cross-links work just like they do here.

![In-app documentation browser table of contents](/img/android/docs/docs-browser_toc.webp)

### Search

Tap the search field at the top of the docs browser to open a full-screen search view. Type to filter pages by title and keywords — results update as you type, under the same field. The back arrow, or the keyboard's search action, closes the view. The field hides while you scroll down the page list and comes back when you scroll up.

![Searching the in-app documentation](/img/android/docs/docs-browser_search.webp)

A page open in the browser:

![A documentation page rendered in the app](/img/android/docs/docs-browser_page.webp)

## Chirpy — the AI Assistant

**Chirpy** answers plain-language questions about Meshtastic using this bundled documentation as its source. Tap the Chirpy button in the docs browser, type a question, and it replies with an answer and links to the relevant pages.

![Chirpy AI assistant answering a question with page links](/img/android/docs/docs-browser_chirpy.webp)

Chirpy is Google-flavor Android only. On F-Droid, desktop and iOS builds the assistant button does not appear at all — the same is true on a phone whose hardware cannot run the on-device model. Browsing and the docs browser's own search work normally on every platform.

> 🔒 **Privacy:** On supported phones running the Google-flavor build, Chirpy runs **on-device** using Gemini Nano — your questions never leave your phone. A small model downloads on first use.

## Related Topics

- [Translate the App](translate.md) — how these pages get localized into other languages
- [App Functions](app-functions.md) — the separate system-AI integration (distinct from Chirpy)
