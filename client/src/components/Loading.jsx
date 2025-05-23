import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[100svh] w-full flex flex-col justify-center items-center bg-white dark:bg-black font-poppins relative">
      <div className="flex flex-col items-center justify-center animate-fadeIn">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4">
          <div className="absolute inset-0 rounded-full border-8 sm:border-16 border-blue-500 opacity-30"></div>
          <div className="absolute inset-0 rounded-full border-8 sm:border-spacing-16 border-t-blue-500 border-b-transparent border-l-blue-500 border-r-transparent animate-spin"></div>
        </div>
      </div>

      <footer className="absolute bottom-[100px] text-center text-lg sm:text-xl">
        <p className="font-semibold text-black dark:text-white">
          Loop
          <span className="text-blue-500">Cart</span>
        </p>
      </footer>
    </div>
  );
};

export default Loading;
