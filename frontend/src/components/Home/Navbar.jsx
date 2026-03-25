import { Button } from "@radix-ui/themes";
import { ChevronDown, Gift, Heart, Menu, Power, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountOptions, setAccountOptions] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav
      className="w-full border-b border-black/20 drop-shadow-xs px-3 sm:px-4 md:px-6 relative z-9999"
      style={{ background: "#F7F8FA" }}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Main_Logo"
            className="w-16 md:w-18"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 items-center font-medium">
          {user ? (
            <>
              <Link to="/" className="relative group px-1 py-1">
                <span className="transition-colors duration-200 group-hover:text-blue-600">
                  Home
                </span>

                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/items" className="relative group px-1 py-1">
                <span className="transition-colors duration-200 group-hover:text-blue-600">
                  All Items
                </span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/my-report" className="relative group px-1 py-1">
                <span className="transition-colors duration-200 group-hover:text-blue-600">
                  My Report
                </span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              {/* Account drop down */}
              <div className="relative">
                <div
                  onClick={() => setAccountOptions((prev) => !prev)}
                  className="cursor-pointer relative group py-1 px-1"
                >
                  <span className="transition-colors duration-200 group-hover:text-blue-600">
                    Account
                  </span>
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </div>

                {accountOptions && (
                  <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md py-4 pl-4 min-w-37.5 flex flex-col gap-6 z-9999">
                    <Link
                      to="/profile"
                      className="hover:text-blue-500 flex
                    items-center gap-2"
                    >
                      <span>
                        <User />
                      </span>
                      Profile
                    </Link>
                    <Link
                      to="/claims"
                      className="hover:text-blue-500 flex
                    items-center gap-2"
                    >
                      <span>
                        <Gift />
                      </span>
                      My Claim
                    </Link>
                    <Link
                      to="/wishlist"
                      className="hover:text-blue-500 flex
                    items-center gap-2"
                    >
                      <span>
                        <Heart />
                      </span>
                      Wishlist
                    </Link>

                    <button
                      onClick={logout}
                      className="text-left text-red-500 hover:text-red-600 cursor-pointer flex
                    items-center gap-2"
                    >
                      <span>
                        <Power />
                      </span>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/signIn">
                <Button variant="outline" style={{ cursor: "pointer" }}>
                  Login
                </Button>
              </Link>
              <Link to="/signUp">
                <Button style={{ cursor: "pointer" }}>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col gap-4 w-full mb-5 mt-4 px-1">
          {user ? (
            <>
              {/* Main Links */}
              <Link to="/" className="py-2">
                Home
              </Link>
              <Link to="/items" className="py-2">
                All Items
              </Link>
              <Link to="/my-report" className="py-2">
                My Report
              </Link>

              {/* Account Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
                <button
                  onClick={() => setAccountOptions((prev) => !prev)}
                  className="flex justify-between items-center w-full font-medium"
                >
                  <span>Account</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      accountOptions ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {accountOptions && (
                  <div className="mt-3 flex flex-col gap-3 pl-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 py-1 active:scale-95"
                    >
                      <User size={18} />
                      Profile
                    </Link>

                    <Link
                      to="/claims"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 py-1 active:scale-95"
                    >
                      <Gift size={18} />
                      My Claim
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 py-1 active:scale-95"
                    >
                      <Heart size={18} />
                      Wishlist
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 py-1 text-red-500 active:scale-95"
                    >
                      <Power size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/signIn">
                <button className="w-full border p-3 rounded-xl active:scale-95">
                  Login
                </button>
              </Link>

              <Link to="/signUp">
                <button className="w-full bg-blue-600 text-white p-3 rounded-xl active:scale-95">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
