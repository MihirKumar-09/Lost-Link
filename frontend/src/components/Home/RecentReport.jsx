import { MapPin, MoveRight, Clock3 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function RecentReport() {
  const [allReports, setAllReport] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://192.168.1.8:8080/reports/allReports?limit=4",
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
      className="px-3 py-12 sm:px-5 md:px-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h4 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Recently Reported
          </h4>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Stay updated with the latest lost and found items reported nearby
          </p>
        </div>

        <motion.div className="hidden md:block" variants={fadeUp}>
          <motion.button
            whileHover={{
              y: -3,
              scale: 1.03,
              boxShadow: "0px 16px 35px rgba(51,88,212,0.25)",
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="px-6 py-3 text-sm font-semibold text-white transition rounded-xl shadow-lg cursor-pointer bg-[#3358D4] hover:bg-[#2c4cc2]"
          >
            View All
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4"
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
              whileHover={{ y: -12 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="group relative overflow-hidden rounded-[28px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/60"
            >
              {/* Top Image Area */}
              <div className="relative h-80 overflow-hidden bg-linear-to-br from-[#f8f9ff] to-[#e9efff]">
                <motion.img
                  src={report.image}
                  alt="Report"
                  className="object-cover w-full h-full"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-transparent" />

                {/* Report Type Badge */}
                <motion.span
                  initial={{ opacity: 0, y: -16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md",
                    report.reportType === "lost"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white",
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
                    "absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md",
                    report.status === "closed"
                      ? "bg-gray-800/90 text-white"
                      : "bg-white/90 text-[#3358D4]",
                  )}
                >
                  {report.status === "closed" ? "Closed" : "Open"}
                </motion.span>

                {/* Bottom content on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <motion.h6
                    whileHover={{ x: 3 }}
                    className="text-xl font-bold leading-tight"
                  >
                    {report.name}
                  </motion.h6>

                  <div className="flex items-center gap-2 mt-2 text-sm text-white/90">
                    <MapPin size={16} />
                    <span>
                      {report.location.city}, {report.location.area}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative p-5 bg-white">
                {/* Decorative blur */}
                <div className="absolute top-0 right-0 w-24 h-24 -translate-y-1/2 rounded-full bg-blue-100/40 blur-2xl" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock3 size={15} />
                      <span>
                        {new Date(report.dateTime).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <span className="text-sm font-medium text-gray-400">
                      {new Date(report?.dateTime).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="h-px mb-4 bg-linear-to-r from-transparent via-gray-300 to-transparent" />

                  {report.status !== "closed" ? (
                    <Link to={`/lostItem/${report._id}`}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-between px-4 py-3 transition border border-[#dbe4ff] rounded-2xl cursor-pointer bg-[#f7faff] hover:bg-[#eef4ff]"
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
                  ) : (
                    <div className="flex items-center justify-between px-4 py-3 border rounded-2xl border-gray-200 bg-gray-50 cursor-not-allowed">
                      <span className="text-sm font-semibold text-gray-400">
                        Details Unavailable
                      </span>
                      <MoveRight size={18} className="text-gray-300" />
                    </div>
                  )}
                </div>
              </div>

              {/* Card glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-transparent transition duration-300 group-hover:ring-[#3358D4]/20" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mobile Button */}
      <motion.button
        variants={fadeUp}
        whileHover={{
          y: -3,
          scale: 1.02,
          boxShadow: "0px 16px 35px rgba(51,88,212,0.25)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        className="block w-full mt-6 p-3.5 text-white bg-[#3358D4] rounded-xl shadow-lg md:hidden font-semibold"
      >
        View All
      </motion.button>
    </motion.section>
  );
}
