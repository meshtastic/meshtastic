---
title: Lockdown Mode
parent: User Guide
sidebar_position: 8
---

# Lockdown Mode

Lockdown mode is a hardened-firmware feature (`MESHTASTIC_LOCKDOWN` builds) that keeps a radio's storage locked until a passphrase is presented. When you connect to a lockdown-enabled device, the app requires the passphrase before you can use the rest of the app with that radio. Standard firmware is unaffected — if your radio doesn't run a lockdown build, you will never see any of these screens.

## First-Time Setup

The first time you connect to a lockdown-capable device that has never been provisioned, the app shows a full-screen **Set device passphrase** prompt.

1. Enter a passphrase between 1 and 32 bytes. A counter below the field shows the current length.
2. Optionally expand the **Session** section to limit how long an unlock lasts (see [Session Limits](#session-limits) below).
3. Tap **Set Passphrase**.

Pick a passphrase you can re-enter — it protects the device's storage, and the radio will require it again after the session expires.

## Unlocking a Device

When you connect to a locked device, the app shows a full-screen **Unlock device** prompt. Enter the passphrase and tap **Unlock**. The prompt can't be swiped away — the device requires authentication before the app can talk to it.

After a successful unlock, the app stores the passphrase for that specific radio in the iOS Keychain (on this device only — it is never synced to iCloud) and silently replays it on future connections, so you normally only type it once per device. If the stored passphrase stops working (for example, it was changed elsewhere), the app clears it and asks you to enter the current one.

### Wrong Passphrase and Rate Limiting

A wrong passphrase shows an inline error so you can try again. If the firmware rate-limits repeated attempts, the app shows a **Too many attempts** countdown; when the timer elapses, the passphrase prompt returns automatically.

## Session Limits

When setting or entering a passphrase, the **Session** section lets you cap how long the unlocked session lasts. All fields are optional — leave them empty for the firmware defaults.

| Field | Meaning |
|-------|---------|
| Boots remaining | How many reboots the session survives before the passphrase is required again. |
| Hours valid | Wall-clock lifetime of the session. Empty means no time limit. |
| Session cap (minutes) | Per-boot uptime cap. When it elapses the device reboots; the next boot unlocks automatically if boots remain. |

## Managing Lockdown in Settings

While a session is unlocked, **Settings → Radio Configuration → Security** shows a **Lockdown** section with:

- **Session status** — currently Unlocked, plus boots remaining and the session expiry (or "No time limit").
- **Lock Now** — immediately revokes the session and reboots the device locked. You will need the passphrase to reconnect. The app disconnects automatically once the device confirms.
- **Forget Stored Passphrase** — removes the passphrase saved for this radio from the iOS Keychain. The next connection will prompt for it again.

The section is hidden entirely for radios that don't report lockdown state.

## Notes

- The passphrase is sent only to the connected radio over the direct connection; it is never transmitted over the mesh.
- Each radio has its own stored passphrase, keyed to that radio — forgetting one device's passphrase doesn't affect others.
- A locked device suppresses configuration prompts (such as the region-unset banner) until the session is unlocked, since its configuration can't be reached while locked.
