export default function LeftSection() {
  return (
    <section className="hidden md:block md:w-1/2">
      <div className="h-full min-h-screen bg-linear-to-b from-[#012662] to-[#0D172E] px-8 lg:px-16 py-12 flex flex-col justify-between">
        {/* Top Content */}
        <div>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-4xl font-bold leading-tight">
            Join the <br />
            Community <br />
            Helping Return <br />
            Lost Items
          </h1>

          <p className="text-white/80 mt-6 text-sm sm:text-base leading-relaxed">
            Lost Link connects people who lost items with those who found them,
            making recovery simple and secure.
          </p>

          <div className="mt-10 rounded-xl overflow-hidden border border-gray-600 max-w-sm">
            <img
              src="/images/SignUp/leftSection.png"
              alt="Left Section"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-gray-400 text-xs sm:text-sm mt-10">
          <ul className="flex flex-wrap gap-4">
            <li className="cursor-pointer hover:underline">Privacy Policy</li>
            <li className="cursor-pointer hover:underline">Terms of Service</li>
            <li>&copy; 2026 Lost Link</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
