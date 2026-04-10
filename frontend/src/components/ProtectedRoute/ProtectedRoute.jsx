import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Checking authentication...</p>
      </div>
    );
  }

  // If not logged in , redirect to login page;
  if (!user) {
    return <Navigate to="/signIn" replace state={{ from: location }} />;
  }

  // If logged in , allow access;
  return <Outlet />;
}
