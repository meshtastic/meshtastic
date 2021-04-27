---
id: power
title: Power Settings
sidebar_label: Power
---

## Overview



## Settings

| Setting | Acceptable Values | Default | Description |
| :-----: | :---------------: | :-----: | :---------: |
| charge_current | `MAUnset`, `MA100`, `MA190`, `MA280`, `MA360`, `MA450`, `MA550`, `MA630`, `MA700`, `MA780`, `MA880`, `MA960`, `MA1000`, `MA1080`, `MA1160`, `MA1240`, `MA1320` |  | Sets the current of the battery charger |
| is_low_power | `true`, `false` | `false` | If set, we are powered from a low-current source (i.e. solar), so even if it looks like we have power flowing in we should try to minimize power consumption as much as possible. YOU DO NOT NEED TO SET THIS IF YOU'VE set is_router (it is implied in that case). |
| is_router | `true`, `false` | `false` | Are we operating as a router. Changes behavior in the following ways: The device will only sleep for critically low battery level (i.e. always tries to stay alive for the mesh) In the future routing decisions will preferentially route packets through nodes with this attribute (because assumed good line of sight) |
| ls_secs | `integer` (seconds) | `0` | Power management state machine option. See https://github.com/meshtastic/Meshtastic-device/blob/master/docs/software/power.mdfor details. 0 for default of 3600 |
| mesh_sds_timeout_secs | `integer` (seconds) | `0` | Power management state machine option. See https://github.com/meshtastic/Meshtastic-device/blob/master/docs/software/power.mdfor details. 0 for default of two hours, MAXUINT for disabled |
| min_wake_secs | `integer` (seconds) | `0` | Power management state machine option. See https://github.com/meshtastic/Meshtastic-device/blob/master/docs/software/power.mdfor details. 0 for default of 10 seconds |
| phone_sds_timeout_sec | `integer` (seconds) | `0` | Power management state machine option. See https://github.com/meshtastic/Meshtastic-device/blob/master/docs/software/power.mdfor details. 0 for default of two hours, MAXUINT for disabled |
| phone_timeout_secs | `integer` (seconds) | `0` | Power management state machine option. See https://github.com/meshtastic/Meshtastic-device/blob/master/docs/software/power.mdfor details. 0 for default of 15 minutes |
| screen_on_secs | `integer` (seconds) | `0` | Power management state machine option. See https://github.com/meshtastic/Meshtastic-device/blob/master/docs/software/power.mdfor details. 0 for default of one minute |
| sds_secs | `integer` (seconds) | `0` | Power management state machine option. See https://github.com/meshtastic/Meshtastic-device/blob/master/docs/software/power.mdfor details. 0 for default of one year |
| send_owner_interval | `integer` (seconds) | `0` | Send our owner info at least this often (also we always send once at boot - to rejoin the mesh) |
| wait_bluetooth_secs | `integer` (seconds) | `0` | Power management state machine option. See https://github.com/meshtastic/Meshtastic-device/blob/master/docs/software/power.mdfor details. 0 for default of 1 minute |

## Details
