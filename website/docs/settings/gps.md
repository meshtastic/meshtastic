---
id: gps
title: GPS Settings
sidebar_label: GPS
---
:::caution
Altering/disabling the GPS functionality does not mean that you will be unable to be found. Via triangulation of your radio, location may be given up to someone if they are determined enough.
:::

## Overview

GPS is provided by either the device or your paired phone. More than likely, you will want to keep GPS functionality operational. It is not required, but does assist in some of the time calculations at a bare minimum.

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| fixed_position | `true`, `false` | `false` |
| gps_attempt_time | `integer` (seconds) | `0` (see note) |
| gps_operation | `GpsOpUnset`, ~~`GpsOpStationary`~~, `GpsOpMobile`, `GpsOpTimeOnly`, `GpsOpDisabled` | `GpsOpUnset` |
| gps_update_interval | `integer` (seconds) | `0` (see note) |
| location_share | `LocUnset`, `LocEnabled`, `LocDisabled` | `LocUnset` |
| position_broadcast_secs | `integer` (seconds) | `0` (see note) |

:::note
On `gps_attempt_time`, `gps_update_interval`, & `position_broadcast_secs` when you set these to `0` you are not disabling these features.

On `gps_attempt_time` and `gps_update_interval`, the value `0` will be interpreted by the device as the default of **30 seconds**. On `position_broadcast_secs` the value `0` will be interpreted as the default of **15 minutes**.

If you wish to disable any GPS features, see below for more information.
:::

### fixed_position

If set, this node is at a fixed position. The device will generate GPS position updates at the regular `gps_update_interval`, but use whatever the last lat/lon/alt it saved for the node. The lat/lon/alt can be set by an internal GPS or with the help of the mobile device's GPS.

### gps_attempt_time

Determines the amount of time that a GPS fix should be allowed to take. The default is every 30 seconds. If you increase this value, it will allow the device that amount of time in seconds to aquire coordinates. If the device is unable to get a fix, it will turn off until the next interval. GPS coordinates are updated every [`gps_update_interval`](#gps_update_interval) seconds.

### gps_operation

How the GPS hardware in the device is operated.

:::note
This is independent of how our location is shared with other devices. For that see [`location_share`](#location_share).
:::

| Value | Description |
| :---: | :---------: |
| GpsOpUnset | **Default**: operates the same as `GpsOpMobile`. |
| ~~GpsOpStationary~~ | Note: This mode was removed, because it is identical go `GpsOpMobile` with a `gps_update_interval` of once per day This node is mostly stationary, we should try to get location only once per day, Once we have that position we should turn the GPS to sleep mode This is the recommended configuration for stationary 'router' nodes |
| GpsOpMobile | This node is mobile and we should get GPS position at a rate governed by `gps_update_interval` |
| GpsOpTimeOnly | We should only use the GPS to get time (no location data should be acquired/stored) Once we have the time we treat `gps_update_interval` as MAXINT (i.e. sleep forever) |
| GpsOpDisabled | GPS is always turned off - this mode is not recommended - use `GpsOpTimeOnly` instead. |

### gps_update_interval

Determines how often should the device should attempt to aquire a GPS position (in seconds). The length of time the device is allowed to attempt to aquire GPS coordinates each interval is set using [`gps_attempt_time`](#gps_attempt_time). The default is every 30 seconds.

### location_share

Determines whether location is shared with other nodes. See more details.
| Value | Description |
| :---: | :---------: |
| LocUnset | **Default**: operates the same as `LocEnabled`|
| LocEnabled | The device is sharing its location (or the paired phone's location) |
| LocDisabled | The device is not sharing its location (if the unit has a GPS it will default to only get time - i.e. [`GpsOpTimeOnly`](#gps_operation)) |

### position_broadcast_secs

How often our position is sent to the mesh (but only if it has changed significantly).

The gps updates will be sent out every `position_broadcast_secs`, with either the actual gps location, or an empty location if no gps fix was achieved. This defaults to broadcast every 15 minutes.

## Details

### CLI Examples

```bash title="Disable Location Sharing"
meshtastic --set location_share LocDisabled
```
:::note
Disabling location sharing does not disable the GPS functionality, only the location sharing via the mesh.
:::

```bash title="Disable GPS Completely"
meshtastic --set gps_operation GpsOpDisabled
```
:::note
`gps_operation GpsOpTimeOnly` is prefered to `gps_operation GpsOPDisabled` because it allows the device to get a highres time.
:::
