---
title: Signal Meter
parent: User Guide
sidebar_position: 12
---

# How the Meshtastic Signal Meter Works

![Signal meter levels](/img/apple/signalMeter_full_all.webp)

![Compact signal meter](/img/apple/signalMeter_compact_all.webp)

The Meshtastic signal meter—often seen as a series of bars or a status color in the app—is calculated very differently than the "bars" on a traditional cell phone or Wi-Fi router.

Most consumer devices just measure how "loud" a signal is. However, because Meshtastic uses **LoRa (Long Range)** technology, its signal meter uses logic that measures how **clear** the signal is, relative to the specific settings your mesh is using.

---

## 1. The Two Metrics: "Loudness" vs. "Clarity"

To understand the meter, you need to understand the two measurements the LoRa radio chip takes every time it receives a message:

* **RSSI (Received Signal Strength Indicator):** This is the **loudness** of the raw power hitting your antenna.
* **SNR (Signal-to-Noise Ratio):** This is the **clarity** of the signal compared to the background static.

Think of it like hearing a friend talk: **RSSI** is how loud their voice is, **the noise floor** is the background noise in the room, and **SNR** is how easily you can distinguish their voice from that noise.

If your friend shouts at you at a deafening rock concert, the signal is incredibly loud (High RSSI), but you still can't understand them because the background noise is louder (Bad SNR). Conversely, if your friend whispers to you in a dead-silent library, the signal is very weak (Low RSSI), but you can understand them perfectly (Great SNR).

---

## 2. The Magic of LoRa: Hearing "Below the Noise Floor"

For standard radios (like FM or Wi-Fi), if the background noise is louder than the signal (a negative SNR), the receiver just hears static.

LoRa is special. It uses **"Spread Spectrum"** modulation, which allows the radio to mathematically pull a signal out of the air even when it is buried deep *underneath* the background noise. This is why you will frequently see **negative SNR numbers** in Meshtastic (e.g., -10dB, which means the signal is 10 decibels weaker than the background static).

Depending on which Meshtastic preset you are using (e.g., `LongFast` vs. `ShortFast`), the radio has a specific **SNR Limit**—the absolute maximum amount of noise it can tolerate before the message is completely lost to the static.

---

## 3. How the Signal Meter Calculates Quality

The quality rating (None, Bad, Fair, or Good) is based on **SNR relative to your preset's SNR Limit** — how much clarity headroom you have above the point where the radio can no longer decode. This is measured against the physical limit of the radio preset you are using, so the same SNR can mean different things on `LongFast` versus `ShortFast`.

Here is exactly how the app decides how many bars (or what color) to show you:

| Level | Bars | Criteria (SNR relative to your preset's limit) | Meaning |
|-------|------|----------|---------|
| Good | 3 | SNR **above** the limit | Clear headroom — healthy connection. |
| Fair | 2 | SNR at the limit, up to `5.5 dB` below it | Getting quieter or noisier, but the radio still understands the message fine. |
| Bad | 1 | SNR between `5.5 dB` and `7.5 dB` below the limit | Barely hanging on — at the edge of range or heavy interference. |
| None | 0 | SNR more than `7.5 dB` below the limit | Transmission completely buried in static. |

**Using the real noise floor.** When your receiving radio has recently reported its own **noise floor** (part of its Local Stats telemetry), the app computes your true link margin as `RSSI − noise floor` and checks that against the same preset limit too, then shows the **more conservative** of the two ratings. This catches the case where the reported SNR looks fine but local interference is quietly eating your margin.

**Without a recent noise floor**, the app falls back to RSSI thresholds (better than `-115 dBm`, `-120 dBm`, and `-126 dBm`) alongside the SNR check above, taking the worse of the two — RSSI alone can't tell you how much of that power is signal versus noise, but it's still a useful sanity check when there's no noise floor available to compute a real margin from.

---

## 4. What This Means for You

Because Meshtastic's meter acts as a **"Clarity Meter"**, it behaves differently than what most people expect:

> **Tip — Don't panic over low RSSI**
> You might see a seemingly terrible RSSI value like `-118 dBm`. On a cell phone, you would have zero bars. But if you have an SNR of `+2 dB`, Meshtastic will still show a strong signal! *The library is quiet, so the whisper is heard perfectly.*

> **Warning — Watch out for local noise**
> If you hook up a massive antenna and see a great RSSI (e.g., `-90 dBm`) but your signal meter is only showing **1 Bar (Bad)**, you have a problem. It means you have local interference—perhaps a cheap power supply, a noisy computer, or a nearby radio tower—creating so much static that it is drowning out your mesh. When your radio knows its own noise floor, the meter accounts for exactly this by measuring your real margin above the noise.
