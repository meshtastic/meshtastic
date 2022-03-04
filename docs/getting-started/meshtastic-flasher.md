---
id: meshtastic-flasher
title: Using Meshtastic Flasher
sidebar_label: Using Meshtastic Flasher
pagination_next: getting-started/clients
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

Meshtastic Flasher is a graphical user interface for flashing [supported devices](/docs/hardware) with Meshtastic.

## Prerequisites

Install Meshtastic Flasher by either [downloading the executable file](https://github.com/meshtastic/Meshtastic-gui-installer/releases) or installing using `pip`. The following operating systems are currently supported: Windows, Mac, and Ubuntu.

### Check Data Cable

Plug your device into your computer using a USB cable and then do the following:
:::important
You may need to install a driver from Silicon Labs for the [CP210X USB to UART bridge](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)

Some newer boards may require the drivers for the [CH9102 Windows](http://www.wch.cn/downloads/CH343SER_ZIP.html) or [Direct Download](https://github.com/Xinyuan-LilyGO/CH9102_Driver) for Windows 7. For [CH9102 Mac](http://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html). Click the big blue button with the down arrow. Be sure to open up the application and click "Install" after the package is installed. Also, reboot.
:::

<Tabs
groupId="operating-system"
defaultValue="linux"
values={[
{label: 'Linux', value: 'linux'},
{label: 'macOS', value: 'macos'},
{label: 'Windows', value: 'windows'},
]}>
<TabItem value="linux">

Connect your Meshtastic device to your USB port, open a `Terminal` and enter the following command:

```bash
lsusb
```

You should see something like: `ID 10c4:ea60 Silicon Labs CP210x UART Bridge` for CP210X or `ID 1a86:55d4 QinHeng Electronics USB Single Serial` for CH9102

  </TabItem>
  <TabItem value="macos">

Navigate to `Apple Menu  > About This Mac > System Report... > Hardware > USB`. You should see something like `CP210X USB to UART Bridge Controller`. If not download the appropriate drivers

  </TabItem>
  <TabItem value="windows">

Navigate to `Device Manager > Ports (COM & LPT)`. You should see something like `Silicon Labs CP210X USB to UART Bridge (COM5)`. If not download the appropriate drivers

  </TabItem>
</Tabs>

### Install using `pip`
<Tabs
groupId="operating-system"
defaultValue="linux"
values={[
{label: 'Linux', value: 'linux'},
{label: 'macOS', value: 'macos'},
{label: 'Windows', value: 'windows'},
]}>
  <TabItem value="linux">

  ```bash title="Install Meshtastic Flasher"
  python3 --version
  # ensure you are using at least python v3.6
  # change to a directory where you want to create a python virtual environment
  mkdir some_dir
  cd some_dir
  # if the following command fails, it might tell you what package to install
  python3 -m venv venv
  # activate the python virtual environment
  source venv/bin/activate
  # your prompt should change - it should include "(venv) in the front
  # upgrade pip
  pip install --upgrade pip
  pip install meshtastic-flasher
  ```

  ```bash title="Running Meshtastic Flasher"
  meshtastic-flasher
  ```

  </TabItem>
  <TabItem value="macos">

  ```bash title="Install Meshtastic Flasher"
  python3 --version
  # ensure you are using at least python v3.6
  # change to a directory where you want to create a python virtual environment
  mkdir some_dir
  cd some_dir
  python3 -m venv venv
  # activate the python virtual environment
  source venv/bin/activate
  # your prompt should change - it should include "(venv) in the front
  # upgrade pip
  pip install --upgrade pip
  pip install meshtastic-flasher
  ```

  ```bash title="Running Meshtastic Flasher"
  meshtastic-flasher
  ```

  </TabItem>
  <TabItem value="windows">

  ```bash title="Install Meshtastic Flasher"
  # open a command prompt
  # create a new directory for the python virtual environment
  cd c:\
  mkdir some_dir
  cd some_dir
  # check that python version is sufficient, must be at least v3.9+
  python -m venv venv
  # activate the python virtual environment
  venv\Scripts\activate
  # your prompt should change - it should have (venv) at the beginning
  pip install meshtastic-flasher
  ```

  ```bash title="Running Meshtastic Flasher"
  meshtastic-flasher
  ```

  </TabItem>
</Tabs>

## Flashing the Device

The Meshtastic Flasher will flash the latest firmware to esp32 and nrf52 devices. This is a newly developed application (as of February 1, 2022), so there may be some issues discovered as it is tested by users.

There are three steps:

* Click the "GET VERSIONS" button to get the versions available (from GitHub).
* Click the "DETECT DEVICE" button to determine the port and device variant connected.
* Click the "FLASH" button to flash the version selected, using the port selected to the device.

## Issues?

If you run into an issue, please create a ticket here: [Flasher Issues](https://github.com/meshtastic/Meshtastic-gui-installer/issues)

The code can be found at the [Meshtastic-gui-installer repo](https://github.com/meshtastic/Meshtastic-gui-installer)

## Known limitations

The following are known limitations:

* Raspberry Pi is not available, since it is arm-based and there are no pre-built libraries for [PySide](https://wiki.qt.io/Qt_for_Python)
* Ubuntu 20.04 is the version used for testing, it may work with other versions
* see [README](https://github.com/meshtastic/Meshtastic-gui-installer/blob/master/README.md) for more details
