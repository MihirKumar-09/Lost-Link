import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bell,
  MessageSquare,
  CheckCircle,
  XCircle,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../services/notificationService";
import { useSocket } from "../../Context/SocketContext";

const stars = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  size: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
  left: `${(i * 17) % 100}%`,
  top: `${(i * 11) % 100}%`,
  duration: 2.5 + (i % 6),
  delay: (i % 7) * 0.4,
}));

const clouds = [
  { id: 1, top: "8%", width: 220, height: 70, duration: 26, delay: 0 },
  { id: 2, top: "20%", width: 180, height: 56, duration: 32, delay: 2 },
  { id: 3, top: "58%", width: 240, height: 78, duration: 36, delay: 1 },
];

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* LIGHT MODE SCENE */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f8fbff_0%,#eef6ff_28%,#eaf3ff_48%,#f8fafc_75%,#eef2f7_100%)]" />

        <motion.div
          animate={{
            x: [0, 80, -30, 0],
            y: [0, 35, -20, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-yellow-300/40 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -50, 25, 0],
            y: [0, 25, -15, 0],
            rotate: [0, 8, -6, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[8%] top-[7%]"
        >
          <div className="relative h-28 w-28 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff7c2_0%,#ffe27a_38%,#ffcc4d_68%,#ffb703_100%)] shadow-[0_0_80px_rgba(255,200,0,0.45)]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-6 rounded-full border border-yellow-300/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-10.5 rounded-full border border-yellow-200/20"
            />
          </div>
        </motion.div>

        <motion.div
          animate={{
            rotate: [0, 8, -4, 0],
            scale: [1, 1.04, 0.98, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[2%] top-[-8%] h-128 w-lg rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,220,120,0.00)_0deg,rgba(255,220,120,0.18)_35deg,rgba(255,220,120,0.00)_70deg,rgba(255,220,120,0.14)_120deg,rgba(255,220,120,0.00)_180deg,rgba(255,220,120,0.12)_240deg,rgba(255,220,120,0.00)_300deg,rgba(255,220,120,0.16)_340deg,rgba(255,220,120,0.00)_360deg)] blur-2xl"
        />

        {clouds.map((cloud) => (
          <motion.div
            key={cloud.id}
            initial={{ x: -260, opacity: 0.55 }}
            animate={{ x: "120vw", opacity: [0.45, 0.65, 0.45] }}
            transition={{
              duration: cloud.duration,
              repeat: Infinity,
              ease: "linear",
              delay: cloud.delay,
            }}
            className="absolute"
            style={{ top: cloud.top }}
          >
            <div
              className="relative rounded-full bg-white/40 blur-xl"
              style={{ width: cloud.width, height: cloud.height }}
            >
              <div className="absolute left-8 -top-4.5 h-16 w-16 rounded-full bg-white/50 blur-md" />
              <div className="absolute left-20 -top-6.5 h-20 w-20 rounded-full bg-white/50 blur-md" />
              <div className="absolute left-36 -top-2.5 h-14 w-14 rounded-full bg-white/45 blur-md" />
            </div>
          </motion.div>
        ))}

        <motion.div
          animate={{
            x: [0, -120, 60, 0],
            y: [0, 40, -25, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-35 left-[10%] h-112 w-md rounded-full bg-sky-300/20 blur-3xl"
        />

        <div className="absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(circle_at_bottom,rgba(125,211,252,0.18),transparent_68%)]" />
      </div>

      {/* DARK MODE SCENE */}
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#07142d_0%,#030b1b_35%,#020617_65%,#01030b_100%)]" />

        <motion.div
          animate={{
            x: [0, 90, -40, 0],
            y: [0, -60, 35, 0],
            scale: [1, 1.1, 0.94, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-cyan-500/12 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -120, 50, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.92, 1.08, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-25 top-[15%] h-112 w-md rounded-full bg-violet-500/12 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -30, 45, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-30 left-1/3 h-96 w-[24rem] rounded-full bg-blue-500/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -35, 18, 0],
            y: [0, 18, -10, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[8%] top-[7%]"
        >
          <div className="relative h-24 w-24 rounded-full bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#dbeafe_30%,#bfdbfe_58%,#93c5fd_100%)] shadow-[0_0_70px_rgba(147,197,253,0.35)]">
            <div className="absolute right-4 top-5 h-3 w-3 rounded-full bg-slate-200/70" />
            <div className="absolute left-5 top-9 h-2.5 w-2.5 rounded-full bg-slate-200/60" />
            <div className="absolute left-10 top-4 h-2 w-2 rounded-full bg-slate-200/50" />
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-7 rounded-full border border-cyan-300/15"
          >
            <div className="absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300/70 shadow-[0_0_12px_rgba(103,232,249,0.75)]" />
          </motion.div>
        </motion.div>

        {stars.map((star) => (
          <motion.span
            key={star.id}
            animate={{
              opacity: [0.25, 1, 0.35],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: "0 0 10px rgba(255,255,255,0.7)",
            }}
          />
        ))}

        <motion.div
          animate={{
            x: [-200, 1200],
            y: [0, 300],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            repeatDelay: 7,
            ease: "easeOut",
          }}
          className="absolute -left-45 top-[18%] h-0.5 w-40 rotate-18 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.95),rgba(255,255,255,0))] blur-[1px]"
        />

        <motion.div
          animate={{
            x: [-100, 1000],
            y: [0, 240],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            repeatDelay: 10,
            delay: 2,
            ease: "easeOut",
          }}
          className="absolute -left-30 top-[40%] h-0.5 w-32 rotate-20 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(186,230,253,0.95),rgba(255,255,255,0))] blur-[1px]"
        />

        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(96,165,250,0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96,165,250,0.18) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
          }}
        />
      </div>
    </div>
  );
}

function NotificationCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/65 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl bg-slate-200 dark:bg-white/10" />
        <div className="flex-1">
          <div className="mb-3 h-4 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="mb-2 h-3 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="mb-2 h-3 w-full animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="h-3 w-3/4 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { socket } = useSocket();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await getNotifications();
        setNotifications(data?.notifications || []);
      } catch (error) {
        console.log("Fetch notifications error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    };

    socket.on("new_notification", handleNewNotification);

    return () => {
      socket.off("new_notification", handleNewNotification);
    };
  }, [socket]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "claim_request":
        return (
          <Bell size={18} className="text-orange-500 dark:text-orange-400" />
        );
      case "claim_accepted":
        return (
          <CheckCircle
            size={18}
            className="text-green-600 dark:text-green-400"
          />
        );
      case "claim_rejected":
        return <XCircle size={18} className="text-red-500 dark:text-red-400" />;
      case "new_message":
        return (
          <MessageSquare
            size={18}
            className="text-blue-600 dark:text-blue-400"
          />
        );
      default:
        return (
          <Bell size={18} className="text-slate-500 dark:text-slate-400" />
        );
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "";

    const now = new Date();
    const date = new Date(dateString);
    const diff = now - date;

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (diff < minute) return "Just now";
    if (diff < hour) return `${Math.floor(diff / minute)} min ago`;
    if (diff < day) return `${Math.floor(diff / hour)} hr ago`;
    if (diff < day * 7) return `${Math.floor(diff / day)} day ago`;

    return date.toLocaleDateString();
  };

  const groupedNotifications = useMemo(() => {
    const groupedMap = new Map();

    for (const notification of notifications) {
      const senderId = notification?.senderId?._id || notification?.senderId;
      const senderName = notification?.senderId?.name || "Someone";

      if (!senderId) continue;

      if (!groupedMap.has(senderId)) {
        groupedMap.set(senderId, {
          senderId,
          senderName,
          latestNotification: notification,
          unreadCount: notification.isRead ? 0 : 1,
          notifications: [notification],
        });
      } else {
        const existing = groupedMap.get(senderId);

        existing.notifications.push(notification);

        if (!notification.isRead) {
          existing.unreadCount += 1;
        }

        const oldTime = new Date(
          existing.latestNotification?.createdAt || 0,
        ).getTime();
        const newTime = new Date(notification?.createdAt || 0).getTime();

        if (newTime > oldTime) {
          existing.latestNotification = notification;
        }
      }
    }

    return Array.from(groupedMap.values()).sort((a, b) => {
      const aTime = new Date(a.latestNotification?.createdAt || 0).getTime();
      const bTime = new Date(b.latestNotification?.createdAt || 0).getTime();
      return bTime - aTime;
    });
  }, [notifications]);

  const handleNotificationClick = async (group) => {
    try {
      const unreadNotifications = group.notifications.filter(
        (item) => !item.isRead,
      );

      if (unreadNotifications.length > 0) {
        await Promise.all(
          unreadNotifications.map((item) => markNotificationAsRead(item._id)),
        );

        setNotifications((prev) =>
          prev.map((item) => {
            const belongsToGroup = group.notifications.some(
              (groupItem) => groupItem._id === item._id,
            );

            return belongsToGroup ? { ...item, isRead: true } : item;
          }),
        );
      }

      const latest = group.latestNotification;
      const conversationId =
        latest?.conversationId?._id || latest?.conversationId;

      if (conversationId) {
        navigate(`/messages?conversation=${conversationId}`);
      } else {
        navigate("/messages");
      }
    } catch (error) {
      console.log("Notification click error:", error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        })),
      );
    } catch (error) {
      console.log("Mark all read error:", error);
    }
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const totalUnread = notifications.filter((item) => !item.isRead).length;

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-6 text-slate-900 dark:bg-[#020617] dark:text-white md:px-8 md:py-10">
      <AnimatedBackground />

      {/* scene overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white/40 dark:bg-black/20" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3">
            <motion.button
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleBack}
              className="inline-flex mt-1 md:hidden h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-slate-200/80 bg-white/75 text-slate-700 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl transition dark:border-white/10 dark:bg-white/6 dark:text-white dark:shadow-[0_14px_32px_rgba(0,0,0,0.28)]"
              aria-label="Go back"
            >
              <ArrowLeft size={18} />
            </motion.button>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/65 px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-[0_8px_24px_rgba(59,130,246,0.10)] backdrop-blur-xl dark:border-cyan-400/20 dark:bg-white/6 dark:text-cyan-300"
              >
                Real-time inbox
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-4xl font-black tracking-tight text-slate-900 dark:bg-[linear-gradient(135deg,#ffffff_0%,#c4b5fd_28%,#7dd3fc_60%,#ffffff_100%)] dark:bg-clip-text dark:text-transparent md:text-6xl"
              >
                Notifications
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-2 text-sm text-slate-600 dark:text-slate-300 md:text-base"
              >
                One user, one notification card.
              </motion.p>
            </div>
          </div>

          {notifications.length > 0 && (
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleMarkAllRead}
              className="inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition dark:border-white/10 dark:bg-white/6 dark:text-slate-200 dark:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            >
              Mark all as read
              {totalUnread > 0 && (
                <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white dark:bg-cyan-300 dark:text-slate-950">
                  {totalUnread}
                </span>
              )}
            </motion.button>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            <NotificationCardSkeleton />
            <NotificationCardSkeleton />
            <NotificationCardSkeleton />
          </div>
        ) : groupedNotifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-4xl border border-slate-200/70 bg-white/65 p-10 text-center text-slate-500 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            No notifications yet
          </motion.div>
        ) : (
          <div className="space-y-4">
            {groupedNotifications.map((group, index) => {
              const latest = group.latestNotification;
              const unread = group.unreadCount > 0;

              return (
                <motion.button
                  key={group.senderId}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleNotificationClick(group)}
                  className={`group relative w-full cursor-pointer overflow-hidden rounded-[28px] border p-5 text-left shadow-[0_16px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl transition ${
                    unread
                      ? "border-blue-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.80)_0%,rgba(239,246,255,0.72)_100%)] dark:border-cyan-400/20 dark:bg-[linear-gradient(135deg,rgba(8,15,30,0.82)_0%,rgba(13,20,36,0.76)_50%,rgba(22,28,48,0.74)_100%)]"
                      : "border-slate-200/70 bg-white/60 dark:border-white/10 dark:bg-white/5"
                  }`}
                >
                  <motion.div
                    animate={{ x: ["-120%", "140%"] }}
                    transition={{
                      duration: 3.6,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.25,
                    }}
                    className="pointer-events-none absolute inset-y-0 left-0 w-32 -skew-x-12 bg-white/30 blur-xl dark:bg-cyan-300/10"
                  />

                  {unread && (
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-blue-500 dark:bg-cyan-400" />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-sm ${
                        unread
                          ? "border-blue-100 bg-white/80 dark:border-white/10 dark:bg-white/8"
                          : "border-slate-200 bg-slate-50/80 dark:border-white/10 dark:bg-white/6"
                      }`}
                    >
                      {getNotificationIcon(latest?.type)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-base font-bold text-slate-900 dark:text-white md:text-lg">
                              {latest?.type === "new_message"
                                ? "New message"
                                : latest?.type === "claim_request"
                                  ? "New claim request"
                                  : latest?.type === "claim_accepted"
                                    ? "Claim accepted"
                                    : latest?.type === "claim_rejected"
                                      ? "Claim rejected"
                                      : "New notification"}
                            </h2>

                            {group.unreadCount > 0 && (
                              <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white dark:bg-cyan-400 dark:text-slate-950">
                                {group.unreadCount} new
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                            {group.senderName}
                          </p>

                          <p className="mt-2 line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
                            {latest?.text}
                          </p>

                          {latest?.reportId?.name && (
                            <p className="mt-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                              Related item: {latest.reportId.name}
                            </p>
                          )}
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                            {formatTimeAgo(latest?.createdAt)}
                          </span>

                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 transition group-hover:translate-x-1 dark:border-white/10 dark:bg-white/6 dark:text-slate-300">
                            <ChevronRight size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
