If you have not already done so, download and have the latest firmware for your device, and flash it to your device.

There is a very good guide for doing this [here](https://github.com/meshtastic/Meshtastic-device#firmware-installation).

Part of this guide covers the installation of pip which must be done first.

**For Linux users:**
From a terminal copy and paste the following command
```bash
pip3 install meshtastic
```

**For Windows users:**
_Insert instructions on how to install meshtastic here_

**For Mac OS users:**
_Insert instructions on how to install meshtastic here_

Using a text editor, open a blank document and copy and paste the following text

```bash
#/bin/sh
clear
echo "Set all Router Parameter"
meshtastic --setowner MeshRelay
meshtastic --settime 
meshtastic --set is_router true
meshtastic --setlat 53.9 --setlon -6.8 --setalt 91 
meshtastic –info
```

Alter the parameter `meshtastic --setowner MeshRelay` and change "MeshRelay" to your chosen name
This will set the name of the relay.

Alter the parameter `meshtastic --setlat 53.9 --setlon -6.8 --setalt 91`

This parameter sets the latitude, longitude and altitude of your relay, assuming it doesn’t have a working or installed GPS. If you have a working GPS, the device will connect to a GPS satellite and update the latitude, longitude and altitude.

Using this site, find the location of where you plan to place your relay.
[Get latitude, longitude and altitude](https://www.maps.ie/coordinates.html)

Move the place marker over the spot where your relay is to placed, and it will give you the latitude, longitude and altitude.

Enter the latitude and longitude to one decimal place and altitude is recorded in meters in the configuration file.

As a suggestion, save the configuration file into the same folder, where you have downloaded the latest device firmware.
Save the file as `relay.sh`

Go to the folder where you have saved the script and right click on "Open in Terminal"
At the command prompt in Terminal, enter the following command

```bash
sudo chmod -R 777 relay.sh 
```

This enables the script to be executed as a program.

Then at the prompt enter: `./relay.sh`

That's it, your Meshtastic device is now configure to operate as a relay.

**Some explanations of other parameters**

`meshtastic --set is_router true` tells node to be power conscious and to only power up the screen/BLE if the user presses a button. Eventually will also imply that "this node has good line of sight and should be heavily weighted when routing". This is the option you should probably use.

`meshtastic --set is_low_power true`. This option means "work like a regular node, with the normal sleep/wake pattern but even though you see power coming in on USB don’t constantly stay awake". You **almost certainly don't want this option** but it is useful for some edge cases (solar powered node that still talks Bluetooth to the app etc...).
