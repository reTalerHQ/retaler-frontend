import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import {
  AnalyticsPage,
  DashboardPage,
  ForgotPasswordPage,
  ManageStaffRolesPage,
  StaffDetailsPage,
  StaffPage,
  CreateStaffRolePage,
  AddNewStaffPage,
  SigninPage,
} from "@/pages";

import { Account } from "./components/account";
import { Notifications } from "./components/notifications";
import { Theme } from "./components/theme";
import { DataBackup } from "./components/dataBackup";
import { SupportHelp } from "./components/supportHelp";
import { PrivacyPolicy } from "./components/privacyPolicy";
import { TermsCondition } from "./components/termsCondition";
import { InviteFriend } from "./components/inviteFriend";
import { AboutPage } from "./components/about";
import { InventorySettings } from "./components/inventorySettings";
// import { ResetPassword } from "@/pages/reset-password";
import { ResetPassword } from "@/pages/reset-password";

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
import { BusinessInfo } from "@/pages/business-info";
import { InviteStaff } from "@/pages/invite-staff";
import { Settings } from "./pages/settings";
import { WatchDemo } from "@/pages/watch-demo";
import { SplashDashboard } from "./pages/splash-dashboard";
import { AddNewSales } from "@/pages/add-new-sales";

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
    path: "/watch-demo",
    element: <WatchDemo />,
  },
  {
    path: "/splash-dashboard",
    element: <SplashDashboard />,
  },
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
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
          {
            path: "add-new-sales",
            element: <AddNewSales />,
          },
        ],
      },

      {
        path: "analytics",
        element: <AnalyticsPage />,
      },

      {
        path: "settings",
        element: <Settings />,
        children: [
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "theme",
            element: <Theme />,
          },
          {
            path: "inventory",
            element: <InventorySettings />,
          },
          {
            path: "data-backup",
            element: <DataBackup />,
          },
          {
            path: "support",
            element: <SupportHelp />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
          {
            path: "invite-friend",
            element: <InviteFriend />,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "terms-and-conditions",
            element: <TermsCondition />,
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

  // {

  //   path: "/reset-password",
  //   element: <ResetPassword />,
  // },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);
