import { useEffect, useState } from "react";
import { Heart, MapPin, Bookmark, Sparkles, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils.js";

function AnimatedBackground() {
  const particles = Array.from({ length: 14 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* base mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(59,130,246,0.12),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.10),transparent_28%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(59,130,246,0.14),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(96,165,250,0.12),transparent_28%)]" />

      {/* moving light beam */}
      <motion.div
        animate={{ x: ["-20%", "120%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        className="absolute -top-10 h-[160%] w-32 rotate-12 bg-linear-to-b from-transparent via-cyan-400/10 to-transparent blur-2xl dark:via-cyan-300/12"
      />

      {/* orb 1 */}
      <motion.div
        animate={{
          x: [0, 80, -20, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.92, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-400/18 blur-3xl dark:bg-cyan-400/16"
      />

      {/* orb 2 */}
      <motion.div
        animate={{
          x: [0, -60, 35, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.94, 1.08, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-blue-500/16 blur-3xl dark:bg-blue-500/14"
      />

      {/* orb 3 */}
      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -25, 25, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-20 left-1/3 h-96 w-96 rounded-full bg-sky-400/12 blur-3xl dark:bg-sky-400/10"
      />

      {/* rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="absolute left-[8%] top-[18%] h-56 w-56 rounded-full border border-cyan-400/12 blur-[2px]"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute right-[10%] bottom-[12%] h-72 w-72 rounded-full border border-blue-400/10 blur-[2px]"
      />

      {/* floating particles */}
      {particles.map((_, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0.15,
            x: `${(index % 5) * 22}%`,
            y: `${(index % 4) * 24}%`,
          }}
          animate={{
            opacity: [0.15, 0.45, 0.15],
            y: [
              `${(index % 4) * 24}%`,
              `${(index % 4) * 24 - 4}%`,
              `${(index % 4) * 24}%`,
            ],
            x: [
              `${(index % 5) * 22}%`,
              `${(index % 5) * 22 + 2}%`,
              `${(index % 5) * 22}%`,
            ],
          }}
          transition={{
            duration: 3 + index * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-2 w-2 rounded-full bg-cyan-400/40 blur-[1px] dark:bg-cyan-300/45"
          style={{
            left: `${8 + (index % 5) * 20}%`,
            top: `${10 + (index % 4) * 20}%`,
          }}
        />
      ))}

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10] bg-[linear-gradient(rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.12)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-size-[30px_30px]" />

      {/* fade layer for readability */}
      <div className="absolute inset-0 bg-white/55 dark:bg-slate-950/45" />
    </div>
  );
}

export default function SavedItemSection() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const res = await fetch("http://localhost:8080/favorites", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 401) {
        toast.error("Please login first");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        console.log(data.message || "Failed to fetch favorites");
        setLoading(false);
        return;
      }

      setFavorites(data.favorites);
    } catch (err) {
      console.log("Fetch favorites error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (reportId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/favorites/toggle/${reportId}`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await res.json();

      if (res.status === 401) {
        toast.error("Please login first");
        return;
      }

      if (!res.ok) {
        toast.error(data.message || "Failed to remove item");
        return;
      }

      setFavorites((prev) => prev.filter((item) => item._id !== reportId));
      toast.success("Removed from favorites");
    } catch (err) {
      console.log("Remove favorite error:", err);
      toast.error("Something went wrong");
    }
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      y: 20,
      transition: {
        duration: 0.25,
      },
    },
  };

  if (loading) {
    return (
      <section className="relative flex min-h-[calc(100vh-127px)]  items-center justify-center overflow-hidden px-4">
        <AnimatedBackground />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex w-full max-w-md flex-col items-center overflow-hidden rounded-4xl border border-slate-200/70 bg-white/70 px-8 py-12 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8 dark:shadow-[0_20px_60px_rgba(0,0,0,0.32)]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/80 to-transparent" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute -top-10 h-32 w-32 rounded-full border border-cyan-400/15"
          />

          <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
              className="absolute h-20 w-20 rounded-full border-[3px] border-slate-300/30 border-t-cyan-500 dark:border-white/10 dark:border-t-cyan-300"
            />
            <Bookmark className="h-9 w-9 text-cyan-700 dark:text-cyan-200" />
          </div>

          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            Loading your saved items...
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-white/60">
            Fetching your favorite reports
          </p>
        </motion.div>
      </section>
    );
  }

  if (favorites.length === 0) {
    return (
      <section className="relative flex min-h-[calc(100vh-127px)] items-center justify-center overflow-hidden px-4">
        <AnimatedBackground />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-[34px] border border-slate-200/70 bg-white/72 p-10 text-center shadow-[0_25px_80px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8 dark:shadow-[0_25px_80px_rgba(0,0,0,0.34)]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/80 to-transparent" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10"
          />

          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 4, 0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-slate-200/80 bg-white/75 shadow-[0_0_40px_rgba(34,211,238,0.15)] dark:border-white/10 dark:bg-white/8"
          >
            <Bookmark className="h-11 w-11 text-cyan-700 dark:text-cyan-200" />
          </motion.div>

          <h1 className="relative text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Saved Items
          </h1>
          <p className="relative mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600 sm:text-base dark:text-white/65">
            You have not saved anything yet. Browse reports and bookmark the
            ones you want to revisit later.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 md:px-8">
      <AnimatedBackground />

      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative mb-8 overflow-hidden rounded-[30px] border border-slate-200/70 bg-white/72 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8 dark:shadow-[0_20px_70px_rgba(0,0,0,0.28)] md:p-6"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/80 to-transparent" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-cyan-400/12"
        />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-700 shadow-[0_0_20px_rgba(34,211,238,0.10)] dark:text-cyan-100"
            >
              <Sparkles size={16} />
              Your personalized collection
            </motion.div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Saved Items
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-white/60 sm:text-base">
              Items you marked to revisit later
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            transition={{ duration: 0.2 }}
            className="inline-flex w-fit items-center gap-2 rounded-2xl border border-cyan-400/20 bg-linear-to-r from-cyan-400/12 to-blue-500/12 px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.08)] dark:text-white"
          >
            <Heart size={16} className="fill-pink-500 text-pink-500" />
            {favorites.length} Saved
          </motion.div>
        </div>
      </motion.div>

      {/* cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence>
          {favorites.map((item, index) => (
            <motion.div
              key={item._id}
              variants={cardVariants}
              layout
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/72 shadow-[0_18px_45px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-white/8 dark:shadow-[0_18px_45px_rgba(0,0,0,0.24)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/65 to-transparent opacity-70" />

              <div className="relative overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.45 }}
                  src={item.image || item.imageUrl || item.images?.[0]}
                  alt={item.name}
                  className="h-56 w-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/15 to-transparent dark:from-[#020617]/80 dark:via-[#020617]/15 dark:to-transparent opacity-95" />

                <motion.div
                  animate={{
                    opacity: [0.18, 0.38, 0.18],
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 2.8 + index * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%)]"
                />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 18 + index * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-white/10"
                />

                <motion.button
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.08 }}
                  onClick={() => handleRemoveFavorite(item._id)}
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-md dark:bg-white/10"
                >
                  <Heart
                    size={20}
                    className="fill-pink-500 text-pink-500 drop-shadow-sm"
                  />
                </motion.button>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-xl font-bold text-white">
                      {item.name}
                    </h2>
                    <p className="truncate text-sm text-white/75">
                      {item.category}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize backdrop-blur-md",
                      item.reportType === "lost" &&
                        "bg-red-100/90 text-red-700",
                      item.reportType === "found" &&
                        "bg-emerald-100/90 text-emerald-700",
                    )}
                  >
                    {item.reportType}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-5 flex items-center gap-3 text-sm text-slate-700 dark:text-white/70">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 dark:border-white/10 dark:bg-white/5">
                    <MapPin
                      size={16}
                      className="text-cyan-700 dark:text-cyan-200"
                    />
                  </div>
                  <span className="font-medium">
                    {item.location?.city || "Unknown location"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Link to={`/lostItem/${item._id}`} className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 group-hover:bg-cyan-600 dark:bg-white dark:text-slate-900 dark:group-hover:bg-cyan-50"
                    >
                      View Details
                      <ArrowUpRight size={16} />
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveFavorite(item._id)}
                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 transition hover:bg-pink-500/10 dark:border-white/10 dark:bg-white/5"
                  >
                    <Heart size={20} className="fill-pink-500 text-pink-500" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
