import { Button } from "@radix-ui/themes";
import {
  ChevronDown,
  Gift,
  Heart,
  Menu,
  Power,
  User,
  UserPlus,
  LogIn,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [desktopAccountOpen, setDesktopAccountOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const desktopMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const clickedDesktop =
        desktopMenuRef.current && desktopMenuRef.current.contains(e.target);

      const clickedMobile =
        mobileMenuRef.current && mobileMenuRef.current.contains(e.target);

      if (!clickedDesktop) {
        setDesktopAccountOpen(false);
      }

      if (!clickedMobile) {
        setMobileAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const navContainer = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
        staggerChildren: 0.08,
      },
    },
  };

  const navItem = {
    hidden: { opacity: 0, y: -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: 14,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.22,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.97,
      transition: {
        duration: 0.18,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.06,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -8,
      transition: {
        duration: 0.22,
        ease: "easeInOut",
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navContainer}
      className="sticky top-0 z-9999 w-full border-b border-black/5 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
    >
      <div className="px-3 sm:px-4 md:px-6" id="/home">
        <div className="flex items-center justify-between py-2.5 md:py-3">
          {/* Logo */}
          <motion.div
            variants={navItem}
            whileHover={{ scale: 1.04, rotate: -1 }}
            whileTap={{ scale: 0.96 }}
            className="shrink-0"
          >
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/logo.png"
                alt="Main_Logo"
                className="w-16 md:w-18 drop-shadow-sm"
              />
            </Link>
          </motion.div>

          {/* Desktop */}
          <motion.div
            variants={navContainer}
            className="hidden md:flex items-center gap-3 lg:gap-5 shrink-0"
          >
            {user ? (
              <>
                <motion.div
                  variants={navItem}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to="/"
                    className="group relative rounded-xl px-3 py-2 text-[15px] font-semibold text-slate-700 transition-colors duration-200 hover:text-[#3358D4]"
                  >
                    <span>Home</span>
                    <motion.span
                      className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-[#3358D4]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.25 }}
                      style={{ originX: 0 }}
                    />
                  </Link>
                </motion.div>

                <motion.div
                  variants={navItem}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to="/items"
                    className="group relative rounded-xl px-3 py-2 text-[15px] font-semibold text-slate-700 transition-colors duration-200 hover:text-[#3358D4]"
                  >
                    <span>All Items</span>
                    <motion.span
                      className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-[#3358D4]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.25 }}
                      style={{ originX: 0 }}
                    />
                  </Link>
                </motion.div>

                <motion.div
                  variants={navItem}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to="/my-report"
                    className="group relative rounded-xl px-3 py-2 text-[15px] font-semibold text-slate-700 transition-colors duration-200 hover:text-[#3358D4]"
                  >
                    <span>My Report</span>
                    <motion.span
                      className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-[#3358D4]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.25 }}
                      style={{ originX: 0 }}
                    />
                  </Link>
                </motion.div>

                {/* Desktop Account dropdown */}
                <motion.div
                  variants={navItem}
                  className="relative"
                  ref={desktopMenuRef}
                >
                  <motion.button
                    onClick={() => setDesktopAccountOpen((prev) => !prev)}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#EEF3FF] to-[#FDEEE7]">
                      <User size={18} className="text-slate-700" />
                    </div>

                    <div className="hidden lg:flex flex-col items-start leading-tight">
                      <span className="text-sm font-semibold text-slate-800">
                        {user?.name || "My Account"}
                      </span>
                      <span className="text-xs text-slate-500">
                        Manage profile
                      </span>
                    </div>

                    <ChevronDown
                      size={16}
                      className={`text-slate-500 transition-transform duration-200 ${
                        desktopAccountOpen ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {desktopAccountOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 top-16 z-9999 w-72 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl"
                      >
                        <div className="mb-3 rounded-2xl bg-linear-to-r from-[#F8FAFC] to-[#FFF7F3] p-3">
                          <p className="text-sm font-semibold text-slate-800">
                            {user?.name || "Welcome back"}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Access your profile, claims, and wishlist.
                          </p>
                        </div>

                        <div className="flex flex-col gap-1">
                          <motion.div
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.18 }}
                          >
                            <Link
                              to="/profile"
                              onClick={() => setDesktopAccountOpen(false)}
                              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-slate-50"
                            >
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF3FF]">
                                <User size={17} />
                              </div>
                              <span className="font-medium">Profile</span>
                            </Link>
                          </motion.div>

                          <motion.div
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.18 }}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setDesktopAccountOpen(false);
                                navigate("/profile", {
                                  state: { activeTab: "Settings" },
                                });
                              }}
                              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-slate-50"
                            >
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF3E8]">
                                <Gift size={17} />
                              </div>
                              <span className="font-medium">My Claim</span>
                            </button>
                          </motion.div>

                          <motion.div
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.18 }}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setDesktopAccountOpen(false);
                                navigate("/profile", {
                                  state: { activeTab: "Saved Items" },
                                });
                              }}
                              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-slate-50"
                            >
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFECEF]">
                                <Heart size={17} />
                              </div>
                              <span className="font-medium">Wishlist</span>
                            </button>
                          </motion.div>

                          <div className="my-2 h-px bg-slate-200" />

                          <motion.button
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.18 }}
                            onClick={() => {
                              setDesktopAccountOpen(false);
                              logout();
                            }}
                            className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-red-500 transition hover:bg-red-50"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50">
                              <Power size={17} />
                            </div>
                            <span className="font-medium">Logout</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-3 flex-none">
                <motion.div
                  variants={navItem}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-none"
                >
                  <Link to="/signIn" className="block">
                    <motion.button
                      type="button"
                      initial={false}
                      whileHover="hover"
                      whileTap="tap"
                      className="group relative flex h-12 w-31.5 min-w-31.5 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 text-[15px] font-semibold text-slate-700 shadow-[0_10px_25px_rgba(15,23,42,0.07)] backdrop-blur-md"
                      variants={{
                        hover: {},
                        tap: {},
                      }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      {/* base inner glow */}
                      <span className="pointer-events-none absolute inset-px rounded-2xl bg-linear-to-b from-white to-slate-50" />

                      {/* top light */}
                      <motion.span
                        className="pointer-events-none absolute inset-x-3 top-0 h-px bg-white/90"
                        variants={{
                          hover: { opacity: 1 },
                          tap: { opacity: 0.9 },
                        }}
                      />

                      {/* moving shine */}
                      <motion.span
                        className="pointer-events-none absolute left-[-40%] top-0 h-full w-[42%] skew-x-[-20deg] bg-white/70 blur-md"
                        variants={{
                          hover: { left: "120%" },
                          tap: { left: "120%" },
                        }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                      />

                      {/* subtle hover overlay */}
                      <motion.span
                        className="pointer-events-none absolute inset-0 rounded-2xl bg-slate-100/0"
                        variants={{
                          hover: { opacity: 1 },
                          tap: { opacity: 1 },
                        }}
                        transition={{ duration: 0.2 }}
                      />

                      <motion.span
                        className="relative z-10"
                        variants={{
                          hover: { y: -0.5 },
                          tap: { y: 0.5 },
                        }}
                        transition={{ duration: 0.18 }}
                      >
                        Login
                      </motion.span>
                    </motion.button>
                  </Link>
                </motion.div>

                <motion.div
                  variants={navItem}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-none"
                >
                  <Link to="/signUp" className="block">
                    <motion.button
                      type="button"
                      initial={false}
                      whileHover="hover"
                      whileTap="tap"
                      className="group relative flex h-12 w-31.5 min-w-31.5 items-center justify-center overflow-hidden rounded-2xl border border-[#4C67E8]/20 bg-[linear-gradient(135deg,#5E7BFF_0%,#4C67E8_45%,#3D56D6_100%)] text-[15px] font-semibold text-white shadow-[0_14px_34px_rgba(76,103,232,0.32)]"
                      variants={{
                        hover: {},
                        tap: {},
                      }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      {/* radial glow */}
                      <motion.span
                        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.34),transparent_36%)]"
                        variants={{
                          hover: { opacity: 1 },
                          tap: { opacity: 0.9 },
                        }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* moving glossy streak */}
                      <motion.span
                        className="pointer-events-none absolute left-[-45%] top-0 h-full w-[40%] skew-x-[-20deg] bg-white/30 blur-md"
                        variants={{
                          hover: { left: "125%" },
                          tap: { left: "125%" },
                        }}
                        transition={{ duration: 0.75, ease: "easeInOut" }}
                      />

                      {/* hover depth layer */}
                      <motion.span
                        className="pointer-events-none absolute inset-0 rounded-2xl bg-black/0"
                        variants={{
                          hover: { backgroundColor: "rgba(0,0,0,0.06)" },
                          tap: { backgroundColor: "rgba(0,0,0,0.10)" },
                        }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* bottom glow */}
                      <motion.span
                        className="pointer-events-none absolute -bottom-3 left-1/2 h-6 w-[72%] -translate-x-1/2 rounded-full bg-[#4C67E8]/40 blur-xl"
                        variants={{
                          hover: { opacity: 1, scale: 1.04 },
                          tap: { opacity: 0.95, scale: 1 },
                        }}
                        transition={{ duration: 0.22 }}
                      />

                      <motion.span
                        className="relative z-10"
                        variants={{
                          hover: { y: -0.5 },
                          tap: { y: 0.5 },
                        }}
                        transition={{ duration: 0.18 }}
                      >
                        Sign Up
                      </motion.span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Mobile Toggle */}
          <motion.button
            variants={navItem}
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
              setMobileAccountOpen(false);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm md:hidden"
            whileTap={{ scale: 0.9, rotate: 8 }}
            whileHover={{ scale: 1.04 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <X size={24} className="text-slate-700" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Menu size={24} className="text-slate-700" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="border-t border-slate-200/70 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-3 px-3 py-4">
              {user ? (
                <>
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="block"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.97 }}
                        className="block rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        Home
                      </motion.span>
                    </Link>
                  </motion.div>

                  <motion.div variants={mobileItemVariants}>
                    <Link
                      to="/items"
                      onClick={() => setIsMenuOpen(false)}
                      className="block"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.97 }}
                        className="block rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        All Items
                      </motion.span>
                    </Link>
                  </motion.div>

                  <motion.div variants={mobileItemVariants}>
                    <Link
                      to="/my-report"
                      onClick={() => setIsMenuOpen(false)}
                      className="block"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.97 }}
                        className="block rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        My Report
                      </motion.span>
                    </Link>
                  </motion.div>

                  <motion.div
                    ref={mobileMenuRef}
                    variants={mobileItemVariants}
                    className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
                  >
                    <button
                      onClick={() => setMobileAccountOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#EEF3FF] to-[#FDEEE7]">
                          <User size={18} className="text-slate-700" />
                        </div>

                        <div className="flex flex-col items-start leading-tight">
                          <span className="text-sm font-semibold text-slate-800">
                            {user?.name || "My Account"}
                          </span>
                          <span className="text-xs text-slate-500">
                            Manage profile
                          </span>
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: mobileAccountOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={18} className="text-slate-500" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {mobileAccountOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -8 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -6 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="mt-3 overflow-hidden"
                        >
                          <div className="mb-3 rounded-2xl bg-linear-to-r from-[#F8FAFC] to-[#FFF7F3] p-3">
                            <p className="text-sm font-semibold text-slate-800">
                              {user?.name || "Welcome back"}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              Access your profile, claims, and wishlist.
                            </p>
                          </div>

                          <div className="flex flex-col gap-1">
                            <motion.div
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.18 }}
                            >
                              <Link
                                to="/profile"
                                onClick={() => {
                                  setMobileAccountOpen(false);
                                  setIsMenuOpen(false);
                                }}
                                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-slate-50"
                              >
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF3FF]">
                                  <User size={17} />
                                </div>
                                <span className="font-medium">Profile</span>
                              </Link>
                            </motion.div>

                            <motion.div
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.18 }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setMobileAccountOpen(false);
                                  setIsMenuOpen(false);
                                  navigate("/profile", {
                                    state: { activeTab: "Settings" },
                                  });
                                }}
                                className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-slate-50"
                              >
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF3E8]">
                                  <Gift size={17} />
                                </div>
                                <span className="font-medium">My Claim</span>
                              </button>
                            </motion.div>

                            <motion.div
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.18 }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setMobileAccountOpen(false);
                                  setIsMenuOpen(false);
                                  navigate("/profile", {
                                    state: { activeTab: "Saved Items" },
                                  });
                                }}
                                className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-slate-50"
                              >
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFECEF]">
                                  <Heart size={17} />
                                </div>
                                <span className="font-medium">Wishlist</span>
                              </button>
                            </motion.div>

                            <div className="my-2 h-px bg-slate-200" />

                            <motion.button
                              onClick={() => {
                                setMobileAccountOpen(false);
                                setIsMenuOpen(false);
                                logout();
                              }}
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.18 }}
                              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-red-500 transition hover:bg-red-50"
                            >
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50">
                                <Power size={17} />
                              </div>
                              <span className="font-medium">Logout</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </>
              ) : (
                <motion.div variants={mobileItemVariants}>
                  <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                    <div className="mb-4 rounded-2xl bg-linear-to-r from-[#F8FAFC] to-[#FFF7F3] p-4">
                      <p className="text-sm font-semibold text-slate-800">
                        Welcome to Lost Link
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Sign in to manage reports, wishlist items, and claims.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link to="/signIn" onClick={() => setIsMenuOpen(false)}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          <LogIn size={17} />
                          Login
                        </motion.button>
                      </Link>

                      <Link to="/signUp" onClick={() => setIsMenuOpen(false)}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3358D4] px-4 py-3 font-semibold text-white shadow-[0_12px_24px_rgba(51,88,212,0.25)] transition hover:bg-[#2949b3]"
                        >
                          <UserPlus size={17} />
                          Sign Up
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
