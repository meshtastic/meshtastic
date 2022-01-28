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

See "Software / Plugins / Canned messages" for examples! 
