import React from 'react';
import GameCard from './GameCard';

export default function GameList({games, setGames}){
  return (
    <div className='game-list'>
      {games.length===0 ? <p>No hay juegos. Usa el formulario para agregar.</p> : games.map(g=> (
        <GameCard key={g._id} game={g} setGames={setGames} />
      ))}
    </div>
  );
}
