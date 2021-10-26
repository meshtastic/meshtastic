---
id: environment-plugin
title: Environment measurement
sidebar_label: Environment measurement
---
## About

The Environment Measurement Plugin will allow nodes to send a specific message with information from connected environmental sensors. Currently supported sensors are DHT11 and Dallas 1-wire DS18B20. This plugin does only work on ESP32 devices.

## Configuration

These are the settings that can be configured.

    environmental_measurement_plugin_enabled
        Is the plugin enabled?
        
        0 = Disabled (Default)
        1 = Enabled

    environmental_measurement_plugin_screen_enabled
        Show received sensor readings on device screen.

        0 = Disabled (Default)
        1 = Enabled

    environmental_measurement_plugin_read_error_count_threshold
        Error count threshold for failed sensor readings.

        Default = 0

    preferences.environmental_measurement_plugin_update_interval
        How often (in seconds) should sensor readings be broadcasted?

        Default = 0

    environmental_measurement_plugin_recovery_interval
        For how long should we wait (in seconds) before trying to read sensors again upon exceeded error threshold?

        Default = 0

    environmental_measurement_plugin_display_fahrenheit
        Should temperature readings be converted to fahrenheit?
    
        0 = Disabled (Default)
        1 = Enabled
        
    environmental_measurement_plugin_sensor_type
        What sensor is connected?
        
        0 = DHT11 (Default)
        1 = Dallas 1-wire DS18B20
        
    environmental_measurement_plugin_sensor_pin
        Which pin is the sensor connected to?
        
        Default = 0
    

## Usage Notes

For basic usage, start with:

	environmental_measurement_plugin_enabled = 1

	environmental_measurement_plugin_screen_enabled = 1
    
Depending on which pin your sensor is connected to, set it accordingly:

	environmental_measurement_plugin_sensor_pin = 13
  

:::note
The device must be restarted after the settings have been changed for the plugin to take effect.
:::
	

## Hardware

The sensors can be wired differently, here's one example for sensor DS18B20 https://randomnerdtutorials.com/esp32-ds18b20-temperature-arduino-ide

    
## Known Problems

* No default configuration values are currently set, so this must be done when enabling the plugin.
