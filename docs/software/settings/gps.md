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
| gps_accept_2d | `true`, `false` | `false` |
| gps_attempt_time | `integer` (seconds) | `0` (see note) |
| gps_format | `GpsFormatDec`, `GpsFormatDMS`, `GpsFormatUTM`, `GpsFormatMGRS`, `GpsFormatOLC`, `GpsFormatOSGR` | `GpsFormatDec` |
| gps_max_dop | `integer` | `0` |
| gps_operation | `GpsOpUnset`, ~~`GpsOpStationary`~~, `GpsOpMobile`, `GpsOpTimeOnly`, `GpsOpDisabled` | `GpsOpUnset` |
| gps_update_interval | `integer` (seconds) | `0` (see note) |
| location_share | `LocUnset`, `LocEnabled`, `LocDisabled` | `LocUnset` |
| position_broadcast_secs | `integer` (seconds) | `0` (see note) |
| position_broadcast_smart | `true`, `false` | `false` |
| position_flags | `POS_UNDEFINED`, `POS_ALTITUDE`, `POS_ALT_MSL`, `POS_GEO_SEP`, `POS_DOP`, `POS_HVDOP`, `PDOP`, `POS_BATTERY`, `POS_SATINVIEW`, `POS_SEQ_NOS`, `POS_TIMESTAMP` | `POS_UNDEFINED` |

:::note
On `gps_attempt_time`, `gps_update_interval`, & `position_broadcast_secs` when you set these to `0` you are not disabling these features.

On `gps_attempt_time` and `gps_update_interval`, the value `0` will be interpreted by the device as the default of **30 seconds**. On `position_broadcast_secs` the value `0` will be interpreted as the default of **15 minutes**.

If you wish to disable any GPS features, see below for more information.
:::

### fixed_position

If set, this node is at a fixed position. The device will generate GPS updates at the regular `gps_update_interval`, but use whatever the last lat/lon/alt it saved for the node. The lat/lon/alt can be set by an internal GPS or with the help of the mobile device's GPS.

#### Set/Unset Fixed Position
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

  ```bash title="Set Fixed Position - Current Location"
  meshtastic --set fixed_position true
  ```
:::note
The device will continue to acquire GPS coordinates according to the `gps_update_interval`, but will use the last saved coordinates as its fixed point.
:::
  ```bash title="Set Fixed Position - User Defined"
  meshtastic --setlat 37.8651 --setlon -119.5383
  ```
  ```bash title="Unset Fixed Position"
  meshtastic --set fixed_position false
  ```
:::note
It may take some time to see that the change has taken effect. The GPS location is updated according to the value specified on `gps_update_interval` and the mesh will be notified of the new position in relation to the `position_broadcast_secs` value.
:::
  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>

### gps_accept_2d

Determines whether the device should accept 2D GPS fixes. By default, only 3D fixes are accepted (during a 2D fix, altitude values are unreliable and will be excluded).

#### Enable/Disable 2D GPS Fixes
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

  ```bash title="Enable 2D GPS Fixes"
  meshtastic --set gps_accept_2d true
  ```
  ```bash title="Disable 2D GPS Fixes"
  meshtastic --set gps_accept_2d false
  ```

  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>

### gps_attempt_time

