import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";
import { ChatItem } from "../../services/chat.types";
import { Message } from "./chat.types";

export const getRootState = (state: AppState) => state.chat;

export const getItems = createSelector(getRootState, (chatState): ChatItem[] =>
  chatState.data.filter((item) => {
    return item.delta <= chatState.currentDelta;
  })
);

export const getNextDelta = createSelector(getRootState, (chatState):
  | number
  | null => {
  if (chatState.data.length === 0) {
    return null;
  }
  if (chatState.currentDelta === 0) {
    return chatState.data[0].delta;
  }
  const index = chatState.data.findIndex(
    (item) => item.delta === chatState.currentDelta
  );
  return chatState.data.length - 2 > index
    ? chatState.data[index + 1].delta
    : null;
});

export const getMessages = createSelector(getItems, (items): Message[] =>
  items.map((item) => ({
    id: item.delta,
    isMessage: item.payload.type === "message",
    userName: item.payload?.user?.display_name || "",
    text: item.payload?.message?.text || item.payload.type,
  }))
);
