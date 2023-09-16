import {
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  apiSliceWithAuth,
  apiSliceWithNoAuth,
} from "./Api/apiSlice";
import AuthReducer from "./Auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    [apiSliceWithAuth.reducerPath]: apiSliceWithAuth.reducer,
    userData: AuthReducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSliceWithAuth.middleware),
});

export default store;
setupListeners(store.dispatch);
