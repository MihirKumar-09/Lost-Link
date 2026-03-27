import Navbar from "../Navbar";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
export default function ProfilePage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 w-full bg-[#F7F9FB]">
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
}
