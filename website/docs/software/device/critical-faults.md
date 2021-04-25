---
id: critical-error-device
title: Critical error codes
sidebar_label: Critical error codes
---

## CriticalErrorCode
Error codes for critical errors

The device might report these fault codes on the screen. If you encounter a fault code, please post on the forum and we'll try to help.

| Name | Number | Description |
| ---- | ------ | ----------- |
| None | 0 |  |
| TxWatchdog | 1 | A software bug was detected while trying to send lora |
| SleepEnterWait | 2 | A software bug was detected on entry to sleep |
| NoRadio | 3 | No Lora radio hardware could be found |
| Unspecified | 4 | Not normally used |
| UBloxInitFailed | 5 | We failed while configuring a UBlox GPS |
| NoAXP192 | 6 | This board was expected to have a power management chip and it is missing or broken |
| InvalidRadioSetting | 7 | The channel tried to set a radio setting which is not supported by this chipset, radio comms settings are now undefined. |
| TransmitFailed | 8 | Radio transmit hardware failure. We sent data to the radio chip, but it didn&#39;t reply with an interrupt. |
| Brownout | 9 | We detected that the main CPU voltage dropped below the minumum acceptable value |
