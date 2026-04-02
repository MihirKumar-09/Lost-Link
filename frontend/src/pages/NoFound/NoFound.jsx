import { Bug, HeartPlus, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NoFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-[linear-gradient(135deg,#0B1324_0%,#0D1B38_50%,#101D3A_100%)]">
      {/* animated background blobs */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -30, 30, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      />

      {/* glass card container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl w-full rounded-4xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
      >
        {/* top glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/80 to-transparent" />

        {/* image */}
        <motion.img
          src="/images/NoFound/NoFound.png"
          alt="404-OOPs"
          className="mx-auto w-48 sm:w-56 md:w-64 lg:w-72 mb-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* title */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          404 — Lost in Space
        </h1>

        {/* subtitle */}
        <p className="mt-3 text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-6">
          This page vanished like a lost wallet. Don’t worry — we’ll get you
          back where things make sense.
        </p>

        {/* primary button */}
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="mt-6 flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow-[0_12px_30px_rgba(59,130,246,0.35)]"
          >
            <LayoutDashboard size={20} />
            Back to Dashboard
          </motion.button>
        </Link>

        {/* secondary actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition"
          >
            <Bug size={18} />
            Report a Bug
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition"
          >
            <HeartPlus size={18} />
            Contact Support
          </motion.button>
        </div>
      </motion.div>

      {/* subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-size-[28px_28px]" />
    </div>
  );
}
