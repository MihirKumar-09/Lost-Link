import Navbar from "../Navbar";
import LeftSection from "./LeftSection";
import MobileBottomNav from "./MobileBottomNav";
import RightSection from "./RightSection";
import { useState } from "react";
export default function ProfilePage() {
  const [active, setActive] = useState("Dashboard");
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 w-full bg-[#F7F9FB]">
        <LeftSection active={active} setActive={setActive} />
        <RightSection active={active} />
        <MobileBottomNav active={active} setActive={setActive} />
      </div>
    </div>
  );
}
