import WishlistCard from "../../components/Cards/WishlistCard";

const wishlistItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality sound with noise cancellation.",
    price: 129,
    discount: 15,
    rating: 4.5,
    sold: 240,
    image: "/images/headphones.png",
    hasCOD: true,
    hasFreeDelivery: true,
    isSponsored: true,
  },
  {
    id: 2,
    name: "Smartphone Pro Max",
    description: "Latest model with advanced camera and battery life.",
    price: 999,
    discount: 10,
    rating: 4.8,
    sold: 620,
    image: "/images/smartphone.png",
    hasCOD: false,
    hasFreeDelivery: true,
    isSponsored: false,
  },
];

const Wishlist = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black py-8 px-4 font-poppins">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          My Wishlist
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Items you've saved to purchase later.
        </p>

        {wishlistItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <WishlistCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
