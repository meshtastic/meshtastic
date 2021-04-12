---
id: flashing_firmware_overview
title: Overview
sidebar_label: Overview
slug: /getting_started/flashing_firmware/overview
---
## Download Firmware

Prebuilt binaries for the supported radios are available in our releases. Your initial installation has to happen over USB from your Mac, Windows or Linux PC. Once our software is installed, all future software updates happen over bluetooth from your phone.

:::caution
Be very careful to install the correct load for your board. In particular the popular 'T-BEAM' radio from TTGO is not called 'TTGO-Lora' (that is a different board). So don't install the 'TTGO-Lora' build on a TBEAM, it won't work correctly.
:::


<!--- TODO I'd like to create prettier buttons for this than just a table --->
| [Current Firmware](https://github.com/meshtastic/meshtastic-device/releases/latest) | [List of Firmware Versions](https://github.com/meshtastic/meshtastic-device/releases/) |
| :--------------: | :-----------------------: |

Firmware Flashing Methods
- [Command line interface](flashing_firmware_cli)
- [Graphic user interface](flashing_firmware_gui)
- [Over the air](flashing_firmware_ota)

## Troubleshooting

For any issues during setup, search [our forum](https://meshtastic.discourse.group) to find a solution. If you can't find one, please post your problem, providing as much detail as possible.
