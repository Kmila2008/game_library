import React from 'react';
import GameCard from './GameCard';
import './GameList.css';

export default function GameList({ games, setGames }) {
    // Mensaje si no hay juegos
  if (!games.length) {
    return <p className='no-games'>No hay juegos guardados todavía 😅</p>;
  }

  return (
    <div className='game-grid'>
      {games.map((game) => (
        <GameCard key={game._id} game={game} setGames={setGames} />
      ))}
    </div>
  );
}