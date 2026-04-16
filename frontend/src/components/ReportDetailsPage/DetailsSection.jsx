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
  RotateCcw,
  X,
} from "lucide-react";
import { cn } from "../../lib/utils.js";
import { formatDistanceToNowStrict } from "date-fns";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import ClaimRequestModal from "../chat/ClaimRequestModal.jsx";

function LightLeavesBackground() {
  const leaves = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${6 + ((i * 7) % 88)}%`,
        top: `${-10 - (i % 5) * 8}%`,
        size: 12 + (i % 4) * 4,
        duration: 8 + (i % 5),
        delay: i * 0.45,
        rotateStart: -18 + i * 7,
        rotateEnd: 180 + i * 12,
      })),
    [],
  );

  const windLines = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: `${14 + i * 12}%`,
        delay: i * 0.7,
        duration: 5 + (i % 3),
        width: 120 + i * 18,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(191,219,254,0.35),transparent_34%),linear-gradient(180deg,#f8fbff_0%,#eef6ff_55%,#f6fbf7_100%)] dark:hidden" />

      <motion.div
        animate={{ opacity: [0.22, 0.35, 0.22] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(circle_at_center,rgba(134,239,172,0.18),transparent_70%)]"
      />

      {windLines.map((line) => (
        <motion.div
          key={line.id}
          initial={{ x: -180, opacity: 0 }}
          animate={{ x: ["-15%", "108%"], opacity: [0, 0.28, 0.12, 0] }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute hidden dark:hidden md:block"
          style={{ top: line.top }}
        >
          <div
            className="h-0.5 rounded-full bg-linear-to-r from-transparent via-sky-300/55 to-transparent blur-[0.5px]"
            style={{ width: `${line.width}px` }}
          />
        </motion.div>
      ))}

      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{
            y: "-12%",
            x: 0,
            rotate: leaf.rotateStart,
            opacity: 0,
          }}
          animate={{
            y: ["-12%", "25%", "55%", "105%"],
            x: [0, 18, -22, 24, -12],
            rotate: [
              leaf.rotateStart,
              leaf.rotateStart + 40,
              leaf.rotateEnd - 30,
              leaf.rotateEnd,
            ],
            opacity: [0, 0.9, 0.9, 0.75, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute dark:hidden"
          style={{ left: leaf.left, top: leaf.top }}
        >
          <div
            className="rounded-[100%_0_100%_0/100%_0_100%_0] border border-amber-300/45 bg-linear-to-br from-lime-200 via-emerald-200 to-amber-200 shadow-[0_4px_14px_rgba(34,197,94,0.12)]"
            style={{
              width: `${leaf.size}px`,
              height: `${leaf.size * 1.35}px`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function DarkAtmosphereBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${4 + ((i * 6.2) % 92)}%`,
        top: `${8 + ((i * 11) % 78)}%`,
        size: 4 + (i % 4) * 2,
        duration: 5 + (i % 4),
        delay: i * 0.35,
      })),
    [],
  );

  const mistStrips = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: `${-8 + i * 24}%`,
        rotate: -12 + i * 5,
        duration: 8 + i,
        delay: i * 0.8,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden dark:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_30%),linear-gradient(180deg,#07111f_0%,#0b1323_45%,#09111d_100%)]" />

      {mistStrips.map((mist) => (
        <motion.div
          key={mist.id}
          animate={{
            x: ["-6%", "8%", "-4%"],
            opacity: [0.05, 0.12, 0.06],
          }}
          transition={{
            duration: mist.duration,
            delay: mist.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] h-[140%] w-28 blur-3xl"
          style={{
            left: mist.left,
            transform: `rotate(${mist.rotate}deg)`,
            background:
              "linear-gradient(180deg, rgba(56,189,248,0.10), rgba(255,255,255,0.02), rgba(56,189,248,0.08))",
          }}
        />
      ))}

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: 0, opacity: 0.15, scale: 0.8 }}
          animate={{
            y: [-10, 14, -8],
            x: [-6, 8, -4],
            opacity: [0.15, 0.7, 0.2],
            scale: [0.8, 1.2, 0.95],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,0.55)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}

      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_70%)]"
      />
    </div>
  );
}

