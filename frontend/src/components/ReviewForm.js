import React, { useState } from 'react';
import './ReviewForm.css';

export default function ReviewForm({ gameId, onCreate, onClose }) {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();


    if (rating === 0) {
      alert('Por favor, selecciona una calificación');
      return;
    }

    const reviewData = {
      title,
      comment,// ✅ Backend usa "comment"
      rating,
      gameId: gameId // ✅ Backend
    };

    onCreate(reviewData);

    setTitle('');
    setComment('');
    setRating(0);
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      
      {/* Botón cerrar */}
      <button type="button" className="close-btn" onClick={onClose}>
        ✕
      </button>

      <h3 className="form-title">Agregar reseña</h3>

      <input
        className="input-field"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Título"
        required
      />

      <textarea
        className="input-field textarea-field"
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Tu reseña"
        required
      />

<div className="rating-container">
  <label>Calificación:</label>
  <div className="stars">
    {[1,2,3,4,5].map((star) => (
      <span
        key={star}
        className={`star ${star <= rating ? 'filled' : ''}`}
        onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
        onClick={() => setRating(star)}
      >
        ★
      </span>
    ))}
  </div>
</div>

      <button type="submit" className="submit-btn">
        Enviar
      </button>
    </form>
  );
}