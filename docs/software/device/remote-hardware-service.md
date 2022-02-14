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
- Receive notification of changes in any GPIO

## Setup


To prevent access from untrusted users, you must first make a `gpio` channel that is used for authenticated access to this feature.  You'll need to install this channel on both the local and remote node.

The procedure using the python command line tool is:

1. Connect local device via USB

2. Create a gpio channel
    ```bash
    meshtastic --ch-add gpio
    ```

:::tip
If doing local testing, may want to change the speed of the channel at this time, too. (ex: "meshtastic --ch-mediumfast")
:::

3. Check the channel has been created and copy the long "Complete URL" that contains all the channels on that device
    ```bash
    meshtastic --info
    ```

4. Connect the remote device via USB (or use the [remote admin](device-remote-admin) feature to reach it through the mesh)

5. Set it to join the gpio channel you created
    ```bash
    meshtastic --seturl theurlyoucopiedinstep3
    ```


Now both devices should be able to talk over the `gpio` channel. Send a text message from one the other other verify. Also run "--nodes" to verify the second node shows up.

## A little bit of information about masks

To determine the appropriate mask for the pin(s) that you want to know. The python program (and output) below might help:

```
>>> for i in range(1,45):
...     print(f'GPIO:{i} mask:{hex(2**i)}')
...
GPIO:1 mask:0x2
GPIO:2 mask:0x4
GPIO:3 mask:0x8
GPIO:4 mask:0x10
GPIO:5 mask:0x20
GPIO:6 mask:0x40
GPIO:7 mask:0x80
GPIO:8 mask:0x100
GPIO:9 mask:0x200
GPIO:10 mask:0x400
GPIO:11 mask:0x800
GPIO:12 mask:0x1000
GPIO:13 mask:0x2000
GPIO:14 mask:0x4000
GPIO:15 mask:0x8000
GPIO:16 mask:0x10000
GPIO:17 mask:0x20000
GPIO:18 mask:0x40000
GPIO:19 mask:0x80000
GPIO:20 mask:0x100000
GPIO:21 mask:0x200000
GPIO:22 mask:0x400000
GPIO:23 mask:0x800000
GPIO:24 mask:0x1000000
GPIO:25 mask:0x2000000
GPIO:26 mask:0x4000000
GPIO:27 mask:0x8000000
GPIO:28 mask:0x10000000
GPIO:29 mask:0x20000000
GPIO:30 mask:0x40000000
GPIO:31 mask:0x80000000
GPIO:32 mask:0x100000000
GPIO:33 mask:0x200000000
GPIO:34 mask:0x400000000
GPIO:35 mask:0x800000000
GPIO:36 mask:0x1000000000
GPIO:37 mask:0x2000000000
GPIO:38 mask:0x4000000000
GPIO:39 mask:0x8000000000
GPIO:40 mask:0x10000000000
GPIO:41 mask:0x20000000000
GPIO:42 mask:0x40000000000
GPIO:43 mask:0x80000000000
GPIO:44 mask:0x100000000000
```

## How to easily test GPIO operations?

You can add a simple LED and resistor to validate that the GPIO operations work as expected. Used the tutorial at https://www.instructables.com/Slide-Switch-With-Arduino-Uno-R3/ as a guide.

Need:
* 2 Meshtastic devices (one device could be on a local computer, and the other one just has to be powered and is the one with the LED to be connected to it)
* 2 wires (black and yellow; they can be any color but typically black is used for ground)
* breadboard (optional)
* 1 LED
* 1 220Ω resistor (somewhat optional, but recommended)

Prep:
* disconnect the remote device from power (battery/usb)
* add a resistor from yellow wire to the one end of the LED (either end of the resistor is ok, either end of the LED is ok)
* add the yellow wire from a GPIO pin that will not cause any issues (ex: for TLoraV1, we can use GPIO21)
* add the black "ground" wire from the ground pin on the device (ex: for TLoraV1 it is the end pin next to the RST button) to the other end of the LED
* power on the device

Validation:
By default, the pin may be "off" or "on". (It will most likely "off".) See the steps below for running commands. In the example of GPIO21, the mask would be 0x200000.

[<img alt="T-Lora v1 with LED on GPIO 21" src="/img/LED_on_TLoraV1.jpg" style={{zoom:'25%'}} />](/img/LED_on_TLoraV1.jpg)


## Doing GPIO operations

You can programmatically do operations from your own python code by using the Meshtastic `RemoteHardwareClient` class. See the [python API](https://meshtastic.org/docs/software/python/python-installation) documentation for more details.

## Using GPIOs from the python CLI

Writing a GPIO (ex: turn "on" GPIO4):
```bash title="Expected output"
$ meshtastic  --port /dev/ttyUSB0 --gpio-wrb 4 1 --dest \!28979058
Connected to radio
Writing GPIO mask 0x10 with value 0x10 to !28979058
```

Reading a GPIO (ex: read GPIO4):
```bash title="Expected output"
$ meshtastic --port /dev/ttyUSB0 --gpio-rd 0x10 --dest \!28979058
Connected to radio
Reading GPIO mask 0x10 from !28979058
GPIO read response gpio_value=16
```

:::note
If the mask and the gpio_value match, then the value is "on". If the gpio_value is 0, then the value is "off".
:::

Watching for GPIO changes (ex: watching GPIO4 for changes):
```bash title="Expected output"
$ meshtastic --port /dev/ttyUSB0 --gpio-watch 0x10 --dest \!28979058
Connected to radio
Watching GPIO mask 0x10 from !28979058
Received RemoteHardware typ=GPIOS_CHANGED, gpio_value=16
Received RemoteHardware typ=GPIOS_CHANGED, gpio_value=0
Received RemoteHardware typ=GPIOS_CHANGED, gpio_value=16
< press ctrl-c to exit >
```
