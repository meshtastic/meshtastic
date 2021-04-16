---
id: macos
title: Flashing Firmware – MacOS
sidebar_label: MacOS
---
:::note
To check if you have a data cable that will work, plug in your device and **then** navigate to `Apple Menu  > About This Mac > System Report... > Hardware > USB`
you should see something like `CP210X USB to UART Bridge Controller`.
:::

## Download Firmware

<!--- TODO add buttons to links --->
Download the [latest](https://github.com/meshtastic/meshtastic-device/releases/latest) firmware release. Unzip the file and locate the correct device and region within the list of prebuilt binaries.

## Command Line Instructions

OS X comes with `Python 2.7` installed, but not `pip`. The following uses Homebrew to install `python3` which includes `pip3`. On MacOS you will use `pip3` instead of `pip`.

:::note
Check if you have Homebrew installed with the following command
```bash
brew -v
```
If it's not installed, follow the instructions on the [Homebrew website](https://brew.sh) before continuing.
:::

1. Install Python3
```bash
brew install python3
```
2. Confirm `pip3` was installed alongside `python3`
```bash
pip3 -v
```
3. Install `esptool`
```bash
pip3 install --upgrade esptool
```

:::note
You may need to install a driver from Silicon Labs for the [CP210X USB to UART bridge](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)
:::

4. Connect your radio to your USB port.
5. Confirm that your device is talking to your Mac by running the following command in Terminal.
```bash title="Command"
esptool.py chip_id
```
```bash title="Expected Output"
# You should see a result similar to this:
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
6. `cd` into the directory where you unzipped the latest release. For example:
```bash title="Example"
cd /Downloads/firmware/
```
7. Install the correct firmware for your board with
:::caution
Be very careful to install the correct load for your board. In particular the popular 'T-BEAM' radio from TTGO is not called 'TTGO-Lora' (that is a different board). So don't install the 'TTGO-Lora' build on a TBEAM, it won't work correctly.
:::
```bash title="Command"
./device-install.sh -f firmware-BOARD-VERSION.bin
```
```bash title="Example"
./device-install.sh -f firmware-heltec-EU865-1.2.0.bin
```
8. To update a the firmware on an existing Meshtastic device, run
```bash title="Command"
./device-update.sh -f firmware-BOARD-VERSION.bin
```
```bash title="Example"
./device-update.sh -f firmware-heltec-EU865-1.2.0.bin
```

## Graphical User Interface Instructions

1. Download [ESPHome Flasher](https://github.com/esphome/esphome-flasher)
2. Connect your radio to your USB port.
3. Open ESPHome Flasher. There should be no installation required.
:::note
If you get an error saying `The application "ESPHome-Flasher.app" can't be opened` it is likely a permissions issue. See [here](https://github.com/esphome/esphome-flasher/issues/26#issuecomment-671061140) for instructions.
:::
:::note
If you get an error saying `"ESPHome-Flasher.app" cannot be opened because the developer cannot be verified`, click `cancel`. Right click on the application and select `Open`. Select `Open` on the confirmation alert.
:::

4. If your board is not showing under `Serial Port` then you may need to install the drivers for the [CP210X USB to UART bridge](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers).
5. In ESPHome Flasher, refresh the serial ports and select the port to which your board is connected.
6. Browse to the previously downloaded firmware and select the correct firmware based on the board type.
7. Select Flash ESP.
8. Once complete, “Done! Flashing is complete!” will be shown.
