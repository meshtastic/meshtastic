import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function pickRandom<T>(arr: readonly T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle<T>(array: readonly T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

export function clampTail<T>(arr: T[], max: number): T[] {
	return arr.length <= max ? arr : arr.slice(-max);
}

export function formatTime(date: Date): string {
	const pad = (n: number) => n.toString().padStart(2, "0");
	return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Check if two message texts are similar (one contains the other) */
export function isSimilarText(a: string, b: string): boolean {
	const aLower = a.toLowerCase();
	const bLower = b.toLowerCase();
	return aLower.includes(bLower) || bLower.includes(aLower);
}

/** Filter out items that are similar to any recent text */
export function filterSimilar(
	candidates: string[],
	recentTexts: string[],
): string[] {
	return candidates.filter(
		(candidate) => !recentTexts.some((recent) => isSimilarText(candidate, recent)),
	);
}
