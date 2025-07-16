import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { DashboardPage, ForgotPasswordPage } from "@/pages";
import { ResetPasswordPage, SigninPage } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
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
