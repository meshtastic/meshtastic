---
id: wifi
title: WiFi Settings
sidebar_label: WiFi
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

WiFi support can be configured as either a WiFi Client or a Software Access Point (SoftAP). The WiFi client will connect to your existing WiFi network, as opposed to the SoftAP which will broadcast a new SSID and Password. See below for more details.

:::note
The device can be either a WiFi client or a software access point. It **cannot** operate as both at the same time.
:::

## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| wifi_ap_mode | `true`, `false` | `false` |
| wifi_password | string | `""` |
| wifi_ssid | string | `""` |

:::note
`wifi_ssid` & `wifi_password` are both **case sensitive** values.
:::

### wifi_ap_mode

A boolean value that toggles the [Software Access Point](#software-access-point)

### wifi_password

In [SoftAP](#software-access-point) mode, this is the password to access your device's WiFi. In [Client](#wifi-client) mode, this is your WiFi Networks password. This string is case sensitive.

### wifi_ssid

In [SoftAP](#software-access-point) mode, this is the SSID broadcast to access your device's WiFi. In [Client](#wifi-client) mode, this is your WiFi Networks SSID. This string is case sensitive.

## Details

### Software Access Point

With the SoftAP enabled, a DNS server will run on the device. The DNS server will respond to all DNS requests with the IP address of your device. This will simplify device discovery because you will not have to remember the device's IP – any unencrypted HTTP request will direct you to the right location.

#### Force SoftAP

You can also enable the SoftAP by following these directions:

* Hold down the user button
* Press and release the reset button
* Count to two
* Let go of the user button

This will reboot the device with the SSID set to `meshtasticAdmin` and the password set to `12345678`. Using the Force SoftAP method, once you reboot, the SoftAP will be turned off.

### WiFi Client

With `wifi_ssid` & `wifi_password` populated, the device will now to connect to your network. Make sure you are in range of your WiFi. If you have a single device on your local network it's easy to connect to your device `http://meshtastic.local`. If you have multiple devices you will need to connect using thier respective IP addresses.

To disable WiFi completely, set `wifi_ap_mode` to `false`, and both `wifi_ssid` & `wifi_password` to an empty string `""`.

## Examples

### Enable WiFi (as client)
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Enabling WiFi Client"
  meshtastic --set wifi_ap_mode false --set wifi_ssid mywifissid --set wifi_password mywifipassword
  ```

:::note
If your `wifi_ssid` or `wifi_password` contain spaces, be sure to put quotation marks around the whole thing:
```bash title="Example with spaces"
meshtastic --set wifi_ssid "my wifi ssid" --set wifi_password "my wifi password"
```
:::
  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

In the above example, the device will join a network with the SSID `mywifissid` and the password `mywifipassword`.

### Enable WiFi (as SoftAP)
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Software Access Point Example"
  meshtastic --set wifi_ap_mode true --set wifi_ssid mywifissid --set wifi_password mywifipassword
  ```

:::note
If your `wifi_ssid` or `wifi_password` contain spaces, be sure to put quotation marks around the whole thing:
```bash title="Example with spaces"
meshtastic --set wifi_ssid "my wifi ssid" --set wifi_password "my wifi password"
```
:::



  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

In the above example, the device will broadcast a network with the SSID `mywifissid` and the password `mywifipassword`.

### Disable WiFi Completely
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Example - Disabling WiFi"
  meshtastic --set wifi_ap_mode false --set wifi_ssid "" --set wifi_password ""
  ```


  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>
