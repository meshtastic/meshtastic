---
title: How the Meshtastic Signal Meter Works
sidebar_position: 15
last_updated: 2026-05-13
description: How the signal meter calculates quality from RSSI and SNR — LoRa spread spectrum, presets, and what the bars really mean.
parent: User Guide
---

# How the Meshtastic Signal Meter Works

The Meshtastic signal meter — the familiar bars or status color in the app — is calculated very differently than the "bars" on a traditional cell phone or Wi-Fi router.

Most consumer devices simply measure how "loud" a signal is. However, because Meshtastic uses **LoRa (Long Range)** technology, its signal meter measures how **clear** the signal is, relative to the specific settings your mesh is using.

---

## 1. The Two Metrics: "Loudness" vs. "Clarity"

Every time the LoRa radio chip receives a message, it reports two measurements:

* **RSSI (Received Signal Strength Indicator):** The **loudness** of the raw power hitting your antenna.
* **SNR (Signal-to-Noise Ratio):** The **clarity** of the signal compared to the background static.

:::tip
The Analogy: Imagine you are trying to hear a friend talking to you.
:::
> * **RSSI** is how loud their voice is.
> * **The Noise Floor** is the background noise in the room (air conditioning, other people talking, traffic).
> * **SNR** is how easily you can distinguish your friend's voice from the background noise.

If your friend shouts at you at a deafening rock concert, the signal is incredibly loud (High RSSI), but you still can't understand them because the background noise is louder (Bad SNR). Conversely, if your friend whispers to you in a dead-silent library, the signal is very weak (Low RSSI), but you can understand them perfectly (Great SNR).

---

## 2. The Magic of LoRa: Hearing "Below the Noise Floor"

For standard radios (like FM or Wi-Fi), if the background noise is louder than the signal (a negative SNR), the receiver just hears static.

LoRa is special. It uses **"Spread Spectrum"** modulation, which allows the radio to mathematically pull a signal out of the air even when it is buried deep *underneath* the background noise. This is why you will frequently see **negative SNR numbers** in Meshtastic (e.g., -10 dB, which means the signal is 10 decibels weaker than the background static).

Depending on which Meshtastic preset you are using (e.g., `LongFast` vs. `ShortFast`), the radio has a specific **SNR Limit** — the absolute maximum amount of noise it can tolerate before the message is completely lost to the static.

---

## 3. How the Signal Meter Calculates Quality

The Meshtastic apps take both RSSI and SNR and run them through a specific formula to assign your signal a quality rating (None, Bad, Fair, or Good). It specifically scales these values based on the physical limits of the radio preset you are using.

Here is exactly how the app decides how many bars (or what color) to show you:

| Level | Bars | Criteria | Meaning |
|-------|------|----------|---------|
| Good | 3 | RSSI better than `-115 dBm` **AND** SNR better than `-7 dB` | Signal is both loud and clear — healthy connection. |
| Fair | 2 | RSSI better than `-126 dBm` with good SNR, **OR** SNR better than `-15 dB` with good RSSI | Signal getting quieter or noisier, but still decodable. |
| Bad | 1 | Falls between Fair and None thresholds | At the edge of range or experiencing interference. |
| None | 0 | RSSI worse than `-126 dBm` **AND** SNR worse than `-15 dB` | Transmission completely buried in noise. |

---

## 4. What This Means for You

Because Meshtastic's meter acts as a **"Clarity Meter"**, it behaves differently than what most people expect:

:::tip
Don't panic over low RSSI: You might see a seemingly terrible RSSI value like `-118 dBm`. On a cell phone, you would have zero bars. But if you have an SNR of `+2 dB`, Meshtastic will still show a strong signal! *The library is quiet, so the whisper is heard perfectly.*
:::

:::warning
Watch out for local noise: If you hook up a massive antenna and see a great RSSI (e.g., `-90 dBm`) but your signal meter is only showing **1 Bar (Bad)**, you have a problem. It means you have local interference — perhaps a cheap power supply, a noisy computer, or a nearby radio tower — creating so much static that it is drowning out your mesh.
:::

## Where Signal Information Appears

In the app, signal data is shown in several places:

- **Node list** — signal bars icon next to each node
- **Node detail** — SNR, RSSI, and signal quality in the device metrics section
- **Traceroute** — per-hop signal quality for each relay node
- **Signal metrics** — historical SNR and RSSI data in the metrics charts

![Node entry showing SNR, RSSI values and colored signal bars](/img/android/docs/nodes_signal_info.webp)

