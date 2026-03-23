import { Bell, MessageSquare, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav
      id="home"
      className="w-full border-b border-black/20 drop-shadow-xs px-3 sm:px-4 md:px-6 flex justify-between items-center bg-[#F5F6F8]"
    >
      <Link to="/">
        <img src="/images/logo.png" alt="Main_Logo" className="w-16 md:w-18" />
      </Link>
      <span
        className="hidden md:flex gap-3 border p-3 w-160 rounded-full "
        style={{ backgroundColor: "#F1F5F9" }}
      >
        <Search style={{ width: "4%" }} />
        <input
          type="text"
          placeholder="Search items like phone, wallet, keys"
          style={{ width: "calc(100% - 4%)", backgroundColor: "#F1F5F9" }}
          className="bg-transparent outline-none focus:outline-none focus:ring-0 flex-1 min-w-0"
        />
      </span>
      <span className="flex gap-8">
        <Bell />
        <MessageSquare />
        <User />
      </span>
    </nav>
  );
}
