import { Box } from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";
import { drawerWidth } from "../../helpers/uiHelpers";
import { useSelector } from "react-redux";
import Topbar from "./Topbar";
import {
  Dashboard,
  LogoutOutlined,
  Mail,
  Person3Outlined,
  PersonOutline,
  Task,
  TaskOutlined,
} from "@mui/icons-material";

const items = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
    to: "/admin/dashboard",
  },
  {
    title: "Tasks",
    icon: <TaskOutlined />,
    to: "/admin/tasks",
  },
  {
    title: "Manage users",
    icon: <Person3Outlined />,
    to: "/admin/users",
  },
  {
    title: "Profile",
    icon: <PersonOutline />,
    to: "/admin/profile",
  },
  {
    title: "Logout",
    icon: <LogoutOutlined />,
    to: "/logout",
  },
];

const AdminLayout = ({ children }) => {
  const { isDrawerOpen } = useSelector((state) => state.ui);
  return (
    <Box display="flex">
      <Sidebar items={items} />
      <Box
        sx={{
          width: "100%",
          ml: isDrawerOpen ? "0" : `-${drawerWidth}px`,
          boxSizing: "border-box",
          p: 2,
        }}
      >
        <Topbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
