const Game = require('../models/Game');
const Review = require('../models/Review');

/* Obtener estadísticas generales */
exports.getStats = async (req, res) => {
  try {

    // Obtener todos los juegos, ordenados por fecha de creación
    const games = await Game.find().sort({ createdAt: 1 }); 

    console.log("🎮 Plataformas encontradas:", games.map(g => g.platform));

    
// Totales generales
    const totalGames = games.length;
    const completed = games.filter(g => g.completed).length;
    const pending = totalGames - completed;

// Totales por plataforma
    const pcTotal = games.filter(g => g.platform === "PC").length;
    const mobileTotal = games.filter(g => g.platform === "Mobile").length;
    const switchTotal = games.filter(g => g.platform === "Nintendo Switch").length;

// Horas jugadas por juego (para gráfico de líneas)
    const weeklyHours = games.map(g => ({
      game: g.title,        // nombre del juego
      hours: g.hoursPlayed || 0 // horas jugadas
    }));

// por género
    const genreDistribution = {};
    games.forEach(g => {
      genreDistribution[g.genre] = (genreDistribution[g.genre] || 0) + 1;
    });

    console.log("📡 Datos de weeklyHours enviados:", weeklyHours);
    
 // Enviar respuesta JSON con todas las estadísticas
    res.json({
      totalGames,
      completed,
      pending,
      pcTotal,
      mobileTotal,
      switchTotal,
      weeklyHours,         
      genreDistribution,
    });

  } catch (err) {
    console.error("Error generando estadísticas:", err);
    res.status(500).json({ error: "Error generando estadísticas" });
  }
};