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
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../Features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { logout, setCredentials } from "../Features/auth/authSlice";
import HttpStatus from "../helpers/HttpStatus.json";
import { readCookie, saveToCookie } from "../helpers/uiHelpers";
import { setAlertData, setAlertOpen } from "../Features/uiSlice";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setform] = useState({
    email: null,
    password: null,
    name: null,
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
      const response = await register(form).unwrap();
      navigate("/");
    } catch (error) {
      if (error?.status === HttpStatus.badRequest) {
        dispatch(
          setAlertData({
            type: "error",
            data: "Email, Name and password are required",
          })
        );
        dispatch(setAlertOpen(true));
        console.log("Email or password required");
      } else {
        dispatch(
          setAlertData({
            type: "error",
            data: "Please try later",
          })
        );
        dispatch(setAlertOpen(true));
        console.log("Incorrect Email or password");
      }
    }
  };

  useEffect(() => {
    dispatch(logout());
  }, []);
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
            Register
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="name"
              type="text"
              placeholder="Enter your name"
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
              fullWidth
              name="email"
              type="email"
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
              type="password"
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
                Register
              </Button>
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              Already an account ?{" "}
              <Button LinkComponent={Link} to="/">
                Login here
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
