import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Bluetooth,
  Wifi,
  Usb,
  Send,
  Signal,
  BatteryFull,
  MessageSquare,
} from "lucide-react";
import conversationsData from "@site/src/data/conversations.json";

const DEVICE_IMAGE_BASE = "https://flasher.meshtastic.org/img/devices/";

// Node positions in percentage for responsive layout (x, y)
// Shifted right to make room for phone on left
const NODES = [
  { id: 0, x: 55, y: 5, device: "rak_wismesh_tag.svg", label: "Client" },
  {
    id: 1,
    x: 25,
    y: 25,
    device: "tracker-t1000-e.svg",
    label: "Client",
  },
  { id: 2, x: 85, y: 25, device: "thinknode_m1.svg", label: "Client" },
  { id: 3, x: 18, y: 60, device: "t-deck.svg", label: "Client" },
  { id: 4, x: 55, y: 50, device: "station-g2.svg", label: "Router" },
  { id: 5, x: 92, y: 60, device: "rak4631.svg", label: "Client" },
  { id: 6, x: 35, y: 85, device: "heltec_mesh_pocket.svg", label: "Client" },
  { id: 7, x: 75, y: 85, device: "muzi_r1_neo.svg", label: "Client" },
];

// Mesh connections (from, to) - sparser for visible multi-hop flooding
const CONNECTIONS: [number, number][] = [
  // Top node connects to upper layer only
  [0, 1],
  [0, 2],
  // Upper left/right to their nearby nodes
  [1, 3],
  [1, 4],
  [2, 4],
  [2, 5],
  // Side nodes to center and bottom
  [3, 6],
  [4, 6],
  [4, 7],
  [5, 7],
  // Bottom cross connection
  [6, 7],
  // One cross-link for redundancy
  [1, 6],
  [2, 7],
];

// Build adjacency map for neighbor lookups
const ADJACENCY: Map<number, number[]> = new Map();
CONNECTIONS.forEach(([from, to]) => {
  if (!ADJACENCY.has(from)) ADJACENCY.set(from, []);
  if (!ADJACENCY.has(to)) ADJACENCY.set(to, []);
  ADJACENCY.get(from)!.push(to);
  ADJACENCY.get(to)!.push(from);
});

// Get connection index for a pair of nodes
const getConnectionIndex = (a: number, b: number): number => {
  return CONNECTIONS.findIndex(
    ([from, to]) => (from === a && to === b) || (from === b && to === a),
  );
};

const DeviceImg = ({
  device,
  alt,
  className = "",
}: {
  device: string;
  alt: string;
  className?: string;
}) => (
  <img
    src={`${DEVICE_IMAGE_BASE}${device}`}
    alt={alt}
    className={className}
    loading="lazy"
  />
);

