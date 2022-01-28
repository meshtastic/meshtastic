---
id: external-notification-plugin
title: External Notification Plugin Settings
sidebar_label: External Notification Plugin
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--- TODO add link to hardware setup to admonition--->
:::note
This plugin requires attaching a peripheral accessory to your device. It will not work without one.
:::

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

### Enable/Disable the plugin
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

```bash title="Enable Plugin"
meshtastic --set ext_notification_plugin_enabled true
```
```bash title="Disable Plugin"
meshtastic --set ext_notification_plugin_enabled false
```
  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>

### Specify GPIO for circuit to monitor
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

:::note
Replace `GPIO` in the below command with the GPIO number your circuit is attached to.
:::

```bash title="Specify GPIO that circuit is connected to"
meshtastic --set ext_notification_plugin_output GPIO
```
  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>


### Specify High/Low GPIO triggers circuit
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

```bash title="GPIO active high"
meshtastic --set ext_notification_plugin_active true
```
```bash title="GPIO active low (default)"
meshtastic --set ext_notification_plugin_active false
```
  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>


### Specify how many milliseconds to trigger circuit
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

```bash title="Set to default (1000ms)"
meshtastic --set ext_notification_plugin_output_ms 0
```
```bash title="Set to other value"
meshtastic --set ext_notification_plugin_output_ms 1500
```
  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>


### Enable/Disable alert on incoming bell
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

```bash title="Enable alert on incoming bell"
meshtastic --set ext_notification_plugin_alert_bell true
```
```bash title="Disable alert on incoming bell"
meshtastic --set ext_notification_plugin_alert_bell false
```
  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>


### Enable/Disable Alert on incoming message
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

```bash title="Enable alert on incoming message"
meshtastic --set ext_notification_plugin_alert_message true
```
```bash title="Disable alert on incoming message"
meshtastic --set ext_notification_plugin_alert_message false
```
  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>
