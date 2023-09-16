import { apiSlice } from "../../Api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/api/v1/user`,
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
