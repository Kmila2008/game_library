const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: 'Game', required: true }, // referencia al juego
  author: { type: String, default: 'Anónimo' },
  title: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);