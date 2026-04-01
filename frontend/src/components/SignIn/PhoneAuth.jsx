import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { cn } from "../../lib/utils.js";

export default function PhoneAuth() {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const sendOtp = async () => {
    setPhoneError("");

    if (!/^[0-9]{10}$/.test(phone)) {
      setPhoneError("Enter valid mobile number");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      setTimer(30);
    }, 1000);
  };

  const verifyOtp = async () => {
    setOtpError("");

    if (!/^[0-9]{6}$/.test(otp)) {
      setOtpError("Enter valid OTP");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("verified");

      setTimeout(() => {
        window.location.href = "/";
      }, 900);
    }, 1000);
  };

  const sectionMotion = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.28 },
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {/* STEP 1 */}
        {step === "phone" && (
          <motion.div
            key="phone-step"
            {...sectionMotion}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Mobile Number
              </label>

              <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm transition-all duration-300 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100 hover:border-slate-300">
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  className="text-slate-400"
                >
                  <Phone size={18} />
                </motion.span>

                <span className="text-sm font-semibold text-slate-500">
                  +91
                </span>

                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, ""));
                    if (phoneError) setPhoneError("");
                  }}
                />
              </div>

              {phoneError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-sm text-red-500"
                >
                  {phoneError}
                </motion.p>
              )}
            </div>

            <motion.button
              whileHover={{
                scale: 1.015,
                y: -2,
                boxShadow: "0px 16px 40px rgba(59,130,246,0.18)",
              }}
              whileTap={{ scale: 0.985 }}
              onClick={sendOtp}
              disabled={loading}
              className="w-full rounded-2xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Sending OTP..." : "Continue with Phone"}
            </motion.button>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === "otp" && (
          <motion.div
            key="otp-step"
            {...sectionMotion}
            className="flex flex-col gap-4"
          >
            <div className="rounded-2xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-sm text-slate-700">
              OTP sent to{" "}
              <span className="font-semibold text-slate-900">+91 {phone}</span>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Enter OTP
              </label>

              <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm transition-all duration-300 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100 hover:border-slate-300">
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="text-slate-400"
                >
                  <ShieldCheck size={18} />
                </motion.span>

                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  className="w-full bg-transparent text-center text-base tracking-[0.35em] text-slate-800 placeholder:text-slate-400 outline-none"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ""));
                    if (otpError) setOtpError("");
                  }}
                />
              </div>

              {otpError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-sm text-red-500"
                >
                  {otpError}
                </motion.p>
              )}
            </div>

            <motion.button
              whileHover={{
                scale: 1.015,
                y: -2,
                boxShadow: "0px 16px 40px rgba(34,197,94,0.22)",
              }}
              whileTap={{ scale: 0.985 }}
              onClick={verifyOtp}
              disabled={loading}
              className="w-full rounded-2xl bg-linear-to-r from-emerald-500 via-emerald-600 to-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </motion.button>

            <div className="flex items-center justify-between gap-3 text-sm">
              <motion.button
                whileHover={timer === 0 ? { x: 2 } : {}}
                whileTap={timer === 0 ? { scale: 0.98 } : {}}
                onClick={sendOtp}
                disabled={timer > 0}
                className={cn(
                  "flex items-center gap-2 font-medium transition cursor-pointer",
                  timer > 0
                    ? "cursor-not-allowed text-slate-400"
                    : "text-orange-600 hover:text-orange-700",
                )}
              >
                <RefreshCw
                  size={15}
                  className={timer > 0 ? "" : "animate-spin"}
                />
                {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
              </motion.button>

              <motion.button
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                  setOtpError("");
                }}
                className="flex items-center gap-2 font-medium text-slate-500 cursor-pointer transition hover:text-slate-700"
              >
                <ArrowLeft size={15} />
                Change Number
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 */}
        {step === "verified" && (
          <motion.div
            key="verified-step"
            {...sectionMotion}
            className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-5 py-5 text-center shadow-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
            >
              <CheckCircle2 size={24} />
            </motion.div>

            <p className="text-sm font-semibold text-emerald-700">
              Verification Successful
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Redirecting you securely to your account...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
