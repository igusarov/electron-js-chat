import { createSlice } from "@reduxjs/toolkit";

export type ChatState = null;

const initialState: ChatState = null;

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
});

export default chatSlice.reducer;
