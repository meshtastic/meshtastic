---
title: Local Mesh Discovery
sidebar_position: 12
last_updated: 2026-09-19
description: Explore your mesh network — the Local Mesh Discovery scanner, traceroute paths, neighbor maps, and node discovery tools.
parent: User Guide
---

# Local Mesh Discovery

Discovery tools help you understand **how** your mesh network is connected — which nodes can hear each other, what paths messages take, and where bottlenecks or weak links exist.

The app offers two complementary approaches:

- **Local Mesh Discovery (Scanner)** — an automated mode that cycles your connected node through different LoRa presets, listens on each, and ranks which preset performs best at your location.
- **Manual exploration** — traceroute, Neighbor Info, and the node list, which you can use at any time to investigate specific paths and topology.

## Local Mesh Discovery (Scanner)

Local Mesh Discovery is a dedicated scanning mode that helps you find the best LoRa modem preset for your location and see which nodes are active on each preset. It cycles your connected node through one or more presets you choose, dwells on each one — listens for a set time — to collect packets, then analyzes and ranks the results.

Connect your node, then open **Settings → Advanced → Local Mesh Discovery**. On Android the **Advanced** section appears only for a locally connected node, never over remote admin, and stays grayed out until the app has finished reading the node's configuration. On a managed device its entries are disabled, except **Debug Panel**, which reads app-local logs and stays available. On desktop, Local Mesh Discovery has its own entry on the Settings screen, with no such gate.

> ℹ️ **Note:** Discovery temporarily changes your node's LoRa settings while it scans, then restores your original configuration when it finishes.

### Setting up a scan

Before starting, configure these controls:

| Control | Description |
|---------|-------------|
| **LoRa preset picker** | Select one or more presets to scan. Discovery dwells on each selected preset in turn. |
| **Dwell time** | Time to listen on each preset. Choose from 1, 5, 15, 30, 45, 60, 90, 120, or 180 minutes. Longer dwell times collect more packets and give a clearer picture, but take longer. |
| **Keep screen awake** | Keeps the display on for the scan. The scan itself holds a CPU wake lock for its whole run and posts a **Scanning LoRa presets…** notification, so it keeps collecting with the screen off or the app in the background. |

The **Start Scan** button stays disabled — with an explanation of why — until the scan can run. Common reasons it's disabled:

- The node is **not connected**.
- **No presets** have been selected to scan.
- The selected preset uses **2.4 GHz**, which your hardware doesn't support.

### Live progress

While a scan runs, Discovery shows its current stage:

| Stage | What's happening |
|-------|------------------|
| **Preparing scan** | Saving your current configuration and getting ready to scan. |
| **Shifting to \<preset\>** | Switching the node to the next preset to test. |
| **Reconnecting on \<preset\>** | Re-establishing the connection after the preset change. |
| **Dwelling on \<preset\>** | Listening on the current preset to collect packets, with a countdown to the next step. |
| **Analyzing results** | Processing the collected packets and ranking the presets. |
| **Restoring home preset** | Putting your original LoRa configuration back. |
| **Cancelling scan** | You tapped **Stop Scan**; partial results are saved before the original preset is restored. |
| **Scan failed: \<reason\>** | The scan could not continue — most often the node didn't come back within a minute of a preset change. The results collected so far are saved, and the original preset is restored automatically. |

![Dwell countdown showing time remaining on the current preset](/img/android/docs/discovery_dwell_progress.webp)

If a scan is interrupted — the app is closed, or the node goes away — the app restores your original preset the next time it reconnects to that node, and tells you it has done so. Reconnect the same node to let that happen; until you do, the node stays on whichever preset the scan left it on.

### Reading the results

When the scan completes, Discovery presents a per-preset result card for each preset it tested, plus an overall summary.

![Per-preset result card with ranking and collected metrics](/img/android/docs/discovery_preset_result.webp)

Metrics include:

| Metric | What it tells you |
|--------|-------------------|
| RF health | Overall quality of the radio environment on that preset. |
| Channel utilization | How busy the airwaves were during the dwell. |
| Airtime | Transmission time observed. |
| Direct vs. relayed nodes | How many mesh nodes were heard directly versus via a relay. |
| Bad / duplicate packets | Counts of corrupt and repeated packets, indicating congestion or interference. |

Additional features available from the results:

