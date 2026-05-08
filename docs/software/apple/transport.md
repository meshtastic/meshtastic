---
title: Transport Layer
parent: Developer Guide
nav_order: 4
---

# Transport Layer

`AccessoryManager` abstracts BLE, TCP/IP, and serial transports behind a single interface. Views and services interact only with `AccessoryManager` — never with transport implementations directly.

## Transport Implementations

Transports live in `Meshtastic/Accessory/Transports/`:

| File | Protocol | Notes |
|------|----------|-------|
| `BLETransport.swift` | CoreBluetooth | Standard BLE connection to radios |
| `TCPTransport.swift` | Network.framework | Wi-Fi / TCP/IP to radios with networking |
| `SerialTransport.swift` | IOKit serial | macOS only; USB-serial adapters |

Each transport conforms to a `MeshTransport` protocol that exposes `connect()`, `disconnect()`, `send(data:)`, and a `received` publisher.

## AccessoryManager Extension Map

| Extension | Key Methods |
|-----------|------------|
| `+Discovery` | `startScanning()`, `stopScanning()`, `peripheral(_:didDiscover:)` |
| `+Connect` | `connect(peripheral:)`, `disconnect()`, `centralManager(_:didConnect:)` |
| `+ToRadio` | `sendPacket(_:)`, `sendWantConfig()`, `sendWaypoint(_:)` |
| `+FromRadio` | `handleFromRadio(_:)`, `handleMeshPacket(_:)` |
| `+Position` | `startLocationUpdates()`, `sendPosition(_:)` |
| `+MQTT` | `connectMQTT()`, `publishPacket(_:)`, `mqttClient(_:didReceiveMessage:)` |
| `+TAK` | `sendCoT(_:)`, `parseTAKPacket(_:)` |

## Packet Flow (Inbound)

```
Radio (BLE/TCP/Serial)
  → Transport.received publisher
  → AccessoryManager+FromRadio.handleFromRadio(_:)
  → Decode protobuf (MeshtasticProtobufs)
  → Route by packet type:
      MeshPacket  → handleMeshPacket(_:)
      NodeInfo    → updateNodeInfo(_:)
      MyNodeInfo  → updateMyNodeInfo(_:)
      Config      → updateConfig(_:)
      ...
  → Write to SwiftData via MeshPackets @ModelActor
  → Publish changes via @Published properties (UI updates)
```

## Packet Flow (Outbound)

```
View / Service
  → AccessoryManager+ToRadio.sendPacket(_:)
  → Encode to protobuf (ToRadio wrapper)
  → Transport.send(data:)
  → Radio
```

## Adding a New Packet Type

1. Add the protobuf definition in the `protobufs/` submodule.
2. Run `./scripts/gen_protos.sh`.
3. Add a decode/dispatch case in `AccessoryManager+FromRadio.handleFromRadio(_:)`.
4. Add a send method in `AccessoryManager+ToRadio.swift`.
5. Add a model property or SwiftData entity if the data needs to persist.
6. Write unit tests against the encode/decode round-trip.

## Concurrency Notes

`AccessoryManager` is not `@MainActor`. Its `@Published` properties are observed from SwiftUI views on the main actor. Use `await MainActor.run { }` when updating published properties from background tasks or CoreBluetooth delegate callbacks.

Background persistence writes must go through the `MeshPackets` `@ModelActor`, not the main `ModelContext`.
