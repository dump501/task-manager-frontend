import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../Features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../Pages/Global/AdminLayout";
import UserLayout from "../Pages/Global/UserLayout";

const AuthGuard = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  if (token && user) {
    return (
      <>
        {parseInt(user.role_id) === 1 ? (
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        ) : (
          <UserLayout>
            <Outlet />
          </UserLayout>
        )}
      </>
    );
  }
  return <Navigate to="/" replace />;
};

export default AuthGuard;
