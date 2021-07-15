---
id: flashing-nrf52
title: Flashing nRF52 devices firmware
sidebar_label: nRF52 devices
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Pre-requisits

Please ensure that you use a data USB cable, as some cables provide power only and not the data lines.

### T-Echo

You may need to install the [USB device drivers](http://www.wch-ic.com/search?q=ch340&t=downloads) if your device does not show up when connected.

### WisBlock RAK4631

Please ensure that you have updated the bootloader to the latest version using the information on the [RAK Documentation Center](https://docs.rakwireless.com/Product-Categories/WisBlock/RAK4631/Quickstart/#how-to-check-if-you-have-the-updated-rak4631-bootloader) website.
## Download Latest Firmware

Prebuilt binaries for the supported radios are available in our releases. Your initial installation has to happen over USB from your Mac, Windows or Linux PC. Once our software is installed, all future software updates happen over bluetooth from your phone.

<!--- TODO I'd like to create prettier buttons for this than just a table --->
| [Current Firmware](https://github.com/meshtastic/meshtastic-device/releases/latest) | [List of Firmware Versions](https://github.com/meshtastic/meshtastic-device/releases/) |
| :--------------: | :-----------------------: |

## Install/Update Firmware
:::caution
Be careful to install the correct load for your board. While it is unlikely that you will cause damage to your device, the wrong firmware will cause it to not work.
:::


* Connect your device to your computer with a USB cable. If you computer complains about needing to format a new drive, cancel the format command.
* Double click the reset button on your device, this will put it into boot loader mode.
* A new drive will then be mounted on your computer. Open this drive and you should see three files: `CURRENT.UF2`, `INDEX.HTM`, and `INFO_UF2.TXT`
* Copy the appropriate `firmware-xxxxx-1.2.x.uf2` file from the firmware zip file onto the new drive.
* Once the file has finished copying over, the device will reboot, loading the new firmware as it does.
