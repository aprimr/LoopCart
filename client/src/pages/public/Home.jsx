import React from "react";
import Carousel from "../../components/Carousel";
import PopularProducts from "../../components/PopularProducts";
import FeaturedProducts from "../../components/FeaturedProducts";
import Categories from "../../components/Categories";
import TopDiscounts from "../../components/TopDiscounts";
import CoverBanner from "../../components/CoverBanner";

import Cover1 from "../../assets/images/Cover1.jpg";

function Home() {
  return (
    <div className="min-h-screen h-full w-full bg-white dark:bg-black">
      <div className="pt-16" /> {/* Spacer */}
      <div className="max-w-screen-xl mx-auto w-full">
        <Carousel />
        <Categories />
        <FeaturedProducts />
        <CoverBanner imageUrl={Cover1} />

        <PopularProducts />
        <CoverBanner imageUrl={Cover1} />

        <TopDiscounts />
      </div>
    </div>
  );
}

export default Home;
