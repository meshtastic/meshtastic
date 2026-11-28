---
title: Nodes List
parent: User Guide
sidebar_position: 4
---

import useBaseUrl from "@docusaurus/useBaseUrl";

# Nodes List

The Nodes tab shows every device your radio has heard on the mesh. Tap any node for details.

## Node Status

| Element | Meaning |
|---------|---------|
| ![Node circle](/img/apple/circleTextDefault.webp) | **Short Name & Long Name** — each node has a short name (up to 4 bytes) shown in the colored circle and a long name displayed next to it. The circle color is derived from the node number. The short name can be an emoji or initials. |
| ![Online](/img/apple/nodeOnline.webp) | **Online** — the node has been heard recently and is considered online. |
| ![Idle / Sleeping](/img/apple/nodeIdle.webp) | **Idle / Sleeping** — the node has not been heard from recently and may be asleep or out of range. |
| ![Hops Away](/img/apple/hopsAway.webp) | **Hops Away** — the number of intermediate nodes relaying messages between you and this node. No hops means direct communication. |

## Encryption

| Icon | Meaning |
|------|---------|
| ![No Public Key](/img/apple/lockOpen.webp) | **No Public Key** — no public key has been received for this node, so direct messages to it cannot be sent. Use **Exchange User Info** on the node to ask for one. |
| ![Public Key Encryption](/img/apple/lockClosed.webp) | **Public Key Encryption** — direct messages use public key infrastructure. Requires firmware 2.5+. |
| ![PKI Mismatch](/img/apple/keySlash.webp) | **Public Key Mismatch** — public key does not match the previously recorded key. Verify the contact out-of-band. |

Every radio has generated a keypair since firmware 2.5, so direct messages use it. A radio with no
public key for the destination refuses to send rather than falling back to the channel key, so a node
showing the open lock cannot be messaged until its node info arrives. Node detail shows **No Public
Key** in place of the public key row for those nodes, and they are left out of the contact list.

## Device Roles

Each node is configured with a role that determines how it behaves on the mesh. Roles are shown in the node detail view.

| Icon | Role | Description |
|------|------|-------------|
| ![](/img/apple/roleClient.webp) | Client | Standard end-user device. Sends and receives messages, shares position. |
| ![](/img/apple/roleClientMute.webp) | Client Mute | Like Client but does not forward packets from other devices. Reduces mesh traffic near congested areas. |
| ![](/img/apple/roleClientHidden.webp) | Client Hidden | Only broadcasts as needed for stealth or power savings. |
| ![](/img/apple/roleClientBase.webp) | Client Base | Rooftop node that distributes messages widely from nearby Client Mute nodes. |
| ![](/img/apple/roleRouter.webp) | Router | Dedicated infrastructure node — prioritises packet forwarding. Not for rooftops or mobile nodes. |
| ![](/img/apple/roleRouterLate.webp) | Router Late | Like Router but rebroadcasts once after all other nodes. Better suited to rooftop deployments. |
| ![](/img/apple/roleTracker.webp) | Tracker | Broadcasts GPS position packets as priority. Optimised for frequent location reporting. |
| ![](/img/apple/roleSensor.webp) | Sensor | Broadcasts telemetry packets as priority. Optimised for sensor data. |
| ![](/img/apple/roleTak.webp) | TAK | Optimised for ATAK system communication. Reduces routine broadcasts. |
| ![](/img/apple/roleTakTracker.webp) | TAK Tracker | Enables automatic TAK PLI broadcasts. Reduces routine broadcasts. |
| ![](/img/apple/roleLostAndFound.webp) | Lost and Found | Broadcasts location as a message to the default channel to assist with device recovery. |

