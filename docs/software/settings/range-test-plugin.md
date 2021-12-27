---
id: range-test-plugin
title: Range Test Plugin Settings
sidebar_label: Range Test Plugin
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Overview

This plugin allows you to test the range of your Meshtastic nodes. It requires at least two nodes, a sender and a receiver. The receiving node then saves the messages along with the GPS coordinates at which they were received into a .csv file. This .csv file can then be integrated into [Google Earth](https://earth.google.com), [Google Maps - My Maps](https://mymaps.google.com), or any other program capable of processing .csv files. This can enable you to visualize your mesh.

:::note
Once settings are changed, a **reset** is required for them to take effect.
:::

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| range_test_plugin_enabled | `true`, `false` | `false` |
| range_test_plugin_save | `true`, `false` | `false` |
| range_test_plugin_sender | `integer` (Seconds) | `0` |

### range_test_plugin_enabled

Enables the plugin.

### range_test_plugin_save

If enabled, we will save a log of all received messages to `/static/rangetest.csv` which you can access from the web server. We will abort writing if there is less than 50k of space on the filesystem to prevent filling up the storage.

### range_test_plugin_sender

Number of seconds to wait between sending packets. Using the long_slow channel configuration, it's best not to go more frequent than once every 60 seconds. You can be more aggressive with faster settings. `0` is default which disables sending messages.

## Details

While a minimum of two radios is required, more can be used. You can have any number of receivers and senders that your mesh is able to handle. You can test having a single sender with multiple receivers or a single receiver with multiple senders. Let us know on the [forum thread](https://meshtastic.discourse.group/t/new-plugin-rangetestplugin/2591/) the results of your configuration.

Be sure to turn off either the plugin configured as a sender or the device where the plugin setup as sender when not in use. This will use a lot of time on air and will spam your channel.

Also be mindful of your space usage on the file system. It has protections from filling up the space but it's best to delete old range test results.

:::note
Leaving this plugin on can slow down your mesh. Currently, the messages are sent using the same `TEXT_MESSAGE_APP` [port that all other messages](../../developers/protobufs/api#portnumsproto) are sent on.
:::

### Accessing your CSV

Connect to your device over WiFi, either using the [software access point](wifi#software-access-point) or [WiFi Client](wifi#wifi-client). Then navigate to `meshtastic.local` (or your IP address) `/static/rangetest.csv` where your file will be available for download.

```plaintext title="Example URLs"
http://meshtastic.local/static/rangetest.csv
http://198.168.0.X/static/rangetest.csv
```

### Recommended Sender Settings

| Radio Setting | `range_test_plugin_sender` |
| :-----------: | :------------------------: |
| Long Slow | 60 |
| Long Alt | 30 |
| Medium | 15 |
| Short Fast | 15 |

## Examples

### Sender Node
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Example - Sender Node"
  meshtastic --set range_test_plugin_enabled true
  meshtastic --set range_test_plugin_sender 60
  ```


  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

### Receiver Node
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Example - Receiver Node"
  meshtastic --set range_test_plugin_enabled true
  meshtastic --set range_test_plugin_save true
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>
