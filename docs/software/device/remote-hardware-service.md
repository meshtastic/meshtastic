---
id: remote-hardware-service
title: Remote Hardware Service
sidebar_label: Remote Hardware
---

:::warning
GPIO access is fundamentally dangerous because invalid options can physically damage or destroy your hardware. Ensure that you fully understand the schematic for your particular device before trying this as we do not offer a warranty. Use at your own risk.
:::

:::note
This feature uses a preinstalled plugin in the device code and associated command line flags/classes in the python code.  You'll need to be running at least version 1.2.23 (or later) of the python and device code to use this feature.
:::

You can get the latest python tool/library with `pip3 install --upgrade meshtastic` on Windows/Linux/OS-X. See the [python section](/docs/software/python/python-installation) for more details.

## Supported operations in the initial release

- Set any GPIO
- Read any GPIO
- Receive notification of changes in any GPIO.

## Setup



To prevent access from untrusted users you must first make a `gpio` channel that is used for authenticated access to this feature.  You'll need to install this channel on both the local and remote node.

The procedure using the python command line tool is:

1. Connect local device via USB
2. Create a gpio channel
    ```bash
    meshtastic --ch-add gpio
    ```
3. Check the channel has been created and copy the long "Complete URL" that contains all the channels on that device.
    ```bash
    meshtastic --info
    ```
4. Connect the remote device via USB (or use the [remote admin](device-remote-admin) feature to reach it through the mesh)
5. Set it to join the gpio channel you created
    ```bash
    meshtastic --seturl theurlyoucopiedinstep3
    ```

Now both devices can talk over the `gpio` channel.

## Doing GPIO operations

You can programmatically do operations from your own python code by using the meshtastic `RemoteHardwareClient` class. See the [python API](https://meshtastic.github.io/Meshtastic-python) documentation for more details.

## Using GPIOs from the python CLI

Writing a GPIO
```bash title="Expected output"
$ meshtastic  --port /dev/ttyUSB0 --gpio-wrb 4 1 --dest \!28979058 
Connected to radio
Writing GPIO mask 0x10 with value 0x10 to !28979058
```

Reading a GPIO
```bash title="Expected output"
$ meshtastic --port /dev/ttyUSB0 --gpio-rd 0x10 --dest \!28979058 
Connected to radio
Reading GPIO mask 0x10 from !28979058
GPIO read response gpio_value=16
```

Watching for GPIO changes:
```bash title="Expected output"
$ meshtastic --port /dev/ttyUSB0 --gpio-watch 0x10 --dest \!28979058 
Connected to radio
Watching GPIO mask 0x10 from !28979058
Received RemoteHardware typ=GPIOS_CHANGED, gpio_value=16
Received RemoteHardware typ=GPIOS_CHANGED, gpio_value=0
Received RemoteHardware typ=GPIOS_CHANGED, gpio_value=16
< press ctrl-c to exit >
```
