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

import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import LoadingScan from "../pages/LoadingScan/LoadingScan";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/loading" element={<LoadingScan />} />
          <Route path="/garment/:id" element={<Garment />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;