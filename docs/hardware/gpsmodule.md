---
id: gpsmodule
title: External GPS Module
sidebar_label: GPS Module
---

:::warning
GPIO access is fundamentally dangerous because invalid options can physically damage or destroy your hardware. Ensure that you fully understand the schematic for your particular device before trying this as we do not offer a warranty. Use at your own risk.
:::

External GPS modules can be installed to extend the capabilities of simple boards.

## GY-GPS6MV2 GPS module
- Based on the ublox/u-blox NEO-6M module
- Input 3 to 5V
- Interface: RS232 TTL
- Default baud rate: 9600 bps
- Outputs NMEA sentences

[<img src="/img/hardware/gy-gps6mv2.jpg" alt="GY-GPS6MV2" style={{zoom:'50%'}} />](/img/hardware/gy-gps6mv2.jpg)


### LILYGO TTGO Lora32 v2.1-1.6

- Wiring instructions:

| GPS Module Pin | TTGO Lora32 v2.1-1.6 Pin |
| :-----: | :---------------: |
| VCC | 3.3V |
| RX | IO13 |
| TX | IO15  |
| GND | GND |

- Once the module is connected, it should be detected automatically by the firmware.

### LILYGO TTGO Lora32 v2.0

- Wiring instructions:

| GPS Module Pin | TTGO Lora32 v2.0 Pin |
| :-----: | :---------------: |
| VCC | 3.3V |
| RX | 13 |
| TX | 36  |
| GND | GND |

- Once the module is connected, it should be detected automatically by the firmware.

### LILYGO TTGO Lora32 v1.3

- Wiring instructions:

| GPS Module Pin | TTGO Lora32 v1.3 Pin|
| :-----: | :---------------: |
| VCC | 3.3V |
| RX | 13 |
| TX | 36  |
| GND | GND |

- Once the module is connected, it should be detected automatically by the firmware.

### LILYGO TTGO Lora32 V1.0

- Wiring instructions:

| GPS Module Pin | TTGO Lora32 v1.0 Pin|
| :-----: | :---------------: |
| VCC | 3.3V |
| RX | 37 |
| TX | 36  |
| GND | GND |

- Once the module is connected, it should be detected automatically by the firmware.

### Heltec Lora32 v2.0 and v2.1

- Wiring instructions:

| GPS Module Pin | Heltec Lora32 Pin|
| :-----: | :---------------: |
| VCC | 3.3V |
| RX | 37 |
| TX | 36  |
| GND | GND |

- Once the module is connected, it should be detected automatically by the firmware.



