---
id: canned-message-plugin-settings
title: Canned Message Plugin Settings
sidebar_label: Canned Message Plugin Settings
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Overview

The CannedMessage Plugin will allow you to send messages to the mesh network from the device without using the phone app. You can predefine text messages to choose from.

Please also follow settings of Rotary Encoder to configure input source!

:::note
Once plugin settings are changed, a **reset** is required for them to take effect.
:::

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| canned_message_plugin_enabled | `true`, `false` | `false` |
| canned_message_plugin_allow_input_source | `rotEnc1`, `_any` | `_any` |
| canned_message_plugin_messages | `string` | `""` |
| canned_message_plugin_send_bell | `true`, `false` | `false` |

### canned_message_plugin_enabled

Enables the plugin.

### canned_message_plugin_allow_input_source

Input event origin accepted by the canned message plugin.

| Value | Description |
| :---: | :---------: |
| `_any` | Default. Allows any input device connected to the device. |
| `rotEnc1` | Hardcoded value naming the input device that this plugin listens to. This could allow multiple input devices to be named, but pull requests would need to be made to the device repo, so at the moment this doesn't do anything differently than the default setting. |

### canned_message_plugin_messages

Predefined messages for CannedMessagePlugin separated by `|` characters.

You can define up to 50 messages with a total length 1024 bytes.

### canned_message_plugin_send_bell

CannedMessagePlugin also sends a bell character with the messages.
The [External Notification Plugin](external-notification-plugin) can benefit from this feature as it utilizes the bell character.

## Details

See "Software / Plugins / Canned messages" for details!

## Examples

See "Software / Plugins / Canned messages" for examples!
