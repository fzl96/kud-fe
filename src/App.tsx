import {
  createBrowserRouter,
  createRoutesFromElements,
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
} from "./pages";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Dashboard />} />
        <Route path="/kategori" element={<Categories />} />
        <Route path="/produk" element={<Products />} />
        <Route path="/supplier" element={<Suppliers />} />
        <Route path="/kasir" element={<Cashier />} />
        <Route path="/penjualan" element={<Sales />} />
        <Route path="/pembelian" element={<Purchases />} />
        <Route path="/pelanggan" element={<Customers />} />
        <Route path="/laporan" element={<Reports />} />
        <Route path="/pengaturan" element={<Settings />} />
        <Route path="/user" element={<Users />} />
        <Route path="/role" element={<Roles />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
