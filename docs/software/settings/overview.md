---
id: overview
title: Overview
sidebar_label: Overview
slug: /settings
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Customization of your settings is vital to configuring your own mesh. Changing settings is currently most reliably done using the command line interface available within `Meshtastic-python`. Setting support is being added to all other methods of interfacing with your device.

## Settings

Below are some of the most common settings that a new user will want to become acquainted with, but it isn't an exhaustive list. Make sure to take a look at the sidebar for additional settings. If you find something missing or incorrect, please help us improve our docs by filing an issue, creating a pull request, or mentioning it in our forum.

### Channel Settings

Channel settings are very important, if channels are misconfigured between devices they won't be able to communicate! A freshly flashed device will use the default channel settings. Depending on your use case you may want to change your encryption using `psk`, your range of communication by setting one of the four pre-set bands using `modem_config`, or even just the name of your channel! Before you begin, don't forget to set your `region` correctly! Take a look at the [basic channel configuration](software/settings/channel) and if you're tech savvy or a radio head check out the [advanced channel settings](software/settings/channel-advanced).

:::note
It is very important that you set your device's `region` setting. This will ensure that you are operating within the legal limits for your area.
:::

### GPS Settings

For most, GPS is a really cool, desirable feature. Knowing where everyone on your local mesh is has some major advantages. However, it's possible you want to hide the location of a particular device (like a router mounted on your home). All of the settings related to GPS are located [here](software/settings/gps).

### WiFi Settings

Whether you're using the upcoming [web interface](software/web/web-app-software) or you're interested in broadcasting messages to/from the internet using [MQTT](software/settings/mqtt), the [WiFi settings](software/settings/wifi) are your first stop towards an IOT radio.

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
The CLI examples will require you to utilize the Command line Interface that is available through Meshtastic-python. Installation instructions can be found [here](software/python/python-installation).
:::

  ```bash title="Example - Set Region (an important first step!)"
  meshtastic --set region Unset
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>
