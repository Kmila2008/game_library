import { useEffect, useState } from "react";
import api from "../utils/api";
import "./ReviewList.css";

export default function ReviewList({ gameId, newReview }) {
  const [reviews, setReviews] = useState([]);

  // 🔄 Cargar reseñas
  const loadReviews = async () => {
    try {
      const data = await api.get(`/reviews?gameId=${gameId}`);
      setReviews(data);
    } catch (error) {
      console.error("Error cargando reseñas", error);
    }
  };

  // 🗑️ Eliminar reseña
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar esta reseña?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/reviews/${id}`);
      setReviews(reviews.filter((r) => r._id !== id)); // Eliminar del estado
    } catch (error) {
      console.error("Error eliminando reseña", error);
      alert("No se pudo eliminar la reseña");
    }
  };

  // ⚡ Cargar reseñas al montar o al crear una nueva
  useEffect(() => {
    loadReviews();
  }, [gameId, newReview]);

  if (!reviews.length) return <p>No hay reseñas aún.</p>;

  return (
    <div className="review-list">
      {reviews.map((r) => (
        <div key={r._id} className="review-item">
          <div className="review-header">
            <strong>{r.title}</strong>

            {/* 🗑️ Botón de eliminar */}
            <button
              className="delete-btn"
              onClick={() => handleDelete(r._id)}
              title="Eliminar reseña"
            >
              🗑️
            </button>
          </div>

          <p>{r.comment}</p>

          <small>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < r.rating ? "⭐" : "☆"}</span>
            ))}
          </small>
        </div>
      ))}
    </div>
  );
}