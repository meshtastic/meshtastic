---
id: windows
title: Flashing Firmware – Windows
sidebar_label: Windows
---
:::note
To check if you have a data cable that will work, plug in your device and navigate to `Device Manager > Ports` and ensure the device is shown. You should see something like `CP210X USB to UART Bridge Controller`.

If your device is showing up under `Device Manager > Ports > Other Devices` you need to install the driver from Silicon Labs for the [CP210X USB to UART bridge](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)
:::
## Download Firmware

<!--- TODO add buttons to links --->
Download the [latest](https://github.com/meshtastic/meshtastic-device/releases/latest) firmware release. Unzip the file and locate the correct device and region within the list of prebuilt binaries.

## Command Line Instructions

1. Download and install [Python](https://www.python.org/). Make sure to click `Add Python X.Y to PATH`.
2. Download and install [Gitbash](https://gitforwindows.org/) (or other appropriate shell) and run all subsequent commands from that shell.
3. Confirm installation of `python` & `pip` with the following commands.
```bash
py --version
```
```bash
pip --version
```
<!--- Check on `gitbash` requirements --->
4. Install `esptool`
```bash
pip install --upgrade esptool
```
5. Connect your radio to your USB port.
6. Confirm that your device is talking to your Mac by running the following command in Terminal.
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
7. `cd` into the directory where you unzipped the latest release. For example:
```bash title="Example"
cd /Downloads/firmware/
```
8. Install the correct firmware for your board with
:::caution
Be very careful to install the correct load for your board. In particular the popular 'T-BEAM' radio from TTGO is not called 'TTGO-Lora' (that is a different board). So don't install the 'TTGO-Lora' build on a TBEAM, it won't work correctly.
:::
```bash title="Command"
./device-install.sh -f firmware-BOARD-VERSION.bin
```
```bash title="Example"
./device-install.sh -f firmware-heltec-EU865-1.2.0.bin
```
9. To update a the firmware on an existing Meshtastic device, run
```bash title="Command"
./device-update.sh -f firmware-BOARD-VERSION.bin
```
```bash title="Example"
./device-update.sh -f firmware-heltec-EU865-1.2.0.bin
```

## Graphical User Interface Instructions

:::note
ESPHome Flasher also provides instructions to build from source or install via `pip` on their README.
:::

1. Download [ESPHome Flasher](https://github.com/esphome/esphome-flasher)
2. Connect your radio to your USB port.
3. Open ESPHome Flasher. There should be no installation required.
4. If your board is not showing under `Serial Port` then you may need to install the drivers for the [CP210X USB to UART bridge](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers).
5. In ESPHome Flasher, refresh the serial ports and select the port to which your board is connected.
6. Browse to the previously downloaded firmware and select the correct firmware based on the board type.
7. Select Flash ESP.
8. Once complete, “Done! Flashing is complete!” will be shown.
