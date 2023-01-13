import { IRegion } from '../region';

export const UNSET: IRegion = {
    name: "UNSET",
    freqStart: 902.0,
    freqEnd: 928.0,
    dutyCycle: 100,
    spacing: 0,
    powerLimit: 30,
    audioPermitted: true,
    frequencySwitching: false,
    wideLora: false,
}