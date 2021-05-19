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
| id |  |  |
| modem_config | `Bw125Cr45Sf128`, `Bw500Cr45Sf128`, `Bw31_25Cr48Sf512`, `Bw125Cr48Sf4096` | TODO |
| name |  |  |
| psk | `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` | `1` |
| region | `Unset`, `US`, `EU433`, `EU865`, `CN`, `JP`, `ANZ`, `KR`, `TW`, `RU` | `Unset` |
| uplink_enabled | `true`, `false` | `false` |

### downlink_enabled

If `true`, messages seen on the internet will be forwarded to the local mesh through a gateway node. See [MQTT settings](mqtt) for more details.

:::caution
This is in active development and not ready for casual users. Testing only.
:::

### id

TODO

### modem_config

| Setting | Name | Bandwidth | Coding Rate | Spread Factor | Speed |
| :-----: | :--: | :-------: | :---------: | :-----------: | :-----: |
| `Bw125Cr45Sf128` | Medium | 125 kHz | 4/5 | 7 = 128chips/symbol | 5.469 kbps |
| `Bw500Cr45Sf128` | ShortFast | 500 kHz | 4/5 | 7 = 128chips/symbol | 21.875 kbps |
| `Bw31_25Cr48Sf512` | LongAlt | 31.25 kHz | 4/8 | 9 = 512chips/symbol | 275 bps |
| `Bw125Cr48Sf4096` | LongSlow | 125 kHz | 4/8 | 12 = 4096chips/symbol | 183 bps |

### name

TODO

### psk

<!--- TODO pick which psk description to keep --->

<!--- option A as documented in the protobufs --->

| Setting | Behavior |
| :-----: | :------: |
| `0` | Disable Encryption |
| `1` | Default Encryption |
| `2`-`10` | Default Encryption, except with 1-9 added to the last byte |

<!--- option B as documented in the python library --->

| Setting | Behavior |
| :-----: | :------: |
| `none` | Disable Encryption |
| `default` | Default Encryption |
| `random` | TODO |

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

### Uplink Enabled

If `true`, messages on the mesh will be sent to the public internet by any gateway node. See [MQTT settings](mqtt) for more details.

## Examples

### Set Region
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Set Region"
  meshtastic --set region Unset
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>
