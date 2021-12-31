---
id: antenna
title: Antennas
sidebar_label: Overview
slug: /hardware/antenna
---

## TL; DR

If you have sufficient range with your existing aerial, skip this section.  If you don't, consider either getting more nodes and / or replace the stock aerial with one tuned (to your region transmitter's frequency): 

- A quarter wave _tuned_ stubby aerial (<10cm for fit-in-pocket) should have a real-world range of a couple of km without significant obstacles (buildings / hills). 
- Aerial criteria: 50 Ohm, appropriate connector (usually SMA male or U.FL), low VSWR (<2) (at tuning frequency - see its datasheet), gain > 0 dBi .
- Caution, avoid suppliers who:
  - don't state the aerial's tuned frequency and its specific purpose (LoRa network)
  - claim huge gain figures on omni-directional aerials
  - don't provide boringly professional data-sheets. 

If you want more range, directionality, or specificity read on.

## General guidance

The Meshtastic system is designed to be simple and intuitive to use.  However, its LoRa radios rely on point-to-point communications, unit to unit, aerial to aerial; quite different to the near ubiquitous radio coverage of today's cellphone & Wifi connections.

Some understanding of the factors affecting radio communications will help achieve substantially better service, faster transmission, over a greater range with your devices.  Here, we'll attempt to provide a top-level set of guidance for use and aerial selection, how to test the aerials, and a set of resources for further research and plenty of opportunity for going deeper.

The Meshtastic devices (of various flavors) lend themselves to experimentation, not only because you can replace their aerials, but also because of their mesh operation.  All nodes will, without alteration, relay communications from any other members of the mesh around obstacles and over greater distances.  The cost of aerial investment should be weighed against investment in additional low-cost nodes.

:::caution
While the LoRa devices we are using for Meshtastic are relatively low power radios, care should be taken _not_ to operate any radio transmission device without an aerial or with a poorly matched aerial.  Un-transmitted radio signal reflected back to the transmitter can damage the device.
:::

The information collected here is by no means definitive, and necessarily abbreviated (it's a huge topic).

## Discussion

To comment on / join in antenna range [Meshtastic discourse](https://meshtastic.discourse.group/t/antenna-improved-range/227/35?u=sens8tion)

There, you will also find reference to Meshtastic range achievements, aerial recommendations (note we've stopped short of making specific supplier aerial recommendations in this wiki).
