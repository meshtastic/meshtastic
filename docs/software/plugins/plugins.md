---
id: plugins
title: Plugins overview
sidebar_label: Overview
---

There are a number of plugins that have been integrated into the device firmware. These can be turned on using the Meshtastic python command line program. Please note that these plugins require the device to be rebooted once they have been enabled for them to start running.

These plugins are currently integrated into the firmware:
* Range test - Allows automated testing of communication range of nodes
* External notifications - Allows a speaker, LED or other device to indicate when a message has been received
* Serial - Allows messages to be sent across the mesh by sending strings across a serial port

These plugins are currently in development:
* Store and forward - Allows a node to store messages and resend them to nodes that have intermittent connection to the mesh
* Environment measurement - Allows a node to measure it's local environment and report across the mesh
