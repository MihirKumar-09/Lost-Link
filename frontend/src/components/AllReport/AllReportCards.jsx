import { useParams, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  ArrowRight,
  PackageSearch,
  SearchX,
} from "lucide-react";

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* LIGHT THEME */}
      <div className="absolute inset-0 dark:hidden">
        <motion.div
          animate={{ x: [0, 80, -40, 0], y: [0, -40, 25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -60, 30, 0], y: [0, 30, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-0 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 50, -20, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-200/20 blur-3xl"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute left-[8%] top-[18%] h-36 w-36 rounded-full border border-cyan-400/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute right-[12%] top-[24%] h-52 w-52 rounded-full border border-indigo-400/15"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[20%] h-44 w-44 rounded-full border border-sky-400/15"
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[38px_38px]" />

        <motion.div
          animate={{ backgroundPositionX: ["0%", "100%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-40 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.4)_30%,transparent_60%)] bg-size-[220%_100%]"
        />
      </div>

      {/* DARK THEME */}
      <div className="absolute inset-0 hidden dark:block">
        <motion.div
          animate={{ x: [0, 90, -50, 0], y: [0, -50, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-cyan-500/12 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -70, 30, 0], y: [0, 40, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/12 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 60, -30, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute left-[8%] top-[16%] h-40 w-40 rounded-full border border-cyan-400/12"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute right-[10%] top-[22%] h-56 w-56 rounded-full border border-blue-400/10"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[8%] left-[18%] h-48 w-48 rounded-full border border-violet-400/10"
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[38px_38px]" />

        <motion.div
          animate={{ backgroundPositionX: ["0%", "100%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,transparent_0%,rgba(34,211,238,0.12)_35%,transparent_65%)] bg-size-[220%_100%]"
        />
      </div>
    </div>
  );
}

export default function AllReportCards({ filters }) {
  const { type } = useParams();
  const [searchParams] = useSearchParams();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchTerm = (searchParams.get("search") || "").toLowerCase().trim();

  const fetchReports = async () => {
    try {
      setLoading(true);

      let url = "http://localhost:8080/reports/allReports?limit=100";

      if (type === "lost") {
        url += "&reportType=lost";
      } else if (type === "found") {
        url += "&reportType=found";
      }

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message || "Failed to fetch reports");
        setReports([]);
        return;
      }

      setReports(data.allReports || []);
    } catch (err) {
      console.log("Fetch reports error", err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [type]);

  const pageTitle =
    type === "lost"
      ? "All Lost Reports"
      : type === "found"
        ? "All Found Reports"
        : "All Reports";

  const pageSubtitle =
    type === "lost"
      ? "Track all lost item reports posted by the community."
      : type === "found"
        ? "Browse all found item reports and help reconnect owners."
        : "Explore every report posted by the community.";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
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

  const formatDateTime = (dateValue) => {
    if (!dateValue) return "Date not available";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "Date not available";

    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const filteredReports = useMemo(() => {
    let result = [...reports];

    result = result.filter((item) => {
      const categoryMatch =
        !filters?.category ||
        filters.category === "All" ||
        (item.category || "").toLowerCase() === filters.category.toLowerCase();

      let dateMatch = true;
      const itemDate = new Date(item.createdAt || item.date);
      const now = new Date();

      if (filters?.date && !Number.isNaN(itemDate.getTime())) {
        const diffMs = now - itemDate;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (filters.date === "Today") {
          dateMatch = now.toDateString() === itemDate.toDateString();
        } else if (filters.date === "Yesterday") {
          const yesterday = new Date();
          yesterday.setDate(now.getDate() - 1);
          dateMatch = yesterday.toDateString() === itemDate.toDateString();
        } else if (filters.date === "7days") {
          dateMatch = diffDays <= 7;
        } else if (filters.date === "30days") {
          dateMatch = diffDays <= 30;
        }
      }

      const itemDistance = Number(item.distance || 0);
      const distanceMatch =
        item.distance === undefined ||
        itemDistance <= Number(filters?.distance || 10);

      return categoryMatch && dateMatch && distanceMatch;
    });

    if (!searchTerm) return result;

    return result
      .map((item) => {
        const name = (item.name || "").toLowerCase();
        const category = (item.category || "").toLowerCase();
        const status = (item.status || "").toLowerCase();
        const reportType = (item.reportType || "").toLowerCase();
        const city = (item.location?.city || "").toLowerCase();
        const area = (item.location?.area || "").toLowerCase();
        const description = (item.description || "").toLowerCase();

        let score = 0;

        if (name.includes(searchTerm)) score += 6;
        if (category.includes(searchTerm)) score += 5;
        if (reportType.includes(searchTerm)) score += 4;
        if (city.includes(searchTerm)) score += 3;
        if (area.includes(searchTerm)) score += 3;
        if (description.includes(searchTerm)) score += 2;
        if (status.includes(searchTerm)) score += 1;

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [reports, searchTerm, filters]);

  const hasNoReports = !loading && reports.length === 0;
  const hasNoFilteredResults =
    !loading && reports.length > 0 && filteredReports.length === 0;

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 md:px-10 lg:px-14">
      <AnimatedBackground />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 border border-cyan-500/20 bg-white/75 px-4 py-2 shadow-sm backdrop-blur-md dark:border-cyan-400/20 dark:bg-white/5">
            <PackageSearch
              size={16}
              className="text-cyan-700 dark:text-cyan-300"
            />
            <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">
              Community Reports
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            {pageTitle}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
            {pageSubtitle}
          </p>

          {searchTerm && (
            <p className="mt-4 inline-flex items-center border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
              Search result for: "{searchTerm}"
            </p>
          )}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="overflow-hidden border border-slate-200/70 bg-white/75 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
              >
                <div className="h-64 w-full animate-pulse bg-slate-200 dark:bg-white/10" />
                <div className="space-y-4 p-5">
                  <div className="h-7 w-40 animate-pulse bg-slate-200 dark:bg-white/10" />
                  <div className="h-5 w-52 animate-pulse bg-slate-200 dark:bg-white/10" />
                  <div className="h-5 w-44 animate-pulse bg-slate-200 dark:bg-white/10" />
                  <div className="mt-5 h-px bg-slate-200 dark:bg-white/10" />
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-5 w-32 animate-pulse bg-slate-200 dark:bg-white/10" />
                    <div className="h-10 w-28 animate-pulse bg-slate-200 dark:bg-white/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : hasNoReports ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[55vh] flex-col items-center justify-center border border-slate-200/70 bg-white/75 px-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 dark:border-cyan-400/20 dark:bg-cyan-400/10">
              <SearchX size={28} className="text-cyan-700 dark:text-cyan-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              No Reports Found
            </h2>
            <p className="mt-2 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
              Nothing matched this category right now. Either the backend
              returned nothing, or your filtering is too restrictive.
            </p>
          </motion.div>
        ) : hasNoFilteredResults ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[55vh] flex-col items-center justify-center border border-slate-200/70 bg-white/75 px-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 dark:border-cyan-400/20 dark:bg-cyan-400/10">
              <SearchX size={28} className="text-cyan-700 dark:text-cyan-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              No Matching Reports
            </h2>
            <p className="mt-2 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
              No reports matched your current search or filters.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredReports.map((item) => {
              const isClosed = item.status?.toLowerCase() === "closed";
              const isLost = item.reportType?.toLowerCase() === "lost";
              const displayLocation = [item.location?.city, item.location?.area]
                .filter(Boolean)
                .join(", ");

              return (
                <motion.article
                  key={item._id}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.012 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="group overflow-hidden border border-slate-200/70 bg-white/80 shadow-[0_20px_70px_rgba(15,23,42,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_70px_rgba(0,0,0,0.28)]"
                >
                  <div className="relative h-70 overflow-hidden bg-slate-200 dark:bg-white/10">
                    <img
                      src={item.image}
                      alt={item.name || "Report image"}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span
                        className={`px-4 py-2 text-xs font-bold capitalize shadow-lg backdrop-blur-md ${
                          isLost
                            ? "bg-red-500 text-white"
                            : "bg-emerald-600 text-white"
                        }`}
                      >
                        {item.reportType || "report"}
                      </span>

                      <span
                        className={`px-4 py-2 text-xs font-bold capitalize shadow-lg backdrop-blur-md ${
                          isClosed
                            ? "bg-slate-900/90 text-white"
                            : "bg-amber-500 text-white"
                        }`}
                      >
                        {item.status || "open"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="line-clamp-1 text-[30px] font-extrabold tracking-tight text-slate-900 sm:text-[32px] dark:text-white">
                        {item.name || "Unnamed Item"}
                      </h2>

                      <span className="shrink-0 border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-orange-600 shadow-sm dark:border-orange-400/20 dark:bg-orange-400/10 dark:text-orange-300">
                        {item.category || "others"}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-3 bg-slate-50 px-4 py-3 dark:bg-white/5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 dark:bg-cyan-400/10">
                        <MapPin
                          size={18}
                          className="text-slate-600 dark:text-cyan-300"
                        />
                      </div>

                      <p className="line-clamp-1 text-base font-medium text-slate-600 sm:text-[17px] dark:text-slate-300">
                        {displayLocation || "Location not available"}
                      </p>
                    </div>

                    <div className="mt-5 h-px w-full bg-linear-to-r from-transparent via-slate-200 to-transparent dark:via-white/10" />

                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5">
                          <CalendarDays
                            size={17}
                            className="text-slate-500 dark:text-slate-300"
                          />
                        </div>
                        <p className="text-sm font-semibold text-slate-600 sm:text-base dark:text-slate-300">
                          {formatDateTime(item.createdAt || item.date)}
                        </p>
                      </div>

                      {isClosed ? (
                        <button
                          disabled
                          className="inline-flex cursor-not-allowed items-center gap-2 bg-slate-200 px-5 py-3 text-sm font-bold text-slate-500 dark:bg-white/10 dark:text-slate-400"
                        >
                          Closed
                        </button>
                      ) : (
                        <Link to={`/lostItem/${item._id}`}>
                          <motion.button
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.96 }}
                            className="inline-flex cursor-pointer items-center gap-2 bg-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(8,145,178,0.28)] transition hover:bg-cyan-700 dark:bg-cyan-500 dark:shadow-[0_10px_25px_rgba(34,211,238,0.22)] dark:hover:bg-cyan-400"
                          >
                            Details
                            <ArrowRight size={18} />
                          </motion.button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
