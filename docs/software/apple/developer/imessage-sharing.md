---
title: Imessage Sharing
---

# Messages sharing extension

The `MeshtasticMessages` target is an iMessage app extension embedded in the
main iOS app. It supports three share types:

- Contact exchange cards using Meshtastic `/v/` contact URLs.
- Channel cards using the existing `/e/` channel URL format.
- Static original Chirpy and official Meshtastic design-repository stickers.

All bundled sticker and Messages icon artwork comes directly from the official
[`meshtastic/design`](https://github.com/meshtastic/design) repository. The
extension does not use AI-generated or redrawn brand artwork.

## Screenshots

| Contact and channel cards in Messages | Contact exchange composer |
| --- | --- |
| ![Received Meshtastic contact card and stickers in Messages](/img/apple/imessage-contact-card.webp) | ![Contact exchange composer](/img/apple/imessage-contact-exchange.webp) |
| ![Received selected-channel card and contact card in Messages](/img/apple/imessage-channel-card.webp) | ![Channel-sharing composer with Replace selected](/img/apple/imessage-channel-sharing.webp) |

## Recent radio snapshot

After configuration or node-database synchronization completes, the main app
serializes the active radio's own contact, LoRa configuration, and active
channels into `MeshShareSnapshot`. `MeshShareStore` keeps that snapshot in the
device-only Keychain access group shared by the app and extension. This lets
Messages share the most recently connected radio while the radio is offline.

Snapshots older than 30 days remain usable but display a warning.

## Contact exchange

Initial contact cards include `exchange=true`. Selecting one in Messages offers
`Add & Reply with Mine`. That action inserts the local contact reply into the
same conversation, without the exchange flag, and then opens the main app to
confirm the incoming contact import. Removing the flag from replies prevents an
endless exchange prompt.

Legacy contact links without the query remain supported.

## Channel behavior

All active channels start selected and can be deselected. Replace is the
default and includes the sender's LoRa configuration. Add mode uses the
existing `?add=true` URL behavior and omits LoRa configuration. Encrypted
channel PSKs are preserved, and the extension warns the sender before sharing.

## Security notes

- Snapshot Keychain accessibility is
  `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`.
- The snapshot does not sync through iCloud.
- Raw contact or channel payloads are not logged.
- Incoming contacts still require confirmation in the main app.
