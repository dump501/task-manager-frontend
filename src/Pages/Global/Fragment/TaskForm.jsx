import {
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

const TaskForm = ({
  form,
  handleChange,
  isSendingForm,
  handleSubmit,
  users,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <InputLabel
          sx={{
            mb: 1,
            fontSize: 20,
          }}
        >
          Enter the title
        </InputLabel>
        <TextField
          fullWidth
          name="title"
          placeholder="Title of the task"
          onChange={handleChange}
          value={form.title}
        />
      </Grid>
      <Grid item sm={12}>
        <InputLabel
          sx={{
            mb: 1,
            fontSize: 20,
          }}
        >
          Enter the Description
        </InputLabel>
        <TextField
          fullWidth
          name="description"
          placeholder="Description of the task"
          multiline
          value={form.description}
          rows={4}
          onChange={handleChange}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <InputLabel
          sx={{
            mb: 1,
            fontSize: 20,
          }}
        >
          Assign to
        </InputLabel>
        {users && (
          <Select
            name="assigned_to"
            onChange={handleChange}
            fullWidth
            value={form.assigned_to}
          >
            {users.data.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </Grid>
      <Grid item sm={12} md={6}>
        <InputLabel
          sx={{
            mb: 1,
            fontSize: 20,
          }}
        >
          Deadline
        </InputLabel>
        <TextField
          fullWidth
          name="deadline"
          type="datetime-local"
          onChange={handleChange}
          value={form.deadline}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <InputLabel
          sx={{
            mb: 1,
            fontSize: 20,
          }}
        >
          Enter the tag
        </InputLabel>
        <TextField
          fullWidth
          name="tag"
          placeholder="Enter the tag"
          onChange={handleChange}
          value={form.tag}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <InputLabel
          sx={{
            mb: 1,
            fontSize: 20,
          }}
        >
          Assign to
        </InputLabel>
        <Select
          name="current_status"
          onChange={handleChange}
          fullWidth
          value={form.current_status}
        >
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </Grid>
      <Grid item sm={12}>
        <Button size="lg" variant="contained" onClick={handleSubmit}>
          {isSendingForm ? <CircularProgress /> : "Save task"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
