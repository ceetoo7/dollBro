// AdminRoute.jsx
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [auth] = useAuth();
  const [checking, setChecking] = useState(true);
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (auth?.token && auth?.user?.role === 1) {
        setAllow(true);
      } else {
        setAllow(false);
      }
      setChecking(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [auth]);

  if (checking) return <Spinner />;

  return allow ? <Outlet /> : <Navigate to="/" />;
}
