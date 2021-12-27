---
id: power
title: Power Settings
sidebar_label: Power
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

Power settings on a Meshtastic device can be set like other user-define settings with the `--set` command see ([see Meshtastic-python](../python/python-usage)). Some of these options are implicit in other commands. For example, when you set the device to router mode using `is_router true`, it is implied that deep sleep is disabled and we want to constantly listen for messages. Below is a list of all user-definable settings and the acceptable values that these settings can use.

For example, if we wanted to disable sleep mode, like when we put the device into router mode, we could use the command:

```bash
meshtastic --set mesh_sds_timeout_secs 4294967295
```
:::note
See MAXUINT from `mesh_sds_timeout_secs` below:
:::

For a description and more information on what exactly all of these mean, please refer to [Power Management State Machine](../other/power)

## Settings

|        Setting        |                                                                        Acceptable Values                                                                        |    Default     |
| :-------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    charge_current     | `MAUnset`, `MA100`, `MA190`, `MA280`, `MA360`, `MA450`, `MA550`, `MA630`, `MA700`, `MA780`, `MA880`, `MA960`, `MA1000`, `MA1080`, `MA1160`, `MA1240`, `MA1320`: |   `MAUnset`    |
|     is_low_power      |                                                                         `true`, `false`                                                                         |    `false`     | If set, we are powered from a low-current source (i.e. solar), so even if it looks like we have power flowing in we should try to minimize power consumption as much as possible. YOU DO NOT NEED TO SET THIS IF YOU'VE set is_router (it is implied in that case). |
|       is_router       |                                                                         `true`, `false`                                                                         |    `false`     |
|        ls_secs        |                                                                       `integer` (seconds)                                                                       | `0` (see note) |
| mesh_sds_timeout_secs |                                                                       `integer` (seconds)                                                                       |      `0`       |
|     min_wake_secs     |                                                                       `integer` (seconds)                                                                       |      `0`       |
| phone_sds_timeout_sec |                                                                       `integer` (seconds)                                                                       |      `0`       | Power management state machine option. See the [power page](../other/power) for details. 0 for default of two hours, use the value of MAXUINT or 4294967295 to disable                                                                                                                           |
|  phone_timeout_secs   |                                                                       `integer` (seconds)                                                                       |      `0`       |
|    screen_on_secs     |                                                                       `integer` (seconds)                                                                       |      `0`       |
|       sds_secs        |                                                                       `integer` (seconds)                                                                       |      `0`       |
|  send_owner_interval  |                                                             `integer` (sent every x network pings)                                                              |      `4`       |
|  wait_bluetooth_secs  |                                                                       `integer` (seconds)                                                                       |      `0`       |

:::note
When you the following settings to `0` they assume the following defaults:

- `ls_secs`: 1 hour
- `mesh_sds_timeout_secs`: 2 hours
- `min_wake_secs`: 10 seconds
- `phone_sds_timeout_sec`: 2 hours
- `phone_timeout_secs`: 15 minutes
- `screen_on_secs`: 1 minute
- `sds_secs`: 1 year
- `wait_bluetooth_secs`: 1 minute
  :::

### charge_current

Sets the current of the battery charger

### is_low_power

If set, we are powered from a low-current source (i.e. solar), so even if it looks like we have power flowing in we should try to minimize power consumption as much as possible. YOU DO NOT NEED TO SET THIS IF YOU'VE set is_router (it is implied in that case).

### is_router

Are we operating as a router. Changes behavior in the following ways: The device will only sleep for critically low battery level (i.e. always tries to stay alive for the mesh) In the future routing decisions will preferentially route packets through nodes with this attribute (because assumed good line of sight)

### ls_secs

Power management state machine option. See the [power page](../other/power) for details. 0 for default of 3600

### mesh_sds_timeout_secs

Power management state machine option. See the [power page](../other/power) for details. 0 for default of two hours, use the MAXUINT or 4294967295 to disable

### min_wake_secs

Power management state machine option. See the [power page](../other/power)for details. 0 for default of 10 seconds

### phone_sds_timeout_sec

Power management state machine option. See the [power page](../other/power) for details. 0 for default of two hours, use the MAXUINT or 4294967295 to disable

### phone_timeout_secs

Power management state machine option. See the [power page](../other/power) for details. 0 for default of 15 minutes

### screen_on_secs

Power management state machine option. See the [power page](../other/power) for details. 0 for default of one minute.

### sds_secs

Power management state machine option. See the [power page](../other/power) for details. 0 for default of one year

### send_owner_interval

This sets how often to send the database of node owner information with other nodes in the mesh (per mesh network ping).

For instance the default interval of 4 will send the node owner information for every 4 mesh network pings. This information is also transmitted after the node first boots up.

### wait_bluetooth_secs

Wait number of seconds for Bluetooth - Power management state machine option. See the [power page](../other/power) for details. 0 for default of 1 minute

### is_always_powered

If the device is plugged into the wall (not from battery), you may consider using this setting to always keep the device from sleeping. This is a useful setting if you are on ESP32 and using the Wifi options.

## Examples

<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
  {label: 'CLI', value: 'cli'},
  {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

```bash
meshtastic --set mesh_sds_timeout_secs 0
```

Note: Probably only want to set the wait_bluetooth_secs this high during testing:
```bash
meshtastic --set wait_bluetooth_secs 28800
```

```bash
meshtastic --set is_always_powered true
```

  </TabItem>
  <TabItem value="android">

    TODO

  </TabItem>
</Tabs>
