---
id: rotary-encoder-plugin
title: Rotary Encoder
sidebar_label: Rotary Encoder
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--- TODO add link to hardware setup to admonition--->
:::note
This plugin requires attaching a peripheral accessory to your device. It will not work without one.
:::

## Overview

Meshtastic supports hardwired rotary encoders as input devices.
Currently, one rotary encoder (`rotary1`) is defined, but later more rotary encoders
can be added (if needed) the same way.

:::tip
Once plugin settings are changed, a **reset** is required for them to take effect.
:::

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| rotary1_enabled | `true`, `false` | `false` |
| rotary1_pin_a | `integer` | (not defined) |
| rotary1_pin_b | `integer` | (not defined) |
| rotary1_pin_press | `integer` | (not defined) |
| rotary1_event_cw | `InputEventChar` | (not defined) |
| rotary1_event_ccw | `InputEventChar` | (not defined) |
| rotary1_event_press | `InputEventChar` | (not defined) |

### rotary1_enabled
Enable the rotary encoder #1

### rotary1_pin_a
GPIO pin for rotary encoder A port.

### rotary1_pin_b
GPIO pin for rotary encoder B port.

### rotary1_pin_press
GPIO pin for rotary encoder Press port.

### rotary1_event_cw
Generate input event on CW of this kind.
(For using with CannedMessagePlugin you must choose value "UP" here.)

### rotary1_event_ccw
Generate input event on CCW of this kind.
(For using with CannedMessagePlugin you must choose value "DOWN" here.)

### rotary1_event_press
Generate input event on Press of this kind.
(For using with CannedMessagePlugin you must choose value "SELECT" here.)

## Details

See "Software / Plugins / Canned messages" for details! 

## Examples

### Configure rotary encoder for Canned Message Plugin
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
Replace each `GPIO` (x3) below with the GPIO numbers from hardware setup.
:::

  ```bash title="Canned Message Plugin - Required Rotary Encoder Plugin Settings"
  meshtastic --set rotary1_pin_a GPIO
  meshtastic --set rotary1_pin_b GPIO
  meshtastic --set rotary1_pin_press GPIO
  meshtastic --set rotary1_event_cw KEY_UP
  meshtastic --set rotary1_event_ccw KEY_DOWN
  meshtastic --set rotary1_event_press KEY_SELECT
  meshtastic --set rotary1_enabled True
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
