import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./views/HomePage";
import MapPage from "./views/MapPage";
import CalendarPage from "./views/CalendarPage";
import GraphicsPage from "./views/GraphicsPage";
import NotFound from "./views/NotFound";
import UsersPage from "./views/UsersPage";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/graphics" element={<GraphicsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
