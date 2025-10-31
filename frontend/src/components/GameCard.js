import ReviewList from './ReviewList';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './GameCard.css';
import ReviewForm from './ReviewForm';
import './Modal.css';

export default function GameCard({ game, setGames }) {
  const navigate = useNavigate();

  // Usar slug si existe en el juego, si no, generarlo desde title (no from "titulo")
  const goToDetails = () => {
    const base = game.slug || game.title || game.titulo || '';
    const slug = String(base).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    navigate(`/game/${slug}`, { state: { game } });
  };

  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState(null);

  const toggleCompleted = async () => {
    const updated = await api.put('/games/' + game._id, {
      ...game,
      completed: !game.completed
    });
    setGames(prev => prev.map(p => p._id === updated._id ? updated : p));
  };

  const remove = async () => {
    if (!confirm('¿Eliminar ' + (game.title || game.titulo || 'este juego') + '?')) return;
    await api.delete('/games/' + game._id);
    setGames(prev => prev.filter(p => p._id !== game._id));
  };

  const handleCreateReview = async (reviewData) => {
    try {
      const saved = await api.post('/reviews', reviewData);
      setNewReview(saved);
      setShowModal(false);
      console.log("📤 Enviando reseña...", reviewData);
      console.log("✅ Guardado:", saved);
    } catch (err) {
      console.error("❌ Error creando reseña:", err);
      alert("Error enviando la reseña");
    }
  };

  return (
    <div className='card'>
      <div
        className='cover'
        style={{ backgroundImage: `url(${game.coverUrl || ''})`, cursor: 'pointer' }}
        onClick={goToDetails}
      />

      <div className='info'>
        <h3 onClick={goToDetails} style={{ cursor: 'pointer' }}>
          {game.title || game.titulo}
        </h3>
        <p className='meta'>{game.genre || game.genero} • {game.platform || game.plataforma}</p>
        <p>Horas jugadas: {game.hoursPlayed || 0}</p>

        <div className='actions'>
          <button onClick={toggleCompleted}>
            {game.completed ? 'Desmarcar completado' : 'Marcar como completado'}
          </button>

          <button onClick={remove}>Eliminar</button>

        
        </div>

        <div className='reviews'>
          <h4>Reseñas</h4>
          <ReviewList gameId={game._id} newReview={newReview} />
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <ReviewForm
              gameId={game._id}
              onCreate={handleCreateReview}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
