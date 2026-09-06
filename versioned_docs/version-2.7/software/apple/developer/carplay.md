---
title: CarPlay
parent: Developer Guide
sidebar_position: 9
---

# CarPlay Architecture

This page covers the implementation of the CarPlay feature. For the user-facing guide see [CarPlay](../user/carplay.md).

## Components

| Component | File | Description |
|---|---|---|
| `CarPlaySceneDelegate` | `Meshtastic/CarPlay/CarPlaySceneDelegate.swift` | `CPTemplateApplicationSceneDelegate` that builds and manages the two-tab UI |
| `CarPlayIntentDonation` | `Meshtastic/CarPlay/CarPlayIntentDonation.swift` | Donates incoming and outgoing `INSendMessageIntent` interactions so conversations appear in CarPlay Messages and Siri can read them aloud |
| `SendMessageIntentHandler` | `Meshtastic/Intents/SendMessageIntentHandler.swift` | Handles `INSendMessageIntent` — resolves recipients/channels and sends the message over the active transport |
| `SearchForMessagesIntentHandler` | `Meshtastic/Intents/SearchForMessagesIntentHandler.swift` | Handles `INSearchForMessagesIntent` |
| `SetMessageAttributeIntentHandler` | `Meshtastic/Intents/SetMessageAttributeIntentHandler.swift` | Handles `INSetMessageAttributeIntent` (mark as read) |
| `IntentHandler` | `Meshtastic/Intents/IntentHandler.swift` | Routes `INIntent`s to the appropriate handler |

## Template Updates

The scene delegate subscribes to `AccessoryManager.shared.$isConnected` with a **300 ms debounce** and calls `updateSections(_:)` on existing `CPListTemplate` instances rather than rebuilding the whole template tree. This minimises flicker during reconnects and avoids triggering CarPlay's rate-limit on template replacement.

## Intent Donation De-duplication

Intent donations are de-duplicated per CarPlay session using an in-memory `Set`. This avoids repeated IPC calls to the intents daemon on every list refresh (which happens on a timer while CarPlay is connected).

When a new CarPlay session starts, the set is cleared and up to 50 unread messages are batch-donated so Siri can read them back on demand.

## Adding a New Intent

1. Create a handler in `Meshtastic/Intents/` conforming to the appropriate `INIntent` protocol.
2. Register the handler in `IntentHandler.swift`'s `handler(for:)` switch.
3. Declare the intent in `Meshtastic.entitlements` under `com.apple.developer.siri`.
4. Add a usage description in `Info.plist` if the intent requires a new privacy permission.
