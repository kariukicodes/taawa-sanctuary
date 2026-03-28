import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

type ProtectedAdminRouteProps = {
  children: ReactNode;
};

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { loading, isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center">
        <p className="text-sm text-[#5f6f68]">Checking access...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;