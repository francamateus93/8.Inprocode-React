import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavMenu from "./NavMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`${
        isHomePage
          ? "absolute top-0 left-0 bg-transparent text-white flex justify-center items-center"
          : "bg-beige"
      } w-full p-10 flex flex-col md:flex-row justify-center items-center uppercase tracking-tight z-10`}
    >
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="focus:outline-none hover:text-orange-500 transition duration-300"
        >
          <svg
            className="w-10 h-10 mt-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      <NavMenu isHomePage={isHomePage} isOpen={isOpen} className="block" />
    </nav>
  );
};

export default Navbar;
