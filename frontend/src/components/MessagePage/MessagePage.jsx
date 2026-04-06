import { useEffect, useState } from "react";
import { getMyConversations } from "../../services/conversationService";
import ConversationList from "../chat/ConversationList";
import ChatWindow from "../chat/ChatWindow";
import { useSocket } from "../../Context/SocketContext";

export default function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const { socket } = useSocket();

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await getMyConversations();
      const allConversations = data?.conversations || [];
      setConversations(allConversations);

      if (selectedConversation?._id) {
        const updatedSelectedConversation = allConversations.find(
          (item) => item._id === selectedConversation._id,
        );

        if (updatedSelectedConversation) {
          setSelectedConversation(updatedSelectedConversation);
        } else {
          setSelectedConversation(null);
          setShowMobileChat(false);
        }
      }
    } catch (error) {
      console.log("Fetch conversations error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const refreshData = async () => {
      await fetchConversations();
    };

    socket.on("claim_request_received", refreshData);
    socket.on("request_accepted", refreshData);
    socket.on("request_rejected", refreshData);
    socket.on("new_message", refreshData);

    return () => {
      socket.off("claim_request_received", refreshData);
      socket.off("request_accepted", refreshData);
      socket.off("request_rejected", refreshData);
      socket.off("new_message", refreshData);
    };
  }, [socket, selectedConversation]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);

    if (window.innerWidth < 768) {
      setShowMobileChat(true);
    }
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
    setSelectedConversation(null);
  };

  return (
    <section className="h-full w-full overflow-hidden bg-slate-50">
      <div className="flex h-full w-full overflow-hidden">
        {/* Left panel */}
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

        {/* Right panel */}
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
    </section>
  );
}
