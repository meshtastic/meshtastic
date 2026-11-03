---
title: Trace Routes
parent: User Guide
sidebar_position: 15
---

# Trace Routes

A trace route asks a node to report the path a packet took to reach it and the path the answer took back, with the signal heard on each hop.

---

## Sending a Trace Route

Send a trace route from a node's long-press menu, from the actions on its detail screen, or with the **Trace Route** button at the top of its Trace Route Log. Your radio can send one trace route every 30 seconds; the button shows a countdown until the next one is allowed.

The app waits up to two minutes for an answer. Until then the entry reads **Waiting for response**; after that it reads **No response**. If the radio refuses the request because of its 30-second limit, the entry reads **Rate limited**.

## The Trace Route Log

Open a node and choose **Trace Route Log** in the Logs section to see every trace route you sent to that node.

- **Time window** — pick how far back the chart and list go: 1 hour, 24 hours, 1 week, 2 weeks, 1 month or all. It starts at 24 hours. 1 hour and All are always offered; each of the others appears once the log goes back that far.
- **Chart** — forward hops (orange, solid) and return hops (blue, dashed) use the left axis; the round trip (purple) uses the right axis, in seconds. Tap the chart to highlight the nearest entry in the list. Tap **Hops** to fold the chart away.
- **Entries** — each one shows the time and a summary: **Direct**, the number of hops, or the hops each way when they differ. Chips repeat the forward hops, return hops and round trip.

The round trip is the time from sending the request to receiving the answer. Routes seen on the mesh for someone else's request, and routes saved by older versions of the app, have no round trip.

**Settings → Logging → Trace Routes** lists every trace route the app has saved, including ones observed on the mesh for other nodes' requests. Those are labeled **Observed**; yours are labeled **Requested**.

## The Hop Timeline

Tap an entry to see the route as a timeline: the forward route from your radio to the node, then the return route back. On iPad and Mac the two sit side by side.

- Each stop shows the node's short name in its colored circle and its long name. Nodes heard over MQTT are marked **MQTT**. Tap a stop to open that node.
- Relays carry a small number for the order the packet reached them, and the two ends of the route have a ring around their circle.
- Between stops, the line is colored by the signal heard on that hop, on the same scale as the [signal meter](signal-meter.md): green (good), yellow (fair), orange (bad), red (none). The SNR and its rating appear beside the line, along with the hop's length when both nodes had a known position.
- A hop whose SNR wasn't reported is drawn as a dashed gray line labeled **Unknown signal**.
- A relay that didn't add its node number appears as a dotted circle named **Unknown repeater**.

Below the timeline are the round trip, the hop counts and the time. **Show on Map** draws the route on the map, forward in solid orange and return in dashed blue (see [Trace Routes on the Map](map.md#trace-routes-on-the-map)), **Copy** copies the route as text, and **Trace Route** sends a new one to the same node.
