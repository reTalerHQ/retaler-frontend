import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import {
  DashboardPage,
  ForgotPasswordPage,
  ManageStaffRolesPage,
  StaffDetailsPage,
  StaffPage,
  CreateStaffRolePage,
  AddNewStaffPage,
} from "@/pages";



import { ResetPasswordPage, SigninPage } from "./pages";
import {
  AddNewProductPage,
  BulkAddNewProductsPage,
  InventoryPage,
  SalesPage,
} from "./pages";

// import { SplashScreen } from "@/pages/splashScreen";
import { RootEntry } from "@/pages/RootEntry";
import { Welcome } from "@/pages/welcome";
import { Signup } from "@/pages/signup";
// import { BusinessInfo } from "@/pages/business-info";
import { BusinessInfo } from "@/pages/business-info";
import { InviteStaff } from "@/pages/invite-staff";
import { Bus } from "lucide-react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootEntry />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/business-info",
    element: <BusinessInfo />,
  },
  {
    path: "/invite-staff",
    element: <InviteStaff />,
  },
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "inventory",
        children: [
          {
            index: true,
            element: <InventoryPage />,
          },
          {
            path: "add-new-product",
            element: <AddNewProductPage />,
          },
          {
            path: "bulk-add-new-products",
            element: <BulkAddNewProductsPage />,
          },
        ],
      },
      {
        path: "sales",
        children: [
          {
            index: true,
            element: <SalesPage />,
          },
        ],
      },
      {
        path: "staff",
        children: [
          {
            index: true,
            element: <StaffPage />,
          },
          {
            path: "staff-details",
            element: <StaffDetailsPage />,
          },
          {
            path: "manage-staff-roles",
            element: <ManageStaffRolesPage />,
          },
          {
            path: "create-staff-role",
            element: <CreateStaffRolePage />,
          },
          {
            path: "add-new-staff",
            element: <AddNewStaffPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/sign-in",
    element: <SigninPage />,
  },

  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
]);
