import React from "react";
import AdminLayout from "../Global/AdminLayout";
import { useGetUsersQuery } from "../../Features/users/usersApiSlice";
import { Box } from "@mui/material";
import Header from "../../Components/Header";
import PageLoader from "../../Components/PageLoader";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Is admin",
    flex: 1,
    renderCell: ({ row: { role } }) => {
      return role === "admin" ? "YES" : "NO";
    },
  },
];

const AdminUsers = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  console.log(users);
  return (
    <Box m={2} boxSizing="border-box">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Header
          title="List of users"
          subtitle="All users present in the system"
        />
      </Box>
      {isLoading ? (
        <PageLoader />
      ) : (
        <Box boxSizing="border-box" width="100%">
          {users?.data && (
            <DataGrid
              columns={columns}
              rows={users.data}
              slots={{ toolbar: GridToolbar }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default AdminUsers;
