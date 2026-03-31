import { MapPin, MoveRight, Sparkles } from "lucide-react";
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
          "http://192.168.1.8:8080/reports/allReports?reportType=lost&limit=8",
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut",
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden px-3 sm:px-5 md:px-12 py-14 bg-linear-to-b from-[#fffaf7] via-[#fffdfb] to-white">
      {/* soft background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100/40 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100/40 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10"
      >
        {/* Header */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDEEE7] text-[#EC5B13] text-xs sm:text-sm font-semibold mb-3">
              <Sparkles size={14} />
              Latest community reports
            </div>

            <h4 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 leading-tight">
              Recently Lost Items
            </h4>

            <p className="text-gray-500 mt-2 text-sm sm:text-base md:text-lg">
              Stay updated with the latest items reported in your area and
              quickly take action before opportunities are missed.
            </p>
          </div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:block"
          >
            <Link to="/lostItems">
              <button className="group bg-[#3358D4] text-white px-6 py-3 rounded-2xl text-sm md:text-base font-semibold shadow-[0_12px_30px_rgba(51,88,212,0.22)] hover:bg-[#2949b3] transition-all cursor-pointer">
                <span className="flex items-center gap-2">
                  View All
                  <MoveRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={sectionVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {allReports.map((report, index) => (
            <motion.div
              key={report._id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.25 } }}
              className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-300"
            >
              {/* top glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-linear-to-br from-orange-50/70 via-transparent to-blue-50/60" />

              {/* Image */}
              <div className="relative w-full h-90 sm:h-70 md:h-62 lg:h-56 overflow-hidden">
                <motion.img
                  src={report.image}
                  alt={report.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="absolute top-3 left-3"
                >
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-[11px] font-semibold shadow-md backdrop-blur-md",
                      report.reportType === "lost"
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white",
                    )}
                  >
                    {report.reportType}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.08 }}
                  className="absolute top-3 right-3"
                >
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-[11px] font-semibold shadow-md backdrop-blur-md",
                      report.status === "closed"
                        ? "bg-gray-700 text-white"
                        : "bg-amber-400 text-gray-900",
                    )}
                  >
                    {report.status === "closed" ? "Closed" : "Open"}
                  </span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-4 space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <h6 className="font-bold text-lg text-gray-900 line-clamp-1">
                    {report.name}
                  </h6>

                  <span className="shrink-0 text-xs bg-[#e7731b18] px-3 py-1 text-[#F97316] rounded-full font-semibold">
                    {report.category}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-[#FDEEE7] transition-colors">
                    <MapPin
                      size={14}
                      className="group-hover:text-[#EC5B13] transition-colors"
                    />
                  </div>
                  <span className="line-clamp-1">
                    {report.location.city}, {report.location.area}
                  </span>
                </div>

                <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />

                {/* Footer */}
                <div className="flex justify-between items-center text-sm pt-1">
                  <span className="text-gray-500 font-medium">
                    {new Date(report?.dateTime).toLocaleString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  {report.status !== "closed" ? (
                    <Link to={`/lostItem/${report._id}`}>
                      <motion.span
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-1 text-[#3358D4] cursor-pointer font-semibold hover:text-[#2647c5] transition"
                      >
                        Details <MoveRight size={16} />
                      </motion.span>
                    </Link>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-400 cursor-not-allowed font-semibold">
                      Details <MoveRight size={16} />
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile button */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="md:hidden mt-7"
        >
          <Link to="/lostItems">
            <button className="group block w-full bg-[#3358D4] text-white p-3.5 rounded-2xl shadow-[0_12px_30px_rgba(51,88,212,0.22)] font-semibold">
              <span className="flex items-center justify-center gap-2">
                View All
                <MoveRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
