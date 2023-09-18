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
    refresh: builder.mutation({
      query: () => ({
        url: "/users/refreshToken",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(setUserData(data.data.accessToken));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation } =
  authApiSlice;
