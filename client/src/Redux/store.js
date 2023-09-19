import {
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { apiSliceWithAuth } from "./Api/apiSlice";
import AuthReducer from "./Auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import messageSlice from "./states/messageSlice";

const store = configureStore({
  reducer: {
    [apiSliceWithAuth.reducerPath]: apiSliceWithAuth.reducer,
    userData: AuthReducer,
    messageData: messageSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSliceWithAuth.middleware),
});

export default store;
setupListeners(store.dispatch);
