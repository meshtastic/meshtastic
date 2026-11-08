---
title: Getting Started
parent: User Guide
sidebar_position: 1
---

# Getting Started

Welcome to the Meshtastic Apple app — your iOS, iPadOS, and macOS companion for off-grid mesh radio communication.

## What You Need

- A supported Meshtastic LoRa radio device (see [meshtastic.org](https://meshtastic.org/docs/hardware/))
- iPhone, iPad, or Mac with the Meshtastic app installed
- Bluetooth enabled on your device

## Step 1: Power On Your Radio

Turn on your Meshtastic radio. Most devices show a splash screen and begin broadcasting on the mesh immediately.

## Step 2: Open the App and Connect

1. Open the Meshtastic app.
2. Tap **Connect** (the antenna icon in the tab bar).
3. Your radio should appear in the nearby devices list within a few seconds.
4. Tap the device name to connect.

The connection indicator turns green when the radio is paired and communicating.

> **Tip:** If your device does not appear, make sure Bluetooth is enabled in iOS Settings and that the radio is within range (roughly 10 meters for initial pairing).

### First-Launch Setup

The first time the app opens, a short guided setup says what Meshtastic is and walks through the permissions the app uses, in order. Each screen explains what the permission is for, and any of them can be changed later in iOS Settings. Tapping **Continue** advances to the next step, after granting or declining the permission.

**1. Welcome** — what Meshtastic does, how it treats location (the radio shares none until it is turned on, and the app only lets public channels share an approximate location), and a note that the next screens set up the features you want.

![Welcome screen](/img/apple/onboarding_welcome.webp)

**2. Bluetooth** — required to discover and connect to your radio.

![Bluetooth permission screen](/img/apple/onboarding_bluetooth.webp)

**3. Local Network** — lets the app find radios connected over Wi-Fi or Ethernet.

![Local Network permission screen](/img/apple/onboarding_localNetwork.webp)

**4. Notifications** — toggle which alerts you want before granting permission: incoming messages, new nodes, low battery, and critical alerts that bypass silent mode and Do Not Disturb.

![Notifications permission screen](/img/apple/onboarding_notifications.webp)

**5. Location** — optional; lets your phone supply position to your radio and keep the map updated in the background. The phone's location goes only to the connected radio. The app only lets public channels share an approximate location, and radios on firmware 2.8 or later enforce the same limit on the radio. On older firmware, a public channel set to full precision from another client still sends the exact position. This step is skipped if location access was already granted.

![Location permission screen](/img/apple/onboarding_location.webp)

**6. Siri & Shortcuts** — optional; enables voice commands and CarPlay messaging.

![Siri and Shortcuts permission screen](/img/apple/onboarding_siri.webp)

## Step 3: Set Up Your Radio

The first time a radio connects with no LoRa region set, the app opens a short setup for it. **Set Up Radio** on the Connect screen, and at the top of **Settings → Radio Configuration**, opens it again any time.

![Radio setup intro](/img/apple/radio_setup_intro.webp)

1. **Region** — where you are, so the radio uses legal frequencies. The page starts on the region matching your phone's region setting; confirm it, or change it if you are somewhere else. Using the wrong region is illegal and will prevent communication with other nodes in your area.

   ![Radio setup region page](/img/apple/radio_setup_region.webp)

2. **Preset** — the range and speed your mesh uses; everyone on a mesh must use the same one. On firmware 2.8 the list is limited to what is legal in your region, and a newly flashed radio in the US moves from Long Fast to Long Turbo. Saving applies live on 2.8; older firmware restarts and reconnects.

   ![Radio setup preset page](/img/apple/radio_setup_preset.webp)

3. **Name** — a **Long Name** (up to 24 bytes on firmware 2.8, 39 before) and a **Short Name** (up to 4 characters or one emoji, shown in the node circle) that other people see. This page can be skipped, and licensed operators do not see it: their name comes from the call sign in **Settings → User**.

   ![Radio setup name page](/img/apple/radio_setup_name.webp)

The last page reads back what the radio is set to.

![Radio setup done page](/img/apple/radio_setup_done.webp)

## Step 4: Explore the Mesh

Once connected, the app shows nearby nodes in the **Nodes** tab. Tap any node to see details like signal strength, last heard time, and position.

Send your first message by tapping the **Messages** tab and selecting the primary channel.

> **Tip — Quick navigation**
> Tap the currently active tab icon to jump back to the top-level view from anywhere in that tab.

## Next Steps

- [Bluetooth Device Connection](bluetooth.md) — manage multiple radios
- [Messages & Channels](messages.md) — send broadcasts and direct messages
- [Nodes List](nodes.md) — understand node status indicators
- [Map & Waypoints](map.md) — see the mesh on a map
