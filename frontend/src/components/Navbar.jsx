import {
  Bell,
  MessageSquare,
  Search,
  User,
  Gift,
  Heart,
  Power,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Button } from "@radix-ui/themes";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const [menu, setMenu] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav
      id="home"
      className="w-full border-b border-black/20 drop-shadow-xs px-3 sm:px-4 md:px-6 flex justify-between items-center bg-[#F5F6F8]"
    >
      {/* Logo */}
      <Link to="/">
        <img src="/images/logo.png" alt="Main_Logo" className="w-16 md:w-18" />
      </Link>

      {/* Search */}
      {!isProfilePage && (
        <span
          className="hidden gap-3 p-3 border rounded-full md:flex w-160"
          style={{ backgroundColor: "#F1F5F9" }}
        >
          <Search style={{ width: "4%" }} />
          <input
            type="text"
            placeholder="Search items like phone, wallet, keys"
            style={{ width: "calc(100% - 4%)", backgroundColor: "#F1F5F9" }}
            className="flex-1 bg-transparent outline-none"
          />
        </span>
      )}

      {/* Right Section */}
      <div className="relative flex items-center gap-8">
        <Bell />
        <MessageSquare />

        {/* User Dropdown */}
        <div className="relative">
          <button onClick={() => setMenu((prev) => !prev)}>
            <User className="cursor-pointer" />
          </button>

          {menu && (
            <div className="absolute right-0 z-50 flex flex-col gap-4 px-4 py-4 bg-white rounded-md shadow-lg top-10 min-w-45">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 hover:text-blue-500"
                  >
                    <User size={18} />
                    Profile
                  </Link>

                  <Link
                    to="/claims"
                    className="flex items-center gap-2 hover:text-blue-500"
                  >
                    <Gift size={18} />
                    My Claim
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center gap-2 hover:text-blue-500"
                  >
                    <Heart size={18} />
                    Wishlist
                  </Link>

                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-left text-red-500 cursor-pointer hover:text-red-800"
                  >
                    <Power size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signIn">
                    <Button
                      variant="outline"
                      style={{ cursor: "pointer", width: "100%" }}
                    >
                      Login
                    </Button>
                  </Link>

                  <Link to="/signUp">
                    <Button style={{ cursor: "pointer", width: "100%" }}>
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
