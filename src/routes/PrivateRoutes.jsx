import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuthContext();

  // ⏳ Wait until auth state is resolved
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  // 🔐 Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow access
  return children;
};

export default PrivateRoutes;
