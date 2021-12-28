---
id: aerials
title: Aerial selection
sidebar_label: Aerial selection
slug: /hardware/aerials
---

The stock aerials provided bundled with the t-Beam and other boards are, in general a 'mixed bag'.  They may not have been selected for your given frequency range, tuned or of a quality design.

Matching an aerial to the frequency of transmission is important, as is choosing an appropriate design.

The aerial's design will affect:
- proportion of the signal which leaves the aerial (efficiency), 
- directions in which it's transmitted, and whether it will be affected by horizontal / vertical polarization,
- proportion of signal which is reflected back within the device itself.

:::caution
While the LoRa devices we are using for Meshtastic are relatively low power radios, care should be taken _not_ to operate any radio transmission device without an aerial or with a poorly matched aerial.  Un-transmitted radio signal reflected back to the transmitter can damage the device.
:::

### Important considerations:

- What transmission frequency are you using?
  - Devices on another frequency will not be able to interact with yours.
  - See this listing by [The Things Network](https://www.thethingsnetwork.org/docs/lorawan/frequencies-by-country.html) for frequencies licensed for specific countries.
- How will you be carrying / transporting the radio?
  - A large directional aerial will transmit over significantly greater distance than an omni-directional aerial.  However, it must be pointed at its target so isn't optimal for mobile use.
  - A tuned half-wave whip aerial may have more omni-directional range than the quarter wave stubby; but it will be conspicuous in your pocket.
  - Many antennas, especially quarter wave stubby antennas, require the use of ground planes to transmit at peak performance.
- Do you want transmission in all directions?
  - While humans (mostly water) don't attenuate signal greatly (at LoRa frequencies), buildings & walls do.  
  - If your aerial is permanently positioned against a building, signal transmitted towards the wall will be largely lost.
- Does my Meshtastic device have the right power range, impedance & connector for the aerial?
  - For the LoRa devices it should be 50 Ohm impedance, with SMA connector. Many antennas will be recommended for LoRa use in their technical details.
  - By contrast, a close range, contact-less Personal Area Network antenna, or a huge aerial at the end of length of coax designed for a 100W transmitter are not going to be operable.
- Cost, quality and supply service?
  - The perfect aerial on paper, sourced from the other side of the world with mixed reviews doesn't compare to a local supplier who has spent time carefully collating all of the aerial data-sheets for comparison _and_ holds stock immediately available - personally I prefer to pay significantly more for a time saving, quality service.
- How close will the antenna be to my Meshtastic device?
  - Most cables will significantly degrade the signal strength over any significant distance. It is often more effective to place a node outside, than to have it indoors with the antenna outside.

## Terminology / references

You could do a lot worse than reading the [Wikipedia entry for Antenna](https://en.wikipedia.org/wiki/Antenna_(radio)), along with the [Wikipedia entry for LoRa](https://en.wikipedia.org/wiki/LoRa).

Instead of listing the terms, let us recommend this superb [tutorial](https://www.youtube.com/watch?v=J3PBL9oLPX8) by Andreas Spiess (the 'guy with the Swiss accent').
