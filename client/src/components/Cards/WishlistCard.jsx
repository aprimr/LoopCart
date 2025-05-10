import React, { useState } from "react";
import { Heart, Star } from "lucide-react";
import { HiOutlineShoppingCart, HiOutlineTrash } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import calcDiscountedPrice from "../../utils/calcDiscountedPrice";

import ps5 from "../../assets/images/ps5.png";

const WishlistCard = ({ data }) => {
  const {
    id,
    name,
    description,
    price,
    discount,
    rating,
    sold,
    image,
    hasCOD,
    hasFreeDelivery,
    isSponsored,
  } = data;

  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => setIsWishlisted(!isWishlisted);

  return (
    <div className="bg-white dark:bg-black transition duration-300 rounded-md w-full max-w-screen-xl p-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
      {/* Image Section */}
      <div className="relative w-full md:w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden group">
        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-2 right-2 p-1 text-gray-600 dark:text-white z-10 ${
            isWishlisted ? "text-rose-500" : "hover:text-rose-500"
          }`}
        >
          <Heart size={18} />
        </button>

        {/* Product Image */}
        <NavLink to={`/product/${id}`} className="block w-full h-full">
          <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            {/* Strictly square container */}
            <div className="relative w-full h-0 pb-[100%]">
              <img
                src={ps5}
                alt={name}
                loading="lazy"
                className="object-cover w-full h-full absolute top-0 left-0"
              />
            </div>
          </div>
        </NavLink>
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between w-full md:w-2/3 space-y-4">
        {/* Product Name */}
        <NavLink
          to={`/product/${id}`}
          className="text-lg font-semibold text-gray-800 dark:text-white truncate"
        >
          {name}
        </NavLink>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate overflow-hidden">
          {description}
        </p>

        {/* Rating & Sold */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star fill="currentColor" size={16} />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {rating}
            </span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {sold} sold
          </span>
        </div>

        {/* Price and Discount */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ₹ {calcDiscountedPrice(price, discount)}
            </span>
            {discount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 rounded bg-rose-100/80 dark:bg-rose-400/20 text-xs text-rose-500 dark:text-rose-500 font-normal">
                -{discount}%
              </span>
            )}
          </div>
          <button className="px-3 py-1 bg-black text-white text-xs rounded-md flex items-center space-x-2">
            {/* Add to Cart Icon */}
            <HiOutlineShoppingCart className="w-4 h-4" />
            <span className="hidden lg:block">Add to Cart</span>

            {/* Delete Icon (Visible on smaller screens) */}
            <span className="lg:hidden">
              <HiOutlineTrash className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
