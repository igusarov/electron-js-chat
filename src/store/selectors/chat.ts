import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";
import { ChatItem } from "../../services/chat.types";

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
