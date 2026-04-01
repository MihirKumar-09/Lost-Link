import { motion } from "framer-motion";
import { Quote, Sparkles, ArrowUpRight } from "lucide-react";

const stories = [
  {
    image: "images/Home/image1.jpeg",
    name: "Sarah Jenkins",
    item: "Wedding Ring",
    description:
      "I was devastated when I lost my ring at the park. Within 24 hours of posting on Lost Link, an honest soul contacted me. Thank you!",
    helpType: "Recovered",
  },
  {
    image: "images/Home/image2.jpeg",
    name: "Mark Thomson",
    item: "Mac Pro",
    description:
      "Found a laptop at the airport. Lost Link made it so easy to find the owner without revealing my personal info until I felt safe.",
    helpType: "Returned",
  },
  {
    image: "images/Home/image3.jpeg",
    name: "Leo Martinez",
    item: "Keys",
    description:
      "Losing my car keys could have cost me hundreds. Lost Link saved the day! Great community and very easy to use.",
    helpType: "Returned",
  },
];

export default function SuccessStories() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section className="relative overflow-hidden bg-[#F8FAFC] px-3 py-14 text-center sm:px-5 md:px-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-10 top-10 h-44 w-44 rounded-full bg-orange-200/30 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-blue-200/30 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md"
        >
          <motion.span
            animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-orange-500"
          >
            <Sparkles size={15} />
          </motion.span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            Real Community Impact
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
        >
          Success Stories
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base"
        >
          Real people, real recoveries, and proof that Lost Link is more than
          just a platform.
        </motion.p>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {stories.map((story, key) => (
            <motion.div
              key={key}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.015,
                boxShadow: "0px 24px 60px rgba(15,23,42,0.12)",
              }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/60 bg-white/75 p-6 text-left shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            >
              {/* Card glow */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.08))]" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-100/50 blur-2xl transition duration-500 group-hover:scale-125" />

              {/* Top row */}
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-md"
                  >
                    <img
                      src={story.image}
                      alt={story.name}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>

                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      {story.name}
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      <span className="font-medium text-emerald-600">
                        {story.helpType}
                      </span>{" "}
                      • {story.item}
                    </p>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="rounded-full border border-slate-200 bg-white/80 p-2 text-slate-500 shadow-sm"
                >
                  <Quote size={16} />
                </motion.div>
              </div>

              {/* Story */}
              <p className="relative z-10 mt-5 text-sm leading-7 text-slate-600">
                “{story.description}”
              </p>

              {/* Bottom tag */}
              <div className="relative z-10 mt-6 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                  Verified Story
                </span>

                <motion.span
                  whileHover={{ x: 3, y: -3 }}
                  className="text-slate-400"
                >
                  <ArrowUpRight size={18} />
                </motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
