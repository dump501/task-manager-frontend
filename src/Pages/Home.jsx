import { Lock, Person } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../Features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Features/auth/authSlice";
import HttpStatus from "../helpers/HttpStatus.json";

const Home = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setform] = useState({
    email: null,
    password: null,
  });

  const handleChange = (e) => {
    setform((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(form);
      const response = await login(form).unwrap();
      console.log(response);
      dispatch(
        setCredentials({
          user: response.data.user,
          accessToken: response.data.accessToken,
        })
      );
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
      if (error?.status === HttpStatus.badRequest) {
        console.log("Email or password required");
      } else {
        console.log("Incorrect Email or password");
      }
    }
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Paper
        sx={{
          py: 4,
          px: 4,
          maxWidth: { sm: "95%", md: "700px" },
          minWidth: { sm: "95%", md: "50%" },
          pb: "4rem",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 4,
            }}
          >
            Login
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />{" "}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="password"
              onChange={handleChange}
              fullWidth
              placeholder="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />{" "}
                  </InputAdornment>
                ),
              }}
            />
            <Box display="flex" justifyContent="center">
              <Button size="lg" variant="contained" onClick={handleSubmit}>
                Login
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
