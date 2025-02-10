import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./views/HomePage";
import Map from "./views/Map";
import FullCalendar from "./views/FullCalendar";
import Graphics from "./views/Graphics";
import NotFound from "./views/NotFound";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/fullcalendar" element={<FullCalendar />} />
          <Route path="/graphics" element={<Graphics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
