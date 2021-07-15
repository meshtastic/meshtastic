---
id: flashing-esp32
title: Flashing ESP32 devices firmware
sidebar_label: ESP32 devices
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

### Check Data Cable

<Tabs
  groupId="operating-system"
  defaultValue="linux"
  values={[
    {label: 'Linux', value: 'linux'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows', value: 'windows'},
  ]}>
  <TabItem value="linux">

  To check if you have a data cable that will work, plug your device into the computer and **then** navigate to `Terminal` and enter the following command:
  ```bash
  lsusb
  ```
  you should see something like `CP210X USB to UART Bridge Controller`.

:::note
You may need to install a driver from Silicon Labs for the [CP210X USB to UART bridge](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)
:::

  </TabItem>
  <TabItem value="macos">

  To check if you have a data cable that will work, plug your device into the computer and **then** navigate to `Apple Menu  > About This Mac > System Report... > Hardware > USB` you should see something like `CP210X USB to UART Bridge Controller`.

:::note
You may need to install a driver from Silicon Labs for the [CP210X USB to UART bridge](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)
:::


  </TabItem>
  <TabItem value="windows">

  To check if you have a data cable that will work, plug your device into the computer and navigate to `Device Manager > Ports` and ensure the device is shown. You should see something like `CP210X USB to UART Bridge Controller`.

  If your device is showing up under `Device Manager > Ports > Other Devices` you need to install the driver from Silicon Labs for the CP210X USB to UART bridge

:::note
You may need to install a driver from Silicon Labs for the [CP210X USB to UART bridge](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)
:::

  </TabItem>
</Tabs>

### Download Latest Firmware

Prebuilt binaries for the supported radios are available in our releases. Your initial installation has to happen over USB from your Mac, Windows or Linux PC. Once our software is installed, all future software updates happen over bluetooth from your phone.

<!--- TODO I'd like to create prettier buttons for this than just a table --->
| [Current Firmware](https://github.com/meshtastic/meshtastic-device/releases/latest) | [List of Firmware Versions](https://github.com/meshtastic/meshtastic-device/releases/) |
| :--------------: | :-----------------------: |

:::note
The [T-Beam 0.7](../hardware/tbeam-hardware#t-beam---v07) board is an earlier version of the T-Beam board, and due to changes in the design in subsequent iterations this board uses a specific firmware file different from the other T-Beam boards.

`firmware-tbeam0.7-1.x.x.bin` is the correct firmware. `firmware-tbeam-1.x.x.bin` is incompatible. For all other [T-Beam](../hardware/tbeam-hardware) boards `firmware-tbeam-1.x.x.bin` is the correct selection.
:::

## Command Line Interface Instructions

### Install Prerequisite Software

<Tabs
  groupId="operating-system"
  defaultValue="linux"
  values={[
    {label: 'Linux', value: 'linux'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows', value: 'windows'},
  ]}>
  <TabItem value="linux">

  Check if you have `python3` and `pip` installed with the following command
  ```bash
  python3 --version
  pip3 --version
  ```
  If `python3` is not installed, install with
  ```bash
  sudo apt-get update
  sudo apt-get install python3.6
  ```
  If `pip` is not installed, install with
  ```bash
  sudo apt-get install python3-pip
  ```

  </TabItem>
  <TabItem value="macos">

  OS X comes with `Python 2.7` installed, but not `pip`. The following uses Homebrew to install `python3` which includes `pip3`. On MacOS you will use `pip3` instead of `pip`.

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

  </TabItem>
</Tabs>


### Install `esptool`

<Tabs
  groupId="operating-system"
  defaultValue="linux"
  values={[
    {label: 'Linux', value: 'linux'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows', value: 'windows'},
  ]}>
  <TabItem value="linux">

  ```bash
  pip install --upgrade esptool
  ```

  </TabItem>
  <TabItem value="macos">

  ```bash
  pip3 install --upgrade esptool
  ```

  </TabItem>
  <TabItem value="windows">

  ```bash
  pip install --upgrade esptool
  ```

  </TabItem>
</Tabs>



### Confirm Communication With Chip

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
cd /Downloads/firmware/
```

### Install/Update Firmware
:::caution
Be very careful to install the correct load for your board. In particular the popular 'T-BEAM' radio from TTGO is not called 'TTGO-Lora' (that is a different board). So don't install the 'TTGO-Lora' build on a TBEAM, it won't work correctly.
:::

#### Install Firmware

Install the correct firmware for your board using the following command. Be sure to select the correct board and frequency.
```bash title="Command"
./device-install.sh -f firmware-BOARD-VERSION.bin
```
```bash title="Example"
./device-install.sh -f firmware-heltec-EU865-1.2.0.bin
```


#### Update Firmware

To update a the firmware on an existing Meshtastic device use the following command. Be sure to select the correct board and frequency.
```bash title="Command"
./device-update.sh -f firmware-BOARD-VERSION.bin
```
```bash title="Example"
./device-update.sh -f firmware-heltec-EU865-1.2.0.bin
```

## Graphical User Interface Instructions


### Download `ESPHome Flasher`

:::note
ESPHome Flasher also provides instructions to build from source or install via `pip` on their [README](https://github.com/esphome/esphome-flasher/).
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

  | [ESPHome Flasher](https://github.com/esphome/esphome-flasher/releases/latest) |
  | :-----------------------------------------------------------: |

:::note
ESPHome Flasher for linux is a prebuilt binary for Ubuntu. These instructions were only tested on Ubuntu. Mileage may very on other distros.
:::

  </TabItem>
  <TabItem value="macos">

  | [ESPHome Flasher](https://github.com/esphome/esphome-flasher/releases/latest) |
  | :-----------------------------------------------------------: |


  </TabItem>
  <TabItem value="windows">

  | [ESPHome Flasher](https://github.com/esphome/esphome-flasher/releases/latest) |
  | :-----------------------------------------------------------: |


  </TabItem>
</Tabs>

### Open ESPHome Flasher


<Tabs
  groupId="operating-system"
  defaultValue="linux"
  values={[
    {label: 'Linux', value: 'linux'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows', value: 'windows'},
  ]}>
  <TabItem value="linux">

  There should be no installation required. Connect your device using a data USB cable and refresh the `Serial Port`. Select the port that your device is connected to.

  </TabItem>
  <TabItem value="macos">

  There should be no installation required. Connect your device using a data USB cable and refresh the `Serial Port`. Select the port that your device is connected to.

:::note
If you get an error saying `The application "ESPHome-Flasher.app" can't be opened` it is likely a permissions issue. See [here](https://github.com/esphome/esphome-flasher/issues/26#issuecomment-671061140) for instructions.
:::
:::note
If you get an error saying `"ESPHome-Flasher.app" cannot be opened because the developer cannot be verified`, click `cancel`. Right click on the application and select `Open`. Select `Open` on the confirmation alert.
:::

  </TabItem>
  <TabItem value="windows">

  There should be no installation required. Connect your device using a data USB cable and refresh the `Serial Port`. Select the port that your device is connected to.

  </TabItem>
</Tabs>

:::note
If your device is not showing under `Serial Port` you may need to install the drivers for the [CP210X USB to UART bridge](https://www.silabes.com/products/development-tools/sofware/usb-to-uart-bridge-vcp-drivers).
:::

### Select Firmware

Browse to the previously downloaded firmware and select the correct firmware based on the board type and frequency.

:::caution
Be very careful to install the correct load for your board. In particular the popular 'T-BEAM' radio from TTGO is not called 'TTGO-Lora' (that is a different board). So don't install the 'TTGO-Lora' build on a TBEAM, it won't work correctly.
:::

### Flash Firmware

Select `Flash ESP`. It may take a minute or two. Once complete, "Done! Flashing is complete!" will be shown.

## Over the Air Update Instructions

OTA updates are only currently available on Android.

<!--- TODO --->
