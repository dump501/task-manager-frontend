import { apiSlice } from "../../Api/apiSlice";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/api/v1/task`,
    }),
  }),
});

export const { useGetTasksQuery } = tasksApiSlice;
