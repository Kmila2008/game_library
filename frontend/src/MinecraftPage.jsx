import React from 'react';
import GameCard from '../components/GameCard';

export default function MinecraftPage({ games, setGames }) {
  // Buscamos solo el juego de Minecraft
  const minecraft = games.find(g => g.title.toLowerCase() === 'minecraft');

  if (!minecraft) return <p>Cargando Minecraft...</p>;

  return (
    <div className="minecraft-page">
      <GameCard game={minecraft} setGames={setGames} />
    </div>
  );
}