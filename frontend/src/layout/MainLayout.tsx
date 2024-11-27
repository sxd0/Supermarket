import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
