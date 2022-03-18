---
id: m-flasher
title: FAQs - Meshtastic Flasher
sidebar_label: Meshtastic Flasher
---

## Overview

### Why does my operating system flag Meshtastic Flasher as having malware?

The flasher contains no malware and completely passed the Microsoft malware scanning. It appears that a lot of file download services are using the Windows Defender data, so if you're seeing alerts of a detected trojan please [update your Windows Defender definitions](https://www.microsoft.com/en-us/wdsi/defenderupdates).

### What if I'm still having issues on Windows 10?

It's been reported that `App execution aliases` might conflict with one another and prevent python from being able to run properly. There is an example of a fix located [here](https://github.com/meshtastic/Meshtastic-gui-installer/issues/154).
