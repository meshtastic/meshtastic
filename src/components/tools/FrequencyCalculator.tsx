import { Protobuf, type Types } from "@meshtastic/js";
import { useEffect, useState } from "react";

interface Region {
  freqStart: number;
  freqEnd: number;
  dutyCycle: number;
  spacing: number;
  powerLimit: number;
}

interface Modem {
  bw: number;
  cr: number;
  sf: number;
}

const RegionData = new Map<
  Protobuf.Config.Config_LoRaConfig_RegionCode,
  Region
>([
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.US,
    {
      freqStart: 902.0,
      freqEnd: 928.0,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 30,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.EU_433,
    {
      freqStart: 433.0,
      freqEnd: 434.0,
      dutyCycle: 10,
      spacing: 0,
      powerLimit: 12,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.EU_868,
    {
      freqStart: 869.4,
      freqEnd: 869.65,
      dutyCycle: 10,
      spacing: 0,
      powerLimit: 27,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.CN,
    {
      freqStart: 470.0,
      freqEnd: 510.0,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 19,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.JP,
    {
      freqStart: 920.8,
      freqEnd: 927.8,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 16,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.ANZ,
    {
      freqStart: 915.0,
      freqEnd: 928.0,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 30,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.ANZ_433,
    {
      freqStart: 433.05,
      freqEnd: 434.79,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 14,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.RU,
    {
      freqStart: 868.7,
      freqEnd: 869.2,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 20,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.KR,
    {
      freqStart: 920.0,
      freqEnd: 923.0,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 0,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.TW,
    {
      freqStart: 920.0,
      freqEnd: 925.0,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 0,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.IN,
    {
      freqStart: 865.0,
      freqEnd: 867.0,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 30,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.NZ_865,
    {
      freqStart: 864.0,
      freqEnd: 868.0,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 36,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.TH,
    {
      freqStart: 920.0,
      freqEnd: 925.0,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 16,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.UA_433,
    {
      freqStart: 433.0,
      freqEnd: 434.7,
      dutyCycle: 10,
      spacing: 0,
      powerLimit: 10,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.UA_868,
    {
      freqStart: 868.0,
      freqEnd: 868.6,
      dutyCycle: 1,
      spacing: 0,
      powerLimit: 14,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.MY_433,
    {
      freqStart: 433.0,
      freqEnd: 435.0,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 20,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.MY_919,
    {
      freqStart: 919.0,
      freqEnd: 924.0,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 27,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.SG_923,
    {
      freqStart: 917.0,
      freqEnd: 925.0,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 20,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.LORA_24,
    {
      freqStart: 2400.0,
      freqEnd: 2483.5,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 10,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_RegionCode.UNSET,
    {
      freqStart: 902.0,
      freqEnd: 928.0,
      dutyCycle: 100,
      spacing: 0,
      powerLimit: 30,
    },
  ],
]);

const modemPresets = new Map<
  Protobuf.Config.Config_LoRaConfig_ModemPreset,
  Modem
>([
  [
    Protobuf.Config.Config_LoRaConfig_ModemPreset.SHORT_TURBO,
    {
      bw: 500,
      cr: 5,
      sf: 7,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_ModemPreset.SHORT_FAST,
    {
      bw: 250,
      cr: 8,
      sf: 7,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_ModemPreset.SHORT_SLOW,
    {
      bw: 250,
      cr: 8,
      sf: 8,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_ModemPreset.MEDIUM_FAST,
    {
      bw: 250,
      cr: 8,
      sf: 9,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_ModemPreset.MEDIUM_SLOW,
    {
      bw: 250,
      cr: 8,
      sf: 10,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_ModemPreset.LONG_FAST,
    {
      bw: 250,
      cr: 8,
      sf: 11,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_ModemPreset.LONG_MODERATE,
    {
      bw: 125,
      cr: 8,
      sf: 11,
    },
  ],
  [
    Protobuf.Config.Config_LoRaConfig_ModemPreset.LONG_SLOW,
    {
      bw: 125,
      cr: 8,
      sf: 12,
    },
  ],
]);

// Helper function to get the formatted channel name based on the modem preset
const getChannelName = (
  preset: Protobuf.Config.Config_LoRaConfig_ModemPreset,
): string => {
  switch (preset) {
    case Protobuf.Config.Config_LoRaConfig_ModemPreset.SHORT_TURBO:
      return "ShortTurbo";
    case Protobuf.Config.Config_LoRaConfig_ModemPreset.SHORT_SLOW:
      return "ShortSlow";
    case Protobuf.Config.Config_LoRaConfig_ModemPreset.SHORT_FAST:
      return "ShortFast";
    case Protobuf.Config.Config_LoRaConfig_ModemPreset.MEDIUM_SLOW:
      return "MediumSlow";
    case Protobuf.Config.Config_LoRaConfig_ModemPreset.MEDIUM_FAST:
      return "MediumFast";
    case Protobuf.Config.Config_LoRaConfig_ModemPreset.LONG_SLOW:
      return "LongSlow";
    case Protobuf.Config.Config_LoRaConfig_ModemPreset.LONG_FAST:
      return "LongFast";
    case Protobuf.Config.Config_LoRaConfig_ModemPreset.LONG_MODERATE:
      return "LongMod";
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

// Helper function to determine the default frequency slot
const determineFrequencySlot = (
  channelName: string,
  numFreqSlots: number,
): number => {
  const hashValue = calculateHash(channelName);
  return hashValue % numFreqSlots;
};

export const FrequencyCalculator = (): JSX.Element => {
  const [modemPreset, setModemPreset] =
    useState<Protobuf.Config.Config_LoRaConfig_ModemPreset>(
      Protobuf.Config.Config_LoRaConfig_ModemPreset.LONG_FAST,
    );
  const [region, setRegion] =
    useState<Protobuf.Config.Config_LoRaConfig_RegionCode>(
      Protobuf.Config.Config_LoRaConfig_RegionCode.US,
    );
  const [channel, setChannel] = useState<Types.ChannelNumber>(0);
  const [numChannels, setNumChannels] = useState<number>(0);
  const [channelFrequency, setChannelFrequency] = useState<number>(0);
  const [defaultSlot, setDefaultSlot] = useState<number>(0);

  // Recalculate values when modemPreset or region changes
  useEffect(() => {
    const selectedRegion = RegionData.get(region);
    const selectedModemPreset = modemPresets.get(modemPreset);

    if (selectedRegion && selectedModemPreset) {
      const calculatedNumChannels = Math.floor(
        (selectedRegion.freqEnd - selectedRegion.freqStart) /
          (selectedRegion.spacing + selectedModemPreset.bw / 1000),
      );

      setNumChannels(calculatedNumChannels);

      // Reset the channel to 0 when modemPreset or region changes
      const defaultChannel = 0;
      setChannel(defaultChannel);

      // Recalculate the frequency for the default channel
      const newChannelFrequency =
        selectedRegion.freqStart +
        selectedModemPreset.bw / 2000 +
        defaultChannel * (selectedModemPreset.bw / 1000);
      setChannelFrequency(newChannelFrequency);

      // Calculate the default slot using the new channel name logic
      const channelName = getChannelName(modemPreset); // Use the full name
      const defaultSlot = determineFrequencySlot(
        channelName,
        calculatedNumChannels,
      );
      setDefaultSlot(defaultSlot);
    }
  }, [modemPreset, region]);

  // Recalculate the frequency of the selected slot when the channel changes
  useEffect(() => {
    const selectedRegion = RegionData.get(region);
    const selectedModemPreset = modemPresets.get(modemPreset);

    if (selectedRegion && selectedModemPreset) {
      const newChannelFrequency =
        selectedRegion.freqStart +
        selectedModemPreset.bw / 2000 +
        channel * (selectedModemPreset.bw / 1000);
      setChannelFrequency(newChannelFrequency);
    }
  }, [channel, modemPreset, region]);

  return (
    <div class="flex flex-col border-l-[5px] shadow-md my-4 border-accent rounded-lg p-4 bg-secondary gap-2">
      <div class="flex gap-2">
        <label for="modemPreset">Modem Preset:</label>
        <select
          id="modemPreset"
          value={modemPreset}
          onChange={(e) =>
            setModemPreset(
              Number.parseInt(
                e.target.value,
              ) as Protobuf.Config.Config_LoRaConfig_ModemPreset,
            )
          }
        >
          {Array.from(modemPresets.keys()).map((key) => (
            <option key={key} value={key}>
              {Protobuf.Config.Config_LoRaConfig_ModemPreset[key]}
            </option>
          ))}
        </select>
      </div>
      <div class="flex gap-2">
        <label for="region">Region:</label>
        <select
          id="region"
          value={region}
          onChange={(e) => setRegion(Number.parseInt(e.target.value))}
        >
          {Array.from(RegionData.keys()).map((key) => (
            <option key={key} value={key}>
              {Protobuf.Config.Config_LoRaConfig_RegionCode[key]}
            </option>
          ))}
        </select>
      </div>
      <div class="flex gap-2">
        <label for="defaultSlot" class="font-semibold">
          Default Frequency Slot:
        </label>
        <input
          id="defaultSlot"
          type="number"
          disabled={true}
          value={defaultSlot + 1} // Display as 1-based index
        />
      </div>
      <div class="flex gap-2 mb-4">
        <label for="numSlots" class="font-semibold">
          Number of slots:
        </label>
        <input
          id="numSlots"
          type="number"
          disabled={true}
          value={numChannels}
        />
      </div>
      <div class="flex gap-2">
        <label for="frequencySlot">Frequency Slot:</label>
        <select
          id="frequencySlot"
          value={channel}
          onChange={(e) => setChannel(Number.parseInt(e.target.value))}
        >
          {Array.from(Array(numChannels).keys()).map((key) => (
            <option key={key} value={key}>
              {key + 1}
            </option>
          ))}
        </select>
      </div>
      <div class="flex gap-2">
        <label for="slotFrequency" class="font-semibold">
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
