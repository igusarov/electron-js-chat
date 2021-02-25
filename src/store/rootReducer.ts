import { combineReducers } from "redux";
import chat, { ChatState } from "./features/chat";

export type AppState = Readonly<{
  chat: ChatState;
}>;

export default combineReducers<AppState>({
  chat,
});
