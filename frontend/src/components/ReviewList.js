import './ReviewList.css';
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ReviewForm from './ReviewForm';


export default function ReviewList({ gameId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      const res = await api.get(`/reviews?gameId=${gameId}`);
      setReviews(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [gameId]);

  if (loading) return <p>Cargando reseñas...</p>;
  if (reviews.length === 0) return <p>No hay reseñas aún.</p>;

  return (

    <div className="review-list">
      <h4>Reseñas:</h4>
      {reviews.map(r => (
        <div key={r._id} className="review-item">
          <strong lassName="review-author">{r.author}</strong> 
          <p className="review-title">{r.title}</p>
          <p className="review-comment">{r.comment}</p>
        </div>
      ))
      }
      
      <ReviewForm gameId={gameId} onCreate={r => setReviews(prev => [r, ...prev])} />

    </div>
  );
}