---
id: overview
title: Getting Started
sidebar_label: Getting Started
slug: /getting-started
---

import Link from '@docusaurus/Link';

## What is Meshtastic?

Meshtastic® is a project that lets you use inexpensive LoRa radios as a long range off-grid communicator for areas without reliable cellular service. These radios are great for hiking, skiing, paragliding - essentially any hobby where you don't have reliable internet access. Each member of the mesh can send and view text messages and enable optional GPS based location features.

The radios automatically create a mesh to forward packets as needed, so everyone in the group can receive messages from even the furthest member. The radios will optionally work with your phone, but no phone is required.

Meshtastic uses LoRa for the long range communications and depending on settings used, the maximum theoretical group size ranges from 30-200 device nodes. Currently, each device can only support a connection from a single user at a time.

<div className="indexCtasBody">
  <Link
    className={'button button--outline  button--lg cta--button'}
    to={'/docs/about'}>
    Learn More
  </Link>
</div>

## Hardware

### Purchasing

#### Purchase radio

The easiest way is to [buy a device with the software already installed](https://www.aliexpress.com/item/4001178678568.html). Other devices are [available](/docs/hardware/supported/tbeam). In the Americas get the 915MHz version, in Europe the 868MHz, or Asia 923MHz. See this listing by [The Things Network](https://www.thethingsnetwork.org/docs/lorawan/frequencies-by-country.html) for frequencies by specific countries.

#### Purchase battery

#### Purchase other accessories

<div className="indexCtasBody">
  <Link
   className={'button button--outline  button--lg cta--button'}
   to={'/docs/hardware'}>
    Purchase Hardware
  </Link>
</div>

### Initial Setup

#### Setup the Radio

When it arrives, install your antenna and make sure you install the battery correctly. Reversing the battery can damage your device. Make sure the antenna is on when you power up the board.

:::caution
Make sure not to power the radio on without first attaching the antenna! You could damage the radio chip!
:::

## Flashing Firmware

If your device already has Meshtastic flashed to it, you can update it over the air (OTA). Otherwise, you'll need a computer and a **data** USB cable. Flashing firmware can be done in the following ways:

- Install using Meshtastic Flasher:

  This all in one application will download the appropriate firmware, detect your device, flash the device, and allow you to configure your settings.

- Install using manual method:

  Manual firmware files can be downloaded from the [Downloads](/downloads) page.

The manual firmware installation method will also depend on whether you have an ESP32 based device or a nRF52 based device. See our [hardware section](/docs/hardware) to determine which microcontroller your device is based on.

<div className="indexCtasBody">
  <Link
    className={'button button--outline  button--lg cta--button'}
    to={'/docs/getting-started/flashing-firmware'}>
    Flash Firmware
  </Link>
</div>

## Connect to your Device

There are many ways to connect to your new radio!

- Command line interface (CLI)
- Graphic user interface (GUI)
- Serial connection
- Bluetooth
- Web app over Wifi (in development)

<div className="indexCtasBody">
  <Link
    className={'button button--outline  button--lg cta--button'}
    to={'/docs/getting-started/clients'}>
    Connect to Node
  </Link>
</div>

## Use Meshtastic

This is the best part of Meshtastic. Deploying, testing, and optimizing your personal mesh network. Click below for first steps, configurations, and tests.

<div className="indexCtasBody">
  <Link
    className={'button button--outline  button--lg cta--button'}
    to={'/docs/getting-started/first-steps'}>
    First Steps
  </Link>
</div>

## Troubleshooting

Hopefully your "getting started" experience has been straight forward and headache free. If you've had issues, please consider updating our documentation to improve future user experiences. If you're still having issues. Reach out on the [forum](https://meshtastic.discourse.group) or [Discord](https://discord.com/invite/UQJ5QuM7vq). Our support is 100% volunteer based. We are passionate about the project hope to help newcomers become Meshtastic experts.
