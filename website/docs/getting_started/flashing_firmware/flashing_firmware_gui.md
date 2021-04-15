---
id: flashing_firmware_gui
title: Flashing Firmware – GUI
sidebar_label: Graphic User Interface
slug: /getting_started/flashing_firmware/gui
---

:::caution
Be very careful to install the correct load for your board. In particular the popular 'T-BEAM' radio from TTGO is not called 'TTGO-Lora' (that is a different board). So don't install the 'TTGO-Lora' build on a TBEAM, it won't work correctly.
:::

## Windows & MacOS

1. Download and unzip the latest Meshtastic firmware [release](https://github.com/meshtastic/meshtastic-device/releases/latest).
2. Download [ESPHome Flasher](https://github.com/esphome/esphome-flasher) following their installation instructions.
3. Connect your radio to your USB port and open ESPHome Flasher.
4. If your board is not showing under Serial Port then you likely need to install the drivers for the CP210X serial chip. In Windows you can check by searching “Device Manager” and ensuring the device is shown under “Ports”.
5. If there is an error, download the [drivers](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers), then unzip and run the Installer application.
6. In ESPHome Flasher, refresh the serial ports and select the port to which your board is connected.
7. Browse to the previously downloaded firmware and select the correct firmware based on the board type.
8. Select Flash ESP.
9. Once complete, “Done! Flashing is complete!” will be shown.
10. The board will boot and show the Meshtastic logo.
11. Debug messages sent from the Meshtastic device can be viewed with a terminal program such as PuTTY. Within PuTTY, click “Serial”, enter the “Serial line” com port (can be found at step 4), enter “Speed” as `921600`, then click “Open”.
