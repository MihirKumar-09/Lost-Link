import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_35%)]" />
      <div className="absolute top-10 -left-15 h-40 w-40 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute bottom-0 -right-10 h-52 w-52 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-between gap-12 px-4 py-12 sm:px-6 lg:flex-row lg:px-10 lg:py-20">
        {/* Left Content */}
        <motion.div
          initial="hidden"
          animate="show"
          className="max-w-2xl text-center lg:text-left"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur"
          >
            <Sparkles size={16} />
            Community Powered Lost & Found Platform
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={0.1}
            className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Lost Something?
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            custom={0.2}
            className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
          >
            <span className="bg-linear-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Let the Community Help You Find It
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.3}
            className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg lg:mx-0"
          >
            Lost Link helps people reconnect with their valuable belongings
            through a safe, trusted, and community-driven lost and found
            network. Report items, explore matches, and recover faster.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.4}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start"
          >
            <Link to="/lost-item">
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer group flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-600 sm:min-w-45"
              >
                Report Lost Item
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </motion.button>
            </Link>

            <Link to="/found-item">
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-800 shadow-md transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 sm:min-w-45"
              >
                I Found Something
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.5}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <Search size={18} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">
                  Smart Reports
                </p>
                <p className="text-xs text-gray-500">Quick item submission</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <div className="rounded-full bg-green-100 p-2 text-green-600">
                <ShieldCheck size={18} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">
                  Safe & Trusted
                </p>
                <p className="text-xs text-gray-500">Secure reporting flow</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                <MapPin size={18} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">
                  Nearby Support
                </p>
                <p className="text-xs text-gray-500">
                  Community-driven recovery
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md lg:max-w-xl"
        >
          {/* Floating Card */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[28px] border border-white/40 bg-white/70 p-3 shadow-2xl backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-100/40 via-transparent to-purple-100/40" />
            <img
              src="/images/Home/Hero.png"
              alt="Lost Link Hero"
              className="relative z-10 h-auto w-full rounded-2xl object-cover"
            />
          </motion.div>

          {/* Floating Mini Badge 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.5 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -left-2.5 top-[15%] hidden rounded-2xl bg-white px-4 py-3 shadow-xl md:block"
          >
            <p className="text-xs text-gray-500">Recovery Rate</p>
            <p className="text-lg font-bold text-gray-900">Fast & Reliable</p>
          </motion.div>

          {/* Floating Mini Badge 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.7 },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute bottom-[10%] -right-2.5 hidden rounded-2xl bg-black px-4 py-3 text-white shadow-xl md:block"
          >
            <p className="text-xs text-white/70">Community Support</p>
            <p className="text-lg font-bold">24/7 Active</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
