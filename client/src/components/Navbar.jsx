import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Package,
  Heart,
  House,
  Compass,
  BadgePercent,
  SquareArrowOutUpRight,
  Settings,
} from "lucide-react";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setDrawerOpen(false); // Close drawer when a menu item is clicked
    navigate(path);
  };

  return (
    <>
      <nav className="w-full h-16 bg-white border-b border-gray-300 backdrop-blur-lg bg-opacity-60 font-poppins fixed top-0 left-0 z-50">
        <div className="max-w-screen-xl mx-auto h-full px-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-black font-semibold text-lg sm:text-xl"
          >
            Loop<span className="text-blue-500">Cart</span>
          </NavLink>

          {/* Menu for large screens */}
          <div className="hidden sm:flex space-x-6 text-black text-sm sm:text-base font-normal">
            <NavLink to="/" className="hover:text-blue-500 transition">
              Home
            </NavLink>
            <NavLink to="/explore" className="hover:text-blue-500 transition">
              Explore
            </NavLink>
            <NavLink
              to="/categories"
              className="hover:text-blue-500 transition"
            >
              Categories
            </NavLink>
            <NavLink to="/account" className="hover:text-blue-500 transition">
              My Account
            </NavLink>
            <NavLink
              to="/flash-sale"
              className="hover:text-blue-500 transition"
            >
              Flash Sale
            </NavLink>
            <NavLink to="/wishlist" className="hover:text-blue-500 transition">
              Wishlist
            </NavLink>
          </div>

          {/* Login Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="hidden sm:flex bg-blue-500 text-white font-medium py-[4px] px-5 rounded transition"
          >
            Login
          </motion.button>

          {/* Hamburger for mobile */}
          <div className="sm:hidden">
            <button onClick={() => setDrawerOpen(true)}>
              <Menu className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay with Glassmorphism */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-xl z-40"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer Panel with Glassmorphism */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-64 h-full bg-white/20 backdrop-blur-lg border-l border-white/20 shadow-xl z-50 px-6 py-[18px] flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-black">Menu</h2>
                <button onClick={() => setDrawerOpen(false)}>
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              {/* Menu Items with Icons */}
              <div className="flex-grow space-y-4">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                  onClick={() => handleNavigate("/")}
                >
                  <House className="w-5 h-5 text-black" />
                  <span>Home</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                  onClick={() => handleNavigate("/explore")}
                >
                  <Compass className="w-5 h-5 text-black" />
                  <span>Explore</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                  onClick={() => handleNavigate("/categories")}
                >
                  <Package className="w-5 h-5 text-black" />
                  <span>Categories</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                  onClick={() => handleNavigate("/account")}
                >
                  <User className="w-5 h-5 text-black" />
                  <span>My Account</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                  onClick={() => handleNavigate("/flash-sale")}
                >
                  <BadgePercent className="w-5 h-5 text-black" />
                  <span>Flash Sale</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                  onClick={() => handleNavigate("/wishlist")}
                >
                  <Heart className="w-5 h-5 text-black" />
                  <span>Wishlist</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                  onClick={() => handleNavigate("/settings")}
                >
                  <Settings className="w-5 h-5 text-black" />
                  <span>Settings</span>
                </motion.div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                  className="flex items-center gap-2 bg-blue-500 text-white font-medium py-1 px-14 rounded"
                  onClick={() => handleNavigate("/login")}
                >
                  Login
                </motion.button>
              </div>

              {/* Footer */}
              <div className="mt-auto py-2 border-t border-b border-black/20">
                <div className="flex flex-row flex-wrap gap-2 text-xs text-black">
                  <a
                    href="#"
                    onClick={() => setDrawerOpen(false)}
                    className="hover:text-blue-500 underline"
                  >
                    Terms & Conditions
                  </a>
                  <a
                    href="#"
                    onClick={() => setDrawerOpen(false)}
                    className="hover:text-blue-500 underline"
                  >
                    Privacy Policy
                  </a>
                </div>
                <div className="flex flex-row flex-wrap gap-2 text-xs text-black mt-2">
                  <a
                    href="#"
                    onClick={() => setDrawerOpen(false)}
                    className="hover:text-blue-500 underline"
                  >
                    Contact Us
                  </a>
                  <a
                    href="#"
                    onClick={() => setDrawerOpen(false)}
                    className="hover:text-blue-500 underline"
                  >
                    About Us
                  </a>
                </div>
              </div>

              {/* View Source */}
              <div
                onClick={() => (window.location.href = "https://github.com")}
                className="flex items-center gap-1 text-xs text-black pt-2"
              >
                <a
                  href="https://github.com/loopcart/loopcart"
                  className="hover:text-blue-500"
                >
                  View Source
                </a>
                <SquareArrowOutUpRight className="w-3 h-3" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
