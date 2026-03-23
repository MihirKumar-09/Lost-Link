import { useState } from "react";

export default function PhoneAuth() {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // 👉 Fake API calls (replace later)
  const sendOtp = async () => {
    if (!phone || phone.length < 10) {
      alert("Enter valid phone number");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1000);
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Invalid OTP");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("verified");
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      {/* STEP 1: PHONE */}
      {step === "phone" && (
        <div className="flex flex-col gap-4">
          <input
            type="tel"
            placeholder="+91 123-456-7890"
            className="border border-gray-300 p-3 rounded-md outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={sendOtp}
            className="bg-blue-600 text-white py-2 rounded-md"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      )}

      {/* STEP 2: OTP */}
      {step === "otp" && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">OTP sent to {phone}</p>

          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            className="border p-3 rounded-md outline-none text-center tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={verifyOtp}
            className="bg-green-600 text-white py-2 rounded-md"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            onClick={() => setStep("phone")}
            className="text-sm text-blue-500"
          >
            Change Number
          </button>
        </div>
      )}

      {/* STEP 3: VERIFIED */}
      {step === "verified" && (
        <div className="text-center">
          <h3 className="text-green-600 font-semibold">✅ Phone Verified</h3>
        </div>
      )}
    </div>
  );
}
