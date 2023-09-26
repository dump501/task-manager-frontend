import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { colorModeContext, tokens } from "../../theme";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Menu,
  NotificationsOutlined,
  PersonOutlineOutlined,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../Features/uiSlice";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(colorModeContext);
  const dispatch = useDispatch();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      pl={0}
      alignItems="center"
      width="100%"
    >
      <Box display="flex">
        <IconButton onClick={() => dispatch(toggleDrawer())}>
          <Menu />
        </IconButton>
        <Box
          display="flex"
          backgroundColor={
            theme.palette.mode === "dark"
              ? colors.primary[400]
              : colors.primary[800]
          }
          borderRadius="3px"
        >
          <InputBase sx={{ flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <Search />
          </IconButton>
        </Box>
      </Box>

      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        <IconButton>
          <PersonOutlineOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
