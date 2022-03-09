---
id: build-env
title: Creating a build environment
sidebar_label: Building Meshtastic
---

Meshtastic uses the [PlatformIO](https://platformio.org) development environment, that enables easy multiplatform development and centralized tooling.

## Setup

1. Install PlatformIO, following the instructions available [here](https://platformio.org/platformio-ide).
2. Clone the `meshtastic-device` repository located [here](https://github.com/meshtastic/meshtastic-device). ([Instructions on cloning](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository))
3. Some utilities and scripts use the Python programming language, Downloads available [here](https://www.python.org/downloads).

## Building

1. Open the newly cloned folder in [Visual Studio Code](https://code.visualstudio.com).
1. To select the device you you wish to build for, first open your [command palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) (`Ctrl + Shift + P`) and enter: `platformio: Switch Project Environment` and select your target.
1. To build the firmware, simply run `PlatformIO: Build` from your command palette.
1. Finally flashing the firmware to your device is as easy as running `PlatformIO: Upload`
