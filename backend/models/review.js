const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: String,
  comment: String,
  rating: Number,
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true }
});

module.exports = mongoose.model('Review', reviewSchema);