import { Box } from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";
import { drawerWidth } from "../../helpers/uiHelpers";
import { useSelector } from "react-redux";
import Topbar from "./Topbar";
import {
  DashboardOutlined,
  LogoutOutlined,
  Mail,
  PersonOutline,
  TaskOutlined,
} from "@mui/icons-material";
const items = [
  {
    title: "Dashboard",
    icon: <DashboardOutlined />,
    to: "/user/dashboard",
  },
  {
    title: "Tasks",
    icon: <TaskOutlined />,
    to: "/user/tasks",
  },
  {
    title: "Profile",
    icon: <PersonOutline />,
    to: "/user/profile",
  },
  {
    title: "Logout",
    icon: <LogoutOutlined />,
    to: "/logout",
  },
];

const UserLayout = ({ children }) => {
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

export default UserLayout;
