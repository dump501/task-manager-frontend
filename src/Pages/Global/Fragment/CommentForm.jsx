import { Box, Button, TextField } from "@mui/material";
import React from "react";

const CommentForm = ({ form, handleChange, handleCommentSave }) => {
  return (
    <Box>
      <TextField
        fullWidth
        multiline
        rows={3}
        name="content"
        value={form.content}
        placeholder="Enter your comment"
        onChange={handleChange}
      />
      <Button
        sx={{
          mt: 2,
        }}
        variant="contained"
        onClick={handleCommentSave}
      >
        save Comment
      </Button>
    </Box>
  );
};

export default CommentForm;
