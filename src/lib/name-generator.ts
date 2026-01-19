import emojisData from "@/data/emojis.json";

// Short name distribution: 20% emoji, 30% hex, 50% derived from long name
const EMOJI_CHANCE = 0.2;
const HEX_CHANCE = 0.3;

const adjectives = [
	"Swift",
	"Silent",
	"Hidden",
	"Remote",
	"Cosmic",
	"Solar",
	"Lunar",
	"Stellar",
	"Arctic",
	"Desert",
	"Forest",
	"Mountain",
	"Valley",
	"Coastal",
	"Urban",
	"Rural",
	"Golden",
	"Silver",
	"Crystal",
	"Phantom",
	"Shadow",
	"Echo",
	"Alpha",
	"Beta",
	"Delta",
	"Omega",
	"Prime",
	"Quantum",
	"Nano",
	"Micro",
	"Mega",
	"Ultra",
	"Outgoing",
	"Incoming",
	"Roaming",
	"Static",
	"Dynamic",
	"Mobile",
	"Fixed",
	"Relay",
] as const;

const nouns = [
	"Node",
	"Mesh",
	"Link",
	"Hub",
	"Base",
	"Tower",
	"Beacon",
	"Station",
	"Owl",
	"Fox",
	"Wolf",
	"Bear",
	"Hawk",
	"Eagle",
	"Raven",
	"Falcon",
	"Peak",
	"Ridge",
	"Creek",
	"River",
	"Lake",
	"Bay",
	"Port",
	"Gate",
	"Wave",
	"Signal",
	"Pulse",
	"Spark",
	"Bolt",
	"Ray",
	"Beam",
	"Stream",
	"Core",
	"Edge",
	"Zone",
	"Grid",
	"Net",
	"Web",
	"Cloud",
	"Star",
] as const;

const prefixes = [
	"rrMesh",
	"MeshNet",
	"LoRa",
	"RF",
	"Radio",
	"Net",
	"Link",
	"Relay",
	"SovereignNet",
	"FreeNet",
	"OpenMesh",
	"GridNet",
	"WaveNet",
	"SkyNet",
] as const;

const suffixes = [
	"Base",
	"Mobile",
	"Relay",
	"Hub",
	"Node",
	"Bot",
	"Echo",
	"Alpha",
	"Beta",
] as const;

function pick<T>(arr: readonly T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChars(length: number, charset: string): string {
	return Array.from(
		{ length },
		() => charset[Math.floor(Math.random() * charset.length)],
	).join("");
}

const randomHex = (n: number) => randomChars(n, "0123456789abcdef");
const randomAlpha = (n: number, upper = false) =>
	randomChars(
		n,
		upper
			? "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
			: "abcdefghijklmnopqrstuvwxyz0123456789",
	);

export type LongNameStyle =
	| "meshtastic"
	| "prefixed"
	| "creative"
	| "custom"
	| "combo"
	| "random";

export interface GeneratedName {
	shortName: string;
	longName: string;
}

const longNameGenerators: Record<
	Exclude<LongNameStyle, "random">,
	() => string
> = {
	meshtastic: () => `Meshtastic ${randomAlpha(4, true)}`,
	prefixed: () => {
		const num =
			Math.random() > 0.5
				? `-${String(randomInt(1, 99)).padStart(2, "0")}`
				: "";
		return `${pick(prefixes)}: ${pick(suffixes)}${num}`;
	},
	creative: () => {
		const num = Math.random() > 0.6 ? ` ${randomInt(1, 9)}` : "";
		return `${pick(adjectives)} ${pick(nouns)}${num}`;
	},
	custom: () =>
		pick([
			() => `${randomAlpha(3)}node`,
			() => `the${pick(nouns)}${pick(nouns)}`,
			() => `${randomAlpha(2)}${pick(nouns).toLowerCase()}`,
			() => `${pick(nouns)}astic ${pick(nouns)}`,
			() => `${pick(adjectives)} ${pick(nouns)}`,
		])(),
	combo: () => `${randomAlpha(3, true)}-${randomAlpha(1, true)} ${pick(nouns)}`,
};

export function generateLongName(style: LongNameStyle = "random"): string {
	const actualStyle =
		style === "random"
			? pick(
					Object.keys(longNameGenerators) as Exclude<LongNameStyle, "random">[],
				)
			: style;
	return longNameGenerators[actualStyle]();
}

export function toShortName(name: string): string {
	if (name.length <= 4) return name;

	const words = name.split(/[\s\-_:]+/).filter(Boolean);

	if (words.length >= 4) {
		return words
			.slice(0, 4)
			.map((w) => w[0])
			.join("")
			.toUpperCase();
	}
	if (words.length >= 2) {
		return words
			.map((w) => w.slice(0, Math.floor(4 / words.length)))
			.join("")
			.slice(0, 4);
	}
	return name.slice(0, 4);
}

function generateShortName(longName: string): string {
	const roll = Math.random();

	if (roll < EMOJI_CHANCE) {
		return pick(emojisData.avatars);
	}
	if (roll < EMOJI_CHANCE + HEX_CHANCE) {
		return randomHex(4);
	}
	return toShortName(longName);
}

export function generateNodeName(
	longStyle: LongNameStyle = "random",
): GeneratedName {
	const longName = generateLongName(longStyle);
	return { shortName: generateShortName(longName), longName };
}

export function generateNodeNames(
	count: number,
	longStyle: LongNameStyle = "random",
): GeneratedName[] {
	return Array.from({ length: count }, () => generateNodeName(longStyle));
}

export const isValidShortName = (name: string) =>
	name.length > 0 && name.length <= 4;
export const isValidLongName = (name: string) =>
	name.length > 0 && name.length <= 40;

export { EMOJI_CHANCE, HEX_CHANCE };
