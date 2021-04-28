---
id: python-usage
title: Meshtastic-python usage
sidebar_label: Python usage
---

An example using Python 3 code to send a message to the mesh:
```python
import meshtastic
interface = meshtastic.SerialInterface() # By default will try to find a meshtastic device, otherwise provide a device path like /dev/ttyUSB0
interface.sendText("hello mesh") # or sendData to send binary data, see documentations for other options.
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