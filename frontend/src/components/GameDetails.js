import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import api from '../utils/api';
import './GameDetail.css';

export default function GameDetail() {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState(null);

  // Cargar los datos del juego
  useEffect(() => {
    const loadGame = async () => {
      try {
        const res = await api.get(`/games?slug=${slug}`);
        if (res.data.length > 0) {
          setGame(res.data[0]);
        }
      } catch (err) {
        console.error('Error cargando el juego:', err);
      }
    };

    loadGame();
  }, [slug]);

  const handleCreateReview = async (reviewData) => {
    try {
      const saved = await api.post('/reviews', reviewData);
      setNewReview(saved); // Para refrescar la lista
      setShowReviewForm(false);
    } catch (err) {
      console.error('Error creando reseña:', err);
      alert('Error enviando la reseña');
    }
  };

  if (!game) return <p>Cargando juego...</p>;

  return (
    <div className="game-detail">
      <div className="game-header">
        <img src={game.coverUrl || ''} alt={game.title} className="game-cover" />
        <h2>{game.title}</h2>
        <p>{game.description}</p>
        <button onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? 'Cancelar' : 'Agregar reseña'}
        </button>
      </div>

      {showReviewForm && (
        <ReviewForm
          gameId={game._id}
          onCreate={handleCreateReview}
          onClose={() => setShowReviewForm(false)}
        />
      )}

      <div className="reviews-section">
        <h3>Reseñas</h3>
        <ReviewList gameId={game._id} newReview={newReview} />
      </div>
    </div>
  );
}