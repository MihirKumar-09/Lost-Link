import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SendHorizontal,
  MessageSquareText,
  Clock3,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowLeft,
  Check,
  CheckCheck,
} from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import {
  acceptConversationRequest,
  rejectConversationRequest,
} from "../../services/conversationService";
import {
  getMessages,
  markMessagesSeen,
  sendMessage,
} from "../../services/messageService";
import { useSocket } from "../../Context/SocketContext";

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const bubbleVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.24,
      ease: "easeOut",
    },
  },
};

const floatSoft = {
  animate: {
    y: [0, -4, 0],
    rotate: [0, 2, 0, -2, 0],
    transition: {
      duration: 3.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

function AnimatedRightPanelBackground() {
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        size: i % 3 === 0 ? 3.2 : 2,
        left: `${7 + ((i * 19) % 86)}%`,
        top: `${8 + ((i * 11) % 82)}%`,
        duration: 7 + (i % 4),
        delay: (i % 5) * 0.5,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* same family as left panel */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#170329_0%,#110220_26%,#0a0117_60%,#06010f_100%)]" />

      {/* softer moving glows */}
      <motion.div
        animate={{
          x: [0, 34, -18, 0],
          y: [0, -20, 18, 0],
          scale: [1, 1.07, 0.96, 1],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -24, 18, 0],
          y: [0, 18, -14, 0],
          scale: [1, 0.96, 1.06, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-15 top-16 h-96 w-96 rounded-full bg-fuchsia-500/8 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 18, -20, 0],
          y: [0, -16, 24, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-30 left-[26%] h-112 w-md rounded-full bg-violet-500/10 blur-3xl"
      />

      {/* mesh like left panel but more subtle */}
      <motion.svg
        viewBox="0 0 400 800"
        className="absolute inset-0 h-full w-full opacity-32"
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient
            id="rightMeshStroke"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ff6aad" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#9f67ff" stopOpacity="0.18" />
          </linearGradient>

          <radialGradient id="rightMeshGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd0ea" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ffd0ea" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g stroke="url(#rightMeshStroke)" strokeWidth="1" fill="none">
          <path d="M18 88 L96 54 L164 106 L118 186 L42 156 Z" />
          <path d="M164 106 L236 82 L284 144 L206 202 L118 186 Z" />
          <path d="M236 82 L334 44 L390 104 L284 144 Z" />
          <path d="M48 250 L134 224 L188 284 L96 338 L28 300 Z" />
          <path d="M188 284 L270 244 L328 316 L246 384 L96 338 Z" />
          <path d="M246 384 L344 348 L392 418 L286 494 L188 448 Z" />
          <path d="M42 470 L118 430 L188 448 L144 550 L56 542 Z" />
          <path d="M144 550 L232 522 L296 592 L220 660 L104 626 Z" />
          <path d="M220 660 L316 632 L386 702 L292 774 L180 738 Z" />
        </g>

        <g stroke="#ff7ab6" strokeOpacity="0.1" strokeWidth="0.8">
          <line x1="96" y1="54" x2="134" y2="224" />
          <line x1="164" y1="106" x2="188" y2="284" />
          <line x1="284" y1="144" x2="270" y2="244" />
          <line x1="118" y1="186" x2="96" y2="338" />
          <line x1="328" y1="316" x2="344" y2="348" />
          <line x1="188" y1="448" x2="232" y2="522" />
          <line x1="296" y1="592" x2="316" y2="632" />
        </g>

        {[
          [18, 88],
          [96, 54],
          [164, 106],
          [118, 186],
          [42, 156],
          [236, 82],
          [284, 144],
          [334, 44],
          [390, 104],
          [48, 250],
          [134, 224],
          [188, 284],
          [96, 338],
          [28, 300],
          [270, 244],
          [328, 316],
          [246, 384],
          [344, 348],
          [392, 418],
          [42, 470],
          [118, 430],
          [188, 448],
          [144, 550],
          [56, 542],
          [232, 522],
          [296, 592],
          [220, 660],
          [104, 626],
          [316, 632],
          [386, 702],
          [292, 774],
          [180, 738],
        ].map(([cx, cy], index) => (
          <g key={index}>
            <circle cx={cx} cy={cy} r="5.5" fill="url(#rightMeshGlow)" />
            <circle cx={cx} cy={cy} r="1.3" fill="#ffd3eb" opacity="0.55" />
          </g>
        ))}
      </motion.svg>

      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute rounded-full bg-pink-200/40"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: dot.left,
            top: dot.top,
            boxShadow: "0 0 10px rgba(255,122,182,0.12)",
          }}
          animate={{
            y: [0, -10, 0, 6, 0],
            opacity: [0.16, 0.4, 0.2, 0.35, 0.16],
            scale: [1, 1.08, 0.94, 1.03, 1],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.015)_16%,rgba(8,2,22,0.14)_100%)]" />
    </div>
  );
}

function StatusPill({ status }) {
  const normalized = status?.toLowerCase() || "pending";

  const styles =
    normalized === "accepted"
      ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-200"
      : normalized === "rejected"
        ? "border-rose-300/25 bg-rose-400/10 text-rose-200"
        : "border-amber-300/25 bg-amber-400/10 text-amber-200";

  const icon =
    normalized === "accepted" ? (
      <CheckCircle2 className="h-3.5 w-3.5" />
    ) : normalized === "rejected" ? (
      <XCircle className="h-3.5 w-3.5" />
    ) : (
      <Clock3 className="h-3.5 w-3.5" />
    );

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-xl md:text-[11px] ${styles}`}
    >
      {icon}
      <span>{status}</span>
    </motion.div>
  );
}

function MessageTicks({ isOwn, isSeen }) {
  if (!isOwn) return null;

  return isSeen ? (
    <CheckCheck className="h-4 w-4 text-cyan-200" />
  ) : (
    <Check className="h-4 w-4 text-white/75" />
  );
}

export default function ChatWindow({
  conversation,
  onBack,
  refreshConversations,
}) {
  const { user } = useAuth();
  const { socket } = useSocket();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const isOwner =
    String(conversation?.reportOwnerId?._id || conversation?.reportOwnerId) ===
    String(user?._id);

  const otherUser =
    String(conversation?.claimantId?._id || conversation?.claimantId) ===
    String(user?._id)
      ? conversation?.reportOwnerId
      : conversation?.claimantId;

  useEffect(() => {
    if (!conversation?._id) return;

    const fetchMessages = async () => {
      try {
        const data = await getMessages(conversation._id);
        setMessages(data.messages || []);
        await markMessagesSeen(conversation._id);
      } catch (error) {
        console.log("Fetch messages error:", error);
      }
    };

    fetchMessages();
  }, [conversation]);

  useEffect(() => {
    if (!socket || !conversation?._id) return;

    const handleNewMessage = (incomingMessage) => {
      const incomingConversationId = String(
        incomingMessage?.conversationId?._id || incomingMessage?.conversationId,
      );

      const currentConversationId = String(conversation?._id);

      if (incomingConversationId !== currentConversationId) return;

      setMessages((prev) => {
        const alreadyExists = prev.some(
          (msg) => String(msg._id) === String(incomingMessage._id),
        );

        if (alreadyExists) return prev;
        return [...prev, incomingMessage];
      });
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [socket, conversation?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAccept = async () => {
    try {
      setLoading(true);
      await acceptConversationRequest(conversation._id);
      if (refreshConversations) await refreshConversations();
    } catch (error) {
      console.log("Accept error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      await rejectConversationRequest(conversation._id);
      if (refreshConversations) await refreshConversations();
    } catch (error) {
      console.log("Reject error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!text.trim()) return;

    try {
      const data = await sendMessage(conversation._id, text.trim());

      if (data?.newMessage) {
        setMessages((prev) => {
          const alreadyExists = prev.some(
            (msg) => String(msg._id) === String(data.newMessage._id),
          );

          if (alreadyExists) return prev;
          return [...prev, data.newMessage];
        });
      }

      setText("");
      if (refreshConversations) await refreshConversations();
    } catch (error) {
      console.log("Send message error:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatTime = (dateValue) => {
    if (!dateValue) return "";
    const date = new Date(dateValue);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!conversation) {
    return (
      <div className="relative hidden h-full min-h-155 items-center justify-center overflow-hidden border border-white/10 md:flex">
        <AnimatedRightPanelBackground />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-md px-6 text-center"
        >
          <motion.div
            variants={floatSoft}
            animate="animate"
            className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/12 bg-white/8 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl"
          >
            <MessageSquareText className="h-9 w-9 text-pink-200" />
          </motion.div>

          <h3 className="text-2xl font-bold text-white">Open a conversation</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Pick any chat from the left panel to continue the conversation.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative flex h-full min-h-155 flex-col overflow-hidden border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.24)]"
    >
      <AnimatedRightPanelBackground />

      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 border-b border-white/10 bg-white/6 px-4 py-4 backdrop-blur-xl md:px-6"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={onBack}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white shadow-sm md:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.04, rotate: 2 }}
              className="relative shrink-0"
            >
              <div className="absolute inset-0 rounded-full bg-pink-500/15 blur-md" />
              {otherUser?.avatar ? (
                <img
                  src={otherUser.avatar}
                  alt={otherUser?.name || "User"}
                  className="relative h-12 w-12 rounded-full border-2 border-white/20 object-cover shadow-[0_14px_30px_rgba(0,0,0,0.25)]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2a0b45,#8b3dff)] text-sm font-bold text-white shadow-[0_14px_30px_rgba(0,0,0,0.22)]">
                  {getInitials(otherUser?.name)}
                </div>
              )}
            </motion.div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-[17px] font-bold text-white md:text-[18px]">
                  {otherUser?.name || "Chat"}
                </h2>

                <motion.div
                  variants={floatSoft}
                  animate="animate"
                  className="hidden text-pink-300 sm:block"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
              </div>

              <p className="truncate text-[12px] text-slate-300 md:text-[13px]">
                {conversation?.reportId?.name || "Lost & Found conversation"}
              </p>
            </div>
          </div>

          <StatusPill status={conversation.status} />
        </div>
      </motion.div>

      {/* messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-3 py-4 no-scrollbar md:px-5 md:py-5">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex h-full min-h-80 items-center justify-center"
          >
            <div className="max-w-sm rounded-[28px] border border-white/10 bg-white/8 px-7 py-10 text-center shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <motion.div
                variants={floatSoft}
                animate="animate"
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/12 bg-white/10 text-pink-200"
              >
                <MessageSquareText className="h-7 w-7" />
              </motion.div>

              <h3 className="text-lg font-bold text-white">No messages yet</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Start chatting once the request is accepted.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {messages.map((message) => {
              const isOwn =
                String(message.senderId?._id || message.senderId) ===
                String(user?._id);

              const isSeen = Boolean(message.seen || message.isSeen);

              return (
                <motion.div
                  key={message._id}
                  variants={bubbleVariants}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <motion.div
                    whileHover={{ y: -2, scale: 1.01 }}
                    className={`relative max-w-[84%] overflow-hidden rounded-3xl px-4 py-3.5 text-sm shadow-[0_14px_34px_rgba(0,0,0,0.18)] md:max-w-[72%] ${
                      isOwn
                        ? "border border-fuchsia-300/15 bg-[linear-gradient(135deg,rgba(236,72,153,0.22),rgba(79,70,229,0.38))] text-white backdrop-blur-xl"
                        : "border border-white/10 bg-white/8 text-white backdrop-blur-xl"
                    }`}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_34%)]" />

                    <div className="relative z-10">
                      <p className="whitespace-pre-wrap wrap-break-word text-[14px] leading-6">
                        {message.text}
                      </p>

                      <div className="mt-2 flex items-center justify-end gap-2">
                        <span
                          className={`text-[11px] ${
                            isOwn ? "text-pink-100/80" : "text-slate-300/70"
                          }`}
                        >
                          {formatTime(message.createdAt)}
                        </span>

                        <MessageTicks isOwn={isOwn} isSeen={isSeen} />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
            <div ref={messagesEndRef} />
          </motion.div>
        )}

        <AnimatePresence>
          {conversation.status === "pending" && isOwner && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              className="mt-5 rounded-3xl border border-amber-300/15 bg-[linear-gradient(135deg,rgba(251,191,36,0.12),rgba(180,83,9,0.08))] p-5 shadow-[0_16px_38px_rgba(0,0,0,0.12)] backdrop-blur-xl"
            >
              <div className="mb-3 flex items-center gap-2 text-amber-200">
                <motion.div variants={floatSoft} animate="animate">
                  <Clock3 className="h-5 w-5" />
                </motion.div>
                <h4 className="text-base font-bold text-white">
                  Pending request
                </h4>
              </div>

              <p className="text-sm leading-6 text-slate-200">
                Accept to unlock the full conversation or reject to close this
                request.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAccept}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#16A34A,#15803D)] px-5 py-2.5 font-semibold text-white shadow-[0_10px_24px_rgba(22,163,74,0.26)]"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {loading ? "Processing..." : "Accept"}
                </motion.button>

                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReject}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#EF4444,#DC2626)] px-5 py-2.5 font-semibold text-white shadow-[0_10px_24px_rgba(239,68,68,0.24)]"
                >
                  <XCircle className="h-4 w-4" />
                  {loading ? "Processing..." : "Reject"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {conversation.status === "pending" && !isOwner && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              className="mt-5 flex items-center gap-2 rounded-[20px] border border-blue-300/15 bg-blue-400/8 p-4 text-sm text-blue-100 shadow-[0_10px_26px_rgba(0,0,0,0.10)] backdrop-blur-md"
            >
              <Clock3 className="h-4 w-4" />
              Waiting for the report owner to respond.
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {conversation.status === "rejected" && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              className="mt-5 flex items-center gap-2 rounded-[20px] border border-rose-300/15 bg-rose-400/8 p-4 text-sm text-rose-100 shadow-[0_10px_26px_rgba(0,0,0,0.10)] backdrop-blur-md"
            >
              <XCircle className="h-4 w-4" />
              This request was rejected. You cannot send more messages here.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* input */}
      {conversation.status === "accepted" && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 border-t border-white/10 bg-white/6 px-3 pb-3 pt-3 backdrop-blur-xl md:px-4 md:pb-4"
        >
          <div className="flex items-end gap-3">
            <div className="flex flex-1 items-end gap-3 rounded-[22px] border border-white/10 bg-white/8 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 focus-within:border-pink-300/25">
              <MessageSquareText className="mb-1 h-5 w-5 text-pink-200" />

              <textarea
                rows={1}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="max-h-28 flex-1 resize-none bg-transparent text-[14px] leading-6 text-white outline-none placeholder:text-slate-300"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.08, rotate: 8 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleSendMessage}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ec4899,#4f46e5)] text-white shadow-[0_10px_25px_rgba(99,102,241,0.34)]"
            >
              <SendHorizontal className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
