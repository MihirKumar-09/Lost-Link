import { Button } from "@radix-ui/themes";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav
      className="w-full border-b border-black/20 drop-shadow-xs px-3 sm:px-4 md:px-6"
      style={{ background: "#F7F8FA" }}
    >
      <div className="flex justify-between items-center">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Main_Logo"
            className="w-16 md:w-18"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-6">
          {user ? (
            <div className="flex items-center gap-6">
              <span className="font-medium">Hi, {user.name}</span>
              <Button className="cursor-pointer!" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/signIn">
                <Button className="cursor-pointer!" variant="outline">
                  Login
                </Button>
              </Link>
              <Link to="/signUp">
                <Button className="cursor-pointer!" variant="solid">
                  Sign Up
                </Button>
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
        <div className="flex flex-col gap-5 w-full mb-5">
          {user ? (
            <>
              <span className="text-lg">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="w-full bg-red-500 text-white p-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signIn">
                <button className="w-full border p-2 rounded-md">Login</button>
              </Link>
              <Link to="/signUp">
                <button className="w-full bg-blue-600 text-white p-2 rounded-md">
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
