const Game = require('../models/Game');

exports.search = async (req, res) => {
  try {
    const { q, genre, platform, completed } = req.query;
    const filter = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (genre) filter.genre = genre;
    if (platform) filter.platform = platform;
    if (completed !== undefined) filter.completed = completed === 'true';
    const games = await Game.find(filter).sort({ title: 1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    data.slug = (data.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const game = new Game(data);
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    console.log("📩 Body recibido:", req.body);
    console.log("🆔 ID recibido:", req.params.id);

    
    const data = req.body;

    // 🔹 Forzar que hoursPlayed sea un número
    if (data.hoursPlayed !== undefined) {
      data.hoursPlayed = Number(data.hoursPlayed);
    }

    if (data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g,'-')
        .replace(/(^-|-$)/g,'');
    }

    const game = await Game.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(game);

    if (!game) return res.status(404).json({ error: 'Not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};