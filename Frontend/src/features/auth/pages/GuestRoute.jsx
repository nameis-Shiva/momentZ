import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // ⛔ WAIT until auth is resolved
  if (loading) {
    return null; // or spinner
  }

  // ✅ If logged in → redirect
  if (user) {
    return <Navigate to="/" replace />;
  }

  // ✅ If not logged in → allow
  return children;
};

export default GuestRoute;