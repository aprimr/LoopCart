import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowUpRight, SquareArrowOutUpRight } from "lucide-react";
import { FaXTwitter, FaLinkedin, FaL } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="hidden sm:flex w-full h-10 text-black dark:text-white bg-white dark:bg-black border-t border-gray-300 dark:border-gray-600 backdrop-blur-lg bg-opacity-60 font-poppins">
      <div className="max-w-screen-xl w-full mx-auto h-full px-4 flex items-center justify-between text-[11px]">
        <div className="flex gap-4">
          <NavLink to="/terms" className="underline hover:text-gray-400">
            Terms and Conditions
            <ArrowUpRight className="h-3 w-3 inline" />
          </NavLink>
          <NavLink to="/privacy" className="underline hover:text-gray-400">
            Privacy Policy
            <ArrowUpRight className="h-3 w-3 inline" />
          </NavLink>
          <NavLink to="/faq" className="underline hover:text-gray-400">
            FAQ
            <ArrowUpRight className="h-3 w-3 inline" />
          </NavLink>
          <NavLink to="/terms" className="underline hover:text-gray-400">
            Contact Us
            <ArrowUpRight className="h-3 w-3 inline" />
          </NavLink>
          <NavLink to="/terms" className="underline hover:text-gray-400">
            About Us
            <ArrowUpRight className="h-3 w-3 inline" />
          </NavLink>
        </div>
        <div className="flex items-center gap-3 ">
          <a
            href="#"
            className="flex gap-1 items-center underline hover:text-gray-400"
          >
            View Source
            <SquareArrowOutUpRight className="h-3 w-3 inline" />
          </a>
          <div className="flex gap-1">
            <a
              href="#"
              className="flex gap-1 items-center underline hover:text-gray-400"
            >
              <FaXTwitter className="h-3 w-3 inline" />
            </a>
            <a
              href="#"
              className="flex gap-1 items-center underline hover:text-gray-400"
            >
              <FaLinkedin className="h-3 w-3 inline" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
