import { motion } from "framer-motion";
import { Filter, SlidersHorizontal, MapPin } from "lucide-react";

export default function FilterSection({
  filters = { category: "", date: "", distance: 10 },
  setFilters = () => {},
}) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <section className="px-3 sm:px-5 md:px-10 py-8 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.10),transparent_28%)]" />

        <div className="relative p-4 sm:p-5 md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250, damping: 14 }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-200"
              >
                <Filter size={20} />
              </motion.div>

              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Filter Results
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Refine items by category, date, and distance
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600">
              <SlidersHorizontal size={16} />
              Smart Filters
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_1.2fr]">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-gray-200/80 bg-white/80 px-4 py-3 shadow-sm"
            >
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={filters.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full cursor-pointer bg-transparent text-sm font-medium text-gray-800 outline-none"
              >
                <option value="">Select Category</option>
                <option value="all">All</option>
                <option value="phones">Phones</option>
                <option value="tablets">Tablets</option>
                <option value="wallets">Wallets</option>
                <option value="keys">Keys</option>
                <option value="jewelries">Jewelries</option>
                <option value="laptop">Laptops</option>
                <option value="briefcase">Briefcase</option>
                <option value="electronics">Electronics</option>
                <option value="accessories">Accessories</option>
                <option value="clothings">Clothings</option>
                <option value="watches">Watches</option>
                <option value="documents">Documents</option>
                <option value="pets">Pets</option>
                <option value="others">Others</option>
              </select>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-gray-200/80 bg-white/80 px-4 py-3 shadow-sm"
            >
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                Date
              </label>
              <select
                name="date"
                id="date"
                value={filters.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full cursor-pointer bg-transparent text-sm font-medium text-gray-800 outline-none"
              >
                <option value="">Select Date</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="7days">7 Days</option>
                <option value="30days">Last 30 Days</option>
              </select>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block rounded-2xl border border-gray-200/80 bg-white/80 px-4 py-3 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Distance
                </label>
                <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  <MapPin size={12} />
                  {filters.distance} km
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={filters.distance}
                onChange={(e) =>
                  handleChange("distance", Number(e.target.value))
                }
                className="w-full cursor-pointer accent-orange-500"
              />

              <div className="mt-2 flex justify-between text-[11px] text-gray-400">
                <span>1 km</span>
                <span>25 km</span>
                <span>50 km</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="mt-3 rounded-2xl border border-gray-200/80 bg-white/80 px-4 py-3 shadow-sm md:hidden"
          >
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
              Distance
            </label>
            <select
              name="Distance"
              id="Distance"
              value={String(filters.distance)}
              onChange={(e) => handleChange("distance", Number(e.target.value))}
              className="w-full cursor-pointer bg-transparent text-sm font-medium text-gray-800 outline-none"
            >
              <option value="1">1 km</option>
              <option value="2">2 km</option>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="50">50 km</option>
            </select>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
