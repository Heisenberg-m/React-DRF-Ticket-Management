import { Routes, Route } from "react-router-dom";

import LandingPage from "../Pages/LandingPage";
import Login from "../Components/Registeruser/Login";
import Register from "../Components/Registeruser/Register";

import ManagerDashboard from "../Pages/ManagerDashboard";
import EngineerDashboard from "../Pages/EngineerDashboard";
import Unauthorized from "../Pages/Unauthorized";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import ViewTicketDetails from "../Pages/ViewTicketDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRole="manager" />}>
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        </Route>

        <Route element={<RoleRoute allowedRole="engineer" />}>
          <Route path="/engineer/dashboard" element={<EngineerDashboard />} />
        </Route>

        <Route path="/viewdetails/:id" element={<ViewTicketDetails />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
