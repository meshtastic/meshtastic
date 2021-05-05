---
id: channel
title: Channel Settings
sidebar_label: Channel
---

## Overview

Channel settings are an integral part of the way your devices communicate across the mesh. If you have mismatched channel settings, your radios will be unable to communicate with one another.

## Settings

<!--- TODO add other channel settings --->

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| region | `Unset`, `US`, `EU433`, `EU865`, `CN`, `JP`, `ANZ`, `KR`, `TW`, `RU` | `Unset` |

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

## Details

### CLI Examples
```bash title="Set Region"
meshtastic --set region Unset
```
