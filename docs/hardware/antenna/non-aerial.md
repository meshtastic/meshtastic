---
id: non-aerial
title: Non-aerial factors affecting transmission
sidebar_label: Non-aerial factors
slug: /hardware/non-aerial
---

Unless you're using your devices in a vacuum with clear line of sight between aerials the following will have an affect:
- Weather (temperature, humidity & air pressure),
- Transmission power, spreading and other associated channel factors,
- Number of nodes within reach in the mesh (affects retries consequent duty cycle hit),
- Absorption by materials (with varying degrees attenuation, by material and depth),
- Reflection off surfaces (and channeled through material tunnels, including warm / cold air tunnels commonly present in the atmosphere),
- Diffraction around obstacles (over forests and around corners).

### Environmental factors

For a bit of light reading on environmental research:
- [RF attenuation in vegetation](https://www.itu.int/dms_pubrec/itu-r/rec/p/R-REC-P.833-9-201609-I!!PDF-E.pdf) (yes really); if you wander through the woods wondering how your RF is bouncing off leaves dependent on their variety, and wind speed … well you do, now.
- [RF attenuation with various building materials](https://www.ofcom.org.uk/__data/assets/pdf_file/0016/84022/building_materials_and_propagation.pdf).
- This one by ITU again is very detailed in its [analysis of the drivers of attenuation](https://www.itu.int/dms_pubrec/itu-r/rec/p/R-REC-P.2040-1-201507-I!!PDF-E.pdf) (I wasn’t aware that all EMF radiation exhibits reflection / transmission characteristics akin to light hitting a material boundary. So, depending on the angle of incidence, material and the EMF wavelength, it will be reflected and / or transmitted through).
- These RF bands are also made more [noisy by adjacent LTE](https://www.ofcom.org.uk/__data/assets/pdf_file/0023/55922/lte-coexistence.pdf)

In summary - wavelengths in Europe fair well in plain sight, curve over not-so-tall obstacles (including trees), reflect of surfaces at low angles of incidence. They go through humans without much attenuation; but not brick or stone or anything much above glass / Kevlar. Oh, and don’t sit under an LTE tower and expect it to be plain sailing.
