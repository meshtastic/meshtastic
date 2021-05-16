---
id: about
title: What is Meshtastic?
sidebar_label: About
slug: /about
---

Meshtastic® lets you use inexpensive ($30 ish) LoRa radios as an extensible, long battery life, secure, mesh GPS communicator. These radios are great for hiking, skiing, paragliding - essentially any hobby where you don't have reliable internet or mobile phone coverage. Each member of your private mesh can see the location and distance of all other members and any text messages sent to your group chat.

The radios automatically create a mesh to forward packets as needed, so everyone in the group can receive messages from even the furthest member. The radios will optionally work with your phone, but no phone is required.

## Uses

* Outdoor sports where cellular coverage is limited. (Hiking, Skiing, Boating, Paragliding, Gliders etc..)
* Applications where closed source GPS communicators just won't cut it (it is easy to add features for glider pilots etc...)
* Secure long-range communication within groups without depending on cellular providers
* Finding your lost kids ;-)
* Through our [python API](https://pypi.org/project/meshtastic/) use these inexpensive radios to easily add mesh networking to your own projects.

## Features

* Very long battery life (should be up to eight days with the current software)
* Fully managed [LoRa](https://en.wikipedia.org/wiki/LoRa) radio
* GPS mapping of nodes
* Long range - a few miles per node (depending on line of sight) but each node can forward packets as needed
* Secure - channels are encrypted by AES256 (But see important [disclaimers](/docs/developers/device/encryption) about this feature)
* Shows direction and distance to members of your channel
* Directed or broadcast text messages for channel members
* Open and extensible codebase supporting multiple hardware vendors - no lock in to one vendor
* Communication API for bluetooth and serial devices to use the mesh
* Very easy sharing of private secured channels. Just share a special link or QR code with friends and they can join your encrypted mesh

This project is currently in beta testing but it is fairly stable and feature complete 

This software is 100% open source and developed by a group of hobbyist experimenters. No warranty is provided, if you'd like to improve it - we'd love your help. Please post in the [forum](https://meshtastic.discourse.group/).

## Software applications

The following applications are available to support your Meshtastic network:
  * The [firmware](/docs/software/device/device-software) to run on the devices
  * Connect to the devices with our [Android app](/docs/software/android/android-installation)
  * An [iOS application](/docs/software/ios/ios-development) is in the works
  * [Meshtastic.js](/docs/software/js/getting-started) provides a javascript library to interface with devices
  * [Meshtastic-python](/docs/software/python/python-installation) provides access from desktop computers
  * A [web interface](/docs/software/web/web-app-software) can be accessed over wifi on ESP32 devices
  * Pre-installed device plugins for:
    * [Range testing](/docs/software/plugins/range-test-plugin)
    * [External notifications](/docs/software/plugins/ext-notif-plugin)
    * [Serial communication](/docs/software/plugins/serial-plugin)
    * [Store and forewarding messages](/docs/software/plugins/store-forward-plugin) (in development)
    * [Environment measurement](/docs/software/plugins/environment-plugin) (in development)
  * Community projects include:
    * A [plugin](/docs/software/community/community-atak) for the [Android Team Awareness Kit (ATAK)](https://play.google.com/store/apps/details?id=com.atakmap.app.civ)
    * [PyGUI](/docs/software/community/community-pygui), a platform agnostic graphical user interface for devices

## Supported hardware

We currently support a number of different devices based on the ESP32 and nRF52 microcontrollers. The way it is designed allows it to ported to new boards relatively easily. See our [hardware](/docs/hardware) section for a complete listing of supported hardware.

Make sure to buy the frequency range which is legal for your country. In the Americas get the 915mhz version, in Europe the 868Mhz, or Asia 923Mhz. See this listing by [The Things Network](https://www.thethingsnetwork.org/docs/lorawan/frequencies-by-country.html) for frequencies by specific countries. Getting a version that include a screen is optional, but highly recommended.

## Getting involved

Looking for help in getting started? Have you set up a network you want to showcase? Or built a new board or enclosure? Join our [forum](https://meshtastic.discourse.group/) and let us know! We actively welcome new users.

Have you got an idea that you want to see implemented? Do you want to help improve Meshtastic? We welcome all developers, new and experienced! See our [Developers](/docs/developers) section, browse our code on [GitHub](https://github.com/meshtastic), open a new issue and discuss your ideas on the [forum](https://meshtastic.discourse.group/)!

