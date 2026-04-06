import { useEffect, useState } from "react";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import { getMyConversations } from "../../services/conversationService";

export default function ConversationPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await getMyConversations();
      setConversations(data?.conversations || []);
    } catch (error) {
      console.log("Fetch conversations error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);

    if (window.innerWidth < 768) {
      setShowMobileChat(true);
    }
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
  };

  return (
    <section className="h-screen w-full overflow-hidden bg-[linear-gradient(135deg,#EEF4FF_0%,#F8FAFC_50%,#EEF2FF_100%)]">
      <div className="h-full w-full">
        <div className="flex h-full w-full">
          {/* Mobile: by default only list */}
          <div
            className={`${
              showMobileChat ? "hidden md:block" : "block"
            } h-full w-full border-r border-slate-200 bg-white md:w-90`}
          >
            <ConversationList
              conversations={conversations}
              selectedConversation={selectedConversation}
              setSelectedConversation={handleSelectConversation}
              loading={loading}
            />
          </div>

          {/* After click chat show */}
          <div
            className={`${
              showMobileChat ? "block" : "hidden md:block"
            } h-full flex-1 bg-slate-100`}
          >
            <ChatWindow
              conversation={selectedConversation}
              onBack={handleBackToList}
              refreshConversations={fetchConversations}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
