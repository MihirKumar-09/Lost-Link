import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Inbox,
  Send,
  MessageCircle,
  Clock3,
  CheckCircle2,
  XCircle,
  Package,
  ArrowUpRight,
  User2,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../lib/axios";

function getStatusStyles(status) {
  switch (status) {
    case "accepted":
      return "border-emerald-400/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
    case "pending":
      return "border-amber-400/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";
    case "rejected":
      return "border-red-400/30 bg-red-500/10 text-red-700 dark:text-red-300";
    case "completed":
      return "border-cyan-400/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300";
    default:
      return "border-slate-300/30 bg-slate-500/10 text-slate-700 dark:text-slate-300";
  }
}

function formatStatus(status) {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1).replaceAll("_", " ");
}

function formatAction(action) {
  if (!action) return "Claim action";
  return action.replaceAll("_", " ");
}

function ClaimCard({ claim, type }) {
  const report = claim?.reportId;
  const otherUser = type === "sent" ? claim?.reportOwnerId : claim?.claimantId;

  const statusClass = getStatusStyles(claim?.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative overflow-hidden border border-slate-200/70 bg-white/70 p-4 shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_16px_34px_rgba(0,0,0,0.22)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.06),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.06),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_30%)]" />

      <div className="relative flex flex-col gap-4 md:flex-row">
        <div className="h-28 w-full shrink-0 overflow-hidden border border-slate-200/70 bg-slate-100 md:h-32 md:w-36 dark:border-white/10 dark:bg-white/5">
          {report?.image ? (
            <img
              src={report.image}
              alt={report?.name || "Report"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-400">
              <Package size={28} />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold text-slate-900 dark:text-white">
                {report?.name || "Unnamed Report"}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {report?.category || "Unknown category"} •{" "}
                {claim?.reportType || "Unknown type"}
              </p>
            </div>

            <span
              className={`inline-flex items-center gap-2 border px-3 py-1 text-xs font-semibold capitalize ${statusClass}`}
            >
              {claim?.status === "accepted" && <CheckCircle2 size={14} />}
              {claim?.status === "pending" && <Clock3 size={14} />}
              {claim?.status === "rejected" && <XCircle size={14} />}
              {!["accepted", "pending", "rejected"].includes(claim?.status) && (
                <ShieldCheck size={14} />
              )}
              {formatStatus(claim?.status)}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <User2 size={14} />
              {type === "sent" ? "Owner" : "Claimant"}:{" "}
              <span className="font-medium text-slate-800 dark:text-white">
                {otherUser?.name || "Unknown user"}
              </span>
            </p>

            <p className="capitalize">
              Action:{" "}
              <span className="font-medium text-slate-800 dark:text-white">
                {formatAction(claim?.initiatedByAction)}
              </span>
            </p>

            <p>
              Created:{" "}
              <span className="font-medium text-slate-800 dark:text-white">
                {claim?.createdAt
                  ? new Date(claim.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>

            <p>
              Last activity:{" "}
              <span className="font-medium text-slate-800 dark:text-white">
                {claim?.lastMessageAt
                  ? new Date(claim.lastMessageAt).toLocaleString()
                  : "No activity"}
              </span>
            </p>
          </div>

          <div className="mt-3 border border-slate-200/70 bg-white/60 p-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">
              Last Message:
            </span>{" "}
            {claim?.lastMessage || "No message yet"}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {claim?.status === "accepted" && (
              <Link
                to="/messages"
                className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-700 transition-all duration-300 hover:bg-cyan-500/15 dark:text-cyan-300"
              >
                <MessageCircle size={16} />
                Open Conversation
              </Link>
            )}

            <Link
              to={report?._id ? `/lostItem/${report._id}` : "#"}
              className="inline-flex items-center gap-2 border border-slate-300/60 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              <ArrowUpRight size={16} />
              View Report
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MyClaimSection() {
  const [sentClaims, setSentClaims] = useState([]);
  const [receivedClaims, setReceivedClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("sent");

  const fetchMyClaims = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/reports/claims/my-claims", {
        withCredentials: true,
      });

      setSentClaims(res?.data?.sentClaims || []);
      setReceivedClaims(res?.data?.receivedClaims || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load claims");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyClaims();
  }, []);

  const currentList = useMemo(() => {
    return activeTab === "sent" ? sentClaims : receivedClaims;
  }, [activeTab, sentClaims, receivedClaims]);

  if (loading) {
    return (
      <section className="space-y-4 p-4 sm:p-6">
        <div className="h-24 animate-pulse border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5" />
        <div className="h-40 animate-pulse border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5" />
        <div className="h-40 animate-pulse border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5" />
      </section>
    );
  }

  return (
    <section className="relative min-h-full overflow-hidden p-4 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 border border-slate-200/70 bg-white/70 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_16px_40px_rgba(0,0,0,0.22)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              My Claims
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Track claim requests, conversation progress, and latest activity.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("sent")}
              className={`inline-flex items-center gap-2 border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                activeTab === "sent"
                  ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
                  : "border-slate-300/60 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              }`}
            >
              <Send size={16} />
              Sent Claims ({sentClaims.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("received")}
              className={`inline-flex items-center gap-2 border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                activeTab === "received"
                  ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
                  : "border-slate-300/60 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              }`}
            >
              <Inbox size={16} />
              Received Claims ({receivedClaims.length})
            </button>
          </div>
        </div>
      </div>

      {currentList.length === 0 ? (
        <div className="border border-slate-200/70 bg-white/70 p-10 text-center shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_16px_40px_rgba(0,0,0,0.22)]">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {activeTab === "sent" ? "No Sent Claims" : "No Received Claims"}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {activeTab === "sent"
              ? "You have not started any claim yet."
              : "No one has claimed your reports yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((claim) => (
            <ClaimCard key={claim._id} claim={claim} type={activeTab} />
          ))}
        </div>
      )}
    </section>
  );
}
