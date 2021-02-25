export type ChatItem = {
  delta: number;
  payload: {
    type: "message" | "connect" | "update" | "disconnect" | "delete";
    user?: {
      id: number;
      user_name: string;
      display_name: string;
    };
    message?: {
      id: string;
      text: string;
    };
  };
};
export type ChatResponse = ChatItem[];
