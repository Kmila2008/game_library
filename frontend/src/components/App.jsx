import { Routes, Route } from 'react-router-dom';
import GameDetails from './components/GameDetails';
import React, { useEffect, useState } from 'react';
import GameList from './components/GameList';
import GameForm from './components/GameForm';
import Stats from './components/Stats';
import DashboardLayout from './components/DashboardLayout'; // nuevo layout

export default function App() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');

  const load = async () => {
    try {
      const q = query ? `?q=${encodeURIComponent(query)}` : '';
      const res = await fetch(`/api/games${q}`);
      if (!res.ok) throw new Error('Error al cargar juegos');
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error(err);
      alert('No se pudieron cargar los juegos');
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout
            sidebar={
              <>
                <h2>🎮 Agregar juego</h2>
                <GameForm onCreate={(g) => setGames((prev) => [g, ...prev])} />
                <div className="divider"></div>
                <Stats games={games} />
              </>
            }
            content={
              <>
                <header className="dashboard-header">
                  <h1>Mi Biblioteca Gaming</h1>
                  <div className="search-bar">
                    <input
                      placeholder="Buscar juegos..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={load}>Buscar</button>
                  </div>
                </header>
                <section className="game-grid">
                  <GameList games={games} setGames={setGames} />
                </section>
              </>
            }
            extra={
              <>
                <h3>Noticias y comunidad</h3>
                <div className="panel-card">🎯 Torneos activos</div>
                <div className="panel-card">🔥 Juegos populares</div>
                <div className="panel-card">💬 Actividad reciente</div>
              </>
            }
          />
        }
      />

      <Route path="/game/:slug" element={<GameDetails />} />
    </Routes>
  );
}