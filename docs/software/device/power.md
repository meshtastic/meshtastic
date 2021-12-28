---
id: device-power
title: Power Management State Machine
sidebar_label: Power Management
---

Long battery life is one of the main goals of this project. Based on initial measurements, the current code should run for about three days between charging (assuming using a t-beam with a 3500mAh 18650 battery). This will hopefully be increased to around eight days in the future.

## States

From lower to higher power consumption.

- Super-deep-sleep (SDS) - everything is off, CPU, radio, Bluetooth, GPS. Only wakes due to timer or button press. We enter this mode only after no radio comms for a few hours, used to put the device into what is effectively "off" mode.
  * onEntry: setBluetoothOn(false), call doDeepSleep
  * onExit: (standard bootup code, starts in DARK)
- deep-sleep (DS) - CPU is off, radio is on, Bluetooth and GPS is off. Note: This mode is never used currently, because it only saves 1.5mA vs light-sleep - (Not currently used).
- light-sleep (LS) - CPU is suspended (RAM stays alive), radio is on, Bluetooth is off, GPS is off. Note: currently GPS is not turned off during light sleep, but there is a TODO item to fix this.
  * NOTE: On NRF52 platforms (because CPU current draw is so low), light-sleep state is never used.  
  * onEntry: setBluetoothOn(false), setGPSPower(false), doLightSleep()
  * onIdle: (if we wake because our led blink timer has expired) blink the led then go back to sleep until we sleep for ls_secs
  * onExit: setGPSPower(true), start trying to get GPS lock: gps.startLock(), once lock arrives service.sendPosition(BROADCAST)
- No Bluetooth (NB) - CPU is running, radio is on, GPS is on but Bluetooth is off, screen is off.
  * onEntry: setBluetoothOn(false)
  * onExit:
- running dark (DARK) - Everything is on except screen.
  * onEntry: setBluetoothOn(true)
  * onExit:
- serial API usage (SERIAL) - Screen is on, device doesn't sleep, Bluetooth off.
  * onEntry: setBluetooth off, screen on
  * onExit:
- full on (ON) - Everything is on, can eventually timeout and lower to a lower power state.
  * onEntry: setBluetoothOn(true), screen.setOn(true)
  * onExit: screen->setOn(false)
- has power (POWER) - Screen is on, device doesn't sleep, Bluetooth on, will stay in this state as long as we have power.
  * onEntry: setBluetooth off, screen on
  * onExit: