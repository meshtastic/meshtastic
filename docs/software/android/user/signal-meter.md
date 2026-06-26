---
title: How the Meshtastic Signal Meter Works
sidebar_position: 15
last_updated: 2026-06-25
description: How the signal meter rates quality from SNR relative to the LoRa modem preset — spread spectrum, presets, and what the bars really mean.
parent: User Guide
---

# How the Meshtastic Signal Meter Works

The Meshtastic signal meter — the familiar bars or status color in the app — is calculated very differently than the "bars" on a traditional cell phone or WiFi router.

Most consumer devices simply measure how "loud" a signal is. However, because Meshtastic uses **LoRa (Long Range)** technology, its signal meter measures how **clear** the signal is, relative to the specific settings your mesh is using.

---

## 1. The Two Metrics: "Loudness" vs. "Clarity"

Every time the LoRa radio chip receives a message, it reports two measurements:

* **RSSI (Received Signal Strength Indicator):** The **loudness** of the raw power hitting your antenna.
* **SNR (Signal-to-Noise Ratio):** The **clarity** of the signal compared to the background static.

> 💡 **Tip:** Here's an analogy — imagine you are trying to hear a friend talking to you.
> * **RSSI** is how loud their voice is.
> * **The Noise Floor** is the background noise in the room (air conditioning, other people talking, traffic).
> * **SNR** is how easily you can distinguish your friend's voice from the background noise.

If your friend shouts at you at a deafening rock concert, the signal is incredibly loud (High RSSI), but you still can't understand them because the background noise is louder (Bad SNR). Conversely, if your friend whispers to you in a dead-silent library, the signal is very weak (Low RSSI), but you can understand them perfectly (Great SNR).

---

## 2. The Magic of LoRa: Hearing "Below the Noise Floor"

For standard radios (like FM or WiFi), if the background noise is louder than the signal (a negative SNR), the receiver just hears static.

LoRa is special. It uses **"Spread Spectrum"** modulation, which allows the radio to mathematically pull a signal out of the air even when it is buried deep *underneath* the background noise. This is why you will frequently see **negative SNR numbers** in Meshtastic (e.g., -10 dB, which means the signal is 10 decibels weaker than the background static).

Depending on which Meshtastic preset you are using (e.g., `LongFast` vs. `ShortFast`), the radio has a specific **SNR Limit** — the absolute maximum amount of noise it can tolerate before the message is completely lost to the static.

---

## 3. How the Signal Meter Calculates Quality

The app rates your signal quality (None, Bad, Fair, or Good) from **SNR alone, measured relative to the preset's SNR Limit** — the demodulation floor described above. It deliberately does **not** factor RSSI into the rating: without the local noise floor, RSSI cannot tell you whether a signal is actually decodable, so SNR-versus-the-preset-limit is the meaningful measure. (RSSI is still displayed to you elsewhere.)

Because the rating is relative to the preset limit, the *same* SNR can rate differently on different presets — `-15 dB` is healthy on `LongSlow` but unusable on `ShortFast`. Letting `limit` be the active preset's SNR Limit, here is how the app picks the bars (or color):

| Level | Bars | Criteria | Meaning |
|-------|------|----------|---------|
| Good | 3 | SNR **above** the preset's `limit` | Signal is comfortably above the demodulation floor — healthy connection. |
| Fair | 2 | within `5.5 dB` below the `limit` | Decodable, but getting close to the floor. |
| Bad | 1 | within `7.5 dB` below the `limit` | At the very edge of what the preset can recover. |
| None | 0 | more than `7.5 dB` below the `limit` | Below the floor — transmission lost to noise. |

> **Note:** The fixed SNR thresholds you may have seen elsewhere (`-7 dB` / `-15 dB`) are now only used for coloring individual hops in traceroute results — not for the per-node signal meter described here.

---

## 4. What This Means for You

Because Meshtastic's meter acts as a **"Clarity Meter"**, it behaves differently than what most people expect:

> 💡 **Tip:** Don't panic over low RSSI. You might see a seemingly terrible RSSI value like `-118 dBm`. On a cell phone, you would have zero bars. But if you have an SNR of `+2 dB`, Meshtastic will still show a strong signal! *The library is quiet, so the whisper is heard perfectly.*

> ⚠️ **Warning:** Watch out for local noise. If you hook up a massive antenna and see a great RSSI (e.g., `-90 dBm`) but your signal meter is only showing **1 Bar (Bad)**, you have a problem. It means you have local interference — perhaps a cheap power supply, a noisy computer, or a nearby radio tower — creating so much static that it is drowning out your mesh.

## Where Signal Information Appears

In the app, signal data is shown in several places:

- **Node list** — signal bars icon next to each node
- **Node detail** — SNR, RSSI, and signal quality in the device metrics section
- **Traceroute** — per-hop signal quality for each relay node
- **Signal metrics** — historical SNR and RSSI data in the metrics charts

![Node entry showing SNR, RSSI values and colored signal bars](/img/android/docs/nodes_signal_info.webp)

## Related Topics

- [Nodes](nodes.md) — where signal bars appear in the node list
- [Node Metrics](node-metrics.md) — SNR/RSSI history and the per-node signal quality reference
- [Settings — Radio & User](settings-radio-user.md) — modem presets and their SNR limits

---

