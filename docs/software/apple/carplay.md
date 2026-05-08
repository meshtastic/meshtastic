---
title: CarPlay
parent: User Guide
nav_order: 14
---

# CarPlay

The app supports Apple CarPlay for **hands-free mesh messaging** while driving. The CarPlay interface integrates with the iOS messaging system and Siri so that users can send and receive Meshtastic messages without looking at their phone.

## Requirements

- iPhone running iOS 16 or later
- A supported CarPlay head unit or the CarPlay Simulator in Xcode
- A Meshtastic device connected via Bluetooth, TCP, or serial
- Siri enabled — the app requests Siri authorization during onboarding and again on subsequent launches

## Interface

The CarPlay screen presents a **two-tab interface**:

| Tab | Description |
|-----|-------------|
| **Channels** | Lists all active mesh channels |
| **Direct Messages** | Lists recent and favorite contacts |

When no Meshtastic device is connected, both tabs show a **"Not Connected"** status item with a prompt to open the Meshtastic app.

### Channels Tab

Each channel row shows:
- The channel name (or "Primary Channel" for index 0)
- An unread message badge when there are unread messages
- "Primary" or "Ch N" as detail text

Tapping a channel row starts a Siri compose session for that channel.

### Direct Messages Tab

The Direct Messages tab is divided into two sections:

- **Favorites** — Nodes marked as favorites, sorted by last heard
- **Recent** — All other messageable contacts with history, sorted by last heard (capped at 24 entries)

Each contact row shows:
- Contact name and a person icon
- Unread message count when applicable
- Time since last heard (e.g., "Just now", "5m ago", "2h ago", "3d ago")

## Siri Voice Commands

Use these Siri voice commands in CarPlay to interact with Meshtastic:

| Voice Command | Example Phrase | Description |
|---|---|---|
| Send Message | "Send a message on Meshtastic" | Composes and sends a text message to a contact or channel |
| Search Messages | "Search Meshtastic messages" | Searches message history |
| Mark as Read | "Mark Meshtastic message as read" | Marks a conversation as read |

> **Warning — Message Limits:**
> Messages are limited to **200 bytes** (UTF-8). Siri will not send messages that exceed this limit. Only a **single recipient** per message is supported — no group direct messages. Emoji-only messages and admin messages are excluded from CarPlay.

## Incoming Message Announcements

When CarPlay is connected and **Announce Notifications** is enabled in iOS Settings → Siri, Siri reads incoming Meshtastic messages aloud. Only non-emoji, non-admin text messages trigger announcements.

Up to 50 unread messages that arrived before the CarPlay session started are donated to Siri at connection time so they can be read back on demand.

## Live Activity

When a Meshtastic device connects during a CarPlay session, a **Dynamic Island / Lock Screen Live Activity** starts automatically (iOS only, not available on macOS). It displays:

- Node name and short name
- Uptime, channel utilisation, and air-time TX percentage
- Packets sent, received, and relay statistics
- Online and total node counts
- A 15-minute countdown timer synced with the telemetry reporting interval

The Live Activity ends automatically when CarPlay disconnects.

> **Tip —** For implementation details and component architecture, see the [CarPlay Developer Guide](../developer/carplay).

