const { Router } = require('express');
const { newuser, login } = require('../controller/users');
const router = Router();

module.exports = router;

//LOGIN
router.post('/login', login);

//REGISTRAR USUARIO
router.post('/register', newuser)