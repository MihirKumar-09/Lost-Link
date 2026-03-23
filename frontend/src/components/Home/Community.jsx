import { Link } from "react-router-dom";
export default function Community() {
  return (
    <section className="px-3 sm:px-5 md:px-12 py-10 text-center bg-white flex justify-center items-center">
      <div
        style={{
          background:
            "linear-gradient(135deg, #00b4ff 0%, #0095ff 25%, #006aff 60%, #0047cc 100%)",
        }}
        className="w-full md:w-3xl px-10 py-7 rounded-4xl"
      >
        <h1 className="text-4xl font-semibold mt-5 text-white">
          Join the Community Helping Return Lost Item
        </h1>

        <p className="mt-3 text-gray-300 mb-4">
          Every second someone finds something. Make sure you're connected to
          the network that brings it home
        </p>

        <Link to="/signIn">
          <button className="border border-white/15 bg-white px-6 py-3 rounded-2xl mt-5 cursor-pointer font-semibold">
            Get Started Now
          </button>
        </Link>
      </div>
    </section>
  );
}
