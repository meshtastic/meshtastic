---
id: channel-advanced
title: Channel Settings - Advanced
sidebar_label: Channel
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning
These settings are for advanced users only. If you don't know what you are doing you could damage your radio or break local radio laws. Proceed with caution.
:::

## Overview

Most users should not need to change these settings. The default [modem_config](channel#modem_config) settings should work just fine.

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| bandwidth | `10.4`, `15.6`, `20.8`, `31.25`, `41.7`, `62.5`, `125`, `250`, `500` | `125` |
| channel_num | Depends on Region | Region Channel Number Default |
| coding_rate | `5`, `6`, `7`, `8` | `5` |
| frequency_offset | real numbers | `0` |
| spread_factor | `7`, `8`, `9`, `10`, `11`, `12` | `7` |
| tx_power | `0`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, (dBm) | `0` |

### bandwidth

Total amount of spectrum used for the transmission.

#### Set Bandwidth

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

```bash
meshtastic --ch-set bandwidth 125 --ch-index 0
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

### channel_num

An abstraction that maps to a specific center frequency used for transmission.

#### Set Channel Number

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

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
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

### coding_rate

The amount of forward error correction applied to allow for us to automatically repair errors in the data transmission.

#### Set Coding Rate

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

```bash
meshtastic --ch-set coding_rate 8 --ch-index 0
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

### frequency_offset

This parameter is for advanced users with advanced test equipment, we do not recommend most users use it. A frequency offset that is added to to the calculated band center frequency. Used to correct for crystal calibration errors.

#### Configure frequency_offset

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

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
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

### spread_factor

LoRa is a spread spectrum technology. spread_factor is how much the signal is spread over the spectrum. SF8 = 2^8 or spread 256 times. SF12 = 2^12 or spread 4096 times.

#### Set Spread Factor

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

```bash
meshtastic --ch-set spread_factor 12 --ch-index 0
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

### tx_power

Configured transmit power out of the LoRa radio, measured in dBM. Setting this to `0` will use the device default which is the max legal continuous power for your region.

:::caution
Ensure that you are not exceeding your country's regulations.

`Country regulation - antenna gain = tx_power max setting`
:::

#### Set TX Power

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

  ```bash title="Set Default"
  meshtastic --ch-set tx_power 0 --ch-index 0
  ```
  ```bash title="Set to 2dBM"
  meshtastic --ch-set tx_power 2 --ch-index 0
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
