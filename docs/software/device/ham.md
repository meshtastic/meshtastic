---
id: ham
title: Licensed (HAM) Operation
sidebar_label: Licensed (HAM) Operation
slug: /software/device/ham
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Ham Operators

(This written US only, may be applicable elsewhere)

Meshtastic can be used by both unlicensed people and licensed operators.

Having a ham radio license grants you addition privilages and restrictions.

# Additional privilages

* Additional power
* Higher gain antennas

# Restrictions

* Unencrypted
* Identified with your ID

# Let's do it!

Remember, by doing this you are self certifying that you are licensed operate in the mode you have chosen. Failure to comply with your local regulations may result in fines.

## Use the Python CLI

Meshtastic is designed to be used without a radio operator license. If you do have a license you can set your operator ID and turn off encryption with the [Python CLI](/docs/software/python/python-uses#ham-radio-support):

```bash title="Expected Output"
# You should see a result similar to this:
mydir$ meshtastic --port /dev/ttyUSB1 --set-ham KI1345
Connected to radio
Setting Ham ID to KI1345 and turning off encryption
Writing modified channels to device
```