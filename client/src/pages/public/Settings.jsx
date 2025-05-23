import React from "react";
import ThemeToggle from "../../components/ThemeToggle";

const Settings = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full flex flex-col items-center gap-6">
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Settings
        </h1>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme
          </label>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Settings;
