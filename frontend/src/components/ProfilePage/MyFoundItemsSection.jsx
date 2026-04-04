import { motion } from "framer-motion";
import {
  BadgeCheck,
  MapPin,
  CalendarDays,
  Clock3,
  Phone,
  Mail,
  PackageCheck,
  ArrowUpRight,
  ShieldCheck,
  FolderOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useReports } from "../../Context/ReportContext";

export default function MyFoundItemsSection() {
  const { reports = [], loading } = useReports();

  const foundReports = [...reports]
    .filter((item) => item.reportType?.toLowerCase() === "found")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const getStatusClasses = (status) => {
    const value = status?.toLowerCase();

    if (value === "closed" || value === "claimed") {
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
    }

    if (value === "open" || value === "active") {
      return "border-blue-400/20 bg-blue-400/10 text-blue-200";
    }

    return "border-white/10 bg-white/5 text-white/70";
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Unknown date";

    const date = new Date(dateValue);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateValue) => {
    if (!dateValue) return "Unknown time";

    const date = new Date(dateValue);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (dateValue) => {
    if (!dateValue) return "Recently";

    const date = new Date(dateValue);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 5) return `${weeks} week ago`;

    const months = Math.floor(days / 30);
    return `${months} month ago`;
  };

  if (loading) {
    return (
      <section className="relative min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="relative flex min-h-[70vh] items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex w-full max-w-md flex-col items-center rounded-[30px] border border-white/10 bg-white/4 px-8 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-300/80 to-transparent" />

            <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-blue-300/20 bg-blue-400/10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="absolute h-20 w-20 rounded-full border-[3px] border-white/10 border-t-blue-300"
              />
              <PackageCheck className="h-9 w-9 text-blue-200" />
            </div>

            <p className="text-lg font-semibold text-white">
              Loading your found reports...
            </p>
            <p className="mt-2 text-sm text-white/60">
              Fetching your found item history
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/4 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.10),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-300/70 to-transparent" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-300/15 bg-blue-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-blue-200">
              <BadgeCheck size={14} />
              Found Reports
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
              My Found Items
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65 md:text-base">
              Review every found item report you have submitted. Track status,
              location, timeline, and contact details in one premium view.
            </p>
          </div>

          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="inline-flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-400/20 to-cyan-400/20 text-blue-200 shadow-[0_0_25px_rgba(59,130,246,0.15)]">
              <FolderOpen size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                Total Found
              </p>
              <p className="text-2xl font-bold text-white">
                {String(foundReports.length).padStart(2, "0")}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {foundReports.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[30px] border border-dashed border-white/10 bg-white/4 px-6 py-14 text-center shadow-[0_14px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_28%)]" />

          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/6 text-blue-200">
            <ShieldCheck size={28} />
          </div>

          <h3 className="mt-5 text-2xl font-bold text-white">
            No found reports yet
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/55 md:text-base">
            You have not created any found item reports yet. Once you submit a
            found report, it will appear here with full details and tracking.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {foundReports.map((item, index) => (
            <motion.article
              key={item._id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.06,
                ease: "easeOut",
              }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/4 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-6"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_30%)] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent opacity-50" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-400/10 blur-2xl" />

              <div className="relative flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-blue-200">
                        found
                      </span>

                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${getStatusClasses(
                          item.status,
                        )}`}
                      >
                        {item.status || "unknown"}
                      </span>
                    </div>

                    <h3 className="mt-3 truncate text-xl font-bold text-white">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-white/50">
                      {item.category || "Uncategorized"}
                      {item.color ? ` • ${item.color}` : ""}
                      {item.model ? ` • ${item.model}` : ""}
                    </p>

                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-xs text-cyan-200">
                      <Clock3 size={13} />
                      {getTimeAgo(item.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                      Found Location
                    </p>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-white/80">
                      <MapPin size={15} className="text-blue-200" />
                      {item.location?.city || "Unknown city"}
                      {item.location?.area ? `, ${item.location.area}` : ""}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                      Reported On
                    </p>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-white/80">
                      <CalendarDays size={15} className="text-cyan-200" />
                      {formatDate(item.dateTime)}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-2 text-sm text-white/55">
                      <Clock3 size={15} className="text-cyan-200" />
                      {formatTime(item.dateTime)}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                    Description
                  </p>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/65">
                    {item.description || "No description available."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                      Contact Email
                    </p>
                    <p className="mt-2 inline-flex items-center gap-2 break-all text-sm text-white/80">
                      <Mail size={15} className="text-blue-200" />
                      {item.contact?.email || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                      Contact Phone
                    </p>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-white/80">
                      <Phone size={15} className="text-emerald-200" />
                      {item.contact?.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/40">
                    Report ID: {item._id?.slice(-6) || "N/A"}
                  </div>

                  {item?._id && (
                    <Link
                      to={`/lostItem/${item._id}`}
                      className="group/link inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:border-cyan-300/20 hover:bg-cyan-400/10 hover:text-cyan-200"
                    >
                      View Details
                      <ArrowUpRight
                        size={16}
                        className="transition duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
