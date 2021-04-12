---
id: flashing_firmware_cli
title: Flashing Firmware – CLI
sidebar_label: Command Line Interface
slug: /getting_started/flashing_firmware/cli
---
## Linux

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
```
./device-install.sh -f firmware-heltec-1.2.x.bin
```
7. To update a the firmware on an existing Meshtastic device, run `device-update.sh -f firmware-BOARD-VERSION.bin`
```
./device-update.sh -f firmware-heltec-1.2.x.bin
```



## MacOS

Installing on OS X through the commandline uses the same method as linux, but requires a slightly different method to install Python, pip and esptool.

OS X (10.15.3/Catalina) comes with Python 2.7 installed, but not pip.

:::note
If you don't know if Homebrew is installed on your Mac, open terminal and enter the command `brew -v` if it doesn't work [install Homebrew](https://brew.sh) before continuing.
:::

1. `brew install pyenv` - Installs PyEnv
2. `pyenv install 3.7.7` - To install and select Python 3.7.7
3. `pyenv global 3.7.7` - Selects the new version of Python
4. `brew install pip` - Installs pip3
5. `pip3 install --upgrade esptool` - Installs esptool

You may need to install a driver from Silicon Labs for the [CP210X USB to UART bridge](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)

6. Now install as per installing on the Linux commandline. Replace `pip` with `pip3` in your commands.

## Windows

Requires `Python`, `pip`, `Gitbash`

1. Download and install [Python](https://www.python.org/)
2. If you have a recent version of Python, pip should be installed by default. Check using the command `py -m pip --version`. This will display the installed version of pip. If it returns an error, you will need to [install pip](https://pip.pypa.io/en/stable/installing/).
3. Download and install [Gitbash](https://gitforwindows.org/) (or other appropriate shell)
4. Run `gitbash` and complete the installation as per the instructions for linux commandline.
