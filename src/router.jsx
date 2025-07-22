import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { AnalyticsPage, DashboardPage, ForgotPasswordPage } from "@/pages";
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
        path: "analytics",
        element: <AnalyticsPage />,
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
    path: "/ResetPassword",
    element: <ResetPasswordPage />,
  },
]);
