import React from "react";
import { NavLink } from "react-router-dom";

import { Heart, Star, Flame, FlameIcon } from "lucide-react";
import { HiOutlineSpeakerphone } from "react-icons/hi";

import ps5 from "../../assets/images/ps5.png";
import calcDiscountedPrice from "../../utils/calcDiscountedPrice";

const ProductCard = ({ data, className }) => {
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
  } = data;

  return (
    <div
      className={`bg-white dark:bg-black transition duration-300 rounded-md w-full max-w-xs p-2 flex flex-col justify-between ${className}`}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden group mb-2">
        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 p-1 text-gray-600 dark:text-white z-10">
          <Heart className="hover:text-rose-500" size={16} />
        </button>
        {/* Sponsored Tag */}
        <div
          title="Sponsored"
          className="absolute top-2 left-2 p-1 text-white bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-md z-10"
        >
          <HiOutlineSpeakerphone className="w-4 h-4 -rotate-12" />
        </div>

        {/* Tags */}
        <div className="absolute bottom-2 left-2 flex space-x-2 z-10">
          {hasFreeDelivery && (
            <span className="text-[9px] flex items-center px-2 py-0.5 rounded-sm text-white font-rubik dark:text-black font-medium backdrop-blur-md bg-gradient-to-r from-green-500 to-teal-400 shadow-sm dark:from-green-400 dark:to-teal-300">
              FREE DELIVERY
            </span>
          )}
          {hasCOD && (
            <span className="text-[9px] flex items-center px-2 py-0.5 rounded-sm text-white dark:text-black  font-medium backdrop-blur-md bg-gradient-to-r from-yellow-500 to-orange-400 shadow-md ">
              COD
            </span>
          )}
        </div>

        {/* Product Image */}
        <NavLink to={`/product/${id}`} className="block w-full h-full">
          <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src={ps5}
              alt={name}
              loading="lazy"
              className="object-contain max-h-full max-w-full"
            />
          </div>
        </NavLink>
      </div>

      {/* Product Info */}
      <NavLink to={`/product/${id}`} className="space-y-1 px-1">
        <div className="flex items-center">
          <div className="flex items-center space-x-1 text-xs bg-gradient-to-r from-[#efeff6] via-[#efeff6] to-[#d0d0f1] text-black dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:text-white px-2 rounded-sm">
            <FlameIcon
              fill="currentColor"
              className="w-3 h-3 -rotate-12 text-red-500"
            />
            <span className="font-medium font-rubik">Best Selling</span>
          </div>
        </div>
        <h3 className="text-base font-medium font-rubik text-gray-800 dark:text-white truncate">
          {name}
        </h3>

        <p className="text-sm font-poppins text-gray-500 dark:text-gray-400 truncate">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-between space-x-1 text-yellow-400 font-poppins">
          <div className="flex items-center">
            <Star fill="currentColor" size={14} />
            <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
              {`${rating} (${rating})`}
            </span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {sold} sold
          </span>
        </div>
        {/* Price & Discount percent */}
        <div className="text-blue-600 dark:text-blue-400 flex items-center justify-between font-bold font-rubik">
          <div className="text-sm">
            रु{" "}
            <span className="text-lg">
              {calcDiscountedPrice(price, discount)}
            </span>{" "}
          </div>
          {discount && (
            <span className="ml-2 px-1.5 py-0.5 rounded bg-rose-100/80 dark:bg-rose-600/80 text-xs text-rose-500 dark:text-white font-normal font-poppins">
              -{discount}%
            </span>
          )}
        </div>
      </NavLink>
    </div>
  );
};

export default ProductCard;
