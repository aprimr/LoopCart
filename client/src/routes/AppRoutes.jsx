import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Navbar from "../components/Navbar";
import Settings from "../pages/private/Settings";
function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        {/* Private Routes */}
        <Route path="/settings" element={<Settings />} />

        {/* admin Routes */}
        <Route />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
