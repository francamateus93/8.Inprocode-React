import React, { useState } from "react";
import Logo from "../../public/icon-bienestar.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={`${
        isHomePage ? "bg-transparent text-white" : "bg-beige text-dark"
      } absolute top-0 left-0 w-full p-10 flex flex-col md:flex-row justify-between items-center uppercase tracking-tight z-10`}
    >
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-18" />
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
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
      </div>
      <div
        className={`md:flex flex-col md:flex-row gap-2 rounded-xl md:gap-16 mt-2 ${
          isOpen ? "flex flex-col text-center" : "hidden"
        }`}
      >
        <Link
          to="/"
          className={`hover:font-semibold mt-2 md:mt-0 ${
            isHomePage ? "text-white" : "text-dark"
          }`}
        >
          Home
        </Link>
        <Link
          to="/map"
          className={`hover:font-semibold mt-2 md:mt-0 ${
            isHomePage ? "text-white" : "text-dark"
          }`}
        >
          Map
        </Link>
        <Link
          to="/fullcalendar"
          className={`hover:font-semibold mt-2 md:mt-0 ${
            isHomePage ? "text-white" : "text-dark"
          }`}
        >
          Calendar
        </Link>
        <Link
          to="/graphics"
          className={`hover:font-semibold mt-2 lg:mr-4 md:mt-0 ${
            isHomePage ? "text-white" : "text-dark"
          }`}
        >
          Graphics
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
