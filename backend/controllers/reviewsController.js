const Review = require('../models/Review');

exports.search = async (req, res) => {
  try {
    const { q, gameId } = req.query;
    const filter = {};
    if (gameId) filter.game = gameId;
    if (q) filter.$or = [{title:{$regex:q,$options:'i'}}, {content:{$regex:q,$options:'i'}}];
    const reviews = await Review.find(filter).populate('game').sort({createdAt:-1});
    res.json(reviews);
  } catch (err) { res.status(500).json({error: err.message}); }
};

exports.create = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    const fullReview = await Review.findById(review._id); 
    res.status(201).json(fullReview);
  } catch (err) { res.status(400).json({error: err.message}); }
};

exports.update = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) return res.status(404).json({error:'Not found'});
    res.json(review);
  } catch (err) { res.status(400).json({error: err.message}); }
};

exports.remove = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({error:'Not found'});
    res.json({success:true});
  } catch (err) { res.status(500).json({error: err.message}); }
};
