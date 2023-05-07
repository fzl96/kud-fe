import { useNavigate, useLocation, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

interface Props {
  allowedPermissions: string;
}

export default function RoleProtectedRoutes({ allowedPermissions }: Props) {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user?.role.permissions.find(
    (permission: string) => permission === allowedPermissions
  ) ? (
    <Outlet />
  ) : (
    <Navigate to="/tidak-sah" state={{ from: location }} />
  );
}
