const CoverBanner = ({ imageUrl, isLoading }) => {
  return (
    <section className="w-full relative select-none">
      {isLoading ? (
        <div className="animate-pulse space-y-4 px-1">
          <div className="h-[320px] sm:h-[360px] md:h-[340px] lg:h-[320px] bg-gray-200 dark:bg-gray-800" />
        </div>
      ) : (
        <img
          src={imageUrl}
          alt="Cover Banner"
          className="w-full h-auto object-cover"
        />
      )}
    </section>
  );
};

export default CoverBanner;
