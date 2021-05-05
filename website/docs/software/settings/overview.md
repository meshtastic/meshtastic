---
id: overview
title: Overview
sidebar_label: Overview
slug: /settings
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Changing settings is currently most reliably done using the Commandline Interface available within `Meshtastic-python`. Setting support is being added to all other methods of interfacing with your device.

## First Steps

If you've just flashed your device, you'll want to make sure to set your region first. Every freshly flashed device will have the same default channel settings. If you ever want to return your device to all defaults.

## Examples

At the bottom of each setting page, examples will be available displaying how to adjust settings using the various platforms available to interface with your device. The examples will look like this:
### Introducing Examples
<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

:::note
<!--- TODO add link --->
The CLI examples will require you to utilize the Commandline Interface that is available through Meshtastic-python. Installation instructions can be found here.
:::

  ```bash title="Example"
  meshtastic --set region Unset
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>
