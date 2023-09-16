import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../Features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  return <>{token && user ? <Outlet /> : <Navigate to="/" replace />}</>;
};

export default AuthGuard;
