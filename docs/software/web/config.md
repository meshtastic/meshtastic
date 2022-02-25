---
id: web-config-software
title: Initial configuration
sidebar_label: Configuration
---

## Manual Installation

Pre-requisite: You have Meshtastic Device firmware between version 1.0.32 - 1.1.50. A client for version 1.2.x will be released shortly and the documentation will be updated accordingly.

We do realize this installation method is not "easy" and are exploring ways to simplify this in the future, ideally rolling it out as part of the device firmware.

Once you have your device loaded with the Meshtastic Device firmware you need to connect to it's Wifi and then manually upload the web interface files.

### Upload web interface files

* Updated (Nov 20, 2021) - The process to use the web interface will soon be included in the default builds downloaded from the usual places. This document will be updated soon. Hang tight :)

### Wifi configuration

WiFi configuration is required to use the web interface. Any method of set up will work:
- [Device as a client](/docs/settings/wifi#enable-wifi-as-client)
- [Device as an access point](/docs/settings/wifi#enable-wifi-as-softap)
- [Force SoftAP (admin)](/docs/settings/wifi#force-softap)

:::note
The first time your device restarts after enabling WiFi, it will take an additional 20-30 seconds to boot. This is to generate self-signed SSL keys. The keys will be saved for future reuse.
:::
