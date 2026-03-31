import {
  CirclePlus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden px-3 py-12 text-center sm:px-5 md:px-10 md:py-16">
      {/* outer glow */}
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-17.5 top-20 h-64 w-64 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-100/30 blur-3xl" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative mx-auto overflow-hidden rounded-[34px] border border-white/70 px-5 py-12 shadow-[0_30px_80px_rgba(251,146,60,0.14)] sm:px-6 md:px-10"
        style={{
          background:
            "linear-gradient(135deg, #FFF8F5 0%, #FDF0EB 30%, #FAF5F3 65%, #FFF9F7 100%)",
        }}
      >
        {/* animated background layers */}
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -14, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -left-7.5 -top-5 h-40 w-40 rounded-full bg-orange-300/20 blur-2xl"
        />

        <motion.div
          animate={{
            x: [0, -18, 0],
            y: [0, 14, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -bottom-10 -right-5 h-48 w-48 rounded-full bg-pink-300/20 blur-3xl"
        />

        <motion.div
          animate={{ rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute right-10 top-10 h-24 w-24 rounded-full border border-orange-200/50 bg-white/40 blur-sm"
        />

        {/* subtle grid shine */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-size-[40px_40px] opacity-30" />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -2, scale: 1.02 }}
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/75 px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm backdrop-blur-md"
          >
            <Sparkles size={16} />
            #1 Community Tracking App
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-extrabold tracking-tight text-black sm:text-5xl md:text-6xl"
          >
            Lost Something?
          </motion.h1>

          <motion.h1
            variants={fadeUp}
            className="mt-2 text-4xl font-extrabold tracking-tight md:text-6xl"
          >
            <span className="bg-linear-to-r from-orange-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Let the Community Help You.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base md:text-lg"
          >
            Connect with thousands of active local tracers to recover your lost
            belongings. Fast, secure, and community-driven.
          </motion.p>

          {/* mini feature pills */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm text-gray-700 shadow-sm backdrop-blur"
            >
              <Search size={16} className="text-orange-500" />
              Local Matching
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm text-gray-700 shadow-sm backdrop-blur"
            >
              <ShieldCheck size={16} className="text-orange-500" />
              Safe & Trusted
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col flex-nowrap gap-4 sm:flex-row sm:gap-6"
          >
            <Link to="/lost-item-form">
              <motion.button
                whileHover={{
                  y: -4,
                  scale: 1.03,
                  boxShadow: "0px 18px 40px rgba(249,115,22,0.28)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="group flex items-center gap-2 rounded-2xl bg-linear-to-r from-orange-500 via-orange-500 to-pink-500 px-6 py-3.5 font-semibold text-white shadow-xl cursor-pointer"
              >
                <motion.span
                  animate={{ rotate: [0, 8, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <CirclePlus />
                </motion.span>
                <span>Report Lost Item</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </motion.button>
            </Link>

            <Link to="/found-item">
              <motion.button
                whileHover={{
                  y: -4,
                  scale: 1.03,
                  boxShadow: "0px 16px 34px rgba(0,0,0,0.08)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="rounded-2xl border border-orange-100 bg-white/90 px-6 py-3.5 font-semibold text-gray-800 shadow-lg backdrop-blur cursor-pointer hover:border-orange-200"
              >
                Browse Found Items
              </motion.button>
            </Link>
          </motion.div>

          {/* bottom glass stats strip */}
          <motion.div
            variants={fadeUp}
            className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
          >
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/80 bg-white/70 px-4 py-4 shadow-sm backdrop-blur"
            >
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p className="mt-1 text-sm text-gray-500">Community Active</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/80 bg-white/70 px-4 py-4 shadow-sm backdrop-blur"
            >
              <p className="text-2xl font-bold text-gray-900">Fast</p>
              <p className="mt-1 text-sm text-gray-500">Lost Item Reporting</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/80 bg-white/70 px-4 py-4 shadow-sm backdrop-blur"
            >
              <p className="text-2xl font-bold text-gray-900">Secure</p>
              <p className="mt-1 text-sm text-gray-500">Trusted Community</p>
            </motion.div>
          </motion.div>
        </div>

        {/* shine */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white/35 to-transparent" />
      </motion.div>
    </section>
  );
}
