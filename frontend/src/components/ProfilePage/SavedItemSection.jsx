import { useEffect, useState } from "react";
import { Heart, MapPin, Bookmark, Sparkles } from "lucide-react";
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="mb-4 h-14 w-14 rounded-full border-4 border-gray-200 border-t-black"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-medium text-gray-600"
        >
          Loading your saved items...
        </motion.p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100"
          >
            <Bookmark className="h-10 w-10 text-gray-600" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900">Saved Items</h1>
          <p className="mt-3 text-gray-500">
            You haven’t saved anything yet. Start exploring reports and save
            items you want to revisit later.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-[#f8fafc] via-white to-[#eef2ff] px-4 py-8 sm:px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
            <Sparkles size={16} />
            Your personalized collection
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Saved Items
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Items you marked to revisit later
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="inline-flex w-fit items-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          <Heart size={16} className="fill-white" />
          {favorites.length} Saved
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence>
          {favorites.map((item) => (
            <motion.div
              key={item._id}
              variants={cardVariants}
              layout
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-[28px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.45 }}
                  src={item.image || item.imageUrl || item.images?.[0]}
                  alt={item.name}
                  className="h-56 w-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent opacity-90" />

                <motion.button
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.08 }}
                  onClick={() => handleRemoveFavorite(item._id)}
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md"
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
                    <p className="truncate text-sm text-white/80">
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
                <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                    <MapPin size={16} className="text-gray-700" />
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
                      className="w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 group-hover:bg-gray-900"
                    >
                      View Details
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveFavorite(item._id)}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 transition hover:bg-pink-50"
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
