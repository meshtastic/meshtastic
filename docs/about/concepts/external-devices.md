---
id: external-devices
title: External Devices
sidebar_label: External Devices
---

## Overview

External hardware can be connected to your device using a GPIO (General Purpose Input/Output) interface. Using GPIO, you are able to connect external buttons, circuits, rotary encoders, environmental sensors and more. Many of our modules offer solutions to implement additional functionality.

Soldering is likely required when attaching items to your device, so practice your skills elsewhere before trying on your radio. If you're not careful or don't know what your doing, you can damage your hardware.

## Features using External Devices

Many of our modules require external hardware to be attached to the device.

### Canned Message Module

Requires use of the [rotary encoder module](#rotary-encoder-module). The rotary encoder acts as an input to select one of up to 50 customizable messages. This way you can send canned messages without needing to pair your device to a phone.

### Environmental Measurement Module

Broadcast environmental measurements to your mesh! Temperature, Humidity, Pressure, & VOC Gas are all options that are currently available with the supported sensors.

### External Notifications Module

Use lights, buzzers, or speakers to alert you of incoming messages.

### Rotary Encoder Module

Currently used only for the [canned message module](#canned-message-module), this module allows you to connect a rotary encoder to be used as an additional input to the device.

### Serial Module

Available for ESP32 based devices, the serial moduleallows you to send messages over the mesh by sending strings over a serial port.
