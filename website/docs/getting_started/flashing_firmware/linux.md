---
id: linux
title: Flashing Firmware – Linux
sidebar_label: Linux
---
:::note
To check if you have a data cable that will work, plug in your device and **then** navigate to `Apple Menu  > About This Mac > System Report... > Hardware > USB`
you should see something like `CP210X USB to UART Bridge Controller`.
:::

## Download Firmware

<!--- TODO add buttons to links --->
Download the [latest](https://github.com/meshtastic/meshtastic-device/releases/latest) firmware release. Unzip the file and locate the correct device and region within the list of prebuilt binaries.

## Command Line Instructions

Requires `Python` and `pip`

1. Install `esptool`
```bash
pip install --upgrade esptool
```
2. Connect your radio to your USB port
3. Confirm that your device is talking to your Mac by running the following command in Terminal
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
4. `cd` into the directory where you unzipped the latest release. For example:
```bash title="Example"
cd /Downloads/firmware/
```
5. Install the correct firmware for your board with
:::caution
Be very careful to install the correct load for your board. In particular the popular 'T-BEAM' radio from TTGO is not called 'TTGO-Lora' (that is a different board). So don't install the 'TTGO-Lora' build on a TBEAM, it won't work correctly.
:::
```bash title="Command"
./device-install.sh -f firmware-BOARD-VERSION.bin
```
```bash title="Example"
./device-install.sh -f firmware-heltec-EU865-1.2.0.bin
```
6. To update a the firmware on an existing Meshtastic device, run
```bash title="Command"
./device-update.sh -f firmware-BOARD-VERSION.bin
```
```bash title="Example"
./device-update.sh -f firmware-heltec-EU865-1.2.0.bin
```

## Graphical User Interface Instructions

:::note
ESPHome Flasher for linux is a prebuilt binary for Ubuntu. These instructions were only testing on Ubuntu. Mileage may very on other distros. ESPHome Flasher also provides instructions to build from source or install via `pip` on their README.
:::

