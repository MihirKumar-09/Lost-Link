import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../Context/AuthContext";
import { MessageCircleMore } from "lucide-react";

function AnimatedSidebarBackground() {
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        size: i % 3 === 0 ? 3.5 : 2,
        left: `${8 + ((i * 17) % 84)}%`,
        top: `${8 + ((i * 13) % 82)}%`,
        duration: 7 + (i % 4),
        delay: (i % 5) * 0.5,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* softer base */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#1d0432_0%,#100320_30%,#090114_62%,#05010c_100%)]" />

      {/* softer moving glass glows */}
      <motion.div
        animate={{
          x: [0, 30, -18, 0],
          y: [0, -24, 18, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-pink-400/10 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -24, 18, 0],
          y: [0, 24, -18, 0],
          scale: [1, 0.96, 1.06, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-16 top-24 h-72 w-72 rounded-full bg-fuchsia-400/8 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 18, -24, 0],
          y: [0, -16, 28, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl"
      />

      {/* softer mesh */}
      <motion.svg
        viewBox="0 0 400 800"
        className="absolute inset-0 h-full w-full opacity-35"
        animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient
            id="meshStrokeSoft"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ff6aad" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff4d9d" stopOpacity="0.2" />
          </linearGradient>

          <radialGradient id="meshGlowSoft" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff7ab6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ff7ab6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g stroke="url(#meshStrokeSoft)" strokeWidth="1" fill="none">
          <path d="M20 90 L95 55 L165 108 L120 185 L42 158 Z" />
          <path d="M165 108 L238 82 L282 145 L205 200 L120 185 Z" />
          <path d="M238 82 L338 42 L390 105 L282 145 Z" />
          <path d="M52 252 L135 222 L188 282 L98 338 L30 302 Z" />
          <path d="M188 282 L270 245 L330 315 L248 384 L98 338 Z" />
          <path d="M248 384 L344 348 L392 418 L286 492 L188 448 Z" />
          <path d="M42 470 L118 430 L188 448 L144 550 L58 542 Z" />
          <path d="M144 550 L232 522 L296 590 L220 660 L104 626 Z" />
          <path d="M220 660 L316 632 L386 702 L292 774 L182 738 Z" />
        </g>

        <g stroke="#ff6aad" strokeOpacity="0.14" strokeWidth="0.8">
          <line x1="95" y1="55" x2="135" y2="222" />
          <line x1="165" y1="108" x2="188" y2="282" />
          <line x1="282" y1="145" x2="270" y2="245" />
          <line x1="120" y1="185" x2="98" y2="338" />
          <line x1="330" y1="315" x2="344" y2="348" />
          <line x1="188" y1="448" x2="232" y2="522" />
          <line x1="296" y1="590" x2="316" y2="632" />
        </g>

        {[
          [20, 90],
          [95, 55],
          [165, 108],
          [120, 185],
          [42, 158],
          [238, 82],
          [282, 145],
          [338, 42],
          [390, 105],
          [52, 252],
          [135, 222],
          [188, 282],
          [98, 338],
          [30, 302],
          [270, 245],
          [330, 315],
          [248, 384],
          [344, 348],
          [392, 418],
          [42, 470],
          [118, 430],
          [188, 448],
          [144, 550],
          [58, 542],
          [232, 522],
          [296, 590],
          [220, 660],
          [104, 626],
          [316, 632],
          [386, 702],
          [292, 774],
          [182, 738],
        ].map(([cx, cy], index) => (
          <g key={index}>
            <circle cx={cx} cy={cy} r="5" fill="url(#meshGlowSoft)" />
            <circle cx={cx} cy={cy} r="1.4" fill="#ff7ab6" opacity="0.65" />
          </g>
        ))}
      </motion.svg>

      {/* softer floating dots */}
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute rounded-full bg-pink-200/50"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: dot.left,
            top: dot.top,
            boxShadow: "0 0 10px rgba(255,106,173,0.18)",
          }}
          animate={{
            y: [0, -12, 0, 8, 0],
            opacity: [0.18, 0.5, 0.22, 0.42, 0.18],
            scale: [1, 1.08, 0.95, 1.05, 1],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* glass veil */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.015)_20%,rgba(8,2,22,0.16)_100%)]" />
    </div>
  );
}

