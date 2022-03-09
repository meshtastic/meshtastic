---
id: python-standalone
title: Meshtastic-python standalone executable
sidebar_label: Standalone
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

There are standalone executable files for Mac, Windows and Ubuntu. A single file is all you need to run the command line interface (CLI) Meshtastic tool. There is a zip file per operating system. To use, see the operating system specific notes below:

They can be found on the [Releases](https://github.com/meshtastic/Meshtastic-python/releases) page.

<Tabs
groupId="operating-system"
defaultValue="windows"
values={[
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'macOS', value: 'macos'},
{label: 'Windows', value: 'windows'},
]}>
<TabItem value="ubuntu">

- Download meshtastic_ubuntu

- Run the following command to make the file executable and rename it 'meshtastic':

```
chmod +x meshtastic_ubuntu && mv meshtastic_ubuntu meshtastic
```

- To run the cli:

```
./meshtastic
```

:::tip
Copy (or move) this binary somewhere in your path.
:::

</TabItem>
<TabItem value="macos">

- Download meshtastic_mac

- Run the following command to make the file executable and to rename it 'meshtastic':

```
chmod +x meshtastic_mac && mv meshtastic_mac meshtastic
```

- Try to run it:

```
./meshtastic
```

:::note
You may get a dialog that says:
"meshtastic" can't be opened because Apple cannot check it for malicious software.
:::

- To fix, go into "System Preferences", "Security & Privacy", "General" tab, and click on the "Allow Anyway" button.

- Try to run it again:

```
./meshtastic
```

:::note
You may get a dialog that says:
"meshtastic" can't be opened because Apple cannot check it for malicious software.
Click "Open".
:::

- Now when you want to run it, you can simply run:

```
./meshtastic
```

:::tip
Copy (or move) this binary somewhere in your path.
:::

</TabItem>
<TabItem value="windows">

- Download meshtastic_windows

- Rename to meshtastic.exe

- To run, open a windows command prompt, navigate to the location of the executable and run:

```
meshtastic.exe
```

</TabItem>
</Tabs>
