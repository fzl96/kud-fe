import {
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./Root";
import {
  Cashier,
  Categories,
  Customers,
  Dashboard,
  Login,
  Products,
  Purchases,
  Reports,
  Roles,
  Sales,
  Settings,
  Suppliers,
  Users,
  Unauthorized,
  RoleProtectedRoutes,
} from "./pages";
import ProtectedRoutes from "./protectedRoutes";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
