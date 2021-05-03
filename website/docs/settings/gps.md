---
id: gps
title: GPS Settings
sidebar_label: GPS
---
## Overview

GPS is provided by either the device or your paired phone. More than likely, you will want to keep GPS functionality operational. It is not required, but does assist in some of the time calculations at a bare minimum.

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| fixed_position | `true`, `false` | `false` |
| gps_attempt_time | `integer` (seconds) | `0` (see note) |
| gps_operation | `GpsOpUnset`, `GpsOpStationary`, `GpsOpMobile`, `GpsOpTimeOnly`, `GpsOpDisabled` | `GpsOpUnset` |
| gps_update_interval | `integer` (seconds) | `0` (see note) |
| location_share | `LocUnset`, `LocEnabled`, `LocDisabled` | `LocUnset` |
| position_broadcast_secs | `integer` (seconds) | 15 minutes |

:::note
On `gps_attempt_time` and `gps_update_interval` when you set these to `0` you are not disabling these features. The value `0` will be interpreted by the device as the default of **30 seconds**. If you wish to disable any GPS features, see below for more information.
:::

### fixed_position

If set, this node is at a fixed position. The device will generate GPS position updates at the regular interval, but use whatever the last lat/lon/alt it saved for the node. The lat/lon/alt can be set by an internal GPS or with the help of the app.

### gps_attempt_time

How long should we try to get our position during each gps_update_interval attempt? (in seconds) Or if zero, use the default of 30 seconds. If we don't get a new gps fix in that time, the gps will be put into sleep until the next gps_update_rate window.

That parameter `gps_attempt_time` makes the unit more forgiving for how long it wait for a gps update (gps fix) to take before giving up, every time it does a gps update (`gps_update_interval`).

### gps_operation

 How the GPS hardware in this unit is operated. Note: This is independent of how our location is shared with other devices. For that see LocationSharing.

### gps_update_interval

How often should we try to get GPS position (in seconds) when we are in GpsOpMobile mode? or zero for the default of once every 30 seconds or a very large value (maxint) to update only once at boot. |

The unit will look to update its gps location data, every `gps_update_interval` seconds.

### location_share

Determines whether location is shared with other nodes. See more details.

<!--- TODO determine `position_broadcast_secs` default value (is it 0 like the other two?)--->

### position_broadcast_secs

How often our position is sent to the mesh (but only if it has changed significantly).

The gps updates will be sent out every `position_broadcast_secs`, with either the actual gps location, or an empty location if no gps fix was achieved.


## Details
