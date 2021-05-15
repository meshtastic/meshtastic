---
id: python-installation
title: Meshtastic-python installation
sidebar_label: Installation
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This is a python library for using Meshtastic devices. This small library (and example application) provides an easy API for sending and receiving messages over mesh radios. It also provides access to any of the operations/data available in the device user interface or the Android application. Events are delivered using a publish-subscribe model, and you can subscribe to only the message types you are interested in.

[Full documentation](https://meshtastic.github.io/Meshtastic-python) for the library, including examples, is available.

Installation is easily done through the [Python package installer pip](https://pypi.org/project/meshtastic/) (note, you must use pip version 20 or later):

<Tabs
  groupId="operating-system"
  defaultValue="linux"
  values={[
    {label: 'Linux', value: 'linux'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows', value: 'windows'},
  ]}>
  <TabItem value="linux">

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
  </TabItem>
  <TabItem value="macos">
    - Check that your computer has the required serial drivers installed
        * Connect your Meshtastic device to your USB port
        * Navigate to `Apple Menu  > About This Mac > System Report... > Hardware > USB`
        * You should see something like `CP210X USB to UART Bridge Controller`
        * If not download the drivers from [Silicon Labs](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers).
    - Check that your computer has Python 3 installed.
        * Use the command
            ```bash
            python3 -V
            ```
        * If this does not return a version, install [python](https://www.python.org)
            * The following uses Homebrew to install `python3` which includes `pip3`.
            * Check if you have Homebrew installed with the following command
                ```bash
                brew -v
                ```
                If it's not installed, follow the instructions on the [Homebrew website](https://brew.sh) before continuing.
            * Install Python3
                ```bash
                brew install python3
                ```
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
  </TabItem>
  <TabItem value="windows">
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
  </TabItem>
</Tabs>