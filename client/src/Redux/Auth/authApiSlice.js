import {
  apiSliceWithAuth,
  apiSliceWithNoAuth,
} from "../Api/apiSlice";
import { setUserData, signOut } from "./authSlice";

export const authApiSlice = apiSliceWithAuth.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userCredentials) => ({
        url: "/users/login",
        method: "POST",
        body: { ...userCredentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
