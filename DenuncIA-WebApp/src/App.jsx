import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { queryClientInstance } from "@/lib/query-client";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Home from "@/pages/Home";
import NewComplaint from "@/pages/NewComplaint";
import MyComplaints from "@/pages/MyComplaints";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminComplaints from "@/pages/admin/AdminComplaints";
import PageNotFound from "@/pages/PageNotFound";

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (user?.role !== "admin") return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/nova-denuncia" element={<NewComplaint />} />
                <Route path="/minhas-denuncias" element={<MyComplaints />} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/denuncias" element={<AdminRoute><AdminComplaints /></AdminRoute>} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}
