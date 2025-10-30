import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import './GameDetail.css';

export default function GameDetails() {
  const { state } = useLocation();
  const [game, setGame] = useState(state?.game || null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState(null);

  const navigate = useNavigate();

  if (!game) return <p>Cargando juego...</p>;

  const handleCreateReview = (review) => {
    setNewReview(review);
    setShowReviewForm(false);
  };

  const handlePlay = () => {
    // Aquí asumimos que cada juego tiene un campo `playUrl` con la ruta para jugarlo
    // Si no existe, puedes construirla desde el slug: `/play/${game.slug}`
    navigate(game.playUrl || `/play/${game.slug}`);
  };

  return (
    <div className="game-detail">
      <div className="game-main">
        {/* === CÍRCULO DE IMAGEN === */}
        <div
          className="game-image-circle"
          style={{
            backgroundImage: `url(${game.coverUrl || ''})`,
          }}
        />

        {/* === DESCRIPCIÓN Y BOTÓN === */}
        <div className="game-info">
          <h2>{game.title}</h2>
          <p>{game.description}</p>
          <button className="play-button" onClick={handlePlay}>
            Jugar ahora
          </button>
        </div>
      </div>

      {/* === RESEÑAS === */}
      <div className="reviews-section">
        <h3>Reseñas</h3>
        {showReviewForm && (
          <ReviewForm
            gameId={game._id}
            onCreate={handleCreateReview}
            onClose={() => setShowReviewForm(false)}
          />
        )}
        <ReviewList gameId={game._id} newReview={newReview} />
        <button onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? 'Cancelar' : 'Agregar reseña'}
        </button>
      </div>
    </div>
  );
}