import Notification from "../models/Notification.js";
import { getIO, getReceiverSocketId } from "../socket/socket.js";

const emitNotification = async ({
  userId,
  senderId,
  conversationId = null,
  reportId = null,
  type,
  text,
}) => {
  const notification = await Notification.create({
    userId,
    senderId,
    conversationId,
    reportId,
    type,
    text,
  });

  const populatedNotification = await Notification.findById(notification._id)
    .populate("senderId", "name avatar email")
    .populate("conversationId")
    .populate("reportId", "title itemName reportType");

  const socketId = getReceiverSocketId(userId);
  const io = getIO();

  if (socketId && io) {
    io.to(socketId).emit("new_notification", populatedNotification);
  }

  return populatedNotification;
};

export default emitNotification;
