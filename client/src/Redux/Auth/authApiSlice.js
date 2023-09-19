import { apiSliceWithAuth } from "../Api/apiSlice";
import { setUserData, signOut } from "./authSlice";
import {
  setMessage,
  setErrorMessage,
} from "../states/messageSlice";

export const authApiSlice = apiSliceWithAuth.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userCredentials) => ({
        url: "/users/login",
        method: "POST",
        body: { ...userCredentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;

          if (data.data?.accessToken) {
            dispatch(setUserData(data.data.accessToken));
          }
          dispatch(setMessage(data.data.message));
        } catch (error) {
          dispatch(setErrorMessage(error.error.data.message));
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/users/refreshToken",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          if (!data.data?.accessToken) {
            return;
          } else {
            dispatch(setUserData(data.data.accessToken));
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(signOut());
          setTimeout(() => {
            dispatch(apiSliceWithAuth.util.resetApiState());
          }, 1000);
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useSignOutMutation,
} = authApiSlice;
