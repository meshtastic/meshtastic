---
id: device-firmware
title: Device firmware
sidebar_label: Device firmware
---

The device firmware runs on the nodes to build the mesh for communication. Each different make and model of device requires a different build of the Meshtastic firmware in order to run properly. Thankfully, due to the design of Meshtastic, it is possible to port the firmware to new devices as they become available. The firmware currently runs on a range of ESP32 based devices, but there is also increasing support for the nRF52 microprocessor with some more recent devices coming to market.

The current firmware has support for a screen to display received messages, along with information about nodes on the mesh, and more detailed information about the device on which it is running.

The latest firmware can be downloaded from the [Firmware](/firmware) page. If you wish to view the code or contribute to development of the firmware, please visit the device code <a href="https://github.com/meshtastic/Meshtastic-device">GitHub page</a>.

### Buttons

A number of devices support buttons that can be used to interact with the firmware. These buttons have a number of different functions:

- Reset button - This is present on most devices
- Power button - This is present on some devices. A long press powers the device off or turns it back on again.
- Program button - This is present of some devices and has a number of functions:
  - Single press - This changes the page of information displayed on the screen.
  - Double press - This sets the Bluetooth pairing code to `123456` (useful if you do not have a screen on the device).
  - Long press - This adjusts the contrast of the screen.
  - Long press during reboot - This turns on the software Wifi access point on devices that support Wifi.

### Screens

A number of devices have screens capable of displaying the messages received and information about the mesh and other details. On powering the device it will display the Meshtastic splash screen for a couple of seconds:

![Splash screen](/img/screen/mesh-splash.jpg)

The screen is split up into pages, through which you can navigate using the program button as described above. The first page to be displayed will be the message screen where received messages are displayed along with the name of the node it came from. The devices will automatically switch to this page when a new message is received.

![Message page](/img/screen/mesh-message.jpg)

The next pages display information about the nodes that are currently on the mesh. This includes the distance and direction to that node, along with signal strength and time last seen.

![Node page](/img/screen/mesh-node1.jpg) ![Node page](/img/screen/mesh-node2.jpg)

The next page shows information about the device, battery power, number of nodes and how many are connected current, number of GPS satellites being received, channel name, last digits of the MAC address, and names of the last nodes to join the mesh.

![Channel page](/img/screen/mesh-channel.jpg)

The final page shows current battery voltage and capacity, as well as noting how long the device has been online and the current GPS time and GPS location.

![GPS page](/img/screen/mesh-gps.jpg)

If the device Wifi has been enabled (only possible on ESP32 devices), another page appears displaying information about the WiFi settings, IP address and number of devices connected to the WiFi.

![Wifi page](/img/screen/mesh-wifi.jpg)

With a further press of the program button, the screen will cycle round to the message page.
