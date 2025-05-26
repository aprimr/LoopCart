import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNav = location.pathname.startsWith("/admin");
  const hideFooter = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNav && <Navbar />}
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
