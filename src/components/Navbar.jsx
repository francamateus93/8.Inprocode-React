import React, { useState } from "react";
import Logo from "../../public/icon-bienestar.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent p-10 flex flex-col md:flex-row justify-between items-center uppercase tracking-tight z-10">
      <div className="flex justify-between items-center w-full md:w-auto">
        <img src={Logo} alt="Logo" className="w-18" />
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-10 h-10 mt-4 text-white"
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
        className={`md:flex flex-col md:flex-row md:gap-16 mt-2 ${
          isOpen ? "flex flex-col text-center" : "hidden"
        }`}
      >
        <Link to="/" className="hover:font-semibold mt-2 md:mt-0 text-white">
          Home
        </Link>
        <Link to="/map" className="hover:font-semibold mt-2 md:mt-0 text-white">
          Map
        </Link>
        <Link
          to="/fullcalendar"
          className="hover:font-semibold mt-2 md:mt-0 text-white"
        >
          Calendar
        </Link>
        <Link
          to="/graphics"
          className="hover:font-semibold mt-2 mr-4 md:mt-0 text-white"
        >
          Graphics
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
