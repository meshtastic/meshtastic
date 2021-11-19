---
id: faq
title: Frequenty Asked Questions
sidebar_label: Frequenty Asked Questions
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
* Answer TBD

Q: How can I contribute to Meshtastic?
* Answer TBD

Q: What is a Channel?
* Answer TBD

## Device (aka Node)

Q: Where do I purchase the device hardware?
* Answer TBD

Q: I have my hardware. How do I install the firmware?
* Answer TBD

Q: How do I update the firmware to the latest version?
* Answer TBD

Q: My device has gone to sleep. Are my messages lost?
* The LORA radio on the node is still active and will wake up the CPU when the device is sleeping. If your phone is in range, the node will relay any messages your phone may have missed.

Q: My device has gone to sleep and I can't send any messages.
* Once the node wakes up from sleep, your phone will relay any delayed messages through your node and to the mesh network. Give it a few minutes and it'll do the right thing.

Q: How can I tell the device not to sleep?
* Answer TBD



### Plugins

Q: What are Plugins?
* Answer TBD

Q: What plugins do we have available?
* To see the list of available plugins, please go to: https://meshtastic.org/docs/software/plugins/plugins

Q: I have an idea for a plugin. Who can help me with this?
* Answer TBD

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
* Answer TBD

Q: How do I get the Meshtastic iOS App?
* Answer TBD

## WiFi / Web Browser

Q: How do I turn on the WiFI radio?
* See: https://meshtastic.org/docs/software/device/device-wifi

Q: When I turn on WiFi, Bluetooth turns off. Why is this?
* Currently WiFi and Bluetooth can be turned on at the same time.

Q: How do I access the network from my web browser?
* Answer TBD

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

## Commmand Line / Python

Q: Question
* Answer TBD
