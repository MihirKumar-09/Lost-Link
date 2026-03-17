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
  const categories = [
    { name: "Phones", icon: Smartphone },
    { name: "Tablets", icon: TabletSmartphone },
    { name: "Wallets", icon: Wallet2 },
    { name: "Keys", icon: KeySquare },
    { name: "Jewelries", icon: Gem },
    { name: "Laptops", icon: Laptop },
    { name: "Briefcase", icon: BriefcaseBusiness },
    { name: "Electronics", icon: Cable },
    { name: "Accessories", icon: Glasses },
    { name: "Clothing", icon: Shirt },
    { name: "Watches", icon: Watch },
    { name: "Documents", icon: NotepadText },
    { name: "Pets", icon: Panda },
    { name: "Others", icon: LayoutGrid },
  ];

  return (
    <section className="px-3 sm:px-5 md:px-10 py-10">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-4 min-w-max px-3">
          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex flex-col gap-1 items-center min-w-30 shrink-0 bg-white px-6 py-5 rounded-2xl border border-gray-200 group hover:border-[#EC5B13] cursor-pointer"
              >
                <span className="p-2 rounded-xl bg-[#FDEEE7] group-hover:bg-[#EC5B13] transition">
                  <Icon className="text-[#EC5B13] group-hover:text-white transition" />
                </span>
                <span className="text-sm md:text-base font-medium">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
