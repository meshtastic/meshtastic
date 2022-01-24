---
id: ham
title: Licensed (HAM) Operation
sidebar_label: Licensed (HAM) Operation
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning
By changing these settings, you are self certifying that you are licensed to operate in the mode you have chosen. Failure to comply with your local regulations may result in fines.
:::

## Overview

:::note
This written US only, may or may not be applicable elsewhere.
:::

Meshtastic can be used by both unlicensed people and licensed operators. If you use Meshtastic with your ham radio license, there are additional privileges and restrictions to consider.

| Privileges | Restrictions |
|:----------:|:------------:|
| <ul><li>Additional Power</li><li>Higher gain antennas</li></ul> | <ul><li>Unencrypted</li><li>Identified with your ID</li></ul> |

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| set-ham | `string`| `""`|

### set-ham

If you are a licensed HAM operator, you can set this variable to be your ID.

## Details

Toggling `set-ham` changes your device settings in the following ways.

| Setting | `set-ham` Default | Normal Default |
| :-----: | :-----------------: | :------------: |
| `is_licensed` (Protobuf) | `true` | `false` |
| `long_name` (Protobuf) | `id` | User Defined |
| `psk` (Protobuf) | `""` | See [Channel Settings - psk](channel#psk) |
| `short_name` (Protobuf) | TODO | User Defined |

## Examples

:::warning
By changing these settings, you are self certifying that you are licensed to operate in the mode you have chosen. Failure to comply with your local regulations may result in fines.
:::

### Set HAM ID
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Set HAM ID"
  meshtastic --set-ham KI1345
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>
