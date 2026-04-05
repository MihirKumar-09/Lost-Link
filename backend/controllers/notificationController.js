import Notification from "../models/Notification.js";
import Message from "../models/Message.js";

export const getMyNotifications = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const notifications = await Notification.find({ userId: currentUserId })
      .populate("senderId", "name avatar email")
      .populate("reportId", "title itemName reportType")
      .populate("conversationId")
      .sort({ createdAt: -1 });

    return res.status(200).json({ notifications });
  } catch (error) {
    console.log("getMyNotifications error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { notificationId } = req.params;

    const notification = await Notification.findOne({
      _id: notificationId,
      userId: currentUserId,
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.isRead = true;
    await notification.save();

    return res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.log("markNotificationAsRead error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    await Notification.updateMany(
      { userId: currentUserId, isRead: false },
      { $set: { isRead: true } },
    );

    return res
      .status(200)
      .json({ message: "All notifications marked as read" });
  } catch (error) {
    console.log("markAllNotificationsAsRead error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUnreadCounts = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const notificationUnreadCount = await Notification.countDocuments({
      userId: currentUserId,
      isRead: false,
    });

    const messageUnreadCount = await Message.countDocuments({
      receiverId: currentUserId,
      isSeen: false,
    });

    return res.status(200).json({
      notificationUnreadCount,
      messageUnreadCount,
    });
  } catch (error) {
    console.log("getUnreadCounts error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
