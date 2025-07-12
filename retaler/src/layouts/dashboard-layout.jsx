import React from "react";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div>
      <nav>Sidebar</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
