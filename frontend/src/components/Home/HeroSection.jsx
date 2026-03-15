export default function HeroSection() {
  return (
    <div
      style={{ background: "linear-gradient(120deg, #ffffff, #E4EDFB)" }}
      className="px-3 sm:px-5 md:px-12 py-10 flex justify-between items-center flex-col gap-4 md:flex-row"
    >
      <div className="flex flex-col pr-10 ">
        <h1 className="text-black font-bold text-3xl md:text-5xl mb-2">
          Lost Something?
        </h1>
        <h1 className="text-blue-600 font-bold text-3xl md:text-5xl">
          Let the Community Help You.
        </h1>
        <p className="text-gray-600 mt-3 mb-3" style={{ fontFamily: "revert" }}>
          TraceIt connects people who have lost precious belonging with honest
          finder in there neighborhood. Safe, secure, and community-driven.
        </p>
        <div className="flex  flex-col md:flex-row gap-3 md:gap-6">
          <button className="bg-black text-white font-medium text-sm w-40 px-3 py-3 rounded-md cursor-pointer hover:bg-blue-500 transition">
            Report Lost Item
          </button>
          <button className="bg-white text-black font-medium text-sm border border-blue-200 w-42 px-3 py-3 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white transition">
            I Found Something
          </button>
        </div>
      </div>
      <div className="overflow-hidden mt-5 md:mt-0 rounded-lg mx-auto w-full sm:w-3/4 lg:w-1/3 shadow-xl floating">
        <img src="/images/Home/Hero.png" alt="Hero" className="w-full h-auto" />
      </div>
    </div>
  );
}
