import Navbar from "../Navbar";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { useState } from "react";
export default function ProfilePage() {
  const [active, setActive] = useState("Dashboard");
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 w-full bg-[#F7F9FB]">
        <LeftSection active={active} setActive={setActive} />
        <RightSection active={active} />
      </div>
    </div>
  );
}
