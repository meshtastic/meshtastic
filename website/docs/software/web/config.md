---
id: web-config-software
title: Initial configuration
sidebar_label: Configuration
---

## Manual Installation

Pre-requisite: You have Meshtastic Device firmware between 1.0.32 - 1.1.50

We do realize this installation method is not "easy" and are exploring ways to simplify this in the future, ideally rolling it out as part of the device firmware.

Once you have your device loaded with the Meshtastic Device firmware you need to connect to it's wifi and then manually upload the Meshtastic Web files. 

### Connect to device wifi

The easiest way to turn on the device wifi is to do the following after the device has been powered on:

* Hold down the user button
* Press and release the reset button
* Count to 2
* Let go of the user button

:::note
Some devices call this the “prog” button. On devices with two buttons where one is a reset button — it’s usually the other one. On T-beam devices it is the middle button.
:::

The device will now go into WiFi SoftAP Admin Mode. In this mode, your device will broadcast the following credentials on a built in Access Point:

* SSID: meshtasticAdmin
* Password: 12345678

:::note
The first time your device restarts after enabling WiFi, it will take an additional 20-30 seconds to boot. This is to generate self-signed SSL keys. The keys will be saved for future reuse.
:::

### Upload Meshtastic-web files

Next download the three files (app.css.gz, app.js.gz and index.html.gz) from:

[https://github.com/meshtastic/meshtastic-web/releases](https://github.com/meshtastic/meshtastic-web/releases)

Then manually upload them to your device by going to:

* Hostname over mDNS
* * [http://meshtastic.local/static](http://meshtastic.local/static)
* If mDNS doesn't work for you
* * http://{your device IP address here}/static
* * Device IP address typically defaults to 192.168.42.1

The Meshtastic-web application can then be accessed by visiting [http://meshtastic.local/](http://meshtastic.local/) or [http://192.168.42.1/](http://192.168.42.1/)

We do realize this is not "easy" and are exploring ways to simplify this in the future, ideally rolling it out as part of the device firmware.

### Wifi configuration

To enable the WiFi to access the Meshtastic Web Interface, you must at minimum set two preferences:

`wifi_ssid`
`wifi_password`

For the wifi features to be enabled, those two properties must be set. 

To turn it off, either of preference must be set as an empty string, that is a pair of double quotes each:

`wifi_ssid ""`  
`wifi_password ""`

Alternatively, you can enable the internal Soft Access Point:

`wifi_ap_mode true`

With that enabled, we will broadcast a new wifi network with the SSID and password you set. In AP mode, your device will act as a Captive Portal with a built in DNS server that resolves all name requests back to the device. Additionally, Apple Captive Portal Assistant is implemented -- if you're on an Apple device, the Meshtastic Web Interface will pop up automagically.

To turn it off, simply reboot the device.

Right now, the only way to set those preference is through the Meshtastic-python command line tool. At some point, we will be able to configure this from your mobile phone over Bluetooth.

:::note
The first time your device restarts after enabling WiFi, it will take an additional 20-30 seconds to boot. This is to generate self-signed SSL keys. The keys will be saved for future reuse.
:::
