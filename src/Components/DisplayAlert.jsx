import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAlertOpen } from "../Features/uiSlice";

const DisplayAlert = () => {
  const dispatch = useDispatch();
  const { isAlertOpen, alertData } = useSelector((state) => state.ui);
  console.log(alertData);

  const handleClose = () => {
    dispatch(setAlertOpen(false));
  };

  const getErrorList = (errors) => {
    if (errors?.requiredFields) {
      return (
        <>
          {errors.requiredFields.map((e) => (
            <>
              {e}
              {", "}
            </>
          ))}{" "}
          are required
        </>
      );
    }
    return "Please try later";
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isAlertOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={alertData.type}
        sx={{ width: "100%" }}
      >
        {typeof alertData.data === "string" ? (
          <>{alertData.data}</>
        ) : (
          <ul>{getErrorList(alertData.data)}</ul>
        )}
      </Alert>
    </Snackbar>
  );
};

export default DisplayAlert;
