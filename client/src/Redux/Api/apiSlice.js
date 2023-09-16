import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setUserData } from "../Auth/authSlice";

const privateQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().userData.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const privateQueryWithReauth = async (
  args,
  api,
  extraOptions
) => {
  let result = await privateQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("new session is being sent");

    const refreshResult = await privateQuery(
      "/user/refreshToken",
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      api.dispatch(setUserData({ ...refreshResult.data }));

      result = await privateQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message =
          "Your token has expired.";
      }
      return refreshResult;
    }
  }

  return result;
};

const publicQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
});

const publicQueryWithNoAuth = async (args, api, options) => {
  let result = await publicQuery(args, api, options);
  return result;
};

export const apiSliceWithAuth = createApi({
  baseQuery: privateQueryWithReauth,
  tagTypes: ["CrudList", "User"],
  endpoints: (builder) => ({}),
});

export const apiSliceWithNoAuth = createApi({
  baseQuery: publicQueryWithNoAuth,
  tagTypes: ["UserCreate", "PublicData"],
  endpoints: (builder) => ({}),
});
