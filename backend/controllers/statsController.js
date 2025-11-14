// backend/controllers/statsController.js
const Game = require('../models/Game');
const Review = require('../models/Review');

// Controlador para devolver estadísticas generales
exports.getStats = async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: 1 }); // orden por fecha de creación

    console.log("🎮 Plataformas encontradas:", games.map(g => g.platform));

    const totalGames = games.length;
    const completed = games.filter(g => g.completed).length;
    const pending = totalGames - completed;

    const pcTotal = games.filter(g => g.platform === "PC").length;
    const mobileTotal = games.filter(g => g.platform === "Mobile").length;
    const switchTotal = games.filter(g => g.platform === "Nintendo Switch").length;

    // Horas jugadas por juego (para gráfico de líneas)
    const weeklyHours = games.map(g => ({
      game: g.title,        // nombre del juego
      hours: g.hoursPlayed || 0 // horas jugadas
    }));

    // Distribución por género
    const genreDistribution = {};
    games.forEach(g => {
      genreDistribution[g.genre] = (genreDistribution[g.genre] || 0) + 1;
    });

    // Promedio general de estrellas
    const reviews = await Review.find();
    const averageRating = reviews.length
      ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(2)
      : 0;

    // Enviar todas las estadísticas
    
    console.log("📡 Datos de weeklyHours enviados:", weeklyHours);

    res.json({
      totalGames,
      completed,
      pending,
      pcTotal,
      mobileTotal,
      switchTotal,
      weeklyHours,         // importante: game + hours
      genreDistribution,
      averageRating
    });

  } catch (err) {
    console.error("Error generando estadísticas:", err);
    res.status(500).json({ error: "Error generando estadísticas" });
  }
};