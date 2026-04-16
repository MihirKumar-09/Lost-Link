import { motion } from "framer-motion";
import { MapPin, CalendarDays, Sparkles } from "lucide-react";
import { useMemo } from "react";

function LightNatureBackground() {
  const leaves = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${5 + ((i * 8) % 88)}%`,
        top: `${-8 - (i % 4) * 10}%`,
        size: 12 + (i % 4) * 4,
        duration: 8 + (i % 5),
        delay: i * 0.5,
      })),
    [],
  );

  const rays = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        left: `${8 + i * 22}%`,
        rotate: -18 + i * 8,
        duration: 7 + i,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden dark:hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(191,219,254,0.32),transparent_32%),linear-gradient(180deg,#f8fbff_0%,#eef6ff_58%,#f8fff8_100%)]" />

      {rays.map((ray) => (
        <motion.div
          key={ray.id}
          animate={{ opacity: [0.08, 0.18, 0.1], x: [-8, 8, -4] }}
          transition={{
            duration: ray.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-12%] h-[140%] w-20 blur-2xl"
          style={{
            left: ray.left,
            transform: `rotate(${ray.rotate}deg)`,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.65), rgba(191,219,254,0.16), rgba(255,255,255,0))",
          }}
        />
      ))}

      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{ y: "-10%", x: 0, rotate: -20, opacity: 0 }}
          animate={{
            y: ["-10%", "30%", "65%", "105%"],
            x: [0, 18, -20, 20, -12],
            rotate: [-20, 30, 85, 150],
            opacity: [0, 0.9, 0.9, 0.7, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{ left: leaf.left, top: leaf.top }}
        >
          <div
            className="rounded-[100%_0_100%_0/100%_0_100%_0] border border-emerald-200/60 bg-linear-to-br from-lime-200 via-emerald-200 to-amber-200 shadow-[0_4px_14px_rgba(16,185,129,0.14)]"
            style={{
              width: `${leaf.size}px`,
              height: `${leaf.size * 1.3}px`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function DarkAtmosphereBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${4 + ((i * 6.4) % 92)}%`,
        top: `${8 + ((i * 9) % 78)}%`,
        size: 4 + (i % 4) * 2,
        duration: 4.5 + (i % 5),
        delay: i * 0.35,
      })),
    [],
  );

  const mistBands = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: `${-10 + i * 24}%`,
        rotate: -14 + i * 6,
        duration: 8 + i,
        delay: i * 0.7,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden dark:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_30%),linear-gradient(180deg,#07111f_0%,#0b1323_48%,#09111d_100%)]" />

      {mistBands.map((band) => (
        <motion.div
          key={band.id}
          animate={{
            x: ["-6%", "7%", "-4%"],
            opacity: [0.05, 0.13, 0.06],
          }}
          transition={{
            duration: band.duration,
            delay: band.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] h-[140%] w-24 blur-3xl"
          style={{
            left: band.left,
            transform: `rotate(${band.rotate}deg)`,
            background:
              "linear-gradient(180deg, rgba(34,211,238,0.10), rgba(255,255,255,0.02), rgba(34,211,238,0.06))",
          }}
        />
      ))}

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: 0, opacity: 0.2, scale: 0.8 }}
          animate={{
            y: [-8, 14, -6],
            x: [-5, 6, -3],
            opacity: [0.15, 0.72, 0.2],
            scale: [0.8, 1.18, 0.95],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,0.55)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function ImageSection({ productDetails }) {
  if (!productDetails) {
    return (
      <section className="w-full md:w-1/2">
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[30px] border border-slate-200/70 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-[#081120]/88 dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
          <LightNatureBackground />
          <DarkAtmosphereBackground />

          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.96, 1.03, 0.96] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 rounded-2xl border border-white/50 bg-white/70 px-5 py-3 text-sm font-medium text-gray-700 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:text-gray-200"
          >
            Loading...
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full md:w-1/2">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative group"
      >
        {/* animated scene bg */}
        <div className="absolute -inset-3 overflow-hidden rounded-[34px]">
          <LightNatureBackground />
          <DarkAtmosphereBackground />
        </div>

        {/* outer premium glow */}
        <div className="absolute -inset-2 rounded-[34px] bg-linear-to-br from-blue-200/35 via-violet-200/25 to-emerald-200/30 blur-2xl opacity-70 transition duration-500 group-hover:opacity-90 dark:from-cyan-500/10 dark:via-blue-500/10 dark:to-emerald-500/10" />

        {/* main card */}
        <motion.div
          whileHover={{
            y: -10,
            rotate: -0.8,
            scale: 1.015,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="relative overflow-hidden rounded-[30px] border border-white/60 bg-white/85 shadow-[0_30px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-[#081120]/88 dark:shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        >
          {/* top shine bar */}
          <div className="h-1.5 w-full bg-linear-to-r from-[#3358D4] via-[#6C63FF] to-[#22C55E] dark:from-cyan-400 dark:via-blue-500 dark:to-emerald-400" />

          {/* image area */}
          <div className="relative aspect-4/4 w-full overflow-hidden md:aspect-4/3">
            {/* image */}
            <motion.img
              src={productDetails.image}
              alt={productDetails.name || "Report"}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.12 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />

            {/* image enhancement layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_30%)] dark:bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%)]" />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/22 to-black/5 dark:from-black/80 dark:via-slate-950/22 dark:to-transparent" />

            {/* subtle moving light */}
            <motion.div
              animate={{ x: ["-30%", "120%"], opacity: [0, 0.22, 0] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-y-0 left-0 w-24 rotate-12 bg-white/25 blur-xl dark:bg-cyan-100/10"
            />

            {/* type badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute top-4 left-4 rounded-full px-4 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md ${
                productDetails.reportType === "lost"
                  ? "bg-red-500/95 text-white dark:bg-red-500/85"
                  : "bg-emerald-500/95 text-white dark:bg-emerald-500/85"
              }`}
            >
              {productDetails.reportType === "lost" ? "Lost" : "Found"}
            </motion.div>

            {/* status badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`absolute top-4 right-4 rounded-full px-4 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md ${
                productDetails.status === "closed"
                  ? "bg-slate-900/88 text-white dark:bg-white/12 dark:text-white"
                  : "bg-white/90 text-[#3358D4] dark:bg-cyan-400/12 dark:text-cyan-300"
              }`}
            >
              {productDetails.status === "closed" ? "Closed" : "Open"}
            </motion.div>

            {/* floating accent chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.18 }}
              className="absolute left-4 top-16 hidden items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-[11px] font-medium text-white shadow-lg backdrop-blur-md md:flex"
            >
              <Sparkles size={13} />
              Community verified report
            </motion.div>

            {/* bottom text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white md:p-6">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[85%] text-xl font-bold tracking-tight md:text-2xl"
              >
                {productDetails.name}
              </motion.h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-white/90">
                <MapPin size={16} />
                <span>
                  {productDetails.location?.city},{" "}
                  {productDetails.location?.area}
                </span>
              </div>
            </div>
          </div>

          {/* lower info strip */}
          <div className="relative z-10 grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-slate-200/70 bg-white/72 px-4 py-3 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/8"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                Reported Date
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="rounded-xl bg-blue-50 p-2 dark:bg-cyan-400/10">
                  <CalendarDays
                    size={16}
                    className="text-blue-600 dark:text-cyan-300"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {new Date(productDetails.dateTime).toLocaleDateString()}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="rounded-2xl border border-slate-200/70 bg-linear-to-r from-[#EEF4FF]/85 to-[#F8FAFF]/85 px-4 py-3 shadow-lg backdrop-blur-md dark:border-white/10 dark:from-white/8 dark:to-white/5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                Current Status
              </p>
              <p
                className={`mt-2 text-sm font-semibold ${
                  productDetails.status === "closed"
                    ? "text-gray-700 dark:text-gray-200"
                    : "text-amber-700 dark:text-amber-300"
                }`}
              >
                {productDetails.status === "closed"
                  ? "This report is closed"
                  : "This report is still open"}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
