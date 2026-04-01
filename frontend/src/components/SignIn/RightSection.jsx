import { FcGoogle } from "react-icons/fc";
import { Lock, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import PhoneAuth from "./PhoneAuth";

export default function RightSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_top,#f8fafc_0%,#eef2ff_35%,#e2e8f0_100%)] md:w-1/2">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-16 right-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-10 left-8 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl"
        />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="rounded-[28px] border border-white/50 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.15)] backdrop-blur-xl sm:p-8"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 shadow-sm"
            >
              <motion.span
                animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2.4 }}
              >
                <Sparkles size={14} />
              </motion.span>
              Secure Sign In
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="mt-5">
              <h3 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to track reports, manage claims, and stay connected with
                the Lost Link community.
              </p>
            </motion.div>

            {/* Google Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                window.location.href = "http://localhost:8080/auth/google";
              }}
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:shadow-md"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <FcGoogle size={22} />
              </motion.span>
              Continue with Google
            </motion.button>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="my-6 flex items-center"
            >
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-300 to-transparent" />
              <span className="mx-4 text-xs font-semibold tracking-[0.2em] text-slate-400">
                OR
              </span>
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-300 to-transparent" />
            </motion.div>

            {/* Phone auth */}
            <motion.div variants={itemVariants}>
              <PhoneAuth />
            </motion.div>

            {/* Footer link */}
            <motion.p
              variants={itemVariants}
              className="mt-5 text-center text-sm text-slate-500"
            >
              Don&apos;t have an account?{" "}
              <a
                className="font-semibold text-orange-600 transition hover:text-orange-700"
                href="http://localhost:5173/signUp"
              >
                Sign up for free
              </a>
            </motion.p>

            {/* Security blocks */}
            <motion.div
              variants={itemVariants}
              className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-3 py-3 text-sm text-slate-700"
              >
                <motion.span
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-emerald-600"
                >
                  <Lock size={16} />
                </motion.span>
                Secure Authentication
              </motion.div>

              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/80 px-3 py-3 text-sm text-slate-700"
              >
                <motion.span
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                  className="text-blue-600"
                >
                  <ShieldCheck size={16} />
                </motion.span>
                Information Kept Private
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
