import { Box } from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";
import { drawerWidth } from "../../helpers/uiHelpers";
import { useSelector } from "react-redux";
import Topbar from "./Topbar";
import { Mail } from "@mui/icons-material";
const items = [
  {
    title: "Dashboard",
    icon: <Mail />,
    to: "/user/dashboard",
  },
  {
    title: "Tasks",
    icon: <Mail />,
    to: "/user/tasks",
  },
  {
    title: "Profile",
    icon: <Mail />,
    to: "/user/profile",
  },
];

const UserLayout = () => {
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
