import { useNavigate, useLocation, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

interface Props {
  allowedPermissions: Array<string>;
}

export default function RoleProtectedRoutes({ allowedPermissions }: Props) {
  const { auth } = useAuth();
  const location = useLocation();

  return allowedPermissions.includes(auth?.user.role.name) ? (
    <Outlet />
  ) : (
    <Navigate to="/tidak-sah" state={{ from: location }} />
  );
}
