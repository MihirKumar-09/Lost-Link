import {
  BriefcaseBusiness,
  Cable,
  Gem,
  Glasses,
  KeySquare,
  Laptop,
  LayoutGrid,
  NotepadText,
  Panda,
  Shirt,
  Smartphone,
  TabletSmartphone,
  Wallet2,
  Watch,
} from "lucide-react";

export default function ItemCategory() {
  return (
    <section className="px-3 sm:px-5 md:px-10 py-10 ">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-4 min-w-max px-3">
          <div className="flex flex-col gap-1 items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <Smartphone className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">Phones</span>
          </div>
          <div className="flex flex-col gap-1 items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <TabletSmartphone className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">Tablets</span>
          </div>
          <div className="flex flex-col gap-1  items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <Wallet2 className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">Wallets</span>
          </div>
          <div className="flex flex-col gap-1 items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <KeySquare className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">Keys</span>
          </div>
          <div className="flex flex-col gap-1 items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <Gem className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">Jewelries</span>
          </div>
          <div className="flex flex-col gap-1 items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <Laptop className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">Laptops</span>
          </div>
          <div className="flex flex-col gap-1 items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <BriefcaseBusiness className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">Briefcase</span>
          </div>
          <div className="flex flex-col gap-1 items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <Cable className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">
              Electronics
            </span>
          </div>
          <div className="flex flex-col gap-1 items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <Glasses className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">
              Accessories
            </span>
          </div>
          <div className="flex flex-col gap-1 items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <Shirt className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">Clothing</span>
          </div>
          <div className="flex flex-col gap-1 items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <Watch className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">Watches</span>
          </div>
          <div className="flex flex-col gap-1  items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <NotepadText className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">Documents</span>
          </div>
          <div className="flex flex-col gap-1  items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <Panda className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">Pets</span>
          </div>
          <div className="flex flex-col gap-1 items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13]">
            <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
              <LayoutGrid className="text-[#EC5B13] group-hover:text-white transition" />
            </span>
            <span className="text-sm md:text-base font-medium">Others</span>
          </div>
        </div>
      </div>
    </section>
  );
}
