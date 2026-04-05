import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import Report from "../models/reportSchema.js";
import emitNotification from "../utils/emitNotification.js";
import { getIO, getReceiverSocketId } from "../socket/socket.js";

export const createClaimRequest = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { reportId, text, initiatedByAction } = req.body;

    if (!reportId || !text || !initiatedByAction) {
      return res.status(400).json({
        message: "reportId, text and initiatedByAction are required",
      });
    }

    if (!["this_is_mine", "i_found_this"].includes(initiatedByAction)) {
      return res.status(400).json({
        message: "Invalid initiatedByAction",
      });
    }

    const report = await Report.findById(reportId).populate(
      "userId",
      "name avatar",
    );
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (String(report.userId._id) === String(currentUserId)) {
      return res.status(400).json({
        message: "You cannot request on your own report",
      });
    }

    if (report.status !== "open") {
      return res.status(400).json({
        message: "This report is no longer open",
      });
    }

    const existingConversation = await Conversation.findOne({
      reportId,
      claimantId: currentUserId,
    });

    if (existingConversation) {
      return res.status(400).json({
        message: "You have already sent a request for this report",
      });
    }

    const conversation = await Conversation.create({
      reportId,
      claimantId: currentUserId,
      reportOwnerId: report.userId._id,
      reportType: report.reportType,
      initiatedByAction,
      status: "pending",
      lastMessage: text,
      lastMessageAt: new Date(),
    });

    const firstMessage = await Message.create({
      conversationId: conversation._id,
      senderId: currentUserId,
      receiverId: report.userId._id,
      text,
      messageType: "initial_proof",
    });

    await emitNotification({
      userId: report.userId._id,
      senderId: currentUserId,
      conversationId: conversation._id,
      reportId: report._id,
      type: "claim_request",
      text: "You received a new claim/request message",
    });

    const populatedConversation = await Conversation.findById(conversation._id)
      .populate("claimantId", "name avatar email")
      .populate("reportOwnerId", "name avatar email")
      .populate("reportId", "title itemName reportType images status");

    const receiverSocketId = getReceiverSocketId(report.userId._id);
    const io = getIO();

    if (receiverSocketId && io) {
      io.to(receiverSocketId).emit("claim_request_received", {
        conversation: populatedConversation,
        message: firstMessage,
      });
    }

    return res.status(201).json({
      message: "Claim request sent successfully",
      conversation: populatedConversation,
      firstMessage,
    });
  } catch (error) {
    console.log("createClaimRequest error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMyConversations = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const conversations = await Conversation.find({
      $or: [{ claimantId: currentUserId }, { reportOwnerId: currentUserId }],
    })
      .populate("claimantId", "name avatar email")
      .populate("reportOwnerId", "name avatar email")
      .populate("reportId", "title itemName reportType images status")
      .sort({ updatedAt: -1 });

    return res.status(200).json({ conversations });
  } catch (error) {
    console.log("getMyConversations error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getConversationById = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId)
      .populate("claimantId", "name avatar email")
      .populate("reportOwnerId", "name avatar email")
      .populate("reportId", "title itemName reportType images status");

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const isParticipant =
      String(conversation.claimantId._id) === String(currentUserId) ||
      String(conversation.reportOwnerId._id) === String(currentUserId);

    if (!isParticipant) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    return res.status(200).json({ conversation });
  } catch (error) {
    console.log("getConversationById error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const acceptConversationRequest = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    if (String(conversation.reportOwnerId) !== String(currentUserId)) {
      return res.status(403).json({ message: "Only report owner can accept" });
    }

    if (conversation.status !== "pending") {
      return res.status(400).json({ message: "Conversation is not pending" });
    }

    conversation.status = "accepted";
    await conversation.save();

    await emitNotification({
      userId: conversation.claimantId,
      senderId: currentUserId,
      conversationId: conversation._id,
      reportId: conversation.reportId,
      type: "claim_accepted",
      text: "Your request was accepted. Chat is now unlocked.",
    });

    const updatedConversation = await Conversation.findById(conversationId)
      .populate("claimantId", "name avatar email")
      .populate("reportOwnerId", "name avatar email")
      .populate("reportId", "title itemName reportType images status");

    const claimantSocketId = getReceiverSocketId(conversation.claimantId);
    const io = getIO();

    if (claimantSocketId && io) {
      io.to(claimantSocketId).emit("request_accepted", updatedConversation);
    }

    return res.status(200).json({
      message: "Request accepted successfully",
      conversation: updatedConversation,
    });
  } catch (error) {
    console.log("acceptConversationRequest error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const rejectConversationRequest = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    if (String(conversation.reportOwnerId) !== String(currentUserId)) {
      return res.status(403).json({ message: "Only report owner can reject" });
    }

    if (conversation.status !== "pending") {
      return res.status(400).json({ message: "Conversation is not pending" });
    }

    conversation.status = "rejected";
    conversation.isBlockedAfterReject = true;
    await conversation.save();

    await emitNotification({
      userId: conversation.claimantId,
      senderId: currentUserId,
      conversationId: conversation._id,
      reportId: conversation.reportId,
      type: "claim_rejected",
      text: "Your request was rejected.",
    });

    const claimantSocketId = getReceiverSocketId(conversation.claimantId);
    const io = getIO();

    if (claimantSocketId && io) {
      io.to(claimantSocketId).emit("request_rejected", {
        conversationId: conversation._id,
      });
    }

    return res.status(200).json({
      message: "Request rejected successfully",
      conversation,
    });
  } catch (error) {
    console.log("rejectConversationRequest error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
