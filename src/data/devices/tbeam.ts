import { IDevice, Stability, UseCase } from '../device';

export const tbeam: IDevice = {
  name: 'T-Beam',
  misc: {
    Stability: Stability.Stable,
    SuggestedUse: [UseCase.Portable],
    Gradient: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
    pinoutSplit: 13,
  },
  images: {
    Front: '/img/hardware/tbeam-v1.1.svg',
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
  pinout: [
    {
      label: 'VP',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: 'VN',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: 'RST',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '15',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '35',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '32',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '33',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '25',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '14',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '13',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '2',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: 'GND',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '5V',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: 'TX',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: 'RX',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '23',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '4',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '0',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: 'GND',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '3V3',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: 'GND',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '22',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '21',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: '3.3V',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: 'LoRa2',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
    {
      label: 'LoRa1',
      name: 'IO1',
      offset: {
        x: 5,
        y: 5,
      },
    },
  ],
};
