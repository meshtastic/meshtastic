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

* Download meshtastic_ubuntu

* Run the following command to make the file executable:

```
chmod +x meshtastic_ubuntu
```

* To run the cli:

```
./meshtastic_ubuntu
```

:::tip
Copy (or move) this binary somewhere in your path.
:::

</TabItem>
<TabItem value="macos">

* Download meshtastic_mac

* Run the following command to make the file executable:

```
chmod +x meshtastic_mac
```

* Try to run it:

```
./meshtastic_mac
```

:::note
 You may get a dialog that says:
     "meshtastic" can't be opened because Apple cannot check it for malicious software.
:::

* To fix, go into "System Preferences", "Security & Privacy", "General" tab, and click on the "Allow Anyway" button.

* Try to run it again:

```
./meshtastic_mac
```

:::note
You may get a dialog that says:
	"meshtastic" can't be opened because Apple cannot check it for malicious software.
  Click "Open".
:::

* Now when you want to run it, you can simply run:

```
./meshtastic_mac
```

:::tip
Copy (or move) this binary somewhere in your path.
:::

</TabItem>
<TabItem value="windows">

* Download meshtastic_windows

* Rename to meshtastic_windows.exe

* To run, double click on "meshtastic.exe" or from a command prompt run:

```
.\meshtastic_windows.exe
```

</TabItem>
</Tabs>
