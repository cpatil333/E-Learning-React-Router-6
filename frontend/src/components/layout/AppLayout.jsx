import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
export const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
