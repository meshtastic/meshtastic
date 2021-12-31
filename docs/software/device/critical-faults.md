---
id: critical-error-codes
title: Critical error codes
sidebar_label: Critical error codes
---

The device might report these fault codes on the screen, but it will also be outputted on the device serial output. If you encounter a fault code, please post on the forum and we'll try to help.

:::note
This table is derived from the [protobufs](/docs/developers/protobufs/api#criticalerrorcode)
:::

| Name | Number | Description |
| ---- | ------ | ----------- |
| TxWatchdog | 1 | A software bug was detected while trying to send LoRa |
| SleepEnterWait | 2 | A software bug was detected on entry to sleep |
| NoRadio | 3 | No LoRa radio hardware could be found |
| Unspecified | 4 | Not normally used |
| UBloxInitFailed | 5 | We failed while configuring a UBlox GPS |
| NoAXP192 | 6 | This board was expected to have a power management chip and it is missing or broken |
| InvalidRadioSetting | 7 | The channel tried to set a radio setting which is not supported by this chipset, radio comms settings are now undefined. |
| TransmitFailed | 8 | Radio transmit hardware failure. We sent data to the radio chip, but it did not reply with an interrupt. |
| Brownout | 9 | We detected that the main CPU voltage dropped below the minimum acceptable value |
