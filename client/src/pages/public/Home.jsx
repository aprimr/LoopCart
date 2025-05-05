import React from "react";
import Carousel from "../../components/Carousel";
import PopularProducts from "../../components/PopularProducts";
import FeaturedProducts from "../../components/FeaturedProducts";

function Home() {
  return (
    <div className="min-h-screen h-full w-full bg-white dark:bg-black">
      <div className="pt-16" /> {/* Spacer */}
      <div className="max-w-screen-xl mx-auto w-full">
        <Carousel />
        <FeaturedProducts />
        <PopularProducts />
      </div>
    </div>
  );
}

export default Home;
