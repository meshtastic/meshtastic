---
title: TAK Integration
parent: User Guide
sidebar_position: 9
---

# TAK Integration

The Meshtastic app supports Team Awareness Kit (TAK) integration, enabling interoperability with ATAK (Android Team Awareness Kit), iTAK, and other CoT (Cursor-on-Target) compatible systems over LoRa mesh radio — no cellular or internet required.

## What is TAK?

TAK is a situational awareness platform widely used in tactical, emergency management, and outdoor recreation contexts. It displays the positions and status of team members on a shared map. Meshtastic bridges TAK users over LoRa, so teams stay connected without requiring cellular or internet coverage.

## Supported Device Roles

TAK integration works with two device roles:

| Icon | Role | Description |
|------|------|-------------|
| ![TAK](/img/apple/roleTak.webp) | TAK | Full TAK role — sends CoT position reports and can relay TAK data packets. |
| ![TAK Tracker](/img/apple/roleTakTracker.webp) | TAK Tracker | Lightweight position-only TAK role. Lower power consumption, no packet relay. |

Set the device role in **Settings → Device**.

:::tip Firmware version
The full TAK V2 wire format (shapes, routes, markers, casevac, emergency) requires firmware **2.8.0 or later** on the connected radio. Older firmware still supports PLI and GeoChat over the legacy V1 format — the app falls back automatically.
:::

## TAK Server Screen

**Settings → TAK Server** is the single destination for everything TAK-related. The screen is organised top-to-bottom so you can configure your identity, start the server, and pair an ATAK / iTAK client in one pass.

### TAK Identity

The first section, **TAK Identity**, controls the firmware-level team and role identity the radio attaches to every position report:

| Setting | Description |
|---------|-------------|
| Team | The team color shown to TAK clients. Default is Cyan; all standard ATAK team colors are available. |
| Role | Your TAK role. Choices are Team Member (default), Team Lead, HQ, Sniper, Medic, Forward Observer, RTO, and K9. |

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/img/apple/takIdentitySection_dark.webp" />
  <img src="/img/apple/takIdentitySection.webp" alt="TAK Identity section with Team and Role pickers" />
</picture>

A **Save TAK Identity** button appears in the section only when there are unsaved changes. Saving dispatches an admin message to the connected node; you'll see the change reflected in TAK clients on the next position report.

:::tip Identity pickers disabled?
The pickers stay disabled until the connected radio reports its TAK module config back to the app. This usually happens within a few seconds of connecting — give it a moment, or disconnect and reconnect if it doesn't appear.
:::

### Server Status, Enable, and Channel

Below the identity section:

- A **status indicator** showing whether the in-app TAK Server is running and whether your primary channel is suitable for TAK use.
- An **Enable TAK Server** toggle.
- A **channel picker** for the LoRa channel the server bridges between TAK clients and the mesh.
- **Read-only mode** (treat the app as a TAK observer that doesn't forward CoT to the mesh) and **mesh-to-CoT relay** toggles.

:::tip Primary channel requirements
The TAK Server runs in **read-only mode** until your primary channel has a non-default name and a non-default 256-bit encryption key. Use the **Fix Channel** button on the warning banner to apply a recommended TAK preset (Short Fast, new AES key, name "TAK") in one tap.
:::

### Certificates

Import a P12 (PKCS#12) or PEM bundle for mTLS-protected ATAK / iTAK connections. The app stores the certificates encrypted in the keychain — they're not visible to other apps or to iTunes/Finder file sharing.

### Data Package

Export a TAK data package zip that you can sideload into ATAK / iTAK. The client uses it to find and trust the app's local server without manually entering a host, port, or certificate.

## Receiving Routes

When another node on the mesh sends a route CoT (`b-m-r`), the app automatically writes it as a KML data package to `Documents/TAK Routes/` and posts an iOS notification so you don't miss it:

| Field | Content |
|-------|---------|
| Title | Route Received |
| Subtitle | _route callsign_ (or "Unknown Route") |
| Body | Saved to Files → Meshtastic → TAK Routes. Open in iTAK to import. |

iTAK silently ignores route CoT received over its TCP streaming connection, so this fallback lets you import the route manually. Tap the notification, then in Files navigate to **On My iPhone → Meshtastic → TAK Routes**, share the `.zip` to iTAK, and choose **Import Mission Package**.

:::tip Where are my routes?
The `TAK Routes` folder is created the first time a route arrives. If you don't see it, no routes have been received yet. The KML inside the zip is a standard KML 2.2 LineString — you can also open it in Google Earth or any KML viewer.
:::

## How It Works Under the Hood

You don't need to configure anything: the app automatically picks the best TAK wire format your radio supports. Firmware 2.8.0+ uses the new V2 format with zstd-dictionary compression for richer message types and shorter LoRa transmissions. Older firmware keeps using the legacy V1 format, which carries PLI and GeoChat between any two nodes plus a richer Apple-to-Apple fallback for shapes, markers, and routes.

Developers and curious users can read the full protocol detail in [TAK Protocol](../developer/tak-protocol.md).

## Troubleshooting

**TAK client won't connect**
- Make sure the in-app TAK Server is enabled in **Settings → TAK Server**.
- Confirm your primary channel has a non-default name **and** encryption key — the server runs in read-only mode otherwise. Use **Fix Channel** in the warning banner if shown.
- For mTLS clients, confirm a P12 / PEM bundle was imported under **Certificates**.

**Routes don't show up in iTAK**
- iTAK ignores route CoT from TCP streaming on purpose. Open the saved zip from **Files → Meshtastic → TAK Routes** and import it as a Mission Package.
- If the `TAK Routes` folder is missing, no route CoT has arrived yet.

**Identity pickers are disabled**
- The radio must report its TAK module config back to the app before the pickers enable. Reconnect if it doesn't come through within a few seconds.
- The connected node must have the **TAK** or **TAK Tracker** device role — Team / Role have no effect on other roles.

## Requirements

- Firmware **2.3 or later** on your radio for basic TAK PLI / GeoChat; **2.8.0 or later** for the full TAK V2 wire format.
- An ATAK / iTAK / TAK-compatible client app on your phone or tablet.
- Device configured with the **TAK** or **TAK Tracker** role.