Determines the amount of time that a GPS fix should be allowed to take. The default is every 30 seconds. If you increase this value, it will allow the device that amount of time in seconds to acquire coordinates. If the device is unable to get a fix, it will turn off until the next interval. GPS coordinates are updated every [`gps_update_interval`](#gps_update_interval) seconds.

#### Change GPS attempt time frequency
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

  ```bash title="Set GPS attempt time to default (30 seconds)"
  meshtastic --set gps_attempt_time 0
  ```
  ```bash title="Set GPS attempt time to 45 seconds"
  meshtastic --set gps_attempt_time 45
  ```

  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>

### gps_format

Determines how the GPS coordinates are displayed on the OLED screen.

| Value | Description |
| :---: | :---------: |
| GpsFormatDec | GPS coordinates are displayed in the normal decimal degrees format: DD.DDDDDD DDD.DDDDDD |
| GpsFormatDMS | GPS coordinates are displayed in the degrees minutes seconds format: DD°MM'SS"C DDD°MM'SS"C, where C is the compass point representing the locations quadrant |
| GpsFormatUTM | GPS coordinates are displayed in Universal Transverse Mercator format: ZZB EEEEEE NNNNNNN, where Z is zone, B is band, E is easting, N is northing |
| GpsFormatMGRS | GPS coordinates are displayed in Military Grid Reference System format: ZZB CD EEEEE NNNNN, where Z is zone, B is band, C is the east 100k square, D is the north 100k square, E is easting, N is northing |
| GpsFormatOLC | GPS coordinates are displayed in Open Location Code (aka Plus Codes) |
| GpsFormatOSGR | GPS coordinates are displayed in Ordnance Survey Grid Reference (the National Grid System of the UK). Format: AB EEEEE NNNNN, where A is the east 100k square, B is the north 100k square, E is the easting, N is the northing |

#### Specify GPS Screen Display
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

  ```bash title="Specify GPS format on device screen"
  meshtastic --set gps_format GpsFormatUTM
  ```

  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>

### gps_max_dop

Determines GPS maximum DOP accepted (dilution of precision) Set a rejection threshold for GPS readings based on their precision, relative to the GPS rated accuracy (which is typically ~3m) Solutions above this value will be treated as retryable errors! Useful range is between 1 - 64 (3m - <~200m) By default (if zero), accept all GPS readings

#### Change maximum GPS dilution of precision
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

  ```bash title="Set GPS max DOP to default (accept all GPS readings)"
  meshtastic --set gps_max_dop 0
  ```
  ```bash title="Set GPS max DOP to 3m"
  meshtastic --set gps_max_dop 1
  ```
  ```bash title="Set GPS max DOP to < ~200m"
  meshtastic --set gps_max_dop 64
  ```

  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>

#### Specify GPS Screen Display
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

  ```bash title="Specify GPS format on device screen"
  meshtastic --set gps_format GpsFormatUTM
  ```

  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>

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

#### Enable/Disable GPS
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

  ```bash title="Set GPS to default settings"
  meshtastic --set gps_operation GpsOpUnset
  ```
  ```bash title="Set GPS to only be used for time"
  meshtastic --set gps_operation GpsOpTimeOnly
  ```
  ```bash title="Disable GPS Completely"
  meshtastic --set gps_operation GpsOpDisabled
  ```

  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>

:::note
`gps_operation GpsOpTimeOnly` is preferred to `gps_operation GpsOPDisabled` because it allows the device to get a hi-res time.
:::

### gps_update_interval

Determines how often should the device should attempt to acquire a GPS position (in seconds). The length of time the device is allowed to attempt to acquire GPS coordinates each interval is set using [`gps_attempt_time`](#gps_attempt_time). The default is every 30 seconds.

#### Specify GPS update interval
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

  ```bash title="Set GPS update interval to default settings (every 30 seconds)"
  meshtastic --set gps_update_interval 0
  ```
  ```bash title="Set GPS update interval to every 45 seconds"
  meshtastic --set gps_update_interval 45
  ```

  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>

### location_share

Determines whether location is shared with other nodes. See more details.

| Value | Description |
| :---: | :---------: |
| LocUnset | **Default**: operates the same as `LocEnabled`|
| LocEnabled | The device is sharing its location (or the paired phone's location) |
| LocDisabled | The device is not sharing its location (if the unit has a GPS it will default to only get time - i.e. [`GpsOpTimeOnly`](#gps_operation)) |

#### Disable Location Sharing
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

  ```bash title="Disable Location Sharing"
  meshtastic --set location_share LocDisabled
  ```

  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>

:::note
Disabling location sharing does not disable the GPS functionality, only the location sharing via the mesh.
:::

### position_broadcast_secs

How often our position is sent to the mesh (but only if it has changed significantly).

The GPS updates will be sent out every `position_broadcast_secs`, with either the actual GPS location, or an empty location if no GPS fix was achieved. This defaults to broadcast every 15 minutes.

#### Specify GPS position broadcast frequency
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

  ```bash title="Set GPS update interval to default settings (every 15 minutes)"
  meshtastic --set position_broadcast_secs 0
  ```
  ```bash title="Set GPS update interval to every 60 seconds"
  meshtastic --set position_broadcast_secs 60
  ```

  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>

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

:::tip
A person walking in a straight line will take about 90 seconds to travel 150 meters. That walking speed estimate was used as the baseline for the formula used.
:::

#### Enable/Disable Smart Position Broadcast
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

  ```bash title="Enable smart position broadcast"
  meshtastic --set position_broadcast_smart true
  ```
  ```bash title="Disable smart position broadcast"
  meshtastic --set position_broadcast_smart false
  ```

  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>

### position_flags

Bit field of boolean configuration options for POSITION messages (bitwise OR of PositionFlags)

| Value | Description |
| :---: | :---------: |
| POS_UNDEFINED | Required for compilation |
| POS_ALTITUDE | Include an altitude value (if available) |
| POS_ALT_MSL | Altitude value is MSL |
| POS_GEO_SEP | Include geoidal separation |
| POS_DOP | Include the DOP value ; PDOP used by default, see below |
| POS_HVDOP | If POS_DOP set, send separate HDOP / VDOP values instead of | PDOP
| POS_BATTERY | Include battery level |
| POS_SATINVIEW | Include number of "satellites in view" |
| POS_SEQ_NOS | Include a sequence number incremented per packet |
| POS_TIMESTAMP | Include positional timestamp (from GPS solution) |

#### Set/Unset Position Flags
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'iOS'},
    {label: 'Web', value: 'web'},
  ]}>
  <TabItem value="cli">

:::tip
Include each flag desired from the table above separated by a single space.
:::

  ```bash title="Set Position Flags"
  meshtastic --pos-fields POS_ALTITUDE POS_ALT_MSL
  ```
  ```bash title="Unset Position Flags"
  meshtastic --pos-fields POS_UNDEFINED
  ```

  </TabItem>
  <TabItem value="android">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="iOS">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
  <TabItem value="web">

:::info
Configuring this setting is not yet available for the selected platform. If this is incorrect please update the documentation for this page.
:::

  </TabItem>
</Tabs>
