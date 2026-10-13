import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import Scan from "../pages/Scan/Scan";
import History from "../pages/History/History";
import Profile from "../pages/Profile/Profile";
import About from "../pages/About/About";
import Garment from "../pages/Garment/Garment";
import DesignerDashboard from "../pages/DesignerDashboard/DesignerDashboard";

import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import LoadingScan from "../pages/LoadingScan/LoadingScan";
import ProtectedRoute from "../components/ProtectedRoute";
import TestQR from "../pages/TestQR/TestQR";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/test-qr" element={<TestQR />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/designer-dashboard"
              element={<DesignerDashboard />}
            />

            <Route
              path="/scan"
              element={<Scan />}
            />

            <Route
              path="/loading"
              element={<LoadingScan />}
            />

            <Route
              path="/garment/:id"
              element={<Garment />}
            />

            <Route
              path="/history"
              element={<History />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;