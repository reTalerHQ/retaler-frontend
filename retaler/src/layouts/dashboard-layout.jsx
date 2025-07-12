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
        className={`
          fixed px-2 lg:px-4 py-4 lg:py-6 top-0 left-0 h-full z-40 bg-white border-r-[0.5px] border-[#BBBBBB]
          w-full lg:w-[250px] transform transition-transform duration-300 ease-in-out
          ${isSidebarOpened ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:h-auto lg:transform-none
        `}
      >
        <div className="h-20 flex items-center justify-center border-b-[0.5px] border-b-[#BBBBBB]">
          <div className="flex-1 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={handleToggleSidebar}
              className="p-2 bg-gray-100 rounded-sm"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Sidebar content */}
        <div className="px-6 py-4 space-y-2">
          {/* Add nav items here */}
          <div>Dashboard</div>
          <div>Settings</div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <header className="p-4 border-b flex items-center lg:hidden">
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
