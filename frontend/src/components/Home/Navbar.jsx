import { Button } from "@radix-ui/themes";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav
      id="home"
      className="w-full border-b border-black/20 drop-shadow-xs px-3 sm:px-4 md:px-6"
      style={{ background: "#F7F8FA" }}
    >
      {/* Main Container */}
      <div className="flex justify-between items-center">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Main_Logo"
            className="w-16 md:w-18"
          />
        </Link>

        {/* Desktop Button */}
        <div className="hidden md:flex gap-6">
          <Button variant="outline" style={{ cursor: "pointer" }}>
            Login
          </Button>
          <Link to="/signUp">
            <Button variant="solid" style={{ cursor: "pointer" }}>
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col gap-5 w-full mb-5">
          <Link to="/login" className="w-full">
            <button
              variant="outline"
              className="w-full border border-gray-300 shadow-md rounded-md p-2 font-medium text-lg"
            >
              Login
            </button>
          </Link>

          <Link to="/signUp" className="w-full">
            <button
              variant="solid"
              className="w-full bg-blue-600 shadow-md rounded-md p-2 font-medium text-lg text-white"
            >
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
