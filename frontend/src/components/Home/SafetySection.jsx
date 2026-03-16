import { Download, ShieldCheck, Users } from "lucide-react";

export default function SafetySection() {
  return (
    <section
      className="px-3 sm:px-5 md:px-12 py-10 text-white"
      style={{ backgroundColor: "#0F172A" }}
    >
      <h1 className="text-4xl font-bold mb-3 text-center">
        Your Safety is Our Priority
      </h1>
      <p className="text-sm md:text-base text-gray-400 text-center">
        We've Lost Link with security features to ensure every reunion is safe.
      </p>

      <div className="flex flex-col md:flex-row  gap-4 md:gap-8 mt-10">
        <div
          className="border border-white/10 p-6 rounded-2xl shadow-xl"
          style={{ backgroundColor: "#162033" }}
        >
          <ShieldCheck size={35} color="#155DFC" />
          <h4 className="font-medium text-sm md:text-xl mb-2 mt-3">
            Identity Verification
          </h4>
          <p className="text-gray-400">
            Mandatory account verification for all users to build a trustworthy
            and accountable community.
          </p>
        </div>
        <div
          className="border border-white/10 p-6 rounded-2xl shadow-xl"
          style={{ backgroundColor: "#162033" }}
        >
          <Download size={35} color="#155DFC" />
          <h4 className="font-medium text-sm md:text-xl mb-2 mt-3">
            Secure Claiming
          </h4>
          <p className="text-gray-400">
            Finders must answers specify specific security questions about the
            item before direct contact is establish.
          </p>
        </div>
        <div
          className="border border-white/10 p-6 rounded-2xl shadow-xl"
          style={{ backgroundColor: "#162033" }}
        >
          <Users size={35} color="#155DFC" />
          <h4 className="font-medium text-sm md:text-xl mb-2 mt-3">
            Community Moderation
          </h4>
          <p className="text-gray-400">
            Active monitoring and reporting tools to keep the platform free of
            spam and fraudulent activity.
          </p>
        </div>
      </div>
    </section>
  );
}
