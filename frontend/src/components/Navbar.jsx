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
  Sun,
  MoonStar,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getUnreadCounts } from "../services/notificationService";
import { useSocket } from "../Context/SocketContext";
import { useTheme } from "../Context/ThemeContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isReportsPage = /^\/reports\/[^/]+$/.test(location.pathname);

  const [menu, setMenu] = useState(false);
  const { user, logout } = useAuth();
  const menuRef = useRef(null);

  const [notificationUnreadCount, setNotificationUnreadCount] = useState(0);
  const [messageUnreadCount, setMessageUnreadCount] = useState(0);
  const { socket } = useSocket();

  const { preference, setPreference } = useTheme();
  const isDark = preference === "dark";

  const [searchText, setSearchText] = useState(
    searchParams.get("search") || "",
  );

  useEffect(() => {
    setSearchText(searchParams.get("search") || "");
  }, [searchParams]);

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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchText.trim()) {
      params.set("search", searchText.trim());
    }

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  const handleThemeToggle = () => {
    const nextTheme = isDark ? "light" : "dark";
    setPreference(nextTheme);
  };

  useEffect(() => {
    if (!user) return;

    const fetchUnreadCounts = async () => {
      try {
        const data = await getUnreadCounts();
        setNotificationUnreadCount(data.notificationUnreadCount || 0);
        setMessageUnreadCount(data.messageUnreadCount || 0);
      } catch (err) {
        console.log("Unread error count", err);
      }
    };
    fetchUnreadCounts();
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = () => {
      setNotificationUnreadCount((prev) => prev + 1);
    };

    const handleNewMessage = () => {
      setMessageUnreadCount((prev) => prev + 1);
    };

    socket.on("new_notification", handleNewNotification);
    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_notification", handleNewNotification);
      socket.off("new_message", handleNewMessage);
    };
  }, [socket]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/75 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-2xl supports-backdrop-filter:bg-white/65 dark:border-white/10 dark:bg-[#020817]/75 dark:shadow-[0_10px_32px_rgba(0,0,0,0.35)] dark:supports-backdrop-filter:bg-[#020817]/68"
    >
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(51,88,212,0.04),transparent,rgba(236,91,19,0.04))] dark:bg-[linear-gradient(90deg,rgba(59,130,246,0.08),transparent,rgba(34,211,238,0.05))]" />

      <div className="relative px-3 sm:px-4 md:px-6" id="/home">
        <div className="flex items-center justify-between gap-3 py-3">
          <Link to="/" className="shrink-0">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl dark:bg-cyan-400/10" />
                <img
                  src="/images/logo.png"
                  alt="Main_Logo"
                  className="relative w-14 drop-shadow-sm md:w-16"
                />
              </div>

              <div className="hidden sm:block">
                <h2 className="text-base font-bold tracking-tight text-slate-900 md:text-lg dark:text-white">
                  Lost Link
                </h2>
                <p className="-mt-0.5 text-[10px] text-slate-500 md:text-xs dark:text-slate-400">
                  Lost & Found Community
                </p>
              </div>
            </motion.div>
          </Link>

          {isReportsPage && (
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.35 }}
              className="mx-4 hidden max-w-2xl flex-1 md:flex"
            >
              <motion.div
                whileHover={{ y: -1 }}
                className="group relative flex w-full items-center gap-3 rounded-full border border-slate-200/80 bg-slate-50/95 px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-all focus-within:border-[#3358D4]/30 focus-within:bg-white focus-within:shadow-[0_12px_34px_rgba(51,88,212,0.12)] dark:border-white/10 dark:bg-white/6 dark:shadow-[0_10px_28px_rgba(0,0,0,0.24)] dark:focus-within:border-cyan-400/30 dark:focus-within:bg-white/8 dark:focus-within:shadow-[0_12px_34px_rgba(34,211,238,0.12)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition group-focus-within:bg-[#EEF3FF] dark:bg-white/8 dark:shadow-none dark:group-focus-within:bg-cyan-400/10">
                  <Search
                    size={18}
                    className="text-slate-500 dark:text-slate-300"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Search items like phone, wallet, keys"
                  value={searchText}
                  onChange={handleSearchChange}
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
                />

                <button
                  type="submit"
                  className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-200 dark:bg-white/8 dark:text-slate-200 dark:hover:bg-white/12"
                >
                  Search
                </button>
              </motion.div>
            </motion.form>
          )}

          <div
            className="relative flex items-center gap-2 md:gap-3"
            ref={menuRef}
          >
            {/* Theme Toggle Button */}
            <motion.button
              type="button"
              onClick={handleThemeToggle}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/6 dark:shadow-[0_8px_20px_rgba(0,0,0,0.22)] dark:hover:bg-white/8"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -20, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 20, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {isDark ? (
                    <Sun
                      size={19}
                      className="text-amber-500 dark:text-amber-300"
                    />
                  ) : (
                    <MoonStar
                      size={19}
                      className="text-slate-700 dark:text-slate-100"
                    />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {user && (
              <>
                <motion.button
                  type="button"
                  onClick={() => navigate("/notifications")}
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/6 dark:shadow-[0_8px_20px_rgba(0,0,0,0.22)] dark:hover:bg-white/8"
                >
                  <Bell
                    size={19}
                    className="text-slate-700 dark:text-slate-100"
                  />
                  {notificationUnreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 min-w-4.5 rounded-full bg-[#EC5B13] px-1.5 text-center text-[10px] font-bold text-white shadow-[0_6px_18px_rgba(236,91,19,0.35)]">
                      {notificationUnreadCount > 99
                        ? "99+"
                        : notificationUnreadCount}
                    </span>
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => navigate("/messages")}
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative hidden h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:flex dark:border-white/10 dark:bg-white/6 dark:shadow-[0_8px_20px_rgba(0,0,0,0.22)] dark:hover:bg-white/8"
                >
                  <MessageSquare
                    size={19}
                    className="text-slate-700 dark:text-slate-100"
                  />
                  {messageUnreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 min-w-4.5 rounded-full bg-[#3358D4] px-1.5 text-center text-[10px] font-bold text-white shadow-[0_6px_18px_rgba(51,88,212,0.35)]">
                      {messageUnreadCount > 99 ? "99+" : messageUnreadCount}
                    </span>
                  )}
                </motion.button>
              </>
            )}

            <motion.button
              onClick={() => setMenu((prev) => !prev)}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/6 dark:shadow-[0_8px_20px_rgba(0,0,0,0.22)] dark:hover:bg-white/8"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#EEF3FF] to-[#FDEEE7] dark:from-cyan-400/15 dark:to-blue-500/15">
                <User
                  size={18}
                  className="text-slate-700 dark:text-slate-100"
                />
              </div>

              <div className="hidden flex-col items-start leading-tight md:flex">
                <span className="text-sm font-semibold text-slate-800 dark:text-white">
                  {user ? user.name || "My Account" : "Guest"}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {user ? "Manage profile" : "Login or sign up"}
                </span>
              </div>

              <ChevronDown
                size={16}
                className={`text-slate-500 transition-transform duration-200 dark:text-slate-400 ${
                  menu ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {menu && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 top-16 z-50 w-70 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#071120]/95 dark:shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(51,88,212,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(236,91,19,0.07),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.10),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_30%)]" />

                  <div className="relative">
                    {user ? (
                      <>
                        <div className="mb-3 rounded-2xl border border-slate-200/70 bg-linear-to-r from-slate-50 to-orange-50 p-3 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]">
                          <p className="text-sm font-semibold text-slate-800 dark:text-white">
                            {user.name || "Welcome back"}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Access your profile, claims, and wishlist.
                          </p>
                        </div>

                        <div className="flex flex-col gap-1">
                          <motion.div {...menuItemHover}>
                            <Link
                              to="/profile"
                              onClick={() => setMenu(false)}
                              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/6"
                            >
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF3FF] dark:bg-cyan-400/10">
                                <User size={17} />
                              </div>
                              <span className="font-medium">Profile</span>
                            </Link>
                          </motion.div>

                          <motion.div {...menuItemHover}>
                            <button
                              type="button"
                              onClick={() => {
                                setMenu(false);
                                navigate("/profile", {
                                  state: { activeTab: "My Claim" },
                                });
                              }}
                              className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/6"
                            >
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF3E8] dark:bg-orange-400/10">
                                <Gift size={17} />
                              </div>
                              <span className="font-medium">My Claim</span>
                            </button>
                          </motion.div>

                          <motion.div {...menuItemHover}>
                            <button
                              type="button"
                              onClick={() => {
                                setMenu(false);
                                navigate("/profile", {
                                  state: { activeTab: "Saved Items" },
                                });
                              }}
                              className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/6"
                            >
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFECEF] dark:bg-pink-400/10">
                                <Heart size={17} />
                              </div>
                              <span className="font-medium">Wishlist</span>
                            </button>
                          </motion.div>

                          <div className="my-2 h-px bg-slate-200 dark:bg-white/10" />

                          <motion.button
                            {...menuItemHover}
                            onClick={() => {
                              setMenu(false);
                              logout();
                            }}
                            className="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-left text-red-500 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10">
                              <Power size={17} />
                            </div>
                            <span className="font-medium">Logout</span>
                          </motion.button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-4 rounded-2xl border border-slate-200/70 bg-linear-to-r from-slate-50 to-orange-50 p-4 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]">
                          <p className="text-sm font-semibold text-slate-800 dark:text-white">
                            Welcome to Lost Link
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                            Sign in to manage reports, wishlist items, and
                            claims.
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Link to="/signIn" onClick={() => setMenu(false)}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.97 }}
                              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/6 dark:text-white dark:hover:bg-white/8"
                            >
                              <LogIn size={17} />
                              Login
                            </motion.button>
                          </Link>

                          <Link to="/signUp" onClick={() => setMenu(false)}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.97 }}
                              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#3358D4] px-4 py-3 font-semibold text-white shadow-[0_12px_24px_rgba(51,88,212,0.25)] transition hover:bg-[#2949b3] dark:bg-[linear-gradient(135deg,#0ea5e9,#2563eb)] dark:shadow-[0_14px_28px_rgba(14,165,233,0.24)] dark:hover:brightness-110"
                            >
                              <UserPlus size={17} />
                              Sign Up
                            </motion.button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {isReportsPage && (
          <motion.form
            onSubmit={handleSearchSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35 }}
            className="pb-3 md:hidden"
          >
            <motion.div
              whileHover={{ y: -1 }}
              className="group relative flex w-full items-center gap-3 rounded-full border border-slate-200/80 bg-slate-50/95 px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-all focus-within:border-[#3358D4]/30 focus-within:bg-white focus-within:shadow-[0_12px_34px_rgba(51,88,212,0.12)] dark:border-white/10 dark:bg-white/6 dark:shadow-[0_10px_28px_rgba(0,0,0,0.24)] dark:focus-within:border-cyan-400/30 dark:focus-within:bg-white/8 dark:focus-within:shadow-[0_12px_34px_rgba(34,211,238,0.12)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition group-focus-within:bg-[#EEF3FF] dark:bg-white/8 dark:shadow-none dark:group-focus-within:bg-cyan-400/10">
                <Search
                  size={18}
                  className="text-slate-500 dark:text-slate-300"
                />
              </div>

              <input
                type="text"
                placeholder="Search items like phone, wallet, keys"
                value={searchText}
                onChange={handleSearchChange}
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
              />

              <button
                type="submit"
                className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-200 dark:bg-white/8 dark:text-slate-200 dark:hover:bg-white/12"
              >
                Search
              </button>
            </motion.div>
          </motion.form>
        )}
      </div>
    </motion.nav>
  );
}
