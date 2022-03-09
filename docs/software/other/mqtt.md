---
id: mqtt
title: MQTT
sidebar_label: MQTT
---

## MQTT

Meshtastic devices with wifi hardware (ESP32) are able to connect to an MQTT broker to uplink and downlink mesh packets. This is useful for a number of purposes:

- Connecting your mesh to the official Meshtastic MQTT broker. This makes your devices appear on the world map, and provides a limited copy of your mesh traffic, translated into JSON.
- Using a custom MQTT broker to bridge several mesh networks together, via the internet (or just a local IP network)
- Using a custom MQTT broker and a translator program to decode the raw protobuf packets and translate them into a plain text form for use in other systems. eg plotting temperature readings in Grafana, or device positions in Traccar.

When MQTT enabled, the Meshtastic device simply uplinks and/or downlinks every raw protobuf packet that it sees to the MQTT broker. All packets are sent to the broker, whether they originate from another device on the mesh, or the gateway node itself.

Packets may be encrypted. If you use the default meshtastic MQTT server, packets are always encrypted. If you use a custom MQTT broker (ie set `mqtt_server`), the `mqtt_encryption_enabled` setting applies, which by default is false.

IMPORTANT: When MQTT is turned on, you are potentially broadcasting your entire mesh traffic onto the public internet. This includes messages and position information.

### MQTT Topic

The device will uplink and downlink packets to the `msh/` prefix:

`msh/1/c/ShortFast/!12345678` where

- `!12345678` is the address of the gateway device.
- `ShortFast` is the channel name.

The payload is a raw protobuf. Looking at the MQTT traffic with a program like `mosquitto_sub` will tell you it's working, but you won't get much useful information out of it. For example:

```
苓????"!
	!937bed1cTanksTnk"D???05??=???aP`
	ShortFast	!937bed1c
```

### Basic Configuration

Check out [MQTT Settings](/docs/settings/mqtt) for full information. For quick start instructions, read on.

- Connect your gateway node to wifi, by setting the `wifi_ssid` and `wifi_password` preferences.
- Configure your broker settings: `mqtt_server`, `mqtt_username`, and `mqtt_password`. If all are left blank, the device will connect to the Meshtastic broker.
- Set `uplink_enabled` and `downlink_enabled` as appropriate for each channel. Most users will just have a single channel (at channel index 0). `meshtastic --ch-index 0 --ch-set uplink_enabled true`

`uplink_enabled` will tell the device to publish mesh packets to MQTT.
`downlink_enabled` will tell the device to subscribe to MQTT, and forward any packets from there onto the mesh.

### Getting plain data out of the mesh

As of firmware 1.2.53, it is possible for the device to decrypt the protobufs before publishing to MQTT. To translate this into a plain format:

- Set up a gateway node to uplink packets to your MQTT broker:
  - `meshtastic --set wifi_ssid XXXX`
  - `meshtastic --set wifi_password XXXX`
  - `meshtastic --set mqtt_server 192.168.1.1`
  - `meshtastic --set mqtt_username XXXX`
  - `meshtastic --set mqtt_password XXXX`
  - `meshtastic --set mqtt_encryption_enabled false`
  - `meshtastic --ch-index 0 --ch-set uplink_enabled true`
- Grab the meshtastic-mqtt script from [here](https://github.com/joshpirihi/meshtastic-mqtt)
  - `git clone https://github.com/joshpirihi/meshtastic-mqtt && cd meshtastic-mqtt`
  - Edit `meshtastic_mqtt/meshtastic_mqtt.py` and enter your mqtt broker details
  - Install the script with `pip install .`
  - Run `meshtastic-mqtt`. It will print some debug output by default, and publish the plain values to the `meshtastic/` prefix.
  - View the plain data with `mosquitto_sub -h YOUR_MQTT_SERVER -t meshtastic/# -v`
  - You can then consume the data easily in other systems. For example, nodered->influx db->grafana.

#Original brainstorming for MQTT:

## Abstract

:::note

This is a mini-doc/RFC sketching out a development plan to satisfy a number of 1.1 goals.

:::

