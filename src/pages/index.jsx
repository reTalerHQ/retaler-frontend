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
const Inventory = lazy(() => import("./inventory"));
export const InventoryPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <Inventory />
  </Suspense>
);

const AddNewProduct = lazy(() => import("./add-new-product"));
export const AddNewProductPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <AddNewProduct />
  </Suspense>
);

const BulkAddNewProducts = lazy(() => import("./bulk-add-new-products"));
export const BulkAddNewProductsPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <BulkAddNewProducts />
  </Suspense>
);

const Sales = lazy(() => import("./sales"));
export const SalesPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <Sales />
  </Suspense>
);
const Analytics = lazy(() => import("./analytics"));
export const AnalyticsPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <Analytics />
  </Suspense>
);
