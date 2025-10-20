import React, { useState } from 'react';
import api from '../utils/api';

export default function ReviewForm ({ gameId, onCreate }) {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!title || !comment) {
    return alert('Completa todos los campos');
    }
    
    try {
      const response = await api.post(`/games/${gameId}/reviews`, {
        title,
        comment,
      });

      setTitle('');
      setComment('');

      if (onCreate) onCreate(response.data); // envía la nueva reseña al padre
    } catch (error) {
      console.error(error);
      alert('Error al enviar la reseña');
    }
  };

  return (
    <form onSubmit={submit} className='review-form'>
      <input
        placeholder='Título'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Escribe tu reseña...'
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button type='submit'>Agregar reseña</button>
    </form>
  );
}