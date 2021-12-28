---
id: android-usage
title: Android application usage
sidebar_label: Usage
---

## Introduction

The Meshtastic Android app handles the communication and shows the location of everyone in your private group. Each member of your private mesh can always see the location and distance of all other members and any text messages sent to your group chat.

Open the App and you should see a screen like this. You can move through the tabs but nothing much will be visible until you connect to a radio device.

[![No device connected](/img/android/android-settings-none-sm.png)](/img/android/android-settings-none.png)

## Connecting

You will need a device with Meshtastic installed to go any further. See the [getting started](/docs/getting-started) section for information on how to do this.

Open the Settings tab (last tab), and it should look similar to the screen below. It shows any Meshtastic devices that are found over Bluetooth.

:::note
Android requires location permission granted and location must be turned on to find new devices via Bluetooth. You can turn it off again afterwards.
:::

[![Device available to select](/img/android/android-settings-deselected-c.png)](/img/android/android-settings-deselected.png)

1. Select the Device by name, "Meshtastic_c830" in the example below. (You will see any active devices within range, so make sure to get the right one.)
2. You will need to "pair" the device by entering a PIN shown on the device screen. This can alternatively be done in the phone Bluetooth settings. If the Device has no screen, but it's connected via USB, it may be displayed on a serial terminal (921600 Baud). For a development device, the PlatformIO terminal would come in handy. Some nodes have buttons allowing you to change the page displayed on the nodes screen. If you double click this button, it will set the pairing code to `123456`.
3. Edit the "Your name", e.g. to be "Mike Bird". This is the name that other people will see, so make it unique within your group.
4. The initials e.g. "MB" should also be unique and will be used to identify you in the message history and on the device screens.

[![Changing device name](/img/android/android-settings-mike-sm.png)](/img/android/android-settings-mike.png)

5. This should start the communication with the Device. The cloud icon, on the status bar, will have a tick.

![Connected](/img/android/android-cloud-tick.png)

If there is no Device shown, just the `None (disable)` as below, then the device may be off, or in a sleep mode. Try to reset, or press a button to wake it.

[![No devices available](/img/android/android-settings-none-c.png)](/img/android/android-settings-none-c.png)

The cloud icon at the top right corner indicates if you are connected to a device. This currently has three states:

![Not connected](/img/android/android-cloud-cross.png) Cloud with a slash through it: No device connected to the application.

![Connected](/img/android/android-cloud-tick.png) Cloud with a tick in it: Device connected to the application.

![Sleeping](/img/android/android-cloud-up.png) Cloud with an up arrow in it: Device is connected, but currently sleeping or out of range.


## Common tasks

Once you are connected to a Device the App will work, and you can test it by "sending" a message. However, you will need to join or create a new mesh network so you have someone to communicate with. If you have been sent a QR code or link for Meshtastic, then skip ahead to Join a Channel, otherwise you will need to Setup a Channel.

### Setup a channel

To use Meshtastic you need to setup a Channel, and share the details with your group. The group is private and only those who have the details can join the group and see the messages. You will need to do this once initially, and then only when you want to change or make a new mesh network group. For a new device you will see there is a default setting, shown as `#LongSlow-1, Very long range (but slow)`. It is OK to use this initially.

The Channel tab allows you to do this. This screen is initially locked, so that you don't change it accidentally. Press the lock symbol, and you will be able to edit. First, select the Channel options, as shown here, and chose the most appropriate option:

[![Changing channel settings](/img/android/android-change-channel-sm.png)](/img/android/android-change-channel.png)

Here we selected `Very long range (but slow)`, and then made a Channel Name using the keyboard. This identifies your group, here "Owl Team".

[![Changing channel name](/img/android/android-channel-owl-sm.png)](/img/android/android-channel-owl.png)

You will see a warning because changing the Channel will break communications with your group, i.e. if you change your settings without sharing the new details with the group.

[![Do you want to change the channel?](/img/android/android-new-channel-sm.png)](/img/android/android-new-channel.png)

The app will generate a new QR code on the screen, and this encodes the channel details and a random 256-bit key for sharing with the new group. You can share the QR code with other Meshtastic users, or use the Share button and share the link via chat message, SMS, email (the link is a very long code, for example: https://www.meshtastic.org/d/#CgUYAyIBAQ

### Join a channel

If another user shares a QR code, you will be able to scan it with your camera. If the channel is shared as a file or link via the Share button, you can click on the file or link and follow similar steps.

You should see a message with the option "open with Meshtastic".

[![Open with Meshtastic](/img/android/android-open-with-c.png)](/img/android/android-open-with.png)

<details>
  <summary>Troubleshooting: Can't "open with Meshtastic".</summary>
  <div>
    <div>
        If you don't see "Meshtastic" as an option to open the file or link with:<br />
        1. Go to Android Settings > Apps > Default apps > Meshtastic > Opening links<br />
        2. Make sure you have in "links/web address": www.meshtastic.org<br />
        3. If you see the option "Open the supported links", make sure it is enabled.<br />
    </div>
  </div>
</details>

Proceed and you should see a message like "Do you want to switch to the 'Owl Team' channel?".
Accept this, and the app will change to this new channel. You will lose any current channel setting!

[![Accept new channel](/img/android/android-accept-channel-c.png)](/img/android/android-accept-channel.png)

:::note
Setting the same Name and Options will not work as there is also a unique pre-shared key encoded in the channel.
:::

You can test changing channels with the QR code shown below.

![Meshtastic Default Channel](/img/android/default-channel.png)

### Configure a channel

Various data-rates are selectable when configuring a channel and are inversely proportional to the theoretical range of the devices:

| Channel setting        | Data-rate            |
|------------------------|----------------------|
| Short Range / Fast)	 | 19346.94 bps         |
| Short Range / Slow)	 | 4800.00 bps          |
| Medium Range / Fast)	 | 1227.18 bps          |
| Medium Range / Slow)	 | 763.29 bps           |
| Long Range / Fast)	 | 196.74 bps           |
| long Range / Slow)     | 136.71 bps (default) |

