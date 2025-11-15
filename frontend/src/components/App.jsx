import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";

// // Importar páginas
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import GameDetails from "./pages/GameDetails/GameDetails";
import Dashboard from "./pages/Dashboard/Dashboard";

export default function App() {
  return (
    <>
      
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/game/:slug" element={<GameDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}