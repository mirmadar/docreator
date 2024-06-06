const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateJWT = require('../middleware/authenticateJWT');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/profile', authenticateJWT, authController.getProfile);

module.exports = router;
