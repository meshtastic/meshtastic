---
title: Messages & Channels
sidebar_position: 3
last_updated: 2026-09-14
description: Send and receive messages, manage channels, configure encryption, search conversations, and use quick chat, reactions, and message actions.
parent: User Guide
---

# Messages & Channels

Meshtastic supports two communication modes: **channel broadcasts** and **direct messages**.

## Channels

Channels are shared communication groups. All nodes configured with the same channel key can read and send messages on that channel.

### Default Channel

Every Meshtastic radio comes with a default **LongFast** channel. It is encrypted with a well-known default key, so anyone running Meshtastic on the same preset can read it.

### Channel Security

Each channel carries a lock icon that shows how well it is protected. Tap the icon to see the same explanation inside the app.

| Icon | What it means |
|------|---------------|
| Green closed lock | The channel is securely encrypted, with either a 128-bit or a 256-bit AES key. |
| Yellow open lock | The channel is not securely encrypted — it uses no key at all, or a well-known one-byte key — and it does not carry precise location. |
| Red open lock | Not securely encrypted, and the channel carries precise location data. |
| Red open lock with a warning badge | Not securely encrypted, carrying precise location data, and uplinking that data to the internet over MQTT. |

Key length alone does not change the icon: a 128-bit key and a 256-bit key both show the green lock.

> 🔒 **Security:** Always configure a unique PSK for private communications. The default channel is intentionally open so new users can discover the mesh — but you should create a separate encrypted channel for anything sensitive.

### Adding a Channel

1. Connect to your radio. The **Channels** row stays grayed out until the app has a connection — see [Connections](connections.md).
2. Go to **Settings**, then tap **Channels** under **Configuration**.
3. Tap the **+** button to add a channel. The editor opens on the new entry.
4. Set the channel name and the **PSK**, and choose whether the channel uses MQTT uplink and downlink. Naming a new channel generates a fresh 256-bit key for you; the refresh icon beside **PSK** generates another one.
5. Tap **Save** to close the editor. The change is still only on your phone.
6. Tap **Send** at the bottom of the channel list to write the changes to the radio. **Cancel**, or leaving the screen without tapping **Send**, throws them away.
7. Optional: share the channel URL or QR code with the people who need access.

Tapping an existing channel opens the same editor, where you can change the name, the PSK, MQTT uplink and downlink, and position precision. Every edit on this screen — adding, editing, deleting, or dragging a channel into a new order — waits on **Send** the same way.

### Archived Channels

A conversation belongs to the channel it was held on, not to the slot that channel occupied. When a channel leaves your radio — you scan a different channel QR, replace a channel's key, or switch the modem preset — its conversation is **archived** rather than deleted or merged into whatever takes the slot.

An archived conversation:

- stays in the **Channels** list under the name the channel had, below the channels currently on your radio, marked with a history icon;
- keeps its full message history, searchable as usual;
- is read-only — you cannot send, reply, or react, because the channel is no longer on the radio to send on, and it is not offered as a share target;
- comes back automatically if you re-add that exact channel, taking its messages back to the live slot.

Changing the modem preset archives the channel too: the preset is part of a default channel's identity, so **LongFast** and **MediumFast** are different channels even though neither the name nor the key changed. Changing only the region does not archive anything.

To remove an archived conversation for good, long-press it in the conversation list and delete it.

## Direct Messages

Direct messages (DMs) go to one specific node. When both radios hold each other's public keys, your radio encrypts the message to that node's public key, so no one else on the mesh can read it — not even nodes that share your channel.

Your radio must already hold the other node's public key before it can send a DM. Keys travel inside node info, which nodes broadcast periodically, so the key usually arrives on its own once you have heard from that node. Until it does, a radio that has its own key pair — the default — refuses the send rather than falling back to channel encryption, and the message shows **Recipient key unavailable**.

A public-key conversation carries a key icon in its top bar. A green closed lock means the direct message is protected by public-key encryption; a red key-off icon means the node's public key changed and no longer matches the one your radio stored. Tap the icon for the details.

### Sending a Direct Message

1. Open the **Messages** tab.
2. Select a conversation, or tap a node in the node list.
3. Type your message and tap **Send**.

### Managing the Conversation List

The **Messages** tab lists your conversations. Each row shows what you need at a glance, and you
can act on it directly:

- **Unsent drafts survive.** Type into a conversation and leave without sending, and the text is
  still there when you come back. The row shows it as `Draft: …` in place of the last message —
  an unsent draft is the thing the row is waiting on *you* for.
- **Unread badge.** A count sits on the row until you open the conversation.
- **Swipe right to mute** (swipe again to unmute) and **swipe left to delete**. Deleting asks
  first; muting shows a snackbar with **Undo**.
- **Touch & hold to select** one or more conversations, then use the action bar to **Pin**,
  **Mark unread**, mute or delete them together. Pinned conversations carry a pin marker and rise
  to the top of **their own section**.
