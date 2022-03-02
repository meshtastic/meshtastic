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

<Link
  className={'button button--outline  button--lg cta--button'}
  to={'/docs/about'}>
  Learn More
</Link>

## Purchase a Radio

The easiest way is to [buy a device with the software already installed](https://www.aliexpress.com/item/4001178678568.html). Other devices are [available](/docs/hardware/supported/tbeam). In the Americas get the 915MHz version, in Europe the 868MHz, or Asia 923MHz. See this listing by [The Things Network](https://www.thethingsnetwork.org/docs/lorawan/frequencies-by-country.html) for frequencies by specific countries.

<Link
  className={'button button--outline  button--lg cta--button'}
  to={'/docs/hardware'}>
  Purchase Hardware
</Link>


## Setup the Radio

When it arrives, install your antenna and make sure you install the battery correctly. Reversing the battery can damage your device. Make sure the antenna is on when you power up the board.

:::caution
Make sure not to power the radio on without first attaching the antenna! You could damage the radio chip!
:::

## Flashing Firmware

If your device already has Meshtastic flashed to it, you can update it over the air (OTA). Otherwise, you'll need a computer and a **data** USB cable. Flashing firmware can be done in the following ways:

- Install using Meshtastic Flasher
  This all in one application will download the appropriate firmware, detect your device, flash the device, and allow you to configure your settings.

- Install using manual method
  Manual firmware files can be downloaded from the [Downloads](/downloads) page.

The manual firmware installation method will also depend on whether you have an ESP32 based device or a nRF52 based device. See our [hardware section](/docs/hardware) to determine which microcontroller your device is based on.

<Link
  className={'button button--outline  button--lg cta--button'}
  to={'/docs/getting-started/flashing-firmware'}>
  Flash Firmware
</Link>

## Connect to your Device

There are many ways to connect to your new radio!

- Command line interface (CLI)
- Graphic user interface (GUI)
- Serial connection
- Bluetooth
- Web app over Wifi (in development)

## A good first test (connect via USB and CLI)

If you have at least two radios with the Meshtastic firmware, you may consider connecting one via USB and the other battery powered. Communicate with the USB radio using a CLI like [Meshtastic-python](https://meshtastic.org/docs/software/python/python-installation).

- Ensure you can run `meshtastic --info`.
- Ensure the region is set appropriately. If the radios are 915 MHz and you are in the US, then no region changes/settings are necessary. If you are in another region, you may need to run something like: `meshtastic --set region EU865`.
- Send a message `meshtastic --sendtext hello1`
- Note: The radio connected via USB will not show messages sent.
- After a few seconds the other radios will show the message. You may need to press one of the buttons on the other radio to see if the message arrived.
- Run `meshtastic --nodes` to see if other nodes show in the display.
- Messages sent from the USB radio should be sent to the other radio(s) via LoRa. The default settings should allow this to work.

## A good second test (connect via Bluetooth)

The Android app is currently more robust than the iOS app. But, they both should be able to interact with the radios.

- Install Android or iOS Meshtastic app
- Start Meshtastic app
- Connect to radio(s) from inside the app
- Pair with radio(s). A paring code should show on the radio. Enter that value when prompted to pair a Bluetooth device.
- Send message(s) from inside the app.
- Note: The radio connected via Bluetooth will not show messages sent.
- Verify that all other radios are receiving the message(s). Might have to click on the button on the radio to see most recent message.

## A good third test (connect via Wifi/HTTP)

- Configure the _wifi_ssid_ and _wifi_password_. `meshtastic --set wifi_ssid 'xxx' --set wifi_password 'yyy'` (where xxx and yyy are the appropriate values for your network)
- Reboot radio by either removing power or pressing the power button.
- Click on the button to cycle through to the screen with IP address and verify that there was a connection to the Wifi access point.
- Send message(s). `meshtastic --host 192.168.1.200 --sendtext hello`
- Note: The radio connected via Wifi will not show messages sent.
- Verify that all radios are receiving the message(s). Might have to click on the button on the radio(s) to see most recent message.
- Open up a browser to http://meshtastic.local to view the web UI (currently under development). You may need to open http://meshtastic.local/static )
- If you want to switch back to Bluetooth, you will need to set the _wifi_ssid_ and _wifi_password_ values to blank values (ex: `meshtastic --set wifi_ssid '' --set wifi_password ''`).

## Troubleshooting

For any issues during setup, search [our forum](https://meshtastic.discourse.group) to find a solution. If you can't find one, please post your problem and provide as much detail as possible.

We are also on [Discord](https://discord.gg/UQJ5QuM7vq).