- **Scan History** — saved sessions you can revisit; view or delete past scans.
- **Discovery Map** — a map of the nodes found during the scan.
- **Report export** — export a report as a PDF on Android, or as text on other platforms.

> 💡 **Tip:** On **Google Play** builds, Discovery can generate an on-device AI summary (Gemini Nano) of your results. F-Droid builds always use the algorithmic summary — the proprietary ML Kit dependency is deliberately excluded from that flavor — so you get a readable interpretation of the scan either way.

## Mesh Beacon

Mesh Beacon lets nodes invite others to join their mesh. A beaconing node periodically broadcasts an invitation — optionally advertising a channel, region, and modem preset — that nearby nodes can hear even before they share a configuration.

Configure it under **Settings → Module configuration → Mesh Beacon**. The entry appears only on nodes running firmware 2.8.0 or newer. A read-only **Region** row at the top of the screen shows the region the beacon advertises: that region, and the preset, are always the ones the node itself uses, so a beacon can't invite anyone onto settings your node isn't running.

- **Listen for beacons** — receive invitations broadcast by other nodes.
- **Broadcast a beacon** — periodically advertise this mesh to nearby nodes, with an optional **Beacon message** of up to 100 bytes, a **Broadcast interval** picked from fixed intervals between 1 hour and 72 hours, and an **Offered channel** chosen from your node's own channels. The offered channel is required, and defaults to your primary channel. Over remote admin the picker offers the primary channel only.
- **Broadcast targets** — where the beacon actually transmits. The list always holds at least one row: the first is the beacon's own transmission, not an extra. Each row picks a **Channel** and a **Transmit preset**. **Add target** appends a row, and **Remove target** deletes one — removing the last row replaces it with a fresh default rather than emptying the list.

Two conditions block beacon setup:

- **The node has no region set.** The screen shows nothing but *Set your node's region before setting up a beacon.* Set the region on **Settings → LoRa** first.
- **The node uses custom LoRa settings.** A beacon advertises a modem preset for others to join, so a node with **Use Preset** turned off has no standard preset to offer. In that state **Broadcast a beacon** can be turned off but not on, and the broadcast settings are read-only. Listening for beacons is unaffected.

Received invitations appear as **Mesh invitations** cards on the Discovery screen. Each card shows the sender's message plus the offered channel, region, preset, and signal quality, with these actions:

- **Join** — switch to the offered channel and preset (retunes the node and reboots). When the offer matches your current frequency slot, an **Add channel** action adds it without a reboot.
- **Discover** — seed a Discovery scan with the offered preset so you can survey that mesh before joining (shown only when the beacon offers a preset).
- **Dismiss** — ignore the invitation.

Channels advertised by beacons also show up in the scan setup as **Beacon channels** — select one to include it as a scan target.

An invitation to a mesh your node is already on is suppressed: no card, no notification, and no **Beacon channels** entry. A channel counts as one you already have only when both its name and its key match a channel on your node — the same name with a different key is a different mesh, so that invitation still reaches you.

## Manual exploration

The following tools are available at any time from the node list and node detail screens. Use them to investigate specific paths and build a topology picture, alongside or instead of a full scan.

### Traceroute

Traceroute reveals the exact path a message takes from your node to any other node on the mesh. It's the single most useful tool for debugging connectivity problems.

#### Running a Traceroute

1. Navigate to **Nodes** and tap the node you want to trace.
2. On the node detail screen, find **Traceroute** in the **Telemetry** section and tap its request button. Once a result arrives, a second button on the same row opens the traceroute log, where each hop is listed with its signal quality.

#### Reading the results

A traceroute result looks like this:

```text
Route traced toward destination:

■ Your Node (YOUR)
⇊ 8.5 dB
■ Relay Node (RLAY)
⇊ -8.75 dB
■ Target Node (TGT1)
```

Each `⇊` line between two nodes is one relay hop, and the SNR on that line is the quality of that segment alone. The app colors it against the demodulation floor of the preset in use, not a fixed number: green above the floor, yellow within 5.5 dB below it, orange within 7.5 dB, and red beyond that. The floor is −7.5 dB on Short Fast and improves 2.5 dB per spreading-factor step, so it is −17.5 dB on Long Fast — the same SNR reads differently on different presets. See [Signal Meter](signal-meter.md). A request that also gets a reply adds a second block under **Route traced back to us:**.

