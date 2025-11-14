import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import './GameDetail.css';
import api from '../utils/api';
import PlayTimeTracker from './PlayTimeTracker';

export default function GameDetails() {
  const { state } = useLocation();
  const [game, setGame] = useState(state?.game || null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState(null);
  const [editingDescription, setEditingDescription] = useState(false);
  const [tempDescription, setTempDescription] = useState(game?.description || '');
  const navigate = useNavigate();

  if (!game) return <p>Cargando juego...</p>;

  const handleCreateReview = async (reviewData) => {
    try {
      const saved = await api.post('/reviews', reviewData);
      setNewReview(saved);
      setShowReviewForm(false);
    } catch (err) {
      console.error("❌ Error creando reseña:", err);
      alert("Error enviando la reseña");
    }
  };

  // ✅ AHORA abre el enlace externo si existe, o va a la ruta interna si no
  const handlePlay = () => {
    if (game.playUrl) {
      window.open(game.playUrl, "_blank"); // 🔗 abre el enlace en nueva pestaña
    } else {
      navigate(`/play/${game.slug}`);
    }
  };

  // ✏️ Guardar descripción editada
  const saveDescription = async () => {
    try {
      const updated = await api.put(`/games/${game._id}`, { description: tempDescription });
      setGame(updated);
      setEditingDescription(false);
    } catch (err) {
      console.error("❌ Error actualizando descripción:", err);
      alert("Error guardando los cambios");
    }
  };

  return (
    <div className="game-detail-page">
      <section className="game-header">
        <div
          className="game-image-circle"
          style={{ backgroundImage: `url(${game.coverUrl || ''})` }}
        ></div>

        <div className="game-info">
          <h2>{game.title}</h2>

          {/* 📝 Mostrar o editar descripción */}
          {editingDescription ? (
            <div>
              <textarea
                className="input-field textarea-field description-field"
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                rows="4"
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <button className="save-button" onClick={saveDescription}>Guardar</button>
              <button className="cancel-button" onClick={() => setEditingDescription(false)}>Cancelar</button>
            </div>
          ) : (
            <>
              <p>{game.description || "Sin descripción disponible."}</p>
              <div className="button-group">
                <button className="edit-button" onClick={() => setEditingDescription(true)}>
                  Editar descripción
                </button>
                <button className="play-button" onClick={handlePlay}>
                  Jugar ahora
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="playtime-section">
        <h3>⏱️ TIEMPO JUGADO</h3>
        <PlayTimeTracker gameId={game._id} gameTitle={game.title} />
      </section>

      <section className="reviews-section">
        <h3>💬 Reseñas</h3>
        {showReviewForm && (
          <ReviewForm
            gameId={game._id}
            onCreate={handleCreateReview}
            onClose={() => setShowReviewForm(false)}
          />
        )}
        <ReviewList gameId={game._id} newReview={newReview} />
        <button
          className="add-review-btn"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {showReviewForm ? 'Cancelar' : 'Agregar reseña'}
        </button>
      </section>
    </div>
  );
}