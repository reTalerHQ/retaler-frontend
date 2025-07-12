import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { List, X } from "phosphor-react";

export const DashboardLayout = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpened((opened) => !opened);
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 z-40 h-full w-full transform border-r-[0.5px] border-[#BBBBBB] bg-white px-2 py-4 transition-transform duration-300 ease-in-out lg:w-[250px] lg:px-4 lg:py-6 ${isSidebarOpened ? "translate-x-0" : "-translate-x-full"} lg:static lg:h-auto lg:translate-x-0 lg:transform-none`}
      >
        <div className="flex h-20 items-center justify-center border-b-[0.5px] border-b-[#BBBBBB]">
          <div className="flex flex-1 items-center justify-between">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={handleToggleSidebar}
              className="rounded-sm bg-gray-100 p-2"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Sidebar content */}
        <div className="space-y-2 px-6 py-4">
          {/* Add nav items here */}
          <div>Dashboard</div>
          <div>Settings</div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex items-center border-b p-4 lg:hidden">
          <button onClick={handleToggleSidebar}>
            <List size={28} className="text-gray-700" />
          </button>
        </header>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
