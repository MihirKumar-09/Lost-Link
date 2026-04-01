import { MapPin, MoveRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils.js";
import { Link } from "react-router-dom";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export default function RecentFound() {
  const [allReports, setAllReport] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://192.168.1.8:8080/reports/allReports?reportType=found&limit=8",
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

  return (
    <section className="px-3 sm:px-5 md:px-12 py-12 bg-linear-to-b from-[#f8fafc] via-[#fdfdfd] to-[#fff7ed]">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Top Section */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8"
        >
          <div>
            <motion.h4
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-gray-900"
            >
              Recently Found Items
            </motion.h4>

            <motion.p
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-500 mt-2 text-sm sm:text-base max-w-xl"
            >
              Stay updated with the latest items reported in your area
            </motion.p>
          </div>

          <motion.div
            variants={cardVariants}
            className="hidden md:block"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <button className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-[#3358D4] via-[#4f6ef7] to-[#6b7cff] px-6 py-3 text-white font-medium shadow-[0_12px_30px_rgba(51,88,212,0.28)] transition cursor-pointer">
              <span className="relative z-10 flex items-center gap-2">
                View All
                <MoveRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
              <span className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-500 group-hover:translate-y-0" />
            </button>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={sectionVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7"
        >
          {allReports.map((report, index) => (
            <motion.div
              key={report._id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.28, ease: "easeOut" },
              }}
              className="group relative overflow-hidden rounded-[28px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_10px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)] transition-all duration-300"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.10),transparent_35%)] opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Image */}
              <div className="relative w-full h-90 sm:h-70 md:h-62 lg:h-56 overflow-hidden">
                <motion.img
                  src={report.image}
                  alt="Report"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/5 to-transparent" />

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.35 }}
                  viewport={{ once: true }}
                  className="absolute top-3 left-3 flex gap-2"
                >
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-[11px] font-semibold shadow-md backdrop-blur-md",
                      report.reportType === "lost"
                        ? "bg-red-500/90 text-white"
                        : "bg-emerald-500/90 text-white",
                    )}
                  >
                    {report.reportType}
                  </span>

                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-[11px] font-semibold shadow-md backdrop-blur-md",
                      report.status === "closed"
                        ? "bg-gray-900/80 text-white"
                        : "bg-amber-400/90 text-white",
                    )}
                  >
                    {report.status === "closed" ? "Closed" : "Open"}
                  </span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative p-5">
                <div className="flex justify-between items-start gap-3">
                  <h6 className="font-bold text-lg text-gray-900 line-clamp-1">
                    {report.name}
                  </h6>

                  <motion.p
                    whileHover={{ scale: 1.06 }}
                    className="shrink-0 text-xs bg-orange-50 border border-orange-100 px-3 py-1.5 text-orange-500 rounded-full font-semibold"
                  >
                    {report.category}
                  </motion.p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    <MapPin size={15} className="text-gray-600" />
                  </div>
                  <span className="line-clamp-1">
                    {report.location.city}, {report.location.area}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-4 h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent" />

                {/* Footer */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">
                    {new Date(report.dateTime).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    , {new Date(report.dateTime).getFullYear()}
                  </span>

                  {report.status !== "closed" ? (
                    <Link to={`/lostItem/${report._id}`}>
                      <motion.span
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-1 text-[#3358D4] cursor-pointer font-semibold"
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
        <motion.button
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="block md:hidden w-full mt-7 rounded-2xl bg-linear-to-r from-[#3358D4] via-[#4f6ef7] to-[#6b7cff] text-white py-3.5 font-semibold shadow-[0_12px_30px_rgba(51,88,212,0.28)]"
        >
          View All
        </motion.button>
      </motion.div>
    </section>
  );
}
