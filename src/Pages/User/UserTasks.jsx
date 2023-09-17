import React, { useState } from "react";
import Header from "../../Components/Header";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PageLoader from "../../Components/PageLoader";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  useGetUserTasksQuery,
  useUpdateTaskMutation,
} from "../../Features/tasks/tasksApiSlice";
import { formatDateTime } from "../../helpers/uiHelpers";
import { Close, SaveOutlined } from "@mui/icons-material";
import { setAlertData, setAlertOpen } from "../../Features/uiSlice";
import { useDispatch } from "react-redux";
import {
  useLazyGetTaskCommentsQuery,
  useStoreTaskCommentMutation,
} from "../../Features/comments/commentsApiSlice";
import CommentLine from "../../Components/CommentLine";
import Detail from "../../Components/Detail";
import CommentForm from "../Global/Fragment/CommentForm";

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

const UserTasks = () => {
  const dispatch = useDispatch();
  const [currentTask, setcurrentTask] = useState(null);
  const [currentComments, setcurrentComments] = useState(null);
  const [open, setopen] = useState(false);
  const [commenting, setcommenting] = useState(false);
  const [form, setform] = useState({ current_status: "Assigned", content: "" });
  const { data: tasks, isLoading } = useGetUserTasksQuery();
  const [updateTask, { isLoading: isSendingForm }] = useUpdateTaskMutation();
  const [getTaskComments] = useLazyGetTaskCommentsQuery();
  const [storeTaskComment, { isLoading: isSendingComment }] =
    useStoreTaskCommentMutation();

  const handleClose = () => {
    setopen(false);
  };

  const handleRowClick = async (id) => {
    let selected = tasks?.data.filter((task) => task.id === id)[0];
    setcurrentTask(selected);
    setform({ current_status: selected.current_status });
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

  const handleUpdate = async (e) => {
    try {
      let response = await updateTask({
        id: currentTask.id,
        form: { current_status: form.current_status },
      });
      if (response?.error?.data) {
        dispatch(setAlertData({ type: "error", data: response?.error?.data }));
        dispatch(setAlertOpen(true));
      }
      if (response?.data) {
        dispatch(
          setAlertData({ type: "success", data: "Task updated successfully" })
        );
        dispatch(setAlertOpen(true));
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
      {currentTask && (
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
                subtitle={`${
                  currentTask?.assignedTo?.name
                } the ${formatDateTime(currentTask?.assigned_date)}`}
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
              <Divider />
              <Stack direction="row" my={2} alignItems="center" spacing={2}>
                <Typography variant="h4">Update Status :</Typography>
                <Select
                  onChange={handleChange}
                  name="current_status"
                  value={form.current_status}
                >
                  <MenuItem value="Assigned">Assigned</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
                <Button
                  onClick={handleUpdate}
                  startIcon={<SaveOutlined />}
                  variant="contained"
                >
                  Save
                </Button>
              </Stack>
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
                  <Button
                    onClick={() => setcommenting(true)}
                    variant="contained"
                  >
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
              <Stack direction="row" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Close />}
                  onClick={() => setopen(false)}
                >
                  Close
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Modal>
      )}
    </Box>
  );
};

export default UserTasks;
