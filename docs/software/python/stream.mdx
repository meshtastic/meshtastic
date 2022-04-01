---
id: python-stream
title: Meshtastic-python stream protocol
sidebar_label: Stream Protocol
---

# Stream protocol

Documentation on how out protobufs get encoded when placed onto any stream transport (i.e. TCP or serial, but not UDP or BLE)

## Wire encoding

When sending protobuf packets over serial or TCP each packet is preceded by uint32 sent in network byte order (big endian).
The upper 16 bits must be 0x94C3. The lower 16 bits are packet length (this encoding gives room to eventually allow quite large packets).

Implementations validate length against the maximum possible size of a BLE packet (our lowest common denominator) of 512 bytes. If the
length provided is larger than that we assume the packet is corrupted and begin again looking for 0x4403 framing.

The packets flowing towards the device are ToRadio protobufs, the packets flowing from the device are FromRadio protobufs.
The 0x94C3 marker can be used as framing to (eventually) resync if packets are corrupted over the wire.

Note: the 0x94C3 framing was chosen to prevent confusion with the 7 bit ascii character set. It also doesn't collide with any valid utf8 encoding. This makes it a bit easier to start a device outputting regular debug output on its serial port and then only after it has received a valid packet from the PC, turn off unencoded debug printing and switch to this
packet encoding.
