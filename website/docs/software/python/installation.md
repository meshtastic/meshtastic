---
id: python-installation
title: Meshtastic-python installation
sidebar_label: Installation
---

This is a python library for using Meshtastic devices. This small library (and example application) provides an easy API for sending and receiving messages over mesh radios. It also provides access to any of the operations/data available in the device user interface or the Android application. Events are delivered using a publish-subscribe model, and you can subscribe to only the message types you are interested in.

[Full documentation](https://meshtastic.github.io/Meshtastic-python) for the library, including examples, is available.

Installation is easily done through the Python package installer pip (note, you must use pip version 20 or later):

## Linux

- Check that your computer has the required serial drivers installed
    * Connect your Meshtastic device to your USB port
    * Use the command
        ```bash
        lsusb
        ```
    * You should see something like `CP210X USB to UART Bridge Controller`
    * If not download the drivers from [Silicon Labs](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers).
- Check that your computer has Python 3 installed.
    * Use the command
        ```bash
        python3 -V
        ```
    * If this does not return a version, install [python](https://www.python.org)
- Pip is typically installed if you are using python 3 version >= 3.4
    * Check that pip is installed using this command
        ```bash
        pip3 -V
        ```
    * If this does not return a version, install [pip](https://pip.pypa.io/en/stable/installing/)
- Install pytap2
    ```bash
    sudo pip3 install --upgrade pytap2
    ```
- Install meshtastic:
    ```bash
    sudo pip3 install --upgrade meshtastic
    ```
## Windows

- Check that your computer has the required serial drivers installed
    * Connect your Meshtastic device to your USB port
    * Open Device Manager
    * Under `Ports (COM & LPT)` you should see something like `Silicon Labs CP210X USB to UART Bridge (COM5)`
    * If not download the drivers from [Silicon Labs](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers).
- Check that your computer has Python 3 installed.
    * Use the command
        ```powershell
        py -V
        ```
    * If this does not return a version, install [python](https://www.python.org)
- Pip is typically installed if you are using python 3 version >= 3.4
    * Check that pip is installed using this command
        ```powershell
        pip3 -V
        ```
    * If this does not return a version, install [pip](https://pip.pypa.io/en/stable/installing/)
- Install pytap2
    ```powershell
    pip3 install --upgrade pytap2
    ```
- Install meshtastic:
    ```powershell
    pip3 install --upgrade meshtastic
    ```