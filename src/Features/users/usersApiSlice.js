import { apiSlice } from "../../Api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/api/v1/user`,
      providesTags: ["User"],
    }),
    profile: builder.query({
      query: () => `/api/v1/user/profile`,
      providesTags: ["UserProfile"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/v1/admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    adminUpdateUser: builder.mutation({
      query: ({ id, form }) => ({
        url: `/api/v1/admin/user/${id}`,
        method: "PATCH",
        body: form,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (form) => ({
        url: `/api/v1/user`,
        method: "PATCH",
        body: form,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useProfileQuery,
  useDeleteUserMutation,
  useAdminUpdateUserMutation,
  useUpdateUserMutation,
} = usersApiSlice;
