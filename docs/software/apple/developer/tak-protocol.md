---
title: TAK Protocol
parent: Developer Guide
sidebar_position: 10
---

# TAK Protocol

The app implements three CoT (Cursor-on-Target) wire formats over LoRa: two legacy V1 paths and one V2 path that uses the [TAKPacket-SDK](https://github.com/meshtastic/TAKPacket-SDK) for zstd-dictionary compression and richer typed payloads. This page documents the choice of format, the receive dispatch, and the supporting infrastructure.

## Wire Formats

| Format | Port | Payload | Used when |
|--------|------|---------|-----------|
| V1 ATAK_PLUGIN | 72 | Bare `TAKPacket` protobuf (PLI / GeoChat only) | Connected radio firmware &lt; 2.8.0 |
| V1 ATAK_FORWARDER | 257 | zlib-compressed CoT XML, optionally Fountain (LT) coded for multi-packet payloads | Connected radio firmware &lt; 2.8.0, CoT type other than PLI / GeoChat (Apple-to-Apple only) |
| V2 ATAK_PLUGIN_V2 | 78 | `TAKPacketV2` protobuf, compressed with the TAKPacket-SDK zstd dictionary | Connected radio firmware ≥ 2.8.0 |

V2 carries the full typed CoT vocabulary: PLI, GeoChat, shapes, markers, routes, casevac, emergency, and task. V1 ATAK_PLUGIN carries PLI and GeoChat only; everything else falls back to the V1 ATAK_FORWARDER path.

## Per-send Fork

`TAKMeshtasticBridge.sendToMesh(_:clientInfo:)` chooses the format on every send based on `AccessoryManager.supportsTAKv2`, which checks the connected radio's firmware version:

```swift
if accessoryManager.supportsTAKv2 {
    // V2: SDK-driven path
    let parser = MeshtasticTAK.CotXmlParser()
    let packet = try parser.parse(strippedXml)
    let compressor = MeshtasticTAK.TakCompressor()
    // `compressWithRemarksFallback` returns `Data?` — `nil` means the
    // payload is still over the LoRa MTU even after `<remarks>` are
    // stripped. The real `sendCoTToMeshV2` translates that into a
    // thrown `AccessoryError.ioFailed(...)` so the caller's `do/catch`
    // doesn't treat the silent drop as a successful send.
    guard let wire = try compressor.compressWithRemarksFallback(packet, maxWireBytes: 225) else {
        throw AccessoryError.ioFailed("TAK V2 payload exceeds LoRa wire size limit")
    }
    try await sendTAKV2Packet(wire, channel: channel)
} else {
    // V1: classify, then dispatch
    switch GenericCoTHandler.shared.classifySendMethod(for: cot) {
    case .takPacketPLI, .takPacketChat:
        let pkt = convertToTAKPacket(cot: cot)
        try await sendTAKPacket(pkt, channel: channel)
    case .exiDirect, .exiFountain:
        try await GenericCoTHandler.shared.sendGenericCoT(cot, channel: channel)
    }
}
```

The fork is per-send (not per-session) so a radio that upgrades mid-session jumps to V2 immediately.

## Receive Dispatch

`AccessoryManager.swift`'s exhaustive portnum switch dispatches incoming TAK packets to handlers in `AccessoryManager+TAK.swift`:

| Portnum | Handler | Behavior |
|---------|---------|----------|
| `.atakPlugin` (72) | `handleATAKPluginPacket(_:)` | Decode bare `TAKPacket` protobuf; convert PLI / GeoChat to `CoTMessage`; forward to TAK clients via `TAKServerManager.shared.broadcast(_:)`. |
| `.atakPluginV2` (78) | `handleATAKPluginV2Packet(_:)` | zstd-decompress with `TakCompressor`; rebuild CoT XML with `CotXmlBuilder`; strip the XML prologue and inter-tag whitespace; forward raw XML via `broadcastRawXml(_:)` so shape detail (`<link point>` vertices, colors, stroke) survives. Route CoT (`b-m-r`) triggers the [route data package](#route-data-packages) side-effect. |
| `.atakForwarder` (257) | `handleATAKForwarderPacket(_:)` | Hand off to `GenericCoTHandler.handleIncomingForwarderPacket(_:)`, which reassembles Fountain fragments and zlib-decompresses the resulting CoT XML before broadcasting. |

## TAKPacket-SDK

The [TAKPacket-SDK](https://github.com/meshtastic/TAKPacket-SDK) Swift Package is pinned in `Meshtastic.xcworkspace/.../Package.resolved`. The bridge uses three APIs:

- `MeshtasticTAK.CotXmlParser().parse(_:)` — parses CoT XML into a `TAKPacketV2` protobuf. `throws`; callers must `try`.
- `MeshtasticTAK.TakCompressor().compressWithRemarksFallback(_:maxWireBytes:)` — picks the zstd dictionary best suited to the payload, attempts compression, and on overflow retries with `<remarks>` stripped. Returns `nil` if the payload is too large even without remarks; `sendCoTToMeshV2` translates the `nil` into `AccessoryError.ioFailed(...)` so the caller's `do/catch` doesn't treat the drop as a successful send.
- `MeshtasticTAK.CotXmlBuilder().build(_:)` — round-trips `TAKPacketV2` back to CoT XML for forwarding to TAK clients.

The wire MTU constant `maxWirePayloadBytes = 225` reflects the LoRa frame budget after the Meshtastic envelope.

## Identity Admin

`TAKIdentitySection` (embedded in `TAKServerConfig`) reads `node.takConfig` for the current team and role values. When the node has no TAK config cached, `requestTakConfigIfNeeded()` fires an admin request via `AccessoryManager.requestTAKModuleConfig(fromUser:toUser:)` so first-time users don't see a perma-spinner.

Saving the identity dispatches `AccessoryManager.saveTAKModuleConfig(config:fromUser:toUser:)`, which packages a `ModuleConfig.TAKConfig` inside an `AdminMessage` and ships it on the admin port.

## Offline Queue

`TAKServerManager` buffers outgoing CoT for delivery when a TAK client reconnects:

```swift
private enum QueuedPayload {
    case message(CoTMessage)
    case rawXml(String)
}
```

`broadcast(_:)` enqueues `.message` payloads; `broadcastRawXml(_:)` enqueues `.rawXml` so V2 shapes / routes / markers retain their detail elements. The queue has a 5-minute TTL and a 50-entry cap. `drainOfflineQueue()` dispatches the right path per payload variant when a client (re)connects.

## Route Data Packages

`RouteDataPackageGenerator` (in `Meshtastic/Helpers/TAK/`) converts route CoT (`b-m-r`) into KML-inside-zip ATAK data packages that the user can sideload into iTAK (which silently ignores route CoT received over its TCP streaming connection).

The pipeline:

1. `generateKml(routeXml:)` extracts `<event uid>`, `<contact callsign>`, and every `<link point="lat,lon,hae">` waypoint via `attributeValue(in:on:named:)`, which supports both single- and double-quoted attributes.
2. `sanitizeForFilename(_:)` strips path separators, control chars, and `..` sequences from the route UID so it's safe to use in file names and the temp directory path. `escapeXml(_:)` separately escapes the value before interpolation into the manifest's `value="..."` attribute.
3. `generateDataPackage(routeXml:)` writes the KML and `manifest.xml` to a temp directory and zips them with `NSFileCoordinator(readingItemAt:options:.forUploading)`.
4. `saveToDocuments(fileName:zipData:)` writes the zip to `Documents/TAK Routes/<sanitizedUid>.zip` (creating the directory on first use).
5. `AccessoryManager+TAK.handleATAKPluginV2Packet(_:)` posts a `Notification` titled **Route Received** with the route callsign as subtitle and body **Saved to Files → Meshtastic → TAK Routes. Open in iTAK to import.**

## Capabilities

`AccessoryManager.supportsTAKv2` is the canonical gate:

```swift
var supportsTAKv2: Bool { checkIsVersionSupported(forVersion: "2.8.0") }
```

Use this property (rather than parsing the firmware version inline) anywhere a V1/V2 decision is needed. Future TAK SDK features that require a higher firmware version should add a sibling property with a clear cut-off so the bridge stays declarative.

## Related Files

- `Meshtastic/Helpers/TAK/TAKMeshtasticBridge.swift` — V1/V2 fork in `sendToMesh`.
- `Meshtastic/Accessory/Accessory Manager/AccessoryManager+TAK.swift` — send and receive handlers.
- `Meshtastic/Helpers/TAK/TAKServerManager.swift` — TCP server, offline queue, certificate management.
- `Meshtastic/Helpers/TAK/GenericCoTHandler.swift` — V1 ATAK_FORWARDER classification and Fountain reassembly.
- `Meshtastic/Helpers/TAK/RouteDataPackageGenerator.swift` — KML data package writer.
- `Meshtastic/Views/Settings/TAKServerConfig.swift` — combined TAK Server settings screen with the embedded `TAKIdentitySection`.

See also [Transport Layer](transport.md) for the AccessoryManager extension map.
