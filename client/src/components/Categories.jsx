import React from "react";
import { Link, NavLink } from "react-router-dom"; // Import Link from react-router-dom
import {
  Smartphone,
  Monitor,
  Shirt,
  Volleyball,
  Sparkles,
  Gamepad,
  BookOpen,
  Sofa,
  Wheat,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    icon: Monitor,
    path: "/categories/electronics",
  },
  { id: 2, name: "Mobiles", icon: Smartphone, path: "/categories/mobiles" },
  { id: 3, name: "Fashion", icon: Shirt, path: "/categories/fashion" },
  {
    id: 4,
    name: "Groceries",
    icon: Wheat,
    path: "/categories/groceries",
  },
  { id: 5, name: "Sports", icon: Volleyball, path: "/categories/sports" },
  { id: 6, name: "Beauty", icon: Sparkles, path: "/categories/beauty" },
  { id: 7, name: "Games", icon: Gamepad, path: "/categories/games" },
  { id: 8, name: "Books", icon: BookOpen, path: "/categories/books" },
  { id: 9, name: "Furniture", icon: Sofa, path: "/categories/furniture" },
];

function Categories() {
  return (
    <section className="w-full py-4 px-2 bg-white dark:bg-black transition-colors select-none">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 font-poppins">
          Shop by Category
        </h2>
        <div className="flex gap-4 w-full justify-between overflow-x-auto scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <NavLink key={cat.id} to={cat.path}>
                <div
                  className="group flex-shrink-0 w-24 h-24 sm:h-[120px] sm:w-[120px] flex flex-col items-center justify-center rounded-md hover:rounded-xl 
                  bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 
                  shadow-sm hover:shadow-md transition-all 
                  text-gray-700 dark:text-gray-200"
                >
                  <div className="mb-2 bg-gradient-to-br from-cyan-500 via-blue-400 to-blue-500 text-white p-3 rounded-full group-hover:rotate-6 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="text-xs sm:text-sm text-center font-medium font-rubik">
                    {cat.name}
                  </span>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;
