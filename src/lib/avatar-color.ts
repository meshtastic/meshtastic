export function isEmoji(str: string): boolean {
	const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)$/u;
	return emojiRegex.test(str);
}

export function getAvatarColor(name: string): string {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}

	const hue = Math.abs(hash) % 360;
	return `hsl(${hue}, 55%, 45%)`;
}

export function getAvatarTextColor(backgroundColor: string): string {
	// Use color-mix to create a darker shade of the background for text
	// This ensures good contrast while keeping a cohesive look
	return `color-mix(in srgb, ${backgroundColor} 25%, black)`;
}
