import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";
import { Loader, Loader2 } from "lucide-react";
import useUserState from "../../store/userStore";

function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { logout } = useUserState();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.post("/auth/logout");
      logout();
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center bg-white dark:bg-black px-6">
      {/* Floating Card */}
      <div className=" max-w-md w-full p-4 text-center relative">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100 relative inline-block font-poppins">
          <span className="relative z-10">Confirm Logout</span>
          <span className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 dark:bg-red-400 rounded mt-2 -z-10"></span>
        </h2>
        <p className="mb-8 text-gray-700 dark:text-gray-300 text-sm sm:text-base max-w-md mx-auto font-rubik">
          Are you sure you want to log out? This will end your current session.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center w-full px-2">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 px-6 py-3 rounded-lg border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300  transition-colors duration-200 font-semibold text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="flex-1 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors duration-200 font-semibold text-base shadow-md"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
