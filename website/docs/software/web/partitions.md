---
id: web-partitions-software
title: Managing ESP32 partitions
sidebar_label: ESP32 partitions
---

## Insufficient space to upload Meshtastic web files

This problem seems to occur when your board has the partitioning structure set incorrectly. This typically occurs when the board has had a firmware other than Meshtastic on it previously. In this situation, the file upload page on the device typically shows a free space of around 48,000 bytes, rather than the ~300,000 bytes that it should have free.

![Meshtastic.local's upload page showing insufficient storage space](https://raw.githubusercontent.com/meshtastic/Meshtastic-device/master/images/Insufficient%20space.png)

There are a number of methods that essentially involve erasing the flash and then re-uploading the Meshtastic firmware.

### Install Script

The most reliable way to fix this problem is to use the install script that is included in the meshtastic firmware zip. If that doesn’t work, these other methods may work:

### Alternative methods

#### Using the Arduino IDE:

https://meshtastic.discourse.group/t/solved-help-installing-with-other-than-esphome-flasher/2214/9

#### Using Pio in Windows
```powershell
pio run --target erase --environment tbeam
```
Then re-install the firmware ie using ESPHome Flasher

Requires: [Python](https://www.python.org/), [Pio](https://pypi.org/project/pio/), command to be run in the root directory of the meshtastic-device project once you’ve cloned it (this last requirement is an assumption based on pio not knowing what a tbeam is, may also require Visual Studio Code and PlatformIO as these were installed during use).

#### Esptool.py
@1984 posted another method using the python based esptool.py to erase and re-flash the firmware:
```bash
esptool.py --baud 921600 erase_flash
esptool.py --baud 921600 write_flash 0x1000 system-info.bin
esptool.py --baud 921600 write_flash 0x00390000 spiffs-*.bin
esptool.py --baud 921600 write_flash 0x10000 firmware-tbeam-EU865-1.1.42.bin
```

Requires: [Python](https://www.python.org/) and [esptool.py](https://github.com/espressif/esptool)

#### Visual Studio & PlatformIO
There is also the method of using the Visual Studio IDE. This requires having Visual Studio and PlatformIO installed, along with having cloned the meshtastic-device code as per the [build instructions](https://github.com/meshtastic/Meshtastic-device/blob/master/docs/software/build-instructions.md)<!-- link to be changed once build page is completed -->. After loading the project in Visual Studio, select the PlatformIO alien icon, then find the appropriate device, and then click the Erase Flash command.

![Erasing the flash using PlatformIO in Visual Studio Code](https://raw.githubusercontent.com/meshtastic/Meshtastic-device/master/images/platformio-erase.png)

https://meshtastic.discourse.group/t/configuring-channel-via-python-api/1948/17

Requires: [Visual Studio Code](https://code.visualstudio.com/), [PlatformIO](https://platformio.org/), cloned copy of the Meshtastic-device project

## How do I know it's worked?

Once it has been successfully erased and re-flashed, visiting https://192.168.42.1/static should leave you with free space on the order of 300,000 bytes, rather than the ~48,000 bytes you currently have. You can then upload the files from the meshtastic-web release.

Occasionally this may glitch when uploading the larger app.js.gz file, but a further erase and flash typically solves this.