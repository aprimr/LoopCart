import React from "react";
import Carousel from "../../components/Carousel";

function Home() {
  return (
    <div className="h-screen w-full bg-white dark:bg-black">
      <div className="pt-16" /> {/* Spacer */}
      <div className="max-w-screen-xl mx-auto w-full">
        <Carousel />
      </div>
    </div>
  );
}

export default Home;
