import ReviewList from './ReviewList'
import React, { useState }  from 'react';
import api from '../utils/api';
import ReviewForm from './ReviewForm';
import './Modal.css';

export default function GameCard({game, setGames}){
  const [showModal, setShowModal] = useState(false);

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
          <button onClick={toggleCompleted}>
            {game.completed ? 'Desmarcar completado' : 'Marcar como completado'}
          </button>
          <button onClick={remove}>Eliminar</button>
           <button className='open-reviews-btn' onClick={() => setShowModal(true)}>
            Abrir reseña
           </button>
        </div>
        

          <div className='reviews'>
             <h4>Reseñas</h4>
             <ReviewList gameId={game._id} />
          </div>
        </div>

        {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <ReviewForm
              gameId={game._id}
              onCreate={(newReview) => {
                console.log('Nueva reseña:', newReview);
                setShowModal(false);
              }}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
