const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: { type: String, required: true }, // Título del juego
  slug: { type: String, required: true, unique: true },
  genre: { type: String, default: 'Uncategorized' }, // Género del juego
  platform: { type: String, default: 'PC' }, // Plataforma (PC, Mobile, Switch)
  description: { type: String, default: '' }, // Descripción del juego
  coverUrl: { type: String, default: '' }, // URL de la portada
  completed: { type: Boolean, default: false },   // Si el juego está completado
  hoursPlayed: { type: Number, default: 0 },  // Horas jugadas
  createdAt: { type: Date, default: Date.now }, // Fecha de creación
  playUrl: { type: String }, // URL para jugar
});

module.exports = mongoose.model('Game', GameSchema);