---
id: mesh-alg
title: Mesh broadcast algorithm
sidebar_label: Mesh algorithm
---

## Current Algorithm

The routing protocol for Meshtastic is really quite simple (and suboptimal). It is heavily influenced by the mesh routing algorithm used in [RadioHead](https://www.airspayce.com/mikem/arduino/RadioHead/) (which was used in very early versions of this project). It has four conceptual layers.

### A Note About Protocol Buffers

Because we want our devices to work across various vendors and implementations, we use [Protocol Buffers](https://github.com/meshtastic/Meshtastic-protobufs) pervasively. For information on how the protocol buffers are used with respect to API clients see [sw-design](/software/other/sw-design.md), for purposes of this document you mostly only
need to consider the MeshPacket and Subpacket message types.

### Later 0: LoRa Radio

All data is converted into LoRa symbols which are sent to the radio for transmission. The details are described elsewhere, but it is worth noting that in addition to the converted packet bytes described below, there is also a preamble sent at the start of any data packet.

This preamble allows receiving radios to synchronize clocks and start framing. We use a preable length of 32, which is longer than the minimum preamble length of 8, to maximize the amount of time the LoRa receivers can stay asleep, which dramatically lowers power consumption.

### Layer 1: Unreliable Zero Hop Messaging

This layer is conventional non-reliable LoRa packet transmission. The transmitted packet has the following representation before encoding for transmission:

| Offset | Length | Type | Usage |
|--------|--------|------|-------|
| 0x00 | 1 byte | Integer | syncWord, always `0x2B`. |
| 0x01 | 4 bytes | Integer | Packet header: Destination. The destination's unique NodeID. `0xFFFFFFFF` for broadcast. |
| 0x05 | 4 bytes | Integer | Packet Header: Sender. The sender's unique NodeID. |
| 0x09 | 4 bytes | Integer | Packet Header: The sending node's unique packet ID for this packet. |
| 0x0D | 32 bits | Bits | Packet Header: Flags. See the [header flags](#packet-header-flags) for usage. |
| 0x11 .. 0xFD | Varies, maximum of 237 bytes. | Bytes | Actual packet data. Unused bytes are not transmitted. |
| 0xFE .. 0xFF | 2 Bytes | Bytes | Unused. |

#### Packet Header Flags

| Index | # of Bits | Usage |
|-------|-----------|-------|
| 0 | 3 | HopLimit (see note in Layer 3) |
| 3 | 1 | WantAck |
| 4 .. 32 | 28 | Currently unused |

#### Usage Details

- **Packet Header:** is described directly by the `PacketHeader` class in the C++ source code. But indirectly it matches the first portion of the `MeshPacket` protobuf definition. Note that the packet header is not encoded using a protobuf, but is sent as raw bytes. This both saves airtime and allows receiving radio hardware to optionally filter packets before waking the main CPU.

- **Packet Header - NodeIDs:** are constructed from the bottom four bytes of the MAC address of the Bluetooth address. Because the OUI is assigned by the IEEE, and we currently only support a few CPU manufacturers, the upper byte is defacto guaranteed unique for each vendor. The bottom 3 bytes are guaranteed unique by that vendor.

- **Packet Header - Unique ID:** The ID is a large, 32 bit ID to ensure there is enough unique state to protect an encrypted payload from attack.

- **Payload:** An encrypted and packed protobuf encoding of the SubPacket protobuf. Only the SubPacket is encrypted, while headers are not. This allows the option of eventually allowing nodes to route packets without knowing anything about the encrypted payload. For more information, see the [encryption](/docs/developers/device/encryption) and [protobufs](/docs/developers/protobufs/api) documentation. Any data past the maximum length is truncated.

#### Collision Avoidance

All transmitters must listen before attempting to transmit. If another node is heard transmitting, the listening node will reattempt transmission after a calculated delay. The delay depends on various settings and is based on Semtech's [LoRa Modem Design Guide](/documents/LoRa_Design_Guide.pdf), section 4 and implemented in `RadioInterface::getPacketTime`. The following tables contains some calculated values for how long it takes to transmit a packet, which is used to calculate the delay.

| Payload Bytes | Spreading Factor | Bandwidth | Coding Rate | Time |
|---------------|------------------|-----------|-------------|------|
| 0 | 7 | 125 kHz | 4/5 | 13 ms |
| 237 | 7 | 125 kHz | 4/5 | 100 ms |
| 0 | 7 | 500 kHz | 4/5 | 4 ms |
| 237 | 7 | 500 kHz | 4/5 | 25 ms |
| 0 | 10 | 250 kHz | 4/7 | 51 ms |
| 237 | 10 | 250 kHz | 4/7 | 391 ms |
| 0 | 11 | 250 kHz | 4/6 | 101 ms |
| 237 | 11 | 250 kHz | 4/6 | 633 ms |
| 0 | 9 | 31.25 kHz | 4/8 | 201 ms |
| 237 | 9 | 31.25 kHz | 4/8 | 2.413 **seconds** |
| 0 | 12 | 125 kHz | 4/8 | 402 ms |
| 237 | 12 | 125 kHz | 4/8 | 3.482 **seconds** |

The actual delay calculation is a random value between 100ms (a hardcoded minimum) and the time taken to transmit just the header, which is given in the table as a 0 Byte payload.

### Layer 2: Reliable Zero Hop Messaging

This layer adds reliable messaging between the node and its immediate neighbors only.

The default messaging provided by Layer 1 is extended by setting the `WantAck` flag in the MeshPacket protobuf. If `WantAck` is set, the following documentation from mesh.proto applies:

> This packet is being sent as a reliable message, we would prefer it to arrive at the destination. We would like to receive an ACK packet in response.
>
> Broadcast messages treat this flag specially: Since ACKs for broadcasts would rapidly flood the channel, the normal ACK behavior is suppressed. Instead, the original sender listens to see if at least one node is rebroadcasting this
packet (because naive flooding algorithm). If it hears that, the odds (given typical LoRa topologies) are very high that every node should eventually receive the message. So FloodingRouter.cpp generates an implicit ACK which is delivered to the original sender. If after some time we don't hear anyone rebroadcast our packet, we will timeout and retransmit, using the regular resend logic.

If a transmitting node does not receive an ACK (or NAK) packet within FIXME milliseconds, it will use Layer 1 to attempt a retransmission of the sent packet. A reliable packet (at this 'zero hop' level) will be resent a maximum of three times. If no ACK or NAK has been received by then the local node will internally generate a NAK (either for local consumption or use by higher layers of the protocol).

Similarly to the delay used for [collision avoidance](#collision-avoidance), a delay is used before attempting to retransmit a dropped packet. The delay is calculated based on the time it takes to transmit just the header, which is a packet with a 0 Byte payload, and is a random value between `9 * header time` and `10 * header time`, in milliseconds.

### Layer 3: (Naive) Flooding for Multi-Hop Messaging

Given our use-case for the initial release, most of our protocol is built around [flooding](<https://en.wikipedia.org/wiki/Flooding_(computer_networking)>). The implementation is currently 'naive' and doesn't try to optimize flooding, except by abandoning retransmission once a node has seen a nearby receiver ACK the packet it's trying to flood. This means that up to N retransmissions of a packet could occur in an N node mesh.

If any mesh nodes see a packet with a HopLimit other than zero, it will decrement that HopLimit and attempt retransmission on behalf of the original sending node.

:::note
A node being in router mode does **not** currently change this behavior, but is intended to be used for future versions of the meshing algorithm. For an explanation of what router mode currently does, see [settings](/docs/software/settings/router#enabledisable-router-mode).
:::

### Layer 4: DSR for Multi-Hop Unicast Messaging

This layer is not yet fully implemented and is currently unused. Eventually conventional [DSR](https://en.wikipedia.org/wiki/Dynamic_Source_Routing) will be used for for unicast messaging, unless transport is switched to [QMesh](https://github.com/faydr/QMesh) or [Reticulum](https://github.com/markqvist/Reticulum).

Currently, we send any multi-hop unicasts as broadcasts so that we can leverage the existing flooding implementation, even when broadcasts are not required. While this is suboptimal, it is a very rare use-case, because current networks are small and are geared towards a hiking use case, which means that most nodes are withing a very small number of hops.

If a node is attemptimg to broadcast a packet and receives an ACK for that packet, it can stop trying to broadcast that packet.
