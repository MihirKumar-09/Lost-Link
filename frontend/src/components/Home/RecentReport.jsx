import { MapPin, MoveRight, Clock3 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { cn } from "../../lib/utils.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function AnimatedRecentReportBackground() {
  const lightParticles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        size: i % 4 === 0 ? 12 : i % 3 === 0 ? 8 : 5,
        left: `${4 + ((i * 13) % 92)}%`,
        top: `${8 + ((i * 11) % 78)}%`,
        duration: 8 + (i % 5) * 1.7,
        delay: (i % 6) * 0.35,
      })),
    [],
  );

  const darkStars = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        size: i % 5 === 0 ? 4 : i % 3 === 0 ? 2.6 : 1.8,
        left: `${3 + ((i * 17) % 94)}%`,
        top: `${4 + ((i * 9) % 88)}%`,
        duration: 3.5 + (i % 6),
        delay: (i % 7) * 0.3,
      })),
    [],
  );

  const constellationNodes = [
    [10, 22],
    [18, 30],
    [28, 20],
    [42, 28],
    [58, 18],
    [72, 30],
    [84, 22],
    [20, 66],
    [34, 58],
    [48, 70],
    [62, 60],
    [78, 72],
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* LIGHT THEME */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffffff_0%,#eef8ff_34%,#f8fbff_66%,#eef4ff_100%)]" />

        {/* ambient glows */}
        <motion.div
          animate={{
            x: [0, 42, -18, 0],
            y: [0, -24, 16, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -32, 20, 0],
            y: [0, 26, -14, 0],
            scale: [1, 0.95, 1.07, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-22.5 top-20 h-88 w-88 rounded-full bg-fuchsia-300/18 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 26, -22, 0],
            y: [0, -18, 22, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-30 left-1/3 h-80 w-[20rem] rounded-full bg-cyan-300/18 blur-3xl"
        />

        {/* rotating halo discs */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute left-[6%] top-[14%] h-36 w-36 rounded-full border border-sky-200/60"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          className="absolute right-[10%] top-[20%] h-28 w-28 rounded-full border border-fuchsia-200/50"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute left-[20%] bottom-[12%] h-24 w-24 rounded-full border border-cyan-200/50"
        />

        {/* floating glass panels */}
        <motion.div
          animate={{
            y: [0, -14, 0],
            x: [0, 14, 0],
            rotate: [0, 4, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[7%] top-[18%] h-20 w-28 rounded-3xl border border-white/70 bg-white/45 shadow-[0_18px_45px_rgba(59,130,246,0.08)] backdrop-blur-xl"
        >
          <div className="absolute left-4 top-4 h-2.5 w-14 rounded-full bg-sky-200/80" />
          <div className="absolute left-4 top-9 h-2.5 w-9 rounded-full bg-blue-100/90" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 16, 0],
            x: [0, -12, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 11.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute right-[14%] top-[42%] h-16 w-24 rounded-[22px] border border-white/70 bg-white/40 shadow-[0_16px_40px_rgba(236,72,153,0.08)] backdrop-blur-xl"
        >
          <div className="absolute left-4 top-4 h-2.5 w-12 rounded-full bg-pink-200/80" />
          <div className="absolute left-4 top-8 h-2.5 w-7 rounded-full bg-rose-100/90" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -12, 0],
            x: [0, 18, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 12.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.9,
          }}
          className="absolute left-[26%] bottom-[18%] h-18 w-28 rounded-3xl border border-white/70 bg-white/38 shadow-[0_16px_42px_rgba(14,165,233,0.08)] backdrop-blur-xl"
        >
          <div className="absolute left-4 top-4 h-2.5 w-14 rounded-full bg-cyan-200/80" />
          <div className="absolute left-4 top-9 h-2.5 w-10 rounded-full bg-sky-100/90" />
        </motion.div>

        {/* soft cloud blobs */}
        <motion.div
          animate={{ x: ["-10%", "110%"], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] h-24 w-56 rounded-full bg-white/28 blur-2xl"
        />
        <motion.div
          animate={{ x: ["110%", "-20%"], opacity: [0.16, 0.38, 0.16] }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute top-[62%] h-28 w-64 rounded-full bg-white/24 blur-2xl"
        />

        {/* floating particles */}
        {lightParticles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.left,
              top: particle.top,
              background:
                particle.id % 2 === 0
                  ? "rgba(96,165,250,0.38)"
                  : "rgba(251,191,36,0.32)",
              boxShadow:
                particle.id % 2 === 0
                  ? "0 0 16px rgba(96,165,250,0.28)"
                  : "0 0 16px rgba(251,191,36,0.22)",
            }}
            animate={{
              y: [0, -20, 0, 10, 0],
              x: [0, 7, -5, 10, 0],
              opacity: [0.2, 0.7, 0.28, 0.52, 0.2],
              scale: [1, 1.2, 0.95, 1.08, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* subtle grid */}
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.10) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.10) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.03)_20%,rgba(255,255,255,0.00)_100%)]" />
      </div>

      {/* DARK THEME */}
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#10192f_0%,#060d1d_28%,#030714_58%,#01030b_100%)]" />

        {/* neon glows */}
        <motion.div
          animate={{
            x: [0, 36, -18, 0],
            y: [0, -24, 14, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-cyan-400/14 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -28, 16, 0],
            y: [0, 22, -14, 0],
            scale: [1, 0.95, 1.07, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-22.5 top-18 h-96 w-[24rem] rounded-full bg-fuchsia-500/12 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 24, -26, 0],
            y: [0, -16, 24, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-30 left-1/3 h-88 w-88 rounded-full bg-violet-500/10 blur-3xl"
        />

        {/* orbit rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute left-[8%] top-[16%] h-44 w-44 rounded-full border border-cyan-300/18"
        >
          <div className="absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300/80 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute right-[10%] top-[42%] h-56 w-56 rounded-full border border-fuchsia-300/14"
        >
          <div className="absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-fuchsia-300/80 shadow-[0_0_12px_rgba(244,114,182,0.8)]" />
        </motion.div>

        {/* radar pulses */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.04, 0.2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[24%] top-[58%] h-28 w-28 rounded-full border border-cyan-300/16"
        />
        <motion.div
          animate={{ scale: [1, 1.24, 1], opacity: [0.18, 0.03, 0.18] }}
          transition={{
            duration: 5.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          }}
          className="absolute right-[22%] top-[18%] h-24 w-24 rounded-full border border-fuchsia-300/14"
        />

        {/* constellation lines */}
        <svg className="absolute inset-0 h-full w-full opacity-40">
          {[
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 5],
            [5, 6],
            [7, 8],
            [8, 9],
            [9, 10],
            [10, 11],
            [2, 8],
            [4, 10],
          ].map(([a, b], idx) => (
            <line
              key={idx}
              x1={`${constellationNodes[a][0]}%`}
              y1={`${constellationNodes[a][1]}%`}
              x2={`${constellationNodes[b][0]}%`}
              y2={`${constellationNodes[b][1]}%`}
              stroke="rgba(103,232,249,0.16)"
              strokeWidth="1"
            />
          ))}
        </svg>

        {constellationNodes.map(([left, top], idx) => (
          <div
            key={idx}
            className="absolute h-2.5 w-2.5 rounded-full bg-cyan-200"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              boxShadow: "0 0 14px rgba(103,232,249,0.7)",
            }}
          />
        ))}

        {/* meteors */}
        <motion.div
          animate={{
            x: [-200, 1200],
            y: [0, 260],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            repeatDelay: 7,
            ease: "easeOut",
          }}
          className="absolute -left-40 top-[18%] h-0.5 w-40 rotate-18 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(103,232,249,0.95),rgba(255,255,255,0))] blur-[1px]"
        />

        <motion.div
          animate={{
            x: [-160, 980],
            y: [0, 220],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3.7,
            repeat: Infinity,
            repeatDelay: 9,
            delay: 2,
            ease: "easeOut",
          }}
          className="absolute -left-35 top-[46%] h-0.5 w-32 rotate-20 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(244,114,182,0.9),rgba(255,255,255,0))] blur-[1px]"
        />

        {/* star particles */}
        {darkStars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: star.left,
              top: star.top,
              boxShadow:
                star.id % 2 === 0
                  ? "0 0 10px rgba(103,232,249,0.7)"
                  : "0 0 10px rgba(255,255,255,0.55)",
            }}
            animate={{
              opacity: [0.2, 1, 0.3],
              scale: [1, 1.7, 1],
              y: [0, -8, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* animated grid */}
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56,189,248,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56,189,248,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "38px 38px",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.01)_18%,rgba(2,6,23,0.14)_100%)]" />
      </div>
    </div>
  );
}

export default function RecentReport() {
  const [allReports, setAllReport] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://192.168.1.8:8080/reports/allReports?limit=4",
        );
        if (!res.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await res.json();
        setAllReport(data.allReports || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 45, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="relative overflow-hidden px-3 py-12 sm:px-5 md:px-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <AnimatedRecentReportBackground />

      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Recently Reported
          </h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Stay updated with the latest lost and found items reported nearby
          </p>
        </div>

        <Link to="/reports/all">
          <motion.div className="hidden md:block" variants={fadeUp}>
            <motion.button
              whileHover={{
                y: -3,
                scale: 1.03,
                boxShadow: "0px 16px 35px rgba(51,88,212,0.25)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-blue-200/70 bg-white px-6 py-3 text-sm font-semibold text-[#3358D4] shadow-[0_10px_30px_rgba(51,88,212,0.12)] transition hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-white/8 dark:text-white dark:shadow-[0_12px_30px_rgba(0,0,0,0.28)] dark:hover:bg-white/[0.14]"
            >
              <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)] opacity-0 transition duration-500 group-hover:translate-x-full group-hover:opacity-100" />
              <span className="relative z-10">View All</span>
            </motion.button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={sectionVariants}
        className="relative grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4"
      >
        {allReports.map((report) => {
          const reportLink =
            report.reportType === "lost"
              ? `/lostItem/${report._id}`
              : `/foundItem/${report._id}`;

          return (
            <motion.div
              key={report._id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="group relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#0f172a]/90 dark:shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
            >
              {/* Image Area */}
              <div className="relative h-80 overflow-hidden bg-linear-to-br from-[#f8f9ff] to-[#e9efff] dark:from-[#0b1220] dark:to-[#111c34]">
                <motion.img
                  src={report.image}
                  alt={report.name || "Report"}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />

                {/* Report Type Badge */}
                <motion.span
                  initial={{ opacity: 0, y: -16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "absolute left-4 top-4 rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md",
                    report.reportType === "lost"
                      ? "bg-red-500/95"
                      : "bg-emerald-500/95",
                  )}
                >
                  {report.reportType === "lost" ? "Lost" : "Found"}
                </motion.span>

                {/* Status Badge */}
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "absolute right-4 top-4 rounded-full px-4 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md",
                    report.status === "closed"
                      ? "bg-slate-900/90 text-white dark:bg-white/15 dark:text-white"
                      : "bg-white/90 text-[#3358D4] dark:bg-white/12 dark:text-blue-300",
                  )}
                >
                  {report.status === "closed" ? "Closed" : "Open"}
                </motion.span>

                {/* Bottom content on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <motion.h6
                    whileHover={{ x: 3 }}
                    className="line-clamp-1 text-xl font-bold leading-tight"
                  >
                    {report.name}
                  </motion.h6>

                  <div className="mt-2 flex items-center gap-2 text-sm text-white/90">
                    <MapPin size={16} />
                    <span className="line-clamp-1">
                      {report.location?.city}, {report.location?.area}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative bg-white p-5 dark:bg-transparent">
                <div className="absolute right-0 top-0 h-24 w-24 -translate-y-1/2 rounded-full bg-blue-100/50 blur-2xl dark:bg-blue-500/10" />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Clock3 size={15} />
                      <span>
                        {new Date(report.dateTime).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                      {new Date(report.dateTime).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="mb-4 h-px bg-linear-to-r from-transparent via-slate-300 to-transparent dark:via-white/10" />

                  {report.status !== "closed" ? (
                    <Link to={reportLink}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#dbe4ff] bg-[#f7faff] px-4 py-3 transition hover:bg-[#eef4ff] dark:border-white/10 dark:bg-white/6 dark:hover:bg-white/10"
                      >
                        <span className="text-sm font-semibold text-[#3358D4] dark:text-blue-300">
                          View Details
                        </span>

                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="text-[#3358D4] dark:text-blue-300"
                        >
                          <MoveRight size={18} />
                        </motion.div>
                      </motion.div>
                    </Link>
                  ) : (
                    <div className="flex cursor-not-allowed items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                      <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                        Details Unavailable
                      </span>
                      <MoveRight
                        size={18}
                        className="text-slate-300 dark:text-slate-600"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Ring */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-transparent transition duration-300 group-hover:ring-[#3358D4]/20 dark:group-hover:ring-blue-400/20" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mobile Button */}
      <Link to="/reports/all">
        <motion.button
          variants={fadeUp}
          whileHover={{
            y: -3,
            scale: 1.02,
            boxShadow: "0px 16px 35px rgba(51,88,212,0.25)",
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="group relative mt-6 block w-full overflow-hidden rounded-xl border border-blue-200/70 bg-white p-3.5 font-semibold text-[#3358D4] shadow-[0_10px_30px_rgba(51,88,212,0.12)] md:hidden dark:border-white/10 dark:bg-white/8 dark:text-white dark:shadow-[0_12px_30px_rgba(0,0,0,0.28)]"
        >
          <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)] opacity-0 transition duration-500 group-hover:translate-x-full group-hover:opacity-100" />
          <span className="relative z-10">View All</span>
        </motion.button>
      </Link>
    </motion.section>
  );
}
