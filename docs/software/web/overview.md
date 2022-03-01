---
id: web-app-software
title: Web interface overview
sidebar_label: Overview
---

The Meshtastic firmware incorporates an embedded web server using the [ESP32 HTTPS Server](https://github.com/fhessel/esp32_https_server) project. This allows the Wifi supporting ESP32 devices to run our web interface to access Meshtastic directly from your browser. This imports the [Meshtastic.js library](/docs/software/js/getting-started) to provide a web page capable of interacting with the device.

:::caution
Please note that this is under active development and liable to change.
:::

:::caution
It has been reported that some of this information is out of date.

FIXME - Investigate and rewrite document to reflect the current web usage solution.
:::

## Configuration

The web interface is now included in firmware releases. There is active development ongoing to fix some issues with updating the web interface from the web interface directly. Please be patient with us as we work on this. Use [Meshtastic-flasher](/docs/getting-started/meshtastic-flasher) to update your device to the current stable build which includes the web interface.

### Wifi configuration

WiFi configuration is required to use the web interface. Any method of set up will work:
- [Device as a client](/docs/settings/wifi#enable-wifi-as-client)
- [Device as an access point](/docs/settings/wifi#enable-wifi-as-softap)
- [Force SoftAP (admin)](/docs/settings/wifi#force-softap)

If you have just one Meshtastic device on your network, the easiest thing to do is to go to http://meshtastic.local printed on your device screen. That URL should work provided that mDNS (aka ZeroConf) is not blocked on your local network. If you have more than one device or there's a problem with mDNS name resolution, you will have to refer to the device's IP address. The IP address will also be available on the screen. It can also be found by reading the serial logs when the device boots up.

:::note
The first time your device restarts after enabling WiFi, it will take an additional 20-30 seconds to boot. This is to generate self-signed SSL keys. The keys will be saved for future reuse.
:::

## Common Problems

### Problem: File not found: /static/index.html

:::note
This issue is likely found on old versions of the web interface. Device firmware now includes the web interface and the file system has been changed. Flashing the device with [Meshtastic-flasher](/docs/getting-started/meshtastic-flasher) will update you to the current web interface. Access to the files in the filesystem is actively being developed, but is not currently available.
:::

Cause: This most likely means that the file system for the web server has not been loaded. You probably used esphome-flasher or some other GUI tool to flash the firmware.

Solutions:

Option 1) Flash the device with the `device-install.sh` script that comes packaged with the firmware zip file (you'll lose previous settings). Then follow the instructions under configuration to upload the web interface.

Option 2) Flash the device with the OTA update from within the Android application.

Option 3) Flash the device with the SPIFFS instructions in platform.io.

### Insufficient space to upload new files

:::note
This issue is likely found on old versions of the web interface. Device firmware now includes the web interface and the file system has been changed. Flashing the device with [Meshtastic-flasher](/docs/getting-started/meshtastic-flasher) will update you to the current web interface. Access to the files in the filesystem is actively being developed, but is not currently available.
:::

Cause: Typically a small partition has been set aside from previous firmware installed on the module. Instructions for how to fix this can be found on the [ESP32-Partitions](/docs/software/web/web-partitions-software) page.
