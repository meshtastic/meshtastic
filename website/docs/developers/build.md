---
id: build-env
title: Creating a build/development environment
sidebar_label: Building Meshtastic
---

This project uses the simple PlatformIO build system. PlatformIO is an extension to Microsoft VSCode. Workflows from building from the GUI or from the commandline are listed below.

## GUI

1. Install [Python](https://www.python.org/downloads/).
2. Install [Git](https://git-scm.com/downloads) or [GitHub Desktop](https://desktop.github.com/)
3. Install [Microsoft Visual Studio Code](https://code.visualstudio.com/)
4. Install [PlatformIO](https://platformio.org/platformio-ide).
5. Click the PlatformIO icon on the side bar. 
        ![platformio icon](https://user-images.githubusercontent.com/47490997/89482668-77c7ea00-d7ee-11ea-8785-5faf8ff99800.png)
6. Under `Quick Access, Miscellaneous, Clone Git Project` enter the URL of the Meshtastic repo found [here](https://github.com/meshtastic/Meshtastic-device).
        ![image](https://user-images.githubusercontent.com/47490997/89483047-4c91ca80-d7ef-11ea-91f4-1d53d4e8acd9.png)
7. Select a file location to save the repo.
8. Once loaded, open the `platformio.ini` file.
9. At the line `default_envs` you can change it to the board type you are building for ie. `tlora-v2, tlora-v1, tlora-v2-1-1.6, tbeam, heltec, tbeam0.7` (boards are listed further down in the file).
10. The hardware can be configured for different countries by adding a definition to the `configuration.h` file. `#define HW_VERSION_US` or `HW_VERSION_EU433, HW_VERSION_EU865, HW_VERSION_CN, HW_VERSION_JP`. Other country settings can be found in `MeshRadio.h`. The default is `HW_VERSION_US`.
11. Click the PlatformIO icon on the side bar. Under `Project Tasks` you can now build or upload.

Note - To get a clean build you may have to delete the auto-generated file `./.vscode/c_cpp_properties.json`, close and re-open Visual Studio and WAIT until the file is auto-generated before compiling again.
