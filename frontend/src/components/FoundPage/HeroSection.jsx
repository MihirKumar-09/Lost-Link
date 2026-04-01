import { CirclePlus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden px-3 sm:px-5 md:px-12 py-10 md:py-16"
      style={{
        background:
          "linear-gradient(135deg, #FDF1EC 0%, #FDDCCB 42%, #FBEAE4 100%)",
      }}
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-10 h-56 w-56 rounded-full bg-orange-300/25 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-orange-200/25 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-10 md:flex-row md:gap-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex w-full max-w-2xl flex-col"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55 }}
            className="mb-4 w-fit rounded-full border border-white/60 bg-white/55 px-4 py-2 shadow-[0_8px_30px_rgba(255,255,255,0.22)] backdrop-blur-md"
          >
            <p className="text-sm font-semibold tracking-wide text-orange-600">
              Community Powered Recovery
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="text-black font-bold text-4xl leading-tight sm:text-5xl md:text-6xl"
          >
            Recently Found
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="text-4xl leading-tight sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-orange-500 via-pink-500 to-orange-600 bg-clip-text text-transparent"
          >
            Items Near You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
            className="mt-5 max-w-xl text-[15px] leading-7 text-slate-600 sm:text-base"
          >
            Browse items found by the community and help reunite them with their
            owners. Every report counts.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <div className="rounded-2xl border border-white/60 bg-white/65 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-md">
              <p className="text-lg font-bold text-slate-900">500+</p>
              <p className="text-xs text-slate-500">Reports shared</p>
            </div>

            <div className="rounded-2xl border border-white/60 bg-white/65 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-md">
              <p className="text-lg font-bold text-slate-900">Fast</p>
              <p className="text-xs text-slate-500">Community updates</p>
            </div>

            <div className="rounded-2xl border border-white/60 bg-white/65 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-md">
              <p className="text-lg font-bold text-slate-900">Trusted</p>
              <p className="text-xs text-slate-500">Verified reports</p>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.55 }}
            className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link to="/found-item-form">
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3.5 font-semibold text-white shadow-[0_16px_40px_rgba(249,115,22,0.28)] transition hover:bg-orange-600 cursor-pointer"
              >
                <CirclePlus size={19} />
                <span>Report Found Item</span>
              </motion.button>
            </Link>

            <Link to="/lost-item">
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-5 py-3.5 font-semibold text-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-md transition hover:bg-white cursor-pointer"
              >
                <span>Browse Lost Items</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 45, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto w-full sm:w-[85%] md:w-[45%] lg:w-[38%]"
        >
          {/* floating card effect */}
          <div className="absolute -left-4 top-8 hidden h-20 w-20 rounded-3xl bg-white/35 blur-2xl sm:block" />
          <div className="absolute -right-4 bottom-8 hidden h-24 w-24 rounded-full bg-orange-300/25 blur-3xl sm:block" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/40 p-2 shadow-[0_25px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/35 via-transparent to-white/10 pointer-events-none" />

            <img
              src="/images/FoundPage/hero.png"
              alt="Hero"
              className="relative z-10 h-auto w-full rounded-[22px] object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
