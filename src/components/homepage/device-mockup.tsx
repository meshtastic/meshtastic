import { Rabbit } from "@/components/icons/rabbit";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import conversationsData from "@/data/conversations.json";
import emojisData from "@/data/emojis.json";
import keyboardData from "@/data/keyboard-layout.json";
import usersData from "@/data/users.json";
import { useDeviceMockup } from "@/hooks/use-device-mockup";
import {
  getAvatarColor,
  getAvatarTextColor,
  isEmoji,
} from "@/lib/avatar-color";
import { buildTimeline, hydrateUsers } from "@/lib/build-timeline";
import type { BuiltMessage } from "@/types/conversation.types";
import {
  BatteryFull,
  MessageSquare,
  Reply,
  Send,
  Signal,
  Smile,
  Wifi,
} from "lucide-react";
import React from "react";

const { reactions } = emojisData;
const keyboardLayout = keyboardData.rows;

export function DeviceMockup() {
  const { users, timeline } = React.useMemo(() => {
    const users = hydrateUsers(usersData.users);
    const timeline = buildTimeline(users, conversationsData);
    return { users, timeline };
  }, []);

  const {
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
    addEmojiToInput,
    addReactionToMessage,
    toggleReaction,
    isNewMessage,
  } = useDeviceMockup({
    timeline,
    autoResponses: conversationsData.autoResponses,
    users,
  });

  const EmojiPickerContent = ({
    onSelect,
    cols = 6,
  }: {
    onSelect: (emoji: string) => void;
    cols?: number;
  }) => (
    <div
      className="grid max-h-32 gap-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {reactions.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className="rounded-md p-1 text-xl transition-colors hover:bg-primary/20"
        >
          {emoji}
        </button>
      ))}
    </div>
  );

  const OutgoingBubble = ({ msg }: { msg: BuiltMessage }) => {
    const [pickerOpen, setPickerOpen] = React.useState(false);

    return (
      <div
        className={`message-bubble group relative ml-8 rounded-lg border border-primary/30 bg-primary/20 p-2 ${
          isNewMessage(msg.id)
            ? "animate-in slide-in-from-bottom-4 fade-in duration-300"
            : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-base font-semibold text-primary">
            {msg.longName}
          </span>
          <div className="flex items-center gap-1">
            <span className="font-mono text-xs text-gray-400">{msg.time}</span>
            <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
              <PopoverTrigger asChild={true}>
                <button
                  type="button"
                  className="rounded-md border-0 bg-transparent p-1 shadow-none text-primary/60 hover:bg-primary/20 hover:text-primary will-change-[background-color]"
                  title="React"
                >
                  <Smile className="h-5 w-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto border-gray-700 bg-gray-800 p-2"
                align="end"
                sideOffset={8}
              >
                <EmojiPickerContent
                  onSelect={(emoji) => {
                    addReactionToMessage(msg.id, emoji);
                    setPickerOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <p className="mt-0.5 font-mono text-base text-gray-200">{msg.text}</p>
        <p className="mt-1 text-right font-mono text-[12px] text-gray-400">
          This is only a demo
        </p>
        {msg.reactions && msg.reactions.length > 0 && (
          <div className="mt-1 flex justify-end gap-1">
            {msg.reactions.map((emoji: string) => (
              <button
                key={emoji}
                type="button"
                onClick={() => toggleReaction(msg.id, emoji)}
                className="rounded-full bg-gray-700/50 px-1.5 py-0.5 text-base transition-colors hover:bg-gray-600/50"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const IncomingBubble = ({ msg }: { msg: BuiltMessage }) => {
    const [pickerOpen, setPickerOpen] = React.useState(false);
    const isEmojiAvatar = isEmoji(msg.shortName);

    return (
      <div
        className={`message-bubble group relative flex gap-2 rounded-lg bg-gray-800/50 p-2 ${
          isNewMessage(msg.id)
            ? "animate-in slide-in-from-bottom-4 fade-in duration-300"
            : ""
        }`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            isEmojiAvatar ? "text-2xl" : "text-xs font-bold"
          }`}
          style={
            isEmojiAvatar
              ? { backgroundColor: "rgb(31, 41, 55)" }
              : {
                  backgroundColor: getAvatarColor(msg.shortName),
                  color: getAvatarTextColor(getAvatarColor(msg.shortName)),
                }
          }
        >
          {msg.shortName}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span
              className="truncate font-mono text-base font-semibold"
              title={msg.longName}
              style={{
                color: isEmojiAvatar
                  ? "rgb(229, 231, 235)"
                  : getAvatarColor(msg.shortName),
              }}
            >
              {msg.longName}
            </span>

            <div className="flex shrink-0 items-center gap-1">
              <span className="font-mono text-sm text-gray-400">
                {msg.time}
              </span>

              <button
                type="button"
                onClick={() => handleReply(msg)}
                className="rounded-md border-0 bg-transparent p-1 shadow-none text-primary/60 hover:bg-primary/20 hover:text-primary will-change-[background-color]"
                title="Reply"
              >
                <Reply className="h-5 w-5" />
              </button>

              <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
                <PopoverTrigger asChild={true}>
                  <button
                    type="button"
                    className="rounded-md border-0 bg-transparent p-1 shadow-none text-primary/60 hover:bg-primary/20 hover:text-primary will-change-[background-color]"
                    title="React"
                  >
                    <Smile className="h-5 w-5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto border-gray-700 bg-gray-800 p-2"
                  align="end"
                  sideOffset={8}
                >
                  <EmojiPickerContent
                    onSelect={(emoji) => {
                      addReactionToMessage(msg.id, emoji);
                      setPickerOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <p className="mt-0.5 font-mono text-base text-gray-200">{msg.text}</p>

          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {msg.hops ? (
                <Rabbit className="size-4 text-primary" />
              ) : (
                <Signal className="size-4 text-primary" />
              )}
              <span className="font-mono text-[15px] text-primary/70">
                {msg.hops
                  ? `${msg.hops} ${msg.hops === 1 ? "hop" : "hops"} away`
                  : `${msg.rssi} dBm`}
              </span>
            </div>
            {msg.reactions && msg.reactions.length > 0 && (
              <div className="flex gap-1">
                {msg.reactions.map((emoji: string) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => toggleReaction(msg.id, emoji)}
                    className="rounded-full bg-gray-700/50 px-1.5 py-0.5 text-base transition-colors hover:bg-gray-600/50"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="relative w-[23rem] lg:w-[25rem] rounded-[2.5rem] bg-gradient-to-b from-gray-800 to-gray-900 p-4 shadow-2xl shadow-black/50 ring-1 ring-gray-600/50">
        <div className="rounded-[2rem] bg-gray-900 p-2.5">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-gray-950">
            <div className="flex items-center justify-between bg-gray-900/80 px-5 py-3 text-base text-primary">
              <span className="font-mono">{currentTime}</span>
              <div className="flex items-center gap-2.5">
                <Signal className="h-4 w-4" />
                <Wifi className="h-4 w-4" />
                <BatteryFull className="h-4 w-4" />
              </div>
            </div>

            <div className="border-b border-primary/20 bg-gray-900/50 px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-base font-bold text-primary">
                    MESHTASTIC DEMO
                  </p>
                  <p className="font-mono text-xs text-primary/90">
                    Primary Channel
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>

            <div
              ref={messagesContainerRef}
              className="h-[17.5rem] flex flex-col-reverse gap-2 overflow-y-auto p-3 [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border"
            >
              {messages.map((msg) => (
                <React.Fragment key={msg.id}>
                  {msg.isOutgoing ? (
                    <OutgoingBubble msg={msg} />
                  ) : (
                    <IncomingBubble msg={msg} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="bg-gray-900/50 px-4 pb-3 pt-4">
              <div className="flex items-center gap-2 rounded-full border-0 bg-gray-800 px-4 py-2.5 shadow-none">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCapitalize="sentences"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type message..."
                  className="flex-1 border-0 bg-transparent font-mono text-base text-gray-200 placeholder-gray-500 shadow-none outline-none caret-primary"
                />
                <button
                  type="button"
                  onClick={handleSendMessage}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-0 shadow-none transition-colors ${
                    inputValue.trim()
                      ? "bg-primary text-gray-900 hover:bg-primary/80"
                      : "bg-primary/30 text-primary/60 hover:bg-primary/50 hover:text-primary"
                  }`}
                >
                  <span className="sr-only">send</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="relative space-y-1.5 bg-gray-900/50 px-3 pb-3 pt-2">
              {keyboardLayout.map((row, rowIndex) => (
                <div
                  key={`row-${row[rowIndex]}`}
                  className="flex justify-center gap-1"
                >
                  {row.map((key) => (
                    <React.Fragment key={key}>
                      {key === "😊" ? (
                        <Popover>
                          <PopoverTrigger asChild={true}>
                            <button
                              type="button"
                              className="flex h-7 w-10 items-center justify-center rounded border-0 bg-gray-800/50 text-base font-medium text-gray-200 shadow-none transition-colors hover:bg-primary hover:text-gray-900 active:scale-95"
                            >
                              <span className="sr-only">emoji picker</span>
                              <Smile className="h-4 w-4" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto border-gray-700 bg-gray-800 p-2"
                            side="top"
                            align="center"
                            sideOffset={8}
                          >
                            <EmojiPickerContent
                              onSelect={(emoji) => addEmojiToInput(emoji)}
                              cols={8}
                            />
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleKeyPress(key)}
                          className={`flex items-center justify-center rounded border-0 bg-gray-800/50 font-mono text-xs font-medium text-gray-200 shadow-none transition-colors hover:bg-primary hover:text-gray-900 active:scale-95 ${
                            key === "space"
                              ? "h-7 flex-1"
                              : key === "↵"
                                ? "h-7 w-14 bg-primary/90 text-gray-900 hover:bg-primary"
                                : "h-7 w-7"
                          }`}
                        >
                          <span className="sr-only">{key}</span>
                          {key === "space" ? "" : key}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute -inset-4 -z-[1] rounded-[3rem] bg-primary/10 blur-2xl" />
      </div>
    </div>
  );
}
