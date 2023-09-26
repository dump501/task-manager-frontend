import React, { useState } from "react";
import {
  useProfileQuery,
  useUpdateUserMutation,
} from "../Features/users/usersApiSlice";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../Components/Header";
import { formatDateTime } from "../helpers/uiHelpers";
import { useDispatch } from "react-redux";
import { setAlertData, setAlertOpen } from "../Features/uiSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { data: userData, isLoading } = useProfileQuery();
  const [updateUser, { isLoading: isSendingForm }] = useUpdateUserMutation();
  const [editing, setediting] = useState(false);
  const [form, setform] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setform({
      [e.target.name]: e.target.value,
    });
  };

  const enableEditing = () => {
    setform({
      name: userData?.data.name,
    });
    setediting(true);
  };

  const handleSubmit = async (e) => {
    try {
      let response = await updateUser(form);
      if (response?.error?.data) {
        dispatch(setAlertData({ type: "error", data: response?.error?.data }));
        dispatch(setAlertOpen(true));
      }
      if (response?.data) {
        dispatch(
          setAlertData({ type: "success", data: "Task added successfully" })
        );
        dispatch(setAlertOpen(true));
        setediting(false);
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
        <Header title="MY PROFILE" subtitle="Informations concerning me" />
      </Box>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" mb={2}>
              Personnal informations
            </Typography>
            <Divider />
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {userData?.data && (
                  <Stack mt={2} alignItems="center">
                    <Avatar sx={{ width: 150, height: 150 }} />
                    <Typography fontSize={20}>{userData.data.name}</Typography>
                    <Typography fontSize={20}>{userData.data.email}</Typography>
                    <Typography fontSize={20}>
                      Role : {userData.data.role}
                    </Typography>
                    <Typography fontSize={20} mb={2}>
                      Member since {formatDateTime(userData.data.created_at)}
                    </Typography>
                    <Button onClick={enableEditing} variant="contained">
                      Edit my informations
                    </Button>
                  </Stack>
                )}
              </>
            )}
          </Paper>
        </Grid>
        {editing && (
          <Grid item sm={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h4" mb={2}>
                Edit my personnal informations
              </Typography>
              <Divider />
              <InputLabel
                sx={{
                  mb: 1,
                  fontSize: 20,
                }}
              >
                Enter Your name
              </InputLabel>
              <TextField
                fullWidth
                onChange={handleChange}
                value={form.name}
                sx={{ mb: 2 }}
                name="name"
              />
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="success"
              >
                Update my informations
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Profile;
