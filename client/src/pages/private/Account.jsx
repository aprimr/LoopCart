import { useEffect, useState } from "react";
import axios from "../../services/axios";
import { toast } from "sonner";
import Loading from "../../components/Loading";
import { ShoppingCart, Heart, Package, CheckCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const Account = () => {
  const [user, setUser] = useState(null);
  // For demo, you can replace these counts with real API data later
  const [counts, setCounts] = useState({
    cart: 3,
    wishlist: 7,
    orders: 5,
    received: 4,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/get-user");
        setUser(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-100 dark:from-black dark:via-gray-900 dark:to-gray-800 font-poppins select-none px-4 py-8 max-w-lg mx-auto">
      {/* Profile Section */}
      <section className="flex flex-col items-center mb-8 bg-white/90 dark:bg-gray-900 p-6 rounded-xl shadow-md">
        <div className="w-28 h-28 rounded-full border-4 border-blue-500 overflow-hidden bg-gray-200 dark:bg-gray-800">
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-blue-500 text-5xl font-bold">
              {user.fullName?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
          {user.fullName}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-2 gap-6 mb-8">
        <NavLink
          to="/cart"
          className="flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <ShoppingCart className="text-blue-500 w-8 h-8 mb-2" />
          <span className="font-semibold text-gray-900 dark:text-white">
            Cart
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {counts.cart} items
          </span>
        </NavLink>

        <NavLink
          to="/wishlist"
          className="flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <Heart className="text-blue-500 w-8 h-8 mb-2" />
          <span className="font-semibold text-gray-900 dark:text-white">
            Wishlist
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {counts.wishlist} items
          </span>
        </NavLink>

        <NavLink
          to="/orders"
          className="flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <Package className="text-blue-500 w-8 h-8 mb-2" />
          <span className="font-semibold text-gray-900 dark:text-white">
            Orders
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {counts.orders} placed
          </span>
        </NavLink>

        <NavLink
          to="/received"
          className="flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <CheckCircle className="text-blue-500 w-8 h-8 mb-2" />
          <span className="font-semibold text-gray-900 dark:text-white">
            Received
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {counts.received} items
          </span>
        </NavLink>
      </section>

      {/* Orders & Received Summary */}
      <section className="bg-white/90 dark:bg-gray-900 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Recent Orders
        </h3>
        {/* Replace with actual order list later */}
        <p className="text-gray-700 dark:text-gray-300">
          You have {counts.orders} orders placed.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-4 text-gray-900 dark:text-white">
          Items Received
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          You have received {counts.received} items.
        </p>
      </section>
    </div>
  );
};

export default Account;
