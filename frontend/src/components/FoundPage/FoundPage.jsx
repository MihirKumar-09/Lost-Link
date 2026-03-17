import Navbar from "../Navbar";
import FilterSection from "./FilterSection";
import HeroSection from "./HeroSection";
import RecentFound from "./RecentFound";
import Footer from "../Footer";
export default function FoundPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FilterSection />
      <RecentFound />
      <Footer />
    </>
  );
}
