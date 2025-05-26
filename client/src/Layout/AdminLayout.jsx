import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      <AdminSidebar />
      <main className="flex-1 p-6 ml-20">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
