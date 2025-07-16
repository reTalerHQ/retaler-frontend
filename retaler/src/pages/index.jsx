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

const Signin = lazy(() => import("./sign-in"));
export const SigninPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <Signin />
  </Suspense>
);

const ResetPassword = lazy(() => import("./ResetPassword"));
export const ResetPasswordPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <ResetPassword />
  </Suspense>
);