[Choosing the Right Device Role →](https://meshtastic.org/blog/choosing-the-right-device-role/)

## Complete Node Row Examples

The full node row shows the circle avatar, battery level, encryption status, last-heard time, device role, signal strength, and log indicators all at once.

The signal meter shown here (and on a node's detail screen) rates link quality from SNR relative to your radio preset — using your radio's recently reported noise floor when available — and the strength bar and the SNR text color always reflect the same rating. See [Signal Meter](signal-meter.md) for how it works.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset={useBaseUrl("/img/apple/standard_directConnected_dark.webp")} />
  <img src={useBaseUrl("/img/apple/standard_directConnected.webp")} alt="Directly connected node, favorite, with signal meter" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset={useBaseUrl("/img/apple/standard_multiHop_dark.webp")} />
  <img src={useBaseUrl("/img/apple/standard_multiHop.webp")} alt="Multi-hop node 4 hops away" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset={useBaseUrl("/img/apple/standard_mqtt_dark.webp")} />
  <img src={useBaseUrl("/img/apple/standard_mqtt.webp")} alt="MQTT-bridged node" />
</picture>

## Compact Node Row Examples

<picture>
  <source media="(prefers-color-scheme: dark)" srcset={useBaseUrl("/img/apple/compact_directConnected_allInfo_dark.webp")} />
  <img src={useBaseUrl("/img/apple/compact_directConnected_allInfo.webp")} alt="Directly connected node with all telemetry info" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset={useBaseUrl("/img/apple/compact_multiHop_dark.webp")} />
  <img src={useBaseUrl("/img/apple/compact_multiHop.webp")} alt="Multi-hop node 7 hops away" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset={useBaseUrl("/img/apple/compact_withPosition_dark.webp")} />
  <img src={useBaseUrl("/img/apple/compact_withPosition.webp")} alt="Node with position, 1 hop" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset={useBaseUrl("/img/apple/compact_pkiMismatch_dark.webp")} />
  <img src={useBaseUrl("/img/apple/compact_pkiMismatch.webp")} alt="PKI key mismatch node" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset={useBaseUrl("/img/apple/compact_mqtt_dark.webp")} />
  <img src={useBaseUrl("/img/apple/compact_mqtt.webp")} alt="MQTT-bridged node" />
</picture>

## Nodes Not Heard on Your Current LoRa Settings

Changing the radio's preset, region or frequency slot moves it to a different channel, and nodes it heard before may no longer be reachable. On firmware 2.8.1 and later, the radio reports for each node whether it has heard that node over LoRa on the settings it is using now, including after changes made from the device's menu or the CLI.

A node the radio has not heard shows **Not heard on current LoRa** under its last-heard time. That is separate from online and offline: a node can be online and still not heard on these settings. Nodes known only over MQTT are never marked, because they don't reach your radio over LoRa. Switching back to the earlier settings brings back the earlier answers on their own.

When most of the list is in that state, the Nodes tab shows a notice such as **87 nodes not heard on your current LoRa settings**. Choose **Delete** to open a confirmation that includes the number of nodes, such as **Remove 1 node?** or **Remove 10 nodes?**. Choosing **Delete** there removes those nodes from this app and the connected radio, and keeps favorites and the connected node. A node returns if it is heard again. Choose **Keep** to dismiss the notice until most of the list is heard again; it comes back the next time a change leaves most of the list unheard. Nothing is removed unless you choose to.

Older firmware doesn't report this, so the marker and the notice don't appear.

## Context Menu Actions

Long-press any node in the list to access quick actions:

- **Message** — open a direct message conversation with this node
- **Display name** — give a node a local nickname (see Display Names below)
- **Status Message** — set the status your radio broadcasts to the mesh (connected node only, firmware 2.8+)
- **Add to favorites / Remove from favorites** — star important nodes so they appear at the top of the list
- **Mute notifications / Unmute** — silence alerts from this node
- **Trace Route** — discover the path messages take to reach this node (see [Trace Routes](traceroute.md))
- **Ignore / Remove from ignored** — hide this node from normal views
- **Remove** — remove the node from your local database

Open a node and choose **Track in Live Activity** to keep it on your Lock Screen and in the Dynamic Island: its battery, signal, when it was last heard and how far away it is. See [Live Activity](bluetooth.md#live-activity).

## Display Names

You can give any node a local nickname that's shown throughout the app instead of its device long name — in the node list, node details, messages, mentions, notifications, CarPlay, the map, trace routes, the configuration screens, widgets, the Watch, and the Vision Pro spatial map and Cinema. A Live Activity that's already running keeps the names it started with. Searching for nodes or contacts finds them by either name, and lists sorted by name use the one they show. Set it from the node's long-press menu ("Display name") or from the **Name** row in Node Detail. The avatar circle always shows the node's actual short code, unaffected by the nickname. While a display name is set, Node Detail also shows the node's real long name in a **Long Name** row under **Name**.

Display names are stored only on this device and are never sent over the mesh, shared, or exported — they don't change the node's real identity, so QR codes, contact sharing, exports and the trace route share image still use the device's actual name.

## Filtering & Search

Tap the filter icon above the list to narrow which nodes are shown. Filters apply across the Nodes list, the contacts picker in Messages, and the map, so a filter set in one place takes effect everywhere.

| Filter | What it shows |
|--------|---------------|
| **Online** | Only nodes heard in the last two hours. |
| **Hide Not Heard on Current LoRa** | Hides nodes your radio has not heard on its current LoRa settings. Needs firmware 2.8.1 or later. |
| **Favorites** | Only nodes you have starred. |
| **Public Key Encryption** | Only nodes using PKI-encrypted direct messages. |
| **Environment** | Only nodes reporting environment telemetry (temperature, humidity, pressure). |
| **Hops Away** | Limit to nodes within a chosen number of hops, including direct (0-hop) only. |
| **Distance** | Limit to nodes within a chosen radius of your location. Falls back to the connected device's last position when phone location is unavailable. |
| **Roles** | Show only the device roles you select. |
| **Connection** | Show nodes reachable via LoRa, via MQTT, or both. At least one is always kept on. |

Filters are **remembered between launches** — the app reopens with the same filters applied. Search text is the exception: it is intentionally cleared on relaunch so you never reopen into a stale search that hides most of your nodes. Use the **reset** affordance to clear every filter and the search text at once.

The map has one additional filter of its own — **Precise Locations Only**, which hides nodes reporting an approximate (reduced-precision) location. See [Map & Waypoints](map.md) for details.

## Offline Map Detail

Downloaded offline maps include the local road network. Pedestrian streets render as minor roads, so walkable streets remain visible offline. On nodes reporting the Burning Man firmware edition, the downloadable Burning Man 2026 map pack uses full zoom-level 15 detail for the Black Rock City street grid and remains available until you remove it.

## Additional Icons

Tap a node and scroll to the Logs section for detailed metrics:

| Log | Description |
|-----|-------------|
| ![Distance & Bearing](/img/apple/logDistance.webp) | Direction and distance to the node based on GPS. Requires both devices to share location. |
| ![Channel badge](/img/apple/channelBadge.webp) | The numbered circle shows which channel the node uses. Only shown for secondary channels (not primary channel 0). |
| ![Device Metrics](/img/apple/logDeviceMetrics.webp) | Battery level, voltage, channel utilisation, and airtime reported by the node. |
| ![Positions](/img/apple/logPositions.webp) | GPS position data including latitude, longitude, and altitude. |
| ![Environment](/img/apple/logEnvironment.webp) | Sensor data: temperature, humidity, barometric pressure. |
| ![Detection Sensor](/img/apple/logDetectionSensor.webp) | Motion or door open/close alerts from the node. |
| ![Trace Routes](/img/apple/logTraceRoutes.webp) | Recorded trace route paths showing the hops a message took through the mesh, with a chart and a hop-by-hop timeline. See [Trace Routes](traceroute.md). |

### Requesting Telemetry

Since firmware 2.7.13 nodes don't broadcast telemetry by default, so asking is often the only way to see a node's readings. For another node, while you're connected, the Device Metrics, Environment Metrics, Air Quality Metrics, Power Metrics and Local Stats logs each have a request button (`arrow.clockwise`) beside them. Tapping it asks the node for that kind of reading and says the request was sent; each kind can be asked again after 30 seconds. The reply shows in node details and in that log, and a log with nothing in it yet opens once the reply arrives. If the mesh reports that the request failed, for example because the node has no such sensor or couldn't be reached, the app says so with the node, the kind of reading and the reason, even if you've left the node.

Linux nodes running `meshtasticd` also have a **Host Metrics Log** (`server.rack`) with its own request button. Host metrics are the computer's uptime, free memory, load average (1, 5 and 15 minutes), free disk space and an optional note set on the node. The newest reading also shows in a **Host** section in node details.

When a node has a known position, the Logs section also offers **Estimate Coverage** (`cellularbars`). It switches to the Map tab and opens the Site Planner coverage-estimate form prefilled from that node. See [Coverage Estimate (Site Planner)](map.md) on the Map page for the full flow.

## Local Stats and Noise Floor

Local Stats show radio diagnostics reported by a node, including packets received, packets transmitted, duplicate packets, relayed packets, bad receives, canceled packets, online node count, total node count, and noise floor.

When requesting Local Stats from another node, choose how to protect the request:

- **Shared channel** encrypts the request with the selected mesh channel and is suitable for ordinary requests between channel members.
- **Remote admin** uses PKI encryption and is unavailable until the destination has advertised a public key.

Noise floor is displayed in dBm when the node reports it. Treat it as a directional diagnostic instead of an absolute site score: readings can vary quickly, and external filters can lower or skew the displayed value because of insertion loss or in-band interference.

## Node Detail View

Tap any node to see the full detail view with hardware info, signal metrics, environment sensors, and log navigation:

![Node Detail](/img/apple/nodeDetail.webp)

For messageable nodes, use **Actions > Share Contact QR** to show a Meshtastic contact link and QR code that another device can scan.

### Write a Contact to an NFC Tag

On iPhones with NFC hardware (iOS 18 or later), the contact share sheet also offers **Write to NFC Tag**. Hold a writable NFC tag near the top of your iPhone and the contact link is saved to it, replacing whatever the tag held before. Anyone can then tap that tag with their phone to open the contact in Meshtastic — the tag carries exactly the same link the QR code encodes.

### Importing a Shared Contact

Opening a Meshtastic contact link — by scanning a QR code, tapping a shared link, or tapping an NFC tag — presents a confirmation sheet before anything is added. The sheet shows the node's colored initials, its long name, and an explanation that adding the contact saves their name and public key to your connected node. Choose **Add Contact** to import, or **Cancel** to dismiss.

If the import fails — most often because the radio disconnected — the sheet stays open and shows the reason so you can reconnect and tap **Add Contact** again. It closes only once the contact has actually been sent to your node. A link that is damaged or truncated is reported as an invalid format instead of being imported.

If the contact carries a different public key than your node already holds for that node number, the sheet says so and **Add Contact** stays disabled until you turn on **Replace the stored key**. Importing replaces the key your node encrypts direct messages to that contact with, so only continue if you expected it to change — they reset their node, or set it up again. A contact you have never added, or one carrying the same key you already hold, imports without the extra step.

A contact that carries no public key cannot be added. **Add Contact** is disabled and the sheet says the contact does not include one. The key is the point of a shared contact — it is what lets your node send direct messages to that contact — and applying a keyless one would clear the key your node already held, breaking direct messages that used to work. For the same reason, a node you have no public key for cannot be shared from this app.

Importing a contact requires firmware 2.6.9 or later on the connected node.

### Air Quality

Nodes with a particulate-matter or CO2 sensor — reporting the firmware's Air Quality telemetry — show an **Air Quality** section with the latest PM2.5, PM1.0, and PM10 readings in µg/m³ and CO2 in ppm. CO2 is marked Good under 1000 ppm, Stuffy under 2000, Poor under 5000, Unsafe under 30000, and Evacuate above that.

An **Air Quality Metrics Log** entry appears under the node's logs, with a seven-day chart and table of the readings (configurable columns), a **Clear** action to delete stored readings, and **CSV export**. Particulates and CO2 are charted separately, so CO2's hundreds of ppm don't flatten the particulate lines.

The environment, air quality and power logs give each unit its own chart: temperature, humidity, pressure, light and so on are never drawn against one shared scale. Pressure uses a 100 hPa window, 950–1050 hPa near sea level, that moves with the readings for a node at altitude. Only readings the node actually sends are charted. The power log lists every channel that reports, up to eight, by the names you give them under **Label Channels**, and node details uses the same names.

### Signed Node

If a node signs its broadcast packets, a green shield (🛡️) **Signed node** row appears in the detail view, marked **Verified automatically**. This means the radio has cryptographically verified an XEdDSA signature from this node (firmware 2.8 or later). Because a node's identity broadcast is itself signed, its name and identity are verified by extension.

This is *automatic* trust observed from the radio — distinct from manually verifying a contact's public key out-of-band, which is a separate, user-asserted action. The row only ever affirms the good state; nodes that don't sign simply show no shield, which is not a warning.

### Hardware Info

The hardware section shows information about the physical device running the node. The section title reflects the device's support status:

| Status | Meaning |
|--------|---------|
| **Supported Hardware** | Device is actively supported with firmware updates. |
| **Maker Hardware** | Independent maker hardware that is built and tested, but not Backer or Partner hardware. |
| **Discontinued Hardware** | Device is no longer supported and does not receive firmware updates. |

For supported devices, the support tier is shown below the hardware name:

| Tier | Description |
|------|-------------|
| Flagship | Recommended device with full feature support and active development. |
| Niche | Supported device with active firmware updates and a specialised form factor. |
| Legacy | Older device that still receives firmware updates but may lack some features. |

### 3D Model

For many radios, the hardware image can turn into a 3D model of the device: tap the image, or the rotate button on it. Drag to turn the model and pinch to zoom; the photo button switches back to the picture. In the full-screen view, the info button shows the model's copyright notice: the models are Meshtastic's own, not covered by the app's GPL, and the devices, logos and marks they show belong to their makers. On iPhones and iPads that support augmented reality, and on Apple Vision Pro, the AR button places the model in the room around you at its real size. On an iPhone or iPad the model lands on the first table or floor the camera finds, turned to face you. **AR** and **Object** at the top switch between the model in the room and the model on its own, the share button sends the model's file, and the record button records the screen, then opens the recording to save or share. **Banana for Scale** stands a real-size banana on the table beside the model. A sideways drag turns the model on its surface. For the radio you're connected to, the model in the room also shows its live screen, with the radio's buttons under the camera view. Most models ship with the app and work offline; any that don't are downloaded the first time they're shown.

### Device Screen

When the radio you're connected to has a screen and its firmware can share it, the connected node's detail view shows **Device Screen** under **Administration**. Open it to see the radio's screen live in the app, drawn pixel for pixel. The radio only sends its screen while this view is open and the app is in front; it stops when you leave. **Refresh** asks for the current picture right away, which helps on e-ink screens that redraw slowly.

Below the screen are the radio's buttons: four directions around **OK**, with **Back** underneath. Hold a direction to repeat it, or hold **OK** for a long press. You can also swipe on the screen to move in that direction. On radios with a touch screen, tapping the picture touches the same spot on the radio, and holding it long-presses there. With a keyboard attached, including on a Mac, **Use Keyboard** sends the arrow keys, Return and Esc to the radio until you turn it off; an outline around the screen shows when it's on.

The radio's 3D model at the top of the same node detail shows its screen live too, on the model's own display, while the model is open, and in the room from the AR button. So does the model on the stand in the Apple Vision Pro [cinema](cinema.md#radio-models), with the radio's buttons on the card beside it.

The screen only comes over your direct connection to the radio, never over the mesh, so it isn't available for other nodes. Firmware that can't share its screen doesn't show the row.

### Remote Shell

A Linux `meshtasticd` node on firmware 2.8.2 or later shows **Remote Shell** under **Administration**. It opens a terminal that runs a shell on the node's computer, over the mesh. The row also shows while the node's firmware version isn't known yet; opening it asks for the version, and an older node says so. Remote administration must be turned on in the app's settings.

The node only accepts a shell from a radio whose public key is in its admin key list, the same list remote administration uses, and the session travels as encrypted direct messages. Opening the shell starts a remote admin session first if one isn't up. If the node never answers, the app says so and names the two usual causes: the node doesn't list your radio's key as an admin key, or it's out of range. The shell works best between nodes that hear each other directly.

The mesh carries a few hundred bytes a second, so the terminal is built for short commands:

- The top of the screen always shows the session state and, once open, the measured round trip. When the node closes the session or stops answering, **Reconnect** starts a new one.
- Once the node has echoed a character on the current line, what you type shows at once, underlined until the node echoes it. At a prompt that doesn't echo, such as a password prompt, nothing you type is drawn, and nothing is drawn on a line that asks for a password, passphrase or PIN.
- When the node hasn't acknowledged input for a few seconds, a note shows how long ago it was last heard.
- **Line Mode**, in the **⋯** menu, sends a whole command at once with a single transmission. Up and down recall earlier commands, and the chips above the box fill in common ones such as `uptime` and `df -h`. It's the lightest way to use the shell on a busy mesh. At a password prompt the box hides what you type and keeps it out of history.
- On a touch screen, a row of keys above the keyboard adds esc and ctrl on the left and the arrows on the right; hold an arrow to repeat it. Between them, swipe sideways for tab, alt, `~`, `|`, `/`, `-`, home, end, pgup and pgdn. Tap ctrl or alt once to apply it to the next key, twice to lock it, and a third time to release it. The keyboard key at the end puts the keyboard away; tap the output to bring it back. With a hardware keyboard, Control and Option chords and the navigation keys go straight to the shell, and Option still types the characters your layout puts on it, such as `@` or `|`.
- Pinch the output to change the text size.
- The menu also has **Paste**, **Copy All Output**, **Clear Screen**, **End Session** and text size. **End Session** closes the shell but keeps the screen open, showing Closing until the close has gone to your radio, then **Reconnect**. You can select and copy any output, and scrolling up while output arrives keeps your place. The terminal's bell is a light tap.

Colors, bold, dim, underline and progress lines that redraw in place all work. Colors and dim text are adjusted to stay readable on light and dark backgrounds. Full-screen programs such as `vi` or `top` need more than the mesh can carry, so the app shows a notice instead of drawing them.

### Where to Buy

For devices with known purchase links, an **I want one** section appears below the hardware info. It shows the official vendor link and regional marketplace options (Amazon, Rokland, AliExpress, and others) sourced from [msh.to](https://msh.to).

Marketplace links are filtered to your device region, so only stores that ship to your area are shown. Vendor links (directly from the device manufacturer) are always shown regardless of region.

Some of these are affiliate links. The app says so — product links may be affiliate links, and purchases may earn Meshtastic a commission. In the **I want one** section the disclosure sits in small print below the links; the full directory at **Settings → Device Links** shows it above them.

> **Tip — No purchase links shown**
> Purchase links require an internet connection on first launch and after clearing app data. Connect the app to update the device catalog.

[Device Configuration Docs →](https://meshtastic.org/docs/configuration/radio/device/)
