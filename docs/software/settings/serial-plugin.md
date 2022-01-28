---
id: serial-plugin
title: Serial Plugin Settings
sidebar_label: Serial Plugin
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Overview

This is a simple interface to send messages over the mesh network by sending strings over a serial port.

:::tip
Once plugin settings are changed, a **reset** is required for them to take effect.
:::

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| serialplugin_enabled | `true`, `false` | `false` |
| serialplugin_echo | `true`, `false` | `false` |
| serialplugin_mode | `integer` | `0` |
| serialplugin_rxd | `integer` | `0` |
| serialplugin_timeout | `integer` (seconds) | `0` |
| serialplugin_txd | `integer` | `0` |

### serialplugin_enabled

Enables the plugin.

### serialplugin_echo

<!--- TODO --->

### serialplugin_mode

<!--- TODO --->

### serialplugin_rxd

<!--- TODO --->

### serialplugin_timeout

<!--- TODO --->

### serialplugin_txd

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
