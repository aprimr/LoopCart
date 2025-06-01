"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Package,
  DollarSign,
  Archive,
  Upload,
  X,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Mobile",
    price: 1299,
    stock: 25,
    description: "Apple flagship phone with A17 chip and titanium design.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Nike Air Max 270",
    category: "Grocery",
    price: 149,
    stock: 50,
    description:
      "Comfortable and stylish running shoes with Air Max technology.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "MacBook Pro M3",
    category: "Electronics",
    price: 2499,
    stock: 10,
    description: "Powerful laptop for professionals with M3 chip.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    category: "Books",
    price: 399,
    stock: 35,
    description: "Premium noise-canceling wireless headphones.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Adidas Ultraboost 22",
    category: "Game",
    price: 189,
    stock: 8,
    description: "High-performance running shoes with Boost technology.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "iPad Pro 12.9",
    category: "Fashion",
    price: 1099,
    stock: 20,
    description: "Professional tablet with M2 chip and Liquid Retina display.",
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const productsPerPage = 6;

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock <= 10).length;

  const openModal = (type, product = null) => {
    setModalType(type);
    const productData = product || {
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: "",
    };
    setModalProduct(productData);
    setImagePreview(productData.image || "");
  };

  const closeModal = () => {
    setModalType(null);
    setModalProduct(null);
    setImagePreview("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
        setModalProduct((prev) => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setModalProduct((prev) => ({ ...prev, image: "" }));
  };

  const handleSave = () => {
    if (!modalProduct.name.trim()) {
      alert("Product name is required");
      return;
    }
    if (!modalProduct.category.trim()) {
      alert("Category is required");
      return;
    }
    if (!modalProduct.price || modalProduct.price <= 0) {
      alert("Valid price is required");
      return;
    }
    if (!modalProduct.stock || modalProduct.stock < 0) {
      alert("Valid stock quantity is required");
      return;
    }

    if (modalType === "edit") {
      setProducts((prev) =>
        prev.map((p) => (p.id === modalProduct.id ? modalProduct : p))
      );
    } else {
      setProducts((prev) => [...prev, { ...modalProduct, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "electronics":
        return "from-indigo-600 to-blue-600";
      case "mobile":
        return "from-rose-600 to-amber-500";
      case "fashion":
        return "from-pink-600 to-rose-500";
      case "grocery":
        return "from-green-600 to-lime-500";
      case "sports":
        return "from-orange-600 to-yellow-500";
      case "beauty":
        return "from-rose-600 to-pink-500";
      case "game":
        return "from-purple-600 to-fuchsia-500";
      case "books":
        return "from-yellow-500 to-amber-500 text-black";
      case "furniture":
        return "from-teal-600 to-emerald-500";
      default:
        return "from-gray-600 to-gray-500";
    }
  };

  const getStockStatus = (stock) => {
    if (stock <= 10)
      return {
        color:
          "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
        text: "Low Stock",
        icon: AlertTriangle,
      };
    if (stock <= 30)
      return {
        color:
          "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
        text: "Medium",
        icon: TrendingUp,
      };
    return {
      color:
        "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
      text: "In Stock",
      icon: CheckCircle,
    };
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-all duration-300">
      <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-4xl font-semibold font-poppins text-gray-900 dark:text-white">
                  Product Management
                </h1>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Products
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {products.length}
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg md:rounded-xl">
                  <Package className="h-4 w-4 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Value
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    ${totalValue.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-green-100 dark:bg-green-900/30 rounded-lg md:rounded-xl">
                  <DollarSign className="h-4 w-4 md:h-6 md:w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                    Low Stock Items
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {lowStockCount}
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-red-100 dark:bg-red-900/30 rounded-lg md:rounded-xl">
                  <AlertTriangle className="h-4 w-4 md:h-6 md:w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8">
          <div className="flex-1">
            <div className="relative max-w-md">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white shadow-sm text-sm md:text-base"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => openModal("add")}
              className="inline-flex items-center px-4 md:px-6 py-2.5 md:py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm md:text-base"
            >
              <Plus className="h-4 w-4 md:h-5 md:w-5 mr-1.5 md:mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            const StockIcon = stockStatus.icon;

            return (
              <div
                key={product.id}
                className="group bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden transform hover:scale-[1.02]"
              >
                <div className="p-3 sm:p-4 md:p-6">
                  {/* Product Image */}
                  <div className="relative mb-3 md:mb-4">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg md:rounded-xl overflow-hidden">
                      <img
                        src={
                          product.image ||
                          "/placeholder.svg?height=200&width=200"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-2 md:top-3 right-2 md:right-3 flex gap-1 md:gap-2">
                      <button
                        onClick={() => openModal("edit", product)}
                        className="p-1.5 md:p-2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 shadow-lg rounded-md md:rounded-lg transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 sm:transform sm:translate-y-2 sm:group-hover:translate-y-0"
                      >
                        <Edit2 className="h-3 w-3 md:h-4 md:w-4 text-gray-700 dark:text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 md:p-2 bg-red-500/90 hover:bg-red-600 shadow-lg rounded-md md:rounded-lg transition-all duration-200 text-white sm:opacity-0 sm:group-hover:opacity-100 opacity-100 sm:transform sm:translate-y-2 sm:group-hover:translate-y-0"
                      >
                        <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2 md:space-y-3">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base md:text-xl text-gray-900 dark:text-white mb-1.5 md:mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
                        <span
                          className={`inline-flex items-center px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(
                            product.category
                          )} text-white`}
                        >
                          {product.category}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-medium border ${stockStatus.color}`}
                        >
                          <StockIcon className="h-2.5 w-2.5 md:h-3 md:w-3" />
                          {stockStatus.text}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 mb-2 md:mb-4">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-0.5 md:gap-1">
                        <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600 dark:text-green-400" />
                        <span className="font-bold text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white">
                          ${product.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2 text-gray-600 dark:text-gray-400">
                        <Archive className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="text-xs sm:text-sm font-medium">
                          {product.stock} units
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {currentProducts.length === 0 && (
          <div className="text-center py-12 md:py-16">
            <div className="relative mb-4 md:mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-20"></div>
              <div className="relative p-4 md:p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 md:w-24 md:h-24 mx-auto flex items-center justify-center">
                <Package className="h-8 w-8 md:h-12 md:w-12 text-white" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
              Try adjusting your search or add a new product to get started.
            </p>
            <button
              onClick={() => openModal("add")}
              className="inline-flex items-center px-4 md:px-6 py-2.5 md:py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm md:text-base"
            >
              <Plus className="h-4 w-4 md:h-5 md:w-5 mr-1.5 md:mr-2" />
              Add Your First Product
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1 md:gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 md:px-4 py-1.5 md:py-2 text-xs sm:text-sm font-medium rounded-lg md:rounded-xl transition-all duration-200 ${
                  currentPage === i + 1
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Modal */}
        {modalType && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-3 md:p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl w-full max-w-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {modalType === "edit" ? "Edit Product" : "Add New Product"}
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1 md:mt-2">
                  {modalType === "edit"
                    ? "Update your product information"
                    : "Fill in the details for your new product"}
                </p>
              </div>

              <div className="p-4 sm:p-6 md:p-8 space-y-4 md:space-y-8 max-h-96 overflow-y-auto">
                {/* Image Upload Section */}
                <div className="space-y-3 md:space-y-4">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Product Image
                  </label>

                  {imagePreview ? (
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto">
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-1 -right-1 md:-top-2 md:-right-2 p-1.5 md:p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors duration-200"
                      >
                        <X className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto">
                      <div className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl md:rounded-2xl flex flex-col items-center justify-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors relative cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                        <Upload className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mb-2 md:mb-4" />
                        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 text-center px-2 md:px-4">
                          Click to upload image
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 text-center px-2 md:px-4 mt-1">
                          PNG, JPG, GIF up to 5MB
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Product Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={modalProduct?.name || ""}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200 text-sm md:text-base"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Category *
                    </label>
                    <input
                      id="category"
                      name="category"
                      type="text"
                      value={modalProduct?.category || ""}
                      onChange={handleChange}
                      placeholder="e.g., Electronics, Footwear"
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200 text-sm md:text-base"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="price"
                      className="block text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Price ($) *
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={modalProduct?.price || ""}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200 text-sm md:text-base"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="stock"
                      className="block text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Stock Quantity *
                    </label>
                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={modalProduct?.stock || ""}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200 text-sm md:text-base"
                      required
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={modalProduct?.description || ""}
                      onChange={handleChange}
                      placeholder="Enter product description"
                      rows={4}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none transition-all duration-200 text-sm md:text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8 border-t border-gray-200 dark:border-gray-700 flex gap-3 md:gap-4">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg md:rounded-xl transition-colors duration-200 font-medium text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg md:rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm md:text-base"
                >
                  {modalType === "edit" ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
