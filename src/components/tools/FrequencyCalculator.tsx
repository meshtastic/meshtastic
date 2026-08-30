import * as Protobuf from "@meshtastic/protobufs";
import { useState } from "react";

const Region = Protobuf.Config.Config_LoRaConfig_RegionCode;
const Preset = Protobuf.Config.Config_LoRaConfig_ModemPreset;

type RegionCode = Protobuf.Config.Config_LoRaConfig_RegionCode;
type ModemPreset = Protobuf.Config.Config_LoRaConfig_ModemPreset;

// Bundles the preset list with the regulatory parameters shared across regions.
interface RegionProfile {
  presets: ModemPreset[];
  spacing: number; // gap between slots (MHz), also applied at the start of the band
  padding: number; // gap at each side of a slot (MHz)
  licensedOnly: boolean;
}

interface RegionInfo {
  freqStart: number;
  freqEnd: number;
  dutyCycle: number;
  powerLimit: number;
  wideLora: boolean;
  profile: RegionProfile;
  defaultPreset: ModemPreset;
  // 0 = hash the channel name, -1 = hash the preset name, > 0 = explicit 1-based slot
  overrideSlot: number;
}

interface Modem {
  bw: number;
  wideBw: number; // bandwidth used on wide LoRa (2.4 GHz) regions
  cr: number;
  sf: number;
}

const PROFILE_STD: RegionProfile = {
  presets: [
    Preset.LONG_FAST,
    Preset.LONG_SLOW,
    Preset.MEDIUM_SLOW,
    Preset.MEDIUM_FAST,
    Preset.SHORT_SLOW,
    Preset.SHORT_FAST,
    Preset.LONG_MODERATE,
    Preset.SHORT_TURBO,
    Preset.LONG_TURBO,
    Preset.MEDIUM_TURBO,
  ],
  spacing: 0,
  padding: 0,
  licensedOnly: false,
};

const PROFILE_EU868: RegionProfile = {
  presets: [
    Preset.LONG_FAST,
    Preset.LONG_SLOW,
    Preset.MEDIUM_SLOW,
    Preset.MEDIUM_FAST,
    Preset.SHORT_SLOW,
    Preset.SHORT_FAST,
    Preset.LONG_MODERATE,
  ],
  spacing: 0,
  padding: 0,
  licensedOnly: false,
};

const PROFILE_UNDEF: RegionProfile = {
  presets: [Preset.LONG_FAST],
  spacing: 0,
  padding: 0,
  licensedOnly: false,
};

const PROFILE_LITE: RegionProfile = {
  presets: [Preset.LITE_FAST, Preset.LITE_SLOW],
  spacing: 0.4,
  padding: 0.0375,
  licensedOnly: false,
};

const PROFILE_NARROW: RegionProfile = {
  presets: [Preset.NARROW_FAST, Preset.NARROW_SLOW],
  spacing: 0,
  padding: 0.0104,
  licensedOnly: false,
};

// Ham "20kHz" profile. 15.6 kHz bandwidth coerced to 20 kHz via padding.
const PROFILE_HAM_20KHZ: RegionProfile = {
  presets: [Preset.TINY_FAST, Preset.TINY_SLOW],
  spacing: 0,
  padding: 0.0022,
  licensedOnly: true,
};

// Ham "100kHz" profile. 62.5 kHz bandwidth coerced to 100 kHz via padding.
const PROFILE_HAM_100KHZ: RegionProfile = {
  presets: [Preset.NARROW_FAST, Preset.NARROW_SLOW],
  spacing: 0,
  padding: 0.01875,
  licensedOnly: true,
};

// The EU_868/EU_866/EU_N_868 trio share the 868 band but own mutually exclusive preset
// profiles. Selecting a preset locked to a sibling swaps the region to that sibling, so
// from any region in the trio every one of these presets is selectable. This union is the
// list the firmware advertises to clients for the trio; it is display-only, the firmware
// still enforces each region's own disjoint preset list.
const PRESETS_EU_SUPERSET: ModemPreset[] = [
  Preset.LONG_FAST,
  Preset.LONG_SLOW,
  Preset.MEDIUM_SLOW,
  Preset.MEDIUM_FAST,
  Preset.SHORT_SLOW,
  Preset.SHORT_FAST,
  Preset.LONG_MODERATE,
  Preset.LITE_FAST,
  Preset.LITE_SLOW,
  Preset.NARROW_FAST,
  Preset.NARROW_SLOW,
];

