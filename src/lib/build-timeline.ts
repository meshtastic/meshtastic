import type {
	UserConfig,
	User,
	ConversationData,
	BuiltMessage,
} from "@/types/conversation.types";
import { generateNodeName } from "@/lib/name-generator";

// Timeline configuration
const DEFAULT_MESSAGE_COUNT = 55;
const MESSAGE_INTERVAL_MINUTES = 5;

// How often standalone messages ("Beacon", "All clear", etc.) get sprinkled in
const STANDALONE_MESSAGE_CHANCE = 0.3;

// When pulling from a conversation thread, grab 1-2 messages at a time
// so it feels like a real back-and-forth, not a wall of text
const MIN_MESSAGES_PER_CHUNK = 1;
const MAX_MESSAGES_PER_CHUNK = 2;

function pickRandom<T>(arr: readonly T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

function formatTime(date: Date): string {
	return `${date.getHours().toString().padStart(2, "0")}:${date
		.getMinutes()
		.toString()
		.padStart(2, "0")}`;
}

/**
 * Hydrate user configs with generated names.
 * Creates User objects with shortName and longName from generateNodeName().
 */
export function hydrateUsers(configs: readonly UserConfig[]): User[] {
	return configs.map((config) => {
		const { shortName, longName } = generateNodeName();
		return { ...config, shortName, longName };
	});
}

/**
 * Build an interleaved timeline of messages from conversation threads.
 * Returns a flat array of BuiltMessage ready for sequential playback.
 */
export function buildTimeline(
	users: readonly User[],
	data: ConversationData,
	messageCount = DEFAULT_MESSAGE_COUNT,
): BuiltMessage[] {
	const userMap = new Map(users.map((u) => [u.id, u]));
	const messages: BuiltMessage[] = [];

	// Track position in each thread
	const threadPositions = data.conversationThreads.map(() => 0);

	let id = 1;
	const now = new Date();

	while (messages.length < messageCount) {
		// Find threads that have remaining messages
		const availableThreads = threadPositions
			.map((pos, idx) => ({
				idx,
				pos,
				thread: data.conversationThreads[idx],
			}))
			.filter((t) => t.pos < t.thread.messages.length);

		if (availableThreads.length === 0) {
			// All threads exhausted, add standalone messages
			const user = pickRandom(users);
			const text = pickRandom(data.standaloneMessages);
			messages.push(
				createMessage(id++, user, text, now, messages.length, messageCount),
			);
			continue;
		}

		// Take 1-2 messages from a random available thread
		const { idx, thread } = pickRandom(availableThreads);
		const remainingInThread = thread.messages.length - threadPositions[idx];
		const chunkSize =
			MIN_MESSAGES_PER_CHUNK +
			Math.floor(Math.random() * MAX_MESSAGES_PER_CHUNK);
		const takeCount = Math.min(chunkSize, remainingInThread);

		for (let i = 0; i < takeCount && messages.length < messageCount; i++) {
			const msg = thread.messages[threadPositions[idx]];
			const user = userMap.get(msg.userId);
			if (user) {
				messages.push(
					createMessage(
						id++,
						user,
						msg.text,
						now,
						messages.length,
						messageCount,
					),
				);
			}
			threadPositions[idx]++;
		}

		// Chance to insert a standalone message between thread chunks
		if (
			Math.random() < STANDALONE_MESSAGE_CHANCE &&
			messages.length < messageCount
		) {
			const user = pickRandom(users);
			const text = pickRandom(data.standaloneMessages);
			messages.push(
				createMessage(id++, user, text, now, messages.length, messageCount),
			);
		}
	}

	return messages;
}

function createMessage(
	id: number,
	user: User,
	text: string,
	now: Date,
	index: number,
	totalMessages: number,
): BuiltMessage {
	// Time decreases as we go back in history
	const msOffset =
		(totalMessages - index) * MESSAGE_INTERVAL_MINUTES * 60 * 1000;
	const time = formatTime(new Date(now.getTime() - msOffset));

	return {
		id,
		text,
		shortName: user.shortName,
		longName: user.longName,
		time,
		rssi: user.rssi ?? 0,
		hops: user.hops,
	};
}

// Export constants for testing
export {
	DEFAULT_MESSAGE_COUNT,
	MESSAGE_INTERVAL_MINUTES,
	STANDALONE_MESSAGE_CHANCE,
	MIN_MESSAGES_PER_CHUNK,
	MAX_MESSAGES_PER_CHUNK,
};
