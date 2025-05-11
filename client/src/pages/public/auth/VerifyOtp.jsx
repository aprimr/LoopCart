import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { signToken } = useParams();
  console.log("signup Token is " + signToken);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6 || isNaN(otp)) {
      return toast.error("Enter a valid 6-digit OTP");
    }

    setIsLoading(true);

    try {
      toast.success("OTP Verified!");
    } catch (error) {
      toast.error("Invalid or Expire OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-100 dark:from-black dark:to-gray-800 px-4 font-poppins">
      <div className="w-full max-w-md p-6 sm:p-8 text-center">
        <h2 className="text-3xl font-semibold mb-2 text-gray-900 dark:text-white">
          Verify OTP
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
          We’ve sent a 6-digit code to your email.
        </p>

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <input
            type="text"
            id="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-center text-lg tracking-widest font-medium text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {!isLoading ? (
              "Verify OTP"
            ) : (
              <LoaderCircle className="animate-spin w-5 h-5" />
            )}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Didn’t get the code? Check your spam folder or try again.
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
