import { apiSlice } from "../../Api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/api/v1/user`,
      providesTags: ["User"],
    }),
    profile: builder.query({
      query: () => `/api/v1/user/profile`,
    }),
  }),
});

export const { useGetUsersQuery, useProfileQuery } = usersApiSlice;
