---
id: build-env
title: Creating a build environment
sidebar_label: Building Meshtastic
---

You may encounter a situation where your device crashes and are left with a stacktrace, below are two methods of decoding them.

## Manual

First save the backtrace string to a text file:

:::info
This method uses the symbols of the `firmware.elf` file generated from your latest build, you may wish to rebuild to get up-to-date symbols.
:::

```title="backtrace.txt"
[...]
Backtrace: 0x....
```

Now run the exception decoder:

```bash
bin/exception_decoder.py backtrace.txt
```

## Real Time

In order to decode stack traces in real time, kep the following command (replacing `DEVICE_PORT` with your device's port) running in your terminal with the suspect device connected

```bash
pio device monitor --port DEVICE_PORT -f esp32_exception_decoder
```
