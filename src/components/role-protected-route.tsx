import { useAuth } from "@/context/auth-context";
import { useNavigate, Outlet, Navigate } from "react-router-dom";

interface RoleProtectedRoute {
  requiredRoles: string[];
}

const RoleProtectedRoute = ({ requiredRoles }: RoleProtectedRoute) => {
  const { auth } = useAuth();

  return requiredRoles.includes(auth.user.role.name) ? (
    <Outlet />
  ) : (
    <Navigate to="/tidak-sah" />
  );
};
export default RoleProtectedRoute;
