---
id: esp32-arduino-build-notes
title: esp32-arduino build instructions
sidebar_label: Building esp32-arduino
---

We build our own custom version of esp32-arduino, in order to get some fixes we've made but haven't yet been merged in master.

These are a set of currently unformatted notes on how to build and install them. Most developers should not care about this, because
you'll automatically get our fixed libraries.

```bash
  //last EDF release in arduino is: https://github.com/espressif/arduino-esp32/commit/1977370e6fc069e93ffd8818798fbfda27ae7d99<br/>
  //IDF release/v3.3 46b12a560
  //IDF release/v3.3 367c3c09c
  //https://docs.espressif.com/projects/esp-idf/en/release-v3.3/get-started/linux-setup.html
  python /home/kevinh/development/meshtastic/
  cp -a out/tools/sdk/* components/arduino/tools/sdk
  cp -ar components/arduino/* ~/.platformio/packages/framework-arduinoespressif32

  /// @src-fba9d33740f719f712e9f8b07da6ea13/

  or

  cp -ar out/tools/sdk/* ~/.platformio/packages/framework-arduinoespressif32/tools/sdk

```

How to flash new bootloader

```bash
esptool.py --chip esp32 --port /dev/ttyUSB0 --baud 921600 --before default_reset --after hard_reset write_flash -z --flash_mode dout --flash_freq 40m --flash_size detect 0x1000 /home/kevinh/development/meshtastic/esp32-arduino-lib-builder/build/bootloader/bootloader.bin
```
