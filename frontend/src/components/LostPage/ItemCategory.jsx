import {
  BriefcaseBusiness,
  Cable,
  Gem,
  Glasses,
  KeySquare,
  Laptop,
  LayoutGrid,
  NotepadText,
  Panda,
  Shirt,
  Smartphone,
  TabletSmartphone,
  Wallet2,
  Watch,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ItemCategory() {
  const categories = [
    { name: "Phones", icon: Smartphone },
    { name: "Tablets", icon: TabletSmartphone },
    { name: "Wallets", icon: Wallet2 },
    { name: "Keys", icon: KeySquare },
    { name: "Jewelries", icon: Gem },
    { name: "Laptops", icon: Laptop },
    { name: "Briefcase", icon: BriefcaseBusiness },
    { name: "Electronics", icon: Cable },
    { name: "Accessories", icon: Glasses },
    { name: "Clothing", icon: Shirt },
    { name: "Watches", icon: Watch },
    { name: "Documents", icon: NotepadText },
    { name: "Pets", icon: Panda },
    { name: "Others", icon: LayoutGrid },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.92,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="px-3 sm:px-5 md:px-10 py-10 bg-linear-to-b from-[#fffaf7] to-white">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <p className="text-sm font-semibold tracking-wide uppercase text-[#EC5B13]">
          Browse Categories
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Explore Lost & Found Items
        </h2>
        <p className="mt-2 text-sm md:text-base text-gray-500 max-w-2xl">
          Quickly navigate through popular categories to find reported items
          faster.
        </p>
      </motion.div>

      <div className="overflow-x-auto no-scrollbar">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex gap-4 min-w-max px-1 py-2"
        >
          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.04,
                  transition: { duration: 0.22 },
                }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden min-w-31.25 shrink-0 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm cursor-pointer"
              >
                {/* animated glow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-linear-to-br from-[#FDEEE7] via-transparent to-[#fff7f2] pointer-events-none"
                />

                {/* top shine bar */}
                <motion.div
                  initial={{ x: "-120%" }}
                  whileHover={{ x: "120%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-full w-10 rotate-12 bg-white/40 blur-md pointer-events-none"
                />

                <div className="relative z-10 flex flex-col items-center gap-2">
                  <motion.span
                    whileHover={{ rotate: 8, scale: 1.12 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    className="flex items-center justify-center p-3 rounded-2xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition-colors duration-300 shadow-sm"
                  >
                    <Icon
                      size={24}
                      className="text-[#EC5B13] group-hover:text-white transition-colors duration-300"
                    />
                  </motion.span>

                  <span className="text-sm md:text-base font-semibold text-gray-700 group-hover:text-black transition-colors">
                    {item.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
