---
id: overview
title: Overview
sidebar_label: Overview
slug: /developers
---
# How to Help

Meshtastic is a team of volunteers and as such there is always plenty of ways to help. This project gets great contributions from people in their off hours. Those contributors work on the features they are interested in. It is a very open and welcoming developer community, and we are always looking for help to improve Meshtastic.

* If you're a developer, there's plenty stuff to do. Dig in!
* If you're interacting with Meshtastic radios, we could use help with testing, documenting and providing feedback.
* If you're into Web Development, check out the different web repos.
* If you're into Kotlin and Android, check out the link to the repo below.
* If you're into Python, check out the link to the repo below
* If you're into Ham Radio and LoRa, then this is a great project for you!
* ... basically... we would love to have your help and feedback

There are several developers, testers, and active users on [Discord](https://discord.gg/UQJ5QuM7vq).

There are many technologies (and repositories) used in creating the Meshtastic ecosystem. Below is a breakdown:

## Protocol buffers
Most communication and interactions happen with protocol buffers. The [Meshtastic-protobufs](https://github.com/meshtastic/Meshtastic-protobufs) repo is where all of the protocol buffer changes happen. See the [Protobuf API Reference](https://meshtastic.org/docs/developers/protobufs/api) for more details.

## Firmware
The [Meshtastic-device](https://github.com/meshtastic/Meshtastic-device) is where all of the firmware development happens. This is where the code for the ESP32 and nRF52 based devices to interact is developed. It is mainly C and C++ code.Think Arduino. It is where the first level of hardware interaction begins and ends.

## Plugins
[Plugins](https://meshtastic.org/docs/software/plugins/) are also implemented mainly in the Meshtastic-device repo above. Typically, you would add functionality in the protobufs repo and the device repo to implement plugin functionality. You probably also want to have some client/device use/interact with the plugin and that is where the Device support comes into play.

## Device Support
The [Meshtastic-python](https://github.com/meshtastic/Meshtastic-python) is typically where the first device interaction takes place, but that is not a requirement. This repo has a command line utility that allows you to interact with most functionality with the devices. This python library can also be consumed for other applications. See [Community applications](https://meshtastic.org/docs/software/community/community-overview) for other Meshtastic applications.

## Web Application
The [Meshtastic-web](https://github.com/meshtastic/meshtastic-web) is where the hosted web server on the ESP32 devices in Typescript is developed. See the [Web interface overview](https://meshtastic.org/docs/software/web/web-app-software) for more details.

The [meshtastic.js](https://github.com/meshtastic/meshtastic.js) is a JavaScript library that provides an interface for Meshtastic devices.

@sachaw has been making tons of progress on the web app and would love help with:

    * Saving of preferences
    * Better loading state indicators
    * Chat scroll lock
    * Various plugin support

## Phone Apps
There are two phone apps that interact with the Meshtastic devices:

* The [Meshtastic-Android](https://github.com/meshtastic/Meshtastic-Android) repo contains the Kotlin code for Android based interactions with Meshtastic devices. See [here](https://meshtastic.org/docs/developers/android/build-app) for how to build/create a development environment for the Meshtastic Android App.
* The iOS app is in the process of a complete re-write in Swift and will have the new repo published soon. Note: There are a couple of earlier implementations.

## Documentation
This website is in the [Meshtastic](https://github.com/meshtastic/Meshtastic) repository.
