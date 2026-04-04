import { motion } from "framer-motion";
import {
  BadgeCheck,
  Handshake,
  Search,
  TriangleAlert,
  Sparkles,
  LayoutDashboard,
  Clock3,
  FolderOpen,
  TrendingUp,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import { useReports } from "../../Context/ReportContext";

export default function DashboardSection() {
  const { user, loading: authLoading } = useAuth();
  const {
    totalLostReports = 0,
    totalFoundReports = 0,
    totalReports = 0,
    reports = [],
    loading: reportLoading,
  } = useReports();

  const loading = authLoading || reportLoading;

  const successfulMatches = reports.filter(
    (item) =>
      item.status?.toLowerCase() === "claimed" ||
      item.status?.toLowerCase() === "closed",
  ).length;

  const activeReports = reports.filter(
    (item) =>
      item.status?.toLowerCase() === "open" ||
      item.status?.toLowerCase() === "active",
  ).length;

  const closedReports = reports.filter(
    (item) => item.status?.toLowerCase() === "closed",
  ).length;

  const successRate =
    totalReports === 0
      ? 0
      : Math.round((successfulMatches / totalReports) * 100);

  const recentReports = [...reports]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const latestReport = recentReports[0];

  const categoryCount = reports.reduce((acc, item) => {
    const key = item.category || "Others";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const stats = [
    {
      title: "Total Lost",
      value: totalLostReports,
      icon: Search,
      iconWrap: "from-sky-400/20 via-cyan-400/10 to-blue-500/20 text-cyan-300",
      glow: "shadow-[0_0_30px_rgba(34,211,238,0.18)]",
    },
    {
      title: "Total Found",
      value: totalFoundReports,
      icon: BadgeCheck,
      iconWrap:
        "from-blue-400/20 via-indigo-400/10 to-cyan-400/20 text-blue-300",
      glow: "shadow-[0_0_30px_rgba(96,165,250,0.18)]",
    },
    {
      title: "Successful Matches",
      value: successfulMatches,
      icon: Handshake,
      iconWrap:
        "from-emerald-400/20 via-teal-400/10 to-cyan-400/20 text-emerald-300",
      glow: "shadow-[0_0_30px_rgba(52,211,153,0.18)]",
    },
    {
      title: "Active Reports",
      value: activeReports || totalReports,
      icon: TriangleAlert,
      iconWrap:
        "from-rose-400/20 via-orange-400/10 to-red-500/20 text-rose-300",
      glow: "shadow-[0_0_30px_rgba(251,113,133,0.18)]",
    },
  ];

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

  const getStatusClasses = (status) => {
    const value = status?.toLowerCase();

    if (value === "closed" || value === "claimed") {
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
    }

    if (value === "open" || value === "active") {
      return "border-cyan-400/20 bg-cyan-400/10 text-cyan-200";
    }

    return "border-white/10 bg-white/5 text-white/70";
  };

  const getReportTypeClasses = (type) => {
    const value = type?.toLowerCase();

    if (value === "lost") {
      return "border-rose-400/20 bg-rose-400/10 text-rose-200";
    }

    if (value === "found") {
      return "border-blue-400/20 bg-blue-400/10 text-blue-200";
    }

    return "border-white/10 bg-white/5 text-white/70";
  };

  if (loading) {
    return (
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0">
          <div className="absolute -left-15 -top-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-7.5 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex w-full max-w-md flex-col items-center rounded-[30px] border border-white/10 bg-white/4 px-8 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/80 to-transparent" />

          <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="absolute h-20 w-20 rounded-full border-[3px] border-white/10 border-t-cyan-300"
            />
            <LayoutDashboard className="h-9 w-9 text-cyan-200" />
          </div>

          <p className="text-lg font-semibold text-white">
            Loading your dashboard...
          </p>
          <p className="mt-2 text-sm text-white/60">
            Fetching your reports and insights
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/4 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.10),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_28%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/70 to-transparent" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
              <Sparkles size={14} />
              Dashboard Overview
            </div>

            <h4 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
              Welcome back,{" "}
              <span className="bg-linear-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                {user?.name || "User"}
              </span>
            </h4>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65 md:text-base">
              Your Lost Link dashboard is up to date. Track reports, monitor
              matches, and manage your activity from one place.
            </p>
          </div>

          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 4, 0, -4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-cyan-400/15 to-blue-500/15 text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.18)] md:flex"
          >
            <Sparkles size={28} />
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/4.5 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_30%)] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent opacity-40" />

              <div className="relative flex items-start justify-between">
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 2.8 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`flex h-13 w-13 items-center justify-center rounded-2xl bg-linear-to-br ${item.iconWrap} ${item.glow}`}
                >
                  <Icon size={22} />
                </motion.span>

                <div className="h-2.5 w-2.5 rounded-full bg-cyan-300/70 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
              </div>

              <div className="relative mt-6">
                <p className="text-sm font-medium tracking-wide text-white/65">
                  {item.title}
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <h6 className="text-4xl font-bold leading-none tracking-tight text-white">
                    {String(item.value).padStart(2, "0")}
                  </h6>
                  <span className="pb-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200/70">
                    stats
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-white/5 blur-2xl" />
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/4 p-5 shadow-[0_14px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-6"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/70 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_28%)]" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
                <Clock3 size={14} />
                Recent Activity
              </div>
              <h5 className="mt-3 text-xl font-bold text-white md:text-2xl">
                Latest report updates
              </h5>
              <p className="mt-2 text-sm leading-6 text-white/60">
                A quick view of your most recent lost and found reports.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-white/6 px-3 py-2 text-right md:block">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                Latest
              </p>
              <p className="mt-1 text-sm font-semibold text-cyan-200">
                {latestReport
                  ? getTimeAgo(latestReport.createdAt)
                  : "No activity"}
              </p>
            </div>
          </div>

          <div className="relative mt-6 space-y-4">
            {recentReports.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/4 px-5 py-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-cyan-200">
                  <FolderOpen size={24} />
                </div>
                <h6 className="mt-4 text-lg font-semibold text-white">
                  No recent reports yet
                </h6>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/55">
                  Once you create lost or found reports, your latest activity
                  will appear here with status and timeline.
                </p>
              </div>
            ) : (
              recentReports.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.08 * index,
                    ease: "easeOut",
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/20 hover:bg-white/7"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_right,rgba(255,255,255,0.08),transparent_30%)]" />

                  <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${getReportTypeClasses(
                            item.reportType,
                          )}`}
                        >
                          {item.reportType || "Report"}
                        </span>

                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${getStatusClasses(
                            item.status,
                          )}`}
                        >
                          {item.status || "Unknown"}
                        </span>
                      </div>

                      <h6 className="mt-3 truncate text-lg font-semibold text-white">
                        {item.name}
                      </h6>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/55">
                        <span className="inline-flex items-center gap-1.5">
                          <FolderOpen size={14} />
                          {item.category || "Uncategorized"}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} />
                          {item.location?.city || "Unknown city"}
                          {item.location?.area ? `, ${item.location.area}` : ""}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center justify-between gap-4 md:flex-col md:items-end">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-200">
                        <Clock3 size={14} />
                        {getTimeAgo(item.createdAt)}
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-white/45">
                        View details
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/4 p-5 shadow-[0_14px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-6"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-300/70 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_26%)]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
                <TrendingUp size={14} />
                Performance
              </div>

              <h5 className="mt-3 text-xl font-bold text-white">
                Report insights
              </h5>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                    Success Rate
                  </p>
                  <h6 className="mt-2 text-3xl font-bold text-white">
                    {String(successRate).padStart(2, "0")}%
                  </h6>
                  <p className="mt-2 text-sm text-white/55">
                    Based on closed or matched reports
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                    Closed Reports
                  </p>
                  <h6 className="mt-2 text-3xl font-bold text-white">
                    {String(closedReports).padStart(2, "0")}
                  </h6>
                  <p className="mt-2 text-sm text-white/55">
                    Reports resolved successfully
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                      Active Progress
                    </p>
                    <h6 className="mt-2 text-2xl font-bold text-white">
                      {activeReports}/{totalReports || 0}
                    </h6>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-400/10 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
                    <ShieldCheck size={24} />
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        totalReports === 0
                          ? 0
                          : Math.min(
                              100,
                              Math.round((activeReports / totalReports) * 100),
                            )
                      }%`,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-linear-to-r from-emerald-400 via-cyan-300 to-blue-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/4 p-5 shadow-[0_14px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-6"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-300/70 to-transparent" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-blue-200">
                <FolderOpen size={14} />
                Top Categories
              </div>

              <h5 className="mt-3 text-xl font-bold text-white">
                Most reported items
              </h5>

              <div className="mt-5 space-y-3">
                {topCategories.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-white/10 bg-white/4 px-4 py-8 text-center text-sm text-white/55">
                    No category insights available yet.
                  </div>
                ) : (
                  topCategories.map(([category, count], index) => {
                    const percentage =
                      totalReports === 0
                        ? 0
                        : Math.round((count / totalReports) * 100);

                    return (
                      <div
                        key={category}
                        className="rounded-3xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {category}
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/45">
                              {count} reports
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-semibold text-cyan-200">
                              {percentage}%
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{
                              duration: 0.7,
                              delay: index * 0.08,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-linear-to-r from-blue-400 via-cyan-300 to-sky-400"
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
