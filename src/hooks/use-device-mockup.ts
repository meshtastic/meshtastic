import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatTime, pickRandom } from "@/lib/utils.ts";
import type { BuiltMessage, User } from "@/types/conversation.types.ts";
import { useEffectEvent } from "./use-effect-event.ts";
import { useInterval } from "./use-interval.ts";

// Promise that resolves after `ms` milliseconds, abortable via signal
function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timeout);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

// Async generator that yields timeline messages at intervals
async function* timelineGenerator(
  timeline: BuiltMessage[],
  startIndex: number,
  signal: AbortSignal,
) {
  let index = startIndex;
  let isFirst = true;

  while (!signal.aborted) {
    const interval = isFirst
      ? FIRST_MESSAGE_DELAY_MS
      : MIN_MESSAGE_INTERVAL_MS + Math.random() * MESSAGE_INTERVAL_VARIANCE_MS;

    await delay(interval, signal);

    if (index >= timeline.length) {
      index = 0;
    }

    yield {
      ...timeline[index],
      id: Date.now(),
      time: formatTime(new Date()),
    };

    index++;
    isFirst = false;
  }
}

const INITIAL_MESSAGE_COUNT = 5;
const MAX_VISIBLE_MESSAGES = 15;

// First message comes quick so the demo feels alive
const FIRST_MESSAGE_DELAY_MS = 3000;

// After that, space them out 8-10s so users can actually read them
const MIN_MESSAGE_INTERVAL_MS = 8000;
const MESSAGE_INTERVAL_VARIANCE_MS = 2000;

// When user sends a message, wait 6-11s before someone replies
const MIN_AUTO_RESPONSE_DELAY_MS = 6000;
const AUTO_RESPONSE_VARIANCE_MS = 7000;

// Clock in the status bar
const TIME_UPDATE_INTERVAL_MS = 1000;

// Time gap between messages in the initial view (so it looks like history)
const MESSAGE_TIME_SPACING_MINUTES = 5;

// Animation duration for slide-in effect
const MESSAGE_ANIMATION_MS = 350;

export interface UseDeviceMockupReturn {
  currentTime: string;
  messages: BuiltMessage[];
  inputValue: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  messagesContainerRef: React.RefObject<HTMLDivElement | null>;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleKeyPress: (key: string) => void;
  handleReply: (msg: BuiltMessage) => void;
  focusInput: () => void;
  addEmojiToInput: (emoji: string) => void;
  addReactionToMessage: (messageId: number, emoji: string) => void;
  toggleReaction: (messageId: number, emoji: string) => void;
  isNewMessage: (id: number) => boolean;
}

export interface UseDeviceMockupOptions {
  timeline: BuiltMessage[];
  autoResponses: string[];
  users: User[];
}

