import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isEmail } from "../../../utils/isEmail";
import { imgToBase64 } from "../../../utils/imgToBase64";
import { toast } from "sonner";
import { Image, LoaderCircle, Trash2 } from "lucide-react";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicBase64, setProfilePicBase64] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      return toast.error("Please fill all the fields");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!isEmail(email)) {
      return toast.error("Please enter a valid email address");
    }

    setIsLoading(true);

    navigate("/signup/verify/u/");
  };
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64Data = await imgToBase64(file);
        setProfilePicBase64(base64Data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-100 to-blue-100 dark:from-black dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4 font-poppins select-none">
      <div className="w-full max-w-md p-4 sm:p-6 rounded-xl bg-transparent text-left text-gray-900 dark:text-white">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-blue-500 dark:border-blue-500 flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-800 transition relative">
                {profilePicBase64 ? (
                  <>
                    <img
                      src={profilePicBase64}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProfilePicBase64(null);
                      }}
                      disabled={isLoading}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <label
                    htmlFor="profilePicInput"
                    className={`flex flex-col items-center justify-center text-gray-500 dark:text-gray-300 w-full h-full cursor-pointer ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Image className="w-6 h-6 sm:w-7 sm:h-7 mb-1" />
                    <span className="text-xs sm:text-sm">Upload</span>
                  </label>
                )}
              </div>
            </div>

            <input
              type="file"
              id="profilePicInput"
              accept="image/*"
              onChange={handleProfilePicChange}
              disabled={isLoading}
              className="hidden"
            />

            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
              Tap to upload profile picture
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/40 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

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
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/40 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/40 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/40 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded transition text-sm ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {!isLoading ? "Sign Up" : <LoaderCircle className="animate-spin" />}
          </button>
        </form>

        <div className="mt-6 text-xs sm:text-sm text-center space-y-2">
          <p>
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-500 hover:underline">
              Log In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
