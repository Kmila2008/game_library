const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Rutas de la API
app.use('/api/games', require('./routes/games'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/stats', require('./routes/stats'));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/game_library')
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error en MongoDB:", err));

  // Puerto
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
