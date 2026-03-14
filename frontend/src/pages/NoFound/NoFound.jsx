import { Bug, HeartPlus, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
export default function NoFound() {
  return (
    <div
      className="min-h-screen w-full flex flex-col justify-center items-center text-center px-4 "
      style={{ background: "linear-gradient(to top, #C9D6FF, #E2E2E2 )" }}
    >
      <img
        src="/images/NoFound/NoFound.png"
        alt="404-OOPs"
        className="w-48 sm:w-56 md:w-64 lg:w-80 mb-4"
      />

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
        404 - Page Not Found
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-[#496682] max-w-xl mb-5">
        It looks like the page you're looking for has gone missing, just like a
        lost set of keys. Let's get you back on track.
      </p>

      <Link to="/">
        <button className="flex items-center gap-2 mt-4 border px-4 py-2 rounded-md bg-[#102A43] text-white">
          <LayoutDashboard size={22} />
          <span className="font-semibold">Back to Dashboard</span>
        </button>
      </Link>

      <div className="flex  gap-4 mt-6">
        <a className="flex items-center gap-2 px-4 py-2 border rounded-md">
          <Bug />
          <span>Report a Bug</span>
        </a>

        <a className="flex items-center gap-2 px-4 py-2 border rounded-md ">
          <HeartPlus />
          <span>Contact Support</span>
        </a>
      </div>
    </div>
  );
}
