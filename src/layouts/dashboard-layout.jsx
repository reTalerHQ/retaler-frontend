import React, { useState } from "react";
import { useUser } from "../context/user-context";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  List,
  X,
  Gear,
  Bell,
  CaretDown,
  User,
  House,
  FolderSimple,
  CurrencyCircleDollar,
  TrendUp,
  MagnifyingGlass,
} from "phosphor-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { TOKEN_IDENTIFIER, USER_INFO_KEY } from "@/constants";
import axios from "axios";
import { BASE_URL } from "@/constants/api";
import { PagePreLoader } from "@/components/page-pre-loader";

export const DashboardLayout = () => {
  const { avatar, setStoreInfo } = useUser();

  const { isLoading } = useQuery({
    queryKey: ["FETCH_USER_STORE"],
    queryFn: async () => {
      const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
      console.log("🔐 Token:", token);
      const userInfo = JSON.parse(sessionStorage.getItem(USER_INFO_KEY));
      const response = await axios.get(
        `${BASE_URL}/v1/store/`,
        {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
          },
        },
      );
      console.log("🏪 Store Response:", response.data);
      const store = response?.data?.[0];
      setStoreInfo(store);
      return store;
    },
  });

  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const handleToggleSidebar = () => setIsSidebarOpened((v) => !v);

  const sidebarLinks = [
    { id: 1, title: "Dashboard", icon: <House />, to: "/dashboard" },
    { id: 2, title: "Inventory", icon: <FolderSimple />, to: "/inventory" },
    { id: 3, title: "Sales", icon: <CurrencyCircleDollar />, to: "/sales" },
    { id: 4, title: "Analytics", icon: <TrendUp />, to: "/analytics" },
    { id: 5, title: "Staff", icon: <User />, to: "/staff" },
  ];

  const showNotificationBadge = true;

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#FAFAFA]">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 h-full w-full transform border-r border-[#BBBBBB] bg-white transition-transform duration-300 ease-in-out lg:w-[250px] ${isSidebarOpened ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0 lg:transform-none`}
        >
          <div className="flex h-24 items-center justify-between border-b border-[#BBBBBB] px-4">
            <Link to="/" className="hidden lg:block">
              <img src="/assets/images/retaler-logo.svg" alt="Retaler" />
            </Link>
            <h2 className="text-lg font-semibold lg:hidden">Menu</h2>
            <button
              onClick={handleToggleSidebar}
              className="rounded-sm bg-gray-100 p-2 lg:hidden"
            >
              <X className="text-lg" />
            </button>
          </div>

          <nav className="flex h-[calc(100%-10rem)] flex-col gap-4 overflow-y-auto px-6 py-6">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                onClick={() => setIsSidebarOpened(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-3 py-3 text-base transition-colors ${
                    isActive
                      ? "text-primary font-medium hover:bg-[#F6F8FD]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {link.icon}
                <span>{link.title}</span>
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-[#BBBBBB] px-6 py-4">
            <NavLink
              to="/settings"
              onClick={() => setIsSidebarOpened(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 text-base transition-colors ${
                  isActive
                    ? "text-primary font-medium hover:bg-[#F6F8FD]"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Gear />
              <span>Settings</span>
            </NavLink>
          </div>
        </aside>

        {/* Main */}
        <div className="flex h-full flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={handleToggleSidebar}
                className="rounded-sm bg-gray-100 p-2"
              >
                <List className="text-lg text-gray-700" />
              </button>
              <Link to="/dashboard">
                <img
                  src="/assets/images/retaler-logo.svg"
                  alt="Retaler"
                  className="h-8"
                />
              </Link>
            </div>
            <div className="hidden flex-1 items-center justify-center lg:flex">
              <div className="w-3/5">
                <Input
                  type="Search"
                  showError={false}
                  placeholder="Search"
                  leftIcon={
                    <MagnifyingGlass className="text-sm text-[#BBBBBB]" />
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative rounded-full bg-gray-100 p-2">
                {showNotificationBadge && (
                  <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-red-600" />
                )}
                <Bell className="text-lg" />
              </button>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex cursor-pointer items-center gap-1">
                    <img
                      src={avatar || "/assets/images/dummy-avatar.png"}
                      alt="Avatar"
                      className="h-7 w-7 rounded-full"
                    />
                    <span className="hidden lg:inline">Test User</span>
                    <CaretDown />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="flex max-w-40 flex-col gap-3 p-2 lg:max-w-50">
                  <Link
                    to="/account"
                    className="flex items-center justify-start gap-2 px-4 text-sm"
                  >
                    <User className="text-lg" />
                    <span>My Account</span>
                  </Link>
                  <button className="flex w-full items-center justify-start gap-2 px-4 text-sm">
                    <img
                      src="/assets/images/log-out.svg"
                      alt="Logout"
                      className="inline h-3"
                    />
                    <span>Log Out</span>
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          </header>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </div>
        </div>
      </div>
      {isLoading && <PagePreLoader />}
    </>
  );
};
