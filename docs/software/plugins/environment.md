---
id: environment-plugin
title: Environment measurement
sidebar_label: Environment measurement
---
## About

The Environment Measurement Plugin will allow nodes to send a specific message with information from connected environmental sensors. Currently supported sensors are BME280, BME680, DHT11, DHT12, DHT21, DHT22 and Dallas 1-wire DS18B20.

The preferred setup is using I2C, so the `environmental_measurement_plugin_sensor_pin` may not be needed.

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
        2 = DHT12
        3 = DHT21
        4 = DHT22
        5 = BME280
        6 = BME680

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

## Example of T-LoraV1 with DHT22 temperature sensor

Setup of a T-LoraV1 with DHT22 temperature sensor.

[<img src="T-LoraV1 with DHT22" src="/img/hardware/lora_v1_with_DHT22.jpg" style={{zoom:'25%'}} />](/img/hardware/lora_v1_with_DHT22.jpg)

Requirements:
* T-LoraV1 (but any esp32 should work, just be sure to double check which GPIO to use)
* DHT22 sensor
* 10 Kohm resistor (optional, but recommended)
* breadboard (optional)
* two red wires (could be a different color, but 5V is typically red)
* two yellow wires for GPIO (could be a different color)
* one black wire (could be a different color, but GROUND is typically black)

Steps:
* disconnect power/battery
* connect black wire from GROUND to "-" on the DHT22
* connect yellow wire from middle PIN to a row on bread board
* connect red wire from 5V to a row on breadboard
* connect resistor between red and yellow rows
* connect red wire from row with red to "+" on DHT22
* connect yellow wire from yellow row to GPIO on device (ex: GPIO21)
* double check the cabling (if you get it wrong, you can damage the device and/or the DHT22 sensor)
* plug in device
* configure the device:

```
meshtastic --set environmental_measurement_plugin_measurement_enabled true --set environmental_measurement_plugin_screen_enabled true --set environmental_measurement_plugin_update_interval 15 --set environmental_measurement_plugin_display_farenheit true --set environmental_measurement_plugin_sensor_type DHT22 --set environmental_measurement_plugin_sensor_pin 21
```

:::tip
You can change the values above to suit your needs. The commands can be run one at a time or in a group as show above.
:::

* reboot/reset the device (press the RST button or unplug/plug in the device)
* when the device boots it should say "Environment" and it may show the sensor data
* if "no data", then triple check the wiring
* if still "no data", run:

```
meshtastic --info
```

and verify the the environmental_measurement_plugin_sensor_type and environmental_measurement_plugin_sensor_pin


## Example of T-LoraV1 with Dallas DS18B20 temperature sensor

Setup of a T-LoraV1 with DS18B20 temperature sensor.

[<img src="T-LoraV1 with DS18B20" src="/img/hardware/lora_v1_with_DS18B20.jpg" style={{zoom:'25%'}} />](/img/hardware/lora_v1_with_DS18B20.jpg)

Requirements:
* T-LoraV1 (but any esp32 should work, just be sure to double check which GPIO to use)
* DS18B20 sensor
* 10 Kohm resistor (optional, but recommended)
* breadboard (optional)
* two red wires (could be a different color, but 5V is typically red)
* two yellow wires for GPIO (could be a different color)
* one black wire (could be a different color, but GROUND is typically black)

Steps:
* disconnect power/battery
* connect black wire from GROUND to "-" on the DS18B20
* connect yellow wire from DAT pin to a row on bread board
* connect red wire from 5V to a row on breadboard
* connect resistor between red and yellow rows
* connect red wire from row with red to "VCC" on DS18B20
* connect yellow wire from yellow row to GPIO on device (ex: GPIO21)
* double check the cabling (if you get it wrong, you can damage the device and/or the sensor)
* plug in device
* configure the device:

```
meshtastic --set environmental_measurement_plugin_measurement_enabled true --set environmental_measurement_plugin_screen_enabled true --set environmental_measurement_plugin_update_interval 15 --set environmental_measurement_plugin_display_farenheit true --set environmental_measurement_plugin_sensor_type DS18B20 --set environmental_measurement_plugin_sensor_pin 21
```

:::tip
You can change the values above to suit your needs. The commands can be run one at a time or in a group as show above.
:::

* reboot/reset the device (press the RST button or unplug/plug in the device)
* when the device boots it should say "Environment" and it may show the sensor data
* if "no data", then triple check the wiring
* if still "no data", run:

```
meshtastic --info
```

and verify the the environmental_measurement_plugin_sensor_type and environmental_measurement_plugin_sensor_pin

## Example of RAK 4631 with Environment Sensor

Setup of a RAK 4631 with Environment Sensor

[<img src="RAK4631_with_EnvSensor" src="/img/hardware/rak/RAK4631_with_EnvSensor.jpg" style={{zoom:'25%'}} />](/img/hardware/rak/RAK4631_with_EnvSensor.jpg)

Requirements:
* RAK4631
* Environment Sensor

Steps:
* configure the device:

```
meshtastic --set environmental_measurement_plugin_measurement_enabled true --set environmental_measurement_plugin_screen_enabled true --set environmental_measurement_plugin_update_interval 15 --set environmental_measurement_plugin_display_farenheit true --set environmental_measurement_plugin_sensor_type 6
```

:::tip
You can change the values above to suit your needs. The commands can be run one at a time or in a group as show above.
:::

* reboot/reset the device (press the button or unplug/plug in the device)
* when the device boots it should say "Environment" and it may show the sensor data
* if still "no data", run:

```
meshtastic --info
```

and verify the the environmental_measurement_plugin_sensor_type

## Known Problems

* No default configuration values are currently set, so this must be done when enabling the plugin.
