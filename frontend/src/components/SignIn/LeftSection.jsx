import { motion } from "framer-motion";
import { Sparkles, Globe, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function LeftSection() {
  return (
    <section className="relative hidden overflow-hidden md:block md:w-1/2">
      <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-linear-to-b from-[#012662] via-[#0A2B63] to-[#0D172E] px-8 py-12 lg:px-16">
        {/* Background glow layers */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-10 top-12 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 18, 0], x: [0, -14, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_28%)]" />
        </div>

        {/* Top Content */}
        <div className="relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md"
          >
            <motion.span
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="text-orange-300"
            >
              <Sparkles size={15} />
            </motion.span>
            <span className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">
              Trusted Recovery Network
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="text-white text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
          >
            Welcome Back to <br />
            <span className="bg-linear-to-r from-white via-blue-100 to-orange-200 bg-clip-text text-transparent">
              Lost Link
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="mt-6 text-sm leading-relaxed text-white/75 sm:text-base"
          >
            Log in to track your lost items or help others recover theirs.
            Access a secure platform built to reconnect people with what
            matters.
          </motion.p>

          {/* Feature chips */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 backdrop-blur-md">
              <motion.span
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-cyan-300"
              >
                <Globe size={16} />
              </motion.span>
              <span className="text-sm text-white/85">Global Community</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 backdrop-blur-md">
              <motion.span
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="text-emerald-300"
              >
                <ShieldCheck size={16} />
              </motion.span>
              <span className="text-sm text-white/85">Secure Access</span>
            </div>
          </motion.div>

          {/* Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative mt-10 max-w-sm overflow-hidden rounded-[26px] border border-white/15 bg-white/10 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-transparent to-white/10" />
            <img
              src="/images/SignIn/leftSection.png"
              alt="Left Section"
              className="relative z-10 h-full w-full rounded-[20px] object-cover transition duration-500 group-hover:scale-[1.03]"
            />

            <motion.div
              animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-white">
                Active Community
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28 }}
          className="relative z-10 mt-10"
        >
          <div className="w-fit max-w-sm rounded-3xl border border-white/12 bg-white/10 p-5 shadow-lg backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="mt-0.5 rounded-full bg-white/10 p-2 text-orange-300"
              >
                <ArrowUpRight size={18} />
              </motion.div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Thousands of items returned
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/65 sm:text-sm">
                  Our community helps people reconnect with lost belongings
                  through fast reporting, trusted verification, and real-time
                  updates.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
