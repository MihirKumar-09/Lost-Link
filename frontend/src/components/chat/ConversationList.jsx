import { useAuth } from "../../Context/AuthContext";

export default function ConversationList({
  conversations,
  selectedConversation,
  setSelectedConversation,
  loading,
}) {
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Messages</h2>
        <p className="text-sm text-slate-500">Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="mb-4 text-2xl font-bold text-slate-900">Messages</h2>

      <div className="space-y-3">
        {conversations.length === 0 ? (
          <p className="text-sm text-slate-500">No conversations yet</p>
        ) : (
          conversations.map((conversation) => {
            const otherUser =
              String(conversation.claimantId?._id) === String(user?._id)
                ? conversation.reportOwnerId
                : conversation.claimantId;

            return (
              <button
                key={conversation._id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selectedConversation?._id === conversation._id
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-slate-900">
                    {otherUser?.name || "User"}
                  </h3>

                  <span className="text-xs font-semibold uppercase text-slate-500">
                    {conversation.status}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {conversation.reportId?.name || "Item"}
                </p>

                <p className="mt-2 line-clamp-1 text-sm text-slate-700">
                  {conversation.lastMessage || "No messages"}
                </p>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
