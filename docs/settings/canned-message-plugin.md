---
id: canned-message-plugin
title: Canned Message Plugin
sidebar_label: Canned Message Plugin
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--- TODO add link to hardware setup to admonition--->
:::note
This plugin requires attaching a peripheral accessory to your device. It will not work without one. It also requires use of the [Rotary Encoder Plugin](rotary-encoder-plugin) to configure the input source.
:::

## Overview

The CannedMessage Plugin will allow you to send messages to the mesh network from the device without using the phone app. You can predefine text messages to choose from.

:::tip
Once plugin settings are changed, a **reset** is required for them to take effect.
:::

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| canned_message_plugin_allow_input_source | `rotEnc1`, `_any` | `_any` |
| canned_message_plugin_enabled | `true`, `false` | `false` |
| canned_message_plugin_send_bell | `true`, `false` | `false` |
| (Messages)* | `string` | `""` |

- Messages can be set with a dedicated option:

`--set-canned-message "<messages>"`

### canned_message_plugin_allow_input_source

Input event source accepted by the canned message plugin.

| Value | Description |
| :---: | :---------: |
| `_any` | Default. Allows any peripheral input device connected to the device. |
| `rotEnc1` | Hardcoded value naming the input device that this plugin listens to. This could allow multiple input devices to be named with future software development. At present, this doesn't do anything differently than the default setting. |

#### Set input source
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

```bash title="Set Allowed Input Source"
meshtastic --set canned_message_plugin_allow_input_source "_any"
```
```bash title="Specify Allowed Input Source"
meshtastic --set canned_message_plugin_allow_input_source "rotEnc1"
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

### canned_message_plugin_enabled

Enables the plugin.

:::tip
Using the canned message plugin requires you set up the [rotary encoder plugin](rotary-encoder-plugin). See [prerequisites](#prerequisites) below.
:::
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

```bash title="Enable Canned Message Plugin"
meshtastic --set canned_message_plugin_enabled true
```
```bash title="Disable Canned Message Plugin"
meshtastic --set canned_message_plugin_enabled false
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

### canned_message_plugin_send_bell

CannedMessagePlugin also sends a "bell character" with the messages.
The [External Notification Module](external-notification-plugin) can benefit from this feature.

_We have an "External Notification Module", that can be set up to beep, when new message arrives.
This module can also be configured to beep only when message contains the "bell character".
See module documentation (link above) for details._

#### Enable/Disable bell character
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

```bash title="Enable Bell Character"
meshtastic --set canned_message_plugin_send_bell true
```
```bash title="Disable Bell Character"
meshtastic --set canned_message_plugin_send_bell false
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

### Messages

CLI has a dedicated option for canned message module to set predefines messages: `--set-canned-message <message>`
Predefined messages separated by `|` characters.

You can define up to 50 messages with a total length 800 bytes.

Existing configuration can be queried with CLI option: `--get-canned-message`

#### Set canned messages
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

```bash title="Set Canned Messages"
meshtastic --set-canned-message "What am I doing?|I'm fine|Don't follow me|I'm out|I'm back|Need helping hand|Help me with saw|I need an alpinist|I need ambulance|Keep Calm|On my way|Need 5 mins|I will be late|I'm already waiting|I couldn't join|We have company|Beer is cold|Roger"
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

### Prerequisites

<!--- TODO add link to hardware pages to first bullet point --->
- Attach a compatible peripheral device. Take note of the GPIO numbers you use, as they will be used in the following step.
- Once attached, configure peripheral device with [Rotary Encoder Plugin Settings](rotary-encoder-plugin).

:::note
Replace each `GPIO` (x3) below with the GPIO numbers from hardware setup.

  ```bash title="Canned Message Plugin - Required Rotary Encoder Plugin Settings"
  meshtastic --set rotary1_pin_a GPIO
  meshtastic --set rotary1_pin_b GPIO
  meshtastic --set rotary1_pin_press GPIO
  meshtastic --set rotary1_event_cw KEY_UP
  meshtastic --set rotary1_event_ccw KEY_DOWN
  meshtastic --set rotary1_event_press KEY_SELECT
  meshtastic --set rotary1_enabled True
  ```
:::
That's it! With a functioning and enabled rotary encoder, you're ready to begin configuring the Canned Message Plugin.
