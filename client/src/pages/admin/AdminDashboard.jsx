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
  X,
  Upload,
  Loader2,
  Dot,
  Power,
  ExternalLink,
  Link2,
} from "lucide-react";
import { toast } from "sonner";
import axios from "../../services/axios";
import useDashboardState from "../../store/dashboardStore";
import useUserState from "../../store/userStore";

// Mock data and functions
const mockStats = {
  totalUsers: 1247,
  totalOrders: 856,
  totalSales: 125000,
  totalProducts: 342,
};

function AdminDashboard() {
  const user = useUserState((state) => state.user);

  const [isAddSlideOpen, setIsAddSlideOpen] = useState(false);
  const [addSlideLoading, setAddSlideLoading] = useState(false);

  const [slides, setSlides] = useState([]);

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [slideTitle, setSlideTitle] = useState("");
  const [slideSubtitle, setSlideSubtitle] = useState("");
  const [slideTags, setSlideTags] = useState("");
  const [slideLink, setSlideLink] = useState("");

  const { isServerActive, updateServerStatus } = useDashboardState();

  // const slides = [
  //   {
  //     id: "1",
  //     title: "New Collection Drop",
  //     tag: "trending",
  //     category: ["Fashion", "Summer"],
  //     image: "/placeholder.svg?height=120&width=120",
  //     detailsPath: "/collections/new",
  //   },
  //   {
  //     id: "2",
  //     title: "Mega Sale Week",
  //     tag: "sale",
  //     category: ["Deals", "Electronics"],
  //     image: "/placeholder.svg?height=120&width=120",
  //     detailsPath: "/sales/week",
  //   },
  //   {
  //     id: "3",
  //     title: "Winter Clearance",
  //     tag: "clearance",
  //     category: ["Winter", "Clothing"],
  //     image: "/placeholder.svg?height=120&width=120",
  //     detailsPath: "/winter/clearance",
  //   },
  //   {
  //     id: "4",
  //     title: "Spring Collection",
  //     tag: "new",
  //     category: ["Spring", "Accessories"],
  //     image: "/placeholder.svg?height=120&width=120",
  //     detailsPath: "/spring/collection",
  //   },
  // ];

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
    console.log(slides);
    const serverStatus = async () => {
      try {
        axios.get("/keep-alive").then((res) => {
          res.status === 200 && updateServerStatus(true);
        });
      } catch (error) {
        updateServerStatus(false);
      }
    };

    const fetchSlides = async () => {
      try {
        const res = await axios.get("/dashboard/slides");
        if (res.data) {
          setSlides(res.data);
        }
        console.log(res.data);
      } catch (error) {
        toast.error("Failed to fetch slides");
      }
    };

    // Call function
    serverStatus();
    fetchSlides();
  }, []);

  const handleImageChange = async (e, setImage) => {
    const file = e.target.files[0];

    // limit file size
    if (file.size > 200 * 1024) {
      console.log("size limit");
      return toast.error("File size must be less than 200 KB");
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseAddSlide = () => {
    setIsAddSlideOpen(false);
    setImage3("");
    setSlideTitle("");
    setSlideSubtitle("");
    setSlideTags("");
    setSlideLink("");
  };

  const handleAddSlide = async () => {
    if (!slideTitle || !slideSubtitle || !slideTags || !slideLink || !image3) {
      return toast.error("Please fill all the fields");
    }
    setAddSlideLoading(true);

    try {
      // extract item from tags and limit t0 2 items
      const tags = slideTags.split(",").slice(0, 2);
      const slideTag = tags.map((tag) => tag.trim());

      const res = await axios.post("/dashboard/new-slide", {
        slideTitle,
        slideSubtitle,
        slideTag,
        slideLink,
        slideImage: image3,
      });

      if (res.status === 200) {
        toast.success("Slide added successfully");
        setSlides([...slides, res.data]);
      }

      setAddSlideLoading(false);
      setIsAddSlideOpen(false);
    } catch (error) {
      toast.error("Failed to add slide");
      setAddSlideLoading(false);
    }

    // Reset form
    setSlideTitle("");
    setSlideSubtitle("");
    setSlideTags("");
    setSlideLink("");
    setImage3(null);
  };

  const handleDeleteSlide = async (id) => {
    try {
      const res = await axios.delete(`/dashboard/slide/${id}`);
      if (res.status === 200) {
        toast.success("Slide deleted successfully");
        setSlides(slides.filter((slide) => slide._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete slide");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black select-none">
      <div className="w-full mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6">
        {/* Header */}
        <header className="mb-6">
          <div className="flex gap-2 flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-1">
                Welcome back, {user.fullName}!
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
          <div className="mb-4 flex items-center flex-wrap justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl  font-bold text-gray-900 dark:text-white mb-2 sm:mb-2">
                Slider Management
              </h2>
            </div>
            <button
              onClick={() => setIsAddSlideOpen(true)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add New Slide
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-md sm:shadow-lg border border-gray-200 dark:border-gray-700">
            {slides.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No Slides Added
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Get started by adding your first slide
                </p>
                <button
                  onClick={() => setIsAddSlideOpen(true)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2 mx-auto text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Slide
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-gray-50 dark:bg-gray-900 rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
                  >
                    {/* Image Container - Always Square */}
                    <div className="aspect-square bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img
                        src={slide.slideImage}
                        alt={slide.slideTitle}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Slide Info */}
                    <div className="p-3 sm:p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-xl sm:text-2xl font-poppins font-semibold text-gray-900 dark:text-white line-clamp-1">
                          {slide.slideTitle}
                        </h4>

                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleDeleteSlide(slide._id)}
                            className="p-1.5 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-sm sm:text-base mb-1 text-gray-900 dark:text-white line-clamp-1">
                        {slide.slideSubtitle}
                      </h4>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {slide.slideTag?.map((item, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 truncate">
                        <Link2 className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{slide.slideLink}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Add Slide Modal */}
        {isAddSlideOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Add New Slide
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Fill in the details for your new slider content
                    </p>
                  </div>
                  <button
                    onClick={handleCloseAddSlide}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="space-y-6 font-poppins">
                  {/* Image Upload */}
                  <div className="text-center">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
                      Slide Image *
                    </label>
                    <div className="w-full max-w-xs mx-auto">
                      {" "}
                      {/* reduced max width */}
                      <div className="w-[200px] h-[200px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center cursor-pointer relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 mx-auto">
                        {image3 ? (
                          <>
                            <img
                              src={image3}
                              className="object-cover w-full h-full rounded-xl"
                              alt="Slide preview"
                            />
                            <button
                              onClick={() => setImage3(null)}
                              className="absolute top-1 right-1 p-1 bg-red-500/90 hover:bg-red-600 shadow-lg rounded-md transition-all duration-200 text-white"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <Upload className="h-8 w-8 text-gray-400 mb-1" />
                            <p className="text-md font-medium text-gray-600 dark:text-gray-400 text-center px-2">
                              Upload Image
                            </p>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-500 text-center px-2">
                              Max size 200 KB
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, setImage3)}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Slide Title *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="Enter slide title"
                        value={slideTitle}
                        onChange={(e) => setSlideTitle(e.target.value)}
                        required
                      />
                    </div>

                    {/* Subtitle */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="Enter slide subtitle"
                        value={slideSubtitle}
                        onChange={(e) => setSlideSubtitle(e.target.value)}
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Tags *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="e.g. summer, promotion"
                        value={slideTags}
                        onChange={(e) => setSlideTags(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Separate tags with commas and max 2 tags
                      </p>
                    </div>

                    {/* Link */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Link URL *
                      </label>
                      <input
                        type="url"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="/products/this-is-a-product"
                        value={slideLink}
                        onChange={(e) => setSlideLink(e.target.value)}
                        required
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Enter the link after https://loopcart.netlify.app
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="grid grid-cols-2 gap-4 flex-col sm:flex-row">
                  <button
                    onClick={handleCloseAddSlide}
                    className="flex-1 px-6 py-3 text-sm sm:text-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSlide}
                    className="flex-1 w-full text-sm sm:text-lg justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {addSlideLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>Add Slide</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
