---
id: radio-settings
title: Radio Settings
sidebar_label: Radio Settings
---

We use the same channel maps as LoRaWAN (though this is not LoRaWAN).

![freq table](/img/LoRa-Frequency-Bands.jpg)

See [this site](https://www.rfwireless-world.com/Tutorials/LoRa-channels-list.html) for more information.

## LoRaWAN Europe Frequency Band

The maximum power allowed is +14dBm ERP (Effective Radiated Power, see [this site](https://en.wikipedia.org/wiki/Effective_radiated_power) for more information).

### 433 MHz

There are eight channels defined with a 0.2 MHz gap between them.
Channel zero starts at 433.175 MHz

### 870 MHz

There are eight channels defined with a 0.3 MHz gap between them.
Channel zero starts at 865.20 MHz

## LoRaWAN for North America

LoRaWAN defines 64, 125 kHz channels from 902.3 to 914.9 MHz increments.

The maximum output power for North America is +30 dBm ERP.

The band is from 902 to 928 MHz. It mentions channel number and its respective channel frequency. All the 13 channels are separated by 2.16 MHz with respect to the adjacent channels.  
Channel zero starts at 903.08 MHz center frequency.

## Data-rates

### About

Various data-rates are selectable when configuring a channel and are inversely proportional to the theoretical range of the devices.

Considerations:

- Spreading Factor - How much we "spread" our data over time.
  - Each step up in Spreading Factor doubles the airtime to transmit.
  - Each step up in Spreading Factor adds about 2.5db extra link budget.
- Bandwidth - How big of a slice of the spectrum we use.
  - Each doubling of the bandwidth is almost 3db less link budget.
  - Bandwidths less than 31 may be unstable unless you have a high quality Crystal Oscillator.
- Coding Rate - How much redundancy we encode to resist noise.
  - Increasing coding rate increases reliability while decreasing data-rate.
  - 4/5 - 1.25x overhead
  - 4/6 - 1.5x overhead
  - 4/7 - 1.75x overhead
  - 4/8 - 2x overhead

### Pre-Defined

We have six predefined channels. These are the most common settings and have been proven to work well:

| Channel setting            | Alt Channel Name | Data-rate            | SF / Symbols | Coding Rate | Bandwidth | Link Budget |
| :------------------------- | :--------------- | :------------------- | :----------- | :---------- | :-------- | :---------- |
| Long Range / Slow          | Short Fast       | 18.89 kbps          | 7 / 128      | 4/5         | 500       | 134dB       |
| Long Range / Fast          | Short Slow       | 4.69 kbps           | 7 / 128      | 4/5         | 125       | 140dB       |
| Medium Range / Slow        | Medium Fast      | 1.2 kbps            | 10 / 1024    | 4/6         | 250       | 146dB       |
| Medium Range / Fast        | Medium Slow      | 0.75 kbps           | 11 / 2048    | 4/7         | 250       | 148dB       |
| Short Range / Slow         | Long Fast        | 0.19 kbps           | 9 / 512      | 4/8         | 31        | 153dB       |
| Short Range / Fast         | Long Slow        | 0.13 kbps (default) | 12 / 4096    | 4/8         | 125       | 154dB       |

Note: The link budget used by these calculations assumes a transmit power of 17dBm and an antenna with 0dB gain. Adjust your link budget assumptions based on your actual devices. Data-rate in this table is actual measured but doesn't count mesh overhead, hops and retransmissions.

### Custom Settings

You may want to select other channels for your usage. The other settings can be set by using the Python API.

```bash
meshtastic --setchan spread_factor 10 --setchan coding_rate 4 --setchan bandwidth 125
```

After applying the settings, you will need to restart the device. After your device is restarted, it will generate a new crypto key and you will need to share the newly generated QR Code or URL to all your other devices.

Some example settings:

| Data-rate  | SF / Symbols | Coding Rate | Bandwidth | Link Budget | Note                                                                    |
| :--------- | :----------- | :---------- | :-------- | :---------- | :---------------------------------------------------------------------- |
| 37.50 kbps | 6 / 64       | 4/5         | 500       | 129dB       | Fastest possible speed                                                  |
| 3.125 kbps | 8 / 256      | 4/5         | 125       | 143dB       |                                                                         |
| 1.953 kbps | 8 / 256      | 4/8         | 125       | 143dB       |                                                                         |
| 1.343 kbps | 11 / 2048    | 4/8         | 500       | 145dB       |                                                                         |
| 1.099 kbps | 9 / 512      | 4/8         | 125       | 146dB       |                                                                         |
| 0.814 kbps | 10 / 1024    | 4/6         | 125       | 149dB       |                                                                         |
| 0.610 kbps | 10 / 1024    | 4/8         | 125       | 149dB       |                                                                         |
| 0.488 kbps | 11 / 2048    | 4/6         | 125       | 152dB       |                                                                         |
| 0.336 kbps | 11 / 2048    | 4/8         | 125       | 152dB       |                                                                         |
| 0.073 kbps | 12 / 4096    | 4/5         | 31        | 160dB       | Twice the range and/or coverage of "Long Slow", low resilience to noise  |
| 0.046 kbps | 12 / 4096    | 4/8         | 31        | 160dB       | Twice the range and/or coverage of "Long Slow", high resilience to noise |

The link budget used by these calculations assumes a transmit power of 17dBm and an antenna with 0dB gain. Adjust your link budget assumptions based on your actual devices.

These channel settings may have not been tested. Use at your own discretion. Share on <https://meshtastic.discourse.group> with your successes or failure.

## Cryptography

The preshared key used by the devices can be modified.

- 0 = No crypto
- 1 = Default channel key
- 2 - 10 = The default channel key, except with 1 through 9 added to the last byte

Use of cryptography can also be modified. To disable cryptography (maybe useful if you have HAM radio license):

```bash
meshtastic --setchan psk 0
```
