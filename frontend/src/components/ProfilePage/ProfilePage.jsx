import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import QuickActions from "./QuickActions";
import SafetyFirst from "./SafetyFirst";
import MobileBottomNav from "./MobileBottomNav";

export default function ProfilePage() {
  const location = useLocation();
  const [active, setActive] = useState(
    location.state?.activeTab || "Dashboard",
  );

  useEffect(() => {
    if (location.state?.activeTab) {
      setActive(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <div className="h-dvh overflow-hidden bg-[linear-gradient(135deg,#081225_0%,#0B1730_25%,#0D1B38_55%,#101D3A_100%)]">
      <div className="h-22 shrink-0">
        <Navbar />
      </div>

      <div className="flex h-[calc(100dvh-88px)] overflow-hidden">
        <LeftSection active={active} setActive={setActive} />

        <div className="hidden md:flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <RightSection active={active} />
          </div>

          <div className="w-[320px] shrink-0 overflow-y-auto no-scrollbar px-4 py-6">
            <QuickActions />
            <SafetyFirst />
          </div>
        </div>

        <div className="flex md:hidden flex-1 overflow-y-auto pb-27.5">
          <RightSection active={active} />
        </div>
      </div>

      <MobileBottomNav active={active} setActive={setActive} />
    </div>
  );
}
