---
id: channel-advanced
title: Channel Settings - Advanced
sidebar_label: Channel
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution
These settings are for advanced users only. If you don't know what you are doing you could damage your radio or break local radio laws. Proceed with caution.
:::

## Overview

Most

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| bandwidth |  |  |
| channel_num |  |  |
| coding_rate |  |  |
| spread_factor | `7`, `8`, `9`, `10`, `11`, `12` | TODO |
| tx_power | `integer` (in dBm) | `0` |

### bandwidth

TODO

### channel_num

TODO

### coding_rate

TODO

### spread_factor

TODO

### tx_power

TODO

## Examples

### Set Bandwidth

<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

```bash
meshtastic --ch-set bandwidth 125 --ch-index 0
```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

### Set Channel Number

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

### Set Coding Rate

<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

```bash
meshtastic --ch-set coding_rate 8 --ch-index 0
```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

### Set Spread Factor

<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

```bash
meshtastic --ch-set spread_factor 12 --ch-index 0
```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

### Set TX Power

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
