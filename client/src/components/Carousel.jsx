import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ps5 from "../assets/images/ps5.png";

const Carousel = () => {
  const [slides, setSlides] = useState([
    {
      tag: "Hurry up only few lefts!",
      category: ["Gaming"],
      title: "Next-Level Gaming Starts Here – Discover PlayStation 5 Today!",
      image: "",
      detailsPath: "/products/ps5",
    },
    {
      tag: "Exclusive Deal 40% Off",
      category: ["Electronics", "Computers"],
      title:
        "Power Meets Elegance with MacBook Pro — Performance Unmatched for Creators, Developers",
      image: "",
      detailsPath: "/products/macbook-pro",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white dark:bg-black py-6 select-none">
      <div className="max-w-screen-xl mx-auto px-2">
        {isLoading ? (
          // Skeleton Loader when slides are empty
          <div className="animate-pulse space-y-4 px-1">
            <div className="h-[320px] sm:h-[360px] md:h-[340px] lg:h-[320px] bg-gray-200 dark:bg-gray-800" />
          </div>
        ) : (
          // carousel
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            className="overflow-hidden"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className={`
                    relative
                    flex flex-col-reverse sm:flex-row
                    items-center justify-between
                    border-x-4 border-white dark:border-black
                    bg-softBlueGray dark:bg-gray-900
                    p-4 sm:p-6 md:p-10
                    h-[430px] sm:h-[380px] md:h-[360px] lg:h-[340px] xl:h-[320px]
                    overflow-hidden
                  `}
                >
                  {/* Category on sm*/}
                  <div className="sm:hidden absolute top-2 left-3 sm:left-10 space-x-2 flex flex-wrap">
                    {slide.category.map((cat, index) => (
                      <p
                        key={index}
                        className={`px-3 py-1 rounded-md text-sm text-white ${
                          index === 0
                            ? "bg-blue-600 dark:bg-blue-800"
                            : "bg-rose-600 dark:bg-rose-800"
                        } font-medium font-poppins`}
                      >
                        {cat}
                      </p>
                    ))}
                  </div>

                  {/* Link Button */}
                  <div className="absolute top-2 right-3 flex sm:hidden">
                    <button
                      className="p-2 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => navigate(slide.detailsPath)}
                    >
                      <ArrowUpRight className="w-4 h-4 text-gray-800 dark:text-white" />
                    </button>
                  </div>

                  {/* Text Column */}
                  <div className="w-full sm:w-1/2 text-left space-y-2 mt-4 md:mt-0 overflow-hidden">
                    {/* Category on desktop*/}
                    <div className="hidden sm:flex sm:left-10 space-x-2 flex-wrap">
                      {slide.category.map((cat, index) => (
                        <p
                          key={index}
                          className={`px-3 py-1 rounded-md text-sm text-white ${
                            index === 0
                              ? "bg-blue-600 dark:bg-blue-800"
                              : "bg-rose-600 dark:bg-rose-800"
                          } font-medium font-poppins`}
                        >
                          {cat}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-blue-500 font-medium font-poppins truncate">
                      {slide.tag}
                    </p>

                    <h2 className="text-2xl sm:text-xl md:text-xl lg:text-3xl font-bold text-gray-800 dark:text-white leading-snug h-28 sm:h-auto sm:line-clamp-4 md:line-clamp-3 ">
                      {slide.title}
                    </h2>

                    {/* Desktop Button */}
                    <div className="hidden sm:flex flex-row justify-start pt-2">
                      <button
                        onClick={() => navigate(slide.detailsPath)}
                        className="px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 truncate"
                      >
                        View Product{" "}
                        <ArrowUpRight className="w-4 h-4 inline-block" />
                      </button>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className="w-full sm:w-1/2 flex justify-center items-center h-full">
                    <img
                      src={slide.image || ps5}
                      alt={slide.title}
                      className="w-full max-w-[240px] lg:max-w-[300px] h-auto object-contain"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Carousel;
