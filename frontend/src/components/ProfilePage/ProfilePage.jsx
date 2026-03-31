import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import Navbar from "../Navbar";
import LeftSection from "./LeftSection";
import MobileBottomNav from "./MobileBottomNav";
import RightSection from "./RightSection";
import QuickActions from "./QuickActions";
import SafetyFirst from "./SafetyFirst";

export default function ProfilePage() {
  const [active, setActive] = useState("Dashboard");
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="h-screen bg-[#F7F9FB]">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-72px)]">
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#F7F9FB]">
      <Navbar />

      <div className="flex flex-1 h-[calc(100vh-72px)] w-full">
        <LeftSection active={active} setActive={setActive} />

        <div className="flex flex-1 flex-col lg:flex-row w-full overflow-y-scroll no-scrollbar">
          <div className="flex-1 min-w-0">
            <RightSection active={active} />
          </div>

          <div className="w-full lg:w-[320px] shrink-0">
            <QuickActions />
            <SafetyFirst />
          </div>
        </div>
      </div>

      <MobileBottomNav active={active} setActive={setActive} />
    </div>
  );
}
