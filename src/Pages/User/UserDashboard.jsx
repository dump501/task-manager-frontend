import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import {
  useGetTasksQuery,
  useGetUserTasksQuery,
  useLazyGetUserTasksQuery,
} from "../../Features/tasks/tasksApiSlice";
import {
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Check, GraphicEq, Person, ViewList } from "@mui/icons-material";
import { tokens } from "../../theme";
import { PieChart } from "@mui/x-charts";
import PageLoader from "../../Components/PageLoader";
import { useGetUsersQuery } from "../../Features/users/usersApiSlice";
import { DataGrid } from "@mui/x-data-grid";
import { formatDateTime } from "../../helpers/uiHelpers";

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
];

const UserDashboard = () => {
  const [getTasks] = useLazyGetUserTasksQuery();
  const [tasks, settasks] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [computedData, setcomputedData] = useState({
    done: 0,
    inProgress: 0,
    assigned: 0,
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      let tasks = await getTasks();
      tasks = tasks.data;
      settasks(tasks);
      let done = 0;
      let inProgress = 0;
      let assigned = 0;
      for (const task of tasks.data) {
        switch (task.current_status) {
          case "Done":
            done++;
            break;
          case "Assigned":
            assigned++;
            break;
          case "In Progress":
            inProgress++;
            break;

          default:
            break;
        }
      }

      const data = [
        { id: 0, value: done, label: "Done" },
        { id: 1, value: inProgress, label: "in progress" },
        { id: 2, value: assigned, label: "Assigned" },
      ];
      setcomputedData((prev) => ({
        ...prev,
        done,
        assigned,
        inProgress,
        data,
      }));
    };

    setisLoading(true);
    fetchData();
    setisLoading(false);
  }, []);
  return (
    <Box boxSizing="border-box" width="100%">
      <Box m={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
      </Box>
      {isLoading ? (
        <PageLoader />
      ) : (
        <Grid container spacing={2} mt={2}>
          <Grid item sm={12} md={4}>
            <Paper sx={{ p: 3, width: "100%", backgroundColor: "#2269ff" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography variant="h4" fontWeight="bold">
                    Total Tasks
                  </Typography>
                  <Typography variant="h3" fontWeight="bold" mt={5}>
                    {tasks?.data?.length < 10
                      ? `0${tasks?.data?.length}`
                      : `${tasks?.data?.length}`}
                  </Typography>
                </Stack>
                <ViewList sx={{ width: 100, height: 100 }} />
              </Stack>
            </Paper>
          </Grid>
          <Grid item sm={12} md={4}>
            <Paper sx={{ p: 3, width: "100%", backgroundColor: "#d50000" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography variant="h4" fontWeight="bold">
                    In progress
                  </Typography>
                  <Typography variant="h3" fontWeight="bold" mt={5}>
                    {computedData.inProgress < 10
                      ? `0${computedData.inProgress}`
                      : `${computedData.inProgress}`}
                  </Typography>
                </Stack>
                <GraphicEq sx={{ width: 100, height: 100 }} />
              </Stack>
            </Paper>
          </Grid>
          <Grid item sm={12} md={4}>
            <Paper sx={{ p: 3, width: "100%", backgroundColor: "#2e7d32" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography variant="h4" fontWeight="bold">
                    Tasks Done
                  </Typography>
                  <Typography variant="h3" fontWeight="bold" mt={5}>
                    {computedData.done < 10
                      ? `0${computedData.done}`
                      : `${computedData.done}`}
                  </Typography>
                </Stack>
                <Check sx={{ width: 100, height: 100 }} />
              </Stack>
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Paper sx={{ p: 3, width: "100%" }}>
              <Typography variant="h3" mb={2}>
                Tasks donut
              </Typography>
              {computedData?.data && (
                <PieChart
                  series={[
                    {
                      data: computedData.data,
                      innerRadius: 45,
                      outerRadius: 100,
                      paddingAngle: 4,
                      cornerRadius: 0,
                      startAngle: -180,
                      endAngle: 180,
                    },
                  ]}
                  width={400}
                  height={200}
                />
              )}
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Paper sx={{ p: 3, width: "100%" }}>
              <Typography variant="h3" mb={2}>
                Latest Tasks
              </Typography>
              {tasks?.data && (
                <DataGrid columns={columns} rows={tasks.data.slice(-3)} />
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default UserDashboard;
