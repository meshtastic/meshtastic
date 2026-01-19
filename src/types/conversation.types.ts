/**
 * Static user configuration from JSON.
 * Each user has either rssi OR hops (mutually exclusive).
 */
export interface UserConfig {
	id: string;
	rssi?: number;
	hops?: number;
}

/**
 * Hydrated user with generated names.
 * Created at runtime by combining UserConfig with generateNodeName().
 */
export interface User {
	id: string;
	shortName: string;
	longName: string;
	rssi?: number;
	hops?: number;
}

/**
 * A single message in a conversation thread.
 */
export interface ConversationMessage {
	text: string;
	userId: string;
}

/**
 * A conversation thread containing multiple messages.
 */
export interface ConversationThread {
	messages: ConversationMessage[];
}

/**
 * Complete conversation data structure from JSON.
 */
export interface ConversationData {
	conversationThreads: ConversationThread[];
	standaloneMessages: string[];
	autoResponses: string[];
}

/**
 * A fully built message ready for display.
 * Created by buildTimeline() with all display data resolved.
 */
export interface BuiltMessage {
	id: number;
	text: string;
	shortName: string;
	longName: string;
	time: string;
	rssi: number;
	hops?: number;
	isOutgoing?: boolean;
	reactions?: string[];
}
