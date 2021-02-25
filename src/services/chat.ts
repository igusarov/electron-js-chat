import { ChatResponse } from "./chat.types";

const getChat = async (): Promise<ChatResponse> => {
  const response = await fetch(`${process.env.REACT_APP_API}/chat`);
  return ((await response.json()) as unknown) as ChatResponse;
};

export default {
  getChat,
};
