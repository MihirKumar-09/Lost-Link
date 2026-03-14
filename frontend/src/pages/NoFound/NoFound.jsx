import { Bug, HeartPlus, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
export default function NoFound() {
  return (
    <div
      className="container flex flex-col justify-center items-center text-center "
      style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to top, #C9D6FF, #E2E2E2 )",
      }}
    >
      <img
        src="images\NoFound\NoFound.png"
        alt="404-OOPs"
        style={{ width: "20%" }}
      />
      <h1 className="text-4xl font-semibold font-sans mb-2">
        404-Page Not Found
      </h1>
      <p
        className="text-xl font-semibold mb-3 mt-3"
        style={{ color: "#496682" }}
      >
        It looks like the page you're looking for has gone missing, just <br />
        like a lost set of keys. Lets get you back on track
      </p>
      <Link to="/">
        <button
          className="flex mt-5 mb-3 border p-3 rounded-md cursor-pointer"
          style={{ backgroundColor: "#102A43", color: "#ffffff" }}
        >
          {" "}
          <LayoutDashboard size={24} />
          <span className="font-semibold ml-2">Back to Dashboard</span>
        </button>
      </Link>
      <div className="flex gap-5 mt-5">
        <a className="flex gap-3 p-2 cursor-pointer border rounded-md bg-blue-300">
          <Bug />
          <span>Report a Bug</span>
        </a>
        <a className="flex gap-3 p-2 cursor-pointer border rounded-md">
          <HeartPlus />
          <span>Contact Support</span>
        </a>
      </div>
    </div>
  );
}
