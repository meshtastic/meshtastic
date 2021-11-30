---
id: flashing-nrf52
title: Flashing nRF52 devices firmware
sidebar_label: nRF52 devices
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Pre-requisits

:::tip
Please ensure that you use a data USB-C cable, as many USB-C cables provide power only and not the data lines. 
::: 

### T-Echo

:::tip
The usb-C to usb-A cable from LILYGO is *NOT* a "data cable", and can only be used for charging. 
:::


#### Windows:

You may need to install the [USB device drivers](http://www.wch-ic.com/search?q=ch340&t=downloads) if your device does not show up when connected.

#### Mac OS

Last Verified T-Echo nRF52840 on: Mac OS Monterey v12.0.1 (Intel chipset)

:::tip
You can use the latest [Apple USB-C Charge cables](https://www.apple.com/shop/product/MLL82AM/A/usb-c-charge-cable-2-m). The cable that is provided with the iPad Pro works. Older Laptop usb-C Power cables will *NOT* work, as they are missing the data lines.
:::

:::caution
With the latest versions of MacOS, the USB Serial driver is built-in. Do *NOT* download any USB device drivers - this will actually prevent you from connecting to your T-Echo from your Mac. If you downloaded/installed any already, please Remove them.
:::

<details>
  <summary>Removing the CH34x (CH340/CH341) USB Drivers</summary>
  <div>
    <div>
        If you have already downloaded/installed the MacOS WCH-IC CH340 ("CH341SER_MAC") drivers via the `CH34x_Install_V1.5.pkg`, you will have to Uninstall the kernel extension:
        <br />
        <br />
        1.) Unplug your T-Echo<br />
        2.) Open the Terminal and run:<br />
        3.) sudo -rf /Library/Extensions/usbserial.kext`<br />
        4.) Reboot
    </div>
  </div>
</details>


Verify successful connections with:

* Plug in your T-Echo
* Open the Terminal
* `ls -l /dev/tty.usbmodem*`

If the device file exists, you will also notice a "TECHOBOOT" volume in the Finder, or in the Terminal after double-clicking the Reset Button (see below) 

* `ls /Volumes/TECHOBOOT`

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
* Double click the `Reset` button on your device, this will put it into boot loader mode.

[<img alt="LILYGO T-Echo" src="/img/hardware/t-echo-lilygo.jpg" style={{zoom:'25%'}}  />](/img/hardware/t-echo-lilygo.jpg)

* A new drive will then be mounted on your computer. Open this drive and you should see three files: `CURRENT.UF2`, `INDEX.HTM`, and `INFO_UF2.TXT`
* Copy the appropriate `firmware-xxxxx-1.2.x.uf2` file from the firmware zip file onto the new drive.

:::note
You are going to copy/drop "as is" 'firmware-xxxxx-1.2.x.uf2' (*NOT* over the "CURRENT.UF2" file) in the volume, and the device reboot will copy it/load it correctly.
:::

* Once the file has finished copying over, the device will reboot, loading the new firmware as it does.
