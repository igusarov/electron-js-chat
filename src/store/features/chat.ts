import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chat from "../../services/chat";
import { ChatResponse } from "../../services/chat.types";

export type ChatState = {
  isLoaded: boolean;
  currentDelta: number;
  data: ChatResponse;
};

const initialState: ChatState = {
  isLoaded: false,
  currentDelta: 0,
  data: [],
};

const fetchChat = createAsyncThunk("chat/getChat", async () => {
  const result = await chat.getChat();
  return result;
});

const setCurrentDelta = createAction<number>("chat/currentDelta");

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChat.fulfilled, (state, { payload: data }) => {
        return {
          ...state,
          isLoaded: true,
          data,
        };
      })
      .addCase(setCurrentDelta, (state, { payload: currentDelta }) => {
        return {
          ...state,
          currentDelta,
        };
      });
  },
});

export { fetchChat, setCurrentDelta };
export default chatSlice.reducer;
