import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const products = [
  {
    id: 1,
    name: "Smart Watch",
    price: "$99.99",
    image: "/watch.jpg",
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    price: "$59.99",
    image: "/speaker.jpg",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "$39.99",
    image: "/mouse.jpg",
  },
  {
    id: 4,
    name: "Noise Cancelling Headphones",
    price: "$129.99",
    image: "/headphones.jpg",
  },
  {
    id: 12,
    name: "Smart Watch",
    price: "$99.99",
    image: "/watch.jpg",
  },
  {
    id: 22,
    name: "Bluetooth Speaker",
    price: "$59.99",
    image: "/speaker.jpg",
  },
  {
    id: 32,
    name: "Gaming Mouse",
    price: "$39.99",
    image: "/mouse.jpg",
  },
  {
    id: 42,
    name: "Noise Cancelling Headphones",
    price: "$129.99",
    image: "/headphones.jpg",
  },
];

const ProductCarousel = () => {
  return (
    <section className="px-4 py-8">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
          Popular Products
        </h2>
        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            550: { slidesPerView: 3 },
            750: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white dark:bg-zinc-900 rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-black dark:text-white text-sm truncate">
                    {product.name}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                    {product.price}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductCarousel;
