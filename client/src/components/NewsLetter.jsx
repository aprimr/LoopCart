import { useState } from "react";
import { toast } from "sonner";
import { isEmail } from "../utils/isEmail";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      return toast.info("Please enter a valid email address");
    }
  };

  return (
    <section className="text-black dark:text-white py-8 sm:py-10 select-none">
      <div className="max-w-screen-xl mx-auto p-0 relative">
        <div className="relative bg-gradient-to-br from-white to-[#e0e5f3] dark:from-[#0f0f11] dark:to-[#0d1b2a] backdrop-blur-md transition-colors p-6 sm:p-10 shadow-none rounded-md overflow-hidden">
          {/* Infinity */}
          <div className="absolute -top-36  -left-10 flex justify-center items-center pointer-events-none select-none">
            <span className="text-[16rem] sm:hidden font-black text-black/5 dark:text-white/10 leading-none">
              ∞
            </span>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight font-poppins">
              Stay in the LOOP
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Subscribe to our newsletter for exclusive offers and discounts.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleNewsletterSubscribe}
            className="relative z-10 mt-6 flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              placeholder="Enter your email"
              className="w-full flex-1 px-4 py-2.5 rounded-sm bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-sm bg-blue-600 hover:bg-blue-500 transition text-white font-semibold w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
