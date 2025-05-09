import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (!email) toast.info("Enter Your email");
  };
  return (
    <section className="text-black dark:text-white py-8 sm:py-10">
      <div className="max-w-screen-xl mx-auto p-0">
        <div className="bg-gradient-to-br from-white to-[#e0e5f3] dark:from-[#0f0f11] dark:to-[#0d1b2a] backdrop-blur-md transition-colors p-6 sm:p-10 rounded-none shadow-none relative">
          <div className="flex flex-col items-center text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Stay in the Loop
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Subscribe to our newsletter for exclusive offers and discounts.
            </p>
          </div>

          <form className="mt-6 flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              placeholder="Enter your email"
              className="w-full flex-1 px-4 py-2.5 rounded-sm bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              onClick={(e) => handleNewsletterSubscribe(e)}
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