const SWAPPABLE_EU_REGIONS: RegionCode[] = [
  Region.EU_868,
  Region.EU_866,
  Region.EU_N_868,
];

const RegionData = new Map<RegionCode, RegionInfo>([
  [
    Region.US,
    {
      freqStart: 902.0,
      freqEnd: 928.0,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.EU_433,
    {
      freqStart: 433.0,
      freqEnd: 434.0,
      dutyCycle: 10,
      powerLimit: 10,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.EU_868,
    {
      freqStart: 869.4,
      freqEnd: 869.65,
      dutyCycle: 10,
      powerLimit: 27,
      wideLora: false,
      profile: PROFILE_EU868,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.EU_866,
    {
      freqStart: 865.6,
      freqEnd: 867.6,
      dutyCycle: 2.5,
      powerLimit: 27,
      wideLora: false,
      profile: PROFILE_LITE,
      defaultPreset: Preset.LITE_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.EU_N_868,
    {
      freqStart: 869.4,
      freqEnd: 869.65,
      dutyCycle: 10,
      powerLimit: 27,
      wideLora: false,
      profile: PROFILE_NARROW,
      defaultPreset: Preset.NARROW_SLOW,
      overrideSlot: 1,
    },
  ],
  [
    Region.CN,
    {
      freqStart: 470.0,
      freqEnd: 510.0,
      dutyCycle: 100,
      powerLimit: 19,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.JP,
    {
      freqStart: 920.5,
      freqEnd: 923.5,
      dutyCycle: 100,
      powerLimit: 13,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.ANZ,
    {
      freqStart: 915.0,
      freqEnd: 928.0,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.ANZ_433,
    {
      freqStart: 433.05,
      freqEnd: 434.79,
      dutyCycle: 100,
      powerLimit: 14,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.RU,
    {
      freqStart: 868.7,
      freqEnd: 869.2,
      dutyCycle: 100,
      powerLimit: 20,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.KR,
    {
      freqStart: 920.0,
      freqEnd: 923.0,
      dutyCycle: 100,
      powerLimit: 23,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.TW,
    {
      freqStart: 920.0,
      freqEnd: 925.0,
      dutyCycle: 100,
      powerLimit: 27,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.IN,
    {
      freqStart: 865.0,
      freqEnd: 867.0,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.NZ_865,
    {
      freqStart: 864.0,
      freqEnd: 868.0,
      dutyCycle: 100,
      powerLimit: 36,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.TH,
    {
      freqStart: 920.0,
      freqEnd: 925.0,
      dutyCycle: 10,
      powerLimit: 27,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.UA_433,
    {
      freqStart: 433.0,
      freqEnd: 434.7,
      dutyCycle: 10,
      powerLimit: 10,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.MY_433,
    {
      freqStart: 433.0,
      freqEnd: 435.0,
      dutyCycle: 100,
      powerLimit: 20,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.MY_919,
    {
      freqStart: 919.0,
      freqEnd: 924.0,
      dutyCycle: 100,
      powerLimit: 27,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.SG_923,
    {
      freqStart: 917.0,
      freqEnd: 925.0,
      dutyCycle: 100,
      powerLimit: 20,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.PH_433,
    {
      freqStart: 433.0,
      freqEnd: 434.7,
      dutyCycle: 100,
      powerLimit: 10,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.PH_868,
    {
      freqStart: 868.0,
      freqEnd: 869.4,
      dutyCycle: 100,
      powerLimit: 14,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.PH_915,
    {
      freqStart: 915.0,
      freqEnd: 918.0,
      dutyCycle: 100,
      powerLimit: 24,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.KZ_433,
    {
      freqStart: 433.075,
      freqEnd: 434.775,
      dutyCycle: 100,
      powerLimit: 10,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.KZ_863,
    {
      freqStart: 863.0,
      freqEnd: 868.0,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.NP_865,
    {
      freqStart: 865.0,
      freqEnd: 868.0,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.BR_902,
    {
      freqStart: 902.0,
      freqEnd: 907.5,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.ITU1_2M,
    {
      freqStart: 144.0,
      freqEnd: 146.0,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_HAM_20KHZ,
      defaultPreset: Preset.TINY_FAST,
      overrideSlot: 26,
    },
  ],
  [
    Region.ITU2_2M,
    {
      freqStart: 144.0,
      freqEnd: 148.0,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_HAM_20KHZ,
      defaultPreset: Preset.TINY_FAST,
      overrideSlot: 51,
    },
  ],
  [
    Region.ITU3_2M,
    {
      freqStart: 144.0,
      freqEnd: 148.0,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_HAM_20KHZ,
      defaultPreset: Preset.TINY_FAST,
      overrideSlot: 33,
    },
  ],
  [
    Region.ITU2_125CM,
    {
      freqStart: 220.0,
      freqEnd: 225.0,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_HAM_100KHZ,
      defaultPreset: Preset.NARROW_SLOW,
      overrideSlot: 37,
    },
  ],
  [
    Region.ITU1_70CM,
    {
      freqStart: 430.0,
      freqEnd: 440.0,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_HAM_100KHZ,
      defaultPreset: Preset.NARROW_SLOW,
      overrideSlot: 37,
    },
  ],
  [
    Region.ITU2_70CM,
    {
      freqStart: 420.0,
      freqEnd: 450.0,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_HAM_100KHZ,
      defaultPreset: Preset.NARROW_SLOW,
      overrideSlot: 137,
    },
  ],
  [
    Region.ITU3_70CM,
    {
      freqStart: 430.0,
      freqEnd: 450.0,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_HAM_100KHZ,
      defaultPreset: Preset.NARROW_SLOW,
      overrideSlot: 37,
    },
  ],
  [
    Region.LORA_24,
    {
      freqStart: 2400.0,
      freqEnd: 2483.5,
      dutyCycle: 100,
      powerLimit: 10,
      wideLora: true,
      profile: PROFILE_STD,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
  [
    Region.UNSET,
    {
      freqStart: 902.0,
      freqEnd: 928.0,
      dutyCycle: 100,
      powerLimit: 30,
      wideLora: false,
      profile: PROFILE_UNDEF,
      defaultPreset: Preset.LONG_FAST,
      overrideSlot: 0,
    },
  ],
]);

const modemPresets = new Map<ModemPreset, Modem>([
  [Preset.SHORT_TURBO, { bw: 500, wideBw: 1625, cr: 5, sf: 7 }],
  [Preset.SHORT_FAST, { bw: 250, wideBw: 812.5, cr: 5, sf: 7 }],
  [Preset.SHORT_SLOW, { bw: 250, wideBw: 812.5, cr: 5, sf: 8 }],
  [Preset.MEDIUM_FAST, { bw: 250, wideBw: 812.5, cr: 5, sf: 9 }],
  [Preset.MEDIUM_SLOW, { bw: 250, wideBw: 812.5, cr: 5, sf: 10 }],
  [Preset.MEDIUM_TURBO, { bw: 500, wideBw: 1625, cr: 5, sf: 9 }],
  [Preset.LONG_FAST, { bw: 250, wideBw: 812.5, cr: 5, sf: 11 }],
  [Preset.LONG_TURBO, { bw: 500, wideBw: 1625, cr: 8, sf: 11 }],
  [Preset.LONG_MODERATE, { bw: 125, wideBw: 406.25, cr: 8, sf: 11 }],
  [Preset.LONG_SLOW, { bw: 125, wideBw: 406.25, cr: 8, sf: 12 }],
  [Preset.LITE_FAST, { bw: 125, wideBw: 125, cr: 5, sf: 9 }],
  [Preset.LITE_SLOW, { bw: 125, wideBw: 125, cr: 5, sf: 10 }],
  [Preset.NARROW_FAST, { bw: 62.5, wideBw: 62.5, cr: 6, sf: 7 }],
  [Preset.NARROW_SLOW, { bw: 62.5, wideBw: 62.5, cr: 6, sf: 8 }],
  [Preset.TINY_FAST, { bw: 15.6, wideBw: 15.6, cr: 5, sf: 7 }],
  [Preset.TINY_SLOW, { bw: 15.6, wideBw: 15.6, cr: 6, sf: 8 }],
]);

const UNSET_REGION = RegionData.get(Region.UNSET) as RegionInfo;
const DEFAULT_MODEM = modemPresets.get(Preset.LONG_FAST) as Modem;

// Helper function to get the display name of a modem preset. An unnamed (default) channel
// takes its name from this, which is what the frequency slot hash is calculated over.
const getModemPresetDisplayName = (preset: ModemPreset): string => {
  switch (preset) {
    case Preset.SHORT_TURBO:
      return "ShortTurbo";
    case Preset.SHORT_SLOW:
      return "ShortSlow";
    case Preset.SHORT_FAST:
      return "ShortFast";
    case Preset.MEDIUM_SLOW:
      return "MediumSlow";
    case Preset.MEDIUM_FAST:
      return "MediumFast";
    case Preset.MEDIUM_TURBO:
      return "MediumTurbo";
    case Preset.LONG_SLOW:
      return "LongSlow";
    case Preset.LONG_FAST:
      return "LongFast";
    case Preset.LONG_TURBO:
      return "LongTurbo";
    case Preset.LONG_MODERATE:
      return "LongMod";
    case Preset.LITE_FAST:
      return "LiteFast";
    case Preset.LITE_SLOW:
      return "LiteSlow";
    case Preset.NARROW_FAST:
      return "NarrowFast";
    case Preset.NARROW_SLOW:
      return "NarrowSlow";
    case Preset.TINY_FAST:
      return "TinyFast";
    case Preset.TINY_SLOW:
      return "TinySlow";
    default:
      return "Invalid";
  }
};

// Helper function to calculate hash
const calculateHash = (str: string): number => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i); // hash * 33 + c
  }
  return hash >>> 0; // Ensure unsigned 32-bit integer
};

// Bandwidth in kHz, in the variant the region's radios use
const getBandwidth = (preset: ModemPreset, wideLora: boolean): number => {
  const modem = modemPresets.get(preset) ?? DEFAULT_MODEM;
  return wideLora ? modem.wideBw : modem.bw;
};

// Width of a slot in MHz: the bandwidth plus any spacing or padding the region requires.
// spacing = gap between slots (0 for continuous spectrum) and at the beginning of the band
// padding = gap at the beginning and end of the slot (0 for no padding)
const getSlotWidth = (region: RegionInfo, bandwidth: number): number =>
  region.profile.spacing + region.profile.padding * 2 + bandwidth / 1000;

const getNumFreqSlots = (region: RegionInfo, bandwidth: number): number =>
  Math.round(
    (region.freqEnd - region.freqStart + region.profile.spacing) /
      getSlotWidth(region, bandwidth),
  );

// freqStart is the band edge, so add half the bandwidth (plus any padding) to reach the
// middle of the first slot. Subsequent slots are spaced by the slot width.
const getSlotFrequency = (
  region: RegionInfo,
  bandwidth: number,
  slot: number,
): number =>
  region.freqStart +
  bandwidth / 2000 +
  region.profile.padding +
  slot * getSlotWidth(region, bandwidth);

// Helper function to determine the default (zero based) frequency slot
const determineFrequencySlot = (
  region: RegionInfo,
  preset: ModemPreset,
  numFreqSlots: number,
): number => {
  if (numFreqSlots === 0) {
    return 0;
  }
  // A region may pin its default to an explicit (1 based) slot
  if (region.overrideSlot > 0) {
    return region.overrideSlot - 1;
  }
  // Otherwise the slot is the hash of the primary channel name, which for an unnamed
  // channel is the preset display name. Regions that set overrideSlot to -1 hash the
  // preset name outright, which comes to the same thing here.
  return calculateHash(getModemPresetDisplayName(preset)) % numFreqSlots;
};

// Trim binary floating point noise (e.g. 144.51000000000002) without losing real precision
const roundFrequency = (frequency: number): number =>
  Math.round(frequency * 1e6) / 1e6;

const isSwappableEuRegion = (region: RegionCode): boolean =>
  SWAPPABLE_EU_REGIONS.includes(region);

// The presets offered for a region. The EU trio is offered the union of the three preset
// lists, since picking a sibling's preset swaps the region rather than being rejected.
const getSelectablePresets = (region: RegionCode): ModemPreset[] =>
  isSwappableEuRegion(region)
    ? PRESETS_EU_SUPERSET
    : (RegionData.get(region) ?? UNSET_REGION).profile.presets;

// If region is one of the swappable EU regions and preset belongs to a sibling in that
// trio, return the sibling region that owns the preset. Returns undefined otherwise.
const regionSwapForPreset = (
  region: RegionCode,
  preset: ModemPreset,
): RegionCode | undefined => {
  if (!isSwappableEuRegion(region)) {
    return undefined;
  }
  return SWAPPABLE_EU_REGIONS.find(
    (sibling) =>
      sibling !== region &&
      (RegionData.get(sibling) ?? UNSET_REGION).profile.presets.includes(
        preset,
      ),
  );
};

export const FrequencyCalculator = (): JSX.Element => {
  const [modemPreset, setModemPreset] = useState<ModemPreset>(Preset.LONG_FAST);
  const [region, setRegion] = useState<RegionCode>(Region.US);
  // A slot the user picked by hand, or null to follow the region default
  const [pickedSlot, setPickedSlot] = useState<number | null>(null);
  const [swapNotice, setSwapNotice] = useState<string | null>(null);

  const selectedRegion = RegionData.get(region) ?? UNSET_REGION;
  const bandwidth = getBandwidth(modemPreset, selectedRegion.wideLora);
  const numChannels = getNumFreqSlots(selectedRegion, bandwidth);
  const defaultSlot = determineFrequencySlot(
    selectedRegion,
    modemPreset,
    numChannels,
  );
  const channel = pickedSlot ?? defaultSlot;
  const channelFrequency = roundFrequency(
    getSlotFrequency(selectedRegion, bandwidth, channel),
  );

  // Picking a preset that belongs to a sibling of the EU trio selects that sibling region
  const onModemPresetChange = (preset: ModemPreset) => {
    setModemPreset(preset);
    setPickedSlot(null);

    const swapRegion = regionSwapForPreset(region, preset);
    if (swapRegion === undefined) {
      setSwapNotice(null);
      return;
    }
    setRegion(swapRegion);
    setSwapNotice(
      `${getModemPresetDisplayName(preset)} belongs to ${Region[swapRegion]}, so the region was switched to match.`,
    );
  };

  // The region a user picks wins, so a preset it doesn't offer falls back to its default
  const onRegionChange = (nextRegion: RegionCode) => {
    setRegion(nextRegion);
    setPickedSlot(null);
    setSwapNotice(null);

    const nextRegionData = RegionData.get(nextRegion) ?? UNSET_REGION;
    if (!nextRegionData.profile.presets.includes(modemPreset)) {
      setModemPreset(nextRegionData.defaultPreset);
    }
  };

  return (
    <div className="flex flex-col border-l-[5px] shadow-md my-4 border-accent rounded-lg p-4 bg-secondary gap-2">
      <div className="flex gap-2">
        <label htmlFor="modemPreset">Modem Preset:</label>
        <select
          id="modemPreset"
          value={modemPreset}
          onChange={(e) =>
            onModemPresetChange(Number.parseInt(e.target.value) as ModemPreset)
          }
        >
          {getSelectablePresets(region).map((key) => (
            <option key={key} value={key}>
              {Preset[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <label htmlFor="region">Region:</label>
        <select
          id="region"
          value={region}
          onChange={(e) =>
            onRegionChange(Number.parseInt(e.target.value) as RegionCode)
          }
        >
          {Array.from(RegionData.keys()).map((key) => (
            <option key={key} value={key}>
              {Region[key]}
            </option>
          ))}
        </select>
      </div>
      {swapNotice ? (
        <p className="text-sm text-muted-foreground mb-0">{swapNotice}</p>
      ) : null}
      {selectedRegion.profile.licensedOnly ? (
        <p className="text-sm text-muted-foreground mb-0">
          Amateur radio band: an amateur radio license is required to transmit
          here.
        </p>
      ) : null}
      <div className="flex gap-2">
        <label htmlFor="defaultSlot" className="font-semibold">
          Default Frequency Slot:
        </label>
        <input
          id="defaultSlot"
          type="number"
          disabled={true}
          value={defaultSlot + 1} // Display as 1-based index
        />
      </div>
      <div className="flex gap-2 mb-4">
        <label htmlFor="numSlots" className="font-semibold">
          Number of slots:
        </label>
        <input
          id="numSlots"
          type="number"
          disabled={true}
          value={numChannels}
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="frequencySlot">Frequency Slot:</label>
        <select
          id="frequencySlot"
          value={channel}
          onChange={(e) => setPickedSlot(Number.parseInt(e.target.value))}
        >
          {Array.from(Array(numChannels).keys()).map((key) => (
            <option key={key} value={key}>
              {key + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <label htmlFor="slotFrequency" className="font-semibold">
          Frequency of slot:
        </label>
        <input
          id="slotFrequency"
          type="number"
          disabled={true}
          value={channelFrequency}
        />
      </div>
    </div>
  );
};
