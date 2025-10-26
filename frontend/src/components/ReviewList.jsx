import { useEffect, useState } from "react";
import api from '../utils/api';
import './ReviewList.css'; // estilos opcionales

export default function ReviewList({ gameId, newReview }) {
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const data = await api.get(`/reviews?gameId=${gameId}`);
      setReviews(Response.data);
    } catch (error) {
      console.error('Error cargando reseñas', error);
    }
  };

  useEffect(() => {
    if (gameId) {
      loadReviews();
    }
  }, [gameId, newReview]); // 🔄 Se actualiza cuando creas una reseña

  if (!reviews.length) return <p className="no-reviews">No hay reseñas aún.</p>;

  return (
    <div className="review-list">
      {reviews.map((r) => (
        <div key={r._id} className="review-item">
          <strong>{r.title}</strong>
          <p>{r.comment}</p>
          <small>⭐ {r.rating}</small>
        </div>
      ))}
    </div>
  );
}