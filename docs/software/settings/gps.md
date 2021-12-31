---
id: gps
title: GPS Settings
sidebar_label: GPS
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
| position_broadcast_smart | `true`, `false` | `false` |

:::note
On `gps_attempt_time`, `gps_update_interval`, & `position_broadcast_secs` when you set these to `0` you are not disabling these features.

On `gps_attempt_time` and `gps_update_interval`, the value `0` will be interpreted by the device as the default of **30 seconds**. On `position_broadcast_secs` the value `0` will be interpreted as the default of **15 minutes**.

If you wish to disable any GPS features, see below for more information.
:::

### fixed_position

If set, this node is at a fixed position. The device will generate GPS updates at the regular `gps_update_interval`, but use whatever the last lat/lon/alt it saved for the node. The lat/lon/alt can be set by an internal GPS or with the help of the mobile device's GPS.

### gps_attempt_time

Determines the amount of time that a GPS fix should be allowed to take. The default is every 30 seconds. If you increase this value, it will allow the device that amount of time in seconds to acquire coordinates. If the device is unable to get a fix, it will turn off until the next interval. GPS coordinates are updated every [`gps_update_interval`](#gps_update_interval) seconds.

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

Determines how often should the device should attempt to acquire a GPS position (in seconds). The length of time the device is allowed to attempt to acquire GPS coordinates each interval is set using [`gps_attempt_time`](#gps_attempt_time). The default is every 30 seconds.

### location_share

Determines whether location is shared with other nodes. See more details.

| Value | Description |
| :---: | :---------: |
| LocUnset | **Default**: operates the same as `LocEnabled`|
| LocEnabled | The device is sharing its location (or the paired phone's location) |
| LocDisabled | The device is not sharing its location (if the unit has a GPS it will default to only get time - i.e. [`GpsOpTimeOnly`](#gps_operation)) |

### position_broadcast_secs

How often our position is sent to the mesh (but only if it has changed significantly).

The GPS updates will be sent out every `position_broadcast_secs`, with either the actual GPS location, or an empty location if no GPS fix was achieved. This defaults to broadcast every 15 minutes.

### position_broadcast_smart

`position_broadcast_smart` will send out your position at an increased frequency only if your location has changed enough for a position update to be useful.

Complements `position_broadcast_secs` (doesn't override that setting) but will apply an algorithm to more frequently update your mesh network if you are in motion and then throttle it down when you are standing still. If you use this feature, it's best to leave `position_broadcast_secs` at the default.

`position_broadcast_smart` will calculate an ideal position update interval based on the data rate of your selected channel configuration. 

As an example, if you configure your radio to use **Long Range / Fast**, if you have traveled at least 144 meters and it's been at least 61 seconds since the last position update, a new position broadcast will be sent out. If you've moved less than 144 meters, we will broadcast the position based on the value of `position_broadcast_secs`.

The table below is a summary computed values from the algorithm.

| Long Name | Update every x-seconds | Update distance traveled (meters) |
| :---: | :---------: | :---------: |
| Long Range / Slow | 88 | 150 |
| Long Range / Fast | 61 | 144 |
| Medium Range / Slow | 30 | 41 |
| Medium Range / Fast | 30 | 30 |
| Short Range / Slow | 30 | 30 |
| Short Range / Fast | 30 | 30 |

Note: A person walking in a straight line will take about 90 seconds to travel 150 meters. That walking speed estimate was used as the baseline for the formula used.

## Examples

### Disable GPS Completely
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Disable GPS Completely"
  meshtastic --set gps_operation GpsOpDisabled
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

:::note
`gps_operation GpsOpTimeOnly` is preferred to `gps_operation GpsOPDisabled` because it allows the device to get a hi-res time.
:::

### Disable Location Sharing
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Disable Location Sharing"
  meshtastic --set location_share LocDisabled
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

:::note
Disabling location sharing does not disable the GPS functionality, only the location sharing via the mesh.
:::

### Set Fixed Position – Current Lat/Lon
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Set Fixed Position"
  meshtastic --set fixed_position true
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

:::note
The device will continue to acquire GPS coordinates according to the `gps_update_interval`, but will use the last saved coordinates as its fixed point.
:::

### Set Fixed Position – Specify Lat/Lon
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Set Fixed Position"
  meshtastic --setlat 37.8651 --setlon -119.5383
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

### Unset Fixed Position
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Unset Fixed Position"
  meshtastic --set fixed_position false
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

:::note
It may take some time to see that the change has taken effect. The GPS location is updated according to the value specified on `gps_update_interval` and the mesh will be notified of the new position in relation to the `position_broadcast_secs` value.
:::