export function useDeviceMockup({
  timeline,
  autoResponses,
  users,
}: UseDeviceMockupOptions): UseDeviceMockupReturn {
  const [currentTime, setCurrentTime] = useState("--:--");
  const [messages, setMessages] = useState<BuiltMessage[]>([]);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [newMessageIds, setNewMessageIds] = useState<Set<number>>(new Set());

  // Initialize with first X messages from timeline (newest first since we're using flex-col-reverse)
  useEffect(() => {
    if (timeline.length === 0) {
      return;
    }

    const now = new Date();
    const initialMessages = timeline
      .slice(0, INITIAL_MESSAGE_COUNT)
      .map((msg, i) => ({
        ...msg,
        // Update times to be relative to now (older messages shown with earlier times)
        time: formatTime(
          new Date(
            now.getTime() -
              (INITIAL_MESSAGE_COUNT - 1 - i) *
                MESSAGE_TIME_SPACING_MINUTES *
                60 *
                1000,
          ),
        ),
      }))
      .reverse(); // we revese the array to have newest messages last which will appear at the bottom

    setMessages(initialMessages);
    setCurrentTime(formatTime(now));
  }, [timeline]);

  const pushMessage = useCallback((msg: BuiltMessage) => {
    setNewMessageIds((prev) => new Set(prev).add(msg.id));

    setTimeout(() => {
      setNewMessageIds((prev) => {
        const next = new Set(prev);
        next.delete(msg.id);
        return next;
      });
    }, MESSAGE_ANIMATION_MS);

    setMessages((prev) => [msg, ...prev.slice(0, MAX_VISIBLE_MESSAGES - 1)]);
  }, []);

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  const isNewMessage = useCallback(
    (id: number) => newMessageIds.has(id),
    [newMessageIds],
  );

  const toggleReaction = useCallback((messageId: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) {
          return msg;
        }
        const reactions = msg.reactions ?? [];
        const hasReaction = reactions.includes(emoji);
        return {
          ...msg,
          reactions: hasReaction
            ? reactions.filter((r) => r !== emoji)
            : [...reactions, emoji],
        };
      }),
    );
  }, []);

  // Keep the time accurate on the device-mockup
  useInterval(() => {
    setCurrentTime(formatTime(new Date()));
  }, TIME_UPDATE_INTERVAL_MS);

  const onTimelineMessage = useEffectEvent((msg: BuiltMessage) => {
    pushMessage(msg);
  });

  useEffect(() => {
    if (timeline.length === 0) {
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        const generator = timelineGenerator(
          timeline,
          INITIAL_MESSAGE_COUNT,
          controller.signal,
        );
        for await (const msg of generator) {
          onTimelineMessage(msg);
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }
        throw e;
      }
    })();

    return () => controller.abort();
  }, [timeline, onTimelineMessage]);

  // Grab random user from pool
  const onAutoResponse = useEffectEvent(() => {
    if (users.length === 0) {
      return;
    }

    const responder = pickRandom(users);
    const msg: BuiltMessage = {
      id: Date.now(),
      text: pickRandom(autoResponses),
      shortName: responder.shortName,
      longName: responder.longName,
      time: formatTime(new Date()),
      rssi: responder.rssi ?? 0,
      hops: responder.hops,
    };
    pushMessage(msg);
  });

  const scheduleAutoResponse = useCallback(() => {
    const delay =
      MIN_AUTO_RESPONSE_DELAY_MS + Math.random() * AUTO_RESPONSE_VARIANCE_MS;
    setTimeout(() => onAutoResponse(), delay);
  }, [onAutoResponse]);

  const handleSendMessage = useCallback(() => {
    const text = inputValue.trim();
    if (!text) {
      return;
    }

    const outgoing: BuiltMessage = {
      id: Date.now(),
      text,
      shortName: "You",
      longName: "You",
      time: formatTime(new Date()),
      rssi: 0,
      isOutgoing: true,
    };

    pushMessage(outgoing);
    setInputValue("");
    focusInput();
    scheduleAutoResponse();
  }, [inputValue, pushMessage, focusInput, scheduleAutoResponse]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Enter") {
        return;
      }
      e.preventDefault();
      handleSendMessage();
    },
    [handleSendMessage],
  );

  const handleKeyPress = useCallback(
    (key: string) => {
      if (key === "⌫") {
        setInputValue((prev) => prev.slice(0, -1));
        return;
      }
      if (key === "space") {
        setInputValue((prev) => `${prev} `);
        return;
      }
      if (key === "↵") {
        handleSendMessage();
        return;
      }
      setInputValue((prev) => `${prev}${key}`);
    },
    [handleSendMessage],
  );

  const handleReply = useCallback(
    (msg: BuiltMessage) => {
      setInputValue(`@${msg.shortName} `);
      focusInput();
    },
    [focusInput],
  );

  const addEmojiToInput = useCallback(
    (emoji: string) => {
      setInputValue((prev) => `${prev}${emoji}`);
      focusInput();
    },
    [focusInput],
  );

  const addReactionToMessage = useCallback(
    (messageId: number, emoji: string) => {
      toggleReaction(messageId, emoji);
    },
    [toggleReaction],
  );

  return {
    currentTime,
    messages,
    inputValue,
    inputRef,
    messagesContainerRef,
    setInputValue,
    handleSendMessage,
    handleKeyDown,
    handleKeyPress,
    handleReply,
    focusInput,
    addEmojiToInput,
    addReactionToMessage,
    toggleReaction,
    isNewMessage,
  };
}

export {
  INITIAL_MESSAGE_COUNT,
  MAX_VISIBLE_MESSAGES,
  FIRST_MESSAGE_DELAY_MS,
  MIN_MESSAGE_INTERVAL_MS,
  MESSAGE_INTERVAL_VARIANCE_MS,
  MIN_AUTO_RESPONSE_DELAY_MS,
  AUTO_RESPONSE_VARIANCE_MS,
  TIME_UPDATE_INTERVAL_MS,
  MESSAGE_TIME_SPACING_MINUTES,
  delay,
  timelineGenerator,
};
