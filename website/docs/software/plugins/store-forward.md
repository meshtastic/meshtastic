---
id: store-forward-plugin
title: Store and Forward plugin
sidebar_label: Store and Forward
---

## About
:::caution
This is a work in progress and is not yet available.
:::

The Store Forward Plugin is an implementation of a Store and Forward system to enable resilient messaging in the event that a client device is disconnected from the main network.

Because of the increased network traffic for this overhead, it's not adviced to use this if you are duty cycle limited for your airtime usage nor is it adviced to use this for SF12 (Long range but Slow).

## Requirements

Initial Requirements:

* Must be installed on a router node.
* * This is an artificial limitation, but is in place to enforce best practices.
* * Router nodes are intended to be always online. If this plugin misses any messages, the reliability of the stored messages will be reduced
* Esp32 Processor based device with external PSRAM. (tbeam v1.0 and tbeamv1.1, maybe others)

## Usage Overview

* To use / test this you will want at least 3 devices
* * One device will (currently) need be a tbeam v1.0 and tbeamv1.1 configured as a meshtastic router. Other devices with built in PSRAM will be supported at some point.
* * Two others will be regular clients. Nothing special required.

### Meshtastic channel configuration

Don't use this on the "Very long range (but slow)" or "Long range (but slower)" channel settings. You're welcome to try and report back, but those channels have a very low bitrate.

Either use a customer channel configuration with at an at least 1kbit data rate or use "Medium range (but fast)".

### Router setup

* Configure your device as a meshtastic router.
* * https://meshtastic.org/docs/software/settings/router
* Configure the Store and Forward plugin
* * Required configuration
* * * store_forward_plugin_enabled - Set this to true to enable the plugin. False to disable the plugin.
* * Optional configuration
* * * store_forward_plugin_records - Set this to the maximum number of records to save. Best to leave this at the default (0) where the plugin will use 2/3 of your device's available PSRAM. This is about 11,000 records.
* Name your router node something that makes it easily identifable, aka "Router".

Don't enable the Store and Forward plugin on multile routers!

### Client Usage
 
Currently, no sepcial configuration is required. To request your history sent to you, send the message "SF". That's it. This will eventually change to make it easier.

## Developer Notes:

Not necessarily in this order:

UC 1) MVP - automagically forward packets to a client that may have missed packets.

UC 2) Client Interface (Web, Android, Python or iOS when that happens) to optionally request packets be resent. This is to support the case where Router has not detected that the client was away. This is because the router will only know you're away if you've been gone for a period of time but will have no way of knowing if you were offline for a short number of minutes. This will cover the case where you have ducked into a cave or you're swapping out your battery.

UC 3) router sends a periodic “heartbeat” to let the clients know they’re part of the main mesh

UC 4) support for a mesh to have multiple routers that have the store & forward functionality (for redundancy)

UC 5) Support for "long term" delayed messages and "short term" delayed messages. Handle the cases slightly different to improve user expierence. A short term delayed message would be a message that was resent becaue a node was not heard from for <5 minutes. A long term delayed message is a message that has not been delivered in >5 minutes.

UC 6) Eventually we could add a "want_store_and_forward" bit to MeshPacket and that could be nicer than whitelists in this plugin. Initially we'd only set that bit in text messages (and any other plugin messages that can cope with this). This change would be backward wire compatible so can add easily later.

UC 7) Currently the way we allocate messages in the device code is super inefficient. It always allocates the worst case message size. Really we should dynamically allocate just the # of bytes we need. This would allow many more MeshPackets to be kept in RAM.

UC 8) We'll want a "delayed" bit in MeshPacket. This will indicate that the message was not received in real time.
