import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import HttpStatus from "../helpers/HttpStatus.json";
import { logout, setCredentials } from "../Features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("result", result);

  if (
    result?.error?.status === HttpStatus.forbidden ||
    result?.error?.status === HttpStatus.unauthorized
  ) {
    console.log("sending refresh token");
    // send refresh token
    const refreshResult = await baseQuery("/refresh-token", api, extraOptions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(
        setCredentials({
          accessToken: refreshResult.data.data.accessToken,
          user,
        })
      );
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Task", "User", "UserProfile", "UserTask"],
  endpoints: (builder) => ({}),
});
