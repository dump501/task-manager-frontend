import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../../Components/Header";
import { useGetUsersQuery } from "../../Features/users/usersApiSlice";
import { useStoreTaskMutation } from "../../Features/tasks/tasksApiSlice";
import DisplayAlert from "../../Components/DisplayAlert";
import { setAlertData, setAlertOpen } from "../../Features/uiSlice";
import { useDispatch } from "react-redux";
import TaskForm from "../Global/Fragment/TaskForm";

const AdminTaskCreate = () => {
  const dispatch = useDispatch();
  const { data: users } = useGetUsersQuery();
  const [storeTask, { isLoading: isSendingForm }] = useStoreTaskMutation();
  const [form, setform] = useState({
    title: "",
    description: "",
    assigned_to: users && users?.data.length > 0 ? users.data[0].id : 0,
    deadline: "",
    tag: "",
  });

  const handleChange = (e) => {
    setform((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      console.log(form);
      let response = await storeTask(form);
      if (response?.error?.data) {
        dispatch(setAlertData({ type: "error", data: response?.error?.data }));
        dispatch(setAlertOpen(true));
      }
      if (response?.data) {
        dispatch(
          setAlertData({ type: "success", data: "Task added successfully" })
        );
        dispatch(setAlertOpen(true));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box boxSizing="border-box" width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        width="100%"
      >
        <Header title="CREATE TASK" subtitle="Add a new task in the system" />
      </Box>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <TaskForm
          form={form}
          isSendingForm={isSendingForm}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          users={users}
        />
      </Paper>
    </Box>
  );
};

export default AdminTaskCreate;
