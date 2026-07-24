import { Navigate, Outlet } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("Is Authenticated: ", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;