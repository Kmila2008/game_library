import React, { useEffect, useState } from 'react';
import './App.css';
import GameList from './components/GameList';
import GameForm from './components/GameForm';
import Stats from './components/Stats';
import GameDetails from './components/GameDetails';
import DashboardLayout from './components/DashboardLayout'; // ✅ este es el nombre correcto

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
    <DashboardLayout
      sidebar={
        <>
          <GameForm onCreate={(g) => setGames((prev) => [g, ...prev])} />
          <Stats games={games} />
        </>
      }
      content={
        <>
          <div className="controls">
            <input
              placeholder="Buscar juegos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={load}>Buscar</button>
          </div>

          <GameList games={games} setGames={setGames} />
        </>
      }
      extra={<GameDetails />}
    />
  );
}