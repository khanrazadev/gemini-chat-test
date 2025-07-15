import { Navigate, useLocation } from "react-router-dom";
import { useChatStore } from "../store/chatStore";

const ProtectedRoute = ({ children }) => {
  const user = useChatStore((s) => s.user);
  const location = useLocation();

  // if not logged
  if (!user && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  if (user && location.pathname === "/login") {
    return <Navigate to="/app" replace />;
  }

  return children;
};

export default ProtectedRoute;
