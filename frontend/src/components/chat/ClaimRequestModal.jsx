import { useState } from "react";
import { createClaimRequest } from "../../services/conversationService";
import { toast } from "react-toastify";

export default function ClaimRequestModal({ open, onClose, report }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const isFoundReport = report?.reportType === "found";

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error("Please enter your message");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        reportId: report._id,
        text,
        initiatedByAction: isFoundReport ? "this_is_mine" : "i_found_this",
      };

      await createClaimRequest(payload);
      toast.success("Request sent successfully");
      setText("");
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-900">
          {isFoundReport
            ? "Claim this item"
            : "Tell the reporter you found this"}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {isFoundReport
            ? "Send one proof message explaining why this item belongs to you."
            : "Send one message explaining where and how you found this item."}
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="mt-5 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          placeholder={
            isFoundReport
              ? "Example: This belongs to me. It had..."
              : "Example: I found this near..."
          }
        />

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-2xl bg-blue-600 px-5 py-2.5 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
}
