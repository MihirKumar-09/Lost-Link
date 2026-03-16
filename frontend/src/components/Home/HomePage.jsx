import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import RecentReport from "./RecentReport";
import HowWork from "./HowWork";
import SafetySection from "./SafetySection";
import SuccessStories from "./SuccessStories";
import Community from "./Community";
import Footer from "../Footer.jsx";
export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <RecentReport />
      <HowWork />
      <SafetySection />
      <SuccessStories />
      <Community />
      <Footer />
    </>
  );
}
