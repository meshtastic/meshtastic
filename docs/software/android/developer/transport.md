---
title: Transport
sidebar_position: 5
last_updated: 2026-08-29
description: The BLE, USB serial, and TCP transports behind the RadioTransport abstraction — which module owns each, and how to add a new one.
parent: Developer Guide
---

# Transport

The app talks to the radio over three transports — BLE, USB serial, and TCP — behind one abstraction.

## Transport Abstraction

The transport layer is abstracted through interfaces defined in `core:repository` (`RadioTransport`,
`RadioTransportFactory`, `RadioInterfaceService`). Each transport's concrete implementation lives in
`core:network`: `BleRadioTransport` (BLE), `TcpRadioTransport` (TCP), and `SerialRadioTransport` (Android
USB serial), alongside `MockRadioTransport` and `ReplayRadioTransport` for development. `core:ble` supplies
the lower-level BLE connection primitives (scanning, GATT, Kable wiring) that `BleRadioTransport` builds
on — it does not implement `RadioTransport` itself. This lets the app work identically regardless of the
underlying connection type.

```text
App ← RadioController → Transport (BLE | Serial | TCP)
```

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
- Platform-specific implementations in `androidMain` and `jvmMain` (Kable)

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
- `DesktopRadioTransportFactory` (`desktopApp`) — wires Desktop's jSerialComm-based serial connection

## TCP/IP

**Module:** `core:network`  
**Platforms:** Android, Desktop (iOS: code compiles, but there's no iOS app target or `RadioTransportFactory` — see [Transport Factory](#transport-factory))

Network-based transport for Wi-Fi-enabled radios:
- TCP socket connection to radio's IP address
- Default port: 4403
- Used for development with simulated radios
- Available when BLE/USB is impractical

## Transport Factory

The `RadioTransportFactory` interface abstracts transport creation:

```kotlin
interface RadioTransportFactory {
    val supportedDeviceTypes: List<DeviceType>

    /** Whether the virtual demo transports (`m` mock / `r` replay) may be offered right now. */
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

Platform-specific implementations:
- **Android:** Supports BLE + USB + TCP
- **Desktop:** Supports BLE (Kable) + USB + TCP
- **iOS:** Code compiles for BLE and TCP, but no `RadioTransportFactory` implementation exists and no iOS app ships

## Connection Lifecycle

1. **Discovery** — Scan for available radios (BLE scan / USB detect / manual TCP)
2. **Connection** — Establish link to selected radio
3. **Handshake** — Exchange node info and configuration
4. **Active** — Normal message exchange
5. **Disconnection** — Clean teardown or error recovery

## Adding a New Transport

1. Implement `RadioTransport` interface
2. Register in platform-specific `RadioTransportFactory`
3. Add connection UI in `feature:connections`
4. Update DI bindings for the platform