### Send a message

The message window operates like any chat applications. Note that any messages sent go to the whole group, and there is no one-to-one message feature.

With LoRa (or any radio) there is some uncertainty that the messages has been received, so there is a confirmation built-in to the protocol. There are small cloud icons shown to the right of the messages you send:

* Cloud with an up arrow: the application is waiting for the device to some out of sleep mode (or come back into Bluetooth range), to upload the message to the device.
* Cloud only: message has been sent via Bluetooth and transmitted via LoRa.
* Cloud with a check mark: message has been delivered to at least one node in the mesh and at least one node sent back a confirmation (successfully received by the initial sender).
* Cloud crossed out: message may have been delivered to at least one node in the mesh. The initial sender did not receive at least one node's confirmation within a certain timeout.

Thus, in a group size of 3 and up, confirmations could be from any one device (not person), so it is good practice to respond, so the initial sender knows you have read their message.

There is no long-term store-and-forward of messages, so messages not received within a time-out (duration?) are lost.

[![Messages](/img/android/android-messages-sm.png)](/img/android/android-messages.png)

### View your network

The network list shows all the users (devices) that have connected to the same Channel. For each entry, it shows the last time they were active, their distance, and their last known power status (battery & percentage, or external power). In the example below, Lora V2 is the local user, m8n was last heard from 3 minutes ago and is 29m away, and 25C is active and 498m away.

This is a list of network nodes, rather than users, so where there is a named user connected to the device, you will see the user name, otherwise the node is shown as `Unknown a3c9` (where `a3c9` is the last 4 hex digits from the MAC address.)

[![Local Meshtastic network](/img/android/android-nodes-sm.png)](/img/android/android-nodes.png)

### View the map

The Map tab will show a local map with an icon for each active mesh node that has a known position. The users names are shown against the icon.

[![Mapping provided by Mapbox](/img/android/android-map-sm.png)](/img/android/android-map.png)

The map is not developed by the Meshtastic project, and the source of the mapping system is [Mapbox](https://docs.mapbox.com/help/how-mapbox-works/) (free-tier), and the map data is sourced from [OpenStreetMap OSM](https://www.openstreetmap.org/). Mapbox currently requires analytics to be enabled for you to use their mapping system. There is currently no off-line maps (phone needs mobile data or Wifi), although this will be improved in the future. If you don't see the features that you'd expect on the map then head over to [OpenStreetMap OSM](https://www.openstreetmap.org/) where you can contribute new data to the map.


## Configuration options

Pressing the three vertical dots in the top right corner shows the configuration menu.

[![Meshtastic configuration options](/img/android/android-settings-options-c.png)](/img/android/android-settings-options.png)

### Advanced settings

[![Advanced settings](/img/android/android-advanced-settings-c.png)](/img/android/android-advanced-settings.png)

#### Broadcast position period

This allows you to change the frequency with which your location is broadcast across the mesh. By default, this is set to 900 seconds (15 minutes). The minimum time this can be set to is 375 seconds, the reasons for which have been [discussed on the forum](https://meshtastic.discourse.group/t/lost-messages-while-testing/2455/19).

#### Device sleep period

By default, ESP32 devices will enter sleep mode after 300 seconds of inactivity to save battery power. Unfortunately, this will also turn off the Bluetooth radio. They can be woken by either receiving a message over LoRa (the LoRa receiver never switches off), or by pressing a program button when there is one on the device. For example, to keep the Bluetooth link awake for eight hours (any usage of the Bluetooth protocol from your phone will reset this timer), set this to 28800 seconds.

### Debug page

[![Debug page](/img/android/android-debug-sm.png)](/img/android/android-debug.png)

The debug page allows you to see all packets sent between the application and the device. This can then be used for debugging purposes.

### Save messages as CSV

This allows you to save your messages to a .csv (comma separated value) file on your phone.

### Theme

This allows you to change between light and dark themes, or to select the system default.

[![Meshtastic theme](/img/android/android-settings-theme-c.png)](/img/android/android-settings-theme.png)
