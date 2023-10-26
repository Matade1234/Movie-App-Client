import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  const { token } = useAuth()

  useEffect(() => {
    if (!token) {
      toast.error("You have to login first", {
        id: "mmm",
      });
    }
  });
  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
