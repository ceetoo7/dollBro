import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function PublicRoute() {
  const [auth] = useAuth();
  return auth?.token ? (
    <Navigate to={`/dashboard/${auth.user?.role === 1 ? "admin" : "user"}`} />
  ) : (
    <Outlet />
  );
}
