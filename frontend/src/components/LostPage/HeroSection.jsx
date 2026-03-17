import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="px-3 sm:px-5 md:px-10 py-10 text-center">
      <div
        className="flex flex-col gap-3 items-center rounded-lg py-10 px-5"
        style={{ background: "linear-gradient(120deg, #F6E6E0, #F8F3F2)" }}
      >
        <p className="text-orange-500 font-medium bg-orange-200 px-3 py-1 rounded-2xl w-fit self-center">
          #1 Community Tracking App
        </p>
        <h1 className="text-black font-bold text-3xl md:text-5xl">
          Lost Something?
        </h1>
        <h1 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-orange-600 via-pink-500 to-orange-600 bg-clip-text text-transparent">
          Let the Community Help You.
        </h1>
        <p>
          Connect with thousand of activity local tracers to recover your lost
          belongings. <br className="hidden md:block" /> Fast, secure, and
          community-driven
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 flex-nowrap mt-5 mb-5">
          <button className="flex gap-2 bg-orange-500 text-white p-3 rounded-xl font-medium cursor-pointer">
            <CirclePlus /> <span>Report Lost Item</span>
          </button>
          <Link to="/found-item">
            <button className="bg-white p-3 rounded-xl font-medium cursor-pointer">
              Browse Found Items
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
