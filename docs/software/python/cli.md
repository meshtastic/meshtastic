---
id: python-cli
title: Command line interface
sidebar_label: CLI usage
---

This section covers installing a "meshtastic" command line executable, which displays packets sent over the network as JSON and lets you see serial debugging information from the Meshtastic devices. The source code for this tool is also a good [example](https://github.com/meshtastic/Meshtastic-python/blob/master/meshtastic/__main__.py) of a 'complete' application that uses the Meshtastic python API.

:::note
The `meshtastic` command is not run within python but is a script  run from your operating system shell prompt.  When you type "meshtastic" and the prompt is unable to find the command in Windows, check that the python "scripts" directory [is in your path](https://datatofish.com/add-python-to-windows-path/).
:::

To display a list of the available commands:
```bash
meshtastic -h
```
:::note
Because of the growing nature of this project, not all commands may appear when using the help command with `meshtastic -h`.
:::

## Getting a list of User Preferences

You can get a list of user preferences by running '--get' with an invalid attribute such as 'all'.
```bash
meshtastic --get all
```

## Changing settings

You can also use this tool to set any of the device parameters which are stored in persistent storage. For instance, here's how to set the device
to keep the Bluetooth link alive for eight hours (any usage of the Bluetooth protocol from your phone will reset this timer)

```bash title="Expected Output"
# You should see a result similar to this:
mydir$ meshtastic --set wait_bluetooth_secs 28800
Connected to radio...
Setting preference wait_bluetooth_secs to 28800
Writing modified preferences to device...
```

Or to set a node at a fixed position and never power up the GPS.

```bash
meshtastic --setlat 25.2 --setlon -16.8 --setalt 120
```

Or to configure an ESP32 based board to join a Wifi network as a station:

```bash
meshtastic --set wifi_ap_mode false --set wifi_ssid mywifissid --set wifi_password mywifipsw
```

Or to configure an ESP32 to run as a Wifi access point:

```bash
meshtastic --set wifi_ap_mode true --set wifi_ssid mywifissid --set wifi_password mywifipsw
```

:::note
For a full list of preferences which can be set (and their documentation) can be found in the [protobufs](/docs/developers/protobufs/api#radioconfiguserpreferences).
:::

### Changing channel settings

The channel settings can also be changed, either by using a standard (shareable) meshtastic URL or you can set particular channel parameter (for advanced users).

:::warning
Meshtastic encodes the radio channel and PSK in the channel's URL. All nodes must connect to the channel again by using the URL provided after a change in this section by performing the `--info` switch. Please refer to [Multiple Channel Support](../device/device-channels).
:::

```bash
meshtastic --ch-set name mychan --ch-index 1 --ch-set channel_num 4 --info
```

You can even set the channel preshared key to a particular AES128 or AES256 sequence.

```bash
meshtastic --ch-index 1 --ch-set psk 0x1a1a1a1a2b2b2b2b1a1a1a1a2b2b2b2b1a1a1a1a2b2b2b2b1a1a1a1a2b2b2b2b --info
```

Use `--ch-set psk none --ch-index 0` to turn off encryption.

Use `--ch-set psk random --ch-index 0` will assign a new (high quality) random AES256 key to the primary channel (similar to what the Android app does when making new channels).

Use `--ch-set psk default --ch-index 0` to restore the standard 'default' (minimally secure, because it is in the source code for anyone to read) AES128 key.

All `ch-set` commands need to have the `ch-index` parameter specified:

```bash
meshtastic --ch-index 1 --ch-set name mychan --ch-set channel_num 4 --info
```

### Ham radio support

Meshtastic is designed to be used without a radio operator license.  If you do have a license you can set your operator ID and turn off encryption with:

```bash title="Expected Output"
# You should see a result similar to this:
mydir$ meshtastic --port /dev/ttyUSB1 --set-ham KI1345
Connected to radio
Setting HAM ID to KI1345 and turning off encryption
Writing modified channels to device
```

## FAQ/common problems

This is a collection of common questions and answers from our friendly forum.

### Permission denied: ‘/dev/ttyUSB0’

As previously discussed on the [forum](https://meshtastic.discourse.group/t/question-on-permission-denied-dev-ttyusb0/590/3?u=geeksville)

This indicates an OS permission problem for access by your user to the USB serial port.  Typically this is fixed by the following.

```bash
sudo usermod -a -G dialout <username>
```

### Mac OS Big Sur

There is a problem with Big Sur and pyserial. The workaround is to install a newer version of pyserial:

```bash
pip3 install -U --pre pyserial
```

Afterwards you can use the meshtastic python client again on MacOS.
