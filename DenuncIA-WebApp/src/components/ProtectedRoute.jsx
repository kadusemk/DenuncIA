import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  if (isLoadingAuth) return <div className="fixed inset-0 grid place-items-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
