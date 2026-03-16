import { Button } from "@radix-ui/themes";
import { Menu, X } from "lucide-react";
import { useState } from "react";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav
      className="w-full border border-red-100 drop-shadow-xs px-3 sm:px-4 md:px-6"
      style={{ background: "#F7F8FA" }}
    >
      {/* Main Container */}
      <div className="flex justify-between items-center">
        <img src="/images/logo.png" alt="Main_Logo" className="w-24" />

        {/* Desktop Button */}
        <div className="hidden md:flex gap-6">
          <Button variant="outline">Login</Button>
          <Button variant="solid">Sign Up</Button>
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
        <div className="flex flex-col gap-5">
          <Button variant="outline" className="cursor-pointer">
            Login
          </Button>
          <Button variant="solid" className="cursor-pointer">
            Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
}
