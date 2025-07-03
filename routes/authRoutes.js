// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware'); // ✅ fix path if needed

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