const MeshNode = ({
  node,
  isActive,
  connection,
}: {
  node: (typeof NODES)[0];
  isActive: boolean;
  connection?: "bt" | "wifi" | "usb";
}) => {
  // Position icons on outer edge of topology based on node position
  const isLeftSide = node.x < 50;
  const iconPosition = isLeftSide ? "-left-8" : "-right-8";

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <div className="relative">
        <div
          className={`absolute inset-0 rounded-full transition-all duration-700 ${
            isActive ? "bg-primary/15 scale-125" : "bg-transparent scale-100"
          }`}
        />
        <DeviceImg
          device={node.device}
          alt={node.label}
          className="w-12 h-14 object-contain relative z-10"
        />
        {connection && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${iconPosition} z-20`}
          >
            {connection === "bt" && (
              <Bluetooth
                className="w-5 h-5 text-[#0082FC]"
                aria-label="Bluetooth connection"
                role="img"
              />
            )}
            {connection === "wifi" && (
              <Wifi
                className="w-5 h-5 text-primary"
                aria-label="WiFi connection"
                role="img"
              />
            )}
            {connection === "usb" && (
              <Usb
                className="w-5 h-5 text-muted-foreground"
                aria-label="USB connection"
                role="img"
              />
            )}
          </div>
        )}
      </div>
      <span className="text-[10px] font-mono text-muted-foreground mt-1">
        {node.label}
      </span>
    </div>
  );
};

// Canned messages from mesh nodes - reuse from homepage data
const CANNED_MESSAGES = conversationsData.standaloneMessages;

type Message = {
  text: string;
  from: "me" | "mesh";
  nodeId?: number;
};

export function MeshTopology() {
  // Track active connections with their direction: Map<connectionIndex, senderId>
  const [activeConnections, setActiveConnections] = useState<
    Map<number, number>
  >(new Map());
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [activatedConnections, setActivatedConnections] = useState<Set<number>>(
    new Set(),
  );
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [terminalMessages, setTerminalMessages] = useState<Message[]>([]);
  const [btActive, setBtActive] = useState(false);
  const [btIncoming, setBtIncoming] = useState(false);
  const [usbIncoming, setUsbIncoming] = useState(false);
  const cannedIndexRef = useRef(0);
  const pendingIncomingMsgRef = useRef<{ text: string; nodeId: number } | null>(
    null,
  );
  const pendingUsbMsgRef = useRef<{ text: string; nodeId: number } | null>(
    null,
  );
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  });
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update clock
  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const startMessage = useCallback(
    (fromNodeId?: number, messageText?: string) => {
      // Clear previous timeouts
      timeoutIdsRef.current.forEach((id) => clearTimeout(id));
      timeoutIdsRef.current = [];

      // Use provided node or pick random client
      let senderId: number;
      const isFromPhone = fromNodeId === 6;

      if (fromNodeId !== undefined) {
        senderId = fromNodeId;
        // Store for USB delivery (phone message going to terminal)
        pendingUsbMsgRef.current = {
          text: messageText || "Hello mesh!",
          nodeId: senderId,
        };
      } else {
        // Pick a random client that isn't node 6 (the phone-connected one)
        const clientNodes = NODES.filter(
          (n) => n.label === "Client" && n.id !== 6,
        ).map((n) => n.id);
        const senderIdx = Math.floor(Math.random() * clientNodes.length);
        senderId = clientNodes[senderIdx];

        // Store pending message - will be delivered when flood reaches node 6
        const incomingMsg =
          CANNED_MESSAGES[cannedIndexRef.current % CANNED_MESSAGES.length];
        cannedIndexRef.current++;
        pendingIncomingMsgRef.current = { text: incomingMsg, nodeId: senderId };
        // Also store for USB delivery
        pendingUsbMsgRef.current = { text: incomingMsg, nodeId: senderId };
      }

      // Helper to trigger BT incoming animation when node 6 receives the message
      const triggerBtIncoming = (delay: number) => {
        if (isFromPhone || !pendingIncomingMsgRef.current) return;
        const msg = pendingIncomingMsgRef.current;
        pendingIncomingMsgRef.current = null;

        const btDelay = setTimeout(() => {
          setBtIncoming(true);
          // Show message after BT animation completes
          const msgDelay = setTimeout(() => {
            setMessages((prev) => [
              ...prev.slice(-4),
              { text: msg.text, from: "mesh", nodeId: msg.nodeId },
            ]);
            setBtIncoming(false);
          }, 800);
          timeoutIdsRef.current.push(msgDelay);
        }, delay);
        timeoutIdsRef.current.push(btDelay);
      };

      // Helper to trigger USB incoming animation when node 5 receives the message
      const triggerUsbIncoming = (delay: number) => {
        if (!pendingUsbMsgRef.current) return;
        const msg = pendingUsbMsgRef.current;
        pendingUsbMsgRef.current = null;

        const usbDelay = setTimeout(() => {
          setUsbIncoming(true);
          const hideDelay = setTimeout(() => {
            setTerminalMessages((prev) => [
              ...prev.slice(-5),
              { text: msg.text, from: "mesh", nodeId: msg.nodeId },
            ]);
            setUsbIncoming(false);
          }, 800);
          timeoutIdsRef.current.push(hideDelay);
        }, delay);
        timeoutIdsRef.current.push(usbDelay);
      };

      // Track nodes that have "heard" the message to avoid duplicate broadcasts
      const heardMessage = new Set<number>([senderId]);

      // Highlight sender
      setActiveNodes([senderId]);

      // Step 1: Sender broadcasts to ALL its neighbors (true mesh flood)
      let wave1Receivers: number[] = [];
      const tid1 = setTimeout(() => {
        const senderNeighbors = ADJACENCY.get(senderId) || [];
        const wave1Connections = new Map<number, number>();

        senderNeighbors.forEach((neighbor) => {
          const connIdx = getConnectionIndex(senderId, neighbor);
          if (connIdx !== -1) {
            wave1Connections.set(connIdx, senderId);
            wave1Receivers.push(neighbor);
            heardMessage.add(neighbor);
          }
        });

        setActiveConnections(wave1Connections);
        setActiveNodes([senderId, ...wave1Receivers]);
        setActivatedConnections((prev) => {
          const updated = new Set(prev);
          wave1Connections.forEach((_, idx) => updated.add(idx));
          return updated;
        });

        // Check if node 6 received in this wave
        if (wave1Receivers.includes(6)) {
          triggerBtIncoming(1000);
        }
        // Check if node 5 received in this wave
        if (wave1Receivers.includes(5)) {
          triggerUsbIncoming(1000);
        }
      }, 500);
      timeoutIdsRef.current.push(tid1);

      // Step 2: Wave 1 receivers rebroadcast to their neighbors
      let wave2Receivers: number[] = [];
      let wave2Senders: number[] = [];
      const tid2 = setTimeout(() => {
        const wave2Connections = new Map<number, number>();

        // Each receiver from wave 1 rebroadcasts
        wave1Receivers.forEach((relayNode) => {
          const neighbors = ADJACENCY.get(relayNode) || [];
          neighbors.forEach((neighbor) => {
            if (!heardMessage.has(neighbor)) {
              const connIdx = getConnectionIndex(relayNode, neighbor);
              if (connIdx !== -1 && !wave2Connections.has(connIdx)) {
                wave2Connections.set(connIdx, relayNode);
                wave2Receivers.push(neighbor);
                heardMessage.add(neighbor);
                if (!wave2Senders.includes(relayNode)) {
                  wave2Senders.push(relayNode);
                }
              }
            }
          });
        });

        if (wave2Connections.size > 0) {
          setActiveConnections(wave2Connections);
          setActiveNodes([...wave2Senders, ...wave2Receivers]);
          setActivatedConnections((prev) => {
            const updated = new Set(prev);
            wave2Connections.forEach((_, idx) => updated.add(idx));
            return updated;
          });

          // Check if node 6 received in this wave
          if (wave2Receivers.includes(6)) {
            triggerBtIncoming(1000);
          }
          // Check if node 5 received in this wave
          if (wave2Receivers.includes(5)) {
            triggerUsbIncoming(1000);
          }
        } else {
          setActiveConnections(new Map());
          setActiveNodes([]);
        }
      }, 2000);
      timeoutIdsRef.current.push(tid2);

      // Step 3: Wave 2 receivers rebroadcast (if any nodes left)
      const tid3 = setTimeout(() => {
        const wave3Connections = new Map<number, number>();
        const wave3Receivers: number[] = [];
        const wave3Senders: number[] = [];

        wave2Receivers.forEach((relayNode) => {
          const neighbors = ADJACENCY.get(relayNode) || [];
          neighbors.forEach((neighbor) => {
            if (!heardMessage.has(neighbor)) {
              const connIdx = getConnectionIndex(relayNode, neighbor);
              if (connIdx !== -1 && !wave3Connections.has(connIdx)) {
                wave3Connections.set(connIdx, relayNode);
                wave3Receivers.push(neighbor);
                heardMessage.add(neighbor);
                if (!wave3Senders.includes(relayNode)) {
                  wave3Senders.push(relayNode);
                }
              }
            }
          });
        });

        if (wave3Connections.size > 0) {
          setActiveConnections(wave3Connections);
          setActiveNodes([...wave3Senders, ...wave3Receivers]);
          setActivatedConnections((prev) => {
            const updated = new Set(prev);
            wave3Connections.forEach((_, idx) => updated.add(idx));
            return updated;
          });

          // Check if node 6 received in this wave
          if (wave3Receivers.includes(6)) {
            triggerBtIncoming(1000);
          }
          // Check if node 5 received in this wave
          if (wave3Receivers.includes(5)) {
            triggerUsbIncoming(1000);
          }
        } else {
          setActiveConnections(new Map());
          setActiveNodes([]);
        }
      }, 3500);
      timeoutIdsRef.current.push(tid3);

      // Step 4: Clear active state
      const tid4 = setTimeout(() => {
        setActiveConnections(new Map());
        setActiveNodes([]);
      }, 5000);
      timeoutIdsRef.current.push(tid4);
    },
    [],
  );

  // Auto-run animation periodically
  useEffect(() => {
    // Start initial message
    const initialDelay = setTimeout(() => startMessage(), 1000);

    // Restart periodically
    intervalRef.current = setInterval(() => startMessage(), 8000);

    return () => {
      clearTimeout(initialDelay);
      if (intervalRef.current) clearInterval(intervalRef.current);
      timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    };
  }, [startMessage]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const msgToSend = inputValue;

    // Add message to sent list
    setMessages((prev) => [...prev.slice(-4), { text: msgToSend, from: "me" }]);
    setInputValue("");

    // Trigger BT animation
    setBtActive(true);
    setTimeout(() => setBtActive(false), 1500);

    // Reset auto-interval and trigger from phone's connected node (node 6 with BT)
    if (intervalRef.current) clearInterval(intervalRef.current);
    startMessage(6, msgToSend); // Node 6 has BT connection to phone
    intervalRef.current = setInterval(() => startMessage(), 8000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <style>
        {`
          @keyframes ping-travel {
            0% { offset-distance: 0%; opacity: 1; }
            100% { offset-distance: 100%; opacity: 0.3; }
          }
          @keyframes ping-glow {
            0% { r: 1; opacity: 0.8; }
            50% { r: 3; opacity: 0.4; }
            100% { r: 5; opacity: 0; }
          }
          @keyframes bt-pulse {
            0% { opacity: 0; }
            20% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}
      </style>

      <div className="flex items-end gap-4 relative overflow-visible">
        {/* Mini Phone Mockup */}
        <div className="hidden sm:block flex-shrink-0 w-44">
          <div className="rounded-[1.5rem] bg-gradient-to-b from-stone-300 to-stone-400 dark:from-gray-800 dark:to-gray-900 p-2 shadow-xl ring-1 ring-stone-400 dark:ring-gray-600/50">
            <div className="rounded-[1.25rem] bg-stone-100 dark:bg-gray-900 p-1.5">
              <div className="relative overflow-hidden rounded-[1rem] bg-stone-50 dark:bg-gray-950">
                {/* Status bar */}
                <div className="flex items-center justify-between bg-stone-200/80 dark:bg-gray-900/80 px-2 py-0.5 text-[9px] text-primary">
                  <span className="font-mono">{currentTime}</span>
                  <div className="flex items-center gap-1">
                    <Signal className="h-2.5 w-2.5" />
                    <Wifi className="h-2.5 w-2.5" />
                    <BatteryFull className="h-2.5 w-2.5" />
                  </div>
                </div>

                {/* Header */}
                <div className="border-b border-primary/20 bg-stone-100/50 dark:bg-gray-900/50 px-2 py-0.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-[9px] font-bold text-primary leading-none">
                        MESHTASTIC
                      </p>
                      <p className="font-mono text-[6px] text-primary/70 leading-none mt-0.5">
                        Primary Channel
                      </p>
                    </div>
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20">
                      <MessageSquare className="h-2 w-2 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="h-24 flex flex-col-reverse gap-0.5 overflow-y-auto p-1.5 bg-stone-50 dark:bg-transparent">
                  {messages
                    .slice()
                    .reverse()
                    .map((msg, i) => (
                      <div
                        key={`msg-${messages.length - i}`}
                        className={`rounded border px-1 py-px ${
                          msg.from === "me"
                            ? "ml-3 border-primary/30 bg-primary/20"
                            : "mr-3 border-blue-400/30 bg-blue-500/20"
                        }`}
                      >
                        {msg.from === "mesh" && (
                          <p className="font-mono text-[5px] text-blue-500 dark:text-blue-400 leading-none">
                            Node {msg.nodeId}
                          </p>
                        )}
                        <p
                          className={`font-mono text-[7px] leading-none ${
                            msg.from === "me"
                              ? "text-stone-700 dark:text-gray-200"
                              : "text-stone-600 dark:text-gray-300"
                          }`}
                        >
                          {msg.text}
                        </p>
                      </div>
                    ))}
                  {messages.length === 0 && (
                    <p className="text-center font-mono text-[8px] text-muted-foreground">
                      Send a message to the mesh
                    </p>
                  )}
                </div>

                {/* Input */}
                <div className="bg-stone-100/50 dark:bg-gray-900/50 px-2 py-2">
                  <div className="flex items-center gap-1.5 rounded-full bg-stone-200 dark:bg-gray-800 px-2 py-1.5">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type..."
                      className="flex-1 w-full min-w-0 border-0 bg-transparent font-mono text-[10px] text-stone-800 dark:text-gray-200 placeholder-stone-400 dark:placeholder-gray-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      aria-label="Send message"
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-0 transition-colors ${
                        inputValue.trim()
                          ? "bg-primary text-white dark:text-gray-900"
                          : "bg-primary/30 text-primary/60"
                      }`}
                    >
                      <Send className="h-2.5 w-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mesh Topology */}
        <div className="flex-1 relative overflow-visible">
          {/* SVG for mesh connections */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            role="img"
            aria-label="Mesh network connections"
          >
            <title>Mesh network topology connections</title>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {CONNECTIONS.map(([from, to], idx) => {
              const fromNode = NODES[from];
              const toNode = NODES[to];
              const senderId = activeConnections.get(idx);
              const isActive = senderId !== undefined;
              const hasBeenActivated = activatedConnections.has(idx);
              if (!hasBeenActivated) return null;

              // Determine actual start/end based on sender direction
              const actualSender = senderId === from ? fromNode : toNode;
              const actualReceiver = senderId === from ? toNode : fromNode;

              return (
                <g key={`${from}-${to}`}>
                  {/* Base line */}
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    className="stroke-primary/20"
                    strokeWidth="0.15"
                  />

                  {/* Active ping effect */}
                  {isActive && (
                    <>
                      {/* Glowing line during ping */}
                      <line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        className="stroke-primary"
                        strokeWidth="0.3"
                        filter="url(#glow)"
                        style={{
                          opacity: 0.6,
                        }}
                      />

                      {/* Ping dot traveling along path */}
                      <circle
                        r="1.2"
                        className="fill-primary"
                        filter="url(#glow)"
                        style={{
                          offsetPath: `path('M ${actualSender.x} ${actualSender.y} L ${actualReceiver.x} ${actualReceiver.y}')`,
                          animation: "ping-travel 1.5s ease-out forwards",
                        }}
                      />

                      {/* Origin pulse ring */}
                      <circle
                        cx={actualSender.x}
                        cy={actualSender.y}
                        r="1"
                        className="fill-none stroke-primary"
                        strokeWidth="0.3"
                        style={{
                          animation: "ping-glow 1.5s ease-out forwards",
                        }}
                      />

                      {/* Destination pulse ring */}
                      <circle
                        cx={actualReceiver.x}
                        cy={actualReceiver.y}
                        r="1"
                        className="fill-none stroke-primary"
                        strokeWidth="0.3"
                        style={{
                          animation: "ping-glow 1.5s ease-out 0.8s forwards",
                        }}
                      />
                    </>
                  )}
                </g>
              );
            })}

            {/* Bluetooth connection line - outgoing (phone to node 6) */}
            {btActive && (
              <g>
                <defs>
                  <filter id="bt-line-glow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <line
                  x1="0"
                  y1="90"
                  x2={NODES[6].x - 5}
                  y2={NODES[6].y}
                  stroke="#0082FC"
                  strokeWidth="0.5"
                  filter="url(#bt-line-glow)"
                  strokeDasharray="2 1"
                  style={{
                    animation: "bt-pulse 0.5s ease-out forwards",
                  }}
                />
                {/* Traveling dot - phone to node */}
                <circle
                  r="1.5"
                  fill="#0082FC"
                  filter="url(#bt-line-glow)"
                  style={{
                    offsetPath: `path('M 0 90 L ${NODES[6].x - 5} ${NODES[6].y}')`,
                    animation: "ping-travel 0.8s ease-out forwards",
                  }}
                />
              </g>
            )}

            {/* Bluetooth connection line - incoming (node 6 to phone) */}
            {btIncoming && (
              <g>
                <defs>
                  <filter id="bt-line-glow-in">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <line
                  x1={NODES[6].x - 5}
                  y1={NODES[6].y}
                  x2="0"
                  y2="90"
                  stroke="#0082FC"
                  strokeWidth="0.5"
                  filter="url(#bt-line-glow-in)"
                  strokeDasharray="2 1"
                  style={{
                    animation: "bt-pulse 0.5s ease-out forwards",
                  }}
                />
                {/* Traveling dot - node to phone */}
                <circle
                  r="1.5"
                  fill="#0082FC"
                  filter="url(#bt-line-glow-in)"
                  style={{
                    offsetPath: `path('M ${NODES[6].x - 5} ${NODES[6].y} L 0 90')`,
                    animation: "ping-travel 0.8s ease-out forwards",
                  }}
                />
              </g>
            )}

            {/* USB connection line - computer to node 5 */}
            {usbIncoming && (
              <g>
                <defs>
                  <filter
                    id="usb-line-glow-in"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <line
                  x1="100"
                  y1="65"
                  x2={NODES[5].x + 3}
                  y2={NODES[5].y}
                  stroke="#888888"
                  strokeWidth="0.5"
                  filter="url(#usb-line-glow-in)"
                  strokeDasharray="2 1"
                  style={{
                    animation: "bt-pulse 0.5s ease-out forwards",
                  }}
                />
                {/* Traveling dot - node to computer */}
                <circle
                  r="1.5"
                  fill="#888888"
                  filter="url(#usb-line-glow-in)"
                  style={{
                    offsetPath: `path('M ${NODES[5].x + 3} ${NODES[5].y} L 100 65')`,
                    animation: "ping-travel 0.8s ease-out forwards",
                  }}
                />
              </g>
            )}
          </svg>

          {/* Aspect ratio container */}
          <div className="relative pt-[75%]">
            {/* Nodes */}
            {NODES.map((node) => {
              const connectionMap: Record<number, "wifi" | "usb" | "bt"> = {
                3: "wifi",
                5: "usb",
                6: "bt",
              };
              return (
                <MeshNode
                  key={node.id}
                  node={node}
                  isActive={activeNodes.includes(node.id)}
                  connection={connectionMap[node.id]}
                />
              );
            })}
          </div>
        </div>

        {/* Mini Computer Mockup */}
        <div className="hidden xl:block flex-shrink-0 w-48">
          <div className="rounded-lg bg-gradient-to-b from-stone-400 to-stone-500 dark:from-gray-700 dark:to-gray-800 p-1.5 shadow-xl ring-1 ring-stone-500 dark:ring-gray-600/50">
            {/* Screen */}
            <div className="rounded bg-stone-900 dark:bg-gray-950 p-1">
              <div className="rounded-sm bg-stone-950 dark:bg-black overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-1 bg-stone-800 dark:bg-gray-900 px-2 py-0.5">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="flex-1 text-center font-mono text-[6px] text-stone-400">
                    meshtastic-cli
                  </span>
                </div>

                {/* Terminal content */}
                <div className="p-1.5 h-20 overflow-hidden font-mono text-[6px] leading-relaxed flex flex-col justify-end">
                  {terminalMessages.length === 0 ? (
                    <>
                      <p className="text-green-400">$ meshtastic --listen</p>
                      <p className="text-stone-500">
                        Listening for messages...
                      </p>
                    </>
                  ) : (
                    terminalMessages.slice(-6).map((msg) => (
                      <p
                        key={`cli-${msg.from}-${msg.nodeId ?? "me"}-${msg.text.slice(0, 8)}`}
                        className="text-cyan-400"
                      >
                        [Node {msg.nodeId}]: {msg.text}
                      </p>
                    ))
                  )}
                </div>
              </div>
            </div>
            {/* Keyboard/base */}
            <div className="mt-1 h-2 rounded-sm bg-gradient-to-b from-stone-300 to-stone-400 dark:from-gray-600 dark:to-gray-700" />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 text-xs font-mono text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-primary rounded-full" />
          <span>LoRa</span>
        </div>
        <div className="flex items-center gap-2">
          <Bluetooth className="w-4 h-4 text-[#0082FC]" />
          <span>Bluetooth</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4 text-primary" />
          <span>WiFi</span>
        </div>
        <div className="flex items-center gap-2">
          <Usb className="w-4 h-4" />
          <span>USB</span>
        </div>
      </div>
    </div>
  );
}

export default MeshTopology;
