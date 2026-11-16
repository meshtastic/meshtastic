---
title: Transport
sidebar_position: 5
last_updated: 2026-10-21
description: The BLE, USB serial, and TCP transports behind the RadioTransport abstraction — which module owns each, and how to add a new one.
parent: Developer Guide
---

# Transport

The app talks to the node over three transports (BLE, USB serial, and TCP) behind one abstraction.

## Transport Abstraction

The transport layer is abstracted through interfaces defined in `core:repository` (`RadioTransport`,
`RadioTransportFactory`, `RadioInterfaceService`). Each transport's concrete implementation lives in
`core:network`: `BleRadioTransport` (BLE), `TcpRadioTransport` (TCP), and `SerialRadioTransport` (Android
USB serial), alongside `MockRadioTransport` and `ReplayRadioTransport` for development. `core:ble` supplies
the lower-level BLE connection primitives (scanning, GATT, Kable wiring) that `BleRadioTransport` builds
on — it does not implement `RadioTransport` itself. This lets the app work identically regardless of the
underlying connection type.

```text
Feature UI → RadioController → RadioInterfaceService → RadioTransport (BLE | Serial | TCP)
```

Every transport address starts with a one-character `InterfaceId`: `x` BLE (`!` is accepted too), `s`
serial, `t` TCP, `m` mock, `r` replay, and `n` for no device selected. `RadioTransportFactory.isAddressValid` checks that prefix
before a connection is attempted.

## Bluetooth Low Energy (BLE)

**Module:** `core:network` (the `BleRadioTransport` implementation) built on `core:ble` (BLE connection
primitives)  
**Platforms:** Android, Desktop (JVM via Kable); code compiles for iOS, but no iOS app ships

The primary transport for mobile devices and also available on desktop:
- Service discovery for Meshtastic GATT services
- Characteristic-based read/write for protobuf packets
- Connection state management and automatic reconnection
- MTU negotiation for optimal packet sizes

### Where the Code Lives

- `BleRadioTransport` (`core:network`) — the `RadioTransport` implementation for BLE
- `core:ble` — BLE scanning, connection, and GATT operations (`BleScanner`, `BluetoothRepository`,
  `KableBleConnection`), which `BleRadioTransport` consumes
- The Kable scanner and connection are shared `commonMain` code; `androidMain` and `jvmMain` hold each platform's `BluetoothRepository`, Kable setup, and scan rate limiting, and Android adds bonding and the GATT cache refresh

## USB Serial

**Module:** `core:network`  
**Platforms:** Android (OTG), Desktop

Serial communication over USB:
- Uses `usb-serial-for-android` library on Android
- Direct serial port access on Desktop (JVM)
- Probe table for supported USB vendor/product IDs
- Automatic detection when USB device is connected

### Where the Code Lives

- `SerialRadioTransport` (`core:network`, `androidMain`) — the Android `RadioTransport` implementation
- `SerialTransport` (`core:network`, `jvmMain`) — the shared serial-port transport Desktop builds on
- `DesktopRadioTransportFactory` (`desktopApp`) — creates `SerialTransport`, which uses jSerialComm, for Desktop's serial addresses

## TCP/IP

**Module:** `core:network`  
**Platforms:** Android, Desktop (iOS: code compiles, but there's no iOS app target or `RadioTransportFactory` — see [Transport Factory](#transport-factory))

Network-based transport for Wi-Fi-enabled nodes:
- TCP socket connection to the node's IP address
- Default port: 4403
- Nodes on the local network found through mDNS (`_meshtastic._tcp`): `NsdManager` on Android, JmDNS on Desktop
- Used for development with meshtasticd and simulated nodes
- Available when BLE/USB is impractical

## Transport Factory

The `RadioTransportFactory` interface abstracts transport creation:

```kotlin
interface RadioTransportFactory {
    val supportedDeviceTypes: List<DeviceType>

    /** Whether the virtual demo transports (`m` mock / `r` replay) may be offered and bound right now. */
    val mockTransportEnabled: StateFlow<Boolean>

    /** Whether this build ships a packet capture to replay, rather than degrading to plain mock. */
    val isReplayTransportAvailable: Boolean

    fun createTransport(address: String, service: RadioInterfaceService): RadioTransport
    fun isAddressValid(address: String?): Boolean
    fun toInterfaceAddress(interfaceId: InterfaceId, rest: String): String
}
```

`mockTransportEnabled` is a flow, not a one-shot check: the Android Demo Mode gesture (five taps
on the Settings app-version row) unlocks the demo transports mid-session, and the device list has
to notice. Every consumer must read that one flow — the visibility path and the `isAddressValid`
admission path have to agree, or the demo entry appears and then refuses to connect.

`BaseRadioTransportFactory` (`core:network`, `commonMain`) holds the shared half: it creates
`BleRadioTransport` for BLE addresses, admits each address type in `isAddressValid`, and hands every other
address to the platform's `createPlatformTransport`. On hardware without Bluetooth LE it refuses BLE
addresses, and the Android factory refuses serial addresses on hardware with no USB host, so a saved
address restored onto such a device is kept but never armed.

Platform-specific implementations:
- **Android:** `AndroidRadioTransportFactory` (`core:network`, `androidMain`) supports BLE + USB + TCP; Demo Mode is on in debug builds and Firebase Test Lab, and in release builds once hidden features are unlocked
- **Desktop:** `DesktopRadioTransportFactory` (`desktopApp`) supports BLE (Kable) + USB + TCP; Demo Mode is a debug-build feature, and the replay transport isn't wired
- **iOS:** Code compiles for BLE and TCP, but no `RadioTransportFactory` implementation exists and no iOS app ships

## Connection Lifecycle

1. **Discovery** — Find available nodes (BLE scan / USB detect / mDNS or a manually entered TCP address)
2. **Connection** — Establish link to selected node
3. **Handshake** — Exchange node info and configuration
4. **Active** — Normal message exchange
5. **Disconnection** — Clean teardown or error recovery

The app-level state is `ConnectionState` (`Disconnected`, `Connecting`, `Connected`, `DeviceSleep`), read
through `ConnectionStateProvider`. `MeshConnectionManager` writes `Connecting`, `DeviceSleep` and
`Disconnected` as it reconciles transport events with the node's sleep policy, and `MeshConfigFlowManager`
writes `Connected` once the handshake completes. UI code observes this state, never
`RadioInterfaceService.connectionState`.

## Adding a New Transport

1. Implement `RadioTransport` interface
2. Give it an `InterfaceId` prefix, admit it in `isAddressValid`, and create it in the platform's `createPlatformTransport`
3. Add connection UI in `feature:connections`
4. Update DI bindings for the platform
