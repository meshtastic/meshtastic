---
id: python-installation
title: Meshtastic-python installation
sidebar_label: Installation
---

This is a python library for using Meshtastic devices. This small library (and example application) provides an easy API for sending and receiving messages over mesh radios. It also provides access to any of the operations/data available in the device user interface or the Android application. Events are delivered using a publish-subscribe model, and you can subscribe to only the message types you are interested in.

[Full documentation](https://meshtastic.github.io/Meshtastic-python) including examples is available.

Installation is easily done through the Python package installer pip (note, you must use pip version 20 or later):

- check that your computer has the required serial drivers installed
    * Connect your Meshtastic device to your USB port
    * Use the command
        ```
        lsusb
        ```
    * You should see something like `CP210X USB to UART Bridge Controller`
    * if not download the drivers from [Silicon Labs](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers).

- check that your computer has Python 3 installed.
    *
- check that your computer has "pip3" installed, if not follow [this guide](https://www.makeuseof.com/tag/install-pip-for-python/).
- check that pytap2 is installed by pip3. If not, install it:
```bash
sudo pip3 install --upgrade pytap2
```
- install meshtastic:
```bash
sudo pip3 install --upgrade meshtastic
```
