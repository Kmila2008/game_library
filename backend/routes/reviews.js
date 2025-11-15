const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Review');

/* Ruta para crear una nueva reseña */
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

/* Ruta para obtener reseñas*/
router.get('/', async (req, res) => {

    try { 
    const { gameId } = req.query;
    const filter = {};

    if (gameId) filter.gameId = gameId

    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json(reviews);

  } catch (err) {
    console.error("Error obteniendo reseñas:", err);
    res.status(500).json({ error: "Error obteniendo reseñas" });
  }
});

/* Ruta para eliminar una reseña por ID */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    console.log("🗑️ Eliminando reseña con ID:", id);
    const deleted = await Review.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    res.json({ message: "Reseña eliminada correctamente" });
  } catch (err) {
    console.error("Error eliminando reseña:", err);
    res.status(500).json({ error: "Error eliminando la reseña" });
  }
});

/* Exportar rutas de reseñas */
module.exports = router;