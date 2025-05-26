import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-black px-4 py-8 text-black dark:text-white font-inter">
      <div className="max-w-md mx-auto mt-24 w-full font-poppins">
        {/* Main Content */}
        <h1 className="text-3xl font-semibold mb-4">Page Not Found</h1>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          The page you are looking for may have been moved, deleted, or might
          never have existed. Please check the URL for errors or return to the
          homepage to continue browsing.
        </p>
        <Link
          to="/"
          className="block mt-4 text-sm text-gray-500 dark:text-gray-500 underline"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
