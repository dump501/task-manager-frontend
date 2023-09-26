import { apiSlice } from "../../Api/apiSlice";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/api/v1/task`,
      providesTags: ["Task"],
    }),
    storeTask: builder.mutation({
      query: (form) => ({
        url: `/api/v1/task`,
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, form }) => ({
        url: `/api/v1/task/${id}`,
        method: "PATCH",
        body: form,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/api/v1/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    getUserTasks: builder.query({
      query: () => `/api/v1/user/task`,
      providesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useStoreTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetUserTasksQuery,
  useLazyGetTasksQuery,
  useLazyGetUserTasksQuery,
} = tasksApiSlice;
