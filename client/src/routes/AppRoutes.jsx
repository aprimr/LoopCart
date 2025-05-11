import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Navbar from "../components/Navbar";
import Settings from "../pages/private/Settings";
import Footer from "../components/Footer";
import Login from "../pages/public/auth/Login";
import Explore from "../pages/public/Explore";
import Loading from "../components/Loading";
import Wishlist from "../pages/public/WishList";
import Signup from "../pages/public/auth/Signup";
import VerifyOtp from "../pages/public/auth/VerifyOtp";

function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/signup/verify/u/:signToken" element={<VerifyOtp />} />

        <Route path="/explore" element={<Explore />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/settings" element={<Settings />} />
        <Route path="/extra" element={<Loading />} />

        <Route />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRoutes;
