import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const RoleRoute = ({ allowedRole }) => {
  const { user } = useAuth();

  if (user.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
