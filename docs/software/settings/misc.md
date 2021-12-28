---
id: misc
title: Miscellaneous Settings
sidebar_label: Miscellaneous
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Overview



## Settings

| Setting | Acceptable Values | Default |
| :-----: | :---------------: | :-----: |
| debug_log_enabled | `true`, `false` | `false` |
| factory_reset | `true`, `false` | `false` |
| frequency_offset | real numbers | `0` |
| ignore_incoming | `string` – list of node nums to ignore | `0` |
| serial_disabled | `true`, `false` | `false` |
| hop_limit | real numbers | 0|

### debug_log_enabled

By default we turn off logging as soon as an API client connects (to keep shared serial link quiet and save bandwidth). Set this to true to leave the debug log outputting even when API is active.

### factory_reset

This setting is never saved to disk, but if set, all device settings will be returned to factory defaults. (Region, serial number etc... will be preserved)

### frequency_offset

This parameter is for advanced users with advanced test equipment, we do not recommend most users use it. A frequency offset that is added to to the calculated band center frequency. Used to correct for crystal calibration errors.

### ignore_incoming

If true, radio should not try to be smart about what packets to queue to the phone bool keep_all_packets = 101; If true, we will try to capture all the packets sent on the mesh, not just the ones destined to our node. bool promiscuous_mode = 102; For testing it is useful sometimes to force a node to never listen to particular other nodes (simulating radio out of range). All nodenums listed in ignore_incoming will have packets they send dropped on receive (by router.cpp)

### serial_disabled

If set, this will disable the SerialConsole by not initializing the StreamAPI.

### hop_limit

Overrides the default number of hops a message will be passed. If not set, will default to 3 hops.

Meshtastic allows a maximum of 7 hops (this is a limit of the protocol). Setting a hop_limit of greater than 7 will be replaced with 7 on the device.

## Examples

### Debug Log - Disable

:::note
`debug_log_enabled` set to `false` is the default behavior.
:::

<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Example - Disable debug log"
  meshtastic --set debug_log_enabled false
  ```
  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

### Debug Log - Enable

<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Example - Enable debug log"
  meshtastic --set debug_log_enabled true
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

### Factory reset

<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Example - Factory reset"
  meshtastic --set factory_reset true
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

### Frequency Offset

<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  TODO

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>


### Ignore Incoming

<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  TODO

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>


### Serial - Disable

<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Example - Disable serial"
  meshtastic --set disable_serial true
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>

### Serial - Enable

:::note
`disable_serial` set to `false` is the default behavior.
:::

<Tabs
  groupId="settings"
  defaultValue="cli"
  values={[
    {label: 'CLI', value: 'cli'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="cli">

  ```bash title="Example - Enable serial"
  meshtastic --set disable_serial false
  ```

  </TabItem>
  <TabItem value="android">

  TODO

  </TabItem>
</Tabs>
