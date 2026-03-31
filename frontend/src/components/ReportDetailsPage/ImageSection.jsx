import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function ImageSection({ productDetails }) {
  if (!productDetails) {
    return (
      <section className="w-full md:w-1/2">
        <div className="flex items-center justify-center w-full bg-gray-100 shadow-2xl rounded-3xl aspect-square">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full md:w-1/2">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative group"
      >
        {/* Glow background */}
        <div className="absolute -inset-2 bg-linear-to-br from-blue-200/40 via-purple-200/30 to-pink-200/40 rounded-4xl blur-2xl opacity-60 group-hover:opacity-80 transition duration-500" />

        {/* Main Card */}
        <motion.div
          whileHover={{
            y: -10,
            rotate: -1,
            scale: 1.02,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="relative overflow-hidden border shadow-[0_30px_80px_rgba(0,0,0,0.12)] rounded-[30px] border-white/60 bg-white"
        >
          {/* Image */}
          <div className="relative w-full overflow-hidden aspect-4/4 md:aspect-4/3">
            <motion.img
              src={productDetails.image}
              alt="Report"
              className="object-cover w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

            {/* Floating Badge - Type */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md
                ${
                  productDetails.reportType === "lost"
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
            >
              {productDetails.reportType === "lost" ? "Lost" : "Found"}
            </motion.div>

            {/* Floating Badge - Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md
                ${
                  productDetails.status === "closed"
                    ? "bg-gray-800/90 text-white"
                    : "bg-white/90 text-[#3358D4]"
                }`}
            >
              {productDetails.status === "closed" ? "Closed" : "Open"}
            </motion.div>

            {/* Bottom Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-bold md:text-2xl"
              >
                {productDetails.name}
              </motion.h3>

              <div className="flex items-center gap-2 mt-2 text-sm text-white/90">
                <MapPin size={16} />
                <span>
                  {productDetails.location?.city},{" "}
                  {productDetails.location?.area}
                </span>
              </div>
            </div>
          </div>

          {/* Floating glass info card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute hidden px-4 py-3 bg-white shadow-xl bottom-4 right-4 rounded-2xl backdrop-blur-md md:block"
          >
            <p className="text-xs text-gray-500">Reported</p>
            <p className="text-sm font-semibold text-gray-900">
              {new Date(productDetails.dateTime).toLocaleDateString()}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
