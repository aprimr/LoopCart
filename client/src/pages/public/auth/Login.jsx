import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeClosed, EyeOff, LoaderCircle } from "lucide-react";
import axios from "../../../services/axios";

const Login = ({ message }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill all the fields");
    }

    try {
      setIsLoading(true);
      const res = await axios.post("/auth/login", { email, password });

      if (res.status === 200) {
        toast.success("Login successful");
        setIsLoading(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] w-full bg-gradient-to-br from-white via-gray-100 to-blue-100 dark:from-black dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4 font-poppins select-none">
      <div className="w-full max-w-md p-4 sm:p-6 rounded-xl bg-transparent text-left text-gray-900 dark:text-white">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
          Log In
        </h2>

        {message && (
          <p className="text-red-500 text-sm mb-4 text-center">{message}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/40 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={`w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/40 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"
                tabIndex={-1}
              >
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-sm text-right">
            <NavLink
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot password?
            </NavLink>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded transition text-sm ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {!isLoading ? "Log In" : <LoaderCircle className="animate-spin" />}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-xs sm:text-sm text-center space-y-2">
          <p>
            Don’t have an account?{" "}
            <NavLink to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </NavLink>
          </p>
          <p>
            <NavLink
              to="/verify-account"
              className="text-blue-500 hover:underline"
            >
              Verify your account.
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
