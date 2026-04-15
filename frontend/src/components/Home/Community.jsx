import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Users,
  ShieldCheck,
  HandHeart,
} from "lucide-react";

function CommunitySceneBackground() {
  const lightNodes = [
    { left: "10%", top: "18%", size: 12, delay: 0 },
    { left: "24%", top: "38%", size: 10, delay: 0.8 },
    { left: "39%", top: "22%", size: 14, delay: 1.4 },
    { left: "58%", top: "42%", size: 10, delay: 0.5 },
    { left: "74%", top: "20%", size: 13, delay: 1.2 },
    { left: "86%", top: "48%", size: 11, delay: 0.3 },
    { left: "22%", top: "70%", size: 12, delay: 1.8 },
    { left: "46%", top: "72%", size: 10, delay: 0.9 },
    { left: "70%", top: "68%", size: 14, delay: 1.5 },
  ];

  const darkNodes = [
    { left: "8%", top: "16%", size: 10, delay: 0.2 },
    { left: "20%", top: "34%", size: 12, delay: 1.2 },
    { left: "34%", top: "20%", size: 8, delay: 0.8 },
    { left: "50%", top: "40%", size: 12, delay: 1.8 },
    { left: "64%", top: "22%", size: 10, delay: 0.4 },
    { left: "80%", top: "36%", size: 12, delay: 1.4 },
    { left: "28%", top: "72%", size: 11, delay: 0.9 },
    { left: "48%", top: "66%", size: 9, delay: 0.1 },
    { left: "72%", top: "70%", size: 13, delay: 1.6 },
  ];

  const lightCards = [
    { left: "6%", top: "56%", rotate: -10, delay: 0 },
    { left: "78%", top: "12%", rotate: 10, delay: 1.1 },
    { left: "68%", top: "66%", rotate: -8, delay: 0.6 },
  ];

  const darkSignals = [
    { left: "12%", width: 160, top: "28%", delay: 0 },
    { left: "38%", width: 180, top: "58%", delay: 1.2 },
    { left: "60%", width: 150, top: "24%", delay: 0.7 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[34px]">
      {/* LIGHT THEME */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8fcff_0%,#eef8ff_42%,#fff7eb_100%)]" />

        <motion.div
          animate={{
            x: [0, 24, -18, 0],
            y: [0, -14, 12, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[4%] top-[8%] h-56 w-56 rounded-full bg-sky-200/30 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -26, 18, 0],
            y: [0, 18, -10, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[6%] bottom-[6%] h-64 w-64 rounded-full bg-orange-200/25 blur-3xl"
        />

        {/* connection lines */}
        <svg className="absolute inset-0 h-full w-full opacity-50">
          <line
            x1="10%"
            y1="18%"
            x2="24%"
            y2="38%"
            stroke="rgba(59,130,246,0.28)"
            strokeWidth="2"
          />
          <line
            x1="24%"
            y1="38%"
            x2="39%"
            y2="22%"
            stroke="rgba(59,130,246,0.24)"
            strokeWidth="2"
          />
          <line
            x1="39%"
            y1="22%"
            x2="58%"
            y2="42%"
            stroke="rgba(14,165,233,0.26)"
            strokeWidth="2"
          />
          <line
            x1="58%"
            y1="42%"
            x2="74%"
            y2="20%"
            stroke="rgba(249,115,22,0.24)"
            strokeWidth="2"
          />
          <line
            x1="58%"
            y1="42%"
            x2="46%"
            y2="72%"
            stroke="rgba(59,130,246,0.22)"
            strokeWidth="2"
          />
          <line
            x1="24%"
            y1="38%"
            x2="22%"
            y2="70%"
            stroke="rgba(249,115,22,0.2)"
            strokeWidth="2"
          />
          <line
            x1="46%"
            y1="72%"
            x2="70%"
            y2="68%"
            stroke="rgba(14,165,233,0.24)"
            strokeWidth="2"
          />
          <line
            x1="74%"
            y1="20%"
            x2="86%"
            y2="48%"
            stroke="rgba(59,130,246,0.22)"
            strokeWidth="2"
          />
        </svg>

        {/* flowing pulses on lines */}
        <motion.div
          animate={{ x: ["-10%", "115%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] h-0.5 w-28 rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),rgba(56,189,248,0.85),transparent)] blur-[1px]"
        />
        <motion.div
          animate={{ x: ["-20%", "110%"] }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: "linear",
            delay: 1.4,
          }}
          className="absolute top-[62%] h-0.5 w-32 -rotate-[8deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),rgba(249,115,22,0.78),transparent)] blur-[1px]"
        />

        {/* nodes */}
        {lightNodes.map((node, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.55, 1, 0.55],
              boxShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 18px rgba(59,130,246,0.28)",
                "0 0 0px rgba(255,255,255,0)",
              ],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay,
            }}
            className="absolute rounded-full border border-white/80 bg-white/85"
            style={{
              left: node.left,
              top: node.top,
              width: node.size,
              height: node.size,
            }}
          />
        ))}

        {/* community floating cards */}
        {lightCards.map((card, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -14, 0, 10, 0],
              x: [0, 8, -6, 0],
              rotate: [
                card.rotate,
                card.rotate + 3,
                card.rotate - 2,
                card.rotate,
              ],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            }}
            className="absolute hidden rounded-3xl border border-white/80 bg-white/50 p-3 shadow-[0_16px_40px_rgba(59,130,246,0.10)] backdrop-blur-xl md:block"
            style={{
              left: card.left,
              top: card.top,
              width: 120,
            }}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-sky-100" />
              <div className="flex-1">
                <div className="h-2.5 w-12 rounded-full bg-slate-300/80" />
                <div className="mt-2 h-2 w-16 rounded-full bg-slate-200/80" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DARK THEME */}
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#020617_0%,#091225_48%,#0f172a_100%)]" />

        <motion.div
          animate={{
            opacity: [0.12, 0.24, 0.12],
            scale: [1, 1.06, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[2%] top-[8%] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.22, 0.1],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[4%] bottom-[2%] h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"
        />

        {/* grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[42px_42px] opacity-30" />

        {/* network lines */}
        <svg className="absolute inset-0 h-full w-full opacity-70">
          <line
            x1="8%"
            y1="16%"
            x2="20%"
            y2="34%"
            stroke="rgba(34,211,238,0.28)"
            strokeWidth="2"
          />
          <line
            x1="20%"
            y1="34%"
            x2="34%"
            y2="20%"
            stroke="rgba(34,211,238,0.24)"
            strokeWidth="2"
          />
          <line
            x1="34%"
            y1="20%"
            x2="50%"
            y2="40%"
            stroke="rgba(59,130,246,0.24)"
            strokeWidth="2"
          />
          <line
            x1="50%"
            y1="40%"
            x2="64%"
            y2="22%"
            stroke="rgba(99,102,241,0.24)"
            strokeWidth="2"
          />
          <line
            x1="64%"
            y1="22%"
            x2="80%"
            y2="36%"
            stroke="rgba(34,211,238,0.22)"
            strokeWidth="2"
          />
          <line
            x1="20%"
            y1="34%"
            x2="28%"
            y2="72%"
            stroke="rgba(59,130,246,0.2)"
            strokeWidth="2"
          />
          <line
            x1="50%"
            y1="40%"
            x2="48%"
            y2="66%"
            stroke="rgba(34,211,238,0.22)"
            strokeWidth="2"
          />
          <line
            x1="48%"
            y1="66%"
            x2="72%"
            y2="70%"
            stroke="rgba(139,92,246,0.22)"
            strokeWidth="2"
          />
        </svg>

        {/* moving signal beams */}
        {darkSignals.map((beam, i) => (
          <motion.div
            key={i}
            animate={{
              x: ["-10%", "120%"],
              opacity: [0, 0.85, 0],
            }}
            transition={{
              duration: 4.5 + i,
              repeat: Infinity,
              ease: "linear",
              delay: beam.delay,
            }}
            className="absolute h-0.5 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),rgba(34,211,238,0.95),transparent)] blur-[1px]"
            style={{
              left: beam.left,
              top: beam.top,
              width: beam.width,
            }}
          />
        ))}

        {/* nodes */}
        {darkNodes.map((node, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.45, 1, 0.45],
              boxShadow: [
                "0 0 0px rgba(0,0,0,0)",
                "0 0 16px rgba(34,211,238,0.55)",
                "0 0 0px rgba(0,0,0,0)",
              ],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay,
            }}
            className="absolute rounded-full border border-cyan-300/50 bg-cyan-300/70"
            style={{
              left: node.left,
              top: node.top,
              width: node.size,
              height: node.size,
            }}
          />
        ))}

        {/* digital community panels */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[6%] top-[58%] hidden h-20 w-32 rounded-[22px] border border-cyan-300/20 bg-white/5 backdrop-blur-xl md:block"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            x: [0, -10, 0],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[8%] top-[14%] hidden h-24 w-28 rounded-3xl border border-violet-300/20 bg-white/5 backdrop-blur-xl md:block"
        />
      </div>
    </div>
  );
}

function CommunityHeading() {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="dark:hidden">
        <h1
          className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-5xl"
          style={{
            textShadow:
              "0 1px 0 rgba(255,255,255,0.95), 0 2px 0 rgba(255,255,255,0.7), 0 3px 0 rgba(191,219,254,0.75), 0 4px 0 rgba(125,211,252,0.35), 0 16px 30px rgba(15,23,42,0.18)",
          }}
        >
          Join the Community Helping Return Lost Items
        </h1>
      </div>

      <div className="hidden dark:block">
        <h1
          className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl"
          style={{
            textShadow:
              "0 1px 0 rgba(34,211,238,0.45), 0 2px 0 rgba(59,130,246,0.28), 0 3px 0 rgba(99,102,241,0.24), 0 0 22px rgba(34,211,238,0.18), 0 20px 38px rgba(0,0,0,0.55)",
          }}
        >
          Join the Community Helping Return Lost Items
        </h1>
      </div>
    </div>
  );
}

export default function Community() {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden px-3 py-14 text-center sm:px-5 md:px-12">
      {/* page background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8fbff_0%,#eef8ff_48%,#fff8ee_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#081120_45%,#030712_100%)]" />
        <motion.div
          animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-sky-200/25 blur-3xl dark:bg-cyan-500/10"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 14, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-orange-200/20 blur-3xl dark:bg-violet-500/10"
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative mx-auto w-full overflow-hidden rounded-[34px] border border-white/50 px-6 py-10 shadow-[0_30px_80px_rgba(0,71,204,0.12)] md:w-3xl md:px-12 md:py-14 dark:border-white/10 dark:shadow-[0_30px_80px_rgba(0,0,0,0.36)]"
      >
        <CommunitySceneBackground />

        <div className="absolute inset-0 bg-white/26 dark:bg-slate-950/18" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]" />

        <div className="relative z-10">
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/18 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-md dark:border-white/12 dark:bg-white/8 dark:text-white"
          >
            <Sparkles size={16} />
            Trusted Lost & Found Network
          </motion.div>

          <motion.div variants={itemVariants}>
            <CommunityHeading />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base dark:text-white/82"
          >
            Every report, every helper, and every honest response strengthens a
            real community network that helps lost belongings return to the
            right person faster and more safely.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 rounded-full border border-white/25 bg-white/16 px-4 py-2 text-sm text-slate-800 shadow-sm backdrop-blur-md dark:border-white/12 dark:bg-white/8 dark:text-white"
            >
              <Users size={16} />
              Community Driven
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 rounded-full border border-white/25 bg-white/16 px-4 py-2 text-sm text-slate-800 shadow-sm backdrop-blur-md dark:border-white/12 dark:bg-white/8 dark:text-white"
            >
              <HandHeart size={16} />
              People Helping People
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 rounded-full border border-white/25 bg-white/16 px-4 py-2 text-sm text-slate-800 shadow-sm backdrop-blur-md dark:border-white/12 dark:bg-white/8 dark:text-white"
            >
              <ShieldCheck size={16} />
              Safe & Reliable
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            {user ? (
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                whileHover={{
                  scale: 1.04,
                  y: -3,
                  boxShadow: "0px 20px 40px rgba(255,255,255,0.16)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/30 bg-white px-7 py-3.5 font-semibold text-slate-900 shadow-xl dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(241,245,249,0.92))] dark:text-slate-900 dark:shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
              >
                Get Started Now
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </motion.button>
            ) : (
              <Link to="/signIn">
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    y: -3,
                    boxShadow: "0px 20px 40px rgba(255,255,255,0.16)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/30 bg-white px-7 py-3.5 font-semibold text-slate-900 shadow-xl dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(241,245,249,0.92))] dark:text-slate-900 dark:shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
                >
                  Get Started Now
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </motion.button>
              </Link>
            )}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-white/12 to-transparent dark:from-white/6" />
        <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-white/14 dark:ring-white/10" />
      </motion.div>
    </section>
  );
}
