"use client";

import { useEffect, useState } from "react";
import {
  UsersRound,
  Package,
  Wallet,
  Truck,
  PackagePlus,
  PackageCheck,
  PackageX,
  ClockIcon as ClockAlert,
  Image,
  UploadCloud,
  Trash2,
  Edit3,
  TrendingUp,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import axios from "../../services/axios";
import useDashboardState from "../../store/dashboardStore";

// Mock data and functions
const mockUser = { fullName: "John Admin" };
const mockStats = {
  totalUsers: 1247,
  totalOrders: 856,
  totalSales: 125000,
  totalProducts: 342,
};

function AdminDashboard() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [slideTitle, setSlideTitle] = useState("");
  const [slideSubtitle, setSlideSubtitle] = useState("");
  const [slideTags, setSlideTags] = useState("");
  const [slideLink, setSlideLink] = useState("");

  const { isServerActive, updateServerStatus } = useDashboardState();

  const slides = [
    {
      id: "1",
      title: "New Collection Drop",
      tag: "trending",
      category: ["Fashion", "Summer"],
      image: "/placeholder.svg?height=120&width=120",
      detailsPath: "/collections/new",
    },
    {
      id: "2",
      title: "Mega Sale Week",
      tag: "sale",
      category: ["Deals", "Electronics"],
      image: "/placeholder.svg?height=120&width=120",
      detailsPath: "/sales/week",
    },
    {
      id: "3",
      title: "Winter Clearance",
      tag: "clearance",
      category: ["Winter", "Clothing"],
      image: "/placeholder.svg?height=120&width=120",
      detailsPath: "/winter/clearance",
    },
    {
      id: "4",
      title: "Spring Collection",
      tag: "new",
      category: ["Spring", "Accessories"],
      image: "/placeholder.svg?height=120&width=120",
      detailsPath: "/spring/collection",
    },
  ];

  const orderStats = [
    {
      label: "New Orders",
      value: 120,
      icon: PackagePlus,
      color: "bg-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "In Transit",
      value: 54,
      icon: Truck,
      color: "bg-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      label: "Delivered",
      value: 342,
      icon: PackageCheck,
      color: "bg-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      label: "Pending",
      value: 89,
      icon: ClockAlert,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      label: "Cancelled",
      value: 27,
      icon: PackageX,
      color: "bg-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
    {
      label: "Refunded",
      value: 15,
      icon: Wallet,
      color: "bg-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  useEffect(() => {
    const serverStatus = async () => {
      try {
        axios.get("/keep-alive").then((res) => {
          res.status === 200 && updateServerStatus(true);
        });
      } catch (error) {
        updateServerStatus(false);
      }
    };

    // Call the serverStatus function
    serverStatus();
  }, []);

  const handleImageChange = async (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSlide = () => {
    if (!slideTitle.trim()) {
      alert("Please enter a slide title");
      return;
    }
    // Add slide logic here
    console.log("Adding slide:", {
      slideTitle,
      slideSubtitle,
      slideTags,
      slideLink,
      image3,
    });

    // Reset form
    setSlideTitle("");
    setSlideSubtitle("");
    setSlideTags("");
    setSlideLink("");
    setImage3(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="w-full mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6">
        {/* Header */}
        <header className="mb-6">
          <div className="flex gap-2 flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-1">
                Welcome back, {mockUser.fullName}!
              </p>
              <h1 className="text-4xl font-semibold font-poppins text-gray-900 dark:text-white">
                Dashboard Overview
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {isServerActive ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">
                    Server Online
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
                  <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-rose-700 dark:text-rose-300">
                    Server Offline
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6">
          <div className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-md sm:shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="p-2 md:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg md:rounded-xl">
                <UsersRound className="w-4 h-4 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
                Total Users
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {mockStats.totalUsers.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-1 md:mt-2">
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                <span className="text-xs md:text-sm text-green-600 dark:text-green-400">
                  +12% from last month
                </span>
              </div>
            </div>
          </div>

          <div className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-md sm:shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="p-2 md:p-3 bg-green-100 dark:bg-green-900/30 rounded-lg md:rounded-xl">
                <Package className="w-4 h-4 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
              </div>
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
                Total Orders
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {mockStats.totalOrders.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-1 md:mt-2">
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                <span className="text-xs md:text-sm text-green-600 dark:text-green-400">
                  +8% from last month
                </span>
              </div>
            </div>
          </div>

          <div className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-md sm:shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="p-2 md:p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg md:rounded-xl">
                <Wallet className="w-4 h-4 md:w-6 md:h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
                Total Sales
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                रु {mockStats.totalSales.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-1 md:mt-2">
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                <span className="text-xs md:text-sm text-green-600 dark:text-green-400">
                  +15% from last month
                </span>
              </div>
            </div>
          </div>

          <div className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-md sm:shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="p-2 md:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg md:rounded-xl">
                <Package className="w-4 h-4 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
                Products
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {mockStats.totalProducts.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-1 md:mt-2">
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                <span className="text-xs md:text-sm text-green-600 dark:text-green-400">
                  +5% from last month
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Order Status Overview */}
        <section className="mb-6">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
              Order Status Overview
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Track your order fulfillment progress
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {orderStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className={`${stat.bgColor} rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-gray-200 dark:border-gray-700`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 sm:p-2 ${stat.color} rounded-lg`}>
                      <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
                      {stat.label}
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Current Slides */}
        <section className="mb-6">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
              Slider Management
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Manage your homepage slider content
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-md sm:shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Current Slides
              </h3>
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-medium">
                {slides.length} slides
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className="group bg-gray-50 dark:bg-gray-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={slide.image || "/placeholder.svg"}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1 sm:mb-2">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
                          {slide.title}
                        </h4>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 sm:p-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md sm:rounded-lg transition-colors">
                            <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                          <button className="p-1 sm:p-1.5 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-md sm:rounded-lg transition-colors">
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                          {slide.tag}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-1 sm:mb-2">
                        {slide.category.map((cat, index) => (
                          <span
                            key={index}
                            className="px-1.5 py-0.5 sm:px-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {slide.detailsPath}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add New Slide */}
        <section className="mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-md sm:shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Add New Slide
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Image Upload */}
              <div className="md:col-span-1">
                {!image3 ? (
                  <div className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Image className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 px-2 text-center">
                      Upload slide image
                    </p>
                    <label className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md sm:rounded-lg cursor-pointer transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <UploadCloud className="w-3 h-3 sm:w-4 sm:h-4" />
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, setImage3)}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden">
                    <img
                      src={image3 || "/placeholder.svg"}
                      alt="Slide preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setImage3(null)}
                      className="absolute top-2 right-2 p-1.5 sm:p-2 bg-red-500 hover:bg-red-600 text-white rounded-md sm:rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="md:col-span-2 space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Slide Title
                  </label>
                  <textarea
                    rows={2}
                    maxLength={40}
                    value={slideTitle}
                    onChange={(e) => setSlideTitle(e.target.value)}
                    placeholder="Enter slide title"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Subtitle
                  </label>
                  <input
                    maxLength={50}
                    value={slideSubtitle}
                    onChange={(e) => setSlideSubtitle(e.target.value)}
                    placeholder="Enter slide subtitle"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Tags
                  </label>
                  <input
                    value={slideTags}
                    onChange={(e) => setSlideTags(e.target.value)}
                    placeholder="Enter tags (comma separated)"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Link URL
                  </label>
                  <input
                    value={slideLink}
                    onChange={(e) => setSlideLink(e.target.value)}
                    placeholder="Enter destination URL"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                </div>

                <div className="flex justify-end pt-2 sm:pt-4">
                  <button
                    onClick={handleAddSlide}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg sm:rounded-xl transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    Add Slide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Homepage Covers */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
              Homepage Covers
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Upload and manage your homepage cover images
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Cover Image 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-md sm:shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Cover Image 1
              </h3>
              {image1 ? (
                <div className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden">
                  <img
                    src={image1 || "/placeholder.svg"}
                    alt="Cover 1"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setImage1(null)}
                    className="absolute top-2 right-2 p-1.5 sm:p-2 bg-red-500 hover:bg-red-600 text-white rounded-md sm:rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              ) : (
                <div className="aspect-video border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Image className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400 mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 px-2 text-center">
                    Upload cover image
                  </p>
                  <label className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md sm:rounded-lg cursor-pointer transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                    <UploadCloud className="w-3 h-3 sm:w-4 sm:h-4" />
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, setImage1)}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Cover Image 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-md sm:shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Cover Image 2
              </h3>
              {image2 ? (
                <div className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden">
                  <img
                    src={image2 || "/placeholder.svg"}
                    alt="Cover 2"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setImage2(null)}
                    className="absolute top-2 right-2 p-1.5 sm:p-2 bg-red-500 hover:bg-red-600 text-white rounded-md sm:rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              ) : (
                <div className="aspect-video border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Image className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400 mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 px-2 text-center">
                    Upload cover image
                  </p>
                  <label className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md sm:rounded-lg cursor-pointer transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                    <UploadCloud className="w-3 h-3 sm:w-4 sm:h-4" />
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, setImage2)}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
