---
id: environmental-measurement-plugin
title: Environmental Measurement Plugin Settings
sidebar_label: Environmental Measurement Plugin
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Overview

:::caution
This is a work in progress and is not yet available.
:::

The Environmental Measurement Plugin will allow you to connect climate sensors to report local conditions to your mesh.

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| environmental_measurement_plugin_measurement_enabled | `true`, `false` | `false` |
| environmental_measurement_plugin_display_farenheit | `true`, `false` | `false` |
| environmental_measurement_plugin_read_error_count_threshold | `integer` | `0` |
| environmental_measurement_plugin_recovery_interval | `integer` (seconds) | `0` |
| environmental_measurement_plugin_screen_enabled | `true`, `false` | `0` |
| environmental_measurement_plugin_sensor_pin | `integer` | `0` |
| environmental_measurement_plugin_sensor_type | `DHT11` | `0` |
| environmental_measurement_plugin_update_interval | `integer` (seconds) | `0` |

### environmental_measurement_plugin_measurement_enabled

Enables the plugin.

### environmental_measurement_plugin_display_farenheit

The sensor is always read in Celsius, but the user can opt to view the temperature display in Fahrenheit using this setting.

### environmental_measurement_plugin_read_error_count_threshold

Sometimes sensor reads can fail. If this happens, we will retry a configurable number of attempts Each attempt will be delayed by the minimum required refresh rate for that sensor

### environmental_measurement_plugin_recovery_interval

Sometimes we can end up with more than read_error_count_threshold failures. In this case, we will stop trying to read from the sensor for a while. Wait this long until trying to read from the sensor again

### environmental_measurement_plugin_screen_enabled

Enable/Disable the environmental measurement plugin on-device display.

### environmental_measurement_plugin_sensor_pin

Specify the preferred GPIO Pin for sensor readings.

### environmental_measurement_plugin_sensor_type

Specify the sensor type

### environmental_measurement_plugin_update_interval

Interval in seconds of how often we should try to send our measurements to the mesh.

## Details

<!--- TODO --->

## Examples

<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  TODO

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>
