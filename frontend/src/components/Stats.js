import React from 'react';

export default function Stats({games}){
  const total = games.length;
  const completed = games.filter(g=>g.completed).length;
  const hours = games.reduce((s,g)=> s + (g.hoursPlayed||0), 0);
  return (
    <div className='stats'>
      <h3>Estadísticas</h3>
      <p>Total juegos: {total}</p>
      <p>Completados: {completed}</p>
      <p>Horas jugadas: {hours}</p>
    </div>
  );
}
