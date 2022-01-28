---
id: external-notification-plugin
title: External Notification Plugin Settings
sidebar_label: External Notification Plugin
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Overview

The External Notification Plugin will allow you to connect a speaker, LED, or other device to notify you when a message has been received from the mesh network.

:::tip
Once plugin settings are changed, a **reset** is required for them to take effect.
:::

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| ext_notification_plugin_enabled | `true`, `false` | `false` |
| ext_notification_plugin_active | `true`, `false` | `false` |
| ext_notification_plugin_alert_bell | `true`, `false` | `false` |
| ext_notification_plugin_alert_message | `true`, `false` | `false` |
| ext_notification_plugin_output | `integer` | `0` |
| ext_notification_plugin_output_ms | `integer` (milliseconds) | `0` |

### ext_notification_plugin_enabled

Enables the plugin.

### ext_notification_plugin_active

Specifies whether the external circuit is triggered when the device's GPIO is low or high.

### ext_notification_plugin_alert_bell

Specifies if an alert should be sent when receiving an incoming bell.

### ext_notification_plugin_alert_message

Specifies if an alert should be sent when receiving an incoming message.

### ext_notification_plugin_output

Specifies the GPIO that your external circuit is attached to on the device.

### ext_notification_plugin_output_ms

Specifies how long in milliseconds you would like your external circuit triggered. Default is `1000`. (Because of the way that defaults are handled in the protobufs `0` is interpreted as `1000`)

## Details

<!--- TODO --->

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
