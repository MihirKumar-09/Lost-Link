import Navbar from "../Navbar";
import HeroSection from "./HeroSection";
import ItemCategory from "./ItemCategory";
import FilterSection from "./FilterSection";
import RecentReport from "./RecentReport";
import Footer from "../Footer";
export default function LostPage() {
  return (
    <div style={{ background: "#F8F6F6" }}>
      <Navbar />
      <HeroSection />
      <ItemCategory />
      <FilterSection />
      <RecentReport />
      <Footer />
    </div>
  );
}
