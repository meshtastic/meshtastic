---
id: module-api
title: Module API
sidebar_label: Module API
---

This is a tutorial on how to write small modules which run on the device. Modules are bits of regular 'Arduino' code that can send and receive packets to other nodes/apps/PCs using our mesh.

## Key concepts

All modules should be subclasses of MeshPlugin. By inheriting from this class and creating an instance of your new module your module will be automatically registered to receive packets.

Messages are sent to particular port numbers (similar to UDP networking). Your new module should eventually pick its own port number (see below), but at first you can simply use PRIVATE_APP (which is the default).

Packets can be sent/received either as raw binary structures or as [Protobufs](https://developers.google.com/protocol-buffers).

### Class hierarchy

The relevant bits of the class hierarchy are as follows

- [MeshPlugin](http://github.com/meshtastic/meshtastic-device/tree/master/src/mesh/MeshPlugin.h) (in src/mesh/MeshPlugin.h) - you probably don't want to use this baseclass directly
  - [SinglePortPlugin](http://github.com/meshtastic/meshtastic-device/tree/master/src/mesh/SinglePortPlugin.h) (in src/mesh/SinglePortPlugin.h) - for modules that send/receive from a single port number (the normal case)
    - [ProtobufPlugin](http://github.com/meshtastic/meshtastic-device/tree/master/src/mesh/ProtobufPlugin.h) (in src/mesh/ProtobufPlugin.h) - for modules that send/receive a single particular Protobuf type. Inherit from this if you are using protocol buffers in your module.

You will typically want to inherit from either SinglePortPlugin (if you are just sending/receiving raw bytes) or ProtobufPlugin (if you are sending/receiving protobufs). You'll implement your own handleReceived/handleReceivedProtobuf - probably based on the example code.

If your module needs to perform any operations at startup you can override and implement the setup() method to run your code.

If you need to send a packet you can call service.sendToMesh with code like this (from the examples):

```cpp
MeshPacket *p = allocReply();
p->to = dest;

service.sendToMesh(p);
```

## Example modules

A number of [key services](http://github.com/meshtastic/meshtastic-device/tree/master/src/modules) are implemented using the module API, these modules are as follows:

- [TextMessageModule](http://github.com/meshtastic/meshtastic-device/tree/master/src/modules/TextMessageModule.h) - receives text messages and displays them on the LCD screen/stores them in the local DB
- [NodeInfoModule](http://github.com/meshtastic/meshtastic-device/tree/master/src/modules/NodeInfoModule.h) - receives/sends User information to other nodes so that usernames are available in the databases
- [RemoteHardwareModule](http://github.com/meshtastic/meshtastic-device/tree/master/src/modules/RemoteHardwareModule.h) - a module that provides easy remote access to device hardware (for things like turning GPIOs on or off). Intended to be a more extensive example and provide a useful feature of its own. See [remote-hardware](/docs/software/other/remote-hardware-service) for details.
- [ReplyModule](http://github.com/meshtastic/meshtastic-device/tree/master/src/modules/ReplyModule.h) - a simple module that just replies to any packet it receives (provides a 'ping' service).

## Getting started

The easiest way to get started is:

- [Build and install](/docs/software/other/build-instructions) the standard codebase from GitHub.
- Copy [src/modules/ReplyModule.\*](http://github.com/meshtastic/meshtastic-device/tree/master/src/modules/ReplyModule.cpp) into src/modules/YourModule.*. Then change the port number from *PortNum_REPLY_APP* to *PortNum_PRIVATE_APP\*.
- Edit moduless/Moduless.cpp:setupModules() to add a call to create an instance of your module (see comment at head of that function)
- Rebuild with your new messaging goodness and install on the device
- Use the [meshtastic commandline tool](https://github.com/meshtastic/Meshtastic-python) to send a packet to your board, for example `meshtastic --dest 1234 --sendping`, where _1234_ is another mesh node to send the ping to.

## Threading

It is very common that you would like your module to be invoked periodically.
We use a crude/basic cooperative threading system to allow this on any of our supported platforms. Simply inherit from OSThread and implement runOnce(). See the OSThread [documentation](http://github.com/meshtastic/meshtastic-device/tree/master/src/concurrency/OSThread.h) for more details. For an example consumer of this API see RemoteHardwareModule::runOnce.

## Sending messages

If you would like to proactively send messages (rather than just responding to them), just call service.sendToMesh(). For an example of this see [NodeInfoModule::sendOurNodeInfo(...)](http://github.com/meshtastic/meshtastic-device/tree/master/src/modules/NodeInfoModule.cpp).

## Picking a port number

For any new 'apps' that run on the device or via sister apps on phones/PCs they should pick and use a unique 'portnum' for their application.

If you are making a new app using meshtastic, please send in a pull request to add your 'portnum' to [the master list](https://github.com/meshtastic/Meshtastic-protobufs/blob/master/portnums.proto). PortNums should be assigned in the following range:

- **0-63** Core Meshtastic use; do not use for third party apps
- **64-127** Registered 3rd party apps. Send in a pull request that adds a new entry to portnums.proto to register your application
- **256-511** Use one of these portnums for your private applications that you don't want to register publicly
- **1024-66559** Are reserved for use by IP tunneling (see [here](/docs/developers/device/portnum) for more information)

All other values are reserved.

## How to add custom protocol buffers

If you would like to use protocol buffers to define the structures you send over the mesh (recommended), here's how to do that.

- Create a new .proto file in the protos directory. You can use the existing [remote_hardware.proto](https://github.com/meshtastic/Meshtastic-protobufs/blob/master/remote_hardware.proto) file as an example.
- Run "bin/regen-protos.sh" to regenerate the C code for accessing the protocol buffers. If you don't have the required nanopb tool, follow the instructions printed by the script to get it.
- Done! You can now use your new protobuf just like any of the existing protobufs in meshtastic.
