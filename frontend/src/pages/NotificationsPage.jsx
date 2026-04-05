import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageSquare, CheckCircle, XCircle } from "lucide-react";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../services/notificationService";

import { useSocket } from "../Context/SocketContext";

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
        setNotifications(data.notifications || []);
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

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.isRead) {
        await markNotificationAsRead(notification._id);

        setNotifications((prev) =>
          prev.map((item) =>
            item._id === notification._id ? { ...item, isRead: true } : item,
          ),
        );
      }

      const conversationId =
        notification.conversationId?._id || notification.conversationId;

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

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>

          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
            >
              Mark all as read
            </button>
          )}
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            No notifications yet
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <button
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                className={`w-full rounded-2xl border p-4 text-left shadow-sm transition ${
                  notification.isRead
                    ? "border-slate-200 bg-white hover:bg-slate-50"
                    : "border-blue-200 bg-blue-50 hover:bg-blue-100/60"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-white p-2 shadow-sm">
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {notification.text}
                      </p>

                      {!notification.isRead && (
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
                      )}
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {notification.senderId?.name || "Someone"}
                    </p>

                    {notification.reportId?.name && (
                      <p className="mt-2 text-xs font-medium text-slate-400">
                        Related item: {notification.reportId.name}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
