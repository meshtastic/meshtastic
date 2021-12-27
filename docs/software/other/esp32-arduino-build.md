---
id: esp32-arduino-build
title: esp32-arduino Build Instructions
sidebar_label: Building esp32-arduino
---

For ESP32 boards, we use our own [custom version of arduino-esp32 core](https://github.com/meshtastic/arduino-esp32). You can find the version used in the [platform_packages argument in platformio.ini](https://github.com/meshtastic/Meshtastic-device/blob/51646f28eccf0de461ecac7d771e1a39ef33ff43/platformio.ini#L119-L120) in the [Meshtastic-device repo](https://github.com/meshtastic/Meshtastic-device). It is built using a [modified esp32-arduino-lib-builder](https://github.com/meshtastic/esp32-arduino-lib-builder) which pulls the correct repos for some modified libraries. This allows for some fixes we've made that haven't yet been merged in master.

Most developers should not care about this, because you'll automatically get our fixed libraries. However, if you would like to tweak the core options this documentation describes how to do it in Linux:

[Install ESP32 Arduino Lib Builder](https://github.com/meshtastic/esp32-arduino-lib-builder/blob/master/README.md):

```console
sudo apt-get install git wget curl libssl-dev libncurses-dev flex bison gperf python python-pip python-setuptools python-serial python-click python-cryptography python-future python-pyparsing python-pyelftools cmake ninja-build ccache
sudo pip install --upgrade pip
git clone https://github.com/meshtastic/esp32-arduino-lib-builder
cd esp32-arduino-lib-builder
```
Install esp-idf (needed if you want to `make menuconfig`, `build.sh` will install it automatically if needed):

```bash
./tools/install-esp-idf.sh
``` 

Run menuconfig and change options as needed:

```bash
make IDF_PATH=$(pwd)/esp-idf menuconfig
```

[Patch the Azure_IoT library](https://github.com/VSChina/ESP32_AzureIoT_Arduino/pull/15):

```bash
cd components/arduino/libraries/AzureIoT
wget https://patch-diff.githubusercontent.com/raw/VSChina/ESP32_AzureIoT_Arduino/pull/15.patch 
patch -p1 < 15.patch
cd ../../../../
```

Build esp32-arduino:

```bash
./build.sh
```

Copy SDK files into the PlatformIO framework:

```bash
  cp -ar out/tools/sdk/* ~/.platformio/packages/framework-arduinoespressif32/tools/sdk
```

Flash the new bootloader if needed:
 
```bash
esp-idf/components/esptool_py/esptool/esptool.py --chip esp32 --port your_port --baud 921600 --before default_reset --after hard_reset write_flash -z --flash_mode dout --flash_freq 40m --flash_size detect 0x1000 build/bootloader/bootloader.bin
```
