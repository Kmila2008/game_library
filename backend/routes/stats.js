const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

/* Ruta para obtener estadísticas generales */
router.get("/", statsController.getStats);

/* Exportar rutas de estadísticas */
module.exports = router;