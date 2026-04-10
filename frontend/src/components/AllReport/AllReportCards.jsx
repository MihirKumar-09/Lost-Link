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

    // 1) filter bar filters
    result = result.filter((item) => {
      // category filter
      const categoryMatch =
        !filters?.category ||
        filters.category === "All" ||
        (item.category || "").toLowerCase() === filters.category.toLowerCase();

      // date filter
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

      // distance filter
      // This only works if backend sends item.distance
      const itemDistance = Number(item.distance || 0);
      const distanceMatch =
        item.distance === undefined ||
        itemDistance <= Number(filters?.distance || 10);

      return categoryMatch && dateMatch && distanceMatch;
    });

    // 2) navbar search filter + ranking
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
    <section className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_35%,#f8fafc_100%)] px-4 py-8 sm:px-6 md:px-10 lg:px-14">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-8 md:mb-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#dbe4ff] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md">
          <PackageSearch size={16} className="text-[#3358D4]" />
          <span className="text-sm font-semibold text-[#3358D4]">
            Community Reports
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl md:text-5xl">
          {pageTitle}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          {pageSubtitle}
        </p>

        {searchTerm && (
          <p className="mt-4 inline-flex items-center rounded-full bg-[#EEF2FF] px-4 py-2 text-sm font-semibold text-[#3358D4]">
            Search result for: "{searchTerm}"
          </p>
        )}
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-[30px] border border-white/70 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              <div className="h-64 w-full animate-pulse bg-slate-200" />
              <div className="space-y-4 p-5">
                <div className="h-7 w-40 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-5 w-52 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-5 w-44 animate-pulse rounded-lg bg-slate-200" />
                <div className="mt-5 h-px bg-slate-200" />
                <div className="flex items-center justify-between pt-2">
                  <div className="h-5 w-32 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : hasNoReports ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[55vh] flex-col items-center justify-center rounded-4xl border border-white/70 bg-white/75 px-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF2FF]">
            <SearchX size={28} className="text-[#3358D4]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A]">
            No Reports Found
          </h2>
          <p className="mt-2 max-w-md text-sm leading-7 text-slate-500">
            Nothing matched this category right now. Either the backend returned
            nothing, or your filtering is too restrictive.
          </p>
        </motion.div>
      ) : hasNoFilteredResults ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[55vh] flex-col items-center justify-center rounded-4xl border border-white/70 bg-white/75 px-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF2FF]">
            <SearchX size={28} className="text-[#3358D4]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A]">
            No Matching Reports
          </h2>
          <p className="mt-2 max-w-md text-sm leading-7 text-slate-500">
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
                className="group overflow-hidden rounded-[30px] border border-white/70 bg-white/85 shadow-[0_20px_70px_rgba(15,23,42,0.09)] backdrop-blur-xl"
              >
                <div className="relative h-70 overflow-hidden bg-[#E5E7EB]">
                  <img
                    src={item.image}
                    alt={item.name || "Report image"}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-bold capitalize shadow-lg backdrop-blur-md ${
                        isLost
                          ? "bg-[#FF4D4F] text-white"
                          : "bg-[#16A34A] text-white"
                      }`}
                    >
                      {item.reportType || "report"}
                    </span>

                    <span
                      className={`rounded-full px-4 py-2 text-xs font-bold capitalize shadow-lg backdrop-blur-md ${
                        isClosed
                          ? "bg-slate-800/90 text-white"
                          : "bg-[#FFB703] text-white"
                      }`}
                    >
                      {item.status || "open"}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="line-clamp-1 text-[30px] font-extrabold tracking-tight text-[#0F172A] sm:text-[32px]">
                      {item.name || "Unnamed Item"}
                    </h2>

                    <span className="shrink-0 rounded-full border border-[#FFD9B8] bg-[#FFF4EA] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#FF7A00] shadow-sm">
                      {item.category || "others"}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#F8FAFC] px-4 py-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF]">
                      <MapPin size={18} className="text-[#64748B]" />
                    </div>

                    <p className="line-clamp-1 text-base font-medium text-slate-500 sm:text-[17px]">
                      {displayLocation || "Location not available"}
                    </p>
                  </div>

                  <div className="mt-5 h-px w-full bg-linear-to-r from-transparent via-slate-200 to-transparent" />

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9]">
                        <CalendarDays size={17} className="text-slate-500" />
                      </div>
                      <p className="text-sm font-semibold text-slate-500 sm:text-base">
                        {formatDateTime(item.createdAt || item.date)}
                      </p>
                    </div>

                    {isClosed ? (
                      <button
                        disabled
                        className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-slate-200 px-5 py-3 text-sm font-bold text-slate-500"
                      >
                        Closed
                      </button>
                    ) : (
                      <Link to={`/lostItem/${item._id}`}>
                        <motion.button
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.96 }}
                          className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#3358D4] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(51,88,212,0.28)] transition hover:bg-[#2948b6]"
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
    </section>
  );
}
