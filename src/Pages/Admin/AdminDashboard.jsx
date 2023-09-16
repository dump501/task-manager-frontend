import React from "react";
import Header from "../../Components/Header";
import { Box } from "@mui/material";
import AdminLayout from "../Global/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Box m={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
