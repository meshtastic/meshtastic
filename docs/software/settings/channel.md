---
id: channel
title: Channel Settings
sidebar_label: Channel
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

Channel settings are an integral part of the way your devices communicate across the mesh. If you have mismatched channel settings, your radios will be unable to communicate with one another.

## Settings

<!--- TODO add other channel settings --->

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| downlink_enabled | `true`, `false` | `false` |
| id | `integer` | `0` |
| modem_config | `Bw125Cr45Sf128`, `Bw500Cr45Sf128`, `Bw31_25Cr48Sf512`, `Bw125Cr48Sf4096` | TODO |
| name | `string` | `""` |
| psk | `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `none`, `default`, `random` | `1` |
| region | `Unset`, `US`, `EU433`, `EU865`, `CN`, `JP`, `ANZ`, `KR`, `TW`, `RU` | `Unset` |
| uplink_enabled | `true`, `false` | `false` |

### downlink_enabled

If `true`, messages seen on the internet will be forwarded to the local mesh through a gateway node. See [MQTT settings](mqtt) for more details.

:::caution
This is in active development and not ready for casual users. Testing only.
:::

### id

<!--- Used to construct a globally unique channel ID. The full globally unique ID will be: "name.id" where ID is shown as base36. Assuming that the number of meshtastic users is below 20K (true for a long time) the chance of this 64 bit random number colliding with anyone else is super low. And the penalty for collision is low as well, it just means that anyone trying to decrypt channel messages might need to try multiple candidate channels. Any time a non wire compatible change is made to a channel, this field should be regenerated. There are a small number of 'special' globally known (and fairly) insecure standard channels. Those channels do not have a numeric id included in the settings, but instead it is pulled from a table of well known IDs. (see Well Known Channels FIXME) --->

### modem_config

| Setting | Name | Bandwidth | Coding Rate | Spread Factor | Speed |
| :-----: | :--: | :-------: | :---------: | :-----------: | :-----: |
| `Bw125Cr45Sf128` | ShortSlow | 125 kHz | 4/5 | 7 = 128chips/symbol | 5.469 kbps |
| `Bw500Cr45Sf128` | ShortFast | 500 kHz | 4/5 | 7 = 128chips/symbol | 21.875 kbps |
| `Bw31_25Cr48Sf512` | LongFast | 31.25 kHz | 4/8 | 9 = 512chips/symbol | 275 bps |
| `Bw125Cr48Sf4096` | LongSlow | 125 kHz | 4/8 | 12 = 4096chips/symbol | 183 bps |

### name

The name of the channel. If this is left an empty string it is assumed that this channel is the special (minimally secure) "Default" channel. Channel Names should be short (less than 12 bytes).

### psk

<!--- TODO pick which psk description to keep --->

<!--- option A as documented in the protobufs --->

<!--- A simple pre-shared key for now for crypto. Must be either 0 bytes (no crypto), 16 bytes (AES128), or 32 bytes (AES256). A special shorthand is used for 1 byte long psks. These psks should be treated as only minimally secure, because they are listed in this source code. Those bytes are mapped using the following scheme: 0 = No crypto 1 = The special "default" channel key: {0xd4, 0xf1, 0xbb, 0x3a, 0x20, 0x29, 0x07, 0x59, 0xf0, 0xbc, 0xff, 0xab, 0xcf, 0x4e, 0x69, 0xbf} 2 through 10 = The default channel key, except with 1 through 9 added to the last byte. Shown to user as simple1 through 10 --->

:::note
Selecting a number from the following table will use publicly known encryption keys. They're shipped with Meshtastic source code and thus, anyone can listen to messages encrypted by them. They're great for testing and public channels.
:::

| Setting | Behavior |
| :-----: | :------: |
| `0` | Disable Encryption |
| `1` | Default Encryption |
| `2`-`10` | Default Encryption, except with 1-9 added to the last byte |

<!--- option B as documented in the python library --->

<!--- Use "--setchan psk none" to turn off encryption. Use "--setchan psk random" will assign a new (high quality) random AES256 key to the primary channel (similar to what the Android app does when making new channels). Use "--setchan psk default" to restore the standard 'default' (minimally secure, because it is in the source code for anyone to read) AES128 key. --->

| Setting | Behavior |
| :-----: | :------: |
| `none` | Disable Encryption |
| `default` | Default Encryption (use the weak encryption key) |
| `random` | Generate a secure 256-bit encryption key. Use this setting for private communication. |

:::tip
If you use Meshtastic for exchanging messages you don't want other people to see, `random` is the setting you should use.
:::

### region

The `region` variable sets which region your radio is configured to work in. It is important to ensure that you've set it to the correct region. If left `Unset`, it will default to `US` settings.

| Name | Center Frequency | Spacing | Number of Channels | Power Limit |
| :--: | :-------: | :-----: | :----------------: | :---------: |
| US | 903.08 | 2.16 | 13 | 0 |
| EU433 | 433.175 | 0.2 | 8 | 0 |
| EU865 | 865.2 | 0.3 | 10 | 0 |
| CN | 470.0 | 2.0 | 20 | 0 |
| JP | 920.0 | 0.5 | 10 | 13 |
| ANZ | 916.0 | 0.5 | 20 | 0 |
| KR | 921.9 | 0.2 | 8 | 0 |
| TW | 923.0 | 0.2 | 10 | 0 |
| RU | 868.9 | 0.2 | 2 | 20 |
| Unset | 903.08 | 2.16 | 13 | 0 |
:::note
For more details about `region` settings, you can see the source code [here](https://github.com/meshtastic/Meshtastic-device/blob/master/src/mesh/RadioInterface.cpp)
:::

### uplink_enabled

If `true`, messages on the mesh will be sent to the public internet by any gateway node. See [MQTT settings](mqtt) for more details.

## Examples

### Set Channel ID
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

  ```bash title="Set the PRIMARY channel ID"
  meshtastic --ch-set id 1234 --ch-index 0
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

:::note
The channel `id` must be an integer.
:::

### Set Channel Name
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

  ```bash title="Set channel name for the PRIMARY channel"
  meshtastic --ch-set name MyChannel --ch-index 0
  ```

  ```bash title="Set channel name for the PRIMARY channel with spaces"
  meshtastic --ch-set name "My Channel" --ch-index 0
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

:::note
A channel `id` must be set in order to name a channel.
:::

### Set/Disable Encryption
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

  ```bash title="Set encryptions to default on PRIMARY channel"
  meshtastic --ch-set psk default --ch-index 0
  ```
  ```bash title="Set encryptions to random on PRIMARY channel"
  meshtastic --ch-set psk random --ch-index 0
  ```
  ```bash title="Set encryptions to default on PRIMARY channel"
  meshtastic --ch-set psk none --ch-index 0
  ```
<!--- TODO random and none --->

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

  </TabItem></Tabs>

:::note
See [`psk`](#psk) for details.
:::

### Set Modem
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

  ```bash title="Set Modem - LongSlow"
  meshtastic --ch-set modem_config Bw125Cr48Sf4096 --ch-index 0
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

:::note
See [`modem_config`](#modem_config) for details. For advanced modem configuration, see [Channel Settings - Advanced](channel-advanced).
:::

### Set Region
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

  ```bash title="Unset Region"
  meshtastic --set region Unset
  ```
  ```bash title="Set Region"
  meshtastic --set region US
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

<!--- TODO add downlink_enabled & uplink_enabled examples --->
