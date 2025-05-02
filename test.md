{
id: 1,
title: "Order Placed",
message: "Your order has been placed successfully.",
icon: <ClipboardCheck />,
category: "ORDER_PLACED",
},
{
id: 2,
title: "New Message",
message: "You have a new message.",
icon: <MessageCircle />,
category: "NEW_MESSAGE",
},
{
id: 3,
title: "Order Cancelled",
message: "Your order has been cancelled.",
icon: <Bell />,
category: "ORDER_CANCELLED",
},
{
id: 4,
title: "Order Dispatched",
message: "Your order has been dispatched and is on its way.",
icon: <Truck />,
category: "ORDER_DISPATCHED",
},
{
id: 5,
title: "Order Delivered",
message: "Your order has been successfully delivered.",
icon: <Package />,
category: "ORDER_DELIVERED",
},
{
id: 6,
title: "Order Out for Delivery",
message: "Your order is out for delivery.",
icon: <MapPin />,
category: "ORDER_OUT_FOR_DELIVERY",
},
{
id: 10,
title: "Flash Sale Alert",
message: "Hurry up! Flash sale is live now.",
icon: <Clock />,
category: "FLASH_SALE_ALERT",
},
{
id: 11,
title: "Product Review Reminder",
message: "It’s time to leave a review for your recent purchase.",
icon: <Star />,
category: "REVIEW_REMINDER",
},
{
id: 12,
title: "Profile Updated",
message: "Your profile has been updated successfully.",
icon: <User />,
category: "PROFILE_UPDATED",
},
{
id: 16,
title: "Order Refund Processed",
message: "Your order refund has been processed.",
icon: <CreditCard />,
category: "REFUND_PROCESSED",
},
{
id: 18,
title: "Account Suspended",
message: "Your account has been suspended due to suspicious activity.",
icon: <ShieldOff />,
category: "ACCOUNT_SUSPENDED",
},
{
id: 164,
title: "Order Placed",
message: "Your order has been placed successfully.",
icon: <ClipboardCheck />,
category: "ORDER_PLACED",
},
{
id: 24,
title: "New Message",
message: "You have a new message.",
icon: <MessageCircle />,
category: "NEW_MESSAGE",
},
{
id: 36,
title: "Order Cancelled",
message: "Your order has been cancelled.",
icon: <Bell />,
category: "ORDER_CANCELLED",
},
{
id: 445,
title: "Order Dispatched",
message: "Your order has been dispatched and is on its way.",
icon: <Truck />,
category: "ORDER_DISPATCHED",
},
{
id: 54,
title: "Order Delivered",
message: "Your order has been successfully delivered.",
icon: <Package />,
category: "ORDER_DELIVERED",
},
{
id: 64,
title: "Order Out for Delivery",
message: "Your order is out for delivery.",
icon: <MapPin />,
category: "ORDER_OUT_FOR_DELIVERY",
},
{
id: 105,
title: "Flash Sale Alert",
message: "Hurry up! Flash sale is live now.",
icon: <Clock />,
category: "FLASH_SALE_ALERT",
},
{
id: 115,
title: "Product Review Reminder",
message: "It’s time to leave a review for your recent purchase.",
icon: <Star />,
category: "REVIEW_REMINDER",
},
{
id: 125,
title: "Profile Updated",
message: "Your profile has been updated successfully.",
icon: <User />,
category: "PROFILE_UPDATED",
},
{
id: 166,
title: "Order Refund Processed",
message: "Your order refund has been processed.",
icon: <CreditCard />,
category: "REFUND_PROCESSED",
},
{
id: 186,
title: "Account Suspended",
message: "Your account has been suspended due to suspicious activity.",
icon: <ShieldOff />,
category: "ACCOUNT_SUSPENDED",
},

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
          }} >
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
