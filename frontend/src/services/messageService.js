import axios from "../lib/axios";

export const getMessages = async (conversationId) => {
  const { data } = await axios.get(`/messages/${conversationId}`);
  return data;
};

export const sendMessage = async (conversationId, text) => {
  const { data } = await axios.post(`/messages/${conversationId}`, { text });
  return data;
};

export const markMessagesSeen = async (conversationId) => {
  const { data } = await axios.patch(`/messages/${conversationId}/seen`);
  return data;
};
