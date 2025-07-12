import { lazy, Suspense } from "react";
import { PagePreLoader } from "@/components/page-pre-loader";

const Dashboard = lazy(() => import("./dashboard"));
export const DashboardPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <Dashboard />
  </Suspense>
);

const ForgotPassword = lazy(() => import("./forgot-password"));
export const ForgotPasswordPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <ForgotPassword />
  </Suspense>
);
