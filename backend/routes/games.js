const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gamesController');

router.get('/', ctrl.search); //Ruta para buscar o filtrar juegos
router.get('/:id', ctrl.getById); //Ruta para obtener un juego por ID
router.post('/', ctrl.create); // Ruta para crear un nuevo juego 
router.put('/:id', ctrl.update); // Ruta para actualizar un juego existente por I
router.delete('/:id', ctrl.remove); //Ruta para eliminar un juego por ID

/* Exportar rutas de juegos */
module.exports = router;