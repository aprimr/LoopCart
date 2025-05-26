import { useEffect, useState } from "react";
import axios from "../../services/axios";
import { toast } from "sonner";
import Loading from "../../components/Loading";
import { ShoppingCart, Heart, Package, CheckCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Account = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/get-user");
        setUser(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch user");
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen h-full w-full px-2 bg-white dark:bg-black">
      <div className="max-w-screen-xl mx-auto w-full py-8 font-poppins select-none">
        {/* Profile Section */}
        <section className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 bg-white/90 dark:bg-gray-900 p-6 rounded-xl shadow-md">
          <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-blue-500 overflow-hidden bg-gray-200 dark:bg-gray-800 mx-auto sm:mx-0">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-blue-500 text-4xl font-bold">
                {user.fullName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {user.fullName}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
          </div>
        </section>

        {/* Quick Links Row Scrollable on Mobile (No Counts) */}
        <section className="overflow-x-auto">
          <div className="flex gap-4 mb-8 w-max sm:w-full sm:grid sm:grid-cols-4 sm:gap-6">
            <NavLink
              to="/cart"
              className="min-w-[120px] flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <div className="text-blue-500 w-7 h-7 mb-2">
                <ShoppingCart />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                Cart
              </span>
            </NavLink>

            <NavLink
              to="/wishlist"
              className="min-w-[120px] flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <div className="text-blue-500 w-7 h-7 mb-2">
                <Heart />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                Wishlist
              </span>
            </NavLink>

            <NavLink
              to="/orders"
              className="min-w-[120px] flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <div className="text-blue-500 w-7 h-7 mb-2">
                <Package />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                Orders
              </span>
            </NavLink>
            {/* recieved link */}
            <NavLink
              to="/recieved"
              className="min-w-[120px] flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <div className="text-blue-500 w-7 h-7 mb-2">
                <CheckCircle />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                Recieved
              </span>
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Account;
