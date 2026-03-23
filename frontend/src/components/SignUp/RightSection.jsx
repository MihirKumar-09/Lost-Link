import { FcGoogle } from "react-icons/fc";
import PhoneAuth from "./PhoneAuth";

export default function RightSection() {
  return (
    <section className="bg-[#F8FAFC] w-full md:w-1/2">
      <div className="min-h-screen flex items-center justify-center px-6 py-10">
        {/* Card */}
        <div className="w-full max-w-md bg-white p-8 border border-gray-200 shadow-lg rounded-xl">
          {/* Heading */}
          <h3 className="text-2xl font-bold text-gray-900">
            Create your account
          </h3>

          <p className="text-gray-500 mt-2 text-sm">
            Sign up to report and track lost or found items
          </p>

          {/* Google Button */}
          <button className="mt-6 w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-100 transition cursor-pointer">
            <FcGoogle size={20} />
            <span className="text-sm font-medium text-gray-700">
              Continue with Google
            </span>
          </button>
          <div className="flex items-center my-6">
            <div className="grow h-px bg-gray-300"></div>
            <span className="mx-4 text-sm text-gray-400 font-medium">OR</span>
            <div className="grow h-px bg-gray-300"></div>
          </div>
          {/* Details like name, email, password */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter your name"
              className="border border-gray-300 w-full p-3 rounded-md "
            />
          </div>
          {/* Phone Auth */}
          <PhoneAuth />
        </div>
      </div>
    </section>
  );
}
