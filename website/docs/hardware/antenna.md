---
id: antenna
title: Antennas
sidebar_label: Antennas
slug: /hardware/antenna
---

## TL; DR

If you have sufficient range with your existing aerial, skip this section.  If you don't, consider either getting more nodes and / or replace the stock aerial with one tuned (to your region transmitter's frequency): 

- A quarter quarter wave _tuned_ stubby aerial (<10cm for fit-in-pocket) should have a real-world range of a couple of km without significant obstacles (buildings / hills). 
- Aerial criteria: 50 Ohm, SMA male connector, low VSWR (<2) (at tuning frequency - see its datasheet), gain > 0 dbi .
- Caution, avoid suppliers who:
  - don't state the aerial's tuned frequency and its specific purpose (LoRa network)
  - claim huge gain figures on omni-directional aerials
  - don't provide boringly professional data-sheets. 
- If you want more range, directionality, specificity read on.

## General guidance

The Meshtastic system is designed to be simple and intuitive to use.  However, its LoRa radios rely on point to point communications, unit to unit, aerial to aerial; quite different to the near ubiquitous radio coverage of today's cellphone & wi-fi connections.

Some understanding of the factors affecting radio communications will help achieve substantially better service, faster transmission, over a greater range with your devices.  Here, we'll attempt to provide a top-level set of guidance for use and aerial selection, how to test the aerials, and a set of resources for further research and plenty of opportunity for going deeper.

The Meshtastic devices (of various flavours) lend themselves to experimentation, not only because you can replace their aerials, but also because of their mesh operation.  All nodes will, without alteration, relay communications from any other members of the mesh around obstacles and over greater distances.  The cost of aerial investment should be weighed against investment in additional low-cost nodes.

Caution: do not switch on your Meshtastic device (or any other transmitter) without an aerial attached - see below.

The information collected here is by no means definitive, and necessarily abbreviated (it's a huge topic).

## Non aerial factors affecting transmission

Unless you're using your devices in a vacuum with clear line of sight between aerials:
- Weather (temperature, humidity & air pressure),
- Transmission power, spreading and other associated channel factors,
- Number of nodes within reach in the mesh (affects retries consequent duty cycle hit),
- Absorption by materials (with varying degrees attenuation, by material and depth),
- Reflection off surfaces (and channeled through material tunnels, including warm / cold air tunnels commonly present in the atmosphere),
- Diffraction around obstacles (over forests and around corners).

## Aerial selection

The stock aerials provided bundled with the t-Beam and other boards are, in general a 'mixed bag'.  They may not have been selected for your given frequency range, tuned or of a quality design.

Matching an aerial to the frequency of transmission is important, as is choosing an appropriate design.

The aerial's design will affect:
- proportion of the signal which leaves the aerial (efficiency), 
- directions in which it's transmitted, and whether it will be affected by horizontal / vertical polarisation,
- proportion of signal which is reflected back within the device itself.

While the LoRa devices we are using for Meshtastic are relatively low power radios, care should be taken _not_ to operate any radio transmission device without an aerial or with a poorly matched aerial.  Un-transmitted radio signal reflected back to the transmitter can damage the device.

### Important considerations:

- What transmission frequency are you using? (varies by region)
  - Devices on another frequency will not be able to interact with yours.
  - Only specific frequencies are licensed [radio settings](docs/developers/device/radio-settings).
- How will you be carrying / transporting the radio?
  - A large directional aerial will transmit over significantly greater distance than an omni-directional aerial.  However, it must be pointed at its target so isn't optimal for mobile use.
  - A tuned half wave whip aerial may have more omni-directional range than the quarter wave stubby; but it will be conspicuous in your pocket.
- Do you want transmission in all directions?
  - While humans (mostly water) don't attenuate signal greatly (at LoRa frequencies), buildings & walls do.  
  - If your aerial is permanently positioned against a building, signal transmitted towards the wall will be largely lost.
- Does my Meshtastic device have the right power range, impedance & connector for the aerial?
  - For the T-Beam devices it should be 50 Ohm impedance, with SMA connector, many will be recommended for LoRa use in their technical details.
  - By contrast, a close range, contact-less Personal Area Network antenna, or a huge aerial at the end of length of coax designed for a 100W transmitter are not going to be operable.
- Cost, quality and supply service?
  - The perfect aerial on paper, sourced from the other side of the world with mixed reviews doesn't compare to a local supplier who has spent time carefully collating all of the aerial data-sheets for comparison _and_ holds stock immediately available - personally I prefer to pay significantly more for a time saving, quality service.

## Terminology / references & further research

You could also do worse than reading the [wikipedia entry for Antenna](https://en.wikipedia.org/wiki/Antenna_(radio)).

Instead of repeat listing the terms, let me recommend this superb [tutorial](https://www.youtube.com/watch?v=J3PBL9oLPX8) by Andreas Speiss (the 'guy with the Swiss accent').

See in the references of the above LoRa world record transmission distance details & instructions on self-build Moxon antennae.

### Environmental

For a bit of light reading on environmental research:

  -  [RF attentuation in vegetation](https://www.itu.int/dms_pubrec/itu-r/rec/p/R-REC-P.833-9-201609-I!!PDF-E.pdf) (yes really); if you wander through the woods wondering how your RF is bouncing off leaves dependent on their variety, and wind speed … well you do, now.
  -  [RF attentuation with various building materials](https://www.ofcom.org.uk/__data/assets/pdf_file/0016/84022/building_materials_and_propagation.pdf).
  -  This one by ITU again is very detailed in its [analysis of the drivers of attenuation](https://www.itu.int/dms_pubrec/itu-r/rec/p/R-REC-P.2040-1-201507-I!!PDF-E.pdf) (I wasn’t aware that all EMF radiation exhibits reflection / transmission characteristics akin to light hitting a material boundary. So, depending on the angle of incidence, material and the EMF wavelength, it will be reflected and / or transmitted through).
  - These RF bands are also made more [noisy by adjacent LTE](https://www.ofcom.org.uk/__data/assets/pdf_file/0023/55922/lte-coexistence.pdf)

In summary - our wavelengths in Europe fair well in plain sight, curve over not-so-tall obstacles (including trees), reflect of surfaces at low angles of incidence. They go through humans without much attenuation; but not brick or stone or anything much above glass / kevlar. Oh, and don’t sit under an LTE tower and expect it to be plain sailing.

### Testing

A [couple](https://medium.com/home-wireless/testing-lora-antennas-at-915mhz-6d6b41ac8f1d) of [excellent](https://medium.com/home-wireless/testing-and-reviewing-lora-antennas-5b37dfa594a3) aerial comparison & testing videos.  Their utility goes beyond the specific aerials tested:
- Insight into aerial types & their characteristics,
- Testing approaches.

On the topic of testing - performing your own testing and providing feedback is the lifeblood of Meshtastic and OpenSource projects.  

Stating the obvious: 
- Walk around with a radio sending messages,
- For each message, note location and whether 'ack' ticks are received,
- Also note reported signal strengths,
- Change aerials, repeat & contrast.

This can be done by utilising the [range test plugin](/docs/software/plugins/range-test-plugin)

## Discussion

To comment on / join in antenna range [Meshtastic discourse](https://meshtastic.discourse.group/t/antenna-improved-range/227/35?u=sens8tion)

There, you will also find reference to Meshtastic range achievements, aerial recommendations (note we've stopped short of making specific supplier aerial recommendations in this wiki).
