import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
export default function HeroSection() {
  return (
    <div
      style={{
        background: "linear-gradient(120deg,#FAE8E4, #FDD2B5, #FBE8E2)",
      }}
      className="px-3 sm:px-5 md:px-12 py-10 flex justify-between items-center flex-col gap-4 md:flex-row"
    >
      <div className="flex flex-col pr-10 ">
        <h1 className="text-black font-bold text-3xl md:text-5xl mb-2">
          Recently Found
        </h1>
        <h1 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-orange-500 via-pink-500 to-orange-600 bg-clip-text text-transparent">
          Items Near You
        </h1>
        <p className="text-gray-600 mt-3 mb-3" style={{ fontFamily: "revert" }}>
          Browse items found by the community and help reunite them with their
          owners. Every report counts.
        </p>
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 w-full md:w-auto">
          <Link to="/found-item-form">
            <button className="flex gap-2 bg-orange-500 text-white px-4 py-3 rounded-xl font-medium w-fit cursor-pointer hover:scale-103 transition">
              <CirclePlus /> <span>Report Found Item</span>
            </button>
          </Link>

          <Link to="/lost-item">
            <button className="bg-white px-4 py-3 rounded-xl font-medium border border-gray-300 w-fit cursor-pointer hover:scale-103 transition">
              Browse Lost Items
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-hidden mt-5 md:mt-0 rounded-lg mx-auto w-full sm:w-3/4 lg:w-1/3 shadow-xl floating">
        <img
          src="/images/FoundPage/hero.png"
          alt="Hero"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
