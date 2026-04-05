import express from "express";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadCounts,
} from "../controllers/notificationController.js";
import protect from "../middleware/isLogin.js";

const router = express.Router();

router.get("/", protect, getMyNotifications);
router.get("/unread-counts", protect, getUnreadCounts);
router.patch("/read-all", protect, markAllNotificationsAsRead);
router.patch("/:notificationId/read", protect, markNotificationAsRead);

export default router;
