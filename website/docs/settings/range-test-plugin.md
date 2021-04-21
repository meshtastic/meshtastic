---
id: range-test-plugin
title: Range Test Plugin Settings
sidebar_label: Range Test Plugin
---

## Overview

This plugin allows you to test the range of your Meshtastic nodes. It requires at least two nodes, one to send a message every minute, and another to receive the messages. The receiving node then saves the messages along with the GPS coordinates at which they were received into a .csv file. This .csv file can then be integrated into, for example, Google Earth, allowing you to see where you have coverage.

:::note
Once settings are changed, a reset is required for them to take effect.
:::

## Settings

| Setting | Acceptable Values | Default | Description |
| :-----: | :---------------: | :-----: | :---------: |
| range_test_plugin_enabled | `true`, `false` | `false` | Enables the plugin. |
| range_test_plugin_save | `true`, `false` | `false` | Sets whether the device should save packets received from other devices and create a `rangetest.csv` file |
| range_test_plugin_sender | `integer` (Seconds) | `0` | Sets the frequency in seconds for the node to send the packet. |

## Details
