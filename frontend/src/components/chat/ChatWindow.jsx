import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SendHorizontal,
  MessageSquareText,
  Clock3,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
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
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
};

const bubbleVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

const floatingIcon = {
  animate: {
    y: [0, -4, 0],
    rotate: [0, 2, 0, -2, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function ChatWindow({ conversation, onBack }) {
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
      if (refreshConversations) refreshConversations();
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

  const getStatusStyles = (status) => {
    switch (status) {
      case "accepted":
        return "border-emerald-200/80 bg-emerald-50/90 text-emerald-700";
      case "pending":
        return "border-amber-200/80 bg-amber-50/90 text-amber-700";
      case "rejected":
        return "border-rose-200/80 bg-rose-50/90 text-rose-700";
      default:
        return "border-slate-200 bg-slate-50 text-slate-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle2 className="h-3.5 w-3.5" />;
      case "pending":
        return <Clock3 className="h-3.5 w-3.5" />;
      case "rejected":
        return <XCircle className="h-3.5 w-3.5" />;
      default:
        return <ShieldCheck className="h-3.5 w-3.5" />;
    }
  };

  if (!conversation) {
    return (
      <div className="hidden h-screen items-center justify-center border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.75),rgba(241,245,249,0.7))] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:flex">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            variants={floatingIcon}
            animate="animate"
            className="mx-auto mb-4 flex h-18 w-18 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563EB,#1D4ED8)] text-white shadow-[0_16px_40px_rgba(37,99,235,0.28)]"
          >
            <MessageSquareText className="h-8 w-8" />
          </motion.div>

          <h3 className="text-xl font-bold text-slate-900">
            Select a conversation
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Pick any conversation from the left panel.
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
      className="relative flex h-full flex-col overflow-hidden border-x-0 border-y-0 border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(241,245,249,0.72))] shadow-[0_24px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl  md:border"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.10),transparent_25%)]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 border-b border-white/50 bg-white/45 px-4 py-4 backdrop-blur-xl md:px-6"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {/* Mobile back */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={onBack}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative shrink-0"
            >
              <div className="absolute inset-0 rounded-full bg-blue-400/25 blur-md" />
              {otherUser?.avatar ? (
                <img
                  src={otherUser.avatar}
                  alt={otherUser?.name || "User"}
                  className="relative h-11 w-11 rounded-full border-2 border-white object-cover shadow-[0_14px_30px_rgba(15,23,42,0.18)] md:h-12 md:w-12"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0F172A,#1E3A8A)] text-sm font-bold text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] md:h-12 md:w-12">
                  {getInitials(otherUser?.name)}
                </div>
              )}
            </motion.div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-[16px] font-bold text-slate-900 md:text-[18px]">
                  {otherUser?.name || conversation?.reportId?.name || "Chat"}
                </h2>

                <motion.div
                  variants={floatingIcon}
                  animate="animate"
                  className="hidden sm:block text-blue-500"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
              </div>

              <p className="truncate text-[12px] text-slate-500 md:text-[13px]">
                {conversation?.reportId?.name || "Lost & Found conversation"}
              </p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide md:text-[11px] ${getStatusStyles(
              conversation.status,
            )}`}
          >
            {getStatusIcon(conversation.status)}
            <span>{conversation.status}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar px-3 py-4 md:px-5 md:py-5">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex h-full min-h-75 items-center justify-center"
          >
            <div className="rounded-[28px] border border-white/60 bg-white/65 px-7 py-10 text-center shadow-[0_16px_40px_rgba(15,23,42,0.07)] backdrop-blur-xl">
              <motion.div
                variants={floatingIcon}
                animate="animate"
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#E0EAFF,#DBEAFE)] text-blue-600 shadow-inner"
              >
                <MessageSquareText className="h-7 w-7" />
              </motion.div>

              <h3 className="text-lg font-bold text-slate-800">
                No messages yet
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Start the conversation once the request is accepted.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {messages.map((message) => {
              const isOwn =
                String(message.senderId?._id || message.senderId) ===
                String(user?._id);

              return (
                <motion.div
                  key={message._id}
                  variants={bubbleVariants}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <motion.div
                    whileHover={{ y: -2, scale: 1.01 }}
                    className={`relative max-w-[82%] overflow-hidden rounded-[26px] px-4 py-3.5 text-sm shadow-[0_14px_34px_rgba(15,23,42,0.08)] md:max-w-[70%] ${
                      isOwn
                        ? "bg-[linear-gradient(135deg,#2563EB,#1D4ED8)] text-white"
                        : "border border-white/70 bg-white/90 text-slate-800 backdrop-blur-xl"
                    }`}
                  >
                    {!isOwn && (
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.06),transparent_38%)]" />
                    )}

                    <div className="relative z-10">
                      <p className="wrap-break-word whitespace-pre-wrap text-[14px] leading-6">
                        {message.text}
                      </p>

                      <div className="mt-2.5 flex items-center gap-2">
                        <span
                          className={`text-[11px] font-medium ${
                            isOwn ? "text-blue-100" : "text-slate-400"
                          }`}
                        >
                          {message.messageType === "initial_proof"
                            ? "Proof Message"
                            : "Message"}
                        </span>
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
              className="mt-4 overflow-hidden rounded-[28px] border border-amber-200/80 bg-[linear-gradient(135deg,#FFF7ED,#FEF3C7)] p-5 shadow-[0_16px_38px_rgba(245,158,11,0.12)]"
            >
              <div className="mb-3 flex items-center gap-2 text-amber-700">
                <motion.div variants={floatingIcon} animate="animate">
                  <Clock3 className="h-5 w-5" />
                </motion.div>
                <h4 className="text-base font-bold text-slate-900">
                  Pending Request
                </h4>
              </div>

              <p className="text-sm leading-6 text-slate-600">
                Accept to unlock full conversation or reject to close it.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAccept}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#16A34A,#15803D)] px-5 py-2.5 font-semibold text-white shadow-[0_10px_24px_rgba(22,163,74,0.25)]"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {loading ? "Processing..." : "Accept"}
                </motion.button>

                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReject}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#EF4444,#DC2626)] px-5 py-2.5 font-semibold text-white shadow-[0_10px_24px_rgba(239,68,68,0.22)]"
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
              className="mt-4 flex items-center gap-2 rounded-[22px] border border-blue-200 bg-blue-50/90 p-4 text-sm text-blue-700 shadow-[0_10px_26px_rgba(37,99,235,0.08)]"
            >
              <Clock3 className="h-4 w-4" />
              Waiting for report owner response
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {conversation.status === "rejected" && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              className="mt-4 flex items-center gap-2 rounded-[22px] border border-rose-200 bg-rose-50/95 p-4 text-sm text-rose-700 shadow-[0_10px_26px_rgba(244,63,94,0.08)]"
            >
              <XCircle className="h-4 w-4" />
              This request was rejected. You cannot send more messages here.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      {conversation.status === "accepted" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 px-3 pb-3 md:px-4 md:pb-4"
        >
          <div className="flex items-end gap-3">
            <div className="flex flex-1 items-end gap-3 rounded-2xl border border-white/40 bg-white/70 px-4 py-3 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-300 focus-within:border-blue-400">
              <MessageSquareText className="mb-1 h-5 w-5 text-blue-500" />

              <textarea
                rows={1}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 resize-none bg-transparent text-[14px] leading-6 text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleSendMessage}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563EB,#1D4ED8)] text-white shadow-[0_10px_25px_rgba(37,99,235,0.35)]"
            >
              <SendHorizontal className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
