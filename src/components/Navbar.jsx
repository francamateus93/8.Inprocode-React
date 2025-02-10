import React from "react";
import Logo from "../../public/logotipo-bienestar.png";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-white p-4 flex justify-between items-center">
    <img src={Logo} alt="Logo" className="w-40" />
    <div className="space-x-4">
      <Link to="/" className="hover:underline">
        Home
      </Link>
      <Link to="/map" className="hover:underline">
        Map
      </Link>
      <Link to="/fullcalendar" className="hover:underline">
        Calendar
      </Link>
      <Link to="/graphics" className="hover:underline">
        Graphics
      </Link>
    </div>
  </nav>
);

export default Navbar;
