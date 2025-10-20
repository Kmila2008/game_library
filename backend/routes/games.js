const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gamesController');

router.get('/', ctrl.search); // ?q=&genre=&platform=&completed=
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
