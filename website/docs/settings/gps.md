---
id: gps
title: GPS Settings
sidebar_label: GPS
---
## Overview

GPS is provided by either the device or your paired phone. More than likely, you will want to keep GPS functionality operational. It is not required, but does assist in some of the time calculations at a bare minimum.

## Settings

<!-- TODO fix descriptions to user friendly ones --->
| Setting | Acceptable Values | Default | Description |
| :-----: | :---------------: | :-----: | :---------: |
| fixed_position | `true`, `false` | `false` | If set, this node is at a fixed position. We will generate GPS position updates at the regular interval, but use whatever the last lat/lon/alt we have for the node. The lat/lon/alt can be set by an internal GPS or with the help of the app. |
| gps_attempt_time | `integer` (seconds) | `0` (see note) | How long should we try to get our position during each gps_update_interval attempt? (in seconds) Or if zero, use the default of 30 seconds. If we don't get a new gps fix in that time, the gps will be put into sleep until the next gps_update_rate window. |
| gps_operation | `GpsOpUnset`, `GpsOpStationary`, `GpsOpMobile`, `GpsOpTimeOnly`, `GpsOpDisabled` | `GpsOpUnset` | How the GPS hardware in this unit is operated. Note: This is independent of how our location is shared with other devices. For that see LocationSharing |
| gps_update_interval | `integer` (seconds) | `0` (see note) | How often should we try to get GPS position (in seconds) when we are in GpsOpMobile mode? or zero for the default of once every 30 seconds or a very large value (maxint) to update only once at boot. |
| location_share | `LocUnset`, `LocEnabled`, `LocDisabled` | `LocUnset` | Determines whether location is shared with other nodes. See more details. |
| position_broadcast_secs | `integer` (seconds) | 15 minutes | How often our position is sent to the mesh (but only if it has changed significantly). |

:::note
On `gps_attempt_time` and `gps_update_interval` when you set these to `0` you are not disabling these features. The value `0` will be interpreted by the device as the default of **30 seconds**. If you wish to disable any GPS features, see below for more information.
:::

<!--- TODO determine `position_broadcast_secs` default value (is it 0 like the other two?)--->

## Details
<!--- TODO populate sections with applicable details and examples --->
### fixed_position
### gps_attempt_time
### gps_operation
### gps_update_interval
### location_share
### position_broadcast_secs
