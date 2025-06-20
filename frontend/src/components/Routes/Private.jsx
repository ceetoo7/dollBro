import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [auth] = useAuth();
  const [checking, setChecking] = useState(true); // While we wait
  const [allow, setAllow] = useState(false); // Route access control

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (auth?.token) {
        setAllow(true);
      }
      setChecking(false);
    }, 500); // Give it 0.5s to finish loading from localStorage

    return () => clearTimeout(timeout);
  }, [auth?.token]);

  if (checking) return <Spinner />;

  return allow ? <Outlet /> : <Navigate to="/login" />;
}
