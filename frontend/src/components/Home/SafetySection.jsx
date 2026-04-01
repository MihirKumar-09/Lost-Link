import { motion } from "framer-motion";
import { ShieldCheck, SearchCheck, Users, Sparkles } from "lucide-react";

const safetyFeatures = [
  {
    icon: ShieldCheck,
    title: "Identity Verification",
    description:
      "Mandatory account verification helps build a more trustworthy and accountable community for every report and recovery.",
  },
  {
    icon: SearchCheck,
    title: "Secure Claiming",
    description:
      "Claim requests require correct item details before direct contact is allowed, reducing fraud and unsafe interactions.",
  },
  {
    icon: Users,
    title: "Community Moderation",
    description:
      "Active monitoring, reporting tools, and moderation systems help keep the platform safer and free from spam or abuse.",
  },
];

export default function SafetySection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#0F172A] px-3 py-14 text-white sm:px-5 md:px-12">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-8 top-8 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -18, 0], y: [0, 16, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_28%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
        >
          <motion.span
            animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-blue-400"
          >
            <Sparkles size={15} />
          </motion.span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
            Safe by Design
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-5 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          Your Safety is Our Priority
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-slate-400 md:text-base"
        >
          Lost Link is built with security-focused features designed to make
          every recovery more trusted, controlled, and safe.
        </motion.p>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {safetyFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.015,
                  boxShadow: "0px 24px 60px rgba(0,0,0,0.28)",
                }}
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              >
                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-400/10 blur-2xl transition duration-500 group-hover:scale-125" />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.06 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400 shadow-lg"
                  >
                    <Icon size={28} />
                  </motion.div>

                  <h4 className="mt-5 text-lg font-semibold text-white md:text-xl">
                    {feature.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-slate-400 md:text-base">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
