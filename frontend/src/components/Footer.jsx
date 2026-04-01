import {
  ArrowUp,
  Facebook,
  Instagram,
  Twitter,
  Send,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
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
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  const socialIcons = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "Safety Center", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Contact Support", href: "#" },
  ];

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#0B1220] text-white">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#3358D4]/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-[#EC5B13]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)]" />
      </div>

      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 px-3 sm:px-5 md:px-12 pt-18 md:pt-24"
      >
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-5">
            <motion.a
              onClick={handleClick}
              whileHover={{ scale: 1.04 }}
              className="inline-flex cursor-pointer items-center gap-3"
            >
              <img
                src="/images/logo.png"
                alt="Main Logo"
                className="w-14 sm:w-16 md:w-18 drop-shadow-[0_8px_20px_rgba(255,255,255,0.08)]"
              />
              <div>
                <h3 className="text-xl font-bold tracking-wide">Lost Link</h3>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Community Recovery
                </p>
              </div>
            </motion.a>

            <p className="max-w-sm text-sm leading-7 text-white/70">
              The community platform helping people recover lost items through
              trust, technology, and faster local connections.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur-md">
              <Sparkles size={14} className="text-[#EC5B13]" />
              Built for safer, faster item recovery
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h5 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h5>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 6 }}
                    className="group inline-flex items-center text-sm text-white/70 transition hover:text-white"
                  >
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#EC5B13] opacity-0 transition duration-300 group-hover:opacity-100" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h5 className="mb-5 text-lg font-semibold text-white">Connect</h5>
            <p className="mb-5 max-w-xs text-sm leading-7 text-white/70">
              Follow the project and stay updated with product improvements and
              community activity.
            </p>

            <div className="flex gap-3">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -6, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10 hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                >
                  <Icon className="text-white/75 transition group-hover:text-[#EC5B13]" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h5 className="mb-5 text-lg font-semibold text-white">
              Stay Informed
            </h5>
            <p className="mb-5 text-sm leading-7 text-white/70">
              Get updates about new features, safety improvements, and community
              milestones.
            </p>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-2 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.18)]"
            >
              <div className="flex items-center gap-2 rounded-[22px] bg-[#111B2E] px-3 py-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 min-w-0 bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="shrink-0 rounded-2xl bg-linear-to-r from-[#EC5B13] to-[#ff7b39] px-4 py-3 font-semibold text-white shadow-[0_10px_25px_rgba(236,91,19,0.35)] transition"
                >
                  <span className="flex items-center gap-2 text-sm">
                    Join <Send size={16} />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 py-6 text-center md:flex-row md:text-left"
        >
          <p className="text-sm text-white/50">
            © 2026 Lost Link. All rights reserved.
          </p>

          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.12, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex h-12 w-12 items-center justify-center self-start rounded-full bg-linear-to-br from-[#3D63F2] to-[#2448d4] shadow-[0_12px_30px_rgba(61,99,242,0.4)] transition sm:self-auto"
          >
            <ArrowUp className="text-white transition duration-300 group-hover:-translate-y-0.5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
}
