---
id: environmental-measurement-plugin
title: Environmental Measurement Plugin Settings
sidebar_label: Environmental Measurement Plugin
---

## Overview



## Settings

| Setting | Acceptable Values | Default | Description |
| :-----: | :---------------: | :-----: | :---------: |
| environmental_measurement_plugin_measurement_enabled | `true`, `false` | `false` | Enables the plugin. |
| environmental_measurement_plugin_display_farenheit | `true`, `false` | `false` | We'll always read the sensor in Celsius, but sometimes we might want to display the results in Farenheit as a "user preference". |
| environmental_measurement_plugin_read_error_count_threshold | `integer` | `0` | Sometimes sensor reads can fail. If this happens, we will retry a configurable number of attempts Each attempt will be delayed by the minimum required refresh rate for that sensor |
| environmental_measurement_plugin_recovery_interval | `integer` (seconds) | `0` | Sometimes we can end up with more than read_error_count_threshold failures. In this case, we will stop trying to read from the sensor for a while. Wait this long until trying to read from the sensor again |
| environmental_measurement_plugin_screen_enabled | `true`, `false` | `0` | Enable/Disable the environmental measurement plugin on-device display |
| environmental_measurement_plugin_sensor_pin | `integer` | `0` | Specify the preferred GPIO Pin for sensor readings |
| environmental_measurement_plugin_sensor_type | `DHT11` | `0` | Specify the sensor type |
| environmental_measurement_plugin_update_interval | `integer` (seconds) | `0` | Interval in seconds of how often we should try to send our measurements to the mesh |

## Details
