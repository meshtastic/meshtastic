import { IRegion } from "../region";

export const EU_433: IRegion = {
  name: "EU_433",
  freqStart: 433.0,
  freqEnd: 434.0,
  dutyCycle: 10,
  spacing: 0,
  powerLimit: 12,
  audioPermitted: true,
  frequencySwitching: false,
  wideLora: false
};
