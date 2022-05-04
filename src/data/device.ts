export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export enum UseCase {
  Solar,
  Router,
  Portable,
}

enum PinUsage {
  LoRa,
  GNSS,
}

export interface Pin {
  offset: {
    x: number;
    y: number;
  };
  name: string;
  label: string;
  usage?: PinUsage;
}

export type DeviceName = 'tbeam' | 'techo';

export type BLEVersion = '4.2' | '5.0';

export type AntennaType = 'Integrated';

export type Chipset = 'ESP32' | 'NRF52';

export type Frequency = 433 | 868 | 915 | 923;

export type SerialAdapter = 'CP210X' | 'CH9102';

export type GNSSModule = 'NEO-6M' | 'NEO-8M';

export type LORAModule = 'SX1276' | 'SX1262';

export type Variant = DeepPartial<Omit<IDevice, 'variants'>> & { name: string };

export enum Stability {
  Stable,
  Semi,
  Unstable,
  Broken,
}

export type Module =
  | 'cannedMessage'
  | 'externalNotification'
  | 'rangeTest'
  | 'rotaryEncoder'
  | 'storeAndForward'
  | 'telemetry';

export interface IDevice {
  name: string;
  misc: {
    SuggestedUse: UseCase[];
    Stability: Stability;
    Gradient: string;
    pinoutSplit: number;
  };
  images: {
    Front: string;
    Back: string;
  };
  features: {
    BLE: boolean;
    WiFi: boolean;
    Modules: Module[];
  };
  specifications: {
    BLEVersion?: BLEVersion;
    BLEAntenna?: AntennaType;
    WiFiVersion?: string;
    WiFiAntenna?: AntennaType;
    Chipset: Chipset;
    Driver: SerialAdapter;
    GNSS?: GNSSModule;
    FlashSize: number;
    Frequencies: Frequency[];
    LoRa: LORAModule;
    PSRAM: number;
    RAM?: number;
  };
  pinout: Pin[];
  variants: Variant[];
}
