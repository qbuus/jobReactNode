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
            window.localStorage.setItem("isLogged", true);
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
          if (data.data?.accessToken) {
            dispatch(setUserData(data.data.accessToken));
            window.localStorage.setItem("isLogged", true);
          } else {
            window.localStorage.setItem("isLogged", false);
          }
        } catch (error) {
          window.localStorage.setItem("isLogged", false);
          console.error(error);
        }
      },
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          window.localStorage.setItem("isLogged", false);
          dispatch(signOut());
          setTimeout(() => {
            dispatch(apiSliceWithAuth.util.resetApiState());
          }, 0);
        } catch (error) {
          console.error("sign out fail");
        }
      },
    }),
    editData: builder.mutation({
      query: (userData) => ({
        url: "/users/update",
        method: "PATCH",
        body: { ...userData },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(setMessage(data.data.message));
        } catch (error) {
          dispatch(setErrorMessage(error.error.data.message));
        }
      },
    }),
    userData: builder.mutation({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(setMessage(data?.data?.message));
        } catch (error) {
          dispatch(
            setErrorMessage(error?.error?.data?.message)
          );
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
  useEditDataMutation,
  useUserDataMutation,
} = authApiSlice;
