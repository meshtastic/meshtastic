---
id: python-commands
title: Meshtastic-python Commands
sidebar_label: Commands
---

# Python API Commands Guide

The python pip package installs a "meshtastic" command line executable, which displays packets sent over the network as JSON and lets you see serial debugging information from the meshtastic devices. This command is not run inside of python, you run it from your operating system shell prompt directly. If when you type "meshtastic" it doesn't find the command and you are using Windows: Check that the python "scripts" directory is in your path.

## Optional Arguments

### -h or --help

Shows a help message that describes the arguments.

**Usage**

```shell
meshtastic -h
```

### --port PORT

The port the Meshtastic device is connected to, i.e. /dev/ttyUSB0 or COM4. if unspecified, meshtastic will try to find it. Important to use when multiple devices are connected to ensure you call the command for the correct device.

**Usage**

```shell
meshtastic --port /dev/ttyUSB0 --info
meshtastic --port COM4 --info
```

### --host HOST

The hostname/ipaddr of the device to connect to (over TCP).

**Usage**

```shell
meshtastic --host HOST
```

### --seriallog SERIALLOG

Logs device serial output to either 'stdout', 'none' or a filename to append to.

**Usage**

```shell
meshtastic --port /dev/ttyUSB0 --seriallog
```

### --info

Read and display the radio config information.

**Usage**

```shell
meshtastic --port /dev/ttyUSB0 --info
```

### --nodes

Prints a node list in a pretty, formatted table.

**Usage**

```shell
meshtastic --nodes
```

### --qr

Displays the QR code that corresponds to the current channel.

**Usage**

```shell
meshtastic --qr
```

### --get GET

Gets a preferences field.

**Usage**

```shell
meshtastic --get modem_config
```

### --set SET SET

Sets a preferences field.

**Usage**

```shell
meshtastic --set region Unset
```

### --seturl SETURL

Set a channel URL.

**Usage**

```shell
meshtastic --seturl https://www.meshtastic.org/c/GAMiIE67C6zsNmlWQ-KE1tKt0fRKFciHka-DShI6G7ElvGOiKgZzaGFyZWQ=
```

### --ch-index CH_INDEX

Set the specified channel index

**Usage**

```shell
meshtastic --ch-index 1 --ch-disable
```

### --ch-add CH_ADD

Add a secondary channel, you must specify a channel name.

**Usage**

```shell
meshtastic --ch-add testing-channel
```

### --ch-del

Delete the ch-index channel.

**Usage**

```shell
meshtastic --ch-index 1 --ch-del
```

### --ch-enable

Enable the specified channel.

**Usage**

```shell
meshtastic --ch-index 1 --ch-enable
```

### --ch-disable

Disable the specified channel.

**Usage**

```shell
meshtastic --ch-index 1 --ch-disable
```

### --ch-set CH_SET CH_SET

Set a channel parameter.

**Usage**

```shell
meshtastic --ch-set id 1234
```

### --ch-longslow

Change to the standard long-range (but slow) channel.

**Usage**

```shell
meshtastic --ch-longslow
```

### --ch-shortfast

Change to the standard fast (but short range) channel.

**Usage**

```shell
meshtastic --ch-shortfast
```

### --set-owner SET_OWNER

Set device owner name.

**Usage**

```shell
meshtastic --dest \!28979058 --set-owner "MeshyJohn"
```

### --set-ham SET_HAM

Set licensed Ham ID and turn off encryption.

**Usage**

```shell
meshtastic --set-ham KI1345
```

### --dest DEST

The destination node id for any sent commands

**Usage**

```shell
meshtastic --dest \!28979058 --set-owner "MeshyJohn"
```

### --sendtext SENDTEXT

Send a text message.

**Usage**

```shell
meshtastic --sendtext "Hello Mesh!"
```

### --sendping

Send a ping message (which requests a reply).

**Usage**

```shell
meshtastic --sendping
```

### --reboot

Tell the destination node to reboot.

**Usage**

```shell
meshtastic --dest \!28979058 --reboot
```

### --reply

Reply to received messages.

**Usage**

```shell
meshtastic --reply
```

### --gpio-wrb GPIO_WRB GPIO_WRB

Set a particular GPIO # to 1 or 0.

**Usage**

```shell
meshtastic --port /dev/ttyUSB0 --gpio-wrb 4 1 --dest \!28979058
```

### --gpio-rd GPIO_RD

Read from a GPIO mask.

**Usage**

```shell
meshtastic --port /dev/ttyUSB0 --gpio-rd 0x10 --dest \!28979058
```

### --gpio-watch GPIO_WATCH

Start watching a GPIO mask for changes.

**Usage**

```shell
meshtastic --port /dev/ttyUSB0 --gpio-watch 0x10 --dest \!28979058
```

### --no-time

Suppress sending the current time to the mesh.

**Usage**

```shell
meshtastic --port /dev/ttyUSB0 --no-time
```

### --setalt SETALT

Set device altitude (allows use without GPS).

**Usage**

```shell
meshtastic --setalt 120
```

### --setlat SETLAT

Set device latitude (allows use without GPS).

**Usage**

```shell
meshtastic --setlat 25.2
```

### --setlon SETLON

Set device longitude (allows use without GPS).

**Usage**

```shell
meshtastic --setlon -16.8
```

### --debug

Show API library debug log messages.

**Usage**

```shell
meshtastic --debug --info
```

### --test

Run stress test against all connected Meshtastic devices.

**Usage**

```shell
meshtastic --test
```

### --ble BLE

BLE mac address to connect to (BLE is not yet supported for this tool).

**Usage**

```shell
meshtastic --ble "83:38:92:32:37:48"
```

### --noproto

Don't start the API, just function as a dumb serial terminal.

**Usage**

```shell
meshtastic --noproto
```

### --version

Show program's version number and exit.

**Usage**

```shell
meshtastic --version
```

## Deprecated Arguments

### --setchan

Deprecated - use "--ch-set param value" instead.

### --set-router

Deprecated - use "--set is_router true" instead.

### --unset-router

Deprecated - use "--set is_router false" instead.
