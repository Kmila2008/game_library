const Review = require('../models/Review');

/* Buscar reseñas según filtros */
exports.search = async (req, res) => {
  try {
    const { q, gameId } = req.query;
    const filter = {};
    if (gameId) filter.game = gameId;
    if (q) filter.$or = [{title:{$regex:q,$options:'i'}}, {comment:{$regex:q,$options:'i'}}];

    const reviews = await Review.find(filter).sort({createdAt:-1});
    res.json(reviews);
  } catch (err) {
     res.status(500).json({error: err.message}); 
    }
};

/* Crear una nueva reseña */
exports.create = async (req, res) => {
  try {
    const { game, title, comment } = req.body;

    if (!game || !title || !comment) {
      return res.status(400).json({ error: 'game, title y comment son obligatorios' });
    }
    const review = new Review({
      game,
      title,
      comment,
      author: 'Anónimo',
      rating: 0
    });



    await review.save();
    res.status(201).json(review);
  } catch (err) { 
    res.status(400).json({error: err.message}); 
  }
};

/* Actualizar una reseña existente */
exports.update = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) return res.status(404).json({error:'Reseña no encontrada'});
    res.json(review);
  } catch (err) { res.status(400).json({error: err.message});  
  }
};

/* Eliminar una reseña */
exports.remove = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({error:'Reseña no encontrada'});
    res.json({success:true});
  } catch (err) {
     res.status(500).json({error: err.message}); 
    }
};
