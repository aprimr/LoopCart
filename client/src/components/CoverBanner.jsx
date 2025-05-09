import React from "react";

// Define the CoverBanner component with a local image
const CoverBanner = ({ imageUrl }) => {
  return (
    <section className="w-full relative">
      {/* Image element with auto height based on aspect ratio */}
      <img
        src={imageUrl}
        alt="Cover Banner"
        className="w-full h-auto object-cover"
      />
    </section>
  );
};

export default CoverBanner;
