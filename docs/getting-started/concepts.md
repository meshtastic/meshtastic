---
id: concepts
title: Concepts
sidebar_label: Concepts
slug: /getting-started/concepts
---

Various high level concepts used in the Meshtastic metaverse:

* mesh networking: By using [low-power radios](https://meshtastic.org/docs/hardware) to connect other low-power radios using LoRa to be able to send and receive messages and data. This can be completely separate from any other network such as the internet. You can start small and get two devices to start experimenting. Do not expect to stream music or videos as LoRa is intended for smaller, lower bandwidth type uses.
* captive portal: Using Meshtastic, you can create a separate Wifi network for you join your phone or computer on a mesh network. See [Web Interface](https://meshtastic.org/docs/software/web/web-app-software) for more info. This is ideal in a situation where you are remote, such as in the forest or on a mountain or if there is a major power/internet outage such as in a storm or other disaster.
* Meshtastic channels: Can create a *somewhat* secure method of communication on the same mesh network. They channel can be encrypted, to prevent normal people from listening in on the traffic. But, it could probably be easily cracked by determined individuals. See [Channel Config](https://meshtastic.org/docs/software/settings/channel) for more info.
* LoRaWAN: If you add a LoRa gateway, then you can interact with more networks, such as the internet.
