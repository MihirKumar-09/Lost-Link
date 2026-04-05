import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMyConversations } from "../services/conversationService";
import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";
import { useSocket } from "../Context/SocketContext";

export default function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { socket } = useSocket();

  const queryConversationId = searchParams.get("conversation");

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await getMyConversations();
      const allConversations = data.conversations || [];
      setConversations(allConversations);

      if (queryConversationId) {
        const matchedConversation = allConversations.find(
          (item) => item._id === queryConversationId,
        );

        if (matchedConversation) {
          setSelectedConversation(matchedConversation);
        } else if (allConversations.length > 0) {
          setSelectedConversation(allConversations[0]);
        }
      } else if (allConversations.length > 0 && !selectedConversation) {
        setSelectedConversation(allConversations[0]);
      }
    } catch (error) {
      console.log("Fetch conversations error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [queryConversationId]);

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
  }, [socket, queryConversationId]);

  return (
    <section className="flex h-[calc(100vh-90px)] overflow-hidden bg-slate-50">
      <div className="w-90 border-r border-slate-200 bg-white">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          loading={loading}
        />
      </div>

      <div className="flex-1 bg-slate-100">
        <ChatWindow conversation={selectedConversation} />
      </div>
    </section>
  );
}
