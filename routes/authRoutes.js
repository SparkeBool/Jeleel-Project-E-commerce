const express = require('express');
const { register, login, activate } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.get('/activate/:activationToken', activate);
router.post('/login', login);

module.exports = router;
