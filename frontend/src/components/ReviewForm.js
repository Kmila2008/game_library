import React, { useState } from 'react';

export default function ReviewForm({ gameId, onCreate, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, content, rating, gameId });
    setTitle('');
    setContent('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar reseña</h3>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Título"
        required
      />

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Tu reseña"
        required
      />

      <div>
        <label>Calificación: </label>
        <input
          type="number"
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
          min="1"
          max="5"
          required
        />
      </div>

      <button type="submit">Enviar</button>
      <button type="button" onClick={onClose}>Cerrar</button>
    </form>
  );
}