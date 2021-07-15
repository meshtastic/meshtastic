---
id: flashing-nrf52
title: Flashing nRF52 devices firmware
sidebar_label: nRF52 devices
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Download Latest Firmware

Prebuilt binaries for the supported radios are available in our releases. Your initial installation has to happen over USB from your Mac, Windows or Linux PC. Once our software is installed, all future software updates happen over bluetooth from your phone.

<!--- TODO I'd like to create prettier buttons for this than just a table --->
| [Current Firmware](https://github.com/meshtastic/meshtastic-device/releases/latest) | [List of Firmware Versions](https://github.com/meshtastic/meshtastic-device/releases/) |
| :--------------: | :-----------------------: |


## Install/Update Firmware
:::caution
Be careful to install the correct load for your board. While it is unlikely that you will cause damage to your device, the wrong firmware will cause it to not work.
:::

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

Connect your device to your computer with a USB cable. If you computer complains about needing to format the new drive, cancel the format command.

Double click the reset button on your device, this will put it into boot loader mode.

A new drive will then appear on your computer. Open this drive and you should see three files: `CURRENT.UF2`, `INDEX.HTM`, and `INFO_UF2.TXT`

Copy the appropriate `firmware-xxxxx-1.2.x.uf2` file from the firmware zip file onto the new drive.

Once the file has finished copying over, the device will reboot, loading the new firmware as it does.

  </TabItem>
</Tabs>

