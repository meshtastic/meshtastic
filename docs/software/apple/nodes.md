---
title: Nodes List
parent: User Guide
nav_order: 4
---

# Nodes List

The Nodes tab shows every device your radio has heard on the mesh. Tap any node for details.

## Node Status

| Element | Meaning |
|---------|---------|
| ![Node circle](/img/apple/circleTextDefault.png) | **Short Name & Long Name** — each node has a short name (up to 4 bytes) shown in the coloured circle and a long name displayed next to it. The circle colour is derived from the node number. The short name can be an emoji or initials. |
| ![Online](/img/apple/nodeOnline.png) | **Online** — the node has been heard recently and is considered online. |
| ![Idle / Sleeping](/img/apple/nodeIdle.png) | **Idle / Sleeping** — the node has not been heard from recently and may be asleep or out of range. |
| ![Hops Away](/img/apple/hopsAway.png) | **Hops Away** — the number of intermediate nodes relaying messages between you and this node. No hops means direct communication. |

## Encryption

| Icon | Meaning |
|------|---------|
| ![Shared Key](/img/apple/lockOpen.png) | **Shared Key** — direct messages are using the shared key for the channel. |
| ![Public Key Encryption](/img/apple/lockClosed.png) | **Public Key Encryption** — direct messages use public key infrastructure. Requires firmware 2.5+. |
| ![PKI Mismatch](/img/apple/keySlash.png) | **Public Key Mismatch** — public key does not match the previously recorded key. Verify the contact out-of-band. |

## Device Roles

Each node is configured with a role that determines how it behaves on the mesh. Roles are shown in the node detail view.

| Icon | Role | Description |
|------|------|-------------|
| ![](/img/apple/roleClient.png) | Client | Standard end-user device. Sends and receives messages, shares position. |
| ![](/img/apple/roleClientMute.png) | Client Mute | Like Client but does not forward packets from other devices. Reduces mesh traffic near congested areas. |
| ![](/img/apple/roleClientHidden.png) | Client Hidden | Only broadcasts as needed for stealth or power savings. |
| ![](/img/apple/roleClientBase.png) | Client Base | Rooftop node that distributes messages widely from nearby Client Mute nodes. |
| ![](/img/apple/roleRouter.png) | Router | Dedicated infrastructure node — prioritises packet forwarding. Not for rooftops or mobile nodes. |
| ![](/img/apple/roleRouterLate.png) | Router Late | Like Router but rebroadcasts once after all other nodes. Better suited to rooftop deployments. |
| ![](/img/apple/roleTracker.png) | Tracker | Broadcasts GPS position packets as priority. Optimised for frequent location reporting. |
| ![](/img/apple/roleSensor.png) | Sensor | Broadcasts telemetry packets as priority. Optimised for sensor data. |
| ![](/img/apple/roleTak.png) | TAK | Optimised for ATAK system communication. Reduces routine broadcasts. |
| ![](/img/apple/roleTakTracker.png) | TAK Tracker | Enables automatic TAK PLI broadcasts. Reduces routine broadcasts. |
| ![](/img/apple/roleLostAndFound.png) | Lost and Found | Broadcasts location as a message to the default channel to assist with device recovery. |

[Choosing the Right Device Role →](https://meshtastic.org/blog/choosing-the-right-device-role/)

## Complete Node Row Examples

The full node row shows the circle avatar, battery level, encryption status, last-heard time, device role, signal strength, and log indicators all at once.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/screenshots/standard_directConnected_dark.png">
  <img src="/img/apple/standard_directConnected.png" alt="Directly connected node, favorite, with signal meter">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/screenshots/standard_multiHop_dark.png">
  <img src="/img/apple/standard_multiHop.png" alt="Multi-hop node 4 hops away">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/screenshots/standard_mqtt_dark.png">
  <img src="/img/apple/standard_mqtt.png" alt="MQTT-bridged node">
</picture>

## Compact Node Row Examples

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/screenshots/compact_directConnected_allInfo_dark.png">
  <img src="/img/apple/compact_directConnected_allInfo.png" alt="Directly connected node with all telemetry info">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/screenshots/compact_multiHop_dark.png">
  <img src="/img/apple/compact_multiHop.png" alt="Multi-hop node 7 hops away">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/screenshots/compact_withPosition_dark.png">
  <img src="/img/apple/compact_withPosition.png" alt="Node with position, 1 hop">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/screenshots/compact_pkiMismatch_dark.png">
  <img src="/img/apple/compact_pkiMismatch.png" alt="PKI key mismatch node">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/screenshots/compact_mqtt_dark.png">
  <img src="/img/apple/compact_mqtt.png" alt="MQTT-bridged node">
</picture>

## Additional Icons

Tap a node and scroll to the Logs section for detailed metrics:

| Log | Description |
|-----|-------------|
| ![Distance & Bearing](/img/apple/logDistance.png) | Direction and distance to the node based on GPS. Requires both devices to share location. |
| ![Channel badge](/img/apple/channelBadge.png) | The numbered circle shows which channel the node uses. Only shown for secondary channels (not primary channel 0). |
| ![Device Metrics](/img/apple/logDeviceMetrics.png) | Battery level, voltage, channel utilisation, and airtime reported by the node. |
| ![Positions](/img/apple/logPositions.png) | GPS position data including latitude, longitude, and altitude. |
| ![Environment](/img/apple/logEnvironment.png) | Sensor data: temperature, humidity, barometric pressure. |
| ![Detection Sensor](/img/apple/logDetectionSensor.png) | Motion or door open/close alerts from the node. |
| ![Trace Routes](/img/apple/logTraceRoutes.png) | Recorded trace route paths showing the hops a message took through the mesh. |

[Device Configuration Docs →](https://meshtastic.org/docs/configuration/radio/device/)
