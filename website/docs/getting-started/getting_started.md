---
id: overview
title: Overview
sidebar_label: Overview
slug: /getting-started
---

## Purchase a Radio

The easiest way is to [buy a device with the software already installed](https://www.aliexpress.com/item/4001178678568.html). Other devices are [available](/docs/hardware/tbeam-hardware). In the Americas get the 915mhz version, in Europe the 868Mhz, or Asia 923Mhz. See this listing by [The Things Network](https://www.thethingsnetwork.org/docs/lorawan/frequencies-by-country.html) for frequencies by specific countries.

## Setup the Radio

When it arrives, install your antenna and make sure you install the battery correctly. Reversing the battery can damage your device. Make sure the antenna is on when you power up the board.

:::caution
Make sure not to power the radio on without first attaching the antenna! You could damage the radio chip!
:::

## Download Firmware

Prebuilt binaries for the supported radios are available in our releases. Your initial installation has to happen over USB from your Mac, Windows or Linux PC. Once our software is installed, all future software updates can happen over bluetooth from your phone.

<!--- TODO I'd like to create prettier buttons for this than just a table --->
| [Current Firmware](https://github.com/meshtastic/meshtastic-device/releases/latest) | [List of Firmware Versions](https://github.com/meshtastic/meshtastic-device/releases/) |
| :--------------: | :-----------------------: |

## Flashing Firmware

If your device already has Meshtastic flashed to it, You can update it over the air (OTA). Otherwise you'll need a computer and a **data** USB cable. This can be done in the following ways:

- Install using the command line interface (CLI)
- Install using a graphical user interface (GUI)

The firmware installation method will also depend on whether you have an ESP32 based device or a nRF52 based device. See our [hardware section](/docs/hardware) to determine which microcontroller your device is based on.

## Connect to your Device

There are many ways to connect to your new radio!

- Command line interface (CLI)
- Graphic user interface (GUI)
- Serial connection
- Bluetooth
- Web app over wifi (in development)

## Troubleshooting

For any issues during setup, search [our forum](https://meshtastic.discourse.group) to find a solution. If you can't find one, please post your problem, providing as much detail as possible.

<!--- A guide to setting up your Meshtastic device.

The easiest way is to [buy a device with the software already installed](https://www.aliexpress.com/item/4001178678568.html) In the Americas get the 915mhz version, In Europe the 868Mhz or Asia 923Mhz [Frequency details](https://www.thethingsnetwork.org/docs/lorawan/frequencies-by-country.html).

Or you can install the software yourself using the instructions below.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Firmware Installation](#firmware-installation)
  - [Using GUI](#firmware-installation-gui)
  - [Using Commandline](#firmware-installation-cli)
- [Troubleshooting](#Troubleshooting)

<a name="prerequisites"></a>
## Prerequisites

- Purchased radios
- Appropriate batteries (18650)
- Computer
- Data MicroUSB Cable (not a charge only one)

<a name="firmware-installation"></a>
## Firmware Installation



<a name="firmware-installation-gui"></a>
### Installing from a GUI - Windows & MacOS

1. Download and unzip the latest Meshtastic firmware [release](https://github.com/meshtastic/Meshtastic-esp32/releases).
2. Download [ESPHome Flasher](https://github.com/esphome/esphome-flasher/releases).
3. Connect your radio to your USB port and open ESPHome Flasher.
4. If your board is not showing under Serial Port then you likely need to install the drivers for the CP210X serial chip. In Windows you can check by searching “Device Manager” and ensuring the device is shown under “Ports”.
5. If there is an error, download the [drivers](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers), then unzip and run the Installer application.
6. In ESPHome Flasher, refresh the serial ports and select the port to which your board is connected.
7. Browse to the previously downloaded firmware and select the correct firmware based on the board type.
8. Select Flash ESP.
9. Once complete, “Done! Flashing is complete!” will be shown.
10. The board will boot and show the Meshtastic logo.
11. Debug messages sent from the Meshtastic device can be viewed with a terminal program such as PuTTY. Within PuTTY, click “Serial”, enter the “Serial line” com port (can be found at step 4), enter “Speed” as 921600, then click “Open”.


<a name="firmware-installation-cli"></a>
### Installing from a Commandline - Linux

Requires `Python` and `pip`

1. Download and unzip the latest Meshtastic firmware [release](https://github.com/meshtastic/Meshtastic-esp32/releases).
2. `pip install --upgrade esptool` - Installs esptool on your machine
3. Connect your radio to your USB port
4. `esptool.py chip_id` - Confirm that your device is talking to your PC by running
You should see something like:
```
mydir$ esptool.py chip_id
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
5. `cd` into the directory where you unzipped the latest release.
6. Install the correct firmware for your board with `device-install.sh -f firmware-BOARD-VERSION.bin`
   * Example: `./device-install.sh -f firmware-heltec-1.2.x.bin`
7. To update a the firmware on an existing Meshtastic device, run `device-update.sh -f firmware-BOARD-VERSION.bin`
   * Example: `./device-update.sh -f firmware-heltec-1.2.x.bin`



### Installing from a Commandline - Mac

Installing on OS X through the commandline uses the same method as linux, but requires a slightly different method to install Python, pip and esptool.

OS X (10.15.3/Catalina) comes with Python 2.7 installed, but not pip.

1. `brew install pyenv` - Installs PyEnv
2. `pyenv install 3.7.7` - To install and select Python 3.7.7
3. `pyenv global 3.7.7` - Selects the new version of Python
4. `brew install pip` - Installs pip3
5. `pip3 install --upgrade esptool` - Installs esptool

You may need to install a driver from Silicon Labs for the [CP210X USB to UART bridge](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)

6. Now install as per installing on the Linux commandline.

### Installing from a Commandline - Windows

Requires Python, pip, Gitbash

1. Download and install [Python](https://www.python.org/)
2. If you have a recent version of Python, pip should be installed by default. Check using the command `py -m pip --version`. This will display the installed version of pip. If it returns an error, you will need to [install pip](https://pip.pypa.io/en/stable/installing/).
3. Download and install [Gitbash](https://gitforwindows.org/) (or other appropriate shell)
4. Run `gitbash` and complete the installation as per the instructions for linux commandline.

<a name="troubleshooting"></a>
## Troubleshooting

For any issues during setup, search [our forum](https://meshtastic.discourse.group) to find a solution. If you can't find one, please post your problem, providing as much detail as possible.


--->