- **The list is split into Channels and Direct Messages**, each with a collapsible header and each
  sorted independently — so a pinned direct message rises within its own section, not above the
  Channels one.

### Conversation Bubbles

On Android 11 and later, a message notification can be opened as a floating **bubble** that
stays on top of whatever else you are doing. Tap the bubble icon on the notification to promote
a conversation; Android remembers the choice per conversation, and the system Bubbles settings
control whether they are offered at all.

### Message States

A status label appears under **your own** outgoing messages only (incoming messages from others show no status label):

| State | Meaning |
|-------|---------|
| Sending… | Queued or already handed to the radio, not yet resolved either way. Both stages share this text, but the icon and color change as it progresses — a yellow upload cloud while queued, a blue arrow once the radio has it |
| Delivered to recipient | The strongest confirmation for a direct message — an acknowledgment came back |
| Delivered to mesh | For a channel broadcast, the message reached the mesh (broadcasts have no per-recipient ack) |
| Relayed, not confirmed by recipient | For a direct message, shown in a warning color — the message was relayed but no acknowledgment has come back yet |
| Routing via SF++ chain… | Being routed/buffered by the Store & Forward Plus Plus chain |
| Confirmed on SF++ chain | Confirmed delivered via the SF++ chain |
| Error | Delivery failed — tap the status for the specific reason (see [Delivery Errors](#delivery-errors)) |

### Delivery Errors

When a message fails to deliver, the error indicator shows what went wrong:

| Error | Meaning | What to Do |
|-------|---------|------------|
| No route | No path exists to the destination node | The recipient may be offline or out of mesh range. Try later or move closer. |
| No radio interface | No radio interface available to send | Check that your radio is connected and available. |
| Failed to deliver to mesh | Retries exhausted. The same label covers three underlying causes — a relay refusing (NAK), a plain timeout, and running out of retransmits | Move closer, improve signal, or wait for conditions to improve. Tap the error for the specific cause. |
| Rate limited | The mesh is throttling you for sending too fast | Wait before sending again. |
| Not authorized | The destination refused the request | Check you have the right channel and keys for that node. |
| Recipient needs your key | Direct-message encryption could not complete because the other node does not have your public key yet | Exchange node info — the key travels with it. Common on a first DM to a new contact. |
| Recipient key unavailable | You do not have the recipient's public key | Wait for their node info to arrive, or ask them to broadcast it. |
| Could not send encrypted message | Encryption failed for this direct message | Verify both nodes have exchanged keys and are on compatible firmware. |
| Admin session expired | A remote-admin session timed out | Reopen the remote node's settings to start a new session. |
| Admin key not authorized | The target node does not accept your admin key | Verify the admin key matches on both nodes. |
| Channel/key mismatch | Destination channel/key does not match | Verify both nodes share the same channel and PSK. |
| Message is too large to send | Message exceeds maximum payload size | Shorten the message and try again. |
| No app response | App or plugin did not respond to the request | Retry or check the destination app or module state. |
| Duty cycle limit | Regional airtime limit reached | Wait for the duty cycle window to reset. |
| Invalid request | Malformed or invalid request | Retry after updating or restarting the app if this persists. |

> 💡 **Tip:** Most delivery errors resolve themselves. If a node is intermittently reachable, the mesh will retry. For persistent **No route** errors, check that intermediate Router nodes are online.

## Message Features

### Quick Chat

Pre-configured messages for rapid communication, useful when typing is impractical (gloves, small screen, urgent):

- The quick chat row is hidden until you turn it on. Open a conversation, tap the overflow menu in the top bar, then tap **Show quick chat menu**. **Hide quick chat menu** puts the row away again.
- The row carries one built-in entry, the 🔔 alert bell. It appends an alert message that includes a bell character, which clients that support it flag as an alert. Every other button on the row is one you created.
- Add, edit, reorder, and delete your own entries from the same overflow menu — tap **Quick chat options**.

![Quick chat option](/img/android/docs/messages_quick_chat.webp)

Each quick chat entry has a **Name** — the button label, capped at five characters, forced to uppercase, and filled in for you from the message text — and the **Message** it carries. A switch decides what tapping the button does. A new entry starts on **Instantly send**, so a tap sends the message straight away; turn the switch off and the label changes to **Append to message**, which puts the text in the input field for you to edit first.

![New quick chat dialog with name, message, and instantly-send toggle](/img/android/docs/messages_edit_quick_chat.webp)

### Searching Messages

You can search the full history of any conversation directly from the chat screen:

1. Open a conversation (a channel or a direct message).
2. Tap the **search icon** in the top bar.
3. Type into the **Search messages…** field. The search runs as you type, across all stored messages in that conversation.
4. Use the **N / M** result counter and the **previous / next arrows** to jump between matches, which are highlighted in the conversation.

![Message search bar with result counter and previous/next arrows](/img/android/docs/messages_search_bar.webp)

> 💡 **Tip:** Search is full-text and stays within the conversation you opened it from — it doesn't search across other channels or contacts. It matches against the messages already stored on your device, so it works fully offline.

### Message Bubbles

Messages appear as chat bubbles — sent messages on the right, received messages on the left. Each bubble shows the sender, timestamp, and delivery status. Messages with replies include a quoted preview of the original message above the response.

### Text Formatting

Messages support lightweight inline **Markdown**. Received messages render the styling with the syntax characters removed:

| Type | Syntax | Renders as |
|------|--------|------------|
| Bold | `**bold**` | **bold** |
| Italic | `*italic*` | *italic* |
| Strikethrough | `~~strike~~` | ~~strike~~ |
| Inline code | `` `code` `` | monospace `code` |
| Link | `[label](https://example.com)` | a tappable **label** |

When composing, focus the message field and type at least three characters to reveal a **formatting toolbar** below the input. Select text and tap a style to wrap it (tap again to remove it); with no selection, a style inserts an empty pair with the cursor between the markers. The link button opens a dialog to enter a URL. As you type, the field shows the styled text, but the message you send still contains the Markdown characters.

> 💡 **Tip:** Formatting is carried as literal characters on the mesh — the same bytes iOS sends. Clients that don't support Markdown (older apps, plain firmware clients) will show the raw `**`/`~~` characters. URLs, email addresses, and phone numbers are still auto-linked whether or not you use Markdown.

### Mentions

Type `@` while composing to mention a node — a picker suggests matching contacts as you type. In a received message, a mention appears as a highlighted chip showing the node's name; tap it to jump straight to that node's detail page.

### Reactions

React to messages with emoji:
- **Touch & hold** a message — or double-tap it — to raise a quick reaction bar above the bubble. Opening the bar sends nothing.
- Tap an emoji in the bar to send it; tap **More reactions** to open the full picker, or anywhere outside
  the bar to dismiss it without sending. A reaction is a real mesh packet, so it only goes out
  when you pick an emoji.
- Reactions appear below the message bubble
- Multiple users can react to the same message
- React to your own messages or others' messages

![Emoji reaction badges displayed beneath a message](/img/android/docs/messages_reaction.webp)

> 💡 **Tip:** Reactions are lightweight — they use minimal mesh bandwidth compared to full text messages.

### Replying

**Swipe a message to the right** to reply to it — the composer opens with that message quoted.
Swiping past the reply threshold arms the action; releasing before it springs back with nothing sent.
Reply is also in the actions sheet, reached by touching & holding and then tapping **More message actions**.

### Day Separators

Messages are grouped by day. The separator above the first message of each day reads **Today**
or **Yesterday** for the two most recent days, and the date itself for older ones.

### Jump to Latest

Scrolling back through a conversation raises a jump-to-latest control. When messages arrive
while you are scrolled up, it names the most recent sender and adds a count of the other unread
messages. That count is messages, not people — five unread from one person reads as their name
**+4**.

### Message Actions

Touch & hold or double-tap a message to open the quick reaction bar, then tap **More message actions**
(the overflow icon on that bar) to open the actions sheet. The emoji row runs across the top of the
sheet — that is where reactions live — and beneath it, along with the message's timestamp and
delivery status, are:

- **Reply** — quote the message in your response
- **Copy** — copy the message text to the clipboard
- **Translate** — translate a received message into your device language, and toggle between the original and translated text (Google Play build only; uses on-device translation). The first translation into a language asks to download a one-time language model and tells you its size, then translates once the download finishes. If the download fails, or the message is already in your language, the app says so instead of translating
- **Select** — start multi-select, so you can act on several messages at once
- **Delete** — remove the message from this phone. It works on any message in the conversation, yours or not, and does not remove it from anyone else's radio or phone

### Message Priority

The app sends every message you compose at the same, default priority — there is no
emergency or alert tier to choose, and nothing in the app raises a direct message above a
channel broadcast. Any prioritising between them happens in firmware, not here. (The app
does mark some of its own internal traffic, such as admin and traceroute packets, as
reliable or background, but that is not something you control from the message composer.)

### Message Limits

- **Maximum length:** 200 bytes (approximately 200 characters for ASCII text)
- The 200-byte cap applies to the in-app composer — the mesh payload limit itself is 233 bytes, so messages from other senders (e.g., App Functions) may arrive slightly longer
- **Rate limiting:** The mesh enforces airtime fairness; heavy message volume may be throttled
- **Delivery:** Messages are retried automatically if no acknowledgment is received

## Best Practices

- Use channels for group coordination
- Use direct messages for private person-to-person communication
- Keep messages short — mesh bandwidth is limited
- Configure encryption for sensitive communications

## Related Topics

- [Nodes](nodes.md) — tap a node to start a direct message
- [Settings — Radio & User](settings-radio-user.md) — configure channel encryption and presets
- [MQTT](mqtt.md) — bridge channel messages to the internet
- [Channel configuration](https://meshtastic.org/docs/configuration/radio/channels) — detailed channel settings on meshtastic.org