| What to look for | What it means |
|------------------|---------------|
| All hops show Good SNR (green) | Healthy path — messages flow reliably |
| One hop shows a poor SNR (orange or red) | Weak link — this relay segment is fragile |
| Many hops (4+) | Long path — consider repositioning a node to shorten it |
| Different path on retry | Mesh is adapting — multiple routes exist (this is good!) |

> 💡 **Tip:** Run traceroute several times over a few minutes. If the path changes, your mesh has redundant routes — a sign of a well-connected network.

#### Troubleshooting with Traceroute

- **No Response** — The traceroute got nothing back. The target node may be offline, out of range, or on a different channel. Check that both nodes share at least one channel with the same encryption key.
- **Traceroute times out** — The path may be too long (exceeds hop limit) or a relay node is congested. Try increasing the hop limit in **Settings → LoRa**.
- **Cannot show traceroute map because the start or destination node has no position information** — The path was traced, but one end has never shared a position.
- **Asymmetric paths** — A traceroute from A→B may take a different path than B→A. This is normal — radio propagation isn't always symmetric.

### Neighbor Info

The Neighbor Info module lets each node broadcast a list of the nodes it can **directly hear** (single-hop). When multiple nodes share their neighbor lists, you can piece together a topology map of the entire mesh.

#### Enabling Neighbor Info

1. Navigate to **Settings → Module configuration → Neighbor Info**.
2. Enable the module.
3. Set **Update Interval**. The app accepts whatever you type; the firmware enforces its own minimum and resets a value below it.
4. Turn on **Transmit over LoRa**. Without it, your neighbor list goes only to MQTT and to this app, never over the air.

Once enabled and transmitting over LoRa, your node periodically broadcasts its neighbor list. Other nodes with Neighbor Info enabled do the same.

#### Viewing neighbor data

- Open a node's detail screen and find **Neighbor Info** in the **Telemetry** section. The request button asks the node for its current neighbor list; once the app has received one, a second button on the same row opens the log of everything that node has reported. The row appears only on nodes that can answer a neighbor request, or that have already reported neighbors.
- Each neighbor entry shows the node that was directly heard and its signal quality.
- Combine neighbor data from multiple nodes to understand the full mesh topology.

> ℹ️ **Note:** Neighbor Info increases airtime usage because every enabled node periodically broadcasts its neighbor list. The firmware doesn't accept an interval shorter than 14400 seconds (4 hours) for this reason; on busy meshes, leave it at the 21600-second default or raise it further.

### Node list as a discovery tool

The node list itself is a powerful discovery tool when you use its filtering and sorting features effectively.

#### Finding new nodes

- Sort by **Last heard** to see the most recently active nodes at the top.
- Enable **Include unknown** to see nodes that have appeared on the mesh but haven't sent user info yet — these are often newly powered-on nodes.

#### Assessing connectivity

- Sort by **Hops away** to see which nodes are directly reachable (0 hops) versus relayed.
- Sort by **Distance** to find nearby nodes and verify they're reachable.
- Use **Exclude MQTT** to focus on nodes reachable over LoRa (not via internet bridge).

#### Infrastructure audit

- Disable **Exclude infrastructure** to see Router, Router Late, and Client Base nodes.
- Check their signal quality and last-heard times to verify your infrastructure nodes are healthy.

See [Nodes](nodes.md) for full details on filtering and sorting options.

## Tips for Mesh exploration

- **Start with traceroute** — it gives you immediate, actionable information about a specific path.
- **Enable Neighbor Info on key nodes** — especially routers and repeaters, to build a picture of the backbone.
- **Check the map** — node positions on the [Map](map-and-waypoints.md) combined with signal data help you understand why some links are strong and others are weak.
- **Compare signal over time** — use the [Signal Meter](signal-meter.md) guide to interpret SNR and RSSI values correctly.

## Related Topics

- [Nodes](nodes.md) — the node list these scans populate
- [Map & Waypoints](map-and-waypoints.md) — see discovered nodes geographically
- [Signal Meter](signal-meter.md) — interpret the SNR and RSSI a scan reports
- [Settings — Modules & Admin](settings-module-admin.md) — configure the Mesh Beacon and Neighbor Info modules
- [Messages & Channels](messages-and-channels.md) — join a mesh you found and start talking
