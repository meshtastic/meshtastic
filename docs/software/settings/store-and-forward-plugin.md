---
id: store-and-forward-plugin
title: Store and Forward Settings
sidebar_label: Store and Forward
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Overview

:::caution
This is a work in progress and is not yet available.
:::

The Store Forward Plugin is an implementation of a Store and Forward system to enable resilient messaging in the event that a client device is disconnected from the main network.

Because of the increased network traffic for this overhead, it's not advised to use this if you are duty cycle limited for your airtime usage nor is it advised to use this for SF12 (Long range but Slow).

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| store_forward_plugin_enabled | `true`, `false` | `false` |
| store_forward_plugin_records | integer | `0` |

### store_forward_plugin_enabled

Enables the plugin.

### store_forward_plugin_records

<!--- TODO --->

## Details

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
