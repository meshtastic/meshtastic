---
id: device-remote-admin
title: Remote node administration
sidebar_label: Remote node administration
---

This feature will allow you to use the multiple channels feature to enable remote administration of meshtastic nodes.  This will let you talk through the mesh to some far away node and change that node's settings.  This is an advanced feature that (currently) few users would need.  Also, keep in mind it is possible (if you are not careful) to assign settings to that remote node that cause it to completely drop off of your mesh. We advise network admins have a test node to test settings with before applying changes to a remote node to prevent this.

## Creating the admin channel

By default, nodes will **only** respond to administrative commands via the local USB/Bluetooth/TCP interface.  This provides basic security to prevent unauthorized access and is how normal administration and settings changes work.  The only difference for the remote case is that we are sending those commands over the mesh.

Before a node will allow remote admin access, it must have a primary channel:
```bash title="Expected output"
$ meshtastic --info
Connected to radio
...
Channels:
  PRIMARY psk=default { "modemConfig": "Bw125Cr48Sf4096", "psk": "AQ==" }
Primary channel URL: https://www.meshtastic.org/d/#CgUYAyIBAQ
```

So from this output you see can that this node knows about only one channel and that its PSK is set to the default value.

Now we add an admin channel: 

```bash title="Command"
meshtastic --ch-add admin
```

:::note
The name of the channel is important and must be `admin`.
:::

Your channels will now look like this:
```bash title="Expected output"
$ meshtastic --ch-add admin
Connected to radio
Writing modified channels to device
$ meshtastic --info
Connected to radio
...
Channels:
  PRIMARY psk=default { "modemConfig": "Bw125Cr48Sf4096", "psk": "AQ==" }
  SECONDARY psk=secret { "psk": "HW7E3nMbiNbvr6MhsDonLCmj7eSAhttzjbIx/r5OQmg=", "name": "admin" }
Primary channel URL: https://www.meshtastic.org/d/#CgUYAyIBAQ
Complete URL (includes all channels): https://www.meshtastic.org/d/#CgUYAyIBAQopIiAdbsTecxuI1u-voyGwOicsKaPt5ICG23ONsjH-vk5CaCoFYWRtaW4
```

Notice that now we have a new secondary channel and the `--info` option prints out TWO URLs.  The `Complete URL` includes all of the channels this node understands.  The URL contains the preshared keys and should be treated with caution and kept a secret.  When deploying remote administration, you only need the node you want to administer and the node you are locally connected to know this new "admin" channel. All of the other nodes will forward the packets as long as they are a member of the primary channel.

## Sharing the admin channel with other nodes

Creating an "admin" channel automatically generates a preshared key, just like with [Multiple channel support](./device-channels). In order to administer to other nodes remotely, we need to copy the preshared key to the new nodes.

For this step you need physical access to both the nodes.

1. Create the "admin" channel on the "local node" using the instructions above.
2. Copy the "Complete URL" someplace for permanent reference/access.
3. Connect to the "remote node" over the USB port.
4. For the "remote node" type
  ```bash
  meshtastic --seturl the-url-from-step-2
  ```
5. Run `meshtastic --info` and confirm that the "Complete URL" is the same for both of the nodes.

At this point you can take your remote node and install it far away and still be able to change any of its settings.

## Remotely administering your node

Now that both your local node and the remote node contain your secret admin channel key, you can do things like:

Get the node list from the local node:

```bash title="Expected output"
$ meshtastic --nodes
Connected to radio
/-------------------------------------------------------------------------------------------------------------\
|N|    User    |AKA|   ID    |Latitude|Longitude|Altitude|Battery|   SNR   |     LastHeard     |    Since     |
|-+------------+---+---------+--------+---------+--------+-------+---------+-------------------+--------------|
|1|Unknown 9058|?58|!28979058|25.0382°|121.5731°|  N/A   |  N/A  |-13.50 dB|2021-03-22 09:25:42|19 seconds ago|
\-------------------------------------------------------------------------------------------------------------/
```

Using the node ID from that list, send a message through the mesh telling that node to change its owner name.

```bash title="Expected output"
$ meshtastic --dest \!28979058 --set-owner "Im Remote"
Connected to radio
Setting device owner to Im Remote
INFO:root:Requesting configuration from remote node (this could take a while)
```

:::note
You will need to escape the `!` using `\!` otherwise the command will fail.
:::
:::note
The above note needs clarification. Currently, you refer to other nodes with `!########`. No backslashes are used.
:::

And you can now confirm via the local node that the remote node has changed:

```bash title="Expected output"
$ meshtastic --nodes 
Connected to radio
/----------------------------------------------------------------------------------------------------\
|N|  User   |AKA|   ID    |        Position        |Battery|  SNR  |     LastHeard     |    Since    |
|-+---------+---+---------+------------------------+-------+-------+-------------------+-------------|
|1|Im Remote|IR |!28979058|25.0382°, 121.5731°, N/A|  N/A  |8.75 dB|2021-03-22 09:35:42|3 minutes ago|
\----------------------------------------------------------------------------------------------------/
```

Note: you can change **any** parameter, add channels or get info from the remote node.  Here's an example of setting ls_secs and printing the complete device info from the remote node:

```bash title="Expected output"
$ meshtastic --dest \!28979058 --set ls_secs 301 --info
Connected to radio
INFO:root:Requesting configuration from remote node (this could take a while)
Set ls_secs to 301
Writing modified preferences to device
Preferences: { "lsSecs": 301, "region": "TW" }
Channels:
  PRIMARY psk=default { "modemConfig": "Bw125Cr48Sf4096", "psk": "AQ==" }
  SECONDARY psk=secret { "psk": "HW7E3nMbiNbvr6MhsDonLCmj7eSAhttzjbIx/r5OQmg=", "name": "admin" }
Primary channel URL: https://www.meshtastic.org/d/#CgUYAyIBAQ
Complete URL (includes all channels): https://www.meshtastic.org/d/#CgUYAyIBAQopIiAdbsTecxuI1u-voyGwOicsKaPt5ICG23ONsjH-vk5CaCoFYWRtaW4
```

## Admin Channel Setup is Complete

You've finished setting up and adding 2 devices to the admin channel. Remember, because this is a mesh network, it doesn't matter which node you are at; you could administer your first device we set up from the second one we added to the channel. And the settings and examples on this page are just a taste of the other settings you can set. Also, if you ever want to view a setting without having to read through the `--info`, you can always do the following:

```bash title="--get vs. --info"
$ meshtastic --dest \!28979058 --get ls_secs
Connected to radio
INFO:root:Requesting preferences from remote node (this could take a while)
ls_secs: 301
Completed getting preferences
```

For further reading, I recommend starting out with [Meshtastic-python](../python/python-cli) if you haven't already gone through this (hopefully you have since you are reading this). But for a full reference to the settings you can change, please see:

[Settings Overview](/docs/settings)
[Complete list of user settings in Protobufs](https://meshtastic.org/docs/developers/protobufs/api#radioconfiguserpreferences)

## Areas for future development

In the future we will add a "deadman timer" to this feature so that the remote node will revert any changes if you fail to send a special "commit changes" command.  This will protect against sending bad settings to nodes that you can't physically access.  Instead, if the node does not receive a commit message within 10 minutes it will revert all changes and (hopefully) rejoin the mesh.
