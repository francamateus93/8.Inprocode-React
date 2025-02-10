import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-500 p-4 text-white flex justify-between">
    <div className="text-lg font-bold">Mi App</div>
    <div className="space-x-4">
      <Link to="/" className="hover:underline">
        Home
      </Link>
      <Link to="/mapa" className="hover:underline">
        Map
      </Link>
      <Link to="/fullcalendar" className="hover:underline">
        Calendar
      </Link>
      <Link to="/graficos" className="hover:underline">
        Graphics
      </Link>
    </div>
  </nav>
);

export default Navbar;
