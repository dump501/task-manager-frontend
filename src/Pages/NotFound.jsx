import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../Features/auth/authSlice";

const NotFound = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography fontSize={100} fontWeight="bold">
        404
      </Typography>
      <Typography fontSize={80}>Not found</Typography>
      <Button
        LinkComponent={Link}
        to={user.role_id == 1 ? "/admin/dashboard" : "/user/dashboard"}
      >
        Go back to my dashboard
      </Button>
    </Box>
  );
};

export default NotFound;
