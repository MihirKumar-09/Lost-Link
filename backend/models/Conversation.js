import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },
    claimantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reportOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reportType: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },
    initiatedByAction: {
      type: String,
      enum: ["this_is_mine", "i_found_this"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    lastMessage: {
      type: String,
      default: "",
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    isBlockedAfterReject: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Block duplicate request on same report;
conversationSchema.index({ reportId: 1, claimantId: 1 }, { unique: true });

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
