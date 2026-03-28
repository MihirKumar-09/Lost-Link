import {
  LayoutDashboard,
  Archive,
  BadgeCheck,
  MessageSquare,
  Settings,
} from "lucide-react";

const options = [
  { name: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
  { name: "My Lost Items", label: "Lost", icon: Archive },
  { name: "My Found Items", label: "Found", icon: BadgeCheck },
  { name: "Message", label: "Chat", icon: MessageSquare },
  { name: "Settings", label: "Settings", icon: Settings },
];

export default function MobileBottomNav({ active, setActive }) {
  return (
    <section className="pb-16 md:pb-0">
      <div className="fixed bottom-0 left-0 z-50 flex justify-around w-full py-3 bg-white border-t border-gray-200 shadow-md md:hidden">
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = active === option.name;

          return (
            <div
              key={option.name}
              onClick={() => setActive(option.name)}
              className="flex flex-col items-center text-xs cursor-pointer"
            >
              <Icon
                size={20}
                className={isActive ? "text-blue-600" : "text-gray-500"}
              />
              <span className={isActive ? "text-blue-600" : "text-gray-500"}>
                {option.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
