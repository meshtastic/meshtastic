---
id: canned-message-module
title: Canned Message Module
sidebar_label: Canned Message Module
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PluginModule from '@site/docs/_blocks/_plugin_module.mdx';

:::warning
GPIO access is fundamentally dangerous because invalid options can physically damage or destroy your hardware. Ensure that you fully understand the schematic for your particular device before trying this as we do not offer a warranty. Use at your own risk.
:::

<PluginModule name="canned_message_" rename="canned_message_" />

<!--- TODO add link to hardware setup to admonition--->

:::note
This module requires attaching a peripheral accessory to your device. It will not work without one. It also requires use of the [Rotary Encoder Module](rotary-encoder-module) to configure the input source.
:::

## Overview

The CannedMessage Module will allow you to send messages to the mesh network from the device without using the phone app. You can predefine text messages to choose from.

:::tip
Once module settings are changed, a **reset** is required for them to take effect.
:::

## Settings

|                 Setting                  | Acceptable Values | Default |
| :--------------------------------------: | :---------------: | :-----: |
| canned_message_module_allow_input_source | `rotEnc1`, `_any` | `_any`  |
|      canned_message_module_enabled       |  `true`, `false`  | `false` |
|      canned_message_module_messages      |     `string`      |  `""`   |
|     canned_message_module_send_bell      |  `true`, `false`  | `false` |

### canned_message_module_allow_input_source

Input event source accepted by the canned message module.

|   Value   |                                                                                                              Description                                                                                                              |
| :-------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  `_any`   |                                                                                 Default. Allows any peripheral input device connected to the device.                                                                                  |
| `rotEnc1` | Hardcoded value naming the input device that this module listens to. This could allow multiple input devices to be named with future software development. At present, this doesn't do anything differently than the default setting. |

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
meshtastic --set canned_message_module_allow_input_source "_any"
```

```bash title="Specify Allowed Input Source"
meshtastic --set canned_message_module_allow_input_source "rotEnc1"
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

### canned_message_module_enabled

Enables the module.

:::tip
Using the canned message module requires you set up the [Rotary Encoder Module](rotary-encoder-module). See [prerequisites](#prerequisites) below.
:::

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

```bash title="Enable Canned Message Module"
meshtastic --set canned_message_module_enabled true
```

```bash title="Disable Canned Message Module"
meshtastic --set canned_message_module_enabled false
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

### canned_message_module_messages

Predefined messages for CannedMessageModule separated by `|` characters.

You can define up to 50 messages with a total length 1024 bytes.

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
meshtastic --set canned_message_module_messages "I'm fine|I'm out|I'm back|Need helping hand|Help me with saw|I need an alpinist|I need ambulance|Keep Calm|On my way|I will be late|I'm already waiting|We have company|Beer is cold|Roger"
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

### canned_message_module_send_bell

CannedMessageModule also sends a bell character with the messages.
The [External Notification Module](external-notification-module) can benefit from this feature as it utilizes the bell character.

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
meshtastic --set canned_message_module_send_bell true
```

```bash title="Disable Bell Character"
meshtastic --set canned_message_module_send_bell false
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
- Once attached, configure peripheral device with [Rotary Encoder Module](rotary-encoder-module) Settings.

:::note
Replace each `GPIO` (x3) below with the GPIO numbers from hardware setup.

```bash title="Canned Message Module - Required Rotary Encoder Module Settings"
meshtastic --set rotary1_pin_a GPIO
meshtastic --set rotary1_pin_b GPIO
meshtastic --set rotary1_pin_press GPIO
meshtastic --set rotary1_event_cw KEY_UP
meshtastic --set rotary1_event_ccw KEY_DOWN
meshtastic --set rotary1_event_press KEY_SELECT
meshtastic --set rotary1_enabled True
```

:::
That's it! With a functioning and enabled rotary encoder, you're ready to begin configuring the Canned Message Module.
