import { Button } from "@radix-ui/themes";
import { Menu, X } from "lucide-react";
import { useState } from "react";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav
      className="w-full 
     bg-white border border-red-100 drop-shadow-xs px-3 sm:px-4 md:px-6"
    >
      {/* Top Navbar */}
      <div className="flex items-center justify-between">
        <img src="/images/logo.png" alt="Main-Logo" className="w-20" />

        {/* Desktop Button */}
        <div className="hidden md:flex gap-6">
          <Button variant="outline">Login</Button>
          <Button variant="solid">Sign Up</Button>
        </div>

        {/*Toggle Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col gap-3 pb-4 md:hidden">
          <Button variant="outline">Login</Button>
          <Button variant="solid">Sign Up</Button>
        </div>
      )}
    </nav>
  );
}
