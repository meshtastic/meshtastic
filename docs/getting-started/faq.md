---
id: faq
title: Frequently Asked Questions (FAQ)
sidebar_label: Frequently Asked Questions
slug: /getting-started/faq
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--

**** FAQ Contributors, README ***
*
*   Best Practices for the FAQ:
*
*   - Keep the answers Non-Technical. The FAQ should be targeted to non-geeks.
*   - This FAQ is not the authoritative document. Provide a short answer and a link to learn more.
*
****

-->

## General

### What is Meshtastic?

Meshtastic is the most awesome long range, low power communications service on the planet earth! That's not even an exaggeration!

### Where can I get additional help, ask questions, or bond with the Meshtastic community?

After reading this FAQ and checking out the links on the left, there are two places... The preferred place is to check out the [Forum](https://meshtastic.discourse.group). There you can be part of our growing community and search for previous posts that may be similar to what you're looking for. We also have the [Meshtastic Discord](https://discord.com/invite/UQJ5QuM7vq) server where you may connect with like-minded people.

### How can I contribute to Meshtastic?

Everyone contributes in a different way. Join the [Forum](https://meshtastic.discourse.group) and/or the [Meshtastic Discord](https://discord.com/invite/UQJ5QuM7vq) and introduce yourself. We're all very friendly. If you'd like to pitch in some code, check out the [Developers](https://meshtastic.org/docs/developers) menu on the left.

## Device (aka Node)

### Where do I purchase the device hardware?

Each [supported device](https://meshtastic.org/docs/hardware/supported/tbeam) has a "Purchase Link".

### I have my hardware. How do I install the firmware and any required drivers?

See: https://meshtastic.org/docs/getting-started/flashing-esp32

### How do I update the firmware to the latest version?

If the device is running Meshtastic firmware, you might be able to update over-the-air like via the Android app.

### My device has gone to sleep. Are received messages lost?

The LoRa radio on the node is still active and will wake up the CPU when the device is sleeping. If your phone is in range, the node will relay any messages your phone may have missed. If you're in range and your device is active, messages have not been lost.

### My device has gone to sleep and I can't send any messages.

Once the node wakes up from sleep, your phone will relay any delayed messages through your node and to the mesh network. Give it a few minutes and it'll do the right thing.

### How do I turn off an ESP32 t-beam based device?

Hold down the left PWR button for about 10 seconds and the display should turn off.

### How do I turn on an ESP32 t-beam based device?

Push the left PWR button for about 1 second.

### How can I tell the device not to sleep?

- Android instructions see: [Android Usage](https://meshtastic.org/docs/software/android/android-usage#configuration-options)
- Python CLI instructions see: [Python Usage](https://meshtastic.org/docs/software/python/python-cli#changing-device-settings)

### Plugins

### What are Plugins?

Plugins are features that expand the basic device functionality and/or integrate with other services.

### What plugins do we have available?

To see the list of available plugins, please go to: https://meshtastic.org/docs/software/plugins/

### I'd like to write a plugin. How do I get started?

See: https://meshtastic.org/docs/developers/device/plugin-api

## Android

### What versions of Android does the Meshtastic Android App require?

Android 5.0 is the current minSdkVersion (21).

### What's the cloud icon next to the message?

- Empty Cloud - Queued on the app to be sent to your device.
- Up Arrow - Queued on the device to be sent over the mesh.
- Check Mark - Delivered over the mesh.
- Cross Mark - Error.

### How can I clear the message history?

Clear the storage from Android Settings > App

## iOS

### What version of iOS does the Meshtastic iOS App Require?

The now-in-beta iOS app requires iOS v15.

### How do I get the Meshtastic iOS App?

See [iOS App](https://meshtastic.org/docs/software/ios/ios-development)

## Bluetooth

### How do I pair my phone to the device if my device doesn't have a screen?

Use [Wifi](https://meshtastic.org/docs/software/device/device-wifi) or Bluetooth with screenless pairing: before you initiate pairing, double click on the device button. The LED will blink 3 times in confirmation and the PIN will be set temporarily to `123456`.

### Can I have Bluetooth enabled and use WiFi radio?

No. Only one method will work at a time.

### How do I disable WiFi so Bluetooth will work?

Ensure the wifi_ssid and wifi_password values are blank.

## WiFi / Web Browser

### How do I turn on the WiFI radio?

See: https://meshtastic.org/docs/software/device/device-wifi

### When I turn on WiFi, Bluetooth turns off. Why is this?

Currently WiFi and Bluetooth can not be enabled at the same time.

### How do I access the network from my web browser?

Visit http://meshtastic.local (Note: This is a work in progress.)

### I've Flashed my device but I can't access the Web UI

Ensure you have used the included `device-install` script to flash your device, and that the file `spiffs-*.bin` is present in the same folder as your firmware at the time of flashing.

Note: Currently only Chrome and Chromium based browsers offer reliable support for the Web UI. 

## Channels

### What is a Meshtastic Channel?

This is the LoRa channel you're broadcasting on, the modem configuration (spreading factor, bandwidth and error correction), along with a special identifier for your group, and optional encryption.

### What is a LoRa channel?

This is the LoRa frequency within the frequency band your device is configured to use.

### How do I share my Meshtastic Channel with other people?

Your Meshtastic client (Android, iOS, Web or Python) will provide you a URL or QR code. You can email, text or print this URL or QR code and share it with people you want to join your Meshtastic Channel.

### What is a Primary Channel?

This is the first channel that's created for you when you initially setup your Meshtastic Channel.

### What is a Secondary Channel?

As this is a new feature, secondary channels work on the device and the Python Script. Support for secondary channels by other clients is pending. For more information: https://meshtastic.org/docs/software/device/device-channels#how-to-use-secondary-channels

## Command Line / Python

### How do I find out more about installing (and using) Meshtastic via command line?

See https://meshtastic.org/docs/software/python/python-installation

### How do I find out more about using python to interact?

See https://meshtastic.org/docs/software/python/python-uses
