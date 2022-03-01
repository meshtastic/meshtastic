---
id: drivers
title: Driver & Data Cord Verification
sidebar_label: Verify Drivers & Data Cord
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

Before you flash your device, you may need to install drivers on your computer in order to communicate with it. Once installed, be sure to reboot your computer to verify the installation is complete.

## Prerequisites

### Verify data cord

A data cable will charge your device, but a charging cable will not be able to flash the device or communicate with it. Verify you have a data cable before proceeding. There's no official way to determine the difference in cables, trying out a few cables will be the best way to verify. If you've installed the appropriate drivers, you should see the results below.

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

### ESP32 Drivers

<Tabs
  groupId="operating-system"
  defaultValue="linux"
  values={[
  {label: 'Linux', value: 'linux'},
  {label: 'macOS', value: 'macos'},
  {label: 'Windows', value: 'windows'},
  ]}>
  <TabItem value="linux">

  </TabItem>
  <TabItem value="macos">

  </TabItem>
  <TabItem value="windows">

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

  </TabItem>
  <TabItem value="macos">

  </TabItem>
  <TabItem value="windows">

  </TabItem>
</Tabs>
