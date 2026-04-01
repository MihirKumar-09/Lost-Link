import { FcAnswers, FcOnlineSupport, FcLike } from "react-icons/fc";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FcAnswers size={42} />,
    title: "Report",
    description:
      "Provide details, photos, and the approximate location of the item lost or found.",
  },
  {
    icon: <FcOnlineSupport size={42} />,
    title: "Community Helps",
    description:
      "Our automated matching system and local community members identify potential matches.",
  },
  {
    icon: <FcLike size={42} />,
    title: "Safely Reconnect",
    description:
      "Coordinate a safe meeting point through our secure messaging to return the item.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function HowWork() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden px-3 py-16 text-center sm:px-5 md:px-12"
      style={{
        background:
          "linear-gradient(180deg, #F8FAFC 0%, #EEF4FF 50%, #F8FAFC 100%)",
      }}
    >
      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />

      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl"
        >
          How Lost Link Works
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base"
        >
          Reuniting with your belongings is as simple as these three steps.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              className="group relative rounded-3xl border border-blue-100 bg-white/80 p-8 shadow-[0_10px_30px_rgba(37,99,235,0.08)] backdrop-blur-md"
            >
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-50 via-white to-indigo-50 opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col items-center">
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-blue-100 to-indigo-100 shadow-[0_10px_25px_rgba(59,130,246,0.18)]"
                >
                  {step.icon}
                </motion.span>

                <h4 className="mt-5 mb-3 text-lg font-semibold text-slate-800 md:text-2xl">
                  {step.title}
                </h4>

                <p className="text-sm leading-7 text-slate-500 md:text-base">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
