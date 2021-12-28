---
id: portnum
title: Meshtastic port numbers
sidebar_label: Port numbers
---

For any new apps that run on the device or via sister apps on phones/PCs they should pick and use a unique 'portnum' for their application.

If you are making a new app using meshtastic, please send in a pull request to add your 'portnum' to this master table.  PortNums should be assigned in the following range:

| Portnum | Usage |
| --- | --- |
| 0-63 | Core Meshtastic use, do not use for third party apps |
| 64-127 | Registered 3rd party apps, send in a pull request that adds a new entry to portnums.proto to  register your application |
| 256-511 | Use one of these portnums for your private applications that you do not want to register publicly |

All other values are reserved.

Note: This was formerly a Type enum named `typ` with the same id #

We have changed to this 'portnum' based scheme for specifying app handlers for particular payloads. This change is backwards compatible by treating the legacy OPAQUE/CLEAR_TEXT values identically.

The current list of port numbers can be found listed in the [protobufs](/docs/developers/protobufs/api#portnumsproto)
