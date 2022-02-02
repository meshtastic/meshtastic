---
id: environmental-measurement-plugin
title: Environmental Measurement Plugin Settings
sidebar_label: Environmental Measurement Plugin
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--- TODO add link to hardware setup to admonition--->
:::note
This plugin requires attaching a peripheral accessory to your device. It will not work without one.
:::

## Overview

The Environment Measurement Plugin will allow nodes to send a specific message with information from connected environmental sensors. Currently supported sensors are BME280, BME680, DHT11, DHT12, DHT21, DHT22 and Dallas 1-wire DS18B20.

:::tip
Once plugin settings are changed, a **reset** is required for them to take effect.
:::

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| environmental_measurement_plugin_measurement_enabled | `true`, `false` | `false` |
| environmental_measurement_plugin_display_farenheit | `true`, `false` | `false` |
| environmental_measurement_plugin_read_error_count_threshold | `integer` | `0` |
| environmental_measurement_plugin_recovery_interval | `integer` (seconds) | `0` |
| environmental_measurement_plugin_screen_enabled | `true`, `false` | `0` |
| environmental_measurement_plugin_sensor_pin | `integer` | `0` |
| environmental_measurement_plugin_sensor_type | `0-6` | `0` |
| environmental_measurement_plugin_update_interval | `integer` (seconds) | `0` |

### environmental_measurement_plugin_measurement_enabled

Enables the plugin.

#### Enable/Disable the plugin
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

```bash title="Enable Plugin"
meshtastic --set environmental_measurement_plugin_measurement_enabled true
```
```bash title="Disable Plugin"
meshtastic --set environmental_measurement_plugin_measurement_enabled false
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

### environmental_measurement_plugin_display_farenheit

The sensor is always read in Celsius, but the user can opt to view the temperature display in Fahrenheit using this setting.

#### Display Farenheit/Celsius
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

```bash title="Display Farenheit"
meshtastic --set environmental_measurement_plugin_display_farenheit true
```
```bash title="Display Celsius"
meshtastic --set environmental_measurement_plugin_display_farenheit false
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


### environmental_measurement_plugin_read_error_count_threshold

Sometimes sensor reads can fail. If this happens, we will retry a configurable number of attempts. Each attempt will be delayed by the minimum required refresh rate for that sensor

### environmental_measurement_plugin_recovery_interval

Sometimes we can end up with more than read_error_count_threshold failures. In this case, we will stop trying to read from the sensor for a while. Wait this long until trying to read from the sensor again.

### environmental_measurement_plugin_screen_enabled

Enable/Disable the environmental measurement plugin on-device display.

#### Enable/Disable the plugin on device screen
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

```bash title="Enable on device screen"
meshtastic --set environmental_measurement_plugin_screen_enabled true
```
```bash title="Disable on device screen"
meshtastic --set environmental_measurement_plugin_screen_enabled false
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

### environmental_measurement_plugin_sensor_pin

:::note
The preferred setup is using I2C, so the `environmental_measurement_plugin_sensor_pin` may not be needed.
:::

Specify the preferred GPIO Pin for sensor readings. May not be needed if using I2C.

#### Set plugin sensor pin
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

```bash title="Set plugin sensor pin"
meshtastic --set environmental_measurement_plugin_sensor_pin PINNUMBER
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

### environmental_measurement_plugin_sensor_type

Specify the sensor type.

| Value | Description | Sensor Features |
| :---: | :---------: | :-------------: |
| `0` | DHT11 | Temperature, Humidity |
| `1` | DS18B20 (Dallas 1-wire) | Temperature |
| `2` | DHT12 | Temperature, Humidity |
| `3` | DHT21 | Temperature, Humidity |
| `4` | DHT22 | Temperature, Humidity |
| `5` | BME280 | Temperature, Humidity, Pressure |
| `6` | BME680 | Temperature, Humidity, Pressure, VOC Gas |

#### Set sensor type

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

:::note
The CLI is able to take the `value` or the `name` of the sensor from the table above.
:::

```bash title="Set sensor type to DS18B20"
meshtastic --set environmental_measurement_plugin_sensor_type 1
```
```bash title="Set sensor type to DS18B20"
meshtastic --set environmental_measurement_plugin_sensor_type DS18B20
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

### environmental_measurement_plugin_update_interval

Interval in seconds of how often we should try to send our measurements to the mesh.

#### Set plugin update interval
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

```bash title="Set plugin update interval to 15 seconds"
meshtastic --set environmental_measurement_plugin_update_interval 15
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

## Details

### Hardware

The sensors can be wired differently, here's [one example](https://randomnerdtutorials.com/esp32-ds18b20-temperature-arduino-ide) for sensor DS18B20.

### Known Problems

* No default configuration values are currently set, so this must be done when enabling the plugin.
