---
id: modules
title: Modules overview
sidebar_label: Overview
---

There are a number of modules that have been integrated into the device firmware. These can be turned on using the Meshtastic python command line program. Please note that these modules require the device to be rebooted once they have been enabled for them to start running.

These modules are currently integrated into the firmware:

- Range test - Allows automated testing of communication range of nodes
- External notifications - Allows a speaker, LED or other device to indicate when a message has been received
- Canned messages - Device can be used without the phone to send a message by choosing a predefined text
- Serial - Allows messages to be sent across the mesh by sending strings across a serial port

These modules are currently in development:

- Store and forward - Allows a node to store messages and resend them to nodes that have intermittent connection to the mesh
- Environment measurement - Allows a node to measure it's local environment and report across the mesh
