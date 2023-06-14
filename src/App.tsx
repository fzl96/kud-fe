import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout";
import ProtectedRoutes from "./components/protected-routes";
import Login from "@/pages/Login/login";
import { Toaster } from "@/components/ui/toaster";
import RoleProtectedRoute from "@/components/role-protected-route";
import Unauthorized from "@/pages/unauthorized/unauthorized";

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
const MemberDetails = lazy(() => import("@/pages/members/member-details"));

const Groups = lazy(() => import("@/pages/groups/groups"));
const GroupId = lazy(() => import("@/pages/groups/group-id"));
const NewGroup = lazy(() => import("@/pages/groups/new-group"));
const GroupDetails = lazy(() => import("@/pages/groups/group-details"));

const Purchases = lazy(() => import("@/pages/purchases/purchases"));
const PurchaseId = lazy(() => import("@/pages/purchases/purchase-id"));
const NewPurchase = lazy(() => import("@/pages/purchases/new-purchase"));
const PurchaseIdDetails = lazy(
  () => import("@/pages/purchases/purchase-id-details")
);

const Cashier = lazy(() => import("@/pages/cashier/cashier"));

const Sales = lazy(() => import("@/pages/sales/sales"));
const SaleId = lazy(() => import("@/pages/sales/sale-id"));

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
              element={
                <RoleProtectedRoute
                  requiredRoles={["Admin", "Kasir", "Bendahara", "Ketua"]}
                />
              }
            >
              <Route
                path="/"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Home />
                  </Suspense>
                }
              />
            </Route>
            {/* categories */}
            <Route
              element={
                <RoleProtectedRoute requiredRoles={["Admin", "Kasir"]} />
              }
            >
              <Route
                path="/kategori"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Categories />
                  </Suspense>
                }
              />
              <Route
                path="/kategori/edit/:id"
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
            </Route>
            {/* suppliers */}
            <Route
              element={
                <RoleProtectedRoute
                  requiredRoles={["Admin", "Kasir", "Bendahara"]}
                />
              }
            >
              <Route
                path="/supplier"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Suppliers />
                  </Suspense>
                }
              />

              <Route
                path="/supplier/edit/:id"
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
            </Route>
            {/* products */}
            <Route
              element={
                <RoleProtectedRoute
                  requiredRoles={["Admin", "Kasir", "Bendahara"]}
                />
              }
            >
              <Route
                path="/barang"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Products />
                  </Suspense>
                }
              />

              <Route
                path="/barang/edit/:id"
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
            </Route>
            {/* users */}
            <Route element={<RoleProtectedRoute requiredRoles={["Admin"]} />}>
              <Route
                path="/pengguna"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Users />
                  </Suspense>
                }
              />
            </Route>
            <Route element={<RoleProtectedRoute requiredRoles={["Admin"]} />}>
              <Route
                path="/pengguna/edit/:id"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <UserId />
                  </Suspense>
                }
              />
            </Route>
            <Route element={<RoleProtectedRoute requiredRoles={["Admin"]} />}>
              <Route
                path="/pengguna/baru"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <NewUsers />
                  </Suspense>
                }
              />
            </Route>
            {/* members */}
            <Route element={<RoleProtectedRoute requiredRoles={["Admin"]} />}>
              <Route
                path="/anggota"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Members />
                  </Suspense>
                }
              />
            </Route>
            <Route element={<RoleProtectedRoute requiredRoles={["Admin"]} />}>
              <Route
                path="/anggota/:id"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <MemberDetails />
                  </Suspense>
                }
              />
            </Route>
            <Route element={<RoleProtectedRoute requiredRoles={["Admin"]} />}>
              <Route
                path="/anggota/edit/:id"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <MemberId />
                  </Suspense>
                }
              />
            </Route>
            <Route element={<RoleProtectedRoute requiredRoles={["Admin"]} />}>
              <Route
                path="/anggota/baru"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <NewMembers />
                  </Suspense>
                }
              />
            </Route>
            {/* Group */}
            <Route element={<RoleProtectedRoute requiredRoles={["Admin"]} />}>
              <Route
                path="/kelompok"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Groups />
                  </Suspense>
                }
              />
              <Route
                path="/kelompok/:id"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <GroupDetails />
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
                path="/kelompok/edit/:id"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <GroupId />
                  </Suspense>
                }
              />
            </Route>
            {/* purchases */}
            <Route
              element={
                <RoleProtectedRoute
                  requiredRoles={["Admin", "Kasir", "Bendahara"]}
                />
              }
            >
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
                    <PurchaseIdDetails />
                  </Suspense>
                }
              />
              <Route
                path="/pembelian/edit/:id"
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
            </Route>
            {/* cashier */}
            <Route
              element={
                <RoleProtectedRoute requiredRoles={["Admin", "Kasir"]} />
              }
            >
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
              <Route
                path="/penjualan/:id"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <SaleId />
                  </Suspense>
                }
              />
            </Route>
            <Route path="/tidak-sah" element={<Unauthorized />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
