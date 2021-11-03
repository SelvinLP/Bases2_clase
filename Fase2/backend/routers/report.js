const { Router } = require('express');
const { ranking } = require('../controller/reports');
const router = Router();

module.exports = router;

//OBTENER RANKING
router.get('/ranking', ranking);