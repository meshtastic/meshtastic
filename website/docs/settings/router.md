---
id: router
title: Router Settings
sidebar_label: Router
---

## Overview



## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| is_router | `true`, `false` | `false` |

### is_router

Are we operating as a router. Changes behavior in the following ways: The device will only sleep for critically low battery level (i.e. always tries to stay alive for the mesh) In the future routing decisions will preferentially route packets through nodes with this attribute (because assumed good line of sight)

## Details

Toggling `is_router` changes your device settings in the following ways.

| Setting | `is_router` Default | Normal Default |
| :-----: | :-----------------: | :------------: |
| `send_owner_interval` | 2 | 4 |
| `position_broadcast_secs` | 12 hours | 15 minutes |
| `wait_bluetooth_secs` | 1 | 60 |
| `mesh_sds_timeout_secs` | NODE_DELAY_FOREVER | 2 hours |
| `phone_sds_timeout_sec` | NODE_DELAY_FOREVER | 2 hours |
| `ls_secs` | 1 day | 5 minutes |

### Altered Behaviors
#### Screen Wake
#### Bluetooth

### CLI Examples
