---
id: overview
title: Overview
sidebar_label: Overview
---
## Download Firmware

Prebuilt binaries for the supported radios are available in our releases. Your initial installation has to happen over USB from your Mac, Windows or Linux PC. Once our software is installed, all future software updates happen over bluetooth from your phone.

:::caution
Be very careful to install the correct load for your board. In particular the popular 'T-BEAM' radio from TTGO is not called 'TTGO-Lora' (that is a different board). So don't install the 'TTGO-Lora' build on a TBEAM, it won't work correctly.
:::

<!--- TODO I'd like to create prettier buttons for this than just a table --->
| [Current Firmware](https://github.com/meshtastic/meshtastic-device/releases/latest) | [List of Firmware Versions](https://github.com/meshtastic/meshtastic-device/releases/) |
| :--------------: | :-----------------------: |

Firmware flashing methods
- Command line interface
  - [Linux](linux#command-line-instructions)
  - [MacOS](macos#command-line-instructions)
  - [Windows](windows#command-line-instructions)
- Graphical user interface
  - [Linux](linux#graphical-user-interface-instructions)
  - [MacOS](macos#graphical-user-interface-instructions)
  - [Windows](windows#graphical-user-interface-instructions)
- [Over the air](ota)
:::note
Over the air (OTA) firmware installation is currently only available on the Android App.
:::
