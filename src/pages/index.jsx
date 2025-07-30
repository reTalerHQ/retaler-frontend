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

const Welcome = lazy(() => import("./welcome"));
export const WelcomePage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <Welcome />
  </Suspense>
);

const Signup = lazy(() => import("./signup"));
export const SignUpPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <Signup />
  </Suspense>
);

const Signin = lazy(() => import("./sign-in"));
export const SigninPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <Signin />
  </Suspense>
);

const ResetPassword = lazy(() => import("./reset-password"));
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

const Staff = lazy(() => import("./staff"));
export const StaffPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <Staff />
  </Suspense>
);

const StaffDetails = lazy(() => import("./staff-details"));
export const StaffDetailsPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <StaffDetails />
  </Suspense>
);

const ManageStaffRoles = lazy(() => import("./manage-staff-roles"));
export const ManageStaffRolesPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <ManageStaffRoles />
  </Suspense>
);

const CreateStaffRole = lazy(() => import("./create-staff-role.jsx"));
export const CreateStaffRolePage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <CreateStaffRole />
  </Suspense>
);

const AddNewStaff = lazy(() => import("./add-new-staff.jsx"));
export const AddNewStaffPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <AddNewStaff />
  </Suspense>
);

const ProductDetail = lazy(() => import("./product-details"));
export const ProductDetailsPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <ProductDetail />
  </Suspense>
);

const EditProduct = lazy(() => import("./edit-product"));
export const EditProductPage = () => (
  <Suspense fallback={<PagePreLoader />}>
    <EditProduct />
  </Suspense>
);
