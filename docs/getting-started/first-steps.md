---
id: first-steps
title: First Steps
sidebar_label: First Steps
---
## Overview

Congratulations! Your node should now be running Meshtastic and hopefully you've paired to a client on your mobile device, desktop, or browser.

## Configuration

:::important
Make sure to set your `region` to the correct region so you don't transmit on an incorrect frequency.
:::

## Connection Tests

### Connect via USB and CLI

If you have at least two radios with the Meshtastic firmware, you may consider connecting one via USB and the other battery powered. Communicate with the USB radio using a CLI like [Meshtastic-python](/docs/software/python/python-installation).

- Ensure you can run `meshtastic --info`.
- Ensure the region is set appropriately. If the radios are 915 MHz and you are in the US, then no region changes/settings are necessary. If you are in another region, you may need to run something like: `meshtastic --set region EU865`.
- Send a message `meshtastic --sendtext hello1`
- Note: The radio connected via USB will not show messages sent.
- After a few seconds the other radios will show the message. You may need to press one of the buttons on the other radio to see if the message arrived.
- Run `meshtastic --nodes` to see if other nodes show in the display.
- Messages sent from the USB radio should be sent to the other radio(s) via LoRa. The default settings should allow this to work.

### Connect via Bluetooth

The Android app is currently more robust than the iOS app. But, they both should be able to interact with the radios.

- Install Android or iOS Meshtastic app
- Start Meshtastic app
- Connect to radio(s) from inside the app
- Pair with radio(s). A paring code should show on the radio. Enter that value when prompted to pair a Bluetooth device.
- Send message(s) from inside the app.
- Note: The radio connected via Bluetooth will not show messages sent.
- Verify that all other radios are receiving the message(s). Might have to click on the button on the radio to see most recent message.

### Connect via WiFi/HTTP

- Configure the _wifi_ssid_ and _wifi_password_. `meshtastic --set wifi_ssid 'xxx' --set wifi_password 'yyy'` (where xxx and yyy are the appropriate values for your network)
- Reboot radio by either removing power or pressing the power button.
- Click on the button to cycle through to the screen with IP address and verify that there was a connection to the Wifi access point.
- Send message(s). `meshtastic --host 192.168.1.200 --sendtext hello`
- Note: The radio connected via Wifi will not show messages sent.
- Verify that all radios are receiving the message(s). Might have to click on the button on the radio(s) to see most recent message.
- Open up a browser to http://meshtastic.local to view the web UI (currently under development). You may need to open http://meshtastic.local/static )
- If you want to switch back to Bluetooth, you will need to set the _wifi_ssid_ and _wifi_password_ values to blank values (ex: `meshtastic --set wifi_ssid '' --set wifi_password ''`).

## Troubleshooting

Hopefully your "getting started" experience has been straight forward and headache free. If you've had issues, please consider updating our documentation to improve future user experiences. If you're still having issues. Reach out on the [forum](https://meshtastic.discourse.group) or [Discord](https://discord.com/invite/UQJ5QuM7vq). Our support is 100% volunteer based. We are passionate about the project hope to help newcomers become Meshtastic experts.
