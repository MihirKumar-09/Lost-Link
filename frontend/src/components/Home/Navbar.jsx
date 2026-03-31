import { Button } from "@radix-ui/themes";
import { ChevronDown, Gift, Heart, Menu, Power, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountOptions, setAccountOptions] = useState(false);
  const { user, logout } = useAuth();

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
      y: -12,
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
      y: -8,
      scale: 0.98,
      transition: {
        duration: 0.18,
        ease: "easeInOut",
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
      className="relative w-full px-3 border-b border-black/20 drop-shadow-xs sm:px-4 md:px-6 z-9999"
      style={{ background: "#F7F8FA" }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div
          variants={navItem}
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.96 }}
        >
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="Main_Logo"
              className="w-16 md:w-18"
            />
          </Link>
        </motion.div>

        {/* Desktop */}
        <motion.div
          variants={navContainer}
          className="items-center hidden gap-6 md:flex"
        >
          {user ? (
            <>
              <motion.div
                variants={navItem}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to="/" className="relative px-1 py-1 font-medium group">
                  <span className="transition-colors duration-200 group-hover:text-blue-600">
                    Home
                  </span>
                  <motion.span
                    className="absolute left-0 -bottom-1 h-0.5 bg-blue-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.25 }}
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
                  className="relative px-1 py-1 font-medium group"
                >
                  <span className="transition-colors duration-200 group-hover:text-blue-600">
                    All Items
                  </span>
                  <motion.span
                    className="absolute left-0 -bottom-1 h-0.5 bg-blue-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.25 }}
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
                  className="relative px-1 py-1 font-medium group"
                >
                  <span className="transition-colors duration-200 group-hover:text-blue-600">
                    My Report
                  </span>
                  <motion.span
                    className="absolute left-0 -bottom-1 h-0.5 bg-blue-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.25 }}
                  />
                </Link>
              </motion.div>

              {/* Account drop down */}
              <motion.div variants={navItem} className="relative font-medium">
                <motion.div
                  onClick={() => setAccountOptions((prev) => !prev)}
                  className="relative px-1 py-1 cursor-pointer group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="transition-colors duration-200 group-hover:text-blue-600">
                    Account
                  </span>
                  <motion.span
                    className="absolute left-0 -bottom-1 h-0.5 bg-blue-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.div>

                <AnimatePresence>
                  {accountOptions && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-10 right-0 bg-white shadow-lg rounded-md py-4 pl-4 min-w-37.5 flex flex-col gap-6 z-9999 border border-gray-100"
                    >
                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 hover:text-blue-500"
                        >
                          <User size={18} />
                          Profile
                        </Link>
                      </motion.div>

                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to="/claims"
                          className="flex items-center gap-2 hover:text-blue-500"
                        >
                          <Gift size={18} />
                          My Claim
                        </Link>
                      </motion.div>

                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to="/wishlist"
                          className="flex items-center gap-2 hover:text-blue-500"
                        >
                          <Heart size={18} />
                          Wishlist
                        </Link>
                      </motion.div>

                      <motion.button
                        onClick={logout}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 text-left text-red-500 cursor-pointer hover:text-red-800"
                      >
                        <Power size={18} />
                        Logout
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                variants={navItem}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link to="/signIn">
                  <Button variant="outline" style={{ cursor: "pointer" }}>
                    Login
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={navItem}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link to="/signUp">
                  <Button style={{ cursor: "pointer" }}>Sign Up</Button>
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Mobile Toggle */}
        <motion.button
          variants={navItem}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          whileTap={{ scale: 0.9, rotate: 8 }}
          whileHover={{ scale: 1.06 }}
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
                <X size={28} />
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
                <Menu size={28} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col w-full gap-4 px-1 mt-4 mb-5 overflow-hidden"
          >
            {user ? (
              <>
                {/* Main Links */}
                <motion.div variants={mobileItemVariants}>
                  <Link to="/" className="block py-2">
                    <motion.span
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.97 }}
                      className="block"
                    >
                      Home
                    </motion.span>
                  </Link>
                </motion.div>

                <motion.div variants={mobileItemVariants}>
                  <Link to="/items" className="block py-2">
                    <motion.span
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.97 }}
                      className="block"
                    >
                      All Items
                    </motion.span>
                  </Link>
                </motion.div>

                <motion.div variants={mobileItemVariants}>
                  <Link to="/my-report" className="block py-2">
                    <motion.span
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.97 }}
                      className="block"
                    >
                      My Report
                    </motion.span>
                  </Link>
                </motion.div>

                {/* Account Section */}
                <motion.div
                  variants={mobileItemVariants}
                  className="p-3 bg-white border border-gray-200 shadow-sm rounded-xl"
                  whileHover={{ y: -1 }}
                >
                  <button
                    onClick={() => setAccountOptions((prev) => !prev)}
                    className="flex items-center justify-between w-full font-medium"
                  >
                    <span>Account</span>
                    <motion.div
                      animate={{ rotate: accountOptions ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {accountOptions && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -8 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -6 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="flex flex-col gap-3 pl-2 mt-3 overflow-hidden"
                      >
                        <motion.div
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            to="/profile"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 py-1 active:scale-95"
                          >
                            <User size={18} />
                            Profile
                          </Link>
                        </motion.div>

                        <motion.div
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            to="/claims"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 py-1 active:scale-95"
                          >
                            <Gift size={18} />
                            My Claim
                          </Link>
                        </motion.div>

                        <motion.div
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            to="/wishlist"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 py-1 active:scale-95"
                          >
                            <Heart size={18} />
                            Wishlist
                          </Link>
                        </motion.div>

                        <motion.button
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-2 py-1 text-red-500 active:scale-95"
                        >
                          <Power size={18} />
                          Logout
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div variants={mobileItemVariants}>
                  <Link to="/signIn">
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-full p-3 border rounded-xl active:scale-95"
                    >
                      Login
                    </motion.button>
                  </Link>
                </motion.div>

                <motion.div variants={mobileItemVariants}>
                  <Link to="/signUp">
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-full p-3 text-white bg-blue-600 rounded-xl active:scale-95"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
