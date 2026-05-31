import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("token") ? true : false; 

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
