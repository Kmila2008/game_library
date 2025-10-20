import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList'
import React from 'react';
import api from '../utils/api';

export default function GameCard({game, setGames}){
  const toggleCompleted = async () => {
    const updated = await api.put('/games/'+game._id, {...game, completed: !game.completed});
    setGames(prev => prev.map(p => p._id === updated._id ? updated : p));
  };
  const remove = async () => {
    if (!confirm('Eliminar '+game.title+'?')) return;
    await api.delete('/games/'+game._id);
    setGames(prev => prev.filter(p => p._id !== game._id));
  };
  return (
    <div className='card'>
      <div className='cover' style={{backgroundImage: `url(${game.coverUrl || ''})`}} />
      <div className='info'>
        <h3>{game.title}</h3>
        <p className='meta'>{game.genre} • {game.platform}</p>
        <p>Horas jugadas: {game.hoursPlayed || 0}</p>
        <div className='actions'>
          <button onClick={toggleCompleted}>{game.completed ? 'Desmarcar completado' : 'Marcar como completado'}</button>
          <button onClick={remove}>Eliminar</button>
        </div>

        <div className='reviews'>
        <h4>Reseñas</h4>
        <ReviewList gameId={game._id} />

        <ReviewForm gameId={game._id} onCreate={(newReview) => {
      // Para actualizar las reseñas después de crear una
      // Podrías recargar el componente ReviewList si quieres
         console.log('Nueva reseña:', newReview);
    }}/>

      </div>
      </div>
      
    </div>
  );
}
