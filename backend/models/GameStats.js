const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameStatsSchema = new Schema({
  weekStart: { type: Date, required: true }, // 📅 Inicio de la semana
  weekFin: { type: Date, required: true },   // 📅 Fin de la semana
  totalHoras: { type: Number, default: 0 },  // ⏱️ Horas jugadas en esa semana
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GameStats', GameStatsSchema);