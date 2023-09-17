import React, { useState } from "react";
import AdminLayout from "../Global/AdminLayout";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Divider,
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
import Detail from "../../Components/Detail";
import {
  useLazyGetTaskCommentsQuery,
  useStoreTaskCommentMutation,
} from "../../Features/comments/commentsApiSlice";
import CommentForm from "../Global/Fragment/CommentForm";
import CommentLine from "../../Components/CommentLine";

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
    renderCell: ({ row: { current_status } }) => {
      switch (current_status) {
        case "Done":
          return <Chip label="Done" color="success" />;
        case "Assigned":
          return <Chip label="Assigned" color="error" />;
        case "In Progress":
          return <Chip label="In Progress" color="warning" />;
        default:
          break;
      }
    },
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
  const { data: tasks, isLoading } = useGetTasksQuery();
  const [open, setopen] = useState(false);
  const [editing, setediting] = useState(false);
  const [currentTask, setcurrentTask] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: users } = useGetUsersQuery();
  const [updateTask, { isLoading: isSendingForm }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [commenting, setcommenting] = useState(false);
  const [currentComments, setcurrentComments] = useState(null);
  const [getTaskComments] = useLazyGetTaskCommentsQuery();
  const [storeTaskComment, { isLoading: isSendingComment }] =
    useStoreTaskCommentMutation();
  const [form, setform] = useState({
    title: "",
    description: "",
    assigned_to: " ",
    deadline: "",
    tag: "",
  });

  const handleRowClick = async (id) => {
    let selected = tasks?.data.filter((task) => task.id === id)[0];
    setcurrentTask(selected);
    setform({
      title: selected.title,
      description: selected?.description,
      assigned_to: selected?.assignedTo?.id ?? " ",
      deadline: selected?.deadline
        ? formatDateForInput(selected?.deadline)
        : formatDateForInput(new Date().toString()),
      tag: selected?.tag,
      current_status: selected.current_status,
    });
    setopen(true);
    let response = await getTaskComments(selected.id);
    setcurrentComments(response.data.data);
  };

  const handleChange = (e) => {
    setform((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClose = () => {
    setopen(false);
    setediting(false);
  };

  const handleSubmit = async (e) => {
    try {
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

  const handleCommentSave = async (e) => {
    try {
      let response = await storeTaskComment({
        task_id: currentTask?.id,
        content: form.content,
      });
      if (response?.error?.data) {
        dispatch(setAlertData({ type: "error", data: response?.error?.data }));
        dispatch(setAlertOpen(true));
      }
      if (response?.data) {
        dispatch(
          setAlertData({ type: "success", data: "Comment Saved successfully" })
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
            overflowY: "auto",
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
            <Detail
              title="Assigned to"
              subtitle={`${currentTask?.assignedTo?.name} the ${formatDateTime(
                currentTask?.assigned_date
              )}`}
            />
            <Detail
              title="Assigned by"
              subtitle={currentTask?.assignedBy?.name}
            />
            <Detail
              title="Created by"
              subtitle={`${currentTask?.createdBy?.name} the ${formatDateTime(
                currentTask?.created_at
              )}`}
            />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" spacing={2} mb={2}>
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

          <Divider />

          {editing && (
            <Box my={2}>
              <Typography variant="h3" mb={2}>
                Editing task
              </Typography>
              <TaskForm
                form={form}
                isSendingForm={isSendingForm}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                users={users}
              />
            </Box>
          )}
          <Divider />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Typography variant="h3" mb={2}>
              Comments
            </Typography>
            {!commenting && (
              <Button onClick={() => setcommenting(true)} variant="contained">
                Comment
              </Button>
            )}
          </Stack>
          {commenting && (
            <CommentForm
              form={form}
              handleChange={handleChange}
              handleCommentSave={handleCommentSave}
            />
          )}
          {!currentComments && <CircularProgress />}
          {currentComments && (
            <Box>
              {currentComments.map((comment) => (
                <CommentLine key={comment.id} comment={comment} />
              ))}
            </Box>
          )}
        </Paper>
      </Modal>
    </Box>
  );
};

export default AdminTasks;
