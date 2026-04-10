import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bell,
  MessageSquare,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../services/notificationService";
import { useSocket } from "../../Context/SocketContext";

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
        return <Bell size={18} className="text-orange-500" />;
      case "claim_accepted":
        return <CheckCircle size={18} className="text-green-600" />;
      case "claim_rejected":
        return <XCircle size={18} className="text-red-500" />;
      case "new_message":
        return <MessageSquare size={18} className="text-blue-600" />;
      default:
        return <Bell size={18} className="text-slate-500" />;
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

  const totalUnread = notifications.filter((item) => !item.isRead).length;

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,#eef4ff_0%,#f8fbff_35%,#f8fafc_70%,#eef2f7_100%)] px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-sm">
              Real-time inbox
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Notifications
            </h1>
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              One user, one notification card.
            </p>
          </div>

          {notifications.length > 0 && (
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleMarkAllRead}
              className="cursor-pointer inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm"
            >
              Mark all as read
              {totalUnread > 0 && (
                <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white">
                  {totalUnread}
                </span>
              )}
            </motion.button>
          )}
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            Loading notifications...
          </div>
        ) : groupedNotifications.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            No notifications yet
          </div>
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
                  transition={{ duration: 0.28, delay: index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleNotificationClick(group)}
                  className={`group relative w-full overflow-hidden rounded-[28px] border p-5 text-left shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition ${
                    unread
                      ? "border-blue-200 bg-[linear-gradient(135deg,#ffffff_0%,#eff6ff_100%)]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  {unread && (
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-blue-500" />
                  )}

                  <div className="cursor-pointer flex items-start gap-4">
                    <div
                      className={`mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-sm ${
                        unread
                          ? "border-blue-100 bg-white"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      {getNotificationIcon(latest?.type)}
                    </div>

                    <div className=" min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-base font-bold text-slate-900 md:text-lg">
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
                              <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white">
                                {group.unreadCount} new
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-sm font-medium text-slate-600">
                            {group.senderName}
                          </p>

                          <p className="mt-2 line-clamp-1 text-sm text-slate-500">
                            {latest?.text}
                          </p>

                          {latest?.reportId?.name && (
                            <p className="mt-2 text-xs font-medium text-slate-400">
                              Related item: {latest.reportId.name}
                            </p>
                          )}
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          <span className="text-xs font-medium text-slate-400">
                            {formatTimeAgo(latest?.createdAt)}
                          </span>

                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition group-hover:translate-x-1">
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
