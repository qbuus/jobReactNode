import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/authSlice";

const store = configureStore({
  reducer: {
    userData: AuthReducer,
  },
});

export default store;
