import axios from "../lib/axios";

export const createClaimRequest = async (payload) => {
  const { data } = await axios.post("/conversations/request", payload);
  return data;
};

export const getMyConversations = async () => {
  const { data } = await axios.get("/conversations");
  return data;
};

export const getConversationById = async (conversationId) => {
  const { data } = await axios.get(`/conversations/${conversationId}`);
  return data;
};

export const acceptConversationRequest = async (conversationId) => {
  const { data } = await axios.patch(`/conversations/${conversationId}/accept`);
  return data;
};

export const rejectConversationRequest = async (conversationId) => {
  const { data } = await axios.patch(`/conversations/${conversationId}/reject`);
  return data;
};
