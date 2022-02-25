---
id: overview
title: About Meshtastic
sidebar_label: About Meshtastic
slug: /about
---
:::info
This section is new and is still being developed. If you'd like to contribute, please do!
:::

## What is Meshtastic

Meshtastic is an off-grid, encrypted communication platform that runs open source software on affordable radios. These radios rebroadcast messages they receive in order to create a mesh network. The underlying technology, LoRa is a long range radio protocol that is available to most regions without needing certification like ham operators.

Paired with the Meshtastic companion app, you are able to send and receive encrypted messages on your personal mesh. These radios have low power draw so they have excellent battery life. Perfect for outdoor excursions like backpacking, hiking, paragliding, and skiing where communication can be sparse.

Radios can be paired to a single phone so that you're able to message your friends and family, and they can address your specific radio.

## How does it work

When you send a message on your Meshtastic companion app, it is relayed to the radio using bluetooth. That message is then broadcast by the radio three times over a certain interval in order to create redundancy for lost packets.

When a receiving radio captures a packet, it checks to see if it has heard that message before. If it has it ignores the message. If it hasn't heard the message, it will rebroadcast it at a certain interval three times.

For each message a radio rebroadcasts, it marks the "hop limit" down by one. When a radio receives a packet with a hop limit of zero, it will not rebroadcast the message.

## Who develops Meshtastic
<!--- FIXME add Github organization list/contributor list --->

Meshtastic is an open source project available on GitHub. Our generous volunteers donate their personal time to write and maintain this codebase. If you would like to contribute see our [GitHub](https://github.com/meshtastic), join our [Discord server](https://discord.com/invite/UQJ5QuM7vq), and read up on our [forum](https://meshtastic.discourse.group).
