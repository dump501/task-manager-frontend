import React, { useState } from "react";
import AdminLayout from "../Global/AdminLayout";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Modal,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../Components/Header";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../Features/tasks/tasksApiSlice";
import PageLoader from "../../Components/PageLoader";
import { formatDateForInput, formatDateTime } from "../../helpers/uiHelpers";
import { tokens } from "../../theme";
import {
  AddOutlined,
  Delete,
  DeleteOutlined,
  Edit,
  EditOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TaskForm from "../Global/Fragment/TaskForm";
import { useGetUsersQuery } from "../../Features/users/usersApiSlice";
import { useDispatch } from "react-redux";
import { setAlertData, setAlertOpen } from "../../Features/uiSlice";

const columns = [
  {
    field: "title",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "deadline",
    headerName: "Deadline",
    flex: 1,
    renderCell: ({ row: { deadline } }) => {
      return formatDateTime(deadline);
    },
  },
  {
    field: "current_status",
    headerName: "Status",
    flex: 1,
  },
  {
    field: "created_by",
    headerName: "Created by",
    flex: 1,
    renderCell: ({ row: { createdBy } }) => {
      return createdBy.name;
    },
  },
  {
    field: "tag",
    headerName: "Tag",
    flex: 1,
  },
];

const AdminTasks = () => {
  const theme = useTheme();
  const { data: tasks, isLoading } = useGetTasksQuery();
  const [open, setopen] = useState(false);
  const [editing, setediting] = useState(false);
  const [currentTask, setcurrentTask] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: users } = useGetUsersQuery();
  const [updateTask, { isLoading: isSendingForm }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [form, setform] = useState({
    title: "",
    description: "",
    assigned_to: " ",
    deadline: "",
    tag: "",
  });

  const handleRowClick = (id) => {
    console.log(id, tasks?.data);
    let selected = tasks?.data.filter((task) => task.id === id)[0];
    setcurrentTask(selected);
    console.log(selected);
    setform({
      title: selected.title,
      description: selected?.description,
      assigned_to: selected?.assignedTo?.id ?? " ",
      deadline: selected?.deadline
        ? formatDateForInput(selected?.deadline)
        : formatDateForInput(new Date().toString()),
      tag: selected?.tag,
    });
    setopen(true);
  };

  const handleChange = (e) => {
    setform((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(form);
  };

  const handleClose = () => {
    setopen(false);
    setediting(false);
  };

  const handleSubmit = async (e) => {
    try {
      console.log(form);
      let response = await updateTask({ id: currentTask.id, form });
      if (response?.error?.data) {
        dispatch(setAlertData({ type: "error", data: response?.error?.data }));
        dispatch(setAlertOpen(true));
      }
      if (response?.data) {
        dispatch(
          setAlertData({ type: "success", data: "Task updated successfully" })
        );
        dispatch(setAlertOpen(true));
        setediting(false);
        setopen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      let response = await deleteTask(currentTask.id);
      if (response?.error?.data) {
        dispatch(setAlertData({ type: "error", data: response?.error?.data }));
        dispatch(setAlertOpen(true));
      }
      if (response?.data) {
        dispatch(
          setAlertData({ type: "success", data: "Task deleted successfully" })
        );
        dispatch(setAlertOpen(true));
        setediting(false);
        setopen(false);
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
        <Header title="MY TASKS" subtitle="Tasks assigned to me" />
      </Box>
      {isLoading ? (
        <PageLoader />
      ) : (
        <Box width="100%">
          <Stack direction="row" mb={2}>
            <Button
              variant="contained"
              startIcon={<AddOutlined />}
              onClick={() => {
                navigate("create");
              }}
            >
              Create task
            </Button>
          </Stack>
          {tasks?.data && (
            <DataGrid
              columns={columns}
              rows={tasks.data}
              slots={{ toolbar: GridToolbar }}
              onRowClick={({ id }) => handleRowClick(id)}
              sx={{
                width: "100%",
              }}
            />
          )}
        </Box>
      )}
      <Modal open={open} onClose={handleClose}>
        <Paper
          sx={{
            position: "absolute",
            overflowY: "scroll",
            top: "50%",
            left: "50%",
            width: { sm: "90%", md: "90%" },
            transform: "translate(-50%, -50%)",
            maxHeight: "90%",
            p: 2,
          }}
        >
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography variant="h3">{currentTask?.title}</Typography>
            <Box>
              <Chip label={currentTask?.tag} />
              <Chip label={currentTask?.current_status} />
            </Box>
          </Stack>
          <Typography mb={2}>{currentTask?.description}</Typography>

          <Stack>
            <Stack mb={2} direction="row" alignItems="center">
              <Avatar
                sx={{
                  mr: 2,
                }}
              />
              <Stack>
                <Typography fontWeight="bold" mr={1}>
                  Assigned to
                </Typography>
                <Typography>
                  {currentTask?.assignedTo?.name} the{" "}
                  {formatDateTime(currentTask?.assigned_date)}
                </Typography>
              </Stack>
            </Stack>
            <Stack mb={2} direction="row" alignItems="center">
              <Avatar
                sx={{
                  mr: 2,
                }}
              />
              <Stack>
                <Typography fontWeight="bold" mr={1}>
                  Assigned by
                </Typography>
                <Typography>{currentTask?.assignedBy?.name}</Typography>
              </Stack>
            </Stack>
            <Stack mb={2} direction="row" alignItems="center">
              <Avatar
                sx={{
                  mr: 2,
                }}
              />
              <Stack>
                <Typography fontWeight="bold" mr={1}>
                  Created by
                </Typography>
                <Typography>
                  {currentTask?.createdBy?.name} the{" "}
                  {formatDateTime(currentTask?.created_at)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button
              startIcon={<EditOutlined />}
              variant="contained"
              onClick={() => {
                setediting(true);
              }}
            >
              Edit
            </Button>
            <Button
              startIcon={<DeleteOutlined />}
              color="error"
              variant="contained"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Stack>

          {editing && (
            <Box>
              <TaskForm
                form={form}
                isSendingForm={isSendingForm}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                users={users}
              />
            </Box>
          )}
        </Paper>
      </Modal>
    </Box>
  );
};

export default AdminTasks;
