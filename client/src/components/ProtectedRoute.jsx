import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute — restricts access based on authentication and role.
 *
 * @param {ReactNode} children - The component to render if authorized
 * @param {string} allowedRole - The role allowed to access this route
 *
 * Behavior:
 * - If not authenticated → redirect to /login
 * - If authenticated but wrong role → redirect to user's own dashboard
 * - If authenticated and correct role → render children
 */
export default function ProtectedRoute({ children, allowedRole }) {
  const { user, loading, isAuthenticated } = useAuth();

  // Show loading spinner while validating token
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Not authenticated — redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated but wrong role — redirect to user's own dashboard
  if (allowedRole && user.role !== allowedRole) {
    const roleRoutes = {
      student: "/student/dashboard",
      faculty: "/faculty/dashboard",
      admin: "/admin/dashboard",
    };
    return <Navigate to={roleRoutes[user.role] || "/login"} replace />;
  }

  return children;
}