function HeaderIconCard() {
  return (
    <motion.div
      animate={{
        rotate: [-10, -6, -10],
        y: [0, -2, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative"
    >
      <div className="absolute inset-0 rounded-[22px] bg-pink-400/18 blur-xl" />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
        <div className="absolute inset-0 rounded-[22px] bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03))]" />
        <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-linear-to-br from-pink-400 to-fuchsia-500 opacity-80 blur-[2px]" />
        <MessageCircleMore className="relative z-10 h-7 w-7 text-white" />
      </div>
    </motion.div>
  );
}

export default function ConversationList({
  conversations = [],
  selectedConversation,
  setSelectedConversation,
  loading,
}) {
  const { user } = useAuth();
  const defaultAvatar = "/images/Profile/profile.jpeg";

  if (loading) {
    return (
      <div className="relative h-full min-h-155 overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <AnimatedSidebarBackground />

        <div className="relative z-10 p-5">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <h2 className="text-3xl font-bold text-white">Messages</h2>
              <p className="mt-2 text-sm text-white/65">
                Loading conversations...
              </p>
            </div>
            <HeaderIconCard />
          </div>

          <div className="mt-6 space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-white/7 px-4 py-3 backdrop-blur-md"
              >
                <div className="h-14 w-14 animate-pulse rounded-full bg-white/15" />
                <div className="min-w-0 flex-1">
                  <div className="h-4 w-36 animate-pulse rounded bg-white/15" />
                  <div className="mt-3 h-3 w-28 animate-pulse rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-155 overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <AnimatedSidebarBackground />

      <div className="relative z-10 flex h-full flex-col">
        {/* premium header */}
        <div className="border-b border-white/10 px-5 pb-5 pt-6 backdrop-blur-[6px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-200/80 backdrop-blur-md">
                Inbox
              </div>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Messages
              </h2>

              <p className="mt-2 text-sm text-white/65">
                {conversations.length} conversation
                {conversations.length !== 1 ? "s" : ""}
              </p>
            </div>

            <HeaderIconCard />
          </div>
        </div>

        {/* list */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          {conversations.length === 0 ? (
            <div className="mx-2 mt-4 bg-white/8 p-6 text-center backdrop-blur-md">
              <h3 className="text-lg font-semibold text-white">
                No conversations yet
              </h3>
              <p className="mt-2 text-sm text-white/65">
                When someone messages you, chats will appear here.
              </p>
            </div>
          ) : (
            conversations.map((conversation, index) => {
              const otherUser =
                String(conversation.claimantId?._id) === String(user?._id)
                  ? conversation.reportOwnerId
                  : conversation.claimantId;

              const isSelected = selectedConversation?._id === conversation._id;

              const status = conversation.status?.toLowerCase() || "pending";

              return (
                <motion.button
                  key={conversation._id}
                  whileHover={{
                    x: 4,
                    backgroundColor: "rgba(255,255,255,0.07)",
                  }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`relative flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-300 ${
                    isSelected
                      ? "bg-white/10 backdrop-blur-sm"
                      : "bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-linear-to-b from-pink-400 via-fuchsia-400 to-violet-400" />
                  )}

                  <div className="relative shrink-0">
                    <div className="absolute inset-0 rounded-full bg-pink-500/15 blur-md" />
                    <img
                      src={otherUser?.avatar || defaultAvatar}
                      alt={otherUser?.name || "User"}
                      className="relative h-14 w-14 rounded-full border border-white/15 object-cover shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div
                    className={`min-w-0 flex-1 py-1 ${
                      index !== conversations.length - 1
                        ? "border-b border-white/8"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="truncate text-[17px] font-semibold text-white">
                        {otherUser?.name || "User"}
                      </h3>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${
                          status === "accepted"
                            ? "bg-emerald-400/15 text-emerald-300"
                            : status === "rejected"
                              ? "bg-rose-400/15 text-rose-300"
                              : "bg-amber-400/15 text-amber-300"
                        }`}
                      >
                        {conversation.status}
                      </span>
                    </div>

                    <p className="mt-2 truncate text-[15px] text-white/76">
                      {conversation.lastMessage || "No messages"}
                    </p>
                  </div>
                </motion.button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
