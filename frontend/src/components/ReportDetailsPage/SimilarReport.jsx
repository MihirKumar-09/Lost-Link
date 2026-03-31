import { useState, useEffect } from "react";
import { MapPin, MoveRight, Sparkles, Clock3 } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function SimilarReport() {
  const [allReports, setAllReport] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://192.168.1.8:8080/reports/allReports?status=open",
        );
        if (!res.ok) {
          throw new Error("Failed");
        }
        const data = await res.json();
        setAllReport(data.allReports);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#f8f9ff] via-[#f4f6fb] to-[#eef2ff] px-3 py-12 sm:px-5 md:px-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-17.5 top-10 h-44 w-44 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-15 h-56 w-56 rounded-full bg-purple-200/30 blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
        className="relative rounded-4xl border border-white/70 bg-white/75 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-6"
      >
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles size={15} />
              Nearby Matches
            </div>

            <h4 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Similar Items Nearby
            </h4>

            <p className="mt-2 max-w-xl text-sm text-gray-500 md:text-base">
              People are also looking for similar electronics around your area.
              Explore recent open reports that might be relevant.
            </p>
          </div>

          <motion.div
            variants={fadeUp}
            className="hidden rounded-2xl bg-linear-to-r from-[#3358D4] to-[#5b7cfa] px-5 py-3 text-sm font-semibold text-white shadow-lg md:block"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Live Similar Reports
          </motion.div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          className="flex gap-6 overflow-x-auto pb-3 no-scrollbar"
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
                className="group relative min-w-72.5 shrink-0 overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)] sm:min-w-77.5 md:min-w-82.5 lg:min-w-85"
              >
                {/* Image area */}
                <div className="relative h-60 overflow-hidden bg-linear-to-br from-[#f2f6ff] to-[#dde7ff]">
                  <motion.img
                    src={report.image}
                    alt="Report"
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />

                  {/* report type badge */}
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "absolute left-4 top-4 rounded-full px-4 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md",
                      report.reportType === "lost"
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white",
                    )}
                  >
                    {report.reportType === "lost" ? "Lost Item" : "Found Item"}
                  </motion.span>

                  {/* status badge */}
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "absolute right-4 top-4 rounded-full px-4 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md",
                      report.status === "closed"
                        ? "bg-gray-700 text-white"
                        : "bg-white/90 text-[#3358D4]",
                    )}
                  >
                    {report.status === "closed" ? "Closed" : "Open"}
                  </motion.span>

                  {/* bottom overlay content */}
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

                {/* bottom info panel */}
                <div className="relative p-5">
                  <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 -translate-y-1/2 rounded-full bg-blue-100/40 blur-2xl" />

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
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

                      <span className="text-sm font-medium text-gray-400">
                        {new Date(report.dateTime).getFullYear()}
                      </span>
                    </div>

                    <div className="mb-4 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />

                    <Link to={reportLink}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between rounded-2xl border border-[#dbe4ff] bg-[#f7faff] px-4 py-3 transition hover:bg-[#eef4ff]"
                      >
                        <span className="text-sm font-semibold text-[#3358D4]">
                          View Details
                        </span>

                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="text-[#3358D4]"
                        >
                          <MoveRight size={18} />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </div>
                </div>

                {/* hover ring */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-transparent transition duration-300 group-hover:ring-[#3358D4]/20" />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
