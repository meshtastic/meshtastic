---
id: flashing-esp32
title: Flashing ESP32 devices firmware
sidebar_label: ESP32 devices
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

### Device connectivity

Ensure your computer is communicating with the device correctly by following [these instructions](flashing-firmware).

### Download Latest Firmware

Firmware can be downloaded from the [Downloads](/downloads) page. Your initial installation has to happen over USB from your Mac, Windows, or Linux computer. Over the air updates are currently only available using the Android application after this initial installation.

:::note
The [T-Beam 0.7](/docs/hardware/supported/tbeam#t-beam---v07) board is an earlier version of the T-Beam board, and due to changes in the design in subsequent iterations this board uses a specific firmware file different from the other T-Beam boards.

`firmware-tbeam0.7-1.x.x.bin` is the correct firmware. `firmware-tbeam-1.x.x.bin` is incompatible. For all other [T-Beam](/docs/hardware/supported/tbeam) boards `firmware-tbeam-1.x.x.bin` is the correct selection.
:::

## Command Line Interface Instructions

<Tabs
groupId="operating-system"
defaultValue="linux"
values={[
{label: 'Linux', value: 'linux'},
{label: 'macOS', value: 'macos'},
{label: 'Windows', value: 'windows'},
]}>
<TabItem value="linux">

### Install Prerequisite Software

Check if you have `python3` and `pip` installed with the following command

```bash
python3 --version
pip3 --version
```

If `python3` is not installed, install with

```bash
sudo apt-get update
sudo apt-get install python3
```

If `pip` is not installed, install with

```bash
sudo apt-get install python3-pip
```

### Install `esptool`

```bash
pip3 install --upgrade esptool
```

  </TabItem>
  <TabItem value="macos">

### Install Prerequisite Software

OS X comes with `Python 2.7` installed, but not `pip`. The following uses Homebrew to install `python3` which includes `pip3`. On MacOS you will use `pip3` instead > of `pip`.

:::note
Check if you have Homebrew installed with the following command

```bash
brew -v
```

If it's not installed, follow the instructions on the [Homebrew website](https://brew.sh) before continuing.
:::

Check if you have `python3` and `pip` installed with the following command

```bash
python3 --version
pip3 --version
```

If `python3` is not installed, install with
Install Python3

```bash
brew install python3
```

Confirm `pip3` was installed alongside `python3`

```bash
pip3 -v
```

### Install `esptool`

```bash
pip3 install --upgrade esptool
```

  </TabItem>
  <TabItem value="windows">

- Download and install [Python](https://www.python.org/). When installing, make sure to click `Add Python X.Y to PATH`.
- Download and install [Gitbash](https://gitforwindows.org/) (or other appropriate shell) and run all subsequent commands from that shell.

:::note
Confirm installation of `python` & `pip` with the following commands.

```bash
py --version
```

```bash
pip --version
```

:::

### Install `esptool`

```bash
pip install --upgrade esptool
```

  </TabItem>
</Tabs>

### Confirm Communication With Chip

<Tabs
groupId="operating-system"
defaultValue="linux"
values={[
{label: 'Linux', value: 'linux'},
{label: 'macOS', value: 'macos'},
{label: 'Windows', value: 'windows'},
]}>
  <TabItem value="linux"></TabItem>
  <TabItem value="macos"></TabItem>
  <TabItem value="windows">

:::important
On Windows, you must explicitly declare esptool as a .py script. Use `esptool.py chip_id`.
:::

  </TabItem>
</Tabs>

Connect the radio to your computer using a data USB cable. Confirm your device is talking to your computer using the following command:

```bash title="Command"
esptool chip_id
```

```bash title="Expected Output"
# You should see a result similar to this:
mydir$ esptool chip_id
esptool.py v2.6
Found 2 serial ports
Serial port /dev/ttyUSB0
Connecting....
Detecting chip type... ESP32
Chip is ESP32D0WDQ6 (revision 1)
Features: WiFi, BT, Dual Core, 240MHz, VRef calibration in efuse, Coding Scheme None
MAC: 24:6f:28:b5:36:71
Uploading stub...
Running stub...
Stub running...
Warning: ESP32 has no Chip ID. Reading MAC instead.
MAC: 24:6f:28:b5:36:71
Hard resetting via RTS pin...
```

### Navigate to Firmware

`cd` into the directory where you unzipped the latest release. For example:

```bash title="Example"
cd ~/Downloads/firmware/
```

### Install/Update Firmware

Install or Update the device that you have by using the following commands according to your operating system:

:::caution
Be very careful to install the correct load for your board. In particular the popular 'T-BEAM' radio from TTGO is not called 'TTGO-Lora' (that is a different board). So don't install the 'TTGO-Lora' build on a TBEAM, it won't work correctly.
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

#### Install

```bash title="Command"
./device-install.sh -f firmware-BOARD-VERSION.bin
```

#### Update

```bash title="Command"
./device-update.sh -f firmware-BOARD-VERSION.bin
```

  </TabItem>
  <TabItem value="macos">

#### Install

```bash title="Command"
./device-install.sh -f firmware-BOARD-VERSION.bin
```

#### Update

```bash title="Command"
./device-update.sh -f firmware-BOARD-VERSION.bin
```

  </TabItem>
  <TabItem value="windows">

#### Install

```bash title="Command"
./device-install.bat -f firmware-BOARD-VERSION.bin
```

#### Update

```bash title="Command"
./device-update.bat -f firmware-BOARD-VERSION.bin
```

  </TabItem>
</Tabs>

### Select Firmware

Browse to the previously downloaded firmware and select the correct firmware based on the board type and frequency.

:::caution
Be very careful to install the correct load for your board. In particular the popular 'T-BEAM' radio from TTGO is not called 'TTGO-Lora' (that is a different board). So don't install the 'TTGO-Lora' build on a TBEAM, it won't work correctly. If you flash the incorrect firmware: It may appear to flash correctly, but if your device has a screen it might stay blank. On-board radio peripherals might be damaged because of GPIO pin direction, but you should just try to flash with the correct version.
:::

### Flash Firmware

Select `Flash ESP`. It may take a minute or two. Once complete, "Done! Flashing is complete!" will be shown.

## Over the Air Update Instructions

OTA updates are only currently available on Android.

<!--- TODO --->
