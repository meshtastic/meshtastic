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
    {label: 'Ubutnu', value: 'ubuntu'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows', value: 'windows'},
  ]}>
<TabItem value="ubuntu">

* Download meshtastic_ubuntu.zip

* Unzip.

:::note
You may need to run `sudo apt-get install zip`
:::

* Run the following command to make the file executable:

```
chmod +x meshtastic
```

* To run the cli:

```
./meshtastic
```

:::tip
Copy (or move) this binary somewhere in your path.
:::

</TabItem>
<TabItem value="macos">

* Download meshtastic_mac.zip

* Unzip.

* Run the following command to make the file executable:

```
chmod +x meshtastic
```

* Try to run it:

```
./meshtastic
```

:::note
 You may get a dialog that says:
     "meshtastic" can't be opened because Apple cannot check it for malicious software.
:::

* To fix, go into "System Preferences", "Security & Privacy", "General" tab, and click on the "Allow Anyway" button.

* Try to run it again:

```
./meshtastic
```

:::note
You may get a dialog that says:
	"meshtastic" can't be opened because Apple cannot check it for malicious software.
  Click "Open".
:::

* Now when you want to run it, you can simply run:

```
./meshtastic
```

:::tip
Copy (or move) this binary somewhere in your path.
:::

</TabItem>
<TabItem value="windows">

* Download meshtastic_windows.zip

* Unzip.

* To run, double click on "meshtastic.exe" or from a command prompt run:

```
.\meshtastic.exe
```

</TabItem>
</Tabs>
