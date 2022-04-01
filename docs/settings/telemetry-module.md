---
id: telemetry-module
title: Telemetry Module Settings
sidebar_label: Telemetry Module
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PluginModule from '@site/docs/_blocks/_plugin_module.mdx';

:::warning
GPIO access is fundamentally dangerous because invalid options can physically damage or destroy your hardware. Ensure that you fully understand the schematic for your particular device before trying this as we do not offer a warranty. Use at your own risk.
:::

<PluginModule name="telemetry_module_environment" rename="environmental_measurement_plugin"/>

<!--- TODO add link to hardware setup to admonition--->

:::note
The environment metrics feature of this module requires attaching a peripheral accessory to your device. It will not work without one.
:::

## Overview

In addition to key device metrics such as battery level, the Telemetry Module will also allow nodes to send environmental metrics from externally connected sensors. Currently supported sensors are BME280, BME680, DHT11, DHT12, DHT21, DHT22, Dallas 1-wire DS18B20 and MCP9808.

:::tip
Once module settings are changed, a **reset** is required for them to take effect.
:::

## Settings

|                   Setting                   |  Acceptable Values  | Default |
| :-----------------------------------------: | :-----------------: | :-----: |
|         telemetry_module_device_update_interval         | `integer` (seconds) |   `0`   |
|     telemetry_module_environment_display_fahrenheit     |   `true`, `false`   | `false` |
|    telemetry_module_environment_measurement_enabled     |   `true`, `false`   | `false` |
| telemetry_module_environment_read_error_count_threshold |      `integer`      |   `0`   |
|     telemetry_module_environment_recovery_interval      | `integer` (seconds) |   `0`   |
|       telemetry_module_environment_screen_enabled       |   `true`, `false`   |   `0`   |
|         telemetry_module_environment_sensor_pin         |      `integer`      |   `0`   |
|        telemetry_module_environment_sensor_type         |        `0-6`        |   `0`   |
|      telemetry_module_environment_update_interval       | `integer` (seconds) |   `0`   |

### telemetry_module_device_update_interval

Interval in seconds of how often we should try to send our measurements to the mesh.

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

```bash title="Set module update interval to default"
meshtastic --set telemetry_module_device_update_interval 0
```
```bash title="Set module update interval to 120 seconds"
meshtastic --set telemetry_module_device_update_interval 120
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


### telemetry_module_environment_display_fahrenheit

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
meshtastic --set telemetry_module_environment_display_fahrenheit true
```

```bash title="Display Celsius"
meshtastic --set telemetry_module_environment_display_fahrenheit false
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

### telemetry_module_environment_measurement_enabled

Enables the module to utilize environmental metrics.

#### Enable/Disable the module

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

```bash title="Enable Module"
meshtastic --set telemetry_module_environment_measurement_enabled true
```

```bash title="Disable Module"
meshtastic --set telemetry_module_environment_measurement_enabled false
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

### telemetry_module_environment_read_error_count_threshold

Sometimes sensor reads can fail. If this happens, we will retry a configurable number of attempts. Each attempt will be delayed by the minimum required refresh rate for that sensor

#### Configure telemetry_module_environment_read_error_count_threshold

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

```bash title="Configure telemetry_module_environment_read_error_count_threshold to 3 tries"
meshtastic --set telemetry_module_environment_read_error_count_threshold 3
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

### telemetry_module_environment_recovery_interval

Sometimes we can end up with more than read_error_count_threshold failures. In this case, we will stop trying to read from the sensor for a while. Wait this long until trying to read from the sensor again.

#### Configure telemetry_module_environment_recovery_interval

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

```bash title="Configure telemetry_module_environment_recovery_interval to 120 seconds"
meshtastic --set telemetry_module_environment_recovery_interval 120
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

### telemetry_module_environment_screen_enabled

Enable/Disable the Telemetry Module on-device display.

#### Enable/Disable the module on device screen

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
meshtastic --set telemetry_module_environment_screen_enabled true
```

```bash title="Disable on device screen"
meshtastic --set telemetry_module_environment_screen_enabled false
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

### telemetry_module_environment_sensor_pin

:::note
The preferred setup is using I2C, so the `telemetry_module_environment_sensor_pin` may not be needed.
:::

Specify the preferred GPIO Pin for sensor readings. May not be needed if using I2C.

:::caution
To prevent damaging your device, double check your device's schematics before attaching to the GPIO pins and setting this value.
:::

#### Set module sensor pin

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

```bash title="Set module sensor pin"
meshtastic --set telemetry_module_environment_sensor_pin PINNUMBER
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

### telemetry_module_environment_sensor_type

Specify the sensor type.

| Value |       Description       |             Sensor Features              |
| :---: | :---------------------: | :--------------------------------------: |
|  `1`  |          DHT11          |          Temperature, Humidity           |
|  `2`  | DS18B20 (Dallas 1-wire) |               Temperature                |
|  `3`  |          DHT12          |          Temperature, Humidity           |
|  `4`  |          DHT21          |          Temperature, Humidity           |
|  `5`  |          DHT22          |          Temperature, Humidity           |
|  `6`  |         BME280          |     Temperature, Humidity, Pressure      |
|  `7`  |         BME680          | Temperature, Humidity, Pressure, VOC Gas |
|  `8`  |         MCP9808         |          Precision Temperature           |

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
meshtastic --set telemetry_module_environment_sensor_type 2
```

```bash title="Set sensor type to DS18B20"
meshtastic --set telemetry_module_environment_sensor_type DS18B20
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

- No default configuration values are currently set, so this must be done when enabling the module.
