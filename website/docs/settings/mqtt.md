---
id: mqtt
title: MQTT Settings
sidebar_label: MQTT
---

## Overview



## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| mqtt_disabled | `true`, `false` | `true` |
| mqtt_server | `string` | `""` |

### mqtt_disabled

If a meshtastic node is able to reach the internet it will normally attempt to gateway any channels that are marked as is_uplink_enabled or is_downlink_enabled. But if this flag is set, all MQTT features will be disabled and no servers will be contacted.
The server to use for our MQTT global message gateway feature. If not set, the default server will be used

### mqtt_server

The server to use for our MQTT global message gateway feature. If not set, the default server will be used

## Details

### CLI Examples
