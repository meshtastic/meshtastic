---
title: How the Meshtastic Signal Meter Works
sidebar_position: 15
last_updated: 2026-09-09
description: How the signal meter rates quality from SNR relative to the LoRa modem preset — spread spectrum, presets, and what the bars really mean.
parent: User Guide
---

# How the Meshtastic Signal Meter Works

The Meshtastic signal meter — the bars or status color next to a node — is calculated differently from the bars on a cell phone or Wi-Fi router. This page explains what it measures and why the same reading can mean something different on another preset.

## RSSI and SNR

Every time the LoRa radio receives a message, it reports two measurements:

- **RSSI (Received Signal Strength Indicator)** — the raw power hitting the antenna.
- **SNR (Signal-to-Noise Ratio)** — how far the signal stands above the background noise.

> 💡 **Tip:** Think of RSSI as how loud a friend is talking and SNR as how easily you can pick their voice out of the noise in the room. A friend shouting at a rock concert can be loud (high RSSI) yet unintelligible (bad SNR), while a whisper in a quiet library is faint (low RSSI) yet perfectly clear (great SNR).

## Decoding Below the Noise Floor

Standard radios such as FM or Wi-Fi lose a signal to static once the background noise is louder than it (a negative SNR). LoRa's spread spectrum modulation lets the radio pull a signal out of the noise even when the noise is louder, so negative SNR values are common and expected in Meshtastic — for example, −10 dB means the signal is 10 decibels weaker than the background noise.

Each modem preset has an SNR limit: the lowest SNR at which that preset can still decode a message. Slower presets tolerate a weaker, noisier signal (a more negative limit, longer range); faster presets need a stronger signal (a less negative limit, shorter range).

## Rating Signal Quality

The app rates signal quality (None, Bad, Fair, or Good) from SNR relative to the active preset's SNR limit. When RSSI and a noise-floor reading are both available, it also rates the difference between them against that limit and uses the worse rating. Otherwise, it uses SNR alone.

Because the rating is relative to the preset, the same SNR rates differently on different presets. An SNR of −16 dB rates Good on Long Fast (SNR limit −17.5 dB) but None on Short Fast (SNR limit −7.5 dB). Let `limit` be the active preset's SNR limit:

| Level | Bars | Criteria | Meaning |
|-------|------|----------|---------|
| Good | Full | SNR above `limit` | Comfortably above the demodulation floor — a healthy connection. |
| Fair | 3 | less than 5.5 dB below `limit` | Decodable, but approaching the floor. |
| Bad | 2 | 5.5 dB to 7.5 dB below `limit` | At the edge of what the preset can recover. |
| None | 1 | more than 7.5 dB below `limit` | Far below the preset's floor; further packets from this node are likely to be lost. |

The icon never goes blank, so count the bars carefully: a single bar means None, not a weak but usable link, and Good is a solid wedge rather than a set of bars. A gray three-bar icon labeled Unknown is a different state again — the packet carried no SNR measurement at all, which is not the same as measuring one and finding it too weak.

> ℹ️ **Note:** Traceroute and neighbor-info SNR colors use the active preset's limits too. RSSI text has separate strength colors: green above −115 dBm, yellow above −120 dBm, orange above −126 dBm, and red at or below −126 dBm.

## Diagnosing Local Interference

A great RSSI paired with a one- or two-bar rating (None or Bad) points to local interference, not distance. A cheap power supply, a noisy computer, or a nearby transmitter can create enough static to drown out an otherwise strong signal.

## Where Signal Information Appears

In the app, signal data appears in several places:

- **Node list** — a signal-bars icon, shown only for nodes your radio heard directly. A node reached through a relay shows its hop count instead, because the SNR your radio measured describes the last hop, not the whole path
- **Node detail** — SNR, RSSI, and the quality word in the **Details** card at the top of the screen
- **Traceroute** — per-hop signal quality for each relay node
- **Signal Quality** — historical SNR and RSSI data in the metrics charts

![Node list entry showing a Good signal rating: 12.5 dB SNR, −42 dBm RSSI, and the green signal-strength icon](/img/android/docs/nodes_signal_info.webp)

## Related Topics

- [Nodes](nodes.md) — where signal bars appear in the node list
- [Node Metrics](node-metrics.md) — SNR/RSSI history and the per-node signal quality reference
- [Settings — Radio & User](settings-radio-user.md) — modem presets and their SNR limits
