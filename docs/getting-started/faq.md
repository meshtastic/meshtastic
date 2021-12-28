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

Q: What is Meshtastic?
* Meshtastic is most awesome long range, low power communications service on the planet earth! That's not even an exaggeration!

Q: Where can I get additional help, ask questions or bond with the Meshtastic community?
* After reading this FAQ and checking out the links on the left, there are two places... The preferred place is to check out the [Forum](https://meshtastic.discourse.group). There you can be part of our growing community and search for previous posts that may be similar to what you're looking for. We also have the [Meshtastic Discord](https://discord.com/invite/UQJ5QuM7vq) server where you may connect with like-minded people.

Q: How can I contribute to Meshtastic?
* Everyone contributes in a different way. Join the [Forum](https://meshtastic.discourse.group) and/or the [Meshtastic Discord](https://discord.com/invite/UQJ5QuM7vq) and introduce yourself. We're all very friendly. If you'd like to pitch in some code, check out the [Developers](https://meshtastic.org/docs/developers) menu on the left.

## Device (aka Node)

Q: Where do I purchase the device hardware?
* Each [supported device](https://meshtastic.org/docs/hardware/tbeam-hardware) has a "Purchase Link".

Q: I have my hardware. How do I install the firmware and any required drivers?
* See: https://meshtastic.org/docs/getting-started/flashing-esp32

Q: How do I update the firmware to the latest version?
* If the device is running Meshtastic firmware, you might be able to update over-the-air like via the Android app.

Q: My device has gone to sleep. Are received messages lost?
* The LoRa radio on the node is still active and will wake up the CPU when the device is sleeping. If your phone is in range, the node will relay any messages your phone may have missed. If you're in range and your device is active, messages have not been lost.

Q: My device has gone to sleep and I can't send any messages.
* Once the node wakes up from sleep, your phone will relay any delayed messages through your node and to the mesh network. Give it a few minutes and it'll do the right thing.

Q: How do I turn off an ESP32 t-beam based device?
* Hold down the middle button for about 10 seconds.

Q: How do I turn on an ESP32 t-beam based device?
* Push the power button for about 1 second.

Q: How can I tell the device not to sleep?
* Android instructions see: [Android Usage](https://meshtastic.org/docs/software/android/android-usage#configuration-options)
* Python CLI instructions see: [Python Usage](https://meshtastic.org/docs/software/python/python-cli#changing-device-settings)



### Plugins

Q: What are Plugins?
* Plugins are features that expand the basic device functionality and/or integrate with other services.

Q: What plugins do we have available?
* To see the list of available plugins, please go to: https://meshtastic.org/docs/software/plugins/plugins

Q: I'd like to write a plugin. How do I get started?
* See: https://meshtastic.org/docs/developers/device/plugin-api

## Android

Q: What versions of Android does the Meshtastic Android App require?
* Answer TBD

Q: What's the cloud icon next to the message?
* Empty Cloud - In route to your device.
* Up Arrow - Queued to be sent over the mesh.
* Check Mark - Delivered over the mesh.
* Cross Mark - Error

Q: How can I clear the message history?
* Clear the storage from Android Settings > App

## iOS

Q: What version of iOS does the Meshtastic iOS App Require?
* The now-in-beta iOS app requires iOS v15.

Q: How do I get the Meshtastic iOS App?
* See [iOS App](https://meshtastic.org/docs/software/ios/ios-development)

## Bluetooth

Q: How do I pair my phone to the device if my device doesn't have a screen?
* Answer TBD (perhaps consider using web if ESP32)

Q: Can I have Bluetooth enabled and use WiFi radio?
* No. Only one method will work at a time.

Q: How do I disable WiFi so Bluetooth will work?
* Ensure the wifi_ssid and wifi_password values are blank.

## WiFi / Web Browser

Q: How do I turn on the WiFI radio?
* See: https://meshtastic.org/docs/software/device/device-wifi

Q: When I turn on WiFi, Bluetooth turns off. Why is this?
* Currently WiFi and Bluetooth can not be enabled at the same time.

Q: How do I access the network from my web browser?
* Visit http://meshtastic.local (Note: This is a work in progress.)

## Channels

Q: What is a Meshtastic Channel?
* This is the LoRa channel you're broadcasting on, the modem configuration (spreading factor, bandwidth and error correction), along with a special identifier for your group and optional encryption.

Q: What is a LoRa channel?
* This is the LoRa frequency within the Frequency band your device is configured to use.

Q: How do I share my Meshtastic Channel with other people?
* Your Meshtastic client (Android, iOS, Web or Python) will provide you a URL or QR code. You can email, text or print this URL or QR code and share it with people you want to join your Meshtastic Channel.

Q: What is a Primary Channel?
* This is the first channel that's created for you when you initially setup your Meshtastic Channel.

Q: What is a Secondary Channel?
* As this is a new feature, secondary Channels work on the device and the Python Script. Support for secondary channels by other clients are pending. For more information: https://meshtastic.org/docs/software/device/device-channels#how-to-use-secondary-channels

## Command Line / Python

Q: How do I find out more about installing (and using) Meshtastic via command line?
* See https://meshtastic.org/docs/software/python/python-installation

Q: How do I find out more about using python to interact?
* See https://meshtastic.org/docs/software/python/python-usage
