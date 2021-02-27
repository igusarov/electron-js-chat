import { assocPath, reduce, map, compose } from "lodash/fp";
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";
import { ChatItem } from "../../services/chat.types";
import { Message } from "./chat.types";

const reduceByUpdateDelete = reduce<ChatItem, ChatItem[]>((acc, chatItem) => {
  if (chatItem.payload.type === "update") {
    if (chatItem.payload.user) {
      return acc.map((item) => {
        if (
          item?.payload?.user &&
          item.payload.user.id === chatItem?.payload?.user?.id
        ) {
          return assocPath("payload.user", chatItem.payload.user)(item);
        }
        return item;
      });
    }
    if (chatItem.payload.message) {
      return acc.map((item) => {
        if (
          item?.payload?.message &&
          item?.payload.message.id === chatItem?.payload?.message?.id
        ) {
          return assocPath("payload.message", chatItem.payload.message)(item);
        }
        return item;
      });
    }
  }
  if (chatItem.payload.type === "delete") {
    return acc.map((item) => {
      if (
        item?.payload?.message &&
        item?.payload.message.id === chatItem?.payload?.message?.id
      ) {
        return assocPath("payload.type", "delete")(item);
      }
      return item;
    });
  }
  return [...acc, chatItem];
}, []);

const mapChatItemToMessage = map<ChatItem, Message>((item) => ({
  id: item.delta,
  isMessage: item.payload.type === "message",
  userName: item.payload?.user?.display_name || "",
  text:
    (item.payload.type === "message" && item.payload?.message?.text) ||
    item.payload.type,
}));

export const getRootState = (state: AppState) => state.chat;

export const getCurrentItems = createSelector(
  getRootState,
  (chatState): ChatItem[] =>
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
  return chatState.data.length - 1 > index
    ? chatState.data[index + 1].delta
    : null;
});

export const getMessages = createSelector(
  getCurrentItems,
  compose(mapChatItemToMessage, reduceByUpdateDelete)
);
