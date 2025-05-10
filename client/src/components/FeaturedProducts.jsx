import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./Cards/ProductCard";
import ProductCardSkeleton from "./Skeletons/ProductCardSkeleton";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "PlayStation 5 Console",
      description: "Next-gen Sony gaming console",
      category: "Gaming",
      price: 85000,
      discount: "25",
      rating: 4,
      sold: 100,
      image: "",
      hasCOD: true,
      hasFreeDelivery: true,
    },
    {
      id: 2,
      name: "Nintendo Switch",
      description: "Portable gaming console",
      category: "Gaming",
      price: 48000,
      discount: "10",
      rating: 4.3,
      sold: 80,
      image: "",
      hasCOD: true,
      hasFreeDelivery: true,
    },

    // 2. Computers
    {
      id: 3,
      name: "MacBook Pro 16”",
      description: "Apple’s high-performance laptop",
      category: "Computers",
      price: 390000,
      discount: null,
      rating: 5,
      sold: 50,
      image: "",
      hasCOD: false,
      hasFreeDelivery: true,
    },
    {
      id: 4,
      name: "Dell XPS 13",
      description: "Compact and powerful laptop",
      category: "Computers",
      price: 175000,
      discount: "5",
      rating: 4.7,
      sold: 65,
      image: "",
      hasCOD: false,
      hasFreeDelivery: true,
    },

    // 3. Mobile
    {
      id: 5,
      name: "Samsung Galaxy S22",
      description: "Latest Samsung flagship smartphone",
      category: "Mobile",
      price: 130000,
      discount: null,
      rating: 4.5,
      sold: 120,
      image: "",
      hasCOD: true,
      hasFreeDelivery: false,
    },
    {
      id: 6,
      name: "iPhone 14 Pro",
      description: "Apple's latest smartphone",
      category: "Mobile",
      price: 180000,
      discount: "15",
      rating: 4.8,
      sold: 200,
      image: "",
      hasCOD: true,
      hasFreeDelivery: true,
    },
  ]);

  const navigate = useNavigate();

  return (
    <section className="w-full bg-white dark:bg-black py-8 select-none">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="w-full justify-center text-2xl font-semibold text-gray-800 px-2 dark:text-white mb-4 font-poppins">
          Featured Products
        </h2>
        <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {loading ? (
            <>
              <ProductsSkeletonComponent />
            </>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                data={product}
                className="bg-gradient-to-tr dark:bg-gradient-to-b from-[#f5f7f8] to-[#cfdef3] dark:from-[#243b55] dark:via-[#1d3046] dark:to-[#141e30]"
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

const ProductsSkeletonComponent = () => {
  const skeletonCount = 6;

  return (
    <>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  );
};
