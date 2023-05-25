import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout";
import ProtectedRoutes from "./components/protected-routes";
import Login from "@/pages/Login/login";
import { Toaster } from "@/components/ui/toaster";

const Home = lazy(() => import("./pages/Dashboard/dashboard"));

const Categories = lazy(() => import("./pages/categories/categories"));
const CategoriesId = lazy(() => import("@/pages/categories/categories-id"));
const NewCategories = lazy(() => import("@/pages/categories/new-categories"));

const Suppliers = lazy(() => import("./pages/suppliers/suppliers"));
const SupplierId = lazy(() => import("@/pages/suppliers/supplier-id"));
const NewSuppliers = lazy(() => import("@/pages/suppliers/new-suppliers"));

const Products = lazy(() => import("./pages/products/products"));
const ProductId = lazy(() => import("@/pages/products/product-id"));
const NewProducts = lazy(() => import("@/pages/products/new-products"));

const Users = lazy(() => import("@/pages/users/users"));
const UserId = lazy(() => import("@/pages/users/user-id"));
const NewUsers = lazy(() => import("@/pages/users/new-users"));

const Members = lazy(() => import("@/pages/members/members"));
const MemberId = lazy(() => import("@/pages/members/member-id"));
const NewMembers = lazy(() => import("@/pages/members/new-members"));

const Groups = lazy(() => import("@/pages/groups/groups"));
const GroupId = lazy(() => import("@/pages/groups/group-id"));
const NewGroup = lazy(() => import("@/pages/groups/new-group"));

const Purchases = lazy(() => import("@/pages/purchases/purchases"));
const PurchaseId = lazy(() => import("@/pages/purchases/purchase-id"));
const NewPurchase = lazy(() => import("@/pages/purchases/new-purchase"));

const Cashier = lazy(() => import("@/pages/cashier/cashier"));

const Sales = lazy(() => import("@/pages/sales/sales"));

// const SalesId = lazy(() => import("@/pages/sales/sales-id"));

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            {/* dashboard */}
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              }
            />
            {/* categories */}
            <Route
              path="/kategori"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Categories />
                </Suspense>
              }
            />
            <Route
              path="/kategori/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CategoriesId />
                </Suspense>
              }
            />
            <Route
              path="/kategori/baru"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NewCategories />
                </Suspense>
              }
            />
            {/* suppliers */}
            <Route
              path="/supplier"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Suppliers />
                </Suspense>
              }
            />
            <Route
              path="/supplier/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SupplierId />
                </Suspense>
              }
            />
            <Route
              path="/supplier/baru"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NewSuppliers />
                </Suspense>
              }
            />
            {/* products */}
            <Route
              path="/barang"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Products />
                </Suspense>
              }
            />
            <Route
              path="/barang/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProductId />
                </Suspense>
              }
            />
            <Route
              path="/barang/baru"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NewProducts />
                </Suspense>
              }
            />
            {/* users */}
            <Route
              path="/pengguna"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Users />
                </Suspense>
              }
            />
            <Route
              path="/pengguna/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <UserId />
                </Suspense>
              }
            />
            <Route
              path="/pengguna/baru"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NewUsers />
                </Suspense>
              }
            />
            {/* members */}
            <Route
              path="/anggota"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Members />
                </Suspense>
              }
            />
            <Route
              path="/anggota/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MemberId />
                </Suspense>
              }
            />
            <Route
              path="/anggota/baru"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NewMembers />
                </Suspense>
              }
            />
            {/* Group */}
            <Route
              path="/kelompok"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Groups />
                </Suspense>
              }
            />
            <Route
              path="/kelompok/baru"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NewGroup />
                </Suspense>
              }
            />
            <Route
              path="/kelompok/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <GroupId />
                </Suspense>
              }
            />
            {/* purchases */}
            <Route
              path="/pembelian"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Purchases />
                </Suspense>
              }
            />
            <Route
              path="/pembelian/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <PurchaseId />
                </Suspense>
              }
            />

            <Route
              path="/pembelian/baru"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NewPurchase />
                </Suspense>
              }
            />
            {/* cashier */}
            <Route
              path="/kasir"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Cashier />
                </Suspense>
              }
            />
            {/* sales */}
            <Route
              path="/penjualan"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Sales />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
