import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function PublicRoute() {
  const [auth] = useAuth();

  if (auth?.token) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
