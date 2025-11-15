import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import GameList from "./components/GameList";
import GameForm from "./components/GameForm";
import Stats from "./components/Stats";
import GameDetails from "./components/GameDetails";
import DashboardLayout from "./components/DashboardLayout";
import About from "./About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const load = async (search = "") => {
    try {
      const q = search ? `?q=${encodeURIComponent(search)}` : "";
      const res = await fetch(`/api/games${q}`);
      if (!res.ok) throw new Error("Error al cargar juegos");
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error(err);
      alert("No se pudieron cargar los juegos");
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const handleSearch = (text) => {
    setQuery(text);
    load(text);
  };

  return (
    <>
      <Navbar
        onSearch={handleSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout
              sidebar={
                <div>
                  <GameForm onCreate={(g) => setGames([...games, g])} />
                  {/* Imagen debajo del formulario */}
                  <img
                    src="/images/Robotsito.png" // cambia por tu imagen
                    alt="Decorativa"
                    className="sidebar-image"
                  />
                </div>
              }
              content={<GameList games={games} setGames={setGames} />}
              extra={<Stats />}
            />
          }
        />

        <Route
          path="/game/:slug"
          element={
            <DashboardLayout
              sidebar={<GameForm onCreate={(g) => setGames([...games, g])} />}
              content={<GameDetails />}
            />
          }
        />

        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </>
  );
}