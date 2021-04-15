---
id: web-app-software
title: Meshtastic-web overview
sidebar_label: Overview
---

The Meshtastic firmware incorporates an embedded webserver using the [ESP32 HTTPS Server](https://github.com/fhessel/esp32_https_server) project. This allows the wifi supporting ESP32 devices to run our Meshtastic-web application to deliver a native web interface to access Meshtastic directly from your browser. This imports the [Meshtastic.js library](/docs/js/getting-started) to provide a web page capable of interacting with the device.

:::caution
Please note that this is under active development and liable to change
:::

:::warning
The current Meshtastic-web depolyment only works with the 1.1.x versions of the device firmware. Support for 1.2.x will hopefully arrive soon
:::

