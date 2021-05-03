---
id: misc
title: Miscellaneous Settings
sidebar_label: Miscellaneous
---

## Overview



## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| debug_log_enabled | `true`, `false` | `false` |
| factory_reset | `true`, `false` | `false` |
| frequency_offset | real numbers | `0` |
| ignore_incoming | `string` – list of node nums to ignore | `0` |
| serial_disabled | `true`, `false` | `false` |

### debug_log_enabled

By default we turn off logging as soon as an API client connects (to keep shared serial link quiet). Set this to true to leave the debug log outputting even when API is active.

### factory_reset

This setting is never saved to disk, but if set, all device settings will be returned to factory defaults. (Region, serial number etc... will be preserved)

### frequency_offset

This parameter is for advanced users with advanced test equipment, we do not recommend most users use it. A frequency offset that is added to to the calculated band center frequency. Used to correct for crystal calibration errors.

### ignore_incoming

If true, radio should not try to be smart about what packets to queue to the phone bool keep_all_packets = 101; If true, we will try to capture all the packets sent on the mesh, not just the ones destined to our node. bool promiscuous_mode = 102; For testing it is useful sometimes to force a node to never listen to particular other nodes (simulating radio out of range). All nodenums listed in ignore_incoming will have packets they send dropped on receive (by router.cpp)

### serial_disabled

If set, this will disable the SerialConsole by not initilizing the StreamAPI.

## Details
