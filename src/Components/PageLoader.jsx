import { Backdrop, Box, CircularProgress } from "@mui/material";
import React from "react";

const PageLoader = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <CircularProgress size={100} color="inherit" />
      <br />
      loading . . .
    </Box>
  );
};

export default PageLoader;
