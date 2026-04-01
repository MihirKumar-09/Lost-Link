import {
  Bell,
  MessageSquare,
  Search,
  User,
  Gift,
  Heart,
  Power,
  ChevronDown,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const [menu, setMenu] = useState(false);
  const { user, logout } = useAuth();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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

  const menuItemHover = {
    whileHover: { x: 4 },
    transition: { duration: 0.18 },
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/75 backdrop-blur-xl supports-backdrop-filter:bg-white/65 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
    >
      <div className="px-3 sm:px-4 md:px-6" id="/home">
        <div className="flex items-center justify-between gap-3 py-3">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2"
            >
              <img
                src="/images/logo.png"
                alt="Main_Logo"
                className="w-14 md:w-16 drop-shadow-sm"
              />
              <div className="hidden sm:block">
                <h2 className="text-base md:text-lg font-bold tracking-tight text-slate-900">
                  Lost Link
                </h2>
                <p className="text-[10px] md:text-xs text-slate-500 -mt-0.5">
                  Lost & Found Community
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Search */}
          {!isProfilePage && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.35 }}
              className="hidden md:flex flex-1 max-w-2xl mx-4"
            >
              <motion.div
                whileHover={{ y: -1 }}
                className="group relative flex w-full items-center gap-3 rounded-full border border-slate-200/80 bg-[#F8FAFC] px-4 py-3 shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition-all focus-within:border-[#3358D4]/30 focus-within:bg-white focus-within:shadow-[0_10px_30px_rgba(51,88,212,0.10)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition group-focus-within:bg-[#EEF3FF]">
                  <Search size={18} className="text-slate-500" />
                </div>

                <input
                  type="text"
                  placeholder="Search items like phone, wallet, keys"
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                />

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  Search
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* Right Section */}
          <div
            className="relative flex items-center gap-2 md:gap-3"
            ref={menuRef}
          >
            <motion.button
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <Bell size={19} className="text-slate-700" />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#EC5B13]" />
            </motion.button>

            <motion.button
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <MessageSquare size={19} className="text-slate-700" />
            </motion.button>

            {/* User Dropdown Trigger */}
            <motion.button
              onClick={() => setMenu((prev) => !prev)}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#EEF3FF] to-[#FDEEE7]">
                <User size={18} className="text-slate-700" />
              </div>

              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="text-sm font-semibold text-slate-800">
                  {user ? user.name || "My Account" : "Guest"}
                </span>
                <span className="text-xs text-slate-500">
                  {user ? "Manage profile" : "Login or sign up"}
                </span>
              </div>

              <ChevronDown
                size={16}
                className={`text-slate-500 transition-transform duration-200 ${
                  menu ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
              {menu && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 top-16 z-50 w-70 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl"
                >
                  {user ? (
                    <>
                      <div className="mb-3 rounded-2xl bg-linear-to-r from-[#F8FAFC] to-[#FFF7F3] p-3">
                        <p className="text-sm font-semibold text-slate-800">
                          {user.name || "Welcome back"}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Access your profile, claims, and wishlist.
                        </p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <motion.div {...menuItemHover}>
                          <Link
                            to="/profile"
                            onClick={() => setMenu(false)}
                            className="flex items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-slate-50"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF3FF]">
                              <User size={17} />
                            </div>
                            <span className="font-medium">Profile</span>
                          </Link>
                        </motion.div>

                        <motion.div {...menuItemHover}>
                          <Link
                            to="/claims"
                            onClick={() => setMenu(false)}
                            className="flex items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-slate-50"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF3E8]">
                              <Gift size={17} />
                            </div>
                            <span className="font-medium">My Claim</span>
                          </Link>
                        </motion.div>

                        <motion.div {...menuItemHover}>
                          <Link
                            to="/wishlist"
                            onClick={() => setMenu(false)}
                            className="flex items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-slate-50"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFECEF]">
                              <Heart size={17} />
                            </div>
                            <span className="font-medium">Wishlist</span>
                          </Link>
                        </motion.div>

                        <div className="my-2 h-px bg-slate-200" />

                        <motion.button
                          {...menuItemHover}
                          onClick={() => {
                            setMenu(false);
                            logout();
                          }}
                          className="flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-red-500 transition hover:bg-red-50"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50">
                            <Power size={17} />
                          </div>
                          <span className="font-medium">Logout</span>
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-4 rounded-2xl bg-linear-to-r from-[#F8FAFC] to-[#FFF7F3] p-4">
                        <p className="text-sm font-semibold text-slate-800">
                          Welcome to Lost Link
                        </p>
                        <p className="text-xs text-slate-500 mt-1 leading-5">
                          Sign in to manage reports, wishlist items, and claims.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Link to="/signIn" onClick={() => setMenu(false)}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            <LogIn size={17} />
                            Login
                          </motion.button>
                        </Link>

                        <Link to="/signUp" onClick={() => setMenu(false)}>
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
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
