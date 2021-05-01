---
id: device-channels
title: Multiple channel support
sidebar_label: Multiple channels
---

Version 1.2 of the software adds support for multiple (simultaneous) channels.  The idea behind this feature is that a mesh can allow multiple users/groups to be share common mesh infrastructure.  Even including routing messages for others when no one except that subgroup of users has the encryption keys for their private channel.

:::note
Older meshtastic applications that don't yet understand multi-channel support will only show the user the primary channel.
:::

### What is the Primary channel

The way this works is that each node keeps a list of channels it knows about.  One of those channels (normally the first one) is labelled as the "PRIMARY" channel.  The primary channel is the **only** channel that is used to set radio parameters.  This channel controls things like spread factor, coding rate, bandwidth etc... Indirectly this channel also is used to select the specific frequency that all members of this mesh are talking over.

This channel may or may not have a PSK (encryption).  If you are providing mesh to 'the public' we recommend that you always leave this channel with its default psk.  The default PSK is technically encrypted (and random users sniffing the ether would have to use meshtastic to decode it), but the key is included in the github source code and you should assume any 'attacker' would have it.  But for a 'public' mesh you want this, because it allows anyone using meshtastic in your area to send packets through 'your' mesh.

```bash title="Setting default channel"
$ meshtastic --seturl https://www.meshtastic.org/d/#CgUYAyIBAQ
Connected to radio
```

The device will now have its primary channel set to the default:

```bash title="Expected output"
$ meshtastic --info
Connected to radio
...
Channels:
  PRIMARY psk=default { "modemConfig": "Bw125Cr48Sf4096", "psk": "AQ==" }
Primary channel URL: https://www.meshtastic.org/d/#CgUYAyIBAQ
```

### How to use Secondary channels

Any channel you add after that Primary channel is Secondary.  Secondary channels are used only for encyryption and (in the case of some special applications) security.  If you would like to have a private channel over a more public mesh, you probably want to create a secondary channel.  When sharing that URL with your private group you will share the "Complete URL".  The complete URL includes your secondary channel (for encryption) and the primary channel (to provide radio/mesh access).

Secondary channels **must** have a PSK (encryption).

```bash title="Adding a channel called testing-channel"
$ meshtastic --ch-add testing-channel
Connected to radio
Writing modified channels to device
```

The device will now have a Secondary channel called "testing-channel"

```bash title="Expected output"
$ meshtastic --info
Connected to radio
...
Channels:
  PRIMARY psk=default { "modemConfig": "Bw125Cr48Sf4096", "psk": "AQ==" }
  SECONDARY psk=secret { "psk": "HW7E3nMbiNbvr6MhsDonLCmj7eSAhttzjbIx/r5OQmg=", "name": "testing-channel" }
Primary channel URL: https://www.meshtastic.org/d/#CgUYAyIBAQ
Complete URL (includes all channels): https://www.meshtastic.org/d/#CgUYAyIBAQopIiAdbsTecxuI1u-voyGwOicsKaPt5ICG23ONsjH-vk5CaCoFYWRtaW4
```