import DashboardSection from "./DashboardSection";
import MyLostItemSection from "./MyLostItemsSection";
import MyFoundItemSection from "./MyFoundItemsSection";
import MessageSection from "./MessageSection";
import SavedItemSection from "./SavedItemSection";
import SettingSection from "./SettingSection";
export default function RightSection({ active }) {
  const renderSection = () => {
    switch (active) {
      case "Dashboard":
        return <DashboardSection />;
      case "My Lost Items":
        return <MyLostItemSection />;
      case "My Found Items":
        return <MyFoundItemSection />;
      case "Message":
        return <MessageSection />;
      case "Saved Items":
        return <SavedItemSection />;
      case "Settings":
        return <SettingSection />;
      default:
        return <DashboardSection />;
    }
  };
  return (
    <section className="px-3 py-6 sm:px-5 md:px-12 w-full">
      {renderSection()}
    </section>
  );
}