- [MQTT](https://opensource.com/article/18/6/mqtt) internet accessible API. Issue #[369](https://github.com/meshtastic/Meshtastic-device/issues/169)
- An open API to easily run custom mini-apps on the devices
- A text messaging bridge when a node in the mesh can gateway to the internet. Issue #[353](https://github.com/meshtastic/Meshtastic-device/issues/353) and this nicely documented [android issue](https://github.com/meshtastic/Meshtastic-Android/issues/2).
- An easy way to let desktop app developers remotely control GPIOs. Issue #[182](https://github.com/meshtastic/Meshtastic-device/issues/182)
- Remote attribute access (to change settings of distant nodes). Issue #182
- Be sure to checkout [MQTT Settings](/docs/settings/mqtt)

## Short term goals

- We want a clean API for novice developers to write mini "apps" that run **on the device** with the existing messaging/location "apps".
- We want the ability to have a gateway web service, so that if any node in the mesh can connect to the internet (via its connected phone app or directly) then that node will provide bidirectional messaging between nodes and the internet.
- We want an easy way for novice developers to remotely read and control GPIOs (because this is an often requested use case), without those developers having to write any device code.
- We want a way to gateway text messaging between our current private meshes and the broader internet (when that mesh is able to connect to the internet)
- We want a way to remotely set any device/channel parameter on a node. This is particularly important for administering physically inaccessible router nodes. Ideally this mechanism would also be used for administering the local node (so one common mechanism for both cases).
- This work should be independent of our current (semi-custom) LoRa transport, so that in the future we can swap out that transport if we wish (to QMesh or Reticulum?)
- Our networks are (usually) very slow and low bandwidth, so the messaging must be very airtime efficient.

## Long term goals

- Store and forward messaging should be supported, so apps can send messages that might be delivered to their destination in **hours** or **days** if a node/mesh was partitioned.

## Multiple Channel support / Security

Mini-apps API can bind to particular channels. They will only see messages sent on that channel.

During the 1.0 timeframe only one channel was supported per node. Starting in the 1.1 tree we will do things like "remote admin operations / channel settings etc..." are on the "Control" channel and only especially trusted users should have the keys to access that channel.

FIXME - explain this more, talk about how useful for users and security domains.

- add channels as security

## On device API

For information on the related on-device API see [here](/docs/developers/firmware/device-api).

## MQTT transport

Any gateway-device will contact the MQTT broker.

### Topics

The "mesh/crypt/CHANNELID/NODEID/PORTID" [topic](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices) will be used for messages sent from/to a mesh.

Gateway nodes will forward any MeshPacket from a local mesh channel with uplink_enabled. The packet (encapsulated in a ServiceEnvelope) will remain encrypted with the key for the specified channel.

For any channels in the local node with downlink_enabled, the gateway node will forward packets from MQTT to the local mesh. It will do this by subscribing to mesh/crypt/CHANNELID/# and forwarding relevant packets.

If the channelid 'well known'/public it could be decrypted by a web service (if the web service was provided with the associated channel key), in which case it will be decrypted by a web service and appear at "mesh/clear/CHANNELID/NODEID/PORTID". Note: This is not in the initial deliverable.

FIXME, discuss how text message global mirroring could scale (or not)
FIXME, possibly don't global mirror text messages - instead rely on matrix/riot?
FIXME, discuss possible attacks by griefers and how they can be prevented

#### Service Envelope

The payload published on mesh/... will always be wrapped in a [ServiceEnvelope protobuf](/docs/developers/protobufs/api#serviceenvelope).

ServiceEnvelope will include the message, and full information about arrival time, who forwarded it, source channel, source mesh id, etc...

#### NODEID

The unique ID for a node. A hex string that starts with an ! symbol.

#### USERID

A user ID string. This string is either a user ID if known or a nodeid to simply deliver the message to whoever the local user is of a particular device (i.e. person who might see the screen). FIXME, see what riot.im uses and perhaps use that convention? Or use the signal +phone number convention? Or the email addr?

#### CHANNELID

FIXME, figure out how channelids work

### Gateway nodes

Any meshtastic node that has a direct connection to the internet (either via a helper app or installed Wifi/4G/satellite hardware) can function as a "Gateway node".

Gateway nodes (via code running in the phone) will contain two tables to whitelist particular traffic to either be delivered toward the internet, or down toward the mesh. Users that are developing custom apps will be able to customize these filters/subscriptions.

Since multiple gateway nodes might be connected to a single mesh, it is possible that duplicate messages will be published on any particular topic. Therefore, subscribers to these topics should
deduplicate if needed by using the packet ID of each message.

### Optional web services

#### Public MQTT broker service

An existing public [MQTT broker](https://mosquitto.org) will be the default for this service, but clients can use any MQTT broker they choose.

FIXME - figure out how to avoid impersonation (because we are initially using a public MQTT server with no special security options). FIXME, include some ideas on this in the ServiceEnvelope documentation.

#### Riot.im messaging bridge

@Geeksville will run a riot.im bridge that talks to the public MQTT broker and sends/receives into the riot.im network.

There is apparently [already](https://github.com/derEisele/tuple) a riot.im [bridge](https://matrix.org/bridges) for MQTT. That will possibly need to be customized a bit. But by doing this, we should be able to let random riot.im users send/receive messages to/from any meshtastic device. (FIXME ponder security). See this [issue](https://github.com/meshtastic/Meshtastic-Android/issues/2#issuecomment-645660990) with discussion with the dev.

### Deprecated concepts

:::caution

All of the following concepts have been deprecated

:::

You can ignore these for now...

#### MESHID (deprecated)

Earlier drafts of this document included the concept of a MESHID. That concept has been removed for now, but might be useful in the future. The old idea is listed below:

A unique ID for this mesh. There will be some sort of key exchange process so that the mesh ID can not be impersonated by other meshes.

#### DESTCLASS (deprecated)

Earlier drafts of this document included the concept of a DESTCLASS. That concept has been removed for now, but might be useful in the future. The old idea is listed below:

The type of DESTID this message should be delivered to. A short one letter sequence:

| Symbol | Description                                                   |
| ------ | ------------------------------------------------------------- |
| R      | riot.im                                                       |
| L      | local mesh node ID or ^all                                    |
| A      | an application specific message, ID will be an APP ID         |
| S      | SMS gateway, DESTID is a phone number to reach via Twilio.com |
| E      | Emergency message, see bug #FIXME for more context            |

#### DESTID (deprecated)

Earlier drafts of this document included the concept of a DESTCLASS. That concept has been removed for now, but might be useful in the future. The old idea is listed below:

Can be...

- an internet username: kevinh@geeksville.com
- ^ALL for anyone
- An app ID (to allow apps out on the web to receive arbitrary binary data from nodes or simply other apps using meshtastic as a transport). They would connect to the MQTT broker and subscribe to their topic

## Rejected idea: RAW UDP

:::warning

This idea has been rejected

:::

A number of commenters have requested/proposed using UDP for the transport. We've considered this option and decided to use MQTT instead for the following reasons:

- Most UDP uses cases would need to have a server anyways so that nodes can reach each other from anywhere (i.e. if most gateways will be behind some form of NAT which would need to be tunneled)
- Raw UDP is dropped **very** aggressively by many cellular providers. MQTT from the gateway to a broker can be done over a TCP connection for this reason.
- MQTT provides a nice/documented/standard security model to build upon
- MQTT is fairly wire efficient with multiple broker implementations/providers and numerous client libraries for any language. The actual implementation of MQTT is quite simple.

## Development plan

Given the previous problem/goals statement, here's the initial thoughts on the work items required. As this idea becomes a bit more fully baked we should add details
on how this will be implemented and guesses at approximate work items.

### Work items

- Change nodeIDs to be base64 instead of eight hex digits.
- DONE Refactor the position features into a position "mini-app". Use only the new public on-device API to implement this app.
- DONE Refactor the on device texting features into a messaging "mini-app". (Similar to the position mini-app)
- Add new multi channel concept
- Send new channels to python client
- Let python client add channels
- Add portion of channelid to the raw LoRa packet header
- Confirm that we can now forward encrypted packets without decrypting at each node
- Use a channel named "remotehw" to secure the GPIO service. If that channel is not found, don't even start the service. Document this as the standard method for securing services.
- Add first cut of the "gateway node" code (i.e. MQTT broker client) to the python API (very little code needed for this component)
- Confirm that texting works to/from the internet
- Confirm that positions are optionally sent to the internet
- Add the first cut of the "gateway node" code to the android app (very little code needed for this component)

### Enhancements in following releases

The initial gateway will be added to the python tool. But the gateway implementation is designed to be fairly trivial/dumb. After the initial release, the actual gateway code can be ported to also run inside the android app. In fact, we could have ESP32 based nodes include a built-in "gateway node" implementation.

Store and forward could be added so that nodes on the mesh could deliver messages (i.e. text messages) on an "as possible" basis. This would allow things like "hiker sends a message to friend - mesh can not currently reach friend - eventually (days later) mesh can somehow reach friend, message gets delivered"

### Mini tutorial on how to get up and running with mosquitto on a mac

1. install mqtt server

```
brew install mosquitto
```

2. start the mqtt server

```
brew services restart mosquitto
```

3. Do a quick test of server, start a subscriber on a topic:

Note: this will wait until you press control-c (publish a message, see below)

```
mosquitto_sub -t test/hello
```

4. In another window, publish a message to that topic:

```
mosquitto_pub -h localhost -q 0 -t test/hello -m 'yo!'
```

5. For Meshtastic to be able to access that server, two settings need to be changed in the
   `/usr/local/etc/mosquitto/mosquitto.conf` file:

```
listener 1883 0.0.0.0
allow_anonymous true
```

6. Restart the service:

```
brew services restart mosquitto
```

7. If you are using the mac firewall, you will need to go into: System Preferences > Security & Privacy > Firewall > Firewall Options and add it.

### Sending/receiving messages on mosquitto server using python

Here is an example publish message in python:

```
#!/usr/bin/env python3
import paho.mqtt.client as mqtt
from random import randrange, uniform
import time

client = mqtt.Client("some_client_id")
client.connect('localhost')

while True:
    randNumber = uniform(20.0, 21.0)
    client.publish("env/test/TEMPERATURE", randNumber)
    print("Just published " + str(randNumber) + " to topic TEMPERATURE")
    time.sleep(1)
```

Here is example subscribe in python:

```
#!/usr/bin/env python3

import paho.mqtt.client as paho

def on_message(mosq, obj, msg):
    print("%-20s %d %s" % (msg.topic, msg.qos, msg.payload))
    mosq.publish('pong', 'ack', 0)

def on_publish(mosq, obj, mid):
    pass

if __name__ == '__main__':
    client = paho.Client()
    client.on_message = on_message
    client.on_publish = on_publish

    client.connect("localhost", 1883, 60)

    client.subscribe("env/test/TEMPERATURE", 0)

    while client.loop() == 0:
        pass
```
