import express from "express";
import protect from "../middleware/isLogin.js";
import {
  createClaimRequest,
  getMyConversations,
  getConversationById,
  acceptConversationRequest,
  rejectConversationRequest,
} from "../controllers/conversationController.js";

const router = express.Router();

router.post("/request", protect, createClaimRequest);
router.get("/", protect, getMyConversations);
router.get("/:conversationId", protect, getConversationById);
router.patch("/:conversationId/accept", protect, acceptConversationRequest);
router.patch("/:conversationId/reject", protect, rejectConversationRequest);

export default router;
