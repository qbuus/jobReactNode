import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: null,
    errorMessage: null,
  },
  reducers: {
    setMessage: (state, action) => {
      const message = action.payload;
      state.message = message;
    },
    setErrorMessage: (state, action) => {
      const errorMessage = action.payload;
      state.errorMessage = errorMessage;
    },
  },
});

export const { setMessage, setErrorMessage } =
  messageSlice.actions;
export default messageSlice.reducer;
