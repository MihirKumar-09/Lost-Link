import { ShieldCheck, SquarePen } from "lucide-react";

export default function SafetyFirst() {
  return (
    <section className="py-6 px-4 md:px-6 mb-12 ">
      <div className="border shadow-xl bg-[#425167] text-white rounded-lg px-5 py-4">
        <h6 className="flex items-center gap-2 text-[18px] md:text-[19px] font-medium">
          <span>
            <ShieldCheck />
          </span>
          Safety First
        </h6>
        <p className="mt-3 text-gray-300 font-light">
          Always meet in public places for item handovers. Consider using police
          station safe zones.
        </p>
        <p className="mt-3 flex items-center gap-2 text-gray-300 cursor-pointer border-b border-transparent hover:border-gray-300 w-fit">
          Read safety guidelines
          <SquarePen size={18} />
        </p>
      </div>
    </section>
  );
}
