import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import {
  acceptConversationRequest,
  rejectConversationRequest,
} from "../../services/conversationService";
import {
  getMessages,
  markMessagesSeen,
  sendMessage,
} from "../../services/messageService";
import { useSocket } from "../../Context/SocketContext";

export default function ChatWindow({ conversation }) {
  const { user } = useAuth();
  const { socket } = useSocket();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const isOwner =
    String(conversation?.reportOwnerId?._id || conversation?.reportOwnerId) ===
    String(user?._id);

  useEffect(() => {
    if (!conversation?._id) return;

    const fetchMessages = async () => {
      try {
        const data = await getMessages(conversation._id);
        setMessages(data.messages || []);
        await markMessagesSeen(conversation._id);
      } catch (error) {
        console.log("Fetch messages error:", error);
      }
    };

    fetchMessages();
  }, [conversation]);

  useEffect(() => {
    if (!socket || !conversation?._id) return;

    const handleNewMessage = (incomingMessage) => {
      if (incomingMessage.conversationId === conversation._id) {
        setMessages((prev) => [...prev, incomingMessage]);
      }
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [socket, conversation]);

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center text-slate-500">
        Select a conversation
      </div>
    );
  }

  const handleAccept = async () => {
    try {
      setLoading(true);
      await acceptConversationRequest(conversation._id);
      window.location.reload();
    } catch (error) {
      console.log("Accept error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      await rejectConversationRequest(conversation._id);
      window.location.reload();
    } catch (error) {
      console.log("Reject error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!text.trim()) return;

    try {
      const data = await sendMessage(conversation._id, text);
      setMessages((prev) => [...prev, data.newMessage]);
      setText("");
    } catch (error) {
      console.log("Send message error:", error);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <h2 className="text-xl font-bold text-slate-900">
          {conversation.reportId?.name || "Chat"}
        </h2>
        <p className="text-sm text-slate-500">Status: {conversation.status}</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <p className="text-sm text-slate-500">No messages yet</p>
        ) : (
          messages.map((message) => {
            const isOwn =
              String(message.senderId?._id || message.senderId) ===
              String(user?._id);

            return (
              <div
                key={message._id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    isOwn
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-800"
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`mt-1 text-[11px] ${
                      isOwn ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {message.messageType === "initial_proof"
                      ? "Proof Message"
                      : "Message"}
                  </p>
                </div>
              </div>
            );
          })
        )}

        {conversation.status === "pending" && isOwner && (
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
            <h4 className="font-bold text-slate-900">Pending Request</h4>
            <p className="mt-1 text-sm text-slate-600">
              Accept to unlock full conversation or reject to close it.
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleAccept}
                disabled={loading}
                className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white"
              >
                Accept
              </button>

              <button
                onClick={handleReject}
                disabled={loading}
                className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white"
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {conversation.status === "pending" && !isOwner && (
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
            Waiting for report owner response
          </div>
        )}

        {conversation.status === "rejected" && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            This request was rejected. You cannot send more messages here.
          </div>
        )}
      </div>

      {conversation.status === "accepted" && (
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="flex gap-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleSendMessage}
              className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
