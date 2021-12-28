---
id: device-wifi
title: WiFi on ESP32 devices
sidebar_label: WiFi
---

The ESP32 based devices have the ability to connect to WiFi and also are able to create a software based access point. The WiFi can be set up through the python API. The WiFi can also be set to AP mode by rebooting the device with the program switch depressed.

## Setting up WiFi in host mode

To enable WiFi access to an existing access point, you need to set two preferences:

* `wifi_ssid`
* `wifi_password`

This can be done using the python CLI

```bash title="Expected output"
$ meshtastic --set wifi_ssid dogsRuleCatsDrool --set wifi_password butDogsFearCats
Connected to radio
Set wifi_ssid to dogsRuleCatsDrool
Set wifi_password to butDogsFearCats
Writing modified preferences to device
```

Once connected, if you have a screen attached to your device, the final page will display something similar to the following:

```
WiFi: Connected  RSSI-63
IP: 192.168.1.89
SSID: dogsRuleCatsDrool
http://meshtastic.local
      * * * * *
```

You should then be able to connect to the node using either the displayed IP address or the HTTP link.

To disable the WiFi, set the preferences to empty strings.

```bash title="Expected output"
$ meshtastic --set wifi_ssid "" --set wifi_password ""
Connected to radio
Set wifi_ssid to 
Set wifi_password to 
Writing modified preferences to device
```

## Setting up WiFi in AP mode

The device can also be set up in access point mode and is capable of hosting up to four connected devices. The access point is enabled by setting the following preferences:

* `wifi_ap_mode`
* `wifi_ssid`
* `wifi_password`

### Setting up the AP using the python CLI

Use the following command to set the preferences:

```bash title="Expected output"
$ meshtastic --set wifi_ssid dogsRuleCatsDrool --set wifi_password butDogsFearCats --set wifi_ap_mode true
Connected to radio
Set wifi_ssid to dogsRuleCatsDrool
Set wifi_password to butDogsFearCats
Set wifi_ap_mode to true
Writing modified preferences to device
```

Once set, if you have a screen attached to your device, the final page will display something similar to the following:

```
WiFi: Software AP
IP: 192.168.42.1    (0/4)
SSID: dogsRuleCatsDrool      - alternating with - PWD: butDogsFearCats
http://meshtastic.local
      * * * * *
```

:::note
The first time your device restarts after enabling the WiFi access point, it will take an additional 20-30 seconds to boot. This is to generate self-signed SSL keys. The keys will be saved for future reuse.
:::

To disable the WiFi access point, set the preferences to empty strings and the `wifi_ap_mode` to `false`

```bash title="Expected output"
$ meshtastic --set wifi_ssid "" --set wifi_password "" --set wifi_ap_mode false
Connected to radio
Set wifi_ssid to 
Set wifi_password to 
Set wifi_ap_mode to false
Writing modified preferences to device
```

### Setting up the AP using the admin mode

This allows you to set up the access point mode without needing to use a computer to set the preferences. This is the easiest way to turn on the device WiFi. Do the following after the device has been powered on:

* Hold down the user button
* Press and release the reset button
* Count to 2
* Let go of the user button 

On reboot, if you have a screen attached to your device, the final page will display something similar to the following:

```
WiFi: Software AP (Admin)
IP: 192.168.42.1    (0/4)
SSID: meshtasticAdmin       - alternating with - PWD: 12345678
http://meshtastic.local
      * * * * *
```

To disable to WiFi access point, simply reboot your device.