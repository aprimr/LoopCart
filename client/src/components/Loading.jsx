import React from "react";
import { LoaderCircle } from "lucide-react";
const Loading = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black flex flex-col justify-center items-center font-poppins">
      <div className="flex flex-col justify-center items-center">
        <LoaderCircle className="animate-spin text-blue-500" size={120} />
      </div>

      <footer className="absolute bottom-0 text-center text-xs text-gray-400 dark:text-gray-500 py-4">
        <p className="text-xl text-black dark:text-white font-medium">
          Loop
          <span className="font-medium dark:font-semibold text-blue-500">
            Cart
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Loading;
