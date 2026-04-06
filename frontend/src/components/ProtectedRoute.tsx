import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }: any) => {
  const token = localStorage.getItem("token"); // ✅ FIXED
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ❌ Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Inactive user (IMPORTANT)
  if (!user.isActive) {
    localStorage.clear(); // auto logout
    return <Navigate to="/login" replace />;
  }

  // ❌ Admin only route (SuperAdmin access)
  if (adminOnly && user.role !== "superadmin") {
    return <Navigate to="/courses" replace />;
  }

  return children;
};

export default ProtectedRoute;