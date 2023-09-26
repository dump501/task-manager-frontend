import { apiSlice } from "../../Api/apiSlice";

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTaskComments: builder.query({
      query: (task_id) => `/api/v1/comment?task_id=${task_id}`,
      providesTags: ["Task"],
    }),
    storeTaskComment: builder.mutation({
      query: (form) => ({
        url: `/api/v1/comment`,
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const { useLazyGetTaskCommentsQuery, useStoreTaskCommentMutation } =
  commentsApiSlice;
