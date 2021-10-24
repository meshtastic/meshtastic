---
id: python-installation
title: Meshtastic-python installation
sidebar_label: Installation
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This small library provides a command line interface for Meshtastic nodes and provides an easy API for sending and receiving messages over mesh radios, in addition to changing user settings. Using the command line is currently the most powerful w. Events are delivered using a publish-subscribe model, and you can subscribe to only the message types you are interested in.

[Full documentation](https://meshtastic.github.io/Meshtastic-python) for the library, including examples, is available.

If you wish to view the code or contribute to development of the python library or the command line interface, please visit the Meshtastic python <a href="https://github.com/meshtastic/Meshtastic-python">GitHub page</a>.

Installation is easily done through the [Python package installer pip](https://pypi.org/project/meshtastic/):
:::note
You must use pip version 20 or later. To upgrade to the latest pip, do: `pip install --upgrade pip`
:::

<Tabs
  groupId="operating-system"
  defaultValue="linux"
  values={[
    {label: 'Linux', value: 'linux'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows', value: 'windows'},
    {label: 'Termux for Android', value: 'termux'},
  ]}>
<TabItem value="linux">

* Check that your computer has the required serial drivers installed
    * Connect your Meshtastic device to your USB port
    * Use the command
        ```bash
        lsusb
        ```
    * You should see something like `CP210X USB to UART Bridge Controller`
    * If not download the drivers from [Silicon Labs](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers).
* Check that your computer has Python 3 installed.
    * Use the command
        ```bash
        python3 -V
        ```
    * If this does not return a version, install [python](https://www.python.org)
* Pip is typically installed if you are using python 3 version >= 3.4
    * Check that pip is installed using this command
        ```bash
        pip3 -V
        ```
    * If this does not return a version, install [pip](https://pip.pypa.io/en/stable/installing/)
* Install pytap2
    ```bash
    sudo pip3 install --upgrade pytap2
    ```
* Install meshtastic:
    ```bash
    sudo pip3 install --upgrade meshtastic
    ```

</TabItem>
<TabItem value="macos">

* Check that your computer has the required serial drivers installed
    * Connect your Meshtastic device to your USB port
    * Navigate to `Apple Menu  > About This Mac > System Report... > Hardware > USB`
    * You should see something like `CP210X USB to UART Bridge Controller`
    * If not download the drivers from [Silicon Labs](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers).
* Check that your computer has Python 3 installed.
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
* Pip is typically installed if you are using python 3 version >= 3.4
    * Check that pip is installed using this command
        ```bash
        pip3 -V
        ```
    * If this does not return a version, install [pip](https://pip.pypa.io/en/stable/installing/)
* Install pytap2
    ```bash
    sudo pip3 install --upgrade pytap2
    ```
* Install meshtastic:
    ```bash
    sudo pip3 install --upgrade meshtastic
    ```

</TabItem>
<TabItem value="windows">

* Check that your computer has the required serial drivers installed
    * Connect your Meshtastic device to your USB port
    * Open Device Manager
    * Under `Ports (COM & LPT)` you should see something like `Silicon Labs CP210X USB to UART Bridge (COM5)`
    * If not download the drivers from [Silicon Labs](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers) or use the direct link below.
    :::warning
    You must install the [CP210x Universal Windows Driver](https://www.silabs.com/documents/public/software/CP210x_Universal_Windows_Driver.zip). If you do not install this driver, your device may not work and the driver may need to be uninstalled from device manager before installing the correct driver.
    :::
* Check that your computer has Python 3 installed.
    * Use the command
        ```powershell
        py -V
        ```
    * If this does not return a version, install [python](https://www.python.org)
* Pip is typically installed if you are using python 3 version >= 3.4
    * Check that pip is installed using this command
        ```powershell
        pip3 -V
        ```
    * If this does not return a version, install [pip](https://pip.pypa.io/en/stable/installing/)
* Install pytap2
    ```powershell
    pip3 install --upgrade pytap2
    ```
* Install meshtastic:
    ```powershell
    pip3 install --upgrade meshtastic
    ```
    
</TabItem>
<TabItem value="termux">

:::note
Wifi connection is currently under development and may not be working properly just yet. If you would like to provide feedback or test this feature, please visit our [forum](https://meshtastic.discourse.group/) or join our [Discord server](https://discord.gg/RjQKWHmzPZ) for more information.
:::

* Install [Termux](https://f-droid.org/en/packages/com.termux/) from the F-Droid app store (Google play does not currently support the latest builds)
* Load Termux and update the package list
    ```
    pkg update
    ```
* Upgrade the installed packages
    ```
    pkg upgrade
    ```
* Install python
    ```
    pkg install python
    ```
* Upgrade pip and installed meshtastic and its dependancies
    ```
    pip install --upgrade pip pygatt pytap2 wheel mesthtastic
    ```

:::note 
Be aware that the Meshtastic CLI is not able to control the nodes over USB through termux, but you can control devices over wifi using the `--host x.x.x.x` option with the device IP address. However, only ESP32 devices can use wifi currently.
:::
</TabItem>
</Tabs>
