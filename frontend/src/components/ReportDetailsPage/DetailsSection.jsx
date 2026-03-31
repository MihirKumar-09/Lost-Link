import {
  BadgeCheck,
  Calendar,
  Heart,
  HeartCrack,
  Info,
  MapPin,
  MessageSquare,
  Shapes,
  TimerReset,
  Trash,
} from "lucide-react";
import { cn } from "../../lib/utils.js";
import { formatDistanceToNowStrict } from "date-fns";
import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

export default function DetailsSection({ productDetails }) {
  const [showEmail, setShowEmail] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [heartEffect, setHeartEffect] = useState(null);

  const type = productDetails?.reportType;
  const { user } = useAuth();
  const navigate = useNavigate();

  const isOwner = String(user?._id) === String(productDetails?.userId);

  const handleDeleteReport = async () => {
    try {
      setIsDeleting(true);

      const res = await fetch(
        `http://localhost:8080/reports/deleteReport/${productDetails._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete report");
      }

      setShowConfirm(false);
      toast.success("Delete successful");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.log("Delete error:", err);
      toast.error("Delete failed, try again");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (!productDetails?._id) return;

    const checkFavorite = async () => {
      try {
        const res = await fetch("http://localhost:8080/favorites", {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) return;

        const data = await res.json();

        if (!res.ok) {
          console.log(data.message || "Failed to fetch favorites");
          return;
        }

        const exists = data.favorites.some(
          (item) => String(item._id) === String(productDetails._id),
        );

        setIsFavorite(exists);
      } catch (err) {
        console.log("Fetch favorite error : ", err);
      }
    };

    checkFavorite();
  }, [productDetails?._id]);

  const handleToggleFavorite = async () => {
    if (!productDetails?._id || favoriteLoading) return;

    try {
      setFavoriteLoading(true);

      const res = await fetch(
        `http://localhost:8080/favorites/toggle/${productDetails._id}`,
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
        toast.error(data.message || "Failed to update favorite");
        return;
      }

      setIsFavorite(data.isFavorite);
      setHeartEffect(data.isFavorite ? "add" : "remove");

      if (data.isFavorite) {
        toast.success("Added to favorites");
      } else {
        toast.success("Removed from favorites");
      }

      setTimeout(() => {
        setHeartEffect(null);
      }, 650);
    } catch (err) {
      console.log("Toggle favorite error:", err);
      toast.error("Something went wrong");
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (!productDetails) {
    return <p>Loading...</p>;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <>
      <section className="w-full md:w-1/2">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative overflow-hidden border shadow-[0_20px_60px_rgba(15,23,42,0.10)] rounded-[30px] border-white/60 bg-white"
        >
          {/* background glow */}
          <div className="pointer-events-none absolute -top-24 -right-16 h-52 w-52 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-indigo-100/60 blur-3xl" />

          {/* top gradient bar */}
          <div className="h-2 w-full bg-linear-to-r from-[#3358D4] via-[#6C63FF] to-[#22C55E]" />

          <div className="relative px-5 py-5 md:px-6 md:py-6">
            {/* Top Row */}
            <motion.div
              variants={itemVariants}
              className="flex items-start justify-between gap-4"
            >
              <motion.span
                whileHover={{ scale: 1.04 }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm",
                  type === "lost"
                    ? "bg-[#FEE2E2] text-[#B91C1C]"
                    : type === "found"
                      ? "bg-[#DCFCE7] text-[#15803D]"
                      : "bg-gray-200 text-gray-500",
                )}
              >
                <span className="text-lg leading-none">•</span>
                {type === "lost"
                  ? "LOST ITEM"
                  : type === "found"
                    ? "FOUND ITEM"
                    : "UNKNOWN ITEM"}
              </motion.span>

              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  onClick={handleToggleFavorite}
                  disabled={favoriteLoading}
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md cursor-pointer disabled:cursor-not-allowed"
                >
                  <AnimatePresence>
                    {heartEffect === "add" && (
                      <>
                        <motion.span
                          key="burst-ring"
                          initial={{ scale: 0.4, opacity: 0.45 }}
                          animate={{ scale: 2, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.45 }}
                          className="absolute h-8 w-8 rounded-full bg-pink-300"
                        />
                        <motion.span
                          key="burst-dot-1"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                          animate={{ x: -16, y: -16, opacity: 0, scale: 1.1 }}
                          transition={{ duration: 0.45 }}
                          className="absolute h-2 w-2 rounded-full bg-pink-400"
                        />
                        <motion.span
                          key="burst-dot-2"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                          animate={{ x: 16, y: -16, opacity: 0, scale: 1.1 }}
                          transition={{ duration: 0.45 }}
                          className="absolute h-2 w-2 rounded-full bg-pink-400"
                        />
                        <motion.span
                          key="burst-dot-3"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                          animate={{ x: -16, y: 16, opacity: 0, scale: 1.1 }}
                          transition={{ duration: 0.45 }}
                          className="absolute h-2 w-2 rounded-full bg-pink-400"
                        />
                        <motion.span
                          key="burst-dot-4"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                          animate={{ x: 16, y: 16, opacity: 0, scale: 1.1 }}
                          transition={{ duration: 0.45 }}
                          className="absolute h-2 w-2 rounded-full bg-pink-400"
                        />
                      </>
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    {heartEffect === "remove" ? (
                      <motion.div
                        key="broken-heart"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{
                          rotate: [0, -12, 12, -8, 8, 0],
                          scale: [1, 1.15, 0.92, 1],
                          opacity: [1, 1, 0.85, 1],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute"
                      >
                        <HeartCrack
                          size={24}
                          className={cn(
                            "text-gray-500",
                            favoriteLoading && "opacity-50",
                          )}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={isFavorite ? "heart-filled" : "heart-empty"}
                        initial={
                          isFavorite
                            ? { scale: 0.45, opacity: 0, rotate: -18 }
                            : { scale: 1, opacity: 1 }
                        }
                        animate={
                          isFavorite
                            ? {
                                scale: [0.45, 1.28, 1],
                                rotate: [-18, 10, 0],
                                opacity: 1,
                              }
                            : {
                                scale: 1,
                                rotate: 0,
                                opacity: 1,
                              }
                        }
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{
                          duration: isFavorite ? 0.4 : 0.25,
                          ease: "easeOut",
                        }}
                        className="absolute"
                      >
                        <Heart
                          size={24}
                          className={cn(
                            "transition-colors duration-200",
                            isFavorite
                              ? "fill-pink-500 text-pink-500 drop-shadow-sm"
                              : "text-gray-500",
                            favoriteLoading && "opacity-50",
                          )}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {isOwner && (
                  <motion.button
                    type="button"
                    onClick={() => setShowConfirm(true)}
                    whileHover={{ scale: 1.05, color: "#ef4444" }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md cursor-pointer"
                  >
                    <Trash />
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants} className="mt-5">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                {productDetails.name}
                <span className="ml-2 text-gray-400">•</span>
                <span className="ml-2 text-gray-600">
                  {productDetails.color}
                </span>
              </h2>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#EEF4FF] px-4 py-2 text-sm font-medium text-[#3358D4]">
                <TimerReset size={16} />
                Reported{" "}
                {formatDistanceToNowStrict(
                  new Date(productDetails?.createdAt),
                  {
                    addSuffix: true,
                  },
                )}
              </div>
            </motion.div>

            {/* Info cards */}
            <motion.div
              variants={itemVariants}
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-gray-100 bg-linear-to-br from-[#F8FAFF] to-[#EEF4FF] p-4 shadow-sm"
              >
                <p className="text-xs font-bold tracking-wide text-gray-500">
                  LOCATION
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 shadow-sm">
                    <MapPin size={20} color="#2563EB" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 md:text-base">
                    {productDetails.location?.area},{" "}
                    {productDetails.location?.city}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-gray-100 bg-linear-to-br from-[#F8FAFF] to-[#EEF4FF] p-4 shadow-sm"
              >
                <p className="text-xs font-bold tracking-wide text-gray-500">
                  {type === "lost" ? "LOST DATE" : "FOUND DATE"}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 shadow-sm">
                    <Calendar size={20} color="#2563EB" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 md:text-base">
                    {new Date(productDetails?.dateTime).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-gray-100 bg-linear-to-br from-[#F8FAFF] to-[#EEF4FF] p-4 shadow-sm"
              >
                <p className="text-xs font-bold tracking-wide text-gray-500">
                  CATEGORY
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 shadow-sm">
                    <Shapes size={20} color="#2563EB" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 md:text-base">
                    {productDetails.category}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-gray-100 bg-linear-to-br from-[#F8FAFF] to-[#EEF4FF] p-4 shadow-sm"
              >
                <p className="text-xs font-bold tracking-wide text-gray-500">
                  STATUS
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 shadow-sm">
                    <Info size={20} color="#2563EB" />
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-sm font-semibold",
                      productDetails.status === "closed"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-amber-100 text-amber-700",
                    )}
                  >
                    {productDetails.status}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="mt-7 rounded-2xl border border-gray-100 bg-white/90 p-5 shadow-sm"
            >
              <h4 className="text-sm font-bold tracking-wide text-gray-500">
                DESCRIPTION
              </h4>
              <p className="mt-3 text-[15px] leading-7 text-gray-700 md:text-base">
                {productDetails.description}
              </p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="mt-7 space-y-4">
              <motion.div
                whileHover={{
                  y: -3,
                  boxShadow: "0px 16px 35px rgba(66,103,236,0.28)",
                }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-[#3358D4] via-[#4267ec] to-[#5B7CFA] px-4 py-4 text-center cursor-pointer shadow-lg"
              >
                <div className="rounded-full bg-white/15 p-2">
                  <BadgeCheck color="white" />
                </div>
                <button className="text-base font-semibold text-white cursor-pointer md:text-lg">
                  {productDetails.reportType === "lost"
                    ? "I found this (Report Now)"
                    : "This is Mine (Claim item)"}
                </button>
              </motion.div>

              <motion.div
                onClick={() => setShowEmail((prev) => !prev)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white cursor-pointer shadow-sm"
              >
                <div className="flex items-center justify-center gap-3 px-4 py-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <MessageSquare color="black" size={20} />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.button
                      key={showEmail ? "email" : "contact"}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                      className="text-base font-semibold text-black cursor-pointer md:text-lg"
                    >
                      {showEmail
                        ? productDetails?.contact?.email
                        : "Contact Details"}
                    </motion.button>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                Delete Report?
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                This action cannot be undone. Are you sure you want to delete
                this report?
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <motion.button
                  type="button"
                  onClick={() => !isDeleting && setShowConfirm(false)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  disabled={isDeleting}
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleDeleteReport}
                  disabled={isDeleting}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white cursor-pointer hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
