import React, { useEffect, useState } from 'react';
import GameList from './components/GameList';
import GameForm from './components/GameForm';
import Stats from './components/Stats';

export default function App() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');

  const load = async () => {
    try {
      const q = query ? `?q=${encodeURIComponent(query)}` : '';
      const res = await fetch(`/api/games${q}`); // <-- fetch directo
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
    <div className='app'>
      <header className='topbar'>
        <h1>Mi Biblioteca Gaming</h1>
        <div className='controls'>
          <input
            placeholder='Buscar juegos...'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button onClick={load}>Buscar</button>
        </div>
      </header>
      <main className='main'>
        <aside className='sidebar'>
          <GameForm onCreate={g => setGames(prev => [g, ...prev])} />
          <Stats games={games} />
        </aside>
        <section className='content'>
          <GameList games={games} setGames={setGames} />
        </section>
      </main>
    </div>
  );
}