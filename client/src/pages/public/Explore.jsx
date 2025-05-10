import React, { useState } from "react";
import ProductCard from "../../components/Cards/ProductCard";
import { Check } from "lucide-react";

const dummyProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality over-ear noise cancelling headphones.",
    price: 1290,
    discount: 10,
    rating: 4.6,
    sold: 230,
    image: "/images/headphones.png",
    hasCOD: true,
    hasFreeDelivery: true,
  },
  {
    id: 2,
    name: "Smartphone Pro Max",
    description: "Latest flagship with AMOLED display and 5G.",
    price: 29990,
    discount: 15,
    rating: 4.8,
    sold: 514,
    image: "/images/smartphone.png",
    hasCOD: false,
    hasFreeDelivery: true,
  },
  {
    id: 3,
    name: "Laptop Stand",
    description: "Adjustable aluminum stand for laptops up to 17 inches.",
    price: 450,
    discount: 5,
    rating: 4.4,
    sold: 142,
    image: "/images/laptop-stand.png",
    hasCOD: true,
    hasFreeDelivery: false,
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    description: "Portable speaker with rich bass and long battery life.",
    price: 3279,
    discount: 20,
    rating: 4.7,
    sold: 311,
    image: "/images/speaker.png",
    hasCOD: true,
    hasFreeDelivery: true,
  },
  {
    id: 5,
    name: "USB-C Charger 65W",
    description: "Fast charging adapter for phones and laptops.",
    price: 1025,
    discount: "",
    rating: 4.2,
    sold: 98,
    image: "/images/charger.png",
    hasCOD: true,
    hasFreeDelivery: false,
  },
];

const Explore = () => {
  const [sort, setSort] = useState("sales");
  const [showFreeDelivery, setShowFreeDelivery] = useState(false);
  const [showCOD, setShowCOD] = useState(false);

  const filteredProducts = dummyProducts
    .filter((product) => (showFreeDelivery ? product.hasFreeDelivery : true))
    .filter((product) => (showCOD ? product.hasCOD : true))
    .sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "discount") return b.discount - a.discount;
      if (sort === "sales") return b.sold - a.sold;
      return 0;
    });

  return (
    <div className="min-h-screen bg-white dark:bg-black px-4 py-8 font-poppins">
      <div className="max-w-screen-xl mx-auto">
        {/* Controls Section */}
        <div className="flex justify-between items-center mb-6 gap-4 flex-row sm:flex-nowrap font-poppins">
          {/* Filter Buttons */}
          <div className="flex items-center bg-gradient-to-br from-white to-[#e0e5f3] dark:from-black dark:to-blue-950 text-black dark:text-white rounded-md overflow-hidden w-auto sm:w-auto divide-x divide-gray-300 dark:divide-gray-700">
            <button
              onClick={() => setShowCOD((prev) => !prev)}
              className={`px-4 py-2.5 flex items-center bg-transparent transition duration-200 focus:outline-none text-sm ${
                showCOD
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : ""
              }`}
            >
              COD
            </button>
            <button
              onClick={() => setShowFreeDelivery((prev) => !prev)}
              className={`px-4 py-2.5 flex items-center bg-transparent transition duration-200 focus:outline-none text-sm ${
                showFreeDelivery
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : ""
              }`}
            >
              Free Delivery
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded-md text-sm bg-gradient-to-br text-black dark:text-white from-white to-[#e0e5f3] dark:from-black dark:to-blue-950 outline-none cursor-pointer w-auto sm:w-auto"
          >
            <option value="sales" className="bg-white dark:bg-black">
              Best Selling
            </option>
            <option value="price" className="bg-white dark:bg-black">
              Price
            </option>
            <option value="rating" className="bg-white dark:bg-black">
              Rating
            </option>
            <option value="discount" className="bg-white dark:bg-black">
              Discount
            </option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <p className="text-center mt-12 text-gray-500 dark:text-gray-400">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Explore;
