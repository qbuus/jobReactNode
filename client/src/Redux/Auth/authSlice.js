import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "userData",
  initialState: { token: null },
  reducers: {
    setUserData: (state, action) => {
      const accessToken = action.payload;
      state.token = accessToken;
    },
    signOut: (state, action) => {
      state.token = null;
    },
  },
});
export const { setUserData, signOut } = AuthSlice.actions;
export default AuthSlice.reducer;
export const currentToken = (state) => state.userData.token;
