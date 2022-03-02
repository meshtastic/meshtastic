---
id: concepts
title: Concepts
sidebar_label: Concepts
---

Various high level concepts used in the Meshtastic meta verse:

* Mesh Networking: An interconnected network by using [low-power radios](https://meshtastic.org/docs/hardware) to connect other low-power radios using LoRa to be able to send and receive messages and data. This can be completely separate from any other networks such as the internet. You can start small and get two devices to start experimenting. Do not expect to stream music or videos as LoRa is intended for smaller, lower bandwidth type uses such as text communication.
* Captive Portal: Using Meshtastic, you can create a separate Wifi network for you join your phone or computer on a mesh network. See [Web Interface](https://meshtastic.org/docs/software/web/web-app-software) for more info. This is ideal in a situation where you are remote, such as in the forest, on a mountain, or if there is a major power/internet outage such as in a storm or other disaster.
* Meshtastic Channels: Can create a *somewhat* secure method of communication on the same mesh network. The channel can be encrypted to prevent normal people from listening in on the traffic. But, it could probably be easily [cracked](https://crypto.stackexchange.com/questions/46559/what-are-the-chances-that-aes-256-encryption-is-cracked) by determined individuals. See [Channel Config](https://meshtastic.org/docs/software/settings/channel) for more info. It is also possible that your location could be triangulated by determined individuals.
