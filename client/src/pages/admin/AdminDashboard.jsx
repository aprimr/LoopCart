import { NavLink } from "react-router-dom";
import useUserStore from "../../store/userStore";
import {
  UsersRound,
  ShoppingCart,
  DollarSign,
  Package,
  Wallet,
  Truck,
} from "lucide-react";

function AdminDashboard() {
  const { user } = useUserStore((state) => state);

  return (
    <div className="py-1 px-[1px] sm:px-6 md:px-10 bg-white dark:bg-black min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="mb-6 md:mb-8">
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-200 font-poppins">
          Welcome back, {user.fullName}!
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 font-rubik">
          Dashboard Overview
        </h1>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {/* Total Users */}
        <NavLink
          to="/admin/users"
          className="transition-transform hover:scale-[1.01] ctive:scale-100"
        >
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 flex items-center gap-4">
            <UsersRound className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0" />
            <div className="flex flex-col">
              <p className="text-base sm:text-lg font-medium text-white/80 font-rubik">
                Total Users
              </p>
              <p className="text-2xl sm:text-3xl font-semibold leading-tight tracking-wide font-poppins">
                1,234
              </p>
            </div>
          </div>
        </NavLink>

        {/* Total Orders */}
        <NavLink
          to="/admin/orders"
          className="transition-transform hover:scale-[1.01] active:scale-100"
        >
          <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 flex items-center gap-4">
            <Package className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0" />
            <div className="flex flex-col">
              <p className="text-base sm:text-lg font-medium text-white/80 font-rubik">
                Total Orders
              </p>
              <p className="text-2xl sm:text-3xl font-semibold leading-tight tracking-wide font-poppins">
                567
              </p>
            </div>
          </div>
        </NavLink>

        {/* Revenue */}
        <NavLink
          to="/admin/revenue"
          className="transition-transform hover:scale-[1.01] active:scale-100"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-amber-600 text-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 flex items-center gap-4">
            <Wallet className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0" />
            <div className="flex flex-col">
              <p className="text-base sm:text-lg font-medium text-white/80 font-rubik">
                Revenue
              </p>
              <p className="text-2xl sm:text-3xl font-semibold leading-tight tracking-wide font-poppins">
                $45,678
              </p>
            </div>
          </div>
        </NavLink>

        {/* Products */}
        <NavLink
          to="/admin/products"
          className="transition-transform hover:scale-[1.01] active:scale-100"
        >
          <div className="bg-gradient-to-r from-rose-400 to-pink-600 text-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 flex items-center gap-4">
            <Package className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0" />
            <div className="flex flex-col">
              <p className="text-base sm:text-lg font-medium text-white/80 font-rubik">
                Products
              </p>
              <p className="text-2xl sm:text-3xl font-semibold leading-tight tracking-wide font-poppins">
                89
              </p>
            </div>
          </div>
        </NavLink>
      </section>

      {/* Order Status Overview */}
      <div className="mb-2 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold font-rubik">
          Order Status
        </h2>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6 mb-6">
        {/* New Orders */}
        <div className="rounded-xl p-5 flex items-center gap-4 bg-transparent border-4 border-cyan-500 text-black dark:text-white">
          <UsersRound className="w-8 h-8 flex-shrink-0" />
          <div>
            <p className="text-base font-medium font-rubik">New Orders</p>
            <p className="text-2xl font-semibold font-poppins">120</p>
          </div>
        </div>

        {/* In Transit Orders */}
        <div className="rounded-xl p-5 flex items-center gap-4 bg-transparent border-4 border-blue-400  text-black dark:text-white">
          <Truck className="w-8 h-8 flex-shrink-0" />
          <div>
            <p className="text-base font-medium font-rubik">In Transit</p>
            <p className="text-2xl font-semibold font-poppins">54</p>
          </div>
        </div>

        {/* Delivered Orders */}
        <div className="rounded-xl p-5 flex items-center gap-4 bg-transparent border-4 border-emerald-400 text-black dark:text-white">
          <ShoppingCart className="w-8 h-8 flex-shrink-0" />
          <div>
            <p className="text-base font-medium font-rubik">Delivered</p>
            <p className="text-2xl font-semibold font-poppins">342</p>
          </div>
        </div>

        {/* Cancelled Orders */}
        <div className="rounded-xl p-5 flex items-center gap-4 bg-transparent border-4 border-rose-500 text-black dark:text-white">
          <Package className="w-8 h-8 flex-shrink-0" />
          <div>
            <p className="text-base font-medium font-rubik">Cancelled</p>
            <p className="text-2xl font-semibold font-poppins">27</p>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="rounded-xl p-5 flex items-center gap-4 bg-transparent border-4 border-amber-600  text-black dark:text-white">
          <DollarSign className="w-8 h-8 flex-shrink-0" />
          <div>
            <p className="text-base font-medium font-rubik">Pending</p>
            <p className="text-2xl font-semibold font-poppins">89</p>
          </div>
        </div>

        {/* Shipped Orders */}
        <div className="rounded-xl px-5 flex items-center gap-4 bg-transparent border-4 border-purple-400  text-black dark:text-white">
          <Wallet className="w-8 h-8 flex-shrink-0" />
          <div>
            <p className="text-base font-medium font-rubik">Shipped</p>
            <p className="text-2xl font-semibold font-poppins">76</p>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 font-poppins">
            Recent Activity
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-rubik">
            No recent activity to display.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
