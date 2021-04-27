---
id: mqtt
title: MQTT Settings
sidebar_label: MQTT
---

## Overview



## Settings

| Setting | Acceptable Values | Default | Description |
| :-----: | :---------------: | :-----: | :---------: |
| mqtt_disabled | `true`, `false` | `true` | If a meshtastic node is able to reach the internet it will normally attempt to gateway any channels that are marked as is_uplink_enabled or is_downlink_enabled. But if this flag is set, all MQTT features will be disabled and no servers will be contacted. |
| mqtt_server | `string` | `""` | The server to use for our MQTT global message gateway feature. If not set, the default server will be used |

## Details
