import React, { useState } from 'react';
import './ReviewForm.css';

export default function ReviewForm({ gameId, onCreate, onClose }) {
  const [title, setTitle] = useState('');       // Título de la reseña
  const [comment, setComment] = useState('');   // Comentario
  const [rating, setRating] = useState(0);      // Calificación actual
  const [hoverRating, setHoverRating] = useState(0); 

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {                         // Validar calificación
      alert('Por favor, selecciona una calificación');
      return;
    }

    const reviewData = { title, comment, rating, gameId };
    onCreate(reviewData);                        // Enviar reseña
    setTitle(''); setComment(''); setRating(0); // Reset campos
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      
      {/* ✖ Botón cerrar */}
      <button type="button" className="close-btn" onClick={onClose}>✕</button>

      {/* Título */}
      <h3 className="form-title">Agregar reseña</h3>

      {/* Input título */}
      <input
        className="input-field"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Título"
        required
      />

      {/* Textarea comentario */}
      <textarea
        className="input-field textarea-field"
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Tu reseña"
        required
      />

      {/*Calificación */}
      <div className="rating-container">
        <label>Calificación:</label>
        <div className="stars">
          {[1,2,3,4,5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'filled' : ''}`}
              onMouseEnter={() => setHoverRating(star)}  
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}            // Seleccionar estrella
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Enviar */}
      <button type="submit" className="submit-btn">Enviar</button>
    </form>
  );
}