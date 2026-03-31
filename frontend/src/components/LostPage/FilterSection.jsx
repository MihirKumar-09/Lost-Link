import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPinned, SlidersHorizontal, Tag } from "lucide-react";

export default function FilterSection() {
  const [distance, setDistance] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMobileDistance, setSelectedMobileDistance] = useState("");

  const containerVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="px-3 sm:px-5 md:px-10 py-10 bg-linear-to-b from-[#fffaf7] to-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm"
      >
        {/* Background glow */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-orange-100/50 blur-3xl"
        />

        <div className="relative z-10 p-4 md:p-6">
          <motion.div
            variants={itemVariants}
            className="mb-5 flex items-center gap-3"
          >
            <motion.span
              whileHover={{ rotate: 12, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 250, damping: 12 }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FDEEE7]"
            >
              <SlidersHorizontal className="text-[#EC5B13]" size={20} />
            </motion.span>

            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                Filter Reports
              </h2>
              <p className="text-sm text-gray-500">
                Narrow down results by category, date, and distance.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 items-stretch">
            {/* Category */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group rounded-2xl border border-gray-200 bg-[#fcfcfc] p-4 hover:border-[#EC5B13] hover:shadow-md"
            >
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Tag size={16} className="text-[#EC5B13]" />
                Category
              </label>

              <select
                name="category"
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-[#EC5B13] focus:ring-2 focus:ring-orange-100"
              >
                <option value="">Select Category</option>
                <option value="All">All</option>
                <option value="Phones">Phones</option>
                <option value="Tablets">Tablets</option>
                <option value="Wallets">Wallets</option>
                <option value="Keys">Keys</option>
                <option value="Jewelries">Jewelries</option>
                <option value="Laptops">Laptops</option>
                <option value="Briefcase">Briefcase</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Clothings">Clothings</option>
                <option value="Watches">Watches</option>
                <option value="Documents">Documents</option>
                <option value="Pets">Pets</option>
                <option value="Others">Others</option>
              </select>
            </motion.div>

            {/* Date */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group rounded-2xl border border-gray-200 bg-[#fcfcfc] p-4 hover:border-[#EC5B13] hover:shadow-md"
            >
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <CalendarDays size={16} className="text-[#EC5B13]" />
                Date
              </label>

              <select
                name="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-[#EC5B13] focus:ring-2 focus:ring-orange-100"
              >
                <option value="">Select Date</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="7days">7 Days</option>
                <option value="30days">Last 30 Days</option>
              </select>
            </motion.div>

            {/* Desktop Distance Slider */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block rounded-2xl border border-gray-200 bg-[#fcfcfc] p-4 hover:border-[#EC5B13] hover:shadow-md"
            >
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPinned size={16} className="text-[#EC5B13]" />
                Distance
              </label>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">1 km</span>
                  <motion.span
                    key={distance}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-full bg-[#FDEEE7] px-3 py-1 font-semibold text-[#EC5B13]"
                  >
                    {distance} km
                  </motion.span>
                  <span className="text-gray-500">50 km</span>
                </div>

                <motion.input
                  whileTap={{ scale: 1.01 }}
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full cursor-pointer accent-orange-500"
                />

                <div className="h-2 w-full overflow-hidden rounded-full bg-orange-100">
                  <motion.div
                    className="h-full rounded-full bg-[#EC5B13]"
                    animate={{ width: `${(distance / 50) * 100}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Mobile Distance */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="md:hidden rounded-2xl border border-gray-200 bg-[#fcfcfc] p-4 hover:border-[#EC5B13] hover:shadow-md"
            >
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPinned size={16} className="text-[#EC5B13]" />
                Distance
              </label>

              <select
                name="Distance"
                id="Distance"
                value={selectedMobileDistance}
                onChange={(e) => setSelectedMobileDistance(e.target.value)}
                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-[#EC5B13] focus:ring-2 focus:ring-orange-100"
              >
                <option value="">Select Distance</option>
                <option value="1km">1 km</option>
                <option value="2km">2 km</option>
                <option value="5km">5 km</option>
                <option value="10km">10 km</option>
                <option value="50km">50 km</option>
                <option value="Others">Others</option>
              </select>
            </motion.div>

            {/* Action */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-end"
            >
              <button className="w-full rounded-2xl bg-[#EC5B13] px-5 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-[#d94f0f]">
                Apply Filters
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
