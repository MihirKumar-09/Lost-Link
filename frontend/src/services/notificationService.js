import axios from "../lib/axios";

export const getNotifications = async () => {
  const { data } = await axios.get("/notifications");
  return data;
};

export const getUnreadCounts = async () => {
  const { data } = await axios.get("/notifications/unread-counts");
  return data;
};

export const markNotificationAsRead = async (notificationId) => {
  const { data } = await axios.patch(`/notifications/${notificationId}/read`);
  return data;
};

export const markAllNotificationsAsRead = async () => {
  const { data } = await axios.patch("/notifications/read-all");
  return data;
};
