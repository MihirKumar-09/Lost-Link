import { useEffect, useState } from "react";
import { Heart, MapPin, Bookmark, Sparkles, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils.js";

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
            <Bookmark className="h-9 w-9 text-cyan-200" />
          </div>

          <p className="text-lg font-semibold text-white">
            Loading your saved items...
          </p>
          <p className="mt-2 text-sm text-white/60">
            Fetching your favorite reports
          </p>
        </motion.div>
      </section>
    );
  }

  if (favorites.length === 0) {
    return (
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-20 -top-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 -right-7.5 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-4xl border border-white/10 bg-white/4.5 p-10 text-center shadow-[0_25px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.10),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_30%)]" />

          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 4, 0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(34,211,238,0.12)]"
          >
            <Bookmark className="h-11 w-11 text-cyan-200" />
          </motion.div>

          <h1 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Saved Items
          </h1>
          <p className="relative mx-auto mt-3 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
            You have not saved anything yet. Browse reports and bookmark the
            ones you want to revisit later.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 md:px-8">
      {/* animated bg */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, -10, 0],
            y: [0, -20, 10, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-22.5 -top-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 15, 0],
            y: [0, 20, -10, 0],
            scale: [1, 0.96, 1.06, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-20 -right-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
        />
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-size-[28px_28px]" />
      </div>

      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative mb-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/4.5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.26)] backdrop-blur-xl md:p-6"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_30%)]" />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.08)]"
            >
              <Sparkles size={16} />
              Your personalized collection
            </motion.div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Saved Items
            </h1>
            <p className="mt-2 text-sm text-white/60 sm:text-base">
              Items you marked to revisit later
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            transition={{ duration: 0.2 }}
            className="inline-flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-linear-to-r from-cyan-400/15 to-blue-500/15 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.2)]"
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
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent opacity-50" />

              <div className="relative overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.45 }}
                  src={item.image || item.imageUrl || item.images?.[0]}
                  alt={item.name}
                  className="h-56 w-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#020617]/80 via-[#020617]/15 to-transparent opacity-95" />

                <motion.div
                  animate={{ opacity: [0.15, 0.35, 0.15] }}
                  transition={{
                    duration: 2.8 + index * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%)]"
                />

                <motion.button
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.08 }}
                  onClick={() => handleRemoveFavorite(item._id)}
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
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
                <div className="mb-5 flex items-center gap-3 text-sm text-white/70">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <MapPin size={16} className="text-cyan-200" />
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
                      className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-md transition-all duration-300 group-hover:bg-cyan-50"
                    >
                      View Details
                      <ArrowUpRight size={16} />
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveFavorite(item._id)}
                    className="cursor-pointer flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-pink-500/10"
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
