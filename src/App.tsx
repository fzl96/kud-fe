import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import {
// Cashier,
// Categories,
// Customers,
// Dashboard,
// Login,
// Products,
// Purchases,
// Reports,
// Roles,
// Sales,
// Settings,
// Suppliers,
// Users,
// Unauthorized,
// RoleProtectedRoutes,
// } from "./pages";

const Login = lazy(() => import("./pages/Login"));
const ProtectedRoutes = lazy(() => import("./protectedRoutes"));
const RoleProtectedRoutes = lazy(() => import("./pages/RoleProtectedRoutes"));
const Root = lazy(() => import("./Root"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Categories = lazy(() => import("./pages/Categories"));
const Products = lazy(() => import("./pages/Products"));
const Suppliers = lazy(() => import("./pages/Suppliers"));
const Cashier = lazy(() => import("./pages/Cashier"));
const Sales = lazy(() => import("./pages/Sales"));
const Purchases = lazy(() => import("./pages/Purchases"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const Customers = lazy(() => import("./pages/Customers"));
const Users = lazy(() => import("./pages/Users"));
const Roles = lazy(() => import("./pages/Roles"));
const Reports = lazy(() => import("./pages/Reports"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/reports" element={<Reports />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Root />}>
            <Route path="/tidak-sah" element={<Unauthorized />} />
            <Route
              element={
                <RoleProtectedRoutes
                  allowedPermissions={["Admin", "Ketua", "Bendahara"]}
                />
              }
            >
              <Route path="/" element={<Dashboard />} />
            </Route>

            <Route
              element={<RoleProtectedRoutes allowedPermissions={["Admin"]} />}
            >
              <Route path="/kategori" element={<Categories />} />
            </Route>
            <Route
              element={
                <RoleProtectedRoutes allowedPermissions={["Admin", "Kasir"]} />
              }
            >
              <Route path="/produk" element={<Products />} />
            </Route>
            <Route
              element={<RoleProtectedRoutes allowedPermissions={["Admin"]} />}
            >
              <Route path="/supplier" element={<Suppliers />} />
            </Route>

            <Route
              element={
                <RoleProtectedRoutes allowedPermissions={["Admin", "Kasir"]} />
              }
            >
              <Route path="/kasir" element={<Cashier />} />
            </Route>
            <Route
              element={
                <RoleProtectedRoutes
                  allowedPermissions={["Admin", "Kasir", "Bendahara"]}
                />
              }
            >
              <Route path="/penjualan" element={<Sales />} />
            </Route>
            <Route
              element={
                <RoleProtectedRoutes
                  allowedPermissions={["Admin", "Bendahara"]}
                />
              }
            >
              <Route path="/pembelian" element={<Purchases />} />
            </Route>
            <Route
              element={
                <RoleProtectedRoutes allowedPermissions={["Admin", "Kasir"]} />
              }
            >
              <Route path="/pelanggan" element={<Customers />} />
            </Route>
            <Route
              element={<RoleProtectedRoutes allowedPermissions={["Admin"]} />}
            >
              <Route path="/user" element={<Users />} />
            </Route>
            <Route
              element={<RoleProtectedRoutes allowedPermissions={["Admin"]} />}
            >
              <Route path="/role" element={<Roles />} />
            </Route>
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Route>
      </>
    )
  );

  return (
    <>
      <Suspense fallback={<></>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
