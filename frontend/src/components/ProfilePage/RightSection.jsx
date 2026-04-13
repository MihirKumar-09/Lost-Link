import { motion, AnimatePresence } from "framer-motion";
import DashboardSection from "./DashboardSection";
import MyLostItemSection from "./MyLostItemsSection";
import MyFoundItemSection from "./MyFoundItemsSection";
import MyClaimSection from "./MyClaimSection";
import SavedItemSection from "./SavedItemSection";
import SettingSection from "./SettingSection";

export default function RightSection({ active }) {
  const renderSection = () => {
    switch (active) {
      case "Dashboard":
        return <DashboardSection />;
      case "My Lost Items":
        return <MyLostItemSection />;
      case "My Found Items":
        return <MyFoundItemSection />;
      case "My Claim":
        return <MyClaimSection />;
      case "Saved Items":
        return <SavedItemSection />;
      case "Settings":
        return <SettingSection />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <section className="h-full w-full">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.992 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative h-full w-full overflow-hidden"
      >
        {/* background layer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 26, -12, 0],
              y: [0, -18, 12, 0],
              scale: [1, 1.06, 0.96, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute -top-20 -right-12 h-72 w-72 rounded-full bg-sky-300/22 blur-3xl dark:hidden"
          />

          <motion.div
            animate={{
              x: [0, -20, 16, 0],
              y: [0, 16, -14, 0],
              scale: [1, 0.96, 1.06, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute -bottom-16 -left-10 h-80 w-80 rounded-full bg-violet-300/18 blur-3xl dark:hidden"
          />

          <motion.div
            animate={{ opacity: [0.18, 0.35, 0.18] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 dark:hidden bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.10),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.08),transparent_32%)]"
          />

          <motion.div
            animate={{
              x: [0, 24, -10, 0],
              y: [0, -18, 14, 0],
              scale: [1, 1.08, 0.96, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute -top-24 -right-16 hidden h-72 w-72 rounded-full bg-cyan-400/12 blur-3xl dark:block"
          />

          <motion.div
            animate={{
              x: [0, -20, 16, 0],
              y: [0, 16, -14, 0],
              scale: [1, 0.96, 1.06, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute -bottom-15 -left-10 hidden h-80 w-80 rounded-full bg-blue-500/12 blur-3xl dark:block"
          />

          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.10),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_32%)]"
          />

          <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.07] bg-[linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] bg-size-[28px_28px]" />

          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/70 to-transparent dark:via-cyan-300/90" />
        </div>

        {/* content */}
        <div className="relative h-full w-full overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.992,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.99,
                filter: "blur(6px)",
              }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="min-h-full w-full"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
