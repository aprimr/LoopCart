import React, { useState } from "react";

const Login = ({ message }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Form Submit", { email, password });
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black flex flex-col justify-between font-poppins">
      {/* Centered content */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-screen-xl text-center p-6 space-y-6 flex flex-col items-center">
          {/* Logo */}
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Loop<span className="text-blue-500">Cart</span>
          </h2>

          {/* Optional Redirect Message */}
          {message && <p className="text-red-500 text-sm">{message}</p>}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>

      {/* Sticky Footer */}
      <footer className="text-center text-xs text-gray-400 dark:text-gray-500 py-4">
        By proceeding, you agree to our{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Privacy Policy
        </a>
        .
      </footer>
    </div>
  );
};

export default Login;
