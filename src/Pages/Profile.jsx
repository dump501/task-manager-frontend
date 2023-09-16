import React from "react";
import { useProfileQuery } from "../Features/users/usersApiSlice";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Header from "../Components/Header";
import { formatDateTime } from "../helpers/uiHelpers";

const Profile = () => {
  const { data: userData, isLoading } = useProfileQuery();
  console.log(userData);
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
                  </Stack>
                )}
              </>
            )}
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" mb={2}>
              Additional informations
            </Typography>
            <Divider />
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {userData?.data && (
                  <Stack mt={2} alignItems="center">
                    <Typography fontSize={20}>
                      Role : {userData.data.role}
                    </Typography>
                    <Typography fontSize={20}>
                      Member since {formatDateTime(userData.data.created_at)}
                    </Typography>
                  </Stack>
                )}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
