import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext";
import { createPortal } from "react-dom";
import {
  User,
  Mail,
  Phone,
  Globe,
  MoonStar,
  Monitor,
  Save,
  Sparkles,
  MapPin,
  Fingerprint,
  Info,
  LogOut,
  Trash2,
  ShieldAlert,
  X,
  TriangleAlert,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "../../lib/axios";

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: "easeOut",
    },
  }),
};

function InfoInput({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  disabled = false,
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        <Icon size={16} className="text-cyan-700 dark:text-cyan-300" />
        {label}
      </span>

      <div
        className={`group flex items-center gap-3 border px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 ${
          disabled
            ? "border-slate-200 bg-slate-100/80 opacity-80 dark:border-white/10 dark:bg-white/4 dark:opacity-70"
            : "border-slate-200 bg-white/75 hover:border-slate-300 focus-within:border-cyan-500/40 focus-within:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:focus-within:border-cyan-400/40 dark:focus-within:bg-white/[0.07]"
        }`}
      >
        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full bg-transparent text-sm outline-none ${
            disabled
              ? "cursor-not-allowed text-slate-500 placeholder:text-slate-400 dark:text-slate-400 dark:placeholder:text-slate-500"
              : "text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-400"
          }`}
        />
      </div>
    </label>
  );
}

function SelectInput({ icon: Icon, label, value, onChange, options = [] }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        <Icon size={16} className="text-cyan-700 dark:text-cyan-300" />
        {label}
      </span>

      <div className="border border-slate-200 bg-white/75 px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-slate-300 focus-within:border-cyan-500/40 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:focus-within:border-cyan-400/40">
        <select
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-sm text-slate-900 outline-none dark:text-white"
        >
          {options.map((item) => (
            <option
              key={item.value}
              value={item.value}
              className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white"
            >
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}

function DangerActionCard({
  icon: Icon,
  title,
  desc,
  iconClass = "",
  onClick,
  disabled = false,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { y: -4, scale: 1.01 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className="cursor-pointer group relative w-full overflow-hidden border border-white/10 bg-white/70 p-5 text-left shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white/5 dark:shadow-[0_14px_34px_rgba(0,0,0,0.18)] dark:hover:bg-white/[0.07]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.10),transparent_40%)]" />

      <div className="relative flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center border ${iconClass}`}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {desc}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function DeleteAccountModal({ open, onClose, onConfirm, deletingAccount }) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape" && !deletingAccount) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose, deletingAccount]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <motion.button
            type="button"
            aria-label="Close modal overlay"
            onClick={() => {
              if (!deletingAccount) onClose();
            }}
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-md dark:bg-black/70"
          />

          {/* modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative z-10 w-full max-w-xl overflow-hidden border border-red-400/20 bg-[linear-gradient(135deg,rgba(255,250,250,0.97),rgba(255,255,255,0.92),rgba(255,241,242,0.97))] shadow-[0_30px_90px_rgba(15,23,42,0.25)] dark:border-red-400/20 dark:bg-[linear-gradient(135deg,rgba(69,10,10,0.9),rgba(15,23,42,0.96),rgba(76,5,25,0.9))] dark:shadow-[0_30px_90px_rgba(0,0,0,0.52)]"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ x: [0, 20, -12, 0], y: [0, -12, 16, 0] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-10 top-0 h-40 w-40 bg-red-400/20 blur-3xl dark:bg-red-500/20"
              />
              <motion.div
                animate={{ x: [0, -18, 10, 0], y: [0, 14, -10, 0] }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-0 top-0 h-44 w-44 bg-orange-400/15 blur-3xl dark:bg-rose-500/20"
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[34px_34px] opacity-30 dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] dark:opacity-20" />
            </div>

            <div className="relative border-b border-red-400/20 px-5 py-5 sm:px-6">
              <button
                type="button"
                onClick={onClose}
                disabled={deletingAccount}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-slate-300/60 bg-white/70 text-slate-600 transition-all duration-300 hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="flex items-start gap-4 pr-12">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(239,68,68,0.18)",
                      "0 0 30px rgba(239,68,68,0.28)",
                      "0 0 0 rgba(239,68,68,0.18)",
                    ],
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-14 w-14 shrink-0 items-center justify-center border border-red-500/20 bg-red-500/10 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300"
                >
                  <TriangleAlert size={24} />
                </motion.div>

                <div>
                  <div className="mb-2 inline-flex items-center gap-2 border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200">
                    <ShieldAlert size={12} />
                    Dangerous Action
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Delete Your Account?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    This is permanent. Your profile and related account data may
                    be removed. You will be logged out immediately and this
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative px-5 py-5 sm:px-6">
              <div className="border border-red-400/20 bg-red-50/80 p-4 dark:bg-red-500/10">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Before you continue
                </h3>

                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>• You will lose access to this account.</li>
                  <li>
                    • Saved account-related data may be removed permanently.
                  </li>
                  <li>• This cannot be recovered later.</li>
                </ul>
              </div>

              <div className=" mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <motion.button
                  type="button"
                  onClick={onClose}
                  disabled={deletingAccount}
                  whileHover={deletingAccount ? {} : { y: -2 }}
                  whileTap={deletingAccount ? {} : { scale: 0.98 }}
                  className="inline-flex items-center justify-center border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-[0_10px_25px_rgba(15,23,42,0.08)] transition-all duration-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="button"
                  onClick={onConfirm}
                  disabled={deletingAccount}
                  whileHover={deletingAccount ? {} : { y: -2, scale: 1.01 }}
                  whileTap={deletingAccount ? {} : { scale: 0.98 }}
                  className=" inline-flex items-center justify-center gap-2 border border-red-500/30 bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(239,68,68,0.28)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 dark:border-red-400/30 dark:bg-[linear-gradient(135deg,#f43f5e,#be123c)] dark:shadow-[0_14px_30px_rgba(244,63,94,0.32)]"
                >
                  <Trash2 size={16} />
                  {deletingAccount
                    ? "Deleting Account..."
                    : "Yes, Delete Account"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default function SettingSection() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    language: "en",
    appearance: "dark",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { preference, setPreference } = useTheme();

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/auth/me", {
        withCredentials: true,
      });

      const user = res?.data?.user;

      setForm((prev) => ({
        ...prev,
        fullName: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        location: user?.location || "",
      }));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load user details",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      appearance: preference,
    }));
  }, [preference]);

  const handleSave = async () => {
    if (!form.fullName.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: form.fullName,
        phone: form.phone,
      };

      const res = await axios.put("/auth/update-profile", payload, {
        withCredentials: true,
      });

      const updatedUser = res?.data?.user;

      setForm((prev) => ({
        ...prev,
        fullName: updatedUser?.name || "",
        email: updatedUser?.email || prev.email,
        phone: updatedUser?.phone || "",
      }));

      toast.success(res?.data?.message || "Profile updated successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await axios.get("/auth/logout", {
        withCredentials: true,
      });

      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to log out");
    } finally {
      setLoggingOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setDeletingAccount(true);

      await axios.delete("/auth/delete-account", {
        withCredentials: true,
      });

      toast.success("Account deleted successfully");
      setShowDeleteModal(false);
      window.location.href = "/";
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete account. Check your backend route.",
      );
    } finally {
      setDeletingAccount(false);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden border border-slate-200/70 bg-[linear-gradient(135deg,rgba(248,250,252,0.96),rgba(240,249,255,0.96),rgba(236,253,245,0.96))] p-4 text-slate-900 shadow-[0_20px_80px_rgba(148,163,184,0.18)] sm:p-6 xl:p-7 dark:border-cyan-400/20 dark:bg-[linear-gradient(135deg,rgba(2,6,23,0.96),rgba(3,37,76,0.94),rgba(8,47,73,0.92))] dark:text-white dark:shadow-[0_20px_80px_rgba(2,6,23,0.55)]">
        <div className="animate-pulse space-y-6">
          <div className="h-24 border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5" />
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="h-80 border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5" />
            <div className="h-80 border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5" />
          </div>
          <div className="h-72 border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden border border-slate-200/70 bg-[linear-gradient(135deg,rgba(248,250,252,0.96),rgba(240,249,255,0.96),rgba(236,253,245,0.96))] p-4 text-slate-900 shadow-[0_20px_80px_rgba(148,163,184,0.18)] sm:p-6 xl:p-7 dark:border-cyan-400/20 dark:bg-[linear-gradient(135deg,rgba(2,6,23,0.96),rgba(3,37,76,0.94),rgba(8,47,73,0.92))] dark:text-white dark:shadow-[0_20px_80px_rgba(2,6,23,0.55)]">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-16 top-10 h-52 w-52 bg-cyan-500/10 blur-3xl dark:bg-cyan-400/10"
          />

          <motion.div
            animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-0 h-72 w-72 bg-blue-500/10 blur-3xl"
          />

          <motion.div
            animate={{ x: [0, 25, -10, 0], y: [0, -20, 25, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-1/3 h-72 w-72 bg-emerald-400/10 blur-3xl dark:bg-sky-400/10"
          />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[42px_42px] opacity-40 dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] dark:opacity-20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6 flex flex-col gap-4 border border-slate-200/70 bg-white/70 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between dark:border-white/10 dark:bg-white/4 dark:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
          >
            <div>
              <div className="mb-2 inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-200">
                <Sparkles size={14} />
                Settings Panel
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Manage Your Account
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-3"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="group relative inline-flex items-center gap-3 overflow-hidden border border-cyan-500/20 bg-white/70 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-cyan-400/20 dark:bg-white/5 dark:shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                >
                  <motion.div
                    animate={{ x: [0, 18, -8, 0], y: [0, -6, 6, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute -left-6 top-0 h-16 w-16 bg-cyan-500/20 blur-2xl dark:bg-cyan-400/20"
                  />

                  <motion.div
                    animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.08, 1] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative flex h-10 w-10 items-center justify-center border border-cyan-500/20 bg-cyan-500/10 text-cyan-700 shadow-[0_0_25px_rgba(6,182,212,0.16)] dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:shadow-[0_0_25px_rgba(34,211,238,0.18)]"
                  >
                    <Fingerprint size={18} />
                  </motion.div>

                  <div className="relative flex flex-col">
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="text-sm font-semibold tracking-wide text-slate-900 sm:text-base dark:text-white"
                    >
                      Profile, preferences and account control
                    </motion.p>

                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.22, duration: 0.4 }}
                      className="text-xs text-slate-500 dark:text-slate-400"
                    >
                      Clean structure with only the settings that actually
                      matter
                    </motion.span>
                  </div>

                  <motion.div
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(6,182,212,0.08),transparent)] dark:bg-[linear-gradient(120deg,transparent,rgba(34,211,238,0.08),transparent)]"
                  />
                </motion.div>
              </motion.div>
            </div>

            <motion.button
              type="button"
              onClick={handleSave}
              disabled={saving}
              whileHover={{ scale: saving ? 1 : 1.04, y: saving ? 0 : -2 }}
              whileTap={{ scale: saving ? 1 : 0.97 }}
              className="inline-flex cursor-pointer items-center justify-center gap-2 border border-cyan-500/30 bg-[linear-gradient(135deg,#06b6d4,#2563eb)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(37,99,235,0.28)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 dark:border-cyan-300/30 dark:bg-[linear-gradient(135deg,#0ea5e9,#2563eb)] dark:shadow-[0_14px_34px_rgba(37,99,235,0.35)]"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <motion.section
              custom={0}
              variants={cardVariants}
              initial="hidden"
              animate="show"
              className="border border-slate-200/70 bg-white/70 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center border border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
                  <User size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Account Information
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Update your basic profile details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InfoInput
                  icon={User}
                  label="Full Name"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                />

                <InfoInput
                  icon={Mail}
                  label="Email Address"
                  type="email"
                  value={form.email}
                  disabled
                  placeholder="Email not available"
                />

                <InfoInput
                  icon={Phone}
                  label="Phone Number"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Not provided"
                />

                <InfoInput
                  icon={MapPin}
                  label="Location"
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Not provided"
                  disabled
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-4 inline-flex items-start gap-2 border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-700 backdrop-blur-sm dark:text-amber-200"
              >
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-0.5"
                >
                  <Info size={14} />
                </motion.div>

                <p className="leading-5">
                  Email & Location are not editable yet
                </p>
              </motion.div>
            </motion.section>

            <motion.section
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate="show"
              className="border border-slate-200/70 bg-white/70 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center border border-violet-500/20 bg-violet-500/10 text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
                  <Globe size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Preferences
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    App appearance and language
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <SelectInput
                  icon={Globe}
                  label="Language"
                  value={form.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                  options={[{ label: "English", value: "en" }]}
                />

                <SelectInput
                  icon={form.appearance === "dark" ? MoonStar : Monitor}
                  label="Appearance"
                  value={form.appearance}
                  onChange={(e) => {
                    const selectedTheme = e.target.value;
                    handleChange("appearance", selectedTheme);
                    setPreference(selectedTheme);
                    toast.success(`Theme changed to ${selectedTheme}`);
                  }}
                  options={[
                    { label: "Dark", value: "dark" },
                    { label: "Light", value: "light" },
                    { label: "System Default", value: "system" },
                  ]}
                />
              </div>
            </motion.section>
          </div>

          <motion.section
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="mt-6 overflow-hidden border border-red-400/20 bg-[linear-gradient(135deg,rgba(255,244,244,0.92),rgba(255,255,255,0.78),rgba(255,241,242,0.92))] shadow-[0_18px_48px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-[linear-gradient(135deg,rgba(69,10,10,0.55),rgba(15,23,42,0.72),rgba(76,5,25,0.55))] dark:shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
          >
            <div className="border-b border-red-400/20 px-5 py-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center border border-red-500/20 bg-red-500/10 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300">
                  <ShieldAlert size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Danger Zone
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Sensitive actions. Think before you click.
                  </p>
                </div>
              </div>
            </div>

            <div className=" grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
              <DangerActionCard
                icon={LogOut}
                title={loggingOut ? "Logging Out..." : "Log Out"}
                desc="End your current session and securely sign out from this device."
                iconClass="border-amber-500/20 bg-amber-500/10 text-amber-700 dark:border-amber-300/20 dark:bg-amber-400/10 dark:text-amber-300"
                onClick={handleLogout}
                disabled={loggingOut}
              />

              <DangerActionCard
                icon={Trash2}
                title={
                  deletingAccount ? "Deleting Account..." : "Delete Account"
                }
                desc="Permanent action. Your account and related data may be removed permanently."
                iconClass=" border-red-500/20 bg-red-500/10 text-red-700 dark:border-red-300/20 dark:bg-red-400/10 dark:text-red-300"
                onClick={() => setShowDeleteModal(true)}
                disabled={deletingAccount}
              />
            </div>
          </motion.section>
        </div>
      </div>

      <DeleteAccountModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        deletingAccount={deletingAccount}
      />
    </>
  );
}
