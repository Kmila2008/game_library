import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import GameList from "./components/GameList";
import GameForm from "./components/GameForm";
import Stats from "./components/Stats";
import GameDetails from "./components/GameDetails";
import DashboardLayout from "./components/DashboardLayout";
import About from "./About";

export default function App() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState("");

  // Cargar juegos desde la API
  const load = async () => {
    try {
      const q = query ? `?q=${encodeURIComponent(query)}` : "";
      const res = await fetch(`/api/games${q}`);
      if (!res.ok) throw new Error("Error al cargar juegos");
      const data = await res.json();
      console.log("🔥 Juegos cargados:", data);
      setGames(data);
    } catch (err) {
      console.error(err);
      alert("No se pudieron cargar los juegos");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Routes>
      {/* === PÁGINA PRINCIPAL === */}
      <Route
        path="/"
        element={
          <DashboardLayout
            sidebar={
              <>
                <GameForm onCreate={(g) => setGames((prev) => [g, ...prev])} />
                <Stats games={games} />
              </>
            }
            content={<GameList games={games} setGames={setGames} />}
            extra={null} // No mostramos detalles aquí
          />
        }
      />

      {/* === DETALLES DE UN JUEGO === */}
      <Route
        path="/game/:slug"
        element={
          <DashboardLayout
            sidebar={
              <>
                <GameForm onCreate={(g) => setGames((prev) => [g, ...prev])} />
                <Stats games={games} />
              </>
            }
            content={<GameDetails />}
            extra={null} // Panel extra opcional
          />
        }
      />

      {/* === ABOUT === */}
      <Route path="/about" element={<About />} />
    </Routes>
  );
}