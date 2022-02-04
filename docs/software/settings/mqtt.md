---
id: mqtt
title: MQTT Settings
sidebar_label: MQTT
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note
This is still under development, use at your own risk. Report any bugs you see by creating an issue on the [meshtastic/Meshtastic-device](https://github.com/meshtastic/Meshtastic-device) repository or comment on our forum.
:::

:::caution
You may want to change your [GPS location sharing settings](gps#location_share) if you are enabling this. It will broadcast your location over the internet.
:::

## Overview

If your device is connected to WiFi you can enable it to forward messages along to an MQTT server. This allows users on the local mesh to communicate with users on the internet.

Be sure to checkout this [MQTT](https://meshtastic.org/docs/software/other/mqtt) too.

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| downlink_enabled | `true`, `false` | `false` |
| mqtt_disabled | `true`, `false` | `false` |
| mqtt_encryption_enabled | `true`, `false` | `false` |
| mqtt_password | `string` | `""` |
| mqtt_server | `string` | `""` |
| mqtt_username | `string` | `""` |
| uplink_enabled | `true`, `false` | `false` |

### downlink_enabled

This is a channel specific setting. If your channel has this set to `true` and you are connected to WiFi, the device will forward along messages from the MQTT server specified [here](#mqtt_server) to the mesh from this device.

### mqtt_disabled

If a meshtastic node is able to reach the internet it will normally attempt to gateway any channels that are marked as `uplink_enabled` or `downlink_enabled`. But if this flag is set, all MQTT features will be disabled and no servers will be contacted.

#### Enable/Disable MQTT
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

  ```bash title="Enable MQTT (Default)"
  meshtastic --set mqtt_disabled false
  ```
  ```bash title="Disable MQTT"
  meshtastic --set mqtt_disabled true
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

### mqtt_encryption_enabled

Determines whether or not the device sends the packets encrypted to/from your MQTT server.

:::tip
If you are using the default Meshtastic MQTT server, this setting will take no effect. All packets will continue to be encrypted regardless of this setting. Only custom servers will honor this setting.
:::

#### Enable/Disable MQTT Encryption
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

  ```bash title="Enable MQTT Encryption (Default)"
  meshtastic --set mqtt_encryption_enabled false
  ```
  ```bash title="Disable MQTT Encryption"
  meshtastic --set mqtt_encryption_enabled true
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

### mqtt_password

MQTT password to use (most useful for a custom MQTT server). If using a custom server, this will be honoured even if empty. If using the default server, this will only be honoured if set, otherwise the device will use the default password (TODO - find default password).

### mqtt_server

The server to use for our MQTT global message gateway feature. If not set, the default server will be used

#### Enable/Disable MQTT Server
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

:::tip
When the mqtt_server is set to `""`, it will default to `mqtt.meshtastic.org`
:::

  ```bash title="Enable MQTT Server - Public Meshtastic MQTT Server (Default)"
  meshtastic --set mqtt_server ""
  ```
  ```bash title="Enable MQTT Server - Personal MQTT Server (by IP)"
  meshtastic --set mqtt_server 198.168.0.2
  ```
  ```bash title="Enable MQTT Server - Personal MQTT Server (by URL)"
  meshtastic --set mqtt_server mqtt.mydomain.com
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

### mqtt_username

MQTT username to use (most useful for a custom MQTT server). If using a custom server, this will be honoured even if empty. If using the default server, this will only be honoured if set, otherwise the device will use the default username (TODO - find default username).

### uplink_enabled

This is a channel specific setting. If your channel has this set to `true` and you are connected to WiFi, the device will forward along messages to whatever MQTT server is specified in [mqtt_server](#mqtt_server).

## Details

<!--- TODO --->

## Examples

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

```bash title="Set server"
meshtastic --set mqtt_server 192.168.123.234
```

```bash title="Enable MQTT server to mesh"
meshtastic --ch-set uplink_enabled true --ch-set downlink_enabled true --ch-index 0
```

```bash title="View raw encoded messages using mosquitto"
mosquitto_sub -h 192.168.123.234 -v -t msh/#
```

:::note
FIXME some documentation says msh/# , some says mesh/# . As of 1.2.39 the messages are on msh/#
:::
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
