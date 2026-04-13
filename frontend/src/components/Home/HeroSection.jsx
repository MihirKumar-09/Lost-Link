import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const lightParticles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: i % 4 === 0 ? 14 : i % 3 === 0 ? 9 : 5,
  left: `${4 + ((i * 13) % 92)}%`,
  top: `${6 + ((i * 11) % 84)}%`,
  duration: 8 + (i % 5) * 1.8,
  delay: (i % 6) * 0.35,
}));

const darkParticles = Array.from({ length: 34 }, (_, i) => ({
  id: i,
  size: i % 5 === 0 ? 4 : i % 3 === 0 ? 2.8 : 2,
  left: `${3 + ((i * 17) % 94)}%`,
  top: `${5 + ((i * 9) % 88)}%`,
  duration: 4 + (i % 6),
  delay: (i % 7) * 0.28,
}));

function AnimatedHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* LIGHT THEME */}
      <div className="absolute inset-0 dark:hidden">
        {/* base */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffffff_0%,#eef8ff_24%,#f8fbff_52%,#eef4ff_78%,#e8f1ff_100%)]" />

        {/* ambient glow blobs */}
        <motion.div
          animate={{
            x: [0, 50, -20, 0],
            y: [0, -30, 16, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -40, 18, 0],
            y: [0, 28, -18, 0],
            scale: [1, 0.94, 1.06, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-22.5 top-12 h-96 w-[24rem] rounded-full bg-fuchsia-300/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 30, -25, 0],
            y: [0, -16, 22, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-30 left-1/3 h-88 w-88 rounded-full bg-cyan-300/20 blur-3xl"
        />

        {/* moving light beams */}
        <motion.div
          animate={{
            rotate: [0, 6, -4, 0],
            x: [0, 20, -10, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-10%] top-[-20%] h-168 w-[20rem] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.45)_40%,rgba(255,255,255,0)_100%)] blur-3xl"
        />

        <motion.div
          animate={{
            rotate: [0, -8, 5, 0],
            x: [0, -16, 10, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className="absolute right-[4%] top-[-14%] h-160 w-[16rem] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(191,219,254,0.40)_42%,rgba(255,255,255,0)_100%)] blur-3xl"
        />

        {/* floating ribbons */}
        <motion.svg
          viewBox="0 0 1440 900"
          className="absolute inset-0 h-full w-full opacity-80"
          animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient
              id="heroLightWave1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.06" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient
              id="heroLightWave2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#facc15" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          <motion.path
            d="M-120 220 C 160 100, 320 320, 620 210 S 1080 130, 1560 250"
            stroke="url(#heroLightWave1)"
            strokeWidth="34"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M-120 220 C 160 100, 320 320, 620 210 S 1080 130, 1560 250",
                "M-120 245 C 170 130, 330 295, 620 190 S 1090 160, 1560 275",
                "M-120 220 C 160 100, 320 320, 620 210 S 1080 130, 1560 250",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.path
            d="M-160 620 C 130 510, 340 720, 690 610 S 1130 500, 1600 640"
            stroke="url(#heroLightWave2)"
            strokeWidth="40"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M-160 620 C 130 510, 340 720, 690 610 S 1130 500, 1600 640",
                "M-160 650 C 150 540, 360 700, 700 590 S 1120 530, 1600 670",
                "M-160 620 C 130 510, 340 720, 690 610 S 1130 500, 1600 640",
              ],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </motion.svg>

        {/* glass particles */}
        {lightParticles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.left,
              top: particle.top,
              background:
                particle.id % 2 === 0
                  ? "rgba(96,165,250,0.38)"
                  : "rgba(251,191,36,0.34)",
              boxShadow:
                particle.id % 2 === 0
                  ? "0 0 18px rgba(96,165,250,0.28)"
                  : "0 0 18px rgba(251,191,36,0.24)",
            }}
            animate={{
              y: [0, -24, 0, 12, 0],
              x: [0, 8, -6, 12, 0],
              opacity: [0.2, 0.7, 0.28, 0.55, 0.2],
              scale: [1, 1.25, 0.94, 1.08, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* subtle grid */}
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_18%,rgba(255,255,255,0.00)_100%)]" />
      </div>

      {/* DARK THEME */}
      <div className="absolute inset-0 hidden dark:block">
        {/* base */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f172a_0%,#070d1f_26%,#040917_58%,#02040c_100%)]" />

        {/* neon glows */}
        <motion.div
          animate={{
            x: [0, 44, -22, 0],
            y: [0, -28, 16, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-cyan-400/16 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -34, 18, 0],
            y: [0, 26, -14, 0],
            scale: [1, 0.94, 1.07, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-25 top-20 h-104 w-104 rounded-full bg-fuchsia-500/12 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 24, -28, 0],
            y: [0, -18, 26, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-30 left-1/3 h-96 w-[24rem] rounded-full bg-violet-500/10 blur-3xl"
        />

        {/* pulse rings */}
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.22, 0.08, 0.22],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[18%] h-52 w-52 rounded-full border border-cyan-300/20"
        />

        <motion.div
          animate={{
            scale: [1, 1.22, 1],
            opacity: [0.16, 0.05, 0.16],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
          className="absolute right-[10%] top-[48%] h-60 w-60 rounded-full border border-fuchsia-300/15"
        />

        {/* cyber field */}
        <motion.svg
          viewBox="0 0 1440 900"
          className="absolute inset-0 h-full w-full opacity-65"
          animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient
              id="heroDarkLine1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.10" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.58" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.12" />
            </linearGradient>

            <linearGradient
              id="heroDarkLine2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.10" />
            </linearGradient>

            <radialGradient id="heroNodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
            </radialGradient>
          </defs>

          <motion.path
            d="M-120 180 C 120 80, 340 290, 620 180 S 1060 90, 1560 220"
            stroke="url(#heroDarkLine1)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M-120 180 C 120 80, 340 290, 620 180 S 1060 90, 1560 220",
                "M-120 210 C 150 110, 360 260, 630 160 S 1050 120, 1560 250",
                "M-120 180 C 120 80, 340 290, 620 180 S 1060 90, 1560 220",
              ],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.path
            d="M-100 420 C 140 320, 360 510, 700 430 S 1120 320, 1560 470"
            stroke="url(#heroDarkLine2)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M-100 420 C 140 320, 360 510, 700 430 S 1120 320, 1560 470",
                "M-100 450 C 160 350, 390 490, 710 405 S 1110 350, 1560 500",
                "M-100 420 C 140 320, 360 510, 700 430 S 1120 320, 1560 470",
              ],
            }}
            transition={{
              duration: 8.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />

          <motion.path
            d="M-140 690 C 120 580, 360 790, 720 690 S 1140 560, 1600 720"
            stroke="url(#heroDarkLine1)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M-140 690 C 120 580, 360 790, 720 690 S 1140 560, 1600 720",
                "M-140 720 C 140 610, 390 770, 730 665 S 1120 600, 1600 750",
                "M-140 690 C 120 580, 360 790, 720 690 S 1140 560, 1600 720",
              ],
            }}
            transition={{
              duration: 9.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />

          {[
            [150, 160],
            [320, 220],
            [520, 180],
            [860, 150],
            [240, 420],
            [520, 470],
            [830, 420],
            [1080, 360],
            [180, 700],
            [460, 750],
            [770, 700],
            [1110, 640],
          ].map(([cx, cy], index) => (
            <g key={index}>
              <circle cx={cx} cy={cy} r="12" fill="url(#heroNodeGlow)" />
              <circle cx={cx} cy={cy} r="2.2" fill="#67e8f9" opacity="0.95" />
            </g>
          ))}
        </motion.svg>

        {/* data particles */}
        {darkParticles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-cyan-200/80"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.left,
              top: particle.top,
              boxShadow:
                particle.id % 2 === 0
                  ? "0 0 12px rgba(103,232,249,0.65)"
                  : "0 0 12px rgba(217,70,239,0.45)",
            }}
            animate={{
              opacity: [0.2, 1, 0.3],
              scale: [1, 1.8, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* scan beam */}
        <motion.div
          animate={{ y: ["-12%", "112%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-28 bg-[linear-gradient(180deg,rgba(34,211,238,0)_0%,rgba(34,211,238,0.08)_45%,rgba(34,211,238,0)_100%)] blur-xl"
        />

        {/* animated grid */}
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56,189,248,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56,189,248,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "38px 38px",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.01)_18%,rgba(2,6,23,0.12)_100%)]" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white transition-colors duration-500 dark:bg-[#020617]">
      <AnimatedHeroBackground />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-between gap-12 px-4 py-12 sm:px-6 lg:flex-row lg:px-10 lg:py-20">
        {/* LEFT */}
        <motion.div
          initial="hidden"
          animate="show"
          className="max-w-2xl text-center lg:text-left"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-blue-300"
          >
            <Sparkles size={16} />
            Community Powered Lost & Found Platform
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={0.1}
            className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
          >
            Lost Something?
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            custom={0.2}
            className="mt-2 text-4xl font-extrabold sm:text-5xl lg:text-6xl"
          >
            <span className="bg-linear-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Let the Community Help You Find It
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.3}
            className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg lg:mx-0"
          >
            Lost Link helps people reconnect with their valuable belongings
            through a safe, trusted, and community-driven network.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.4}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start"
          >
            <Link to="/lost-item">
              <motion.button
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-600 dark:bg-white dark:text-black dark:hover:bg-blue-500"
              >
                Report Lost Item
                <ArrowRight
                  className="transition group-hover:translate-x-1"
                  size={17}
                />
              </motion.button>
            </Link>

            <Link to="/found-item">
              <motion.button
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-800 shadow-md transition hover:bg-blue-50 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                I Found Something
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.5}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {[
              {
                icon: <Search size={18} />,
                title: "Smart Reports",
                desc: "Quick item submission",
              },
              {
                icon: <ShieldCheck size={18} />,
                title: "Safe & Trusted",
                desc: "Secure reporting flow",
              },
              {
                icon: <MapPin size={18} />,
                title: "Nearby Support",
                desc: "Community-driven recovery",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
              >
                <div className="rounded-full bg-gray-100 p-2 text-gray-700 dark:bg-white/10 dark:text-white">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative w-full max-w-md lg:max-w-xl"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[28px] border border-white/40 bg-white/65 p-3 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-100/40 via-transparent to-purple-100/40 dark:from-blue-500/20 dark:to-purple-500/20" />
            <img
              src="/images/Home/Hero.png"
              alt="Hero"
              className="relative z-10 rounded-2xl object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
