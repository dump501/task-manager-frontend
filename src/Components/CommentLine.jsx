import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { formatDateTime } from "../helpers/uiHelpers";

const CommentLine = ({ comment }) => {
  return (
    <Stack ml={2} my={3} direction="row" alignItems="center">
      <Avatar
        sx={{
          mr: 2,
        }}
      />
      <Stack>
        <Typography fontWeight="bold" mr={1}>
          {comment.name}
        </Typography>
        <Typography>{comment.content}</Typography>
        <Typography fontSize={13}>
          the {formatDateTime(comment.created_at)}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CommentLine;
