---
title: Discovery
sidebar_position: 12
last_updated: 2026-05-13
description: Explore your mesh network — traceroute paths, neighbor maps, and node discovery tools.
parent: User Guide
---

# Discovery

Discovery tools help you understand **how** your mesh network is connected — which nodes can hear each other, what paths messages take, and where bottlenecks or weak links exist.

> 💡 **Tip:** You don't need a dedicated "discovery mode" to start exploring your mesh. The tools below are available right now from the node list and node detail screens.

---

## Traceroute

Traceroute reveals the exact path a message takes from your node to any other node on the mesh. It's the single most useful tool for debugging connectivity problems.

### Running a Traceroute

1. Navigate to **Nodes** and tap the node you want to trace.
2. On the node detail screen, tap **Traceroute**.
3. The app sends a traceroute request and waits for the response.
4. Results display each hop in order, with signal quality at every step.

### Reading the Results

A traceroute result looks like this:

```
You → Node A (SNR: 8.5, RSSI: -95) → Node B (SNR: 5.2, RSSI: -108) → Target
```

Each hop represents a relay node that forwarded the message. The SNR and RSSI values at each hop tell you about the link quality on that specific segment.

| What to look for | What it means |
|------------------|---------------|
| All hops show Good SNR (> 5 dB) | Healthy path — messages flow reliably |
| One hop shows Bad SNR (< 0 dB) | Weak link — this relay segment is fragile |
| Many hops (4+) | Long path — consider repositioning a node to shorten it |
| Different path on retry | Mesh is adapting — multiple routes exist (this is good!) |

> 💡 **Tip:** Run traceroute several times over a few minutes. If the path changes, your mesh has redundant routes — a sign of a well-connected network.

### Troubleshooting with Traceroute

- **"No route found"** — The target node may be offline, out of range, or on a different channel. Check that both nodes share at least one channel with the same encryption key.
- **Traceroute times out** — The path may be too long (exceeds hop limit) or a relay node is congested. Try increasing the hop limit in **Settings → LoRa Config**.
- **Asymmetric paths** — A traceroute from A→B may take a different path than B→A. This is normal — radio propagation is not always symmetric.

---

## Neighbor Info

The Neighbor Info module lets each node broadcast a list of the nodes it can **directly hear** (single-hop). When multiple nodes share their neighbor lists, you can piece together a topology map of the entire mesh.

### Enabling Neighbor Info

1. Navigate to **Settings → Module Config → Neighbor Info**.
2. Enable the module.
3. Set the broadcast interval (default: 900 seconds / 15 minutes).

Once enabled, your node periodically broadcasts its neighbor table. Other nodes with Neighbor Info enabled do the same.

### Viewing Neighbor Data

- Open any node's detail screen and look for the **Neighbors** section.
- Each neighbor entry shows the node that was directly heard and its signal quality.
- Combine neighbor data from multiple nodes to understand the full mesh topology.

> ⚠️ **Note:** Neighbor Info increases airtime usage because every enabled node periodically broadcasts its neighbor list. On busy meshes with many nodes, consider longer broadcast intervals (3600 seconds or more) to avoid congestion.

---

## Node List as a Discovery Tool

The node list itself is a powerful discovery tool when you use its filtering and sorting features effectively.

### Finding New Nodes

- Sort by **Last heard** to see the most recently active nodes at the top.
- Enable **Include unknown** to see nodes that have appeared on the mesh but haven't sent user info yet — these are often newly powered-on devices.

### Assessing Connectivity

- Sort by **Hops away** to see which nodes are directly reachable (0 hops) versus relayed.
- Sort by **Distance** to find nearby nodes and verify they're reachable.
- Use **Exclude MQTT** to focus on nodes reachable over radio (not via internet bridge).

### Infrastructure Audit

- Disable **Exclude infrastructure** to see Router, Repeater, Router Late, and Client Base nodes.
- Check their signal quality and last-heard times to verify your infrastructure nodes are healthy.

See [Nodes](nodes.md) for full details on filtering and sorting options.

---

## Tips for Mesh Exploration

- **Start with traceroute** — it gives you immediate, actionable information about a specific path.
- **Enable Neighbor Info on key nodes** — especially routers and repeaters, to build a picture of the backbone.
- **Check the map** — node positions on the [Map](map-and-waypoints.md) combined with signal data help you understand why some links are strong and others are weak.
- **Compare signal over time** — use the [Signal Meter](signal-meter.md) guide to interpret SNR and RSSI values correctly.

---

