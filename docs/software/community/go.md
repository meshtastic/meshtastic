---
id: community-go
title: Go command line interface
sidebar_label: Go CLI
---

:::note
This is a community project maintained by @lmatte7.
Development can be followed on [GitHub](https://github.com/lmatte7/meshtastic-go).
Support should be sought from the respective authors.
:::

This is a command line interface for Meshtastic devices that has been built using the Go programming language developed by Google. This allows for an executable file to be downloaded for your operating system and run without installing other pre-requisites. The only requirement is for the [CP210x USB to UART bridge drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers) to be installed. A selection of executables for different operating systems are available, and further operating systems can be supported as required.

### Command syntax

A full list of commands can be viewed by running `--help`. Each command also has its own `--help` flag that provides more information on its subcommands and flags.

Every command requires the `--port` flag to be set to the port the radio is attached to. This can be set to a serial port (like `/dev/cu.SLAB_USBtoUART`) or an IP address depending on which communication method should be used to communicate with the radio. The CLI will automatically determine if TCP or serial communications should be used depending on what value is provided to `--port`.

```
NAME:
   meshtastic-go - Interface with meshtastic radios

USAGE:
   meshtastic-go [global options] command [command options] [arguments...]

VERSION:
   v0.2

AUTHOR:
   Lucas Matte <lmatte7@gmail.com>

COMMANDS:
   info      Show radio information
   message   Interact with radio messaging functionality
   channel   Update channel information
   prefs     Update user preferences
   location  Set location
   help, h   Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --port value, -p value  specify a port
   --help, -h              show help (default: false)
   --version, -v           print the version (default: false)
```
Further information is available on the project's GitHub [Readme.md](https://github.com/lmatte7/meshtastic-go/blob/main/README.md).
The latest executables can be downloaded from [GitHub](https://github.com/lmatte7/meshtastic-go/releases/latest).
