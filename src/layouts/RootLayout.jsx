import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import Search from "../components/Search/Search";
import useAuth from "../hooks/useAuth";

const RootLayout = () => {
  const { handleGetUser } = useAuth();

  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <div className="py-md-4 d-xl-flex">
      <SideBar />
      <div className="w-100">
        <Search />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
