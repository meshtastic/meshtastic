---
id: antenna-testing
title: Antenna testing
sidebar_label: Testing
---

Testing of antennas can be both simple and complex. At its simplest, testing involves sending messages from different locations and seeing which ones are received and then comparing the results against other antennas. This ranges up to using expensive test chambers and equipment to measure the signal strength, gain and radiation patterns. However, it seems that a reasonable job can be done with cheaper methods.

## Range testing

As mentioned, while stating the obvious, the simplest way of performing test is:
- Walk around with a radio sending messages,
- For each message, note location and whether 'ACK' ticks are received,
- Also note reported signal strengths,
- Change aerials, repeat & contrast.

:::note
The [range test plugin](/docs/software/plugins/range-test-plugin) has been designed for exactly this purpose. It allows one node to transmit a frequent message, and another node to record which messages were received. This data is saved and can be imported to applications such as Google Earth.
:::

On the topic of testing - performing your own testing and providing feedback is the lifeblood of Meshtastic and open source projects. 

## Signal strength testing

Real world testing is also discussed by Andreas Spiess (the 'guy with the Swiss accent') in his [tutorial](https://www.youtube.com/watch?v=J3PBL9oLPX8). He has written [code](https://github.com/SensorsIot/Antenna-Tester) for testing antennas using two Lora32 V1 boards to compare how different antennas behave. Lilygo have also made code available for testing the RSSI on the [LORA32](https://github.com/LilyGO/TTGO-LORA32) [boards](https://github.com/Xinyuan-LilyGO/TTGO-LoRa-Series) and the [T-Beam](https://github.com/LilyGO/TTGO-T-Beam).

Here are a [couple](https://medium.com/home-wireless/testing-lora-antennas-at-915mhz-6d6b41ac8f1d) of [excellent](https://medium.com/home-wireless/testing-and-reviewing-lora-antennas-5b37dfa594a3) aerial comparisons.  Their utility goes beyond the specific aerials tested, giving insight into:
- Aerial types & their characteristics,
- Testing approaches.

## Antenna matching & vector network analyzers

One of the first things to ensure is that the antenna you have is tuned to the frequency that you are using. A lot of cheap antennas come labeled with an incorrect working frequency, and this will immediately reduce the emitted signal strength. A Vector Network Analyzer (VNA) can be used to ensure that the antenna is appropriately matched to the transmission circuit, ensuring that it is operating at the correct impedance and has a low level of power reflected back from the antenna to the transmitter at the desired transmission frequency. 

Andreas Spiess also gives a great explanation of [how to use Vector Network Analyzers](https://www.youtube.com/watch?v=ZpKoLvqOWyc) to correctly tune your antennas, as well as a more [in depth tutorial of how to use VNAs](https://www.youtube.com/watch?v=_pjcEKQY_Tk). It is important to remember however, that VNAs can only tell you if the antenna is well-matched, not how well it is transmitting. A 50 ohm resistor across the transmitter output would show as ideally matched, but it would be useless at transmitting a signal. There are a number of VNAs now available for less than $100, making this no longer out of reach for most hobbyists unlike expensive spectrum analyzers.
