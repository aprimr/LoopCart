import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";

import SkeletonNotification from "./Skeletons/NotificationSkeleton";
import notificationColor from "../utils/notificationColor";
import timeCalc from "../utils/timeCalc";

import {
  X,
  User,
  Package,
  Heart,
  House,
  Compass,
  BadgePercent,
  SquareArrowOutUpRight,
  Settings,
  ArrowUpRight,
  Bell,
  NotepadText,
  CheckCheck,
  Trash,
  BellRing,
  MessageCircle,
  ClipboardCheck,
  Truck,
  MapPin,
  Clock,
  CreditCard,
  Star,
  ShieldOff,
  LogOut,
  LayoutDashboard,
  CircleUserRound,
} from "lucide-react";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { RiMenu3Line } from "react-icons/ri";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);
  const [notifications, setNotifications] = useState([
    {
      id: 0,
      title: "Welcome To LoopCart",
      message:
        "Thank you for joining us! Start shopping now and enjoy exclusive offers.",
      icon: <Bell />,
      date: "2025-05-02T11:50:00.000Z",
      read: true,
      category: "NEW_MESSAGE",
    },
    {
      id: 1,
      title: "Order Placed",
      message: "Your order has been placed successfully.",
      icon: <ClipboardCheck />,
      date: "2025-05-02T12:00:00.000Z",
      read: false,
      category: "ORDER_PLACED",
    },
    {
      id: 2,
      title: "New Message",
      message: "You have a new message.",
      icon: <MessageCircle />,
      date: "2025-05-02T12:10:00.000Z",
      read: false,
      category: "NEW_MESSAGE",
    },
    {
      id: 3,
      title: "Order Cancelled",
      message: "Your order has been cancelled.",
      icon: <Bell />,
      date: "2025-05-02T12:20:00.000Z",
      read: false,
      category: "ORDER_CANCELLED",
    },
    {
      id: 4,
      title: "Order Dispatched",
      message: "Your order has been dispatched and is on its way.",
      icon: <Truck />,
      date: "2025-05-02T12:30:00.000Z",
      read: false,
      category: "ORDER_DISPATCHED",
    },
    {
      id: 5,
      title: "Order Delivered",
      message: "Your order has been successfully delivered.",
      icon: <Package />,
      date: "2025-05-02T12:40:00.000Z",
      read: false,
      category: "ORDER_DELIVERED",
    },
    {
      id: 6,
      title: "Order Out for Delivery",
      message: "Your order is out for delivery.",
      icon: <MapPin />,
      date: "2025-05-02T12:50:00.000Z",
      read: false,
      category: "ORDER_OUT_FOR_DELIVERY",
    },
    {
      id: 7,
      title: "Flash Sale Alert",
      message: "Hurry up! Flash sale is live now.",
      icon: <Clock />,
      date: "2025-05-02T13:00:00.000Z",
      read: false,
      category: "FLASH_SALE_ALERT",
    },
    {
      id: 8,
      title: "Product Review Reminder",
      message: "It’s time to leave a review for your recent purchase.",
      icon: <Star />,
      date: "2025-05-02T13:10:00.000Z",
      read: false,
      category: "REVIEW_REMINDER",
    },
    {
      id: 9,
      title: "Profile Updated",
      message: "Your profile has been updated successfully.",
      icon: <User />,
      date: "2025-05-02T13:20:00.000Z",
      read: false,
      category: "PROFILE_UPDATED",
    },
    {
      id: 10,
      title: "Order Refund Processed",
      message: "Your order refund has been processed.",
      icon: <CreditCard />,
      date: "2025-05-02T13:30:00.000Z",
      read: false,
      category: "REFUND_PROCESSED",
    },
    {
      id: 11,
      title: "Account Suspended",
      message: "Your account has been suspended due to suspicious activity.",
      icon: <ShieldOff />,
      date: "2025-05-02T13:40:00.000Z",
      read: false,
      category: "ACCOUNT_SUSPENDED",
    },
    {
      id: 11,
      title: "Account Suspended",
      message: "Your account has been suspended due to suspicious activity.",
      icon: <ShieldOff />,
      date: "2025-05-02T13:40:00.000Z",
      read: false,
      category: "ACCOUNT_SUSPENDED",
    },
  ]);

  // desktop menu
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard />,
    },
    { title: "Profile", path: "/profile", icon: <User /> },
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings />,
    },
    { title: "Logout", path: "/logout", icon: <LogOut /> },
  ];

  const navigate = useNavigate();
  const handleNavigate = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="w-full h-16 bg-white dark:bg-black border-b border-gray-300 dark:border-gray-600 backdrop-blur-lg bg-opacity-60 font-poppins fixed top-0 left-0 z-50">
        <div className="max-w-screen-xl mx-auto h-full px-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-black dark:text-white font-semibold text-lg sm:text-xl"
          >
            Loop<span className="text-blue-500">Cart</span>
          </NavLink>

          {/* Menu for large screens */}
          <div className="hidden sm:flex space-x-6 text-black dark:text-white text-sm sm:text-base font-normal">
            <NavLink to="/explore" className="hover:text-blue-400 transition">
              Explore
            </NavLink>
            <NavLink
              to="/categories"
              className="hover:text-blue-400 transition"
            >
              Categories
            </NavLink>
            <NavLink
              to="/flash-sale"
              className="hover:text-blue-400 transition"
            >
              Flash Sale
            </NavLink>
            <NavLink to="/wishlist" className="hover:text-blue-400 transition">
              Wishlist
            </NavLink>
          </div>

          {/* Profile Btn for desktop */}
          <div
            className="hidden sm:flex justify-center items-center gap-4 relative"
            ref={profileRef}
          >
            <div className="hidden sm:flex gap-4">
              <button
                onClick={() => setNotificationOpen(true)}
                className="relative"
              >
                <Bell className="w-6 h-6 text-blue-500" />
                <div className="absolute top-0 right-1 h-2 w-2 border-2 border-white dark:border-black bg-red-500 rounded-full"></div>
              </button>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              <User className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </motion.button>

            {isOpen && (
              <ul className="absolute right-0 top-14 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-md shadow-md w-48 py-2 z-50">
                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </NavLink>
                <NavLink
                  to="/my-account"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <CircleUserRound className="w-5 h-5" /> My Account
                </NavLink>
                <NavLink
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Settings className="w-5 h-5" /> Settings
                </NavLink>
                <div className="border-t border-gray-300 dark:border-gray-600 my-2" />
                <NavLink
                  to="/login"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <User className="w-5 h-5" /> Login
                </NavLink>
                <NavLink
                  to="/logout"
                  className="flex items-center gap-3 px-4 py-2 text-red-700 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </NavLink>
              </ul>
            )}
          </div>

          {/* Hamburger for mobile */}
          <div className="sm:hidden flex gap-4">
            <button
              onClick={() => setNotificationOpen(true)}
              className="relative"
            >
              <Bell className="w-6 h-6 text-blue-500" />
              <div className="absolute top-0 right-1 h-2 w-2 border-2 border-white dark:border-black bg-red-600 rounded-full"></div>
            </button>
            <button onClick={() => setDrawerOpen(true)}>
              <RiMenu3Line className="w-6 h-6 text-black dark:text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Drawer Overlay Bg */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-3xl z-40"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-black backdrop-blur-lg border-l border-white/20 shadow-xl z-50 px-4 pt-[18px] pb-[6px] flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  Menu
                </h2>
                <button onClick={() => setDrawerOpen(false)}>
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              {/* Menu Items with Icons */}
              <div className="flex-grow space-y-4">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="text-black dark:text-white flex items-center gap-2"
                  onClick={() => handleNavigate("/")}
                >
                  <House className="w-5 h-5" />
                  <span>Home</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="text-black dark:text-white flex items-center gap-2"
                  onClick={() => handleNavigate("/explore")}
                >
                  <Compass className="w-5 h-5" />
                  <span>Explore</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="text-black dark:text-white flex items-center gap-2"
                  onClick={() => handleNavigate("/categories")}
                >
                  <Package className="w-5 h-5" />
                  <span>Categories</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="text-black dark:text-white flex items-center gap-2"
                  onClick={() => handleNavigate("/flash-sale")}
                >
                  <BadgePercent className="w-5 h-5" />
                  <span>Flash Sale</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="text-black dark:text-white flex items-center gap-2"
                  onClick={() => handleNavigate("/wishlist")}
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="text-black dark:text-white flex items-center gap-2"
                  onClick={() => handleNavigate("/wishlist")}
                >
                  <NotepadText className="w-5 h-5" />
                  <span>My Orders</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="text-black dark:text-white flex items-center gap-2"
                  onClick={() => handleNavigate("/account")}
                >
                  <User className="w-5 h-5" />
                  <span>My Account</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="text-black dark:text-white flex items-center gap-2"
                  onClick={() => handleNavigate("/settings")}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </motion.div>

                <div className="flex flex-col gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-medium py-1  rounded"
                    onClick={() => handleNavigate("/login")}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="w-full flex items-center justify-center gap-2 border-2 border-blue-500 text-blue-500 bg-white/50 dark:bg-black dark:text-white backdrop-blur-lg font-medium py-1  rounded"
                    onClick={() => handleNavigate("/register")}
                  >
                    Register
                  </motion.button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="mt-auto py-2 border-t border-b border-black/20 dark:border-white/20 font-poppins">
                <div className="flex flex-row flex-wrap gap-2 text-[11px] text-black dark:text-white">
                  <a
                    href="#"
                    onClick={() => setDrawerOpen(false)}
                    className="hover:text-blue-500 underline"
                  >
                    Terms & Conditions
                    <ArrowUpRight className="w-3 h-3 inline" />
                  </a>
                  <a
                    href="#"
                    onClick={() => setDrawerOpen(false)}
                    className="hover:text-blue-500 underline"
                  >
                    Privacy Policy
                    <ArrowUpRight className="w-3 h-3 inline" />
                  </a>
                </div>
                <div className="flex flex-row flex-wrap gap-2 text-[11px] text-black dark:text-white mt-2 font-poppins">
                  <a
                    href="#"
                    onClick={() => setDrawerOpen(false)}
                    className="hover:text-blue-500 underline"
                  >
                    FAQ
                    <ArrowUpRight className="w-3 h-3 inline" />
                  </a>
                  <a
                    href="#"
                    onClick={() => setDrawerOpen(false)}
                    className="hover:text-blue-500 underline"
                  >
                    Contact Us
                    <ArrowUpRight className="w-3 h-3 inline" />
                  </a>
                  <a
                    href="#"
                    onClick={() => setDrawerOpen(false)}
                    className="hover:text-blue-500 underline"
                  >
                    About Us
                    <ArrowUpRight className="w-3 h-3 inline" />
                  </a>
                </div>
              </div>

              {/* Links */}
              <div className="flex justify-between items-center pt-2">
                {/* Source */}
                <div
                  onClick={() => (window.location.href = "https://github.com")}
                  className="flex items-center gap-1 text-xs text-black dark:text-white font-poppins hover:text-blue-500"
                >
                  <a href="https://github.com/loopcart/loopcart">View Source</a>
                  <SquareArrowOutUpRight className="w-3 h-3" />
                </div>
                {/* Social */}
                <div className="text-black dark:text-white flex items-center gap-2">
                  <a
                    href="#"
                    className="hover:text-blue-500"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <FaXTwitter className="w-3 h-3" />
                  </a>
                  <a
                    href="#"
                    className="hover:text-blue-500"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <FaLinkedin className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
        {notificationOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed top-0 right-0 z-50 w-full max-w-[400px] h-screen sm:h-4/5 bg-white dark:bg-black border-l border-b border-gray-300 dark:border-gray-600"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="shrink-0 h-16 flex items-center justify-between px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                <h1 className="text-black dark:text-white text-lg font-poppins font-semibold">
                  LoopCart <span className="text-blue-500">Bell </span>
                  <BellRing className="text-blue-500 inline h-5 w-5" />
                </h1>
                <button onClick={() => setNotificationOpen(false)}>
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Notification Content */}
              <div
                className="flex flex-col flex-1 gap-4 p-4 overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
              >
                {/* Actions */}
                <div className="flex items-center justify-around border-b border-gray-300 dark:border-gray-600 font-rubik pb-4 gap-4">
                  <div className="py-1 px-4 flex justify-center items-center gap-2 bg-black/85 dark:bg-white/90 text-white dark:text-black rounded text-sm font-medium cursor-pointer">
                    <CheckCheck className="h-4 w-4" />
                    <p>Mark As Read</p>
                  </div>
                  <div className="h-full w-[2px] bg-gray-200/95 dark:bg-gray-600/95 rounded text-sm font-medium" />
                  <div
                    onClick={() => setNotifications([])}
                    className="py-1 px-4 flex justify-center items-center gap-2 bg-rose-500 text-white rounded text-sm font-medium cursor-pointer"
                  >
                    <Trash className="h-4 w-4" />
                    <p>Delete All</p>
                  </div>
                </div>

                {/* Notifications */}
                {/* If no notification */}
                {notifications.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center flex-1 gap-4 text-center"
                  >
                    <motion.div
                      initial={{ rotate: -10 }}
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                      className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-50 dark:bg-gray-900 shadow-inner"
                    >
                      <BellRing className="w-12 h-12 text-blue-500" />
                    </motion.div>

                    <motion.h1
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-xl font-semibold font-poppins text-gray-700 dark:text-gray-200"
                    >
                      You're all caught up!
                    </motion.h1>

                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="text-sm text-gray-500 font-poppins max-w-xs"
                    >
                      No new notifications at the moment. Check back later for
                      updates.
                    </motion.p>
                  </motion.div>
                )}
                {/* If has notification */}
                {notifications.map((notification, idx) => (
                  <Notification
                    key={idx}
                    notification={notification}
                    setNotificationOpen={setNotificationOpen}
                  />
                ))}
                {/* Skeleton */}
                <SkeletonNotification />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;

const Notification = ({ notification }) => {
  const color = notificationColor(notification.category);
  return (
    <div className="flex items-center flex-row gap-2">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full ${color.bg} ${color.text} relative`}
      >
        {notification.icon}

        {/* Notification dot */}
        {!notification.read && (
          <div
            className={`absolute top-0 right-1 h-3 w-3 bg-rose-500 border-2 border-white dark:border-black rounded-full`}
          />
        )}
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h1 className="text-black dark:text-white text-sm font-medium">
              {notification.title}
            </h1>
            <h6 className="text-black/50 dark:text-white/50 font-poppins text-xs">
              {timeCalc(notification.date)}
            </h6>
          </div>
          <p className="text-xs text-black/50 dark:text-white/70 font-poppins">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );
};
