import React, { useState } from 'react';
import './ReviewForm.css';

export default function ReviewForm({ gameId, onCreate, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      title,
      comment: content, // ✅ Backend usa "comment"
      rating,
      game: gameId // ✅ Backend usa "game"
    };

    onCreate(reviewData);

    setTitle('');
    setContent('');
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
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Tu reseña"
        required
      />

      <div className="rating-container">
        <label>Calificación: </label>
        <input
          type="number"
          className="number-input"
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
          min="1"
          max="5"
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Enviar
      </button>
    </form>
  );
}