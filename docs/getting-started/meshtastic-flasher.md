---
id: meshtastic-flasher
title: Using Meshtastic Flasher GUI
sidebar_label: Meshtastic Flasher GUI
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

Install Meshtastic Flasher by either [downloading the executable file](https://github.com/meshtastic/Meshtastic-gui-installer/releases) or installing using `pip`. The following operating systems are: Windows, Mac, and Ubuntu.

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
  pip install meshtastic-flasher
  ```

  ```bash title="Running Meshtastic Flasher"
  meshtastic-flasher
  ```

  </TabItem>
  <TabItem value="macos">

  ```bash title="Install Meshtastic Flasher"
  pip install meshtastic-flasher
  ```

  ```bash title="Running Meshtastic Flasher"
  meshtastic-flasher
  ```

  </TabItem>
  <TabItem value="windows">

  ```bash title="Install Meshtastic Flasher"
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
