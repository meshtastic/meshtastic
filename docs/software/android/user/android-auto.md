---
title: Android Auto
sidebar_position: 18
last_updated: 2026-06-11
description: Use Meshtastic hands-free on an Android Auto head unit — read messages aloud, reply by voice, and check nodes and mesh status while driving.
parent: User Guide
---

# Android Auto

Meshtastic integrates with Android Auto so you can stay in touch with your mesh while driving, without taking your hands off the wheel or your eyes off the road.

> ⚠️ **Note:** Android Auto support is available on **Google-flavor Android builds only**. It is not included in the F-Droid build, and it is not available on Desktop or iOS.

## Overview

When your phone is connected to an Android Auto head unit (or the Desktop Head Unit emulator used for development), Meshtastic appears as a messaging app built with the Android Car App Library. The car interface presents a tabbed Home screen optimized for driving-safe, glanceable use:

- **Messages** — recent conversations, with hands-free reading and replies.
- **Nodes** — the mesh node list, with a node-detail view.
- **Status** — current connection and mesh status.

The car app does not add a new connection of its own. It uses the Meshtastic app's existing connection, node, and message state, so it reflects whatever your phone is already connected to.

> ⚠️ **Note:** Your phone must be connected to a Meshtastic radio for the car app to show live data. If the app is disconnected, the car screen reflects that disconnected state.

## Messages

The Messages tab lists your recent conversations. While driving, you can:

- **Have messages read aloud** so you don't need to look at the screen.
- **Reply by voice or text** using your head unit's reply control, dictating your response hands-free.

## Nodes

The Nodes tab shows your mesh node list in a car-friendly layout. Selecting a node opens a node-detail view with key information about that node. See [Nodes](nodes.md) for the full meaning of the information shown.

## Status

The Status tab summarizes your current connection and mesh status at a glance — useful for confirming you're still connected to your radio without opening your phone.

## Related Topics

- [Messages & Channels](messages-and-channels.md) — full messaging features on your phone
- [Nodes](nodes.md) — detailed node list and node-detail information
- [Connections](connections.md) — how the app connects to your radio

---

