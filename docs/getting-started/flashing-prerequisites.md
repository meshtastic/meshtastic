---
id: flashing-prerequisites
title: Firmware Flashing Prerequisites
sidebar_label: Prerequisites
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

Before you flash your device, you may need to install drivers on your computer in order to communicate with it. Once installed, be sure to reboot your computer to verify the installation is complete.

## Prerequisites

### Verify data cord

A data cable will charge your device, but a charging cable will not be able to flash the device or communicate with it. Verify you have a data cable before proceeding. There's no official way to determine the difference in cables, trying out a few cables will be the best way to verify.

If you have a data cable, you may find that you don't need to install a driver by checking the instructions below.

<Tabs
  groupId="operating-system"
  defaultValue="linux"
  values={[
  {label: 'Linux', value: 'linux'},
  {label: 'macOS', value: 'macos'},
  {label: 'Windows', value: 'windows'},
  ]}>
  <TabItem value="linux">
Connect your Meshtastic device to your USB port, open a `Terminal` and enter the following command:

```bash
lsusb
```

You should see something like: `ID xxxx:xxxx Silicon Labs CP210x UART Bridge`, `ID xxxx:xxxx QinHeng Electronics USB Single Serial`, or `FIXME (WISBLOCK OUTPUT)`.
  </TabItem>
  <TabItem value="macos">

Navigate to `Apple Menu  > About This Mac > System Report... > Hardware > USB`. You should see something like `CP210X USB to UART Bridge Controller`, `CH9102 USB to UART Bridge Controller`, or `WisCore RAK4631 Board`. If not download the appropriate drivers below.

  </TabItem>
  <TabItem value="windows">

Navigate to `Device Manager > Ports (COM & LPT)`. You should see something like `Silicon Labs CP210X USB to UART Bridge (COM5)`, `Silicon Labs CH9102 USB to UART Bridge (COM5)`, or `FIXME (WISBLOCK OUTPUT)`. If not download the appropriate drivers below.

  </TabItem>
</Tabs>

## Install Appropriate Drivers

:::important
Reboot your computer after you have installed the driver to complete the installation.
:::

### ESP32 Drivers

You may need to install a driver from Silicon Labs for the [CP210X USB to UART bridge](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)

Some newer boards may require the CH9102 Driver.

<Tabs
  groupId="operating-system"
  defaultValue="linux"
  values={[
  {label: 'Linux', value: 'linux'},
  {label: 'macOS', value: 'macos'},
  {label: 'Windows', value: 'windows'},
  ]}>
  <TabItem value="linux">

[CP210X USB to UART bridge - Download](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)

[CH9102 Driver - Linux Download](http://www.wch-ic.com/downloads/CH341SER_LINUX_ZIP.html)

  </TabItem>
  <TabItem value="macos">

[CP210X USB to UART bridge - Download](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)

[CH9102 Driver - MacOS Download](http://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html)

  </TabItem>
  <TabItem value="windows">

[CP210X USB to UART bridge - Download](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)

[CH9102 Driver - Windows Download](http://www.wch.cn/downloads/CH343SER_ZIP.html)

[CH9102 Driver - Windows Download (Direct Download for Windows 7)](https://github.com/Xinyuan-LilyGO/CH9102_Driver)

  </TabItem>
</Tabs>

### NRF52 Drivers

<Tabs
  groupId="operating-system"
  defaultValue="linux"
  values={[
  {label: 'Linux', value: 'linux'},
  {label: 'macOS', value: 'macos'},
  {label: 'Windows', value: 'windows'},
  ]}>
  <TabItem value="linux">

[CH9102 Driver - Linux Download](http://www.wch-ic.com/downloads/CH341SER_LINUX_ZIP.html)

  </TabItem>
  <TabItem value="macos">

[CH9102 Driver - MacOS Download](http://www.wch-ic.com/downloads/CH341SER_MAC_ZIP.html)

:::caution
With the latest versions of MacOS, the USB Serial driver is built-in. Do _NOT_ download the USB device drivers unless required. If you downloaded/installed any already, please remove them:

<details>
  <summary>Removing the CH34x (CH340/CH341) USB Drivers</summary>
  <div>
    <div>
        If you have already downloaded/installed the MacOS WCH-IC CH340 ("CH341SER_MAC") drivers via the CH34x_Install_V1.5.pkg, you will have to Uninstall the kernel extension:
        <br />
        <br />
        1. Unplug your T-Echo<br />
        2. Open the Terminal and run:<br />
        3. sudo -rf /Library/Extensions/usbserial.kext<br />
        4. Reboot
    </div>
  </div>
</details>

:::


  </TabItem>
  <TabItem value="windows">

[CH9102 Driver - Windows Download](http://www.wch-ic.com/downloads/CH341SER_EXE.html)

  </TabItem>
</Tabs>
