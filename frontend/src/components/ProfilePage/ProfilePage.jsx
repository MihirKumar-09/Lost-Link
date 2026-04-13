import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import QuickActions from "./QuickActions";
import SafetyFirst from "./SafetyFirst";
import MobileBottomNav from "./MobileBottomNav";

export default function ProfilePage() {
  const location = useLocation();
  const [active, setActive] = useState(
    location.state?.activeTab || "Dashboard",
  );

  useEffect(() => {
    if (location.state?.activeTab) {
      setActive(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <div
      className="
        relative h-dvh overflow-hidden
        bg-[linear-gradient(135deg,#f5f9ff_0%,#edf4ff_28%,#f9fbff_52%,#eef6ff_100%)]
        dark:bg-[linear-gradient(135deg,#040d1e_0%,#07152c_24%,#0b1c38_55%,#0f2240_100%)]
      "
    >
      {/* Global animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* light blobs */}
        <motion.div
          animate={{
            x: [0, 30, -12, 0],
            y: [0, -20, 18, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-16 h-80 w-80 rounded-full bg-sky-300/25 blur-3xl dark:hidden"
        />
        <motion.div
          animate={{
            x: [0, -24, 20, 0],
            y: [0, 16, -18, 0],
            scale: [1, 0.95, 1.06, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 top-[10%] h-96 w-96 rounded-full bg-violet-300/20 blur-3xl dark:hidden"
        />
        <motion.div
          animate={{
            x: [0, 14, -8, 0],
            y: [0, -12, 15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-17.5 left-[18%] h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl dark:hidden"
        />

        {/* dark blobs */}
        <motion.div
          animate={{
            x: [0, 24, -12, 0],
            y: [0, -18, 14, 0],
            scale: [1, 1.05, 0.96, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 hidden h-96 w-96 rounded-full bg-cyan-400/12 blur-3xl dark:block"
        />
        <motion.div
          animate={{
            x: [0, -26, 18, 0],
            y: [0, 16, -14, 0],
            scale: [1, 0.96, 1.06, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-25 top-[8%] hidden h-112 w-md rounded-full bg-blue-500/12 blur-3xl dark:block"
        />
        <motion.div
          animate={{
            x: [0, 18, -10, 0],
            y: [0, -10, 16, 0],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-25 left-[24%] hidden h-80 w-80 rounded-full bg-emerald-400/8 blur-3xl dark:block"
        />

        {/* texture */}
        <div
          className="
            absolute inset-0
            bg-[linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)]
            bg-size-[24px_24px]
            opacity-[0.16]
            dark:opacity-[0.06]
          "
        />
      </div>

      <div className="relative z-10 flex h-full flex-col overflow-hidden">
        <div className="shrink-0">
          <Navbar />
        </div>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <LeftSection active={active} setActive={setActive} />

          {/* Desktop layout */}
          <div className="hidden min-h-0 flex-1 md:block">
            <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_300px] gap-4 px-4 pb-4 pt-3 lg:px-5 lg:pb-5 lg:pt-4">
              {/* Main content shell */}
              <div
                className="
                  relative min-h-0 overflow-hidden border
                  border-white/60 bg-white/35 shadow-[0_20px_60px_rgba(15,23,42,0.08)]
                  backdrop-blur-xl
                  dark:border-white/10 dark:bg-white/[0.035]
                  dark:shadow-[0_20px_60px_rgba(0,0,0,0.30)]
                "
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent dark:via-cyan-300/50" />
                <div className="h-full overflow-y-auto">
                  <RightSection active={active} />
                </div>
              </div>

              {/* Right side shell */}
              <div
                className="
                  min-h-0 overflow-y-auto border
                  border-white/60 bg-white/30 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.06)]
                  backdrop-blur-xl no-scrollbar
                  dark:border-white/10 dark:bg-white/4
                  dark:shadow-[0_20px_60px_rgba(0,0,0,0.26)]
                "
              >
                <div className="space-y-4">
                  <QuickActions />
                  <SafetyFirst />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex min-h-0 flex-1 overflow-y-auto md:hidden pb-27.5">
            <div className="w-full px-3 pt-3">
              <RightSection active={active} />
            </div>
          </div>
        </div>
      </div>

      <MobileBottomNav active={active} setActive={setActive} />
    </div>
  );
}
