import { useAuth } from "../../Context/AuthContext";
import { cn } from "../../lib/utils.js";
import {
  LayoutDashboard,
  Archive,
  BadgeCheck,
  MessageSquare,
  Bookmark,
  Settings,
  Heart,
} from "lucide-react";

const options = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "My Lost Items", icon: Archive },
  { name: "My Found Items", icon: BadgeCheck },
  { name: "Message", icon: MessageSquare },
  { name: "Saved Items", icon: Bookmark },
  { name: "Settings", icon: Settings },
];

export default function LeftSection({ active, setActive }) {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <section className="px-3 py-6 sm:px-5 md:px-8 flex flex-col justify-between">
      <div className="w-80 rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 bg-white px-2 py-4 shadow-lg rounded-xl">
          <img
            src={user?.avatar?.trim() || "/images/Profile/profile.jpeg"}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h6 className="font-semibold">{user.name}</h6>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 mt-5">
          {options.map((option) => {
            const Icon = option.icon;
            const isActive = active === option.name;

            return (
              <div
                key={option.name}
                onClick={() => setActive(option.name)}
                className={cn(
                  "flex items-center gap-3 rounded-xl p-3 cursor-pointer transition",
                  isActive
                    ? "bg-blue-50 text-blue-600 shadow-md font-medium"
                    : "bg-transparent text-black hover:bg-gray-200",
                )}
              >
                <Icon size={20} />
                <span className="text-[15px]">{option.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p style={{ fontFamily: "MadeWith" }} className="text-[26px]">
          <span className="flex items-center gap-2">
            Made With
            <Heart />
          </span>
        </p>
      </div>
    </section>
  );
}
