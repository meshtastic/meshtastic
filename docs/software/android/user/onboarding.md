---
title: Getting Started
sidebar_position: 1
last_updated: 2026-05-13
description: First-launch setup — permissions, onboarding flow, and next steps after connecting your radio.
parent: User Guide
---

# Getting Started

Welcome to Meshtastic! This guide walks you through the initial setup of the Meshtastic Android app.

## First Launch

When you open the app for the first time, you'll be guided through an introductory flow that helps configure essential permissions and settings. Each step can be completed in order, or you can skip and configure permissions later in Android settings.

### Welcome Screen

The welcome screen introduces Meshtastic and its core capabilities:
- Off-grid mesh communication
- No cellular or internet required
- End-to-end encrypted messaging

Tap **Get Started** to proceed through the setup flow.

![Welcome screen](/img/android/docs/onboarding_welcome.webp)

## Permissions

The app requests several permissions during setup. Each one serves a specific purpose, and some are required for core functionality.

### Bluetooth Permission

Bluetooth is the primary connection method between your phone and Meshtastic radio:
- **Bluetooth scanning** — discover nearby Meshtastic radios
- **Bluetooth connect** — establish and maintain connections with paired radios

Grant both permissions when prompted. Without Bluetooth, you'll need to use USB or TCP connections instead.

### Location Permission

> ⚠️ **Why is location required for Bluetooth?** Android requires location permission to discover nearby Bluetooth Low Energy devices. This is an Android system requirement, not a Meshtastic-specific choice.

Meshtastic also uses your location for:
- Showing your position on the mesh map
- Calculating distances to other nodes
- Sharing your GPS coordinates with other mesh members (if enabled)

Grant **"While using the app"** or **"Always"** depending on your preference:
- **While using the app** — position updates only when the app is open
- **Always** — enables background position updates for always-on mesh presence

If denied, Bluetooth scanning will not function and your node will not report a position.

### Notifications Permission

Notifications alert you to:
- Incoming messages from channels and direct messages
- Connection status changes (connected, disconnected, reconnecting)
- Firmware update availability

> 💡 **Tip:** You can fine-tune notification preferences later in Android system settings. The app creates separate notification channels for messages, connection events, and background service status.

### Critical Alerts Permission

On supported devices, the app may request permission for critical alerts:
- These are high-priority notifications that can break through Do Not Disturb mode
- Useful for emergency mesh alerts or urgent messages
- You can **skip** this step if you don't need breakthrough notifications
- Configure or revoke later in Android notification settings

## After Setup

Once permissions are granted, the app transitions to the main interface. Your first action should be connecting to a Meshtastic radio — see [Connections](connections.md) for detailed instructions.

> 💡 **Tip:** If you skipped any permissions during setup, you can grant them later through **Android Settings → Apps → Meshtastic → Permissions**. The app will prompt you again if a missing permission blocks a feature you try to use.

## What's Next?

Once connected to a radio, explore:
- [Connections](connections.md) — pair your first radio device
- [Messages & Channels](messages-and-channels.md) — send your first message
- [Nodes](nodes.md) — see who's on your mesh
- [Map & Waypoints](map-and-waypoints.md) — view node positions
- [Settings](settings-radio-user.md) — configure your radio and user profile

New to Meshtastic? The [getting started guide](https://meshtastic.org/docs/getting-started) on meshtastic.org covers hardware selection, initial radio configuration, and your first mesh setup.

---
