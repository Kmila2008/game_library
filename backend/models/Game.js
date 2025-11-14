const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  genre: { type: String, default: 'Uncategorized' },
  platform: { type: String, default: 'PC' },
  description: { type: String, default: '' },
  coverUrl: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  hoursPlayed: { type: Number, default: 0 }, // <-- horas jugadas
  createdAt: { type: Date, default: Date.now },
  playUrl: { type: String },
});

module.exports = mongoose.model('Game', GameSchema);