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

Because of the increased network traffic for this overhead, it's not advised to use this if you are duty cycle limited for your airtime usage nor is it advised to use this for SF12 (Long range but Slow).

### About - How it works

![Store & Forward - Overview](/img/plugins/store_and_forward/store_and_forward-overview.png)

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

Either use a custom channel configuration with at an at least 1kbit data rate or use "Medium range (but fast)".

Recommended channel setting is for 1.343kbps:

```bash
meshtastic --setchan spread_factor 11 --setchan coding_rate 4 --setchan bandwidth 500
```

With an aftermarket coaxial antenna or moxon antenna, that will give you roughly the same range as "Long range (but slow)" and 5x the bitrate.

### Router setup

* Configure your device as a meshtastic router.
* * https://meshtastic.org/docs/software/settings/router
* Configure the Store and Forward plugin
* * Required configuration
* * * store_forward_plugin_enabled - Set this to true to enable the plugin. False to disable the plugin.
* * Optional configuration
* * * store_forward_plugin_records - Set this to the maximum number of records to save. Best to leave this at the default (0) where the plugin will use 2/3 of your device's available PSRAM. This is about 11,000 records.
* Name your router node something that makes it easily identifiable, aka "Router".

Don't enable the Store and Forward plugin on multiple routers!

### Client Usage
 
Currently, no special configuration is required. To request your history sent to you, send the command into the message field "SF". That's it. This will eventually change to make it easier. At the moment, that message will be sent to everyone on the mesh but we'll (eventually) make it easier to use where there'll be a button (or maybe it'll be transparent) and the command isn't sent as a text message to the mesh.

Available Commands:

| Command | Definition |
| :-----: | :---------------: |
| SF | Send the last few messages I may have missed |
| SFm | Send a 240 byte payload (Used for testing) |

The Store and Forward plugin will only service one client at a time. If a second client requests messages while the S&F is busy, the S&F will send a private message to the second client that they will need to wait.

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| store_forward_plugin_enabled | `true`, `false` | `false` |
| store_forward_plugin_records | integer | `0` |
| store_forward_plugin_replay_max_records (tbd) | integer | `0` |
| store_forward_plugin_replay_max_time  (tbd)  | integer | `0` |


## Example Request/Response

### Request History (Use Router Defaults)

Story: Carol has been away from the mesh with device turned off. She would like to get a replay of what she has missed. The router will return the messages.

* Carol
* * Packet (Port: STORE_FORWARD_APP)
* * * To: Broadcast (Optionally, direct to router)
* * * StoreAndForward.rr.CLIENT_HISTORY
* Router
* * Packet (Port: STORE_FORWARD_APP)
* * * To: Carol
* * * StoreAndForward.rr.ROUTER_HISTORY
* * * StoreAndForward.history.HistoryMessages = 42 // Router has 42 messages that will be sent to Carol
* * * StoreAndForward.history.Window = 120 // Router searched for messages over the last two hours.
* * * StoreAndForward.history.LastRequest = 0 // Carol has never asked for the history.
* * Packet (Port: TEXT_MESSAGE_APP)
* * * ... a series of 42 text messages

### Request History (No history available)

Story: Carol has been away from the mesh with device turned off. She would like to get a replay of what she has missed but the router indicates there are no messages available.

* Carol
* * Packet (Port: STORE_FORWARD_APP)
* * * To: Broadcast (Optionally, direct to router)
* * * StoreAndForward.rr.CLIENT_HISTORY
* Router
* * Packet (Port: STORE_FORWARD_APP)
* * * To: Carol
* * * StoreAndForward.rr.ROUTER_HISTORY
* * * StoreAndForward.history.HistoryMessages = 0 // Router has no messages to be sent to carol
* * * StoreAndForward.history.Window = 120 // Router searched for messages over the last two hours.
* * * StoreAndForward.history.LastRequest = (timestamp) // Last time carol requested the history

### Store & Forward Router Heartbeat

Story: The Store & Forward Router sends a periodic message onto the network. This allows connected devices to know that a router is in range and listening to received messages. Client will not respond to network but (optionally) indicate to the user that a S&F router is available or not available.

* Router
* * Packet (Port: STORE_FORWARD_APP)
* * * To: Broadcast
* * * StoreAndForward.rr.ROUTER_HEARTBEAT
* * * StoreAndForward.heartbeat.Period = 120 // Expect a heartbeat every 2 minutes
* * * StoreAndForward.heartbeat.Secondary = false // If true, this is a secondary "backup" S&F node. Will be (eventually) used for router election in the event there are multiple S&F Routers.

## Developer TODO

Not necessarily in this order:

* Client Interface (Web, Android, Python or iOS when that happens) to request packets be resent.

* Router sends a heartbeat so the client knows there is a router in range.

* support for a mesh to have multiple routers that have the store & forward functionality (for redundancy)

* Add a default channel at about 1.5kbit / sec

* Eventually we could add a "want_store_and_forward" bit to MeshPacket and that could be nicer than whitelists in this plugin. Initially we'd only set that bit in text messages (and any other plugin messages that can cope with this). This change would be backward wire compatible so can add easily later.

* Have a "cool down" period to disallow a client to request the history too often.

* Message with SF status on requests.

* Be able to identify if you're within range of a router.

* Be able to specify the HOP MAX to reduce airtime. Is this necessary?

* Restrict operation of S&F on the slow channel configurations.

* Create a TX queue to prevent the history from being modified in flight.

* Only allow n-number of requests to the router at any one time.

* Set number of max messages from the history.

* Calculate a new channel with 250MHz bandwidth and ~1.5kbit.

*** Done

* Disable ACK. If the router is within range, so is the requester.

* Currently the way we allocate messages in the device code is super inefficient. It always allocates the worst case message size. Really we should dynamically allocate just the # of bytes we need. This would allow many more MeshPackets to be kept in RAM.

* Allow max history to be defined by radioConfig.preferences.store_forward_plugin_records

* Add a starting to send / finished sending message

