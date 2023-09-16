import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

const Detail = ({ title, subtitle }) => {
  return (
    <Stack mb={2} direction="row" alignItems="center">
      <Avatar
        sx={{
          mr: 2,
        }}
      />
      <Stack>
        <Typography fontWeight="bold" mr={1}>
          {title}
        </Typography>
        <Typography>{subtitle}</Typography>
      </Stack>
    </Stack>
  );
};

export default Detail;
