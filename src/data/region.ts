export interface IRegion {
	name: string;
	freqStart: number;
	freqEnd: number;
	dutyCycle: number;
	spacing: number;
	powerLimit: number;
	audioPermitted: boolean;
	frequencySwitching: boolean;
	wideLora: boolean;
}
