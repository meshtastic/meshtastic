---
id: overview
title: Overview
sidebar_label: Overview
slug: /hardware
---

We currently support devices that use the ESP32 and the nRF52 microcontrollers. Both of these offer low power consumption and long battery life, but each come with their own advantages:

## ESP32

The ESP32 devices have the advantage of having a wifi interface. This allows you to connect to an access point, or run the device as an access point, and host the [web interface]. Unfortunately the ESP32 does not support Bluetooth 5.0, and so has to wake up from sleep mode every now and then to connect to bluetooth devices to receive messages. This can result in delays sending a message from phone.

The following ESP32 devices are supported:
* [Lilygo TTGO T-Beam](/docs/hardware/tbeam-hardware) - versions 0.7, 1.1 (including M8N gps and SX1262 LoRa varients)
* [Lilygo TTGO Lora](/docs/hardware/lora-hardware) - versions 1, 1.3, 2.0, 2.1-1.6
* [Heltec Lora 32 (V2)](/docs/hardware/heltec-hardware)

## nRF52

The nRF52 devices have the advantage of a Bluetooth 5.0 implementation. This allows for very low power bluetooth connections to be maintained without having to wake the microprocessor up at regular intervals. Unfortunately, the nRF52 devices do not have wifi built in, meaning that currently you cannot use the web interface with these devices.

The following nRF52 devices are currently supported:
* [Lilygo TTGO T-Echo](/docs/hardware/techo-hardware)
* [Wisblock RAK4631](/docs/hardware/wisBlock-hardware)
