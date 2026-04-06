import { motion } from "framer-motion";
import { useAuth } from "../../Context/AuthContext";
import { MessageCircleMore } from "lucide-react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export default function ConversationList({
  conversations = [],
  selectedConversation,
  setSelectedConversation,
  loading,
}) {
  const { user } = useAuth();

  const getStatusStyles = (status) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "rejected":
        return "bg-rose-100 text-rose-700 border border-rose-200";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-hidden border-x-0 border-y-0 border-white/20 bg-white/75 p-3 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl md:rounded-[28px] md:border md:p-5">
        <div className="mb-5 shrink-0">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Messages
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Loading conversations...
          </p>
        </div>

        <div className="space-y-3 overflow-y-auto pr-1 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-3xl border border-slate-200/70 bg-white/80 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-full bg-slate-200" />
                <div className="flex-1">
                  <div className="h-4 w-28 rounded bg-slate-200" />
                  <div className="mt-3 h-3 w-36 rounded bg-slate-100" />
                  <div className="mt-3 h-3 w-full rounded bg-slate-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen min-h-0 flex-col overflow-hidden bg-white md:border md:border-white/20 md:bg-white/75 md:p-4 md:shadow-[0_20px_50px_rgba(15,23,42,0.10)] md:backdrop-blur-xl">
      {/* Header */}
      <div className="mb-3 shrink-0 border-b border-slate-200 bg-[linear-gradient(135deg,rgba(248,250,252,0.96),rgba(255,255,255,0.92))] px-4 py-4 md:mb-5 md:rounded-3xl md:border md:border-slate-200/70 md:shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-[26px] font-bold tracking-tight text-slate-900 md:text-2xl">
              Messages
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {conversations.length} conversation
              {conversations.length !== 1 ? "s" : ""}
            </p>
          </div>

          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2563EB,#1D4ED8)] text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)]"
          >
            <MessageCircleMore className="h-5 w-5" />
          </motion.div>
        </div>
      </div>

      {/* List */}
      <div className="min-h-0 flex-1 overflow-y-auto pr-1 no-scrollbar">
        {conversations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex h-full min-h-0 flex-col items-center justify-center rounded-[20px] border border-dashed border-slate-300 bg-slate-50/70 px-6 text-center md:rounded-[28px]"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200/80 text-2xl">
              💭
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              No conversations yet
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
              When someone starts a chat about a report, it will appear here.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {conversations.map((conversation) => {
              const otherUser =
                String(
                  conversation?.claimantId?._id || conversation?.claimantId,
                ) === String(user?._id)
                  ? conversation?.reportOwnerId
                  : conversation?.claimantId;

              const isSelected =
                String(selectedConversation?._id) === String(conversation?._id);

              return (
                <motion.button
                  key={conversation._id}
                  variants={itemVariants}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`group relative w-full overflow-hidden rounded-[22px] border px-3 py-3 text-left transition-all duration-300 md:rounded-2xl md:px-4 md:py-3.5 ${
                    isSelected
                      ? "border-blue-400 bg-gray-200 shadow-[0_14px_30px_rgba(37,99,235,0.10)]"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0">
                      <img
                        src={
                          otherUser?.avatar || "/images/Profile/profile.jpeg"
                        }
                        alt={otherUser?.name || "User"}
                        className="h-12 w-12 rounded-full border border-slate-200 object-cover shadow md:h-11 md:w-11"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="truncate pr-1 text-[15px] font-semibold text-slate-900">
                          {otherUser?.name || "User"}
                        </h3>

                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${getStatusStyles(
                            conversation.status,
                          )}`}
                        >
                          {conversation.status}
                        </span>
                      </div>

                      <p className="mt-0.5 truncate text-[12px] text-slate-500">
                        {conversation?.reportId?.name || "Item"}
                      </p>

                      <p className="mt-1 truncate text-[13px] text-slate-700">
                        {conversation?.lastMessage || "No messages"}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      scaleX: isSelected ? 1 : 0,
                      opacity: isSelected ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-blue-500"
                  />
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
