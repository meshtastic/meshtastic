---
id: store-and-forward-plugin
title: Store and Forward Settings
sidebar_label: Store and Forward
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Overview

:::caution
This is a work in progress and is partially available. Stability is not guaranteed.
:::

The Store Forward Plugin is an implementation of a Store and Forward system to enable resilient messaging in the event that a client device is disconnected from the main network.

Because of the increased network traffic for this overhead, it's not advised to use this if you are duty cycle limited for your airtime usage nor is it advised to use this for SF12 (Long Range / Slow).

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| store_forward_plugin_enabled | `true`, `false` | `false` |
| store_forward_plugin_heartbeat | `true`, `false` | TODO - look up default setting |
| store_forward_plugin_history_return_max | `integer` | `0` |
| store_forward_plugin_history_return_window | `integer` | `0` |
| store_forward_plugin_records | integer | `0` |

### store_forward_plugin_enabled

Enables the plugin.

### store_forward_plugin_heartbeat

<!--- TODO --->

### store_forward_plugin_history_return_max

<!--- TODO --->

### store_forward_plugin_history_return_window

<!--- TODO --->

### store_forward_plugin_records

<!--- TODO --->

## Details

### How it works

![Store & Forward - Overview](/img/plugins/store_and_forward/store_and_forward-overview.png)

### Requirements

Initial Requirements:

* Must be installed on a router node.
* * This is an artificial limitation, but is in place to enforce best practices.
* * Router nodes are intended to be always online. If this plugin misses any messages, the reliability of the stored messages will be reduced.
* Esp32 Processor based device with external PSRAM. (tbeam v1.0 and tbeamv1.1, and maybe others)

### Usage Overview

* To use / test this you will want at least 3 devices
* * One device will (currently) need be a tbeam v1.0 and tbeamv1.1 configured as a Meshtastic router. Other devices with built in PSRAM will be supported at some point.
* * Two others will be regular clients. Nothing special required.

### Meshtastic channel configuration

Don't use this on the "Long Range / Slow" or "Long Range / Fast" channel settings. You're welcome to try and report back, but those channels have a [very low bitrate](/docs/developers/device/radio-settings#pre-defined).

Either use a custom channel configuration with at an at least 1kbit data rate or use "Medium Range / Fast".

Recommended channel setting is for 1.343kbps:

```bash
meshtastic --setchan spread_factor 11 --setchan coding_rate 4 --setchan bandwidth 500
```

With an aftermarket coaxial antenna or moxon antenna, that will give you roughly the same range as "Long Range / Slow" and 5x the bitrate.

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



## Examples

<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  TODO

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>
