import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./views/HomePage";
import Map from "./views/Map";
import Calendar from "./views/Calendar";
import Graphics from "./views/Graphics";
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
          <Route path="/map" element={<Map />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/graphics" element={<Graphics />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
