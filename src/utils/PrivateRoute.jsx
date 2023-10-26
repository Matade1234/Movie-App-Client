import React, { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { token } = useContext(AuthContext);

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
