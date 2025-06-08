import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  BadgeDollarSign,
  Layers,
  Wallet,
  Users,
  Star,
  MessageCircle,
  Settings,
  Home,
  Tag,
  TicketPercent,
} from "lucide-react";
import useUserState from "../store/userStore";

const AdminSidebar = () => {
  const { user } = useUserState((state) => state);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5 md:w-7 md:h-7" />,
      path: "/admin/dashboard",
    },
    {
      name: "Orders",
      icon: <ClipboardList className="w-5 h-5 md:w-7 md:h-7" />,
      path: "/admin/orders",
    },
    {
      name: "Products",
      icon: <Package className="w-5 h-5 md:w-7 md:h-7" />,
      path: "/admin/products",
    },
    {
      name: "Sales",
      icon: <BadgeDollarSign className="w-5 h-5 md:w-7 md:h-7" />,
      path: "/admin/sales",
    },
    {
      name: "Users",
      icon: <Users className="w-5 h-5 md:w-7 md:h-7" />,
      path: "/admin/users",
    },
    {
      name: "Coupons",
      icon: <TicketPercent className="w-5 h-5 md:w-7 md:h-7" />,
      path: "/admin/coupons",
    },
    {
      name: "Reviews",
      icon: <Star className="w-5 h-5 md:w-7 md:h-7" />,
      path: "/admin/reviews",
    },
    {
      name: "Feedback",
      icon: <MessageCircle className="w-5 h-5 md:w-7 md:h-7" />,
      path: "/admin/feedback",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5 md:w-7 md:h-7" />,
      path: "/settings",
    },
  ];

  return (
    <div className="h-screen flex flex-col p-3 fixed top-0 left-0 border-r shadow-lg z-50 w-16 md:w-20 pt-6 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-700 dark:text-gray-300">
      <div className="flex items-center justify-center mb-6 md:mb-8">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-10 h-10 md:w-12 md:h-12 border-2 border-blue-500 rounded-full object-cover cursor-pointer"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col overflow-scroll gap-3 md:gap-3">
        {menuItems.map(({ name, icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `group relative flex justify-center items-center p-2 md:p-3 rounded-lg transition-colors
              ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-950 hover:text-blue-500 hover:dark:text-gray-300"
              }`
            }
          >
            {icon}
            {/* Tooltip */}
            <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 rounded  bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-black/10 dark:border-gray-700/50 text-black dark:text-white px-3 py-1 text-sm font-medium opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 select-none ">
              {name}
            </span>
          </NavLink>
        ))}

        {/* Back to homepage only on mobile */}
        <div className="flex flex-col items-center sm:hidden border-t border-gray-200 dark:border-gray-700 pt-3">
          <NavLink
            to="/"
            className="group relative flex justify-center items-center p-2 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-950 hover:text-blue-500 hover:dark:text-gray-300"
            tabIndex={0}
          >
            <Home className="w-5 h-5" />
          </NavLink>
        </div>
      </nav>

      {/* Back to homepage */}
      <div className="mt-auto pt-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hidden sm:flex group relative justify-center items-center p-2 md:p-3 rounded-lg transition-colors
            ${
              isActive
                ? "bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-white"
                : "text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-950 hover:text-blue-500 hover:dark:text-gray-300"
            }`
          }
          tabIndex={0}
        >
          <Home className="w-5 h-5 md:w-7 md:h-7" />
          <span
            className="
              absolute left-full top-1/2 transform -translate-y-1/2 ml-5 rounded
              bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
              border border-white/50 dark:border-gray-700/50
              text-black dark:text-white
              px-4 py-1 text-sm font-medium
              opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus-visible:opacity-100
              transition-opacity duration-200
              pointer-events-none whitespace-nowrap
              z-50
              select-none
            "
          >
            Back to homepage
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
