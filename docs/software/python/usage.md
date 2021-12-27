---
id: python-usage
title: Meshtastic-python usage
sidebar_label: Python usage
---

An example using Python 3 code to send a message to the mesh, get and set a radio configuration preference:
```python
import meshtastic
import meshtastic.serial_interface

# By default will try to find a meshtastic device,
# otherwise provide a device path like /dev/ttyUSB0
interface = meshtastic.serial_interface.SerialInterface()
# or something like this
# interface = meshtastic.serial_interface.SerialInterface(devPath='/dev/cu.usbmodem53230050571')

# or sendData to send binary data, see documentations for other options.
interface.sendText("hello mesh")

ourNode = interface.getNode('^local')
print(f'Our node preferences:{ourNode.radioConfig.preferences}')

# update a value
print('Changing a preference...')
ourNode.radioConfig.preferences.gps_update_interval = 60

print(f'Our node preferences now:{ourNode.radioConfig.preferences}')
ourNode.writeConfig()

interface.close()
```

Another example using Python 3 code to send a message to the mesh when WiFi is enabled:
```python
import time
import meshtastic
import meshtastic.tcp_interface
from pubsub import pub

def onReceive(packet, interface): # called when a packet arrives
    print(f"Received: {packet}")

def onConnection(interface, topic=pub.AUTO_TOPIC): # called when we (re)connect to the radio
    # defaults to broadcast, specify a destination ID if you wish
    interface.sendText("hello mesh")

pub.subscribe(onReceive, "meshtastic.receive")
pub.subscribe(onConnection, "meshtastic.connection.established")
interface = meshtastic.tcp_interface.TCPInterface(hostname='192.168.68.74')
while True:
    time.sleep(1000)
interface.close()
```

Note: Be sure to change the IP address in the code above to a valid IP address for your setup.


You can get and update settings like this:
```python
import meshtastic
import meshtastic.serial_interface
interface = meshtastic.serial_interface.SerialInterface()

ourNode = interface.getNode('^local')
print(ourNode.radioConfig.preferences)
ourNode.radioConfig.preferences.gps_update_interval = 60
print(ourNode.radioConfig.preferences)
ourNode.writeConfig()

interface.close()
```


For the rough notes/implementation plan see [TODO](https://github.com/meshtastic/Meshtastic-python/blob/master/TODO.md). See the API for full details of how to use the library.

## A note to developers of this lib

We use the visual-studio-code default python formatting conventions (autopep8).  So if you use that IDE you should be able to use "Format Document" and not generate unrelated diffs.  If you use some other editor, please don't change formatting on lines you haven't changed.

If you need to build a new release you'll need:
```bash title="Command"
apt install pandoc
sudo pip3 install markdown pandoc webencodings pyparsing twine autopep8
```
