import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./Cards/ProductCard";
import ProductCardSkeleton from "./Skeletons/ProductCardSkeleton";
import { useNavigate } from "react-router-dom";

const PopularProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "PlayStation 5 Console",
      description: "Next-gen Sony gaming console",
      category: "Gaming",
      price: 85000,
      discount: null,
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
      discount: "0",
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
    {
      id: 11,
      name: "PlayStation 5 Console",
      description: "Next-gen Sony gaming console",
      category: "Gaming",
      price: 85000,
      discount: null,
      rating: 4,
      sold: 100,
      image: "",
      hasCOD: true,
      hasFreeDelivery: true,
    },
    {
      id: 12,
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
      id: 13,
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
      id: 14,
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
      id: 15,
      name: "Samsung Galaxy S22",
      description: "Latest Samsung flagship smartphone",
      category: "Mobile",
      price: 130000,
      discount: "0",
      rating: 4.5,
      sold: 120,
      image: "",
      hasCOD: true,
      hasFreeDelivery: false,
    },
    {
      id: 16,
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
    <section className="w-full bg-white dark:bg-black py-8">
      <div className="max-w-screen-xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 px-2 dark:text-white mb-4 font-poppins">
            Popular Products
          </h2>
        </div>

        <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {loading ? (
            <>
              <ProductsSkeletonComponent />
            </>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0.9, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileTap={{ scale: 0.9 }}
          className="flex justify-center mt-4"
        >
          <button
            onClick={() => navigate("/products")}
            className="px-4 py-2 text-sm font-medium border-2 text-black dark:text-gray-200 border-gray-600 dark:border-gray-600"
          >
            Explore More
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularProducts;

const ProductsSkeletonComponent = () => {
  const skeletonCount = 6; // Match number of columns in lg:grid-cols-6

  return (
    <>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  );
};
