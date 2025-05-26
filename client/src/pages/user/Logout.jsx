import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "../../services/axios";
import useUserState from "../../store/userStore";

export default function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useUserState();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.get("/auth/logout");
      logout();
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black px-4 text-black dark:text-white font-poppins flex items-center justify-center">
      <div className="max-w-sm w-full text-center">
        {/* Main Content */}
        <h1 className="text-4xl font-semibold mb-4">Confirm Logout</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
          Are you sure you want to log out? This will end your current session
          and return you to the homepage.
        </p>

        {/* Buttons Container */}
        <div className="flex justify-center gap-4">
          {/* Cancel Button */}
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition"
          >
            Cancel
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="inline-flex items-center gap-2 text-sm text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 px-6 py-2 rounded-md transition"
            style={{ borderRadius: "6px" }} // subtle rounding
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <LogOut size={16} />
            )}
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
