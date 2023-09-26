import React from "react";
import AdminLayout from "../Global/AdminLayout";
import {
  useAdminUpdateUserMutation,
  useGetUsersQuery,
} from "../../Features/users/usersApiSlice";
import { Avatar, Box, Button, Chip } from "@mui/material";
import Header from "../../Components/Header";
import PageLoader from "../../Components/PageLoader";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setAlertData, setAlertOpen } from "../../Features/uiSlice";

const AdminUsers = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [adminUpdateUser, { isLoading: isSendingForm }] =
    useAdminUpdateUserMutation();
  const dispatch = useDispatch();

  const handleUpdate = async (id, role_id) => {
    try {
      let response = await adminUpdateUser({ id, form: { role_id } });
      if (response?.error?.data) {
        dispatch(setAlertData({ type: "error", data: response?.error?.data }));
        dispatch(setAlertOpen(true));
      }
      if (response?.data) {
        dispatch(
          setAlertData({ type: "success", data: "User updated successfully" })
        );
        dispatch(setAlertOpen(true));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const columns = [
    {
      field: "profile",
      headerName: "Avatar",
      renderCell: () => <Avatar />,
    },
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
      field: "is_active",
      headerName: "Active",
      flex: 1,
      renderCell: ({ row: { is_active } }) => {
        return parseInt(is_active) === 1 ? (
          <Chip color="success" label="Active" />
        ) : (
          <Chip label="Unactive" color="error" />
        );
      },
    },
    {
      field: "role",
      headerName: "Is admin",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return role === "admin" ? (
          <Chip color="success" label="YES" />
        ) : (
          <Chip color="error" label="NO" />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row: { role, id } }) => {
        return role === "admin" ? (
          <Button
            startIcon={<ArrowDropDownOutlined />}
            color="error"
            variant="contained"
            onClick={() => handleUpdate(id, 2)}
          >
            Demote
          </Button>
        ) : (
          <Button
            startIcon={<ArrowDropUpOutlined />}
            color="success"
            variant="contained"
            onClick={() => handleUpdate(id, 1)}
          >
            Promote
          </Button>
        );
      },
    },
  ];
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
