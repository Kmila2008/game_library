const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.post('/', async (req, res) => {

  try {
    const { title, comment, rating, gameId } = req.body;

    if (!gameId) {
      return res.status(400).json({ error: "gameId es requerido" });
    }

    const newReview =  new Review ({title, rating, comment, gameId});
    
    await newReview.save();
    res.json(newReview);

}  catch (err) {
    console.error("Error creando reseña:", err);
    res.status(500).json({ error: "Error creando la reseña" });
  }
});



router.get('/', async (req, res) => {

    try { 
    const { gameId } = req.query;
    const filter = {};

    if (gameId) filter.gameId = mongoose.Types.ObjectId(gameId);

    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json(reviews);

  } catch (err) {
    console.error("Error obteniendo reseñas:", err);
    res.status(500).json({ error: "Error obteniendo reseñas" });
  }
});

module.exports = router;