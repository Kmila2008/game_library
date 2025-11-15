const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: String, // Título de la reseña
  comment: String, // Comentario de la reseña
  rating: Number, // Puntuación del juego
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true } // Relación con el juego
});


/* Exportar modelo de reseña */
module.exports = mongoose.model('Review', reviewSchema);