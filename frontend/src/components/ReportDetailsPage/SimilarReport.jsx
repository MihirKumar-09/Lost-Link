import { useState, useEffect, useMemo } from "react";
import { MapPin, MoveRight, Sparkles, Clock3 } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../../lib/api.js";

function LightLeafBackground() {
  const leaves = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${4 + ((i * 8) % 92)}%`,
        top: `${-8 - (i % 4) * 12}%`,
        size: 12 + (i % 4) * 4,
        duration: 8 + (i % 5),
        delay: i * 0.45,
      })),
    [],
  );

  const breezes = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: `${14 + i * 12}%`,
        width: 120 + i * 18,
        duration: 5 + (i % 3),
        delay: i * 0.7,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden dark:hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(191,219,254,0.30),transparent_34%),linear-gradient(180deg,#f8fbff_0%,#f2f7ff_58%,#f7fff9_100%)]" />

      {breezes.map((breeze) => (
        <motion.div
          key={breeze.id}
          initial={{ x: -180, opacity: 0 }}
          animate={{ x: ["-15%", "108%"], opacity: [0, 0.24, 0.12, 0] }}
          transition={{
            duration: breeze.duration,
            delay: breeze.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute hidden md:block"
          style={{ top: breeze.top }}
        >
          <div
            className="h-0.5 rounded-full bg-linear-to-r from-transparent via-sky-300/55 to-transparent blur-[0.5px]"
            style={{ width: `${breeze.width}px` }}
          />
        </motion.div>
      ))}

      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{ y: "-12%", x: 0, rotate: -20, opacity: 0 }}
          animate={{
            y: ["-12%", "28%", "62%", "105%"],
            x: [0, 18, -20, 20, -10],
            rotate: [-20, 25, 80, 145],
            opacity: [0, 0.9, 0.85, 0.72, 0],
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

function DarkMistBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${4 + ((i * 6.2) % 92)}%`,
        top: `${8 + ((i * 10) % 78)}%`,
        size: 4 + (i % 4) * 2,
        duration: 5 + (i % 4),
        delay: i * 0.35,
      })),
    [],
  );

  const mistBands = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: `${-8 + i * 24}%`,
        rotate: -12 + i * 5,
        duration: 8 + i,
        delay: i * 0.7,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden dark:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_30%),linear-gradient(180deg,#07111f_0%,#0b1323_45%,#09111d_100%)]" />

      {mistBands.map((band) => (
        <motion.div
          key={band.id}
          animate={{
            x: ["-6%", "8%", "-4%"],
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
              "linear-gradient(180deg, rgba(56,189,248,0.10), rgba(255,255,255,0.02), rgba(56,189,248,0.08))",
          }}
        />
      ))}

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: 0, opacity: 0.15, scale: 0.8 }}
          animate={{
            y: [-10, 14, -8],
            x: [-6, 8, -4],
            opacity: [0.15, 0.7, 0.2],
            scale: [0.8, 1.2, 0.95],
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

export default function SimilarReport({ currentReport }) {
  const [allReports, setAllReport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentReport?._id) {
          setAllReport([]);
          setLoading(false);
          return;
        }

        const oppositeType =
          currentReport.reportType === "lost" ? "found" : "lost";

        const res = await fetch(
          `${API_URL}/reports/allReports?status=open&reportType=${oppositeType}&limit=100`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch similar reports");
        }

        const data = await res.json();
        setAllReport(data.allReports || []);
      } catch (err) {
        console.log("Similar reports fetch error:", err);
        setAllReport([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentReport]);

  const similarReports = useMemo(() => {
    if (!currentReport?._id) return [];

    return allReports.filter((report) => {
      const notCurrentReport = report._id !== currentReport._id;

      const sameCategory =
        report.category?.trim().toLowerCase() ===
        currentReport.category?.trim().toLowerCase();

      const sameCity =
        report.location?.city?.trim().toLowerCase() ===
        currentReport.location?.city?.trim().toLowerCase();

      return notCurrentReport && sameCategory && sameCity;
    });
  }, [allReports, currentReport]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.96 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (!currentReport?._id || loading || similarReports.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden px-3 py-12 sm:px-5 md:px-12">
      <LightLeafBackground />
      <DarkMistBackground />

      <div className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-blue-200/30 blur-3xl dark:hidden" />
      <div className="pointer-events-none absolute bottom-0 -right-14 h-56 w-56 rounded-full bg-purple-200/30 blur-3xl dark:hidden" />
      <div className="pointer-events-none absolute -top-10 left-20 hidden h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl dark:block" />
      <div className="pointer-events-none absolute bottom-0 right-10 hidden h-52 w-52 rounded-full bg-blue-500/10 blur-3xl dark:block" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
        className="relative rounded-4xl border border-white/70 bg-white/75 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#081120]/82 dark:shadow-[0_24px_70px_rgba(0,0,0,0.42)] md:p-6"
      >
        <motion.div
          variants={fadeUp}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-cyan-400/15 dark:bg-cyan-400/10 dark:text-cyan-300">
              <Sparkles size={15} />
              Nearby Matches
            </div>

            <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
              Similar Items Nearby
            </h4>

            <p className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-300 md:text-base">
              Explore recent matching reports from your city.
            </p>
          </div>

          <Link
            to={`/reports/${currentReport.reportType === "lost" ? "found" : "lost"}`}
            className="hidden rounded-2xl bg-linear-to-r from-[#3358D4] to-[#5b7cfa] px-5 py-3 text-sm font-semibold text-white shadow-lg dark:from-cyan-500 dark:to-blue-600 md:block"
          >
            <motion.div
              variants={fadeUp}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Live Similar Reports
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="flex gap-6 overflow-x-auto pb-3 no-scrollbar"
        >
          {similarReports.map((report) => {
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
                className="group relative min-w-72.5 shrink-0 overflow-hidden rounded-[28px] border border-white/60 bg-white/90 shadow-[0_14px_35px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/6 sm:min-w-77.5 md:min-w-82.5 lg:min-w-85"
              >
                <div className="relative h-60 overflow-hidden bg-linear-to-br from-[#f2f6ff] to-[#dde7ff] dark:from-slate-900 dark:to-[#0f1d35]">
                  <motion.img
                    src={report.image}
                    alt={report.name || "Report"}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent dark:from-black/75 dark:via-slate-950/18 dark:to-transparent" />

                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "absolute left-4 top-4 rounded-full px-4 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md",
                      report.reportType === "lost"
                        ? "bg-red-500 text-white"
                        : "bg-emerald-500 text-white",
                    )}
                  >
                    {report.reportType === "lost" ? "Lost Item" : "Found Item"}
                  </motion.span>

                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#3358D4] shadow-lg backdrop-blur-md dark:bg-cyan-400/12 dark:text-cyan-300"
                  >
                    Open
                  </motion.span>

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <motion.h6
                      whileHover={{ x: 3 }}
                      className="text-xl font-bold leading-tight"
                    >
                      {report.name}
                    </motion.h6>

                    <div className="mt-2 flex items-center gap-2 text-sm text-white/90">
                      <MapPin size={16} />
                      <span>
                        {report.location.city}, {report.location.area}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative p-5">
                  <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 -translate-y-1/2 rounded-full bg-blue-100/40 blur-2xl dark:bg-cyan-400/10" />

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                        <Clock3 size={15} />
                        <span>
                          {new Date(report.dateTime).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>

                      <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
                        {new Date(report.dateTime).getFullYear()}
                      </span>
                    </div>

                    <div className="mb-4 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent dark:via-white/12" />

                    <Link to={reportLink}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between rounded-2xl border border-[#dbe4ff] bg-[#f7faff] px-4 py-3 transition hover:bg-[#eef4ff] dark:border-white/10 dark:bg-white/8 dark:hover:bg-white/12"
                      >
                        <span className="text-sm font-semibold text-[#3358D4] dark:text-cyan-300">
                          View Details
                        </span>

                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="text-[#3358D4] dark:text-cyan-300"
                        >
                          <MoveRight size={18} />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-transparent transition duration-300 group-hover:ring-[#3358D4]/20 dark:group-hover:ring-cyan-400/20" />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
