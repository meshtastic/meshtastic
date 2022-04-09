import { IDevice, Stability, UseCase } from '../device';

export const heltec: IDevice = {
  name: 'Heltec',
  misc: {
    Stability: Stability.Unstable,
    SuggestedUse: [UseCase.Portable],
    Gradient: 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400',
  },
  images: {
    Front: '/img/hardware/heltec-v2.png',
    Back: '',
  },
  features: {
    BLE: true,
    WiFi: true,
    Modules: [
      'cannedMessage',
      'externalNotification',
      'rangeTest',
      'rotaryEncoder',
      'storeAndForward',
      'telemetry',
    ],
  },
  specifications: {
    BLEVersion: '4.2',
    BLEAntenna: 'Integrated',
    WiFiVersion: '2.4GHz 802.11 b/g/n WPA/WPA2/WPA2-Enterprise/SPS',
    WiFiAntenna: 'Integrated',
    Chipset: 'ESP32',
    Driver: 'CH9102',
    GNSS: 'NEO-6M',
    FlashSize: 4,
    Frequencies: [433, 868, 915, 923],
    LoRa: 'SX1262',
    PSRAM: 8,
    RAM: undefined,
  },
  variants: [
    {
      name: 'TBeam 0.7',
      misc: {
        Stability: Stability.Unstable,
      },
      specifications: {
        Driver: 'CP210X',
        GNSS: 'NEO-6M',
        Frequencies: [868, 915],
      },
    },
    {
      name: 'TBeam 1.0',
      specifications: {
        Frequencies: [868, 915],
      },
    },
    {
      name: 'TBeam 1.1',
      specifications: {
        Driver: 'CP210X',
        GNSS: 'NEO-6M',
      },
    },
  ],
};
