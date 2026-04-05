import express from "express";
import {
  getMessagesByConversation,
  sendMessage,
  markMessagesSeen,
} from "../controllers/messageController.js";
import protect from "../middleware/isLogin.js";

const router = express.Router();

router.get("/:conversationId", protect, getMessagesByConversation);
router.post("/:conversationId", protect, sendMessage);
router.patch("/:conversationId/seen", protect, markMessagesSeen);

export default router;
