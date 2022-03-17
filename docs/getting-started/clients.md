---
id: clients
title: Meshtastic Clients
sidebar_label: Meshtastic Clients
---

import { DownloadCard } from '/src/pages/downloads/\_components/DownloadCard.tsx'

## Overview

There are many ways to connect to your newly flashed device. Below is a quickstart for each client that you can use to connect to your radio.

### Commandline Interface (CLI)

The CLI is currently the best way to manage your settings. It is feature rich and well documented. The [settings pages](/docs/settings) have examples for each user preference for the device. The CLI is available as a standalone executable for Windows, Mac OS or linux or as part of the [Meshtastic-python](https://github.com/meshtastic/Meshtastic-python) project. If you'd like to use python to interface with a device, see the [API documentation](https://python.meshtastic.org).

#### Installation

To install the prebuilt binary refer to: [Meshtastic-python standalone executable](/docs/software/python/python-standalone).

To install/upgrade Meshtastic-python manually, see below:

```bash title="Install Meshtastic-python (includes CLI)"
pip install meshtastic
```

```bash title="Upgrade Meshtastic-python (includes CLI)"
pip install --upgrade meshtastic
```

:::note
Some installations of python may require you to substitute 'pip3' for the 'pip' command.
:::

#### Verify Connection

After installing, run one of the following commands to see if the device is communicating correctly.

```bash title="View connected node info"
meshtastic --info
```

```bash title="View nodes detected on mesh"
meshtastic --nodes
```

For more details about CLI usage, see the [settings](/docs/settings) pages or [CLI guide](/docs/software/python/python-cli).

### Mobile Client Downloads

<ul
  style={{
    position: "relative",
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    paddingLeft: "0",
  }}
>
<DownloadCard
  client="Android"
  imgUrl="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
  url="https://play.google.com/store/apps/details?id=com.geeksville.mesh&referrer=utm_source=downloads-page"
  notes={["To sideload, ",<a href="https://github.com/meshtastic/Meshtastic-Android/releases/latest" rel="noreferrer" target="_blank">download the latest .apk</a>," from Github", ]}
/>
<DownloadCard
  client="iOS"
  url="https://testflight.apple.com/join/c8nNl8q1"
  buttonText="Download on TestFlight"
  notes="Currently only available in TestFlight"
/>
</ul>

### Serial

Using your preferred program (PuTTy, Serial, etc) connect to your device with the following settings to see the logs in real time.

| Baudrate | Data Bits | Parity | Stop Bits |
| :------: | :-------: | :----: | :-------: |
| `921600` |    `8`    | `None` |    `1`    |

### Web

<!--- FIXME add self hosting details link --->

The web interface is available for all browsers, but [bluetooth and serial capabilities are limited](https://github.com/meshtastic/meshtastic.js#compatibility). You can connect to your node using:

- [client.meshtastic.org](https://client.meshtastic.org)
  - BLE
  - HTTP
  - Serial
- [ESP32 WiFi SoftAP](/docs/settings/wifi#software-access-point)
- [ESP32 as Client](/docs/settings/wifi#wifi-client)

The Meshtastic firmware incorporates an embedded web server using the [ESP32 HTTPS Server](https://github.com/fhessel/esp32_https_server) project. This allows the WiFi supporting ESP32 devices to run our web interface to access Meshtastic directly from your browser. This imports the [Meshtastic.js library](/docs/software/js/getting-started) to provide a web page capable of interacting with the device.

There is active development ongoing to fix some issues with updating the web interface from the web interface directly. Please be patient with us as we work on this. Use [Meshtastic-flasher](/docs/getting-started/meshtastic-flasher) to update your device to the current stable build which includes the web interface.