export default function DetailsSection({ productDetails }) {
  const [showEmail, setShowEmail] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [heartEffect, setHeartEffect] = useState(null);
  const [openClaimModal, setOpenClaimModal] = useState(false);

  const type = productDetails?.reportType;
  const { user } = useAuth();
  const navigate = useNavigate();

  const ownerId =
    typeof productDetails?.userId === "object"
      ? productDetails?.userId?._id
      : productDetails?.userId;

  const isLoggedIn = !!user?._id;
  const isOwner =
    isLoggedIn && !!ownerId && String(user._id) === String(ownerId);

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

        if (res.status === 401) {
          setIsFavorite(false);
          return;
        }

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

  const handleStatusToggle = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/reports/updateStatus/${productDetails._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: productDetails.status === "open" ? "closed" : "open",
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      toast.success("Status updated successfully");
      window.location.reload();
    } catch (err) {
      console.log("Status update error:", err);
      toast.error(err.message || "Failed to update status");
    }
  };

  if (!productDetails) {
    return (
      <section className="w-full md:w-1/2">
        <div className="rounded-[30px] border border-black/5 bg-white px-5 py-6 text-sm text-gray-500 shadow-sm dark:border-white/10 dark:bg-[#0f172a] dark:text-gray-300">
          Loading...
        </div>
      </section>
    );
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
          className="relative overflow-hidden rounded-[30px] border border-slate-200/70 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-[#081120]/88 dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
        >
          <LightLeavesBackground />
          <DarkAtmosphereBackground />

          <div className="pointer-events-none absolute -top-24 -right-16 h-52 w-52 rounded-full bg-blue-100/40 blur-3xl dark:hidden" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-emerald-100/30 blur-3xl dark:hidden" />
          <div className="pointer-events-none absolute -top-24 left-10 hidden h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl dark:block" />
          <div className="pointer-events-none absolute bottom-0 right-0 hidden h-44 w-44 rounded-full bg-sky-500/10 blur-3xl dark:block" />

          <div className="h-2 w-full bg-linear-to-r from-[#3358D4] via-[#6C63FF] to-[#22C55E] dark:from-cyan-400 dark:via-blue-500 dark:to-emerald-400" />

          <div className="relative px-5 py-5 md:px-6 md:py-6">
            <motion.div
              variants={itemVariants}
              className="flex items-start justify-between gap-4"
            >
              <motion.span
                whileHover={{ scale: 1.04 }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur-md",
                  type === "lost"
                    ? "bg-red-100/90 text-red-700 dark:bg-red-500/12 dark:text-red-300"
                    : type === "found"
                      ? "bg-emerald-100/90 text-emerald-700 dark:bg-emerald-500/12 dark:text-emerald-300"
                      : "bg-gray-200 text-gray-500 dark:bg-white/10 dark:text-gray-300",
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
                  className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/80 bg-white/90 shadow-md backdrop-blur-md cursor-pointer disabled:cursor-not-allowed dark:border-white/10 dark:bg-white/8"
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
                            "text-gray-500 dark:text-gray-300",
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
                              : "text-gray-500 dark:text-gray-300",
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
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/80 bg-white/90 shadow-md backdrop-blur-md cursor-pointer dark:border-white/10 dark:bg-white/8 dark:text-gray-100"
                  >
                    <Trash />
                  </motion.button>
                )}

                {isOwner && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                  >
                    <motion.button
                      type="button"
                      onClick={handleStatusToggle}
                      title={
                        productDetails.status === "open"
                          ? "Mark as Closed"
                          : "Reopen Report"
                      }
                      whileHover={{ y: -2, scale: 1.04 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 18,
                      }}
                      className={cn(
                        "group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border bg-white/90 shadow-[0_10px_24px_rgba(15,23,42,0.12)] backdrop-blur-xl cursor-pointer dark:bg-white/8",
                        productDetails.status === "open"
                          ? "border-emerald-100 hover:border-emerald-200 dark:border-emerald-500/20 dark:hover:border-emerald-400/35"
                          : "border-sky-100 hover:border-sky-200 dark:border-sky-500/20 dark:hover:border-sky-400/35",
                      )}
                    >
                      <span
                        className={cn(
                          "pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100",
                          productDetails.status === "open"
                            ? "bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.18),transparent_70%)]"
                            : "bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.18),transparent_70%)]",
                        )}
                      />

                      <motion.span
                        aria-hidden="true"
                        initial={{ x: "-140%", opacity: 0 }}
                        whileHover={{ x: "160%", opacity: 0.45 }}
                        transition={{ duration: 0.75, ease: "easeInOut" }}
                        className="pointer-events-none absolute inset-y-1 left-0 w-8 rotate-12 rounded-full bg-white/70 blur-md dark:bg-cyan-100/20"
                      />

                      <span
                        className={cn(
                          "absolute inset-0.75 rounded-full",
                          productDetails.status === "open"
                            ? "border border-emerald-100/80 dark:border-emerald-400/15"
                            : "border border-sky-100/80 dark:border-sky-400/15",
                        )}
                      />

                      <motion.span
                        key={productDetails.status}
                        initial={{ scale: 0.7, rotate: -18, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="relative z-10"
                      >
                        {productDetails.status === "open" ? (
                          <X
                            className="h-5.5 w-5.5 text-emerald-600 dark:text-emerald-300"
                            strokeWidth={2.1}
                          />
                        ) : (
                          <RotateCcw
                            className="h-5.25 w-5.25 text-sky-600 dark:text-sky-300"
                            strokeWidth={2.1}
                          />
                        )}
                      </motion.span>
                    </motion.button>

                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="pointer-events-none absolute -bottom-11 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/70 bg-[#0F172A] px-3 py-1.5 text-[11px] font-medium text-white shadow-lg opacity-0 transition dark:border-white/10"
                    >
                      {productDetails.status === "open"
                        ? "Mark as Closed"
                        : "Reopen Report"}
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-5">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-white">
                {productDetails.name}
                <span className="ml-2 text-gray-400 dark:text-white/25">•</span>
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  {productDetails.color}
                </span>
              </h2>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#EEF4FF]/95 px-4 py-2 text-sm font-medium text-[#3358D4] backdrop-blur-md dark:bg-cyan-500/10 dark:text-cyan-300">
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

            <motion.div
              variants={itemVariants}
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-gray-100/90 bg-linear-to-br from-[#F8FAFF]/95 to-[#EEF4FF]/95 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:from-white/8 dark:to-white/5"
              >
                <p className="text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400">
                  LOCATION
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 shadow-sm dark:bg-white/10">
                    <MapPin
                      size={20}
                      className="text-blue-600 dark:text-cyan-300"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 md:text-base dark:text-gray-100">
                    {productDetails.location?.area},{" "}
                    {productDetails.location?.city}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-gray-100/90 bg-linear-to-br from-[#F8FAFF]/95 to-[#EEF4FF]/95 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:from-white/8 dark:to-white/5"
              >
                <p className="text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400">
                  {type === "lost" ? "LOST DATE" : "FOUND DATE"}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 shadow-sm dark:bg-white/10">
                    <Calendar
                      size={20}
                      className="text-blue-600 dark:text-cyan-300"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 md:text-base dark:text-gray-100">
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
                className="rounded-2xl border border-gray-100/90 bg-linear-to-br from-[#F8FAFF]/95 to-[#EEF4FF]/95 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:from-white/8 dark:to-white/5"
              >
                <p className="text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400">
                  CATEGORY
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 shadow-sm dark:bg-white/10">
                    <Shapes
                      size={20}
                      className="text-blue-600 dark:text-cyan-300"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 md:text-base dark:text-gray-100">
                    {productDetails.category}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-gray-100/90 bg-linear-to-br from-[#F8FAFF]/95 to-[#EEF4FF]/95 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:from-white/8 dark:to-white/5"
              >
                <p className="text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400">
                  STATUS
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 shadow-sm dark:bg-white/10">
                    <Info
                      size={20}
                      className="text-blue-600 dark:text-cyan-300"
                    />
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-sm font-semibold capitalize",
                      productDetails.status === "closed"
                        ? "bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-gray-200"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
                    )}
                  >
                    {productDetails.status}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-7 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/6"
            >
              <h4 className="text-sm font-bold tracking-wide text-gray-500 dark:text-gray-400">
                DESCRIPTION
              </h4>
              <p className="mt-3 text-[15px] leading-7 text-gray-700 md:text-base dark:text-gray-200">
                {productDetails.description}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-7 space-y-4">
              {!isOwner && productDetails.status !== "closed" && (
                <motion.button
                  type="button"
                  onClick={() => setOpenClaimModal(true)}
                  whileHover={{
                    y: -3,
                    boxShadow: "0px 16px 35px rgba(66,103,236,0.28)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-[#3358D4] via-[#4267ec] to-[#5B7CFA] px-4 py-4 text-center cursor-pointer shadow-lg dark:from-cyan-500 dark:via-sky-500 dark:to-blue-600"
                >
                  <div className="rounded-full bg-white/15 p-2">
                    <BadgeCheck color="white" />
                  </div>

                  <span className="text-base font-semibold text-white md:text-lg">
                    {productDetails.reportType === "lost"
                      ? "I found this (Report Now)"
                      : "This is Mine (Claim item)"}
                  </span>
                </motion.button>
              )}

              <motion.div
                onClick={() => setShowEmail((prev) => !prev)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white/85 cursor-pointer shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/8"
              >
                <div className="flex items-center justify-center gap-3 px-4 py-4">
                  <div className="rounded-full bg-gray-100 p-2 dark:bg-white/10">
                    <MessageSquare
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.button
                      key={showEmail ? "email" : "contact"}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                      className="text-base font-semibold text-black cursor-pointer md:text-lg dark:text-white"
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
        {showConfirm && isOwner && (
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
              className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl dark:border dark:border-white/10 dark:bg-[#0b1220]"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Delete Report?
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                This action cannot be undone. Are you sure you want to delete
                this report?
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <motion.button
                  type="button"
                  onClick={() => !isDeleting && setShowConfirm(false)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 disabled:opacity-60 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/10"
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

      <ClaimRequestModal
        open={openClaimModal}
        onClose={() => setOpenClaimModal(false)}
        report={productDetails}
      />
    </>
  );
}
