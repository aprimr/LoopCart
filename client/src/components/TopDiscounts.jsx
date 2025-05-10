import React, { useState, useEffect } from "react";
import ProductCard from "./Cards/ProductCard";
import ProductCardSkeleton from "./Skeletons/ProductCardSkeleton";

const TopDiscounts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Placeholder: Replace this with real API logic
    const data = [
      {
        id: 1,
        name: "PlayStation 5 Console",
        category: "Gaming",
        price: 85000,
        discount: "25",
        rating: 4,
        image: "",
      },
      {
        id: 2,
        name: "iPhone 14 Pro",
        category: "Mobile",
        price: 180000,
        discount: "15",
        rating: 4.8,
        image: "",
      },
      {
        id: 3,
        name: "Nintendo Switch",
        category: "Gaming",
        price: 48000,
        discount: "10",
        rating: 4.3,
        image: "",
      },
      {
        id: 4,
        name: "Dell XPS 13",
        category: "Computers",
        price: 175000,
        discount: "5",
        rating: 4.7,
        image: "",
      },
      {
        id: 5,
        name: "Redmi Note 13",
        category: "Mobile",
        price: 25000,
        discount: "8",
        rating: 4.4,
        image: "",
      },
      {
        id: 6,
        name: "Asus ROG Phone",
        category: "Mobile",
        price: 55000,
        discount: "12",
        rating: 4.6,
        image: "",
      },
    ];

    setProducts(data);
    setLoading(false);
  }, []);

  return (
    <section className="w-full bg-white dark:bg-black py-8 select-none">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 px-2 dark:text-white mb-4 font-poppins">
          Top Discounts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default TopDiscounts;
