import { useState } from "react";
import { NavLink } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { imgToBase64 } from "../../utils/imgToBase64";
import {
  UsersRound,
  Package,
  Wallet,
  Truck,
  PackagePlus,
  PackageCheck,
  PackageX,
  ClockAlert,
  Image,
  UploadCloud,
  Trash2,
  Edit3,
  X,
} from "lucide-react";
import ps5 from "../../assets/images/ps5.png";

function AdminDashboard() {
  const { user } = useUserStore((state) => state);
  const [image1, setImage1] = useState(null); // cover image
  const [image2, setImage2] = useState(null); // cover image
  const [image3, setImage3] = useState(null); // card image

  const slides = [
    {
      id: "1",
      title: "New Collection Drop",
      tag: "trending",
      category: ["Fashion", "Summer"],
      image: "https://via.placeholder.com/300x300.png?text=Slide+1",
      detailsPath: "/collections/new",
    },
    {
      id: "2",
      title: "Mega Sale Week",
      tag: "sale",
      category: ["Deals", "Electronics"],
      image: "https://via.placeholder.com/300x300.png?text=Slide+2",
      detailsPath: "/sales/week",
    },
    {
      id: "3",
      title: "Winter Clearance",
      tag: "clearance",
      category: ["Winter", "Clothing"],
      image: "https://via.placeholder.com/300x300.png?text=Slide+3",
      detailsPath: "/winter/clearance",
    },
    {
      id: "4",
      title: "Winter Clearance",
      tag: "clearance",
      category: ["Winter", "Clothing"],
      image: "https://via.placeholder.com/300x300.png?text=Slide+3",
      detailsPath: "/winter/clearance",
    },
  ];

  const handleImageChange = async (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await imgToBase64(file);
      setImage(base64);
    }
  };

  return (
    <div className="py-1 sm:px-6 md:px-10 bg-white dark:bg-black min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="mb-6 md:mb-8">
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-poppins">
          Welcome back, {user.fullName}!
        </p>
        <h1 className="text-4xl font-bold mb-1 sm:mb-2 font-rubik">
          Dashboard Overview
        </h1>
      </header>
      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <NavLink
          to="/admin/users"
          className="transition-transform hover:scale-[1.01] active:scale-100"
        >
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <UsersRound className="w-8 h-8 sm:w-12 sm:h-12" />
            <div className="flex flex-col">
              <p className="text-lg font-medium text-white/80 font-rubik">
                Total Users
              </p>
              <p className="text-3xl font-semibold font-poppins">1,234</p>
            </div>
          </div>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className="transition-transform hover:scale-[1.01] active:scale-100"
        >
          <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <Package className="w-8 h-8 sm:w-12 sm:h-12" />
            <div className="flex flex-col">
              <p className="text-lg font-medium text-white/80 font-rubik">
                Total Orders
              </p>
              <p className="text-3xl font-semibold font-poppins">567</p>
            </div>
          </div>
        </NavLink>

        <NavLink
          to="/admin/revenue"
          className="transition-transform hover:scale-[1.01] active:scale-100"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-amber-600 text-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <Wallet className="w-8 h-8 sm:w-12 sm:h-12" />
            <div className="flex flex-col">
              <p className="text-lg font-medium text-white/80 font-rubik">
                Total Sales
              </p>
              <p className="text-3xl font-semibold font-poppins">रु 45,678</p>
            </div>
          </div>
        </NavLink>

        <NavLink
          to="/admin/products"
          className="transition-transform hover:scale-[1.01] active:scale-100"
        >
          <div className="bg-gradient-to-r from-rose-400 to-pink-600 text-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <Package className="w-8 h-8 sm:w-12 sm:h-12" />
            <div className="flex flex-col">
              <p className="text-lg font-medium text-white/80 font-rubik">
                Products
              </p>
              <p className="text-3xl font-semibold font-poppins">89</p>
            </div>
          </div>
        </NavLink>
      </section>

      {/* Order Status Overview */}
      <div className="mb-2 sm:mb-4">
        <h2 className="text-2xl sm:text-3xl font-semibold font-rubik">
          Orders Status
        </h2>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-4 sm:gap-6 mb-6">
        <div className="rounded-xl p-5 flex items-center gap-4 border-4 border-cyan-500 bg-transparent text-black dark:text-white">
          <PackagePlus className="w-8 h-8 flex-shrink-0" />
          <div>
            <p className="text-base font-medium font-rubik">New Orders</p>
            <p className="text-2xl font-semibold font-poppins">120</p>
          </div>
        </div>

        <div className="rounded-xl p-5 flex items-center gap-4 border-4 border-blue-400 bg-transparent text-black dark:text-white">
          <Truck className="w-8 h-8 flex-shrink-0" />
          <div>
            <p className="text-base font-medium font-rubik">In Transit</p>
            <p className="text-2xl font-semibold font-poppins">54</p>
          </div>
        </div>

        <div className="rounded-xl p-5 flex items-center gap-4 border-4 border-emerald-400 bg-transparent text-black dark:text-white">
          <PackageCheck className="w-8 h-8 flex-shrink-0" />
          <div>
            <p className="text-base font-medium font-rubik">Delivered</p>
            <p className="text-2xl font-semibold font-poppins">342</p>
          </div>
        </div>

        <div className="rounded-xl p-5 flex items-center gap-4 border-4 border-amber-600 bg-transparent text-black dark:text-white">
          <ClockAlert className="w-8 h-8 flex-shrink-0" />
          <div>
            <p className="text-base font-medium font-rubik">Pending</p>
            <p className="text-2xl font-semibold font-poppins">89</p>
          </div>
        </div>

        <div className="rounded-xl p-5 flex items-center gap-4 border-4 border-rose-500 bg-transparent text-black dark:text-white">
          <PackageX className="w-8 h-8 flex-shrink-0" />
          <div>
            <p className="text-base font-medium font-rubik">Cancelled</p>
            <p className="text-2xl font-semibold font-poppins">27</p>
          </div>
        </div>

        <div className="rounded-xl p-5 flex items-center gap-4 border-4 border-pink-600 bg-transparent text-black dark:text-white">
          <Wallet className="w-8 h-8 flex-shrink-0" />
          <div>
            <p className="text-base font-medium font-rubik">Refunded</p>
            <p className="text-2xl font-semibold font-poppins">89</p>
          </div>
        </div>
      </section>

      {/* Slider */}
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-semibold font-rubik text-gray-800 dark:text-gray-100">
          Slider Component
        </h2>
      </div>

      <section className="bg-gray-100 dark:bg-gray-950 p-4 rounded-lg border border-gray-200 dark:border-gray-800 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Current Slides
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {slides?.map((slide, idx) => (
            <div
              key={idx}
              className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md p-4 flex flex-col sm:flex-row gap-4 items-start min-h-[160px]"
            >
              {/* Floating Action Icons */}
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button className="p-2 bg-black bg-opacity-70 hover:bg-opacity-60 text-white rounded-sm transition">
                  <Edit3 size={16} />
                </button>
                <button className="p-2 bg-rose-600 bg-opacity-70 hover:bg-opacity-60 text-white rounded-sm transition">
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Square Image */}
              <div className="w-28 h-28 flex-shrink-0 rounded-md overflow-hidden">
                <img
                  src={ps5}
                  alt={slide.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info Section */}
              <div className="flex flex-col space-y-2 overflow-hidden">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white truncate">
                  {slide.title}
                </h3>

                <p className="text-sm text-blue-500 truncate">{slide.tag}</p>

                <div className="flex flex-wrap gap-1">
                  {slide.category.map((cat, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-400 break-all">
                  <span className="text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                    {slide.detailsPath}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add slides section */}
      <section className="bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-800 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Add New Slides
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {/* Left: Square Image Upload */}
          <div className="flex-shrink-0 aspect-square w-full md:max-w-[300px]">
            {!image3 ? (
              <div className="w-full h-full flex flex-col justify-center items-center border border-dashed border-gray-300 dark:border-gray-800 rounded-sm bg-gray-50 dark:bg-gray-900 p-4">
                <Image size={36} className="text-gray-400 mb-2" />
                <p className="text-xs text-gray-500 mb-2">No image selected</p>

                <label
                  htmlFor="slide-image"
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-sm cursor-pointer hover:bg-blue-700 transition"
                >
                  <UploadCloud size={14} />
                  Upload
                </label>

                <input
                  id="slide-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setImage3)}
                />
              </div>
            ) : (
              <div className="relative w-full h-full ">
                <img
                  src={image3}
                  alt="Slide Image"
                  class
                  Name="w-full h-full object-cover rounded-sm"
                />
                <button
                  onClick={() => setImage3(null)}
                  className="absolute top-2 right-2 p-2 bg-black bg-opacity-70 hover:bg-opacity-60 text-white rounded-sm transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Right: Inputs Without Labels */}
          <div className="flex-1 flex flex-col gap-4">
            <textarea
              type="text"
              rows={3}
              maxLength={40}
              placeholder="Slide Title"
              className="w-full px-3 py-2 text-sm rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />

            <input
              maxLength={50}
              placeholder="Slide Subtitle"
              className="w-full px-3 py-2 text-sm rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            ></input>

            <input
              type="text"
              placeholder="Slide Tags"
              className="w-full px-3 py-2 text-sm rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />

            <input
              type="text"
              placeholder="Slide Link"
              className="w-full px-3 py-2 text-sm rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />

            <div className="flex justify-end pt-2">
              <button className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition">
                Add Slide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HomePage Covers */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold font-rubik mb-6 text-gray-900 dark:text-gray-100">
          HomePage Covers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Image Uploader 1 */}
          <div className="relative w-full flex flex-col items-center bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-sm p-4">
            {image1 ? (
              <div className="relative w-full h-40 sm:h-48 rounded-sm overflow-hidden shadow-md">
                <img
                  src={image1}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setImage1(null)}
                  className="absolute top-2 right-2 p-2 bg-black bg-opacity-70 hover:bg-opacity-60 text-white rounded-sm transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div className="w-full h-40 sm:h-48 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-sm relative">
                <Image size={36} className="mb-2" />
                <p className="text-xs sm:text-sm mb-2">No image selected</p>
                <label
                  htmlFor="cover1"
                  className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium cursor-pointer text-blue-600 dark:text-blue-400 border border-blue-500 dark:border-blue-400 rounded-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                >
                  <UploadCloud size={16} />
                  Upload Cover Image 1
                </label>
              </div>
            )}
            <input
              id="cover1"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, setImage1)}
            />
          </div>

          {/* Image Uploader 2 */}
          <div className="relative w-full flex flex-col items-center bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-sm p-4">
            {image2 ? (
              <div className="relative w-full h-40 sm:h-48 rounded-sm overflow-hidden shadow-md">
                <img
                  src={image2}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setImage2(null)}
                  className="absolute top-2 right-2 p-2 bg-black bg-opacity-70 hover:bg-opacity-60 text-white rounded-sm transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div className="w-full h-40 sm:h-48 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-sm relative">
                <Image size={36} className="mb-2" />
                <p className="text-xs sm:text-sm mb-2">No image selected</p>
                <label
                  htmlFor="cover2"
                  className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium cursor-pointer text-blue-600 dark:text-blue-400 border border-blue-500 dark:border-blue-400 rounded-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                >
                  <UploadCloud size={16} />
                  Upload Cover Image 2
                </label>
              </div>
            )}
            <input
              id="cover2"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, setImage2)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
